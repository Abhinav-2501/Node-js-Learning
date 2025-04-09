const mongoose = require('mongoose');

const requestLogSchema = new mongoose.Schema({
    response : Object,
    statusCode : Number,
    body : Object
});

module.exports = mongoose.model('RequestLog',requestLogSchema);