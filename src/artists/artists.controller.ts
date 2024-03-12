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
import { Artist, ArtistDto, ArtistIdType } from './artist.interface';
import { ArtistsService } from './artists.service';
import { ARTIST_NOT_EXIST } from './artist.constants';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Artist')
@Controller('artist')
export class ArtistsController {
  constructor(private artistsService: ArtistsService) {}

  @Post()
  createArtist(@Body() artistDto: ArtistDto): Artist {
    return this.artistsService.createArtist(artistDto.name, artistDto.grammy);
  }

  @Get()
  getAllArtists(): Artist[] {
    return this.artistsService.getAllArtists();
  }

  @Get(':id')
  getArtistById(
    @Param(
      'id',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    id: ArtistIdType,
  ): Artist {
    const artist = this.artistsService.getArtistById(id);
    if (!artist) {
      throw new NotFoundException(ARTIST_NOT_EXIST);
    }
    return artist;
  }

  @Put(':id')
  updateArtistStatus(
    @Param(
      'id',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    id: ArtistIdType,
    @Body() artistDto: ArtistDto,
  ): Artist {
    const artist = this.artistsService.getArtistById(id);
    if (!artist) {
      throw new NotFoundException(ARTIST_NOT_EXIST);
    }
    return this.artistsService.updateArtist(
      id,
      artistDto.name,
      artistDto.grammy,
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteArtist(
    @Param(
      'id',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    id: ArtistIdType,
  ): void {
    const artist = this.artistsService.getArtistById(id);
    if (!artist) {
      throw new NotFoundException(ARTIST_NOT_EXIST);
    }
    this.artistsService.deleteArtist(id);
  }
}
