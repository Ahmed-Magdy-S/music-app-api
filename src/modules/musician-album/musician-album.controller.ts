import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Music } from '../music/music.entity';
import { MusicianAlbum } from './musician-album.entity';
 
@ApiTags("Musician Albums")
@Controller('musician-albums')
export class MusicianAlbumController {


    //route         api/v1/musician-albums
    //access        Public
    @ApiOperation({ description: "Fetching all musician albums from database.", summary: 'Get Musician Albums' })
    @ApiResponse({ status: 200, description: "All musician albums are returned successfully", type: MusicianAlbum })
    @Get()
    getAllMusicianAlbums() {
        return "musician Albums"
    }

    //route         api/v1/musician-albums/:id
    //access        Public
    @ApiOperation({ description: "Fetching a musician album from database.", summary: 'Get a musician Album' })
    @ApiResponse({ status: 200, description: "A musician album is returned successfully", type: MusicianAlbum })
    @Get(":id")
    getMusicianAlbumById(@Param("id") id: number) {
        return "a musician album"
    }

    //route         api/v1/musician-albums/:id/new-song
    //access        Private
    @ApiOperation({ description: "Create a new music that belongs to a specific musician albums", summary: 'Create a New Music' })
    @ApiResponse({ status: 201, description: "A song is created successfully", type: Music })
    @ApiBearerAuth()
    @Post(":id/new-music")
    createNewSong(@Param("id") id: number, @Body() musicData: any) {
        return "a new music is created"
    }


    //route         api/v1/musician-albums/:id/update
    //access        Private
    @ApiOperation({ description: "Update a musician album and save it to database.", summary: 'Update a Musician Album' })
    @ApiResponse({ status: 200, description: "A musician album is updated successfully", type: MusicianAlbum })
    @ApiBearerAuth()
    @Put(":id/update")
    updateAlbum(@Param("id") id: number, @Body() musicianAlbumData: any) {
        return "a new musician album is updated"
    }


    //route         api/v1/musician-albums/:id/delete
    //access        Private
    @ApiOperation({ description: "Removing a musician album from database.", summary: 'Delete a Musician Album' })
    @ApiResponse({ status: 200, description: "A musician album is deleted successfully", type: MusicianAlbum })
    @ApiBearerAuth()
    @Delete(":id/delete")
    deleteAlbum(@Param("id") id: number) {
        return "a new musician album is deleted"
    }



}
