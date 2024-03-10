import { Module } from '@nestjs/common';
import { ArtistsController } from './artists.controller';
import { ArtistsService } from './artists.service';
import { TrackModule } from 'src/tracks/track.module';
import { AlbumModule } from 'src/albums/album.module';

@Module({
  imports: [TrackModule, AlbumModule],
  controllers: [ArtistsController],
  providers: [ArtistsService],
  exports: [ArtistsService],
})
export class ArtistModule {}
