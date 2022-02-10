import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SongRepository } from './song.repo';

@Module({
    imports: [TypeOrmModule.forFeature([SongRepository])]
})
export class SongModule {}
