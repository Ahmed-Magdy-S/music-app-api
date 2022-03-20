import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Music } from '../music/music.entity';
import { CreateAlbumDto } from '../shared/dto/create-album.dto';
import { MusicianAlbum } from './musician-album.entity';
import { CreateMusicDto} from "../music/dto/create-music.dto"

@Injectable()
export class MusicianAlbumService {
    constructor(@InjectRepository(MusicianAlbum) private musicianAlbumRepo: Repository<MusicianAlbum>) {

    }

    async getAllMusicianAlbums(): Promise<MusicianAlbum[]> {
        return await this.musicianAlbumRepo.find()
    }

    async getMusicianAlbumById(id: number): Promise<MusicianAlbum> {
        const musicianAlbum = await this.musicianAlbumRepo.findOne(id)
        if (!musicianAlbum) throw new NotFoundException(`musician Album with the id ${id} is not found`)
        return musicianAlbum
    }

    async createMusic(musicianAlbumId: number, musicDto: CreateMusicDto, source:string): Promise<Music> {
        const {name, description , artist , type } = musicDto
        const music = new Music()
        const musicianAlbum = await this.getMusicianAlbumById(musicianAlbumId)
        music.name = name
        music.description = description
        music.artist = artist
        music.source = source
        music.type = type
        music.musicianAlbum = musicianAlbum
        music.image = musicianAlbum.image
        return await music.save()
    }

    async updateMusicianAlbum(id: number, updateMusicianAlbumDto: CreateAlbumDto): Promise<MusicianAlbum> {
        const musicianAlbum = await this.getMusicianAlbumById(id)
        const { name } = updateMusicianAlbumDto
        if (name) musicianAlbum.name = name

        return await musicianAlbum.save()
    }

    async deleteMusicianAlbum(id: number): Promise<DeleteResult> {
        const result = await this.musicianAlbumRepo.delete(id)

        if (result.affected === 0) throw new NotFoundException(`Musician Album with the ID ${id} is not found`);

        return result
    }

}
