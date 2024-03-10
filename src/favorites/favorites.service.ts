import { Inject, Injectable } from '@nestjs/common';
import {
  AddFavoriteResponse,
  Favorites,
  FavoritesResponse,
} from './favorites.interface';
import { Track, TrackIdType } from 'src/tracks/track.interface';
import { Artist, ArtistIdType } from 'src/artists/artist.interface';
import { Album, AlbumIdType } from 'src/albums/album.interface';
import { TracksService } from 'src/tracks/tracks.service';
import { AlbumsService } from 'src/albums/albums.service';
import { ArtistsService } from 'src/artists/artists.service';

@Injectable()
export class FavoritessService {
  private favorites: Favorites = {
    artists: [],
    albums: [],
    tracks: [],
  };

  constructor(
    @Inject(TracksService)
    private tracksService: TracksService,
    @Inject(AlbumsService)
    private albumsService: AlbumsService,
    @Inject(ArtistsService)
    private artistsService: ArtistsService,
  ) {}

  getAllFavoritesArtists(): Artist[] {
    const result = [];
    const filteredArtists = [];
    this.favorites.artists.forEach((favoriteArtistId) => {
      const fav = this.artistsService.getArtistById(favoriteArtistId);
      if (fav) {
        result.push(fav);
        filteredArtists.push(favoriteArtistId);
      }
    });
    return result;
  }

  getAllFavoritesAlbums(): Album[] {
    const result = [];
    const filteredAlbums = [];
    this.favorites.albums.forEach((favoriteAlbumId) => {
      const fav = this.albumsService.getAlbumById(favoriteAlbumId);
      if (fav) {
        result.push(fav);
        filteredAlbums.push(favoriteAlbumId);
      }
    });
    return result;
  }

  getAllFavoritesTracks(): Track[] {
    const result = [];
    const filteredTracks = [];
    this.favorites.tracks.forEach((favoriteTrackId) => {
      const fav = this.tracksService.getTrackById(favoriteTrackId);
      if (fav) {
        result.push(fav);
        filteredTracks.push(favoriteTrackId);
      }
    });
    return result;
  }

  getAllFavorites(): FavoritesResponse {
    const favorites = {
      artists: this.getAllFavoritesArtists(),
      albums: this.getAllFavoritesAlbums(),
      tracks: this.getAllFavoritesTracks(),
    };
    return favorites;
  }

  createFavoriteTrack(id: TrackIdType): AddFavoriteResponse {
    if (!this.tracksService.getTrackById(id)) {
      return null;
    }
    this.favorites.tracks.push(id);
    return { id };
  }

  deleteFavoriteTrack(id: TrackIdType): void {
    if (!this.tracksService.getTrackById(id)) {
      return null;
    }
    this.favorites.tracks = this.favorites.tracks.filter(
      (trackId) => trackId !== id,
    );
  }

  createFavoriteArtist(id: ArtistIdType): AddFavoriteResponse {
    if (!this.artistsService.getArtistById(id)) {
      return null;
    }
    this.favorites.artists.push(id);
    return { id };
  }

  deleteFavoriteArtist(id: ArtistIdType): void {
    if (!this.artistsService.getArtistById(id)) {
      return null;
    }
    this.favorites.artists = this.favorites.artists.filter(
      (artistId) => artistId !== id,
    );
  }

  createFavoriteAlbum(id: AlbumIdType): AddFavoriteResponse {
    if (!this.albumsService.getAlbumById(id)) {
      return null;
    }
    this.favorites.albums.push(id);
    return { id };
  }

  deleteFavoriteAlbum(id: AlbumIdType): void {
    if (!this.albumsService.getAlbumById(id)) {
      return null;
    }
    this.favorites.albums = this.favorites.albums.filter(
      (albumId) => albumId !== id,
    );
  }
}
