let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let UserSchema = new Schema({
	username: String,
	email: String,
	lastLogin: String,
	password: String // yeah, i know...it's awful
});
