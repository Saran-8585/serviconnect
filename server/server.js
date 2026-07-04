require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const http = require('http');
const { Server } = require('socket.io');

const errorHandler = require('./src/middleware/errorHandler');
const db = require('./src/config/database');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});

app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(morgan('dev'));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api/auth', require('./src/routes/auth.routes'));
app.use('/api/categories', require('./src/routes/category.routes'));
app.use('/api/providers', require('./src/routes/provider.routes'));
app.use('/api/recommendations', require('./src/routes/recommendation.routes'));
app.use('/api/bookings', require('./src/routes/booking.routes'));
app.use('/api/messages', require('./src/routes/message.routes'));

app.use(errorHandler);

require('./src/sockets/chat.handler')(io);

const PORT = process.env.PORT || 5000;

db.raw('SELECT 1')
  .then(() => {
    console.log('SQLite connected');
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Database connection failed:', err);
    process.exit(1);
  });

module.exports = { app, server, io };
