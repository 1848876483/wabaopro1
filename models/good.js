var mongoose = require('mongoose');
var goodSchema = require('../schemas/goods.js');
module.exports = mongoose.model('Good',goodSchema);