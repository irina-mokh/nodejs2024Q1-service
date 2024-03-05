import { Injectable } from '@nestjs/common';
import { CreateUserDto, UserDto } from './user.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UserService {
  private users: UserDto[] = [];

  getAll(): UserDto[] {
    return this.users;
  }

  getById(id: string): UserDto {
    return this.users.find((user) => user.id === id);
  }

  omitPass(user: UserDto) {
    const { password, ...rest } = user;
    return rest;
  }

  createUser(dto: CreateUserDto) {
    const user: UserDto = {
      ...dto,
      id: uuid(),
      version: 1,
      createdAt: +new Date(),
      updatedAt: +new Date(),
    };

    this.users.push(user);
    return this.omitPass(user);
  }

  updatePass(id: string, newPassword: string) {
    const user: UserDto = this.getById(id);
    user.updatedAt = +new Date();
    user.version = user.version + 1;
    user.password = newPassword;

    return this.omitPass(user);
  }

  delete(id: string) {
    this.users = this.users.filter((user) => user.id !== id);
  }
}
