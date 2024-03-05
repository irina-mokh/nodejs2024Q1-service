import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class UserDto {
  @IsUUID()
  id: string; // uuid v4
  login: string;
  password: string;
  version: number; // integer number, increments on update
  createdAt: number; // timestamp of creation
  updatedAt: number; // timestamp of last update
}

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  login: string;

  @IsNotEmpty()
  password: string;
}

export class UpdatePasswordDto {
  @IsNotEmpty()
  oldPassword: string; // previous password

  @IsNotEmpty()
  newPassword: string; // new password
}
