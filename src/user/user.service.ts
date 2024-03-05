import { Injectable } from '@nestjs/common';
import { User } from '../types';

@Injectable()
export class UserService {
  private readonly users: User[] = [];

  getAll(): User[] {
    return this.users;
  }
}
