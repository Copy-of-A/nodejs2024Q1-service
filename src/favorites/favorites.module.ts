import { Module } from '@nestjs/common';
import { TrackModule } from 'src/tracks/track.module';
import { AlbumModule } from 'src/albums/album.module';
import { ArtistModule } from 'src/artists/artist.module';
import { FavoritesController } from './favorites.controller';
import { FavoritessService } from './favorites.service';

@Module({
  imports: [TrackModule, AlbumModule, ArtistModule],
  controllers: [FavoritesController],
  providers: [FavoritessService],
  exports: [],
})
export class FavoritesModule {}
