import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
	imports: [
		ConfigModule.forRoot(),
		TypeOrmModule.forRoot({
			type: 'postgres',
			url: process.env.DATABASE_URL,
			autoLoadEntities: true, // Автоматически подключает сущности
			synchronize: true, // Включает автоматическое создание таблиц (ТОЛЬКО ДЛЯ РАЗРАБОТКИ)
			ssl: { rejectUnauthorized: false },
		}),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
