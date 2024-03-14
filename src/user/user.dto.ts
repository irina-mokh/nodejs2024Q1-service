import { IsInt, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class UserDto {
  @IsUUID()
  id: string; // uuid v4
  login: string;
  password: string;
  @IsInt()
  version: number; // integer number, increments on update
  createdAt: Date; // timestamp of creation
  updatedAt: Date; // timestamp of last update
}

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  login: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class UpdatePasswordDto {
  @IsString()
  @IsNotEmpty()
  oldPassword: string; // previous password

  @IsString()
  @IsNotEmpty()
  newPassword: string; // new password
}

// export type UserSafe = Omit<UserDto, 'password'>;
