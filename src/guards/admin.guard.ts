import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ManagerService } from '../manager/manager.service';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly managerService: ManagerService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.user?.id;

    if (!userId) {
      throw new ForbiddenException('User ID not found in request');
    }

    const user = await this.managerService.findOne({ _id: userId });
    if (!user || !user.admin) {
      throw new ForbiddenException('Only administrators can access this route');
    }

    return true;
  }
}
