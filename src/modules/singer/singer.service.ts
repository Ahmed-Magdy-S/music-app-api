import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult } from 'typeorm';
import { ArtistType } from '../common/enums/artist-type.enum';
import { Gender } from '../common/enums/gender.enum';
import { CreateAlbumDto } from '../shared/dto/create-album.dto';
import { SingerAlbum } from '../singer-album/singer-album.entity';
import { Singer } from './singer.entity';
import { SingerRepository } from './singer.repo';
import * as fs from "fs/promises"

@Injectable()
export class SingerService {
    constructor(@InjectRepository(SingerRepository) private singerRepo: SingerRepository) { }


    async getAllSingers(): Promise<Singer[]> {
        return await this.singerRepo.find();
    }

    async getSingerById(id: number): Promise<Singer> {
        const singer = await this.singerRepo.findOne(id);

        if (!singer) throw new NotFoundException(`Singer with the id ${id} is not found`)

        return singer
    }

    async getLimitedSingers(limit: number): Promise<Singer[]> {
        return await this.singerRepo.getLimitedSingers(limit);
    }

    async getFilteredSingers(limit: number, nationality: string, type: ArtistType, gender: Gender): Promise<Singer[]> {
        return await this.singerRepo.getFilteredSingers(limit, nationality, type, gender);
    }

    async createNewSinger(name: string, info: string, gender: Gender, nationality: string, type: ArtistType, image: any): Promise<Singer> {
        const singer = new Singer();
        singer.name = name
        singer.info = info
        singer.gender = gender
        singer.nationality = nationality
        singer.type = type
        singer.image = image
        singer.albums = []
        const savedSinger = await singer.save()
        return savedSinger;
    }

    //implemented later
    async createNewAlbum(singerId: number, createAlbumDto: CreateAlbumDto): Promise<SingerAlbum> {
        const singer = await this.getSingerById(singerId)
        const singerAlbum = new SingerAlbum()
        const { name } = createAlbumDto
        singerAlbum.name = name
        singerAlbum.singer = singer // this will create foreign key
        singerAlbum.image = singer.image
        const savedSingerAlbum = await singerAlbum.save()
        return savedSingerAlbum
    }


    async updateSinger(id: number, name: string, info: string, gender: Gender, nationality: string, type: ArtistType, image: any): Promise<Singer> {

        const singer = await this.getSingerById(id)
        if (!singer) throw new NotFoundException("Singer not found with the id " + id)
        if (name) singer.name = name
        if (info) singer.info = info
        if (gender) singer.gender = gender
        if (nationality) singer.nationality = nationality
        if (type) singer.type = type

        if (image) {
            await fs.unlink(singer.image)
            singer.image = image
        }

        const savedSinger = await singer.save()
        return savedSinger;
    }

    async deleteSinger(singerId: number): Promise<DeleteResult> {
        const singer = await this.getSingerById(singerId)
        if (!singer) throw new NotFoundException("Singer not found with the id " + singerId)

        const result = await this.singerRepo.delete(singerId)
        if (result.affected === 0) {
            throw new InternalServerErrorException("Singer cannot be deleted not found with the id " + singerId)
        }
        return result
    }


}

