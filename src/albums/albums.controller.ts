import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
  NotFoundException,
} from '@nestjs/common';
import { Album, AlbumDto } from './album.interface';
import { AlbumsService } from './albums.service';

const ALBUM_NOT_EXIST = 'Album does not exist!';

@Controller('album')
export class AlbumsController {
  constructor(private albumsService: AlbumsService) {}

  @Post()
  createAlbum(@Body() albumDto: AlbumDto): Album {
    return this.albumsService.createAlbum(
      albumDto.name,
      albumDto.year,
      albumDto.artistId,
    );
  }

  @Get()
  getAllAlbums(): Album[] {
    return this.albumsService.getAllAlbums();
  }

  @Get(':id')
  getAlbumById(
    @Param(
      'id',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    id: string,
  ): Album {
    const album = this.albumsService.getAlbumById(id);
    if (!album) {
      throw new NotFoundException(ALBUM_NOT_EXIST);
    }
    return album;
  }

  @Put(':id')
  updateAlbumStatus(
    @Param(
      'id',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    id: string,
    @Body() albumDto: AlbumDto,
  ): Album {
    const album = this.albumsService.getAlbumById(id);
    if (!album) {
      throw new NotFoundException(ALBUM_NOT_EXIST);
    }
    return this.albumsService.updateAlbum(id, { ...albumDto });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteAlbum(
    @Param(
      'id',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    id: string,
  ): void {
    const album = this.albumsService.getAlbumById(id);
    if (!album) {
      throw new NotFoundException(ALBUM_NOT_EXIST);
    }
    this.albumsService.deleteAlbum(id);
  }
}
