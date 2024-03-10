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
import { Track, TrackDto } from './track.interface';
import { TracksService } from './tracks.service';
import { TRACK_NOT_EXIST } from './track.constants';

@Controller('track')
export class TracksController {
  constructor(private tracksService: TracksService) {}

  @Post()
  createTrack(@Body() trackDto: TrackDto): Track {
    return this.tracksService.createTrack(
      trackDto.name,
      trackDto.duration,
      trackDto.artistId,
      trackDto.albumId,
    );
  }

  @Get()
  getAllTracks(): Track[] {
    return this.tracksService.getAllTracks();
  }

  @Get(':id')
  getTrackById(
    @Param(
      'id',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    id: string,
  ): Track {
    const track = this.tracksService.getTrackById(id);
    if (!track) {
      throw new NotFoundException(TRACK_NOT_EXIST);
    }
    return track;
  }

  @Put(':id')
  updateTrackStatus(
    @Param(
      'id',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    id: string,
    @Body() trackDto: TrackDto,
  ): Track {
    const track = this.tracksService.getTrackById(id);
    if (!track) {
      throw new NotFoundException(TRACK_NOT_EXIST);
    }
    return this.tracksService.updateTrack(id, { ...trackDto });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteTrack(
    @Param(
      'id',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    id: string,
  ): void {
    const track = this.tracksService.getTrackById(id);
    if (!track) {
      throw new NotFoundException(TRACK_NOT_EXIST);
    }
    this.tracksService.deleteTrack(id);
  }
}
