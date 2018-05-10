var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var messageSchema = new Schema({
	messageuser : String,
	messagecontent : String
});

module.exports = messageSchema;