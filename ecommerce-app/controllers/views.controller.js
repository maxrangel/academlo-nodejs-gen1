const path = require('path');

exports.renderIndex = (req, res, next) => {
	const indexPath = path.resolve(
		__dirname,
		'..',
		'client',
		'build',
		'index.html'
	);

	res.status(200).sendFile(indexPath);
};
