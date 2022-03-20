import { Body, Controller, Delete, Get, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { editFileName } from 'src/helpers/handling-file-upload';
import { CreateMusicDto } from '../music/dto/create-music.dto';
import { Music } from '../music/music.entity';
import { CreateAlbumDto } from '../shared/dto/create-album.dto';
import { MusicianAlbum } from './musician-album.entity';
import { MusicianAlbumService } from './musician-album.service';
import { Express } from 'express';

@ApiTags("Musician Albums")
@Controller('musician-albums')
export class MusicianAlbumController {
    constructor(private musicianAlbumService: MusicianAlbumService) { }

    //route         api/v1/musician-albums
    //access        Public
    @ApiOperation({ description: "Fetching all musician albums from database.", summary: 'Get Musician Albums' })
    @ApiResponse({ status: 200, description: "All musician albums are returned successfully", type: MusicianAlbum })
    @Get()
    getAllMusicianAlbums() {
        return this.musicianAlbumService.getAllMusicianAlbums()
    }

    //route         api/v1/musician-albums/:id
    //access        Public
    @ApiOperation({ description: "Fetching a musician album from database.", summary: 'Get a musician Album' })
    @ApiResponse({ status: 200, description: "A musician album is returned successfully", type: MusicianAlbum })
    @Get(":id")
    getMusicianAlbumById(@Param("id") id: number) {
        return this.musicianAlbumService.getMusicianAlbumById(id)
    }

    //route         api/v1/musician-albums/:id/new-music
    //access        Private
    @ApiOperation({ description: "Create a new music that belongs to a specific musician albums", summary: 'Create a New Music' })
    @ApiResponse({ status: 201, description: "A Music is created successfully", type: Music })
    @ApiBearerAuth()
    @Post(":id/new-music")
    @UseInterceptors(FileInterceptor("source", {
        storage: diskStorage({
            destination: "./upload/musics",
            filename: editFileName
        })
    }))
    createNewMusic(@Param("id") id: number, @Body() musicData: CreateMusicDto, source: Express.Multer.File) {
        return this.musicianAlbumService.createMusic(id, musicData, source.path)
    }


    //route         api/v1/musician-albums/:id/update
    //access        Private
    @ApiOperation({ description: "Update a musician album and save it to database.", summary: 'Update a Musician Album' })
    @ApiResponse({ status: 200, description: "A musician album is updated successfully", type: MusicianAlbum })
    @ApiBearerAuth()
    @Put(":id/update")
    updateAlbum(@Param("id") id: number, @Body() musicianAlbumData: CreateAlbumDto) {
        return this.musicianAlbumService.updateMusicianAlbum(id, musicianAlbumData)
    }


    //route         api/v1/musician-albums/:id/delete
    //access        Private
    @ApiOperation({ description: "Removing a musician album from database.", summary: 'Delete a Musician Album' })
    @ApiResponse({ status: 200, description: "A musician album is deleted successfully", type: MusicianAlbum })
    @ApiBearerAuth()
    @Delete(":id/delete")
    deleteAlbum(@Param("id") id: number) {
        return this.musicianAlbumService.deleteMusicianAlbum(id)
    }



}
