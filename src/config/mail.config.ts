export default () => ({
	mail: {
		host: process.env.SMTP_HOST || 'smtp.gmail.com',
		port: Number(process.env.SMTP_PORT) || 587,
		user: process.env.SMTP_USER || 'your_email@gmail.com',
		pass: process.env.SMTP_PASS || 'your_password',
		from: process.env.MAIL_FROM || 'no-reply@yourdomain.com',
		secure: process.env.SMTP_SECURE === 'true', // true = SSL, false = TLS
	},
});
