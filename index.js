const express = require("express");
const Product = require('./models/product.model.js');
const productRoute = require('./routes/product.route.js');
const dbConnection = require("./Database/db.js");
const requestLogger = require('./middleware/requestLogger.js');
const errorLogger = require('./middleware/errorLogger.js');

require('dotenv').config();

const server = express();

// Middleware order is important
// 1. Body parser middleware
server.use(express.json());

// 2. Request logger middleware (before routes)
server.use(requestLogger);

// 3. Routes
server.use('/api/products', productRoute);

server.get('/', (req, res) => {
  res.send("Hello this is my learning");
});

// 4. 404 handler for undefined routes
server.use((req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
});

// 5. Error logger middleware (after routes)
server.use(errorLogger);

// Connect to database and start server
server.listen(3000, () => {
  dbConnection();
  console.log("Server is running on port 3000");
});