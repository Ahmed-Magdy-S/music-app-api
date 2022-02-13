import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArtistType } from '../common/enums/artist-type.enum';
import { Gender } from '../common/enums/gender.enum';
import { Singer } from './singer.entity';
import { SingerRepository } from './singer.repo';

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
        // singer.image = image; to be implement later
        await singer.save()
        return singer;
    }

    //implemented later
    async createNewAlbum(singerId: number){

    }





}

