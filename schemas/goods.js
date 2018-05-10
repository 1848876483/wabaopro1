var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var goodSchema = new Schema({
	goods : Array
});

module.exports = goodSchema;