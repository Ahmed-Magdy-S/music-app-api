import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MusicianRepository } from './musician.repo';
import { MusicianController } from './musician.controller';
import { MusicianService } from './musician.service';
import { PassportModule } from '@nestjs/passport';

@Module({
    imports:[PassportModule.register({defaultStrategy: "jwt" }),TypeOrmModule.forFeature([MusicianRepository])],
    controllers: [MusicianController],
    providers: [MusicianService]
})
export class MusicianModule {}
 