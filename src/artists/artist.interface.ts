import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';

export type ArtistIdType = string;

export interface Artist extends ArtistDto {
  id: ArtistIdType; // uuid v4
}

export class ArtistDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsBoolean()
  grammy: boolean;
}
