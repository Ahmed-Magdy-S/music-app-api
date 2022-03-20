import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SingerAlbum } from './singer-album.entity';
import { SingerAlbumController } from './singer-album.controller';
import { SingerAlbumService } from './singer-album.service';

@Module({
    imports: [TypeOrmModule.forFeature([SingerAlbum])],
    controllers: [SingerAlbumController],
    providers: [SingerAlbumService]
})
export class SingerAlbumModule  {
    constructor(){}
}
