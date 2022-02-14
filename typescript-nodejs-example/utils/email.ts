import nodemailer from 'nodemailer';
import pug from 'pug';
import path from 'path';
import { htmlToText } from 'html-to-text';
import dotenv from 'dotenv';

dotenv.config({ path: './config.env' });

class Email {
	emails: string;

	constructor(emails: string) {
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

	async send(template: 'welcome' | 'receipt', subject: string, templateOptions = {}) {
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

	async sendWelcome(username: string, email: string) {
		await this.send('welcome', 'New account!', { username, email });
	}

	async sendOrder(products: any[], totalPrice: number, name: string) {
		await this.send('receipt', 'A new order was created', {
			products,
			totalPrice,
			name,
		});
	}
}

export { Email };
