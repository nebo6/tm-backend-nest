import {
	BadRequestException,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { I18nService } from 'nestjs-i18n';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
	constructor(
		private readonly usersService: UsersService,
		private readonly jwtService: JwtService,
		private readonly i18n: I18nService,
	) {}

	async register(dto: CreateUserDto) {
		const { data: user } = await this.usersService.create({
			...dto,
		});
		return {
			...this._generateToken(user.id, user.email),
			id: user.id,
		};
	}

	async login({ email, password }: { email: string; password: string }) {
		const user = await this._validateUser(email, password);
		return this._generateToken(user.id, user.email);
	}

	async activate(email: string) {
		const user = await this.usersService.activateUser(email);
		if (!user)
			throw new BadRequestException(
				this.i18n.translate('error_message.not_found.user'),
			);

		return await this.login(user);
	}

	private _generateToken(userId: number, email: string) {
		const payload = { sub: userId, email };
		return { access_token: this.jwtService.sign(payload) };
	}

	private async _validateUser(email: string, password: string) {
		const user = await this.usersService.findByEmail(email);
		if (!user || !(await bcrypt.compare(password, user.password))) {
			throw new UnauthorizedException(
				this.i18n.translate('error_message.unauthorized'),
			);
		}
		return user;
	}
}
