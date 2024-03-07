import { Injectable } from '@nestjs/common';
import { CreateUserDto, UserDto } from './user.dto';
import { v4 as uuid } from 'uuid';
import { TemplateService } from 'src/template/template.service';
import { db } from 'src/db/db';

@Injectable()
export class UserService extends TemplateService<UserDto> {
  constructor() {
    super(db.users);
  }
  omitPass(user: UserDto) {
    const clone = { ...user };
    delete clone.password;
    return clone;
  }

  createUser(dto: CreateUserDto) {
    const user: UserDto = {
      ...dto,
      id: uuid(),
      version: 1,
      createdAt: +new Date(),
      updatedAt: +new Date(),
    };

    this.items.push(user);
    return this.omitPass(user);
  }

  updatePass(id: string, newPassword: string) {
    const user: UserDto = this.getById(id);
    user.updatedAt = +new Date();
    user.version = user.version + 1;
    user.password = newPassword;

    return this.omitPass(user);
  }
}
