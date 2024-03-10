import {
  IsDefined,
  IsInt,
  IsNotEmpty,
  IsString,
  IsUUID,
  ValidateIf,
} from 'class-validator';
import { AlbumIdType } from 'src/albums/album.interface';
import { ArtistIdType } from 'src/artists/artist.interface';

export type TrackIdType = string;

export interface Track extends TrackDto {
  id: TrackIdType; // uuid v4
}

export class TrackDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsDefined()
  @IsInt()
  duration: number; // integer number

  @IsUUID()
  @ValidateIf((e) => e === null)
  artistId: ArtistIdType | null; // refers to Artist

  @IsUUID()
  @ValidateIf((e) => e === null)
  albumId: AlbumIdType | null; // refers to Album
}
