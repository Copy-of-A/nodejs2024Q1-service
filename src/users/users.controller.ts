import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import {
  User,
  CreateUserDto,
  UpdatePasswordDto,
  UserResponse,
} from './user.interface';
import { UsersService } from './users.service';

const USER_NOT_EXIST = 'User does not exist!';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('user')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  createUser(@Body() { login, password }: CreateUserDto): UserResponse {
    return this.usersService.createUser({ login, password });
  }

  @Get()
  getAllUsers(): User[] {
    return this.usersService.getAllUsers();
  }

  @Get(':id')
  getUserById(
    @Param(
      'id',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    id: string,
  ): User {
    const user = this.usersService.getUserById(id);
    if (!user) {
      throw new NotFoundException(USER_NOT_EXIST);
    }
    return user;
  }

  @Put(':id')
  updateUserStatus(
    @Param(
      'id',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    id: string,
    @Body() { oldPassword, newPassword }: UpdatePasswordDto,
  ): UserResponse {
    const user = this.usersService.getUserById(id);
    if (!user) {
      throw new NotFoundException(USER_NOT_EXIST);
    }
    if (oldPassword !== user.password) {
      throw new ForbiddenException();
    }
    return this.usersService.updateUserPassword(id, {
      oldPassword,
      newPassword,
    });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteUser(
    @Param(
      'id',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    id: string,
  ): void {
    const user = this.usersService.getUserById(id);
    if (!user) {
      throw new NotFoundException(USER_NOT_EXIST);
    }
    this.usersService.deleteUser(id);
  }
}
