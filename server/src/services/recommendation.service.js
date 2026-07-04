const tf = require('@tensorflow/tfjs-node');
const path = require('path');
const fs = require('fs');
const db = require('../config/database');

const MODEL_DIR = path.resolve(__dirname, '../../data/models');
const MODEL_SAVE_PATH = `file://${path.join(MODEL_DIR, 'recommendation')}`;
const MODEL_LOAD_PATH = `file://${path.join(MODEL_DIR, 'recommendation', 'model.json')}`;
const EMBEDDING_DIM = 32;

let model = null;
let userIndex = {};
let providerIndex = {};
let reverseUserIndex = {};
let reverseProviderIndex = {};
let providerData = [];

async function buildIndices() {
  const users = await db('users').where({ role: 'customer', is_active: true });
  const providers = await db('provider_profiles')
    .join('users', 'provider_profiles.user_id', 'users.id')
    .where({ is_approved: true })
    .select('provider_profiles.*', 'users.name');

  userIndex = {};
  providerIndex = {};
  reverseUserIndex = {};
  reverseProviderIndex = {};
  providerData = providers;

  users.forEach((u, i) => {
    userIndex[u.id] = i;
    reverseUserIndex[i] = u.id;
  });
  providers.forEach((p, i) => {
    providerIndex[p.id] = i;
    reverseProviderIndex[i] = p.id;
  });
}

function buildModel(numUsers, numProviders) {
  const userInput = tf.input({ shape: [1], name: 'user_input', dtype: 'int32' });
  const providerInput = tf.input({ shape: [1], name: 'provider_input', dtype: 'int32' });

  const userEmbedding = tf.layers.embedding({
    inputDim: numUsers,
    outputDim: EMBEDDING_DIM,
    embeddingsInitializer: 'randomNormal',
    name: 'user_embedding',
  }).apply(userInput);

  const providerEmbedding = tf.layers.embedding({
    inputDim: numProviders,
    outputDim: EMBEDDING_DIM,
    embeddingsInitializer: 'randomNormal',
    name: 'provider_embedding',
  }).apply(providerInput);

  const userFlatten = tf.layers.flatten().apply(userEmbedding);
  const providerFlatten = tf.layers.flatten().apply(providerEmbedding);

  const dot = tf.layers.dot({ axes: 1 }).apply([userFlatten, providerFlatten]);

  const model = tf.model({
    inputs: [userInput, providerInput],
    outputs: dot,
  });

  model.compile({
    optimizer: tf.train.adam(0.01),
    loss: 'meanSquaredError',
    metrics: ['mse'],
  });

  return model;
}

async function generateTrainingData() {
  const bookings = await db('bookings');
  const customers = Object.keys(userIndex);
  const providers = Object.keys(providerIndex);

  if (customers.length === 0 || providers.length === 0) return null;

  const positivePairs = new Set();
  const pairMap = {};

  bookings.forEach((b) => {
    const uid = userIndex[b.customer_id];
    const pid = providerIndex[b.provider_id];
    if (uid !== undefined && pid !== undefined) {
      const key = `${uid}:${pid}`;
      positivePairs.add(key);
      pairMap[key] = 1;
    }
  });

  const userInputs = [];
  const providerInputs = [];
  const labels = [];

  positivePairs.forEach((key) => {
    const [u, p] = key.split(':').map(Number);
    userInputs.push(u);
    providerInputs.push(p);
    labels.push(1);
  });

  const numNegative = Math.min(positivePairs.size * 2, customers.length * providers.length - positivePairs.size);
  let negCount = 0;
  let attempts = 0;

  while (negCount < numNegative && attempts < numNegative * 10) {
    attempts++;
    const u = Math.floor(Math.random() * customers.length);
    const p = Math.floor(Math.random() * providers.length);
    const key = `${u}:${p}`;
    if (!positivePairs.has(key)) {
      positivePairs.add(key);
      userInputs.push(u);
      providerInputs.push(p);
      labels.push(0);
      negCount++;
    }
  }

  return {
    userInputs: tf.tensor1d(userInputs, 'int32'),
    providerInputs: tf.tensor1d(providerInputs, 'int32'),
    labels: tf.tensor1d(labels, 'float32'),
    numUsers: customers.length,
    numProviders: providers.length,
  };
}

async function train() {
  await buildIndices();

  const data = await generateTrainingData();
  if (!data) return { message: 'Not enough data to train. Need at least one customer and one provider.' };

  model = buildModel(data.numUsers, data.numProviders);

  const batchSize = Math.min(32, data.userInputs.shape[0]);
  const epochs = 20;

  await model.fit(
    [data.userInputs, data.providerInputs],
    data.labels,
    {
      batchSize,
      epochs,
      shuffle: true,
      callbacks: {
        onEpochEnd: (epoch, logs) => {
          console.log(`Epoch ${epoch + 1}/${epochs} — loss: ${logs.loss.toFixed(4)}`);
        },
      },
    }
  );

  if (!fs.existsSync(MODEL_DIR)) {
    fs.mkdirSync(MODEL_DIR, { recursive: true });
  }
  await model.save(MODEL_SAVE_PATH);

  data.userInputs.dispose();
  data.providerInputs.dispose();
  data.labels.dispose();

  return { message: 'Model trained successfully.', epochs, users: data.numUsers, providers: data.numProviders };
}

async function load() {
  try {
      if (fs.existsSync(path.join(MODEL_DIR, 'recommendation', 'model.json'))) {
      model = await tf.loadLayersModel(MODEL_LOAD_PATH);
      await buildIndices();
      return true;
    }
  } catch (err) {
    console.warn('No saved model found, training required.');
  }
  return false;
}

async function recommend(userId, limit = 6) {
  if (!model || Object.keys(providerIndex).length === 0) {
    const loaded = await load();
    if (!loaded) {
      return await fallbackRecommend(limit);
    }
  }

  const uIdx = userIndex[userId];
  if (uIdx === undefined) {
    return await fallbackRecommend(limit);
  }

  const providerIds = Object.keys(providerIndex);
  const providerIdxs = providerIds.map((id) => providerIndex[id]);

  const userTensor = tf.tensor1d([uIdx], 'int32');
  const providerTensor = tf.tensor1d(providerIdxs, 'int32');

  const userRepeated = tf.tile(userTensor, [providerIds.length]);
  const scores = model.predict([userRepeated, providerTensor]);
  const scoresData = await scores.data();

  userTensor.dispose();
  providerTensor.dispose();
  userRepeated.dispose();
  scores.dispose();

  const scored = [];
  for (let i = 0; i < providerIds.length; i++) {
    const pid = Number(providerIds[i]);
    scored.push({ providerId: pid, score: scoresData[i] });
  }

  scored.sort((a, b) => b.score - a.score);
  const top = scored.slice(0, limit);

  const recommendations = await Promise.all(
    top.map(async (s) => {
      const provider = providerData.find((p) => p.id === s.providerId);
      if (!provider) return null;

      const services = await db('services')
        .join('categories', 'services.category_id', 'categories.id')
        .where('services.provider_id', s.providerId)
        .andWhere('services.is_active', true)
        .select('services.name', 'services.price', 'services.duration', 'categories.name as category')
        .first();

      return {
        providerId: s.providerId,
        businessName: provider.business_name,
        providerName: provider.name,
        rating: provider.rating,
        totalReviews: provider.total_reviews,
        serviceArea: provider.service_area,
        service: services || null,
        score: s.score,
      };
    })
  );

  return recommendations.filter(Boolean);
}

async function fallbackRecommend(limit = 6) {
  try {
    const providers = await db('provider_profiles')
      .join('users', 'provider_profiles.user_id', 'users.id')
      .where({ is_approved: true })
      .orderBy('rating', 'desc')
      .orderBy('total_reviews', 'desc')
      .limit(limit)
      .select('provider_profiles.*', 'users.name');

    return Promise.all(
      providers.map(async (p) => {
        const services = await db('services')
          .join('categories', 'services.category_id', 'categories.id')
          .where('services.provider_id', p.id)
          .andWhere('services.is_active', true)
          .select('services.name', 'services.price', 'services.duration', 'categories.name as category')
          .first();

        return {
          providerId: p.id,
          businessName: p.business_name,
          providerName: p.name,
          rating: p.rating,
          totalReviews: p.total_reviews,
          serviceArea: p.service_area,
          service: services || null,
          score: 0,
        };
      })
    );
  } catch {
    return [];
  }
}

module.exports = { train, recommend, load };
