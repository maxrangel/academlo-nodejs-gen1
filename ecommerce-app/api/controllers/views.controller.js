exports.renderIndex = (req, res, next) => {
	const users = [
		{ name: 'Max', age: 23 },
		{ name: 'John', age: 25 },
		{ name: 'Chris', age: 21 },
	];

	res.status(200).render('welcome.pug', {
		message: 'Hello from NodeJS',
		users,
	});
};
