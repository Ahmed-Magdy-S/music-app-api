import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MusicianRepository } from './musician.repo';

@Module({
    imports:[TypeOrmModule.forFeature([MusicianRepository])]
})
export class MusicianModule {}
