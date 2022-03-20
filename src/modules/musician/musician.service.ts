import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult } from 'typeorm';
import { ArtistType } from '../common/enums/artist-type.enum';
import { Gender } from '../common/enums/gender.enum';
import { CreateAlbumDto } from '../shared/dto/create-album.dto';
import { MusicianAlbum } from '../musician-album/musician-album.entity';
import { Musician } from './musician.entity';
import { MusicianRepository } from './musician.repo';
import * as fs from "fs/promises"

@Injectable()
export class MusicianService {
    constructor(@InjectRepository(MusicianRepository) private musicianRepo: MusicianRepository) { }


    async getAllMusicians(): Promise<Musician[]> {
        return await this.musicianRepo.find();
    }

    async getMusicianById(id: number): Promise<Musician> {
        const musician = await this.musicianRepo.findOne(id);

        if (!musician) throw new NotFoundException(`Musician with the id ${id} is not found`)

        return musician
    }

    async getLimitedMusicians(limit: number): Promise<Musician[]> {
        return await this.musicianRepo.getLimitedMusicians(limit);
    }

    async getFilteredMusicians(limit: number, nationality: string, type: ArtistType, gender: Gender): Promise<Musician[]> {
        return await this.musicianRepo.getFilteredMusicians(limit, nationality, type, gender);
    }

    async createNewMusician(name: string, info: string, gender: Gender, nationality: string, type: ArtistType, image: any): Promise<Musician> {
        const musician = new Musician();
        musician.name = name
        musician.info = info
        musician.gender = gender
        musician.nationality = nationality
        musician.type = type
        musician.image = image
        musician.albums = []
        const savedmusician = await musician.save()
        return savedmusician;
    }

    //implemented later
    async createNewAlbum(musicianId: number, createAlbumDto: CreateAlbumDto): Promise<MusicianAlbum> {
        const musician = await this.getMusicianById(musicianId)
        const musicianAlbum = new MusicianAlbum()
        const { name } = createAlbumDto
        musicianAlbum.name = name
        musicianAlbum.musician = musician // this will create foreign key
        musicianAlbum.image = musician.image
        const savedmusicianAlbum = await musicianAlbum.save()
        return savedmusicianAlbum
    }


    async updateMusician(id: number, name: string, info: string, gender: Gender, nationality: string, type: ArtistType, image: any): Promise<Musician> {

        const musician = await this.getMusicianById(id)
        if (!musician) throw new NotFoundException("Musician not found with the id " + id)
        if (name) musician.name = name
        if (info) musician.info = info
        if (gender) musician.gender = gender
        if (nationality) musician.nationality = nationality
        if (type) musician.type = type

        if (image) {
            await fs.unlink(musician.image)
            musician.image = image
        }

        const savedmusician = await musician.save()
        return savedmusician;
    }

    async deleteMusician(musicianId: number): Promise<DeleteResult> {
        const musician = await this.getMusicianById(musicianId)
        if (!musician) throw new NotFoundException("musician not found with the id " + musicianId)
        await fs.unlink(musician.image)

        const result = await this.musicianRepo.delete(musicianId)
        if (result.affected === 0) {
            throw new InternalServerErrorException("musician cannot be deleted with the id " + musicianId)
        }
        return result
    }


}

