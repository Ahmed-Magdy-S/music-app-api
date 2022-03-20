import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MusicianAlbum } from './musician-album.entity';
import { MusicianAlbumController } from './musician-album.controller';
import { MusicianAlbumService } from './musician-album.service';

@Module({
    imports: [TypeOrmModule.forFeature([MusicianAlbum])],
    controllers: [MusicianAlbumController],
    providers: [MusicianAlbumService]
})
export class MusicianAlbumModule {}
