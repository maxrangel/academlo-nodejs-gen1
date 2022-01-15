const { User } = require('../models/user.model');

exports.createUser = async (req, res, next) => {
	const { name, age, email, hobbies, address } = req.body;

	try {
		const newUser = await User.create({ name, age, email, hobbies, address });

		res.status(201).json({ status: 'success', data: { user: newUser } });
	} catch (err) {
		console.log(err);
	}
};

exports.getAllUsers = async (req, res, next) => {
	try {
		const users = await User.find();

		res.status(200).json({ status: 'success', data: { users } });
	} catch (error) {
		console.log(error);
	}
};
