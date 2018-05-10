var mongoose = require('mongoose');
var messageSchema = require('../schemas/messages.js');
module.exports = mongoose.model('Message',messageSchema);