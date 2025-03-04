import { Controller, Get, Param } from '@nestjs/common';
import { ProfilesService } from './profiles.service';

@Controller('profiles')
export class ProfilesController {
	constructor(private readonly profilesService: ProfilesService) {}

	@Get()
	async getAll() {
		return this.profilesService.findAll();
	}

	@Get(':id')
	async get(@Param('id') id: string) {
		console.log(id);

		const profile = await this.profilesService.findById(Number(id));

		return profile;
	}
}
