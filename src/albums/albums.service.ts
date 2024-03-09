import { Injectable } from '@nestjs/common';
import { Album } from './album.interface';
import { v4 as uuidv4 } from 'uuid';
import { ArtistIdType } from 'src/artists/artist.interface';

@Injectable()
export class AlbumsService {
  private albums: Album[] = [];

  createAlbum(name: string, year: number, artistId: ArtistIdType): Album {
    const id = uuidv4();
    const artist: Album = {
      id,
      name,
      year,
      artistId,
    };
    this.albums.push(artist);
    return artist;
  }

  getAllAlbums(): Album[] {
    return this.albums;
  }

  getAlbumById(id: string): Album {
    return this.albums.find((artist) => artist.id === id);
  }

  updateAlbum(
    id: string,
    name: string,
    year: number,
    artistId: ArtistIdType,
  ): Album {
    const artist = this.getAlbumById(id);
    if (artist) {
      artist.name = name;
      artist.year = year;
      artist.artistId = artistId;
    }
    return artist;
  }

  deleteAlbum(id: string): void {
    this.albums = this.albums.filter((artist) => artist.id !== id);
  }
}
