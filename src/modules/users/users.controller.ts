import { Controller, Delete, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Get()
	async getAll() {
		return this.usersService.findAll();
	}

	@Delete(':id')
	async delete(@Param('id') id: string) {
		const message = await this.usersService.delete(Number(id));
		return { message };
	}
}
