import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { ProfileModule } from './modules/profile/profile.module';
import { SingerModule } from './modules/singer/singer.module';
import { MusicianModule } from './modules/musician/musician.module';
import { FavoriteModule } from './modules/favorite/favorite.module';
import { PlaylistModule } from './modules/playlist/playlist.module';
import { SongModule } from './modules/song/song.module';
import { MusicModule } from './modules/music/music.module';
import { SingerAlbumModule } from './modules/singer-album/singer-album.module';
import { MusicianAlbumModule } from './modules/musician-album/musician-album.module';
import { NotificationModule } from './modules/notification/notification.module';
import { TrackModule } from './modules/track/track.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'ahmed',
      password: '0000',
      database: 'music app',
      entities: [__dirname + "/**/*.entity{.ts,.js}"],
      synchronize: true,
    }),
    AuthModule,
    ProfileModule,
    SingerModule,
    MusicianModule,
    FavoriteModule,
    PlaylistModule,
    SongModule,
    MusicModule,
    SingerAlbumModule,
    MusicianAlbumModule,
    NotificationModule,
    TrackModule,
  ]
})
export class AppModule { }
