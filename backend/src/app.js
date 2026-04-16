const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(helmet());
app.use(cors({
  origin: true, // Allow all origins during development
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  preflightContinue: false,
  optionsSuccessStatus: 204
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/plans', require('./routes/planRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));
app.use('/api/chatbot', require('./routes/chatRoutes'));
app.use('/api/payment', require('./routes/paymentRoutes'));

// API root endpoint
app.get('/api', (req, res) => {
  res.json({
    message: 'Welcome to Software Xenus Backend API',
    version: '1.0.0',
    endpoints: {
      plans: '/api/plans',
      contact: '/api/contact',
      chatbot: '/api/chatbot',
      payment: '/api/payment'
    }
  });
});

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Software Xenus Backend API' });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

module.exports = app;
