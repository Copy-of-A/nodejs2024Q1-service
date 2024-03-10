import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlbumModule } from './albums/album.module';
import { ArtistModule } from './artists/artist.module';
import { TrackModule } from './tracks/track.module';
import { UserModule } from './users/user.module';
import { FavoritesModule } from './favorites/favorites.module';

@Module({
  imports: [
    AlbumModule,
    ArtistModule,
    TrackModule,
    UserModule,
    FavoritesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
