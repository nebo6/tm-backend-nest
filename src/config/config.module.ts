import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import mailConfig from './mail.config';

@Module({
	imports: [
		NestConfigModule.forRoot({
			isGlobal: true, // Делаем доступным во всем приложении
			load: [mailConfig],
		}),
	],
	exports: [NestConfigModule],
})
export class ConfigModule {}
