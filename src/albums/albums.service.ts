import { Injectable } from '@nestjs/common';
import { Album } from './album.interface';
import { v4 as uuidv4 } from 'uuid';
import { ArtistIdType } from 'src/artists/artist.interface';

@Injectable()
export class AlbumsService {
  private albums: Album[] = [];

  createAlbum(name: string, year: number, artistId: ArtistIdType): Album {
    const id = uuidv4();
    const album: Album = {
      id,
      name,
      year,
      artistId,
    };
    this.albums.push(album);
    return album;
  }

  getAllAlbums(): Album[] {
    return this.albums;
  }

  getAlbumById(id: string): Album {
    return this.albums.find((album) => album.id === id);
  }

  updateAlbum(
    id: string,
    name: string,
    year: number,
    artistId: ArtistIdType,
  ): Album {
    const album = this.getAlbumById(id);
    if (album) {
      album.name = name;
      album.year = year;
      album.artistId = artistId;
    }
    return album;
  }

  deleteAlbum(id: string): void {
    this.albums = this.albums.filter((album) => album.id !== id);
  }
}
