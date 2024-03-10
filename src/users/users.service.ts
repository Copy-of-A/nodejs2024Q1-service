import { Injectable } from '@nestjs/common';
import {
  CreateUserDto,
  UpdatePasswordDto,
  User,
  UserIdType,
  UserResponse,
} from './user.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  private users: User[] = [];

  createUser({ login, password }: CreateUserDto): UserResponse {
    const id = uuidv4();
    const user: User = {
      id,
      login,
      password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    this.users.push(user);
    return {
      id: user.id,
      login: user.login,
      version: user.version,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  getAllUsers(): User[] {
    return this.users;
  }

  getUserById(id: UserIdType): User {
    return this.users.find((user) => user.id === id);
  }

  updateUserPassword(
    id: UserIdType,
    { newPassword }: UpdatePasswordDto,
  ): UserResponse {
    const user = this.getUserById(id);
    if (user) {
      user.password = newPassword;
      user.version += 1;
      user.updatedAt = Date.now();
    }
    return {
      id: user.id,
      login: user.login,
      version: user.version,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  deleteUser(id: UserIdType): void {
    this.users = this.users.filter((user) => user.id !== id);
  }
}
