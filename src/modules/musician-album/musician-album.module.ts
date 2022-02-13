import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MusicianAlbum } from './musician-album.entity';
import { MusicianAlbumController } from './musician-album.controller';

@Module({
    imports: [TypeOrmModule.forFeature([MusicianAlbum])],
    controllers: [MusicianAlbumController]
})
export class MusicianAlbumModule {}
