const mongoose = require('mongoose');

const hobbySchema = new mongoose.Schema({
	description: {
		type: String,
		required: true,
	},
});

const Hobby = mongoose.model('Hobby', hobbySchema);

module.exports = { Hobby };
