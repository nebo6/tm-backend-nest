import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class MailService {
	constructor(
		private readonly mailerService: MailerService,
		private readonly configService: ConfigService,
		private readonly i18n: I18nService,
	) {}

	async sendActivationEmail(email: string) {
		const host = this.configService.get<string>(
			'HOST',
			'http://localhost:3000',
		);
		const activationLink = `${host}/auth/activate?email=${email}`;

		const subject = this.i18n.translate('mailer.activation_subject');
		const text = this.i18n.translate('mailer.activation_text', {
			args: { link: activationLink },
		});

		await this.mailerService.sendMail({
			to: email,
			subject,
			text,
		});
	}
}
