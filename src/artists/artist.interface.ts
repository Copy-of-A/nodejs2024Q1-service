import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';

export type ArtistIdType = string;

export interface Artist extends ArtistDto {
  id: ArtistIdType; // uuid v4
}

export class ArtistDto {
  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    required: true,
  })
  @IsBoolean()
  grammy: boolean;
}
