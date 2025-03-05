import { Controller, Delete, Get, Param, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '@guards/jwt-auth.guard';
import { RolesGuard } from '@guards/roles.guard';
import { Request } from 'express';

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Get()
	async getAll() {
		return this.usersService.findAll();
	}

	@UseGuards(JwtAuthGuard, RolesGuard)
	@Delete(':id')
	async delete(@Param('id') id: string, @Req() req: Request) {
		const user = req.user;
		console.log('Удаляет:', user);
		const message = await this.usersService.delete(Number(id));
		return { message };
	}
}
