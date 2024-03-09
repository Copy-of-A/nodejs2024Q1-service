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
      throw new NotFoundException('Album does not exist!');
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
      throw new NotFoundException('Album does not exist!');
    }
    return this.albumsService.updateAlbum(
      id,
      albumDto.name,
      albumDto.year,
      albumDto.artistId,
    );
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
      throw new NotFoundException('Album does not exist!');
    }
    this.albumsService.deleteAlbum(id);
  }
}
