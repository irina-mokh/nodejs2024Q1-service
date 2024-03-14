import { Injectable } from '@nestjs/common';
import { CreateUserDto as C, UserDto as T } from './user.dto';
import { DBService } from 'src/db/db.service';

const omitPass = {
  id: true,
  login: true,
  version: true,
  createdAt: true,
  updatedAt: true,
};

@Injectable()
export class UserService {
  constructor(readonly db: DBService) {}

  hidePass(user: T) {
    const clone = { ...user };
    delete clone.password;
    return clone;
  }

  async getAll() {
    return await this.db.user.findMany({
      select: omitPass,
    });
  }

  async getById(id: string) {
    return this.db.user.findUnique({
      where: { id },
      select: omitPass,
    });
  }

  async create(dto: C) {
    return await this.db.user.create({
      data: dto,
      select: omitPass,
    });
  }

  async updatePass(id: string, newPassword: string) {
    const user: T = await this.db.user.findUnique({
      where: { id },
    });

    const updUser = await this.db.user.update({
      where: { id },
      data: {
        password: newPassword,
        version: user.version + 1,
      },
      select: omitPass,
    });

    return updUser;
  }

  async delete(id: string) {
    await this.db.user.delete({ where: { id } });
  }
}
