const mongoose = require('mongoose');

const ErrorLogSchema = new mongoose.Schema({
  method: String,
  url: String,
  message: String,
  stack: String,
  body: Object,
  params: Object,
  query: Object,
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('ErrorLog', ErrorLogSchema);
