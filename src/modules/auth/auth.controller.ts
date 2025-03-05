import {
	BadRequestException,
	Body,
	Controller,
	Get,
	Post,
	Query,
} from '@nestjs/common';
import { CreateUserDto } from 'modules/users/dto/create-user.dto';
// import { I18n, I18nContext, I18nTranslation } from 'nestjs-i18n';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('register')
	async auth(@Body() dto: CreateUserDto) {
		const message = await this.authService.register(dto);
		return message;
	}

	@Get('activate')
	async activate(
		@Query('email') email: string,
		// @I18n() i18n: I18nContext<I18nTranslation>,
	) {
		const user = await this.authService.activate(email);
		if (!user) {
			// const text = i18n.t('error_message.not_found.user');
			throw new BadRequestException('400');
		}
		return user;
	}
}
