import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/types';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getAll(): Promise<User[]> {
    return this.userService.getAll();
  }
}
