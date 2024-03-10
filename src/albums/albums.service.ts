import { Inject, Injectable } from '@nestjs/common';
import { Album, AlbumDto, AlbumIdType } from './album.interface';
import { v4 as uuidv4 } from 'uuid';
import { ArtistIdType } from 'src/artists/artist.interface';
import { TracksService } from 'src/tracks/tracks.service';

@Injectable()
export class AlbumsService {
  private albums: Album[] = [];

  constructor(
    @Inject(TracksService)
    private tracksService: TracksService,
  ) {}

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

  getAllAlbums(
    predicate: (album: Partial<Album>) => boolean = (album: Partial<Album>) =>
      true,
  ): Album[] {
    return this.albums.filter(predicate);
  }

  getAlbumById(id: AlbumIdType): Album {
    return this.albums.find((album) => album.id === id);
  }

  updateAlbum(id: AlbumIdType, { name, year, artistId }: AlbumDto): Album {
    const album = this.getAlbumById(id);
    if (album) {
      album.name = name;
      album.year = year;
      album.artistId = artistId;
    }
    return album;
  }

  deleteAlbum(id: AlbumIdType): void {
    const currentAlbum = this.albums.find((album) => album.id === id);
    const tracksWithCurrentAlbum = this.tracksService.getAllTracks(
      (track) => currentAlbum.id === track.albumId,
    );
    tracksWithCurrentAlbum.forEach((track) =>
      this.tracksService.updateTrack(track.id, {
        ...track,
        albumId: null,
      }),
    );

    this.albums = this.albums.filter((album) => album.id !== id);
  }
}
