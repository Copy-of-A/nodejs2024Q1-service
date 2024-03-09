import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtistsController } from './artists/artists.controller';
import { ArtistsService } from './artists/artists.service';

@Module({
  imports: [],
  controllers: [AppController, ArtistsController],
  providers: [AppService, ArtistsService],
})
export class AppModule {}
