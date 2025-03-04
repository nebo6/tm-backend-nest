import {
	BadRequestException,
	Body,
	Controller,
	Get,
	Post,
	Query,
} from '@nestjs/common';
import { CreateUserDto } from 'modules/users/dto/create-user.dto';
import { I18nService } from 'nestjs-i18n';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
	constructor(
		private readonly authService: AuthService,
		private readonly i18n: I18nService,
	) {}

	@Post('register')
	async auth(@Body() dto: CreateUserDto) {
		const message = await this.authService.register(dto);
		return message;
	}

	@Get('activate')
	async activate(@Query('email') email: string) {
		const user = await this.authService.activate(email);
		if (!user)
			throw new BadRequestException(
				this.i18n.t('error_message.not_found.user'),
			);
		return user;
	}
}
