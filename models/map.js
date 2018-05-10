var mongoose = require('mongoose');
var mapSchema = require('../schemas/maps.js');
module.exports = mongoose.model('Map',mapSchema);