import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export const getDbConfig = (
	configService: ConfigService,
): TypeOrmModuleOptions => ({
	type: 'postgres',
	url: configService.get<string>('DATABASE_URL'),
	autoLoadEntities: true,
	synchronize: configService.get<boolean>('DB_SYNC', false), // false для продакшена!
	ssl: configService.get<boolean>('DATABASE_SSL', false)
		? { rejectUnauthorized: false }
		: false,
});
