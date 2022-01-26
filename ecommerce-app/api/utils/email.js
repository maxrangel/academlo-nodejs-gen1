const nodemailer = require('nodemailer');
const pug = require('pug');
const path = require('path');
const { htmlToText } = require('html-to-text');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

class Email {
	constructor(name, emails) {
		this.name = name;
		this.emails = emails;
	}

	createTransport() {
		return nodemailer.createTransport({
			host: 'smtp.mailtrap.io',
			port: 2525,
			auth: {
				user: process.env.EMAIL_USER,
				pass: process.env.EMAIL_PASSWORD,
			},
		});
	}

	async send(subject) {
		const transport = await this.createTransport();

		const html = pug.renderFile(`${__dirname}/../views/emails/base.pug`);

		const mailOptions = {
			subject,
			from: process.env.EMAIL_FROM,
			to: this.emails,
			html,
			text: htmlToText(html),
		};

		await transport.sendMail(mailOptions);
	}

	async sendWelcome() {
		await this.send('New account!');
	}
}

module.exports = { Email };
