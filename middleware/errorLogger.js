const ErrorLog = require('../models/ErrorLog');

const errorLogger = async (err, req, res, next) => {
  try {
    // Log the error to MongoDB
    await ErrorLog.create({
      method: req.method,
      url: req.originalUrl,
      message: err.message,
      stack: err.stack,
      body: req.body,
      params: req.params,
      query: req.query,
      timestamp: new Date()
    });
    console.log('Error logged to database');
  } catch (e) {
    console.error('Error logging failed:', e.message);
  }

  // If headers already sent, pass to next error handler
  if (res.headersSent) {
    return next(err);
  }

  // Send error response
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    message: err.message || 'Something went wrong!',
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack
  });
};

module.exports = errorLogger;