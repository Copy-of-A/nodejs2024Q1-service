import { Injectable, Inject } from '@nestjs/common';
import { Artist, ArtistIdType } from './artist.interface';
import { v4 as uuidv4 } from 'uuid';
import { TracksService } from 'src/tracks/tracks.service';
import { AlbumsService } from 'src/albums/albums.service';

@Injectable()
export class ArtistsService {
  private artists: Artist[] = [];

  constructor(
    @Inject(TracksService)
    private tracksService: TracksService,
    @Inject(AlbumsService)
    private albumsService: AlbumsService,
  ) {}

  createArtist(name: string, grammy = false): Artist {
    const id = uuidv4();
    const artist: Artist = {
      id,
      name,
      grammy,
    };
    this.artists.push(artist);
    return artist;
  }

  getAllArtists(
    predicate: (artist: Partial<Artist>) => boolean = (
      artist: Partial<Artist>,
    ) => true,
  ): Artist[] {
    return this.artists;
  }

  getArtistById(id: ArtistIdType): Artist {
    return this.artists.find((artist) => artist.id === id);
  }

  updateArtist(id: ArtistIdType, name: string, grammy: boolean): Artist {
    const artist = this.getArtistById(id);
    if (artist) {
      artist.name = name;
      artist.grammy = grammy;
    }
    return artist;
  }

  deleteArtist(id: ArtistIdType): void {
    const currentArtist = this.artists.find((artist) => artist.id === id);

    if (currentArtist) {
      const tracksWithCurrentArtist = this.tracksService.getAllTracks(
        (track) => currentArtist.id === track.artistId,
      );
      tracksWithCurrentArtist.forEach((track) =>
        this.tracksService.updateTrack(track.id, {
          ...track,
          artistId: null,
        }),
      );

      const albumsWithCurrentArtist = this.albumsService.getAllAlbums(
        (album) => currentArtist.id === album.artistId,
      );
      albumsWithCurrentArtist.forEach((album) =>
        this.albumsService.updateAlbum(album.id, {
          ...album,
          artistId: null,
        }),
      );
    }

    this.artists = this.artists.filter((artist) => artist.id !== id);
  }
}
