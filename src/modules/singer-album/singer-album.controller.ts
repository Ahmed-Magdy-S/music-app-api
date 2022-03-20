import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateAlbumDto } from '../shared/dto/create-album.dto';
import { CreateSongDto } from '../song/dto/create-song.dto';
import { Song } from '../song/song.entity';
import { SingerAlbum } from './singer-album.entity';
import { SingerAlbumService } from './singer-album.service';
import { Express } from 'express';
import { diskStorage } from 'multer';
import { editFileName } from 'src/helpers/handling-file-upload';

@ApiTags("Singer Albums")
@Controller('singer-albums')
export class SingerAlbumController {
    constructor(private singerAlbumService: SingerAlbumService) { }

    //route         api/v1/singer-albums
    //access        Public
    @ApiOperation({ description: "Fetching all singer albums from database.", summary: 'Get Singer Albums' })
    @ApiResponse({ status: 200, description: "All singer albums are returned successfully", type: SingerAlbum })
    @Get()
    getAllSingerAlbums() {
        return this.singerAlbumService.getAllSingerAlbums()
    }

    //route         api/v1/singer-albums/:id
    //access        Public
    @ApiOperation({ description: "Fetching a singer album from database.", summary: 'Get a Singer Album' })
    @ApiResponse({ status: 200, description: "A singer album is returned successfully", type: SingerAlbum })
    @Get(":id")
    getSingerAlbumById(@Param("id") id: number) {
        return this.getSingerAlbumById(id)
    }

    //route         api/v1/singer-albums/:id/new-song
    //access        Private
    @ApiOperation({ description: "Create a new song that belongs to a specific singer albums", summary: 'Create a New Song' })
    @ApiResponse({ status: 201, description: "A song is created successfully", type: Song })
    @ApiBearerAuth()
    @Post(":id/new-song")
    @UseInterceptors(FileInterceptor("source", {
        storage: diskStorage({
            destination: "./upload/songs",
            filename: editFileName
        })
    }))
    createNewSong(@Param("id") id: number, @Body() songData: CreateSongDto, @UploadedFile() source: Express.Multer.File) {
        const { name, description, artist, type, language } = songData

        return this.singerAlbumService.createSong(id, name, description, artist, type, language, source.path)
    }


    //route         api/v1/singer-albums/:id/update
    //access        Private
    @ApiOperation({ description: "Update a singer album and save it to database.", summary: 'Update a Singer Album' })
    @ApiResponse({ status: 200, description: "A singer album is updated successfully", type: SingerAlbum })
    @ApiBearerAuth()
    @Put(":id/update")
    updateAlbum(@Param("id") id: number, @Body() singerAlbumData: CreateAlbumDto) {

        return this.singerAlbumService.updateSingerAlbum(id, singerAlbumData)
    }


    //route         api/v1/singer-albums/:id/delete
    //access        Private
    @ApiOperation({ description: "Removing a singer album from database.", summary: 'Delete a Singer Album' })
    @ApiResponse({ status: 200, description: "A singer album is deleted successfully", type: SingerAlbum })
    @ApiBearerAuth()
    @Delete(":id/delete")
    deleteAlbum(@Param("id") id: number) {
        return this.singerAlbumService.deleteSingerAlbum(id)
    }

}



