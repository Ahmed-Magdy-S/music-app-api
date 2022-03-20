import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
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
import { MailerModule } from '@nestjs-modules/mailer';

import config from './config/config';
import { PostgresqlConfigService } from './config/database';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({ useClass: PostgresqlConfigService, inject: [PostgresqlConfigService] }),
    MailerModule.forRoot(config.NODE_MAILER),
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

  ],
  providers: [PostgresqlConfigService]
})
export class AppModule { }
