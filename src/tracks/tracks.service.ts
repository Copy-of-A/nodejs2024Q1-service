import { Injectable } from '@nestjs/common';
import { Track, TrackDto, TrackIdType } from './track.interface';
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

  getAllTracks(
    predicate: (track: Partial<Track>) => boolean = (track: Partial<Track>) =>
      true,
  ): Track[] {
    return this.tracks.filter(predicate);
  }

  getTrackById(id: TrackIdType): Track {
    return this.tracks.find((track) => track.id === id);
  }

  updateTrack(
    id: TrackIdType,
    { name, duration, artistId, albumId }: TrackDto,
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
