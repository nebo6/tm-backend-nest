import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Profile } from './entities/profile.entity';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class ProfilesService {
	constructor(
		@InjectRepository(Profile)
		private readonly profileRepository: Repository<Profile>,
		private readonly i18n: I18nService,
	) {}

	async findById(id: number) {
		const profile = await this.profileRepository.findOne({ where: { id } });

		if (!profile)
			throw new NotFoundException(
				this.i18n.t('error_message.not_found.profile'),
			);

		return profile;
	}
}
