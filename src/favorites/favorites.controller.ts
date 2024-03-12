import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
  UnprocessableEntityException,
  NotFoundException,
} from '@nestjs/common';
import { FavoritesResponse, AddFavoriteResponse } from './favorites.interface';
import { FavoritessService } from './favorites.service';
import { ArtistIdType } from 'src/artists/artist.interface';
import { ARTIST_NOT_EXIST } from 'src/artists/artist.constants';
import { AlbumIdType } from 'src/albums/album.interface';
import { TrackIdType } from 'src/tracks/track.interface';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Favorites')
@Controller('favs')
export class FavoritesController {
  constructor(private favoritesService: FavoritessService) {}

  @Get()
  getAllFavorites(): FavoritesResponse {
    return this.favoritesService.getAllFavorites();
  }

  @Post('/artist/:id')
  createFavoriteArtist(
    @Param(
      'id',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    id: ArtistIdType,
  ): AddFavoriteResponse {
    const result = this.favoritesService.createFavoriteArtist(id);
    if (result === null) {
      throw new UnprocessableEntityException(ARTIST_NOT_EXIST);
    }
    return result;
  }

  @Post('/album/:id')
  createFavoriteAlbum(
    @Param(
      'id',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    id: AlbumIdType,
  ): AddFavoriteResponse {
    const result = this.favoritesService.createFavoriteAlbum(id);
    if (result === null) {
      throw new UnprocessableEntityException(ARTIST_NOT_EXIST);
    }
    return result;
  }

  @Post('/track/:id')
  createFavoriteTrack(
    @Param(
      'id',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    id: TrackIdType,
  ): AddFavoriteResponse {
    const result = this.favoritesService.createFavoriteTrack(id);
    if (result === null) {
      throw new UnprocessableEntityException(ARTIST_NOT_EXIST);
    }
    return result;
  }

  @Delete('/artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteArtist(
    @Param(
      'id',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    id: ArtistIdType,
  ): void {
    const result = this.favoritesService.deleteFavoriteArtist(id);
    if (result === null) {
      throw new NotFoundException(ARTIST_NOT_EXIST);
    }
  }

  @Delete('/album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteAlbum(
    @Param(
      'id',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    id: AlbumIdType,
  ): void {
    const result = this.favoritesService.deleteFavoriteAlbum(id);
    if (result === null) {
      throw new NotFoundException(ARTIST_NOT_EXIST);
    }
  }

  @Delete('/track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteTrack(
    @Param(
      'id',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    id: TrackIdType,
  ): void {
    const result = this.favoritesService.deleteFavoriteTrack(id);
    if (result === null) {
      throw new NotFoundException(ARTIST_NOT_EXIST);
    }
  }
}
