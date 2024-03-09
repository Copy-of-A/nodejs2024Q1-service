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
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsDefined()
  @IsInt()
  year: number;

  @IsUUID()
  @ValidateIf((e) => e === null)
  artistId: ArtistIdType | null; // refers to Artist
}
