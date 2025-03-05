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
		return await this.profilesService.findById(Number(id));
	}
}
