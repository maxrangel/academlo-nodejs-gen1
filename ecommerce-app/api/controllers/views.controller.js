const path = require('path');

exports.renderIndex = (req, res, next) => {
	res.status(200).render('welcome.pug', { message: 'Hello from NodeJS' });
};

// p.subtitle #{message}
// p.subtitle Where you can get any product
// p.subtitle Get our best offers!
