const recommendationService = require('../services/recommendation.service');
const AppError = require('../utils/appError');

exports.getRecommendations = async (req, res, next) => {
  try {
    const recommendations = await recommendationService.recommend(req.user.id);
    res.json({ recommendations });
  } catch (error) {
    next(error);
  }
};

exports.train = async (req, res, next) => {
  try {
    const result = await recommendationService.train();
    res.json(result);
  } catch (error) {
    next(error);
  }
};
