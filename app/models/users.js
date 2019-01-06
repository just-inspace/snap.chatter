let mongoose = require("mongoose");

let UserSchema = new mongoose.Schema({
	username: String,
	email: String,
	lastLogin: String,
	password: String // yeah, i know...it's awful
});

mongoose.model('users', UserSchema);

module.exports = mongoose.model('users');