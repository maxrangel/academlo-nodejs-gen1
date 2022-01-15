const mongoose = require('mongoose');

// Models
// const { Hobby } = require('./hobby.model');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	age: {
		type: Number,
		required: true,
	},
	email: {
		type: String,
		unique: true,
		length: 100,
		required: true,
	},
	hobbies: [],
	address: {
		zipCode: {
			type: Number,
			required: true,
		},
		street: String,
		country: String,
	},
});
const User = mongoose.model('User', userSchema);

module.exports = { User };
