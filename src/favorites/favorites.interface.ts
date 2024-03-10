import { Album, AlbumIdType } from 'src/albums/album.interface';
import { Artist, ArtistIdType } from 'src/artists/artist.interface';
import { Track, TrackIdType } from 'src/tracks/track.interface';

export interface Favorites {
  artists: string[]; // favorite artists ids
  albums: string[]; // favorite albums ids
  tracks: string[]; // favorite tracks ids
}

export interface FavoritesResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}

export class AddFavoriteResponse {
  id: AlbumIdType | ArtistIdType | TrackIdType;
}
