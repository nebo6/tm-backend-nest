import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import mailConfig from '@config/mail.config';
import { MailService } from './mail.service';

@Module({
	imports: [
		ConfigModule, // ✅ Явно импортируем ConfigModule
		ConfigModule.forFeature(mailConfig), // Загружаем почтовые настройки
		MailerModule.forRootAsync({
			imports: [ConfigModule], // ✅ Подключаем ConfigModule для MailerModule
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => ({
				transport: {
					host: configService.get<string>('mail.host'),
					port: configService.get<number>('mail.port'),
					auth: {
						user: configService.get<string>('mail.user'),
						pass: configService.get<string>('mail.pass'),
					},
					secure: configService.get<boolean>('mail.secure'),
				},
				defaults: {
					from: `"No Reply" <${configService.get('mail.from')}>`,
				},
			}),
		}),
	],
	providers: [MailService],
	exports: [MailService], // Делаем доступным в других модулях
})
export class MailModule {}
