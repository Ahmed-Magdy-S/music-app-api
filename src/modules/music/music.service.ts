import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult } from 'typeorm';
import { MusicType } from '../common/enums/music-type.enum';
import { Music } from './music.entity';
import { MusicRepository } from './music.repo';
import * as fs from "fs/promises"

@Injectable()
export class MusicService {

    constructor(@InjectRepository(MusicRepository) private musicRepo: MusicRepository) { }

    async getAllMusics(): Promise<Music[]> {
        return await this.musicRepo.find()

    }

    async getLimitedMusics(limit: number): Promise<Music[]> {
        return await this.musicRepo.getLimitedMusics(limit)
    }

    async getMusicById(id: number): Promise<Music> {
        const music = await this.musicRepo.findOne(id)
        if (!music) throw new NotFoundException("music not found with the id: " + id)
        return music
    }

    async getFilteredMusics(limit: number, type: MusicType, rate: number,): Promise<Music[]> {
        return await this.musicRepo.getFilteredMusics(limit, type, rate,)
    }


    async updateMusic(id: number, name: string, description: string, artist: string, type: MusicType, source: string): Promise<Music> {
        const music = await this.getMusicById(id)
        if (name) music.name = name
        if (description) music.description = description
        if (artist) music.artist = artist
        if (type) music.type = type
        if (source) {
            await fs.unlink(music.source)
            music.source = source
        }


        return await music.save()

    }

    async deleteMusic(id: number): Promise<DeleteResult> {
        const music = await this.getMusicById(id)

        if (music.source) await fs.unlink(music.source)

        const result = await this.musicRepo.delete(id)

        if (result.affected === 0) throw new NotFoundException("music not found with the id: " + id)

        return result

    }

}
