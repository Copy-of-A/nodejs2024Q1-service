import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export type UserIdType = string;
export interface User {
  id: UserIdType; // uuid v4
  login: string;
  password: string;
  version: number; // integer number, increments on update
  createdAt: number; // timestamp of creation
  updatedAt: number; // timestamp of last update
}

export class CreateUserDto {
  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  login: string;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}

export class UpdatePasswordDto {
  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  oldPassword: string; // previous password

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  newPassword: string; // new password
}

export type UserResponse = Omit<User, 'password'>;
