const nodemailer = require('nodemailer');
const pug = require('pug');
const path = require('path');
const { htmlToText } = require('html-to-text');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

class Email {
	constructor(emails) {
		this.emails = emails;
	}

	createTransport() {
		if (process.env.NODE_ENV === 'production') {
			return nodemailer.createTransport({
				service: 'SendGrid',
				auth: {
					user: process.env.SENDGRID_NAME,
					pass: process.env.SENDGRID_API_KEY,
				},
			});
		}

		return nodemailer.createTransport({
			host: 'smtp.mailtrap.io',
			port: 2525,
			auth: {
				user: process.env.EMAIL_USER,
				pass: process.env.EMAIL_PASSWORD,
			},
		});
	}

	async send(template, subject, templateOptions = {}) {
		const transport = await this.createTransport();

		const htmlPath = path.join(
			__dirname,
			'..',
			'views',
			'emails',
			`${template}.pug`
		);

		const html = pug.renderFile(htmlPath, templateOptions);

		const mailOptions = {
			subject,
			from: process.env.EMAIL_FROM,
			to: this.emails,
			html,
			text: htmlToText(html),
		};

		await transport.sendMail(mailOptions);
	}

	async sendWelcome(username, email) {
		await this.send('welcome', 'New account!', { username, email });
	}

	async sendOrder(products, totalPrice, name) {}
}

module.exports = { Email };
