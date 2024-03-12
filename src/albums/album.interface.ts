import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsInt,
  IsNotEmpty,
  IsString,
  IsUUID,
  ValidateIf,
} from 'class-validator';
import { ArtistIdType } from 'src/artists/artist.interface';

export type AlbumIdType = string;

export interface Album extends AlbumDto {
  id: AlbumIdType; // uuid v4
}
export class AlbumDto {
  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    required: true,
  })
  @IsDefined()
  @IsInt()
  year: number;

  @ApiProperty({
    required: true,
  })
  @IsUUID()
  @ValidateIf((e) => e === null)
  artistId: ArtistIdType | null; // refers to Artist
}
