import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '@modules/users/entities/user.entity';
import { Request } from 'express';

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(private reflector: Reflector) {}

	canActivate(context: ExecutionContext): boolean {
		const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
			context.getHandler(),
			context.getClass(),
		]);

		if (!requiredRoles) return true;

		const request: Request = context.switchToHttp().getRequest<Request>(); // Используем кастомный тип
		const { user } = request;

		console.log(user);

		// @ts-expect-error asdfsdaf
		if (user?.role === UserRole.ADMIN) return true;

		const resourceId = parseInt(request.params.id, 10);
		// @ts-expect-error asdfsdaf
		if (user?.id === resourceId) return true;

		return false;
	}
}
