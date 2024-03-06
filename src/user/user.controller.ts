import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  CreateUserDto as C,
  UpdatePasswordDto as U,
  UserDto as T,
} from './user.dto';

@Controller('user')
export class UserController {
  constructor(private service: UserService) {}

  // TODO: DRY ->
  @Get()
  async getAll(): Promise<T[]> {
    return this.service.getAll();
  }

  @Get(':id')
  async getById(@Param('id', ParseUUIDPipe) id: string): Promise<T> {
    const item = this.service.getById(id);
    if (!item) throw new NotFoundException(`Not found.`);
    return item;
  }

  // @Put(':id')
  // async update(
  //   @Param('id', ParseUUIDPipe) id: string,
  //   @Body(ValidationPipe) dto: U,
  // ) {
  //   const item = this.service.getById(id);
  //   if (!item) throw new NotFoundException(`Not found.`);

  //   return this.service.update(id, dto);
  // }

  @HttpCode(204)
  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    const item = this.service.getById(id);
    if (!item) throw new NotFoundException(`Not found.`);
    this.service.delete(id);
  }
  // <- TODO: DRY

  // ! differs
  @HttpCode(201)
  @Post()
  create(@Body(ValidationPipe) dto: C) {
    return this.service.createUser(dto);
  }

  @Put(':id')
  async updatePass(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(ValidationPipe) { oldPassword, newPassword }: U,
  ) {
    const user = this.service.getById(id);
    if (!user) throw new NotFoundException('User is not found.');

    const pass = this.service.getById(id).password;
    if (pass !== oldPassword)
      throw new ForbiddenException('Old password is wrong.');

    return this.service.updatePass(id, newPassword);
  }
}
