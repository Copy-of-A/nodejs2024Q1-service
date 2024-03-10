import { Injectable } from '@nestjs/common';
import { Artist, ArtistIdType } from './artist.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ArtistsService {
  private artists: Artist[] = [];

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

  getAllArtists(): Artist[] {
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
    this.artists = this.artists.filter((artist) => artist.id !== id);
  }
}
