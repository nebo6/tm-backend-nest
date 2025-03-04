import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailModule } from '@common/mail/mail.module';
import { CustomI18nModule } from '@common/i18n/i18n.module';
import { getDbConfig } from '@config/db.config.module';
import { AuthModule } from 'modules/auth/auth.module';
import { UsersModule } from 'modules/users/users.module';
import { ProfilesModule } from 'modules/profiles/profiles.module';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => getDbConfig(configService),
		}),
		MailModule,
		CustomI18nModule,
		AuthModule,
		UsersModule,
		ProfilesModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
