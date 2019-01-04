let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let MessageSchema = new Schema({
	_id: String,
	username: String,
	content: String,
	timestamp: String
});
