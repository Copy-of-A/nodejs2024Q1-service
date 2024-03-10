import { Injectable } from '@nestjs/common';
import { Track, TrackIdType } from './track.interface';
import { v4 as uuidv4 } from 'uuid';
import { ArtistIdType } from 'src/artists/artist.interface';
import { AlbumIdType } from 'src/albums/album.interface';

@Injectable()
export class TracksService {
  private tracks: Track[] = [];

  createTrack(
    name: string,
    duration: number,
    artistId: ArtistIdType,
    albumId: AlbumIdType,
  ): Track {
    const id = uuidv4();
    const track: Track = {
      id,
      name,
      duration,
      artistId,
      albumId,
    };
    this.tracks.push(track);
    return track;
  }

  getAllTracks(): Track[] {
    return this.tracks;
  }

  getTrackById(id: TrackIdType): Track {
    return this.tracks.find((track) => track.id === id);
  }

  updateTrack(
    id: TrackIdType,
    name: string,
    duration: number,
    artistId: ArtistIdType,
    albumId: AlbumIdType,
  ): Track {
    const track = this.getTrackById(id);
    if (track) {
      track.name = name;
      track.duration = duration;
      track.artistId = artistId;
      track.albumId = albumId;
    }
    return track;
  }

  deleteTrack(id: TrackIdType): void {
    this.tracks = this.tracks.filter((track) => track.id !== id);
  }
}
