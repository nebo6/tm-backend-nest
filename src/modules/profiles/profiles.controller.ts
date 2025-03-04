import { Controller, Get, Param } from '@nestjs/common';
import { ProfilesService } from './profiles.service';

@Controller('profiles')
export class ProfilesController {
	constructor(private readonly profilesService: ProfilesService) {}

	@Get(':id')
	async get(@Param('id') id: string) {
		const profile = await this.profilesService.findById(Number(id));

		return profile;
	}
}
