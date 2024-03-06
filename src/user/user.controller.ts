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
import { CreateUserDto, UpdatePasswordDto, UserDto } from './user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getAll(): Promise<UserDto[]> {
    return this.userService.getAll();
  }

  @Get(':id')
  async getById(@Param('id', ParseUUIDPipe) id: string): Promise<UserDto> {
    const user = this.userService.getById(id);
    if (!user) throw new NotFoundException('User is not found.');
    return user;
  }

  @HttpCode(201)
  @Post()
  createUser(@Body(ValidationPipe) dto: CreateUserDto) {
    return this.userService.createUser(dto);
  }

  @Put(':id')
  async updatePass(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(ValidationPipe) { oldPassword, newPassword }: UpdatePasswordDto,
  ) {
    const user = this.userService.getById(id);
    if (!user) throw new NotFoundException('User is not found.');

    const pass = this.userService.getById(id).password;
    if (pass !== oldPassword)
      throw new ForbiddenException('Old password is wrong.');

    return this.userService.updatePass(id, newPassword);
  }

  @HttpCode(204)
  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    const user = this.userService.getById(id);
    if (!user) throw new NotFoundException('User is not found.');
    this.userService.delete(id);
  }
}
