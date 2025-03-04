import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './enteties/user.entity';
import { MailModule } from '@common/mail/mail.module';

@Module({
	imports: [TypeOrmModule.forFeature([User]), MailModule],
	controllers: [UsersController],
	providers: [UsersService],
	exports: [UsersService],
})
export class UsersModule {}
