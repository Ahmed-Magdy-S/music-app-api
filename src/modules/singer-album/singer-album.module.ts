import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SingerAlbum } from './singer-album.entity';
import { SingerAlbumController } from './singer-album.controller';

@Module({
    imports: [TypeOrmModule.forFeature([SingerAlbum])],
    controllers: [SingerAlbumController]
})
export class SingerAlbumModule  {}
