import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Song } from '../song/song.entity';
import { SingerAlbum } from './singer-album.entity';

@ApiTags("Singer Albums")
@Controller('singer-albums')
export class SingerAlbumController {

    //route         api/v1/singer-albums
    //access        Public
    @ApiOperation({ description: "Fetching all singer albums from database.", summary: 'Get Singer Albums' })
    @ApiResponse({ status: 200, description: "All singer albums are returned successfully", type: SingerAlbum })
    @Get()
    getAllSingerAlbums() {
        return "Singer Albums"
    }

    //route         api/v1/singer-albums/:id
    //access        Public
    @ApiOperation({ description: "Fetching a singer album from database.", summary: 'Get a Singer Album' })
    @ApiResponse({ status: 200, description: "A singer album is returned successfully", type: SingerAlbum })
    @Get(":id")
    getSingerAlbumById(@Param("id") id: number) {
        return "a singer album"
    }

    //route         api/v1/singer-albums/:id/new-song
    //access        Private
    @ApiOperation({ description: "Create a new song that belongs to a specific singer albums", summary: 'Create a New Song' })
    @ApiResponse({ status: 201, description: "A song is created successfully", type: Song })
    @ApiBearerAuth()
    @Post(":id/new-song")
    createNewSong(@Param("id") id: number, @Body() songData: any) {
        return "a new song is created"
    }


    //route         api/v1/singer-albums/:id/update
    //access        Private
    @ApiOperation({ description: "Update a singer album and save it to database.", summary: 'Update a Singer Album' })
    @ApiResponse({ status: 200, description: "A singer album is updated successfully", type: SingerAlbum })
    @ApiBearerAuth()
    @Put(":id/update")
    updateAlbum(@Param("id") id: number, @Body() songAlbumData: any) {
        return "a new song album is updated"
    }


    //route         api/v1/singer-albums/:id/delete
    //access        Private
    @ApiOperation({ description: "Removing a singer album from database.", summary: 'Delete a Singer Album' })
    @ApiResponse({ status: 200, description: "A singer album is deleted successfully", type: SingerAlbum })
    @ApiBearerAuth()
    @Delete(":id/delete")
    deleteAlbum(@Param("id") id: number) {
        return "a new song album is deleted"
    }

}



