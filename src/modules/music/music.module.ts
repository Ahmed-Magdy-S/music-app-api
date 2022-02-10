import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MusicRepository } from './music.repo';

@Module({
    imports: [TypeOrmModule.forFeature([MusicRepository])]
})
export class MusicModule {}
