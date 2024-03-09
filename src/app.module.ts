import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtistsController } from './artists/artists.controller';
import { ArtistsService } from './artists/artists.service';
import { AlbumsController } from './albums/albums.controller';
import { AlbumsService } from './albums/albums.service';

@Module({
  imports: [],
  controllers: [AppController, ArtistsController, AlbumsController],
  providers: [AppService, ArtistsService, AlbumsService],
})
export class AppModule {}
