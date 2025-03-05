import {
	BadRequestException,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { I18nService } from 'nestjs-i18n';
import { UsersService } from '../users/users.service';
import { UserRole } from '../users/entities/user.entity';
import { CreateUserDto } from '../users/dto/create-user.dto';

type LoginProps = { email: string; password: string; role: UserRole };

@Injectable()
export class AuthService {
	constructor(
		private readonly usersService: UsersService,
		private readonly jwtService: JwtService,
		private readonly i18n: I18nService,
	) {}

	async register(dto: CreateUserDto) {
		const {
			data: { email, role, id: userId },
		} = await this.usersService.create({
			...dto,
		});
		return {
			...this._generateToken(userId, { email, role }),
			id: userId,
		};
	}

	async login(data: LoginProps) {
		const user = await this._validateUser(data);
		return this._generateToken(user.id, { email: user.email, role: user.role });
	}

	async activate(email: string) {
		const user = await this.usersService.activateUser(email);
		if (!user)
			throw new BadRequestException(
				this.i18n.translate('error_message.not_found.user'),
			);

		return await this.login(user);
	}

	private _generateToken(
		userId: number,
		{ email, role }: Omit<LoginProps, 'password'>,
	) {
		const payload = { sub: userId, email, role };
		return { access_token: this.jwtService.sign(payload) };
	}

	private async _validateUser(data: LoginProps) {
		const user = await this.usersService.findByEmail(data.email);
		if (!user || !(await bcrypt.compare(data.password, user.password))) {
			throw new UnauthorizedException(
				this.i18n.translate('error_message.unauthorized'),
			);
		}
		return user;
	}
}
