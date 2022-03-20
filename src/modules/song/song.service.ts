import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult } from 'typeorm';
import { SongLanguage } from '../common/enums/song-language.enum';
import { SongType } from '../common/enums/song-type.enum';
import { Song } from './song.entity';
import { SongRepository } from './song.repo';
import * as fs from "fs/promises"

@Injectable()
export class SongService {
    constructor(@InjectRepository(SongRepository) private songRepo: SongRepository) { }

    async getAllSongs(): Promise<Song[]> {
        return await this.songRepo.find()

    }

    async getLimitedSongs(limit: number): Promise<Song[]> {
        return await this.songRepo.getLimitedSongs(limit)
    }

    async getSongById(id: number): Promise<Song> {
        const song = await this.songRepo.findOne(id)
        if (!song) throw new NotFoundException("Song not found with the id: " + id)
        return song
    }

    async getFilteredSongs(limit: number, type: SongType, rate: number, language: SongLanguage): Promise<Song[]> {
        return await this.songRepo.getFilteredSongs(limit, type, rate, language)
    }


    async updateSong(id: number, name: string, description: string, artist: string, type: SongType, language: SongLanguage, source: string): Promise<Song> {
        const song = await this.getSongById(id)
        if (name) song.name = name
        if (description) song.description = description
        if (artist) song.artist = artist
        if (type) song.type = type
        if (language) song.language = language
        if (source) {
            await fs.unlink(source)
            song.source = source
        }

        return await song.save()

    }

    async deleteSong(id:number): Promise<DeleteResult>{
        const song = await this.getSongById(id)

        if (song.source) await fs.unlink(song.source)

        const result = await this.songRepo.delete(id)

        if (result.affected === 0) throw new NotFoundException("Song not found with the id: " + id)

        return result

    }


}
