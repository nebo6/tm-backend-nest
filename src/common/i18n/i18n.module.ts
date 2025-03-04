import { Module } from '@nestjs/common';
import {
	I18nModule,
	I18nJsonLoader,
	HeaderResolver,
	AcceptLanguageResolver,
} from 'nestjs-i18n';
import * as path from 'path';

@Module({
	imports: [
		I18nModule.forRoot({
			fallbackLanguage: 'ru', // Язык по умолчанию
			loader: I18nJsonLoader,
			loaderOptions: {
				path: path.join(__dirname, '../../i18n/'), // Путь к JSON-файлам
				watch: true,
			},
			resolvers: [
				new HeaderResolver(), // Извлекает язык из заголовков (Accept-Language)
				new AcceptLanguageResolver(),
			],
		}),
	],
	exports: [I18nModule],
})
export class CustomI18nModule {}
