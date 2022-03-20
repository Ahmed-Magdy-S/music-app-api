import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { SongLanguage } from '../common/enums/song-language.enum';
import { SongType } from '../common/enums/song-type.enum';
import { CreateAlbumDto } from '../shared/dto/create-album.dto';
import { Song } from '../song/song.entity';
import { SingerAlbum } from './singer-album.entity';

@Injectable()
export class SingerAlbumService {
    constructor(@InjectRepository(SingerAlbum) private singerAlbumRepo: Repository<SingerAlbum>) {

    }

    async getAllSingerAlbums(): Promise<SingerAlbum[]> {
        return await this.singerAlbumRepo.find()
    }

    async getSingerAlbumById(id: number): Promise<SingerAlbum> {
        const singerAlbum = await this.singerAlbumRepo.findOne(id)
        if (!singerAlbum) throw new NotFoundException(`Singer Album with the id ${id} is not found`)
        return singerAlbum
    }

    async createSong(singerAlbumId: number, name: string, description: string, artist: string, type: SongType, language: SongLanguage, source: any): Promise<Song> {
        const song = new Song()
        const singerAlbum = await this.getSingerAlbumById(singerAlbumId)
        song.name = name
        song.description = description
        song.artist = artist
        song.type = type
        song.language = language
        song.image = singerAlbum.image
        song.source = source
        song.singerAlbum = singerAlbum

        return await song.save()
    }

    async updateSingerAlbum(id: number, createSingerAlbum: CreateAlbumDto): Promise<SingerAlbum> {
        const singerAlbum = await this.getSingerAlbumById(id)
        const { name } = CreateAlbumDto
        if (name) singerAlbum.name = name

        return await singerAlbum.save()
    }

    async deleteSingerAlbum(id: number): Promise<DeleteResult> {
        const result = await this.singerAlbumRepo.delete(id)

        if (result.affected === 0) throw new NotFoundException(`Singer Album with the ID ${id} is not found`);

        return result
    }

}
