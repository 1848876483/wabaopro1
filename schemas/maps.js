var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mapSchema = new Schema({
	isCheck : Boolean
});

module.exports = mapSchema;