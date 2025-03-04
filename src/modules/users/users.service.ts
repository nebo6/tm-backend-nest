import {
	ConflictException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { I18nService } from 'nestjs-i18n';
import { MailService } from '@common/mail/mail.service';
import { User } from './enteties/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User)
		private readonly userRepository: Repository<User>,
		private readonly mailerService: MailService,
		private readonly i18n: I18nService,
	) {}

	async findAll() {
		return await this.userRepository.find();
	}

	async create(dto: CreateUserDto) {
		const { email } = dto;

		const existinUser = await this.userRepository.findOne({ where: { email } });
		if (existinUser)
			throw new ConflictException(this.i18n.t('email_already_exist'));

		const randomPassword = crypto.randomBytes(6).toString('hex');
		const hashedPassword = await bcrypt.hash(randomPassword, 10);

		const user = this.userRepository.create({
			email,
			password: hashedPassword,
			isActive: false,
			profile: {
				fullName: email,
			},
		});

		await this.userRepository.save(user);
		await this.mailerService.sendActivationEmail(email);

		return { message: this.i18n.t('success_message.created.user'), data: user };
	}

	async findByEmail(email: string) {
		const user = await this.userRepository.findOne({
			where: { email },
		});

		return user;
	}

	async activateUser(email: string): Promise<User | null> {
		const user = await this.userRepository.findOne({
			where: { email, isActive: false },
		});
		if (!user) return null;

		user.isActive = true;
		return this.userRepository.save(user);
	}

	async delete(id: number): Promise<void> {
		const user = await this.userRepository.findOne({
			where: { id },
			relations: ['profile'],
		});

		if (!user) {
			throw new NotFoundException(this.i18n.t('error_message.not_found.user'));
		}

		await this.userRepository.remove(user); // Профиль удалится автоматически
	}
}
