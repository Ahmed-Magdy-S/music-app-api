import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MusicType } from '../common/enums/music-type.enum';
import { Music } from './music.entity';
import { MusicService } from './music.service';
import { diskStorage } from 'multer';
import { editFileName } from 'src/helpers/handling-file-upload';

@ApiTags("Musics")
@Controller('musics')
export class MusicController {
    constructor(private musicService: MusicService) { }

    //route         api/v1/musics
    //access        Public
    @ApiOperation({ description: "Fetching all musics from database.", summary: 'Get Musics' })
    @ApiResponse({ status: 200, description: "All musics are returned successfully", type: Music })
    @Get()
    getAllMusics() {
        return this.musicService.getAllMusics()
    }

    //route         api/v1/musics/:id
    //access        Public
    @ApiOperation({ description: "Fetching a single music from database.", summary: 'Get a Music' })
    @ApiResponse({ status: 200, description: "A music is returned successfully", type: Music })
    @Get(":id")
    getMusicById(@Param("id") id: number) {
        return this.musicService.getMusicById(id)
    }

    //route         api/v1/musics/limited
    //access        Public
    @ApiOperation({ description: "Fetching limited musics from database.", summary: 'Get Limited Musics' })
    @ApiResponse({ status: 200, description: "Limited musics are returned successfully", type: Music })
    @Get("limited")
    getLimtedMusics(@Query("limit") limit: number) {
        return this.musicService.getLimitedMusics(limit)
    }

    //route         api/v1/musics/filtered
    //access        Public
    @ApiOperation({ description: "Fetching filtered musics from database according to some request queries.", summary: 'Get Filtered Musics' })
    @ApiResponse({ status: 200, description: "Filtered musics are returned successfully", type: Music })
    @Get("filtered")
    getFilteredMusics(@Query("limit") limit: number, @Query("type") type: MusicType, @Query("rate") rate: number) {
        return this.musicService.getFilteredMusics(limit, type, rate)
    }


    //route         api/v1/musics/:id/update
    //access        Private
    @ApiBearerAuth()
    @ApiOperation({ description: "Update a single music and save it to database.", summary: 'Update a Music' })
    @ApiResponse({ status: 200, description: "A music is updated successfully", type: Music })
    @Put(":id/update")
    @UseInterceptors(FileInterceptor("source", {
        storage: diskStorage({
            destination: "./upload/musics",
            filename: editFileName
        })
    }))
    updateMusic(@Param("id") id: number, @Body() musicData: any, @UploadedFile() source: any) {
        const { name, description, artist, type } = musicData
        return this.musicService.updateMusic(id, name, description, artist, type, source.path)
    }

    //route         api/v1/musics/:id/delete
    //access        Private
    @ApiBearerAuth()
    @ApiOperation({ description: "Removing a single music from database.", summary: 'Delete a Music' })
    @ApiResponse({ status: 200, description: "A music is deleted successfully", type: Music })
    @Delete(":id/delete")
    deleteMusic(@Param("id") id: number) {
        return this.musicService.deleteMusic(id)
    }


    //route         api/v1/musics/:musicId/add-to-playlist/:playlistId
    //access        Private
    @ApiBearerAuth()
    @ApiOperation({ description: "Add a single music to a playlist and save it to database.", summary: 'Add a Music to Playlist' })
    @ApiResponse({ status: 200, description: "A music is added to playlist successfully", type: Music })
    @Post(":musicId/add-to-playlist/:playlistId")
    @HttpCode(200)
    addToPlaylist(@Param("musicId") musicId: number, @Param("playlistId") playlistId: number) {
        return "music is added to playlist"
    }


    //route         api/v1/musics/:musicId/add-to-favorite-list/:favoriteId
    //access        Private
    @ApiBearerAuth()
    @ApiOperation({ description: "Add a single music to a favorite list and save it to database.", summary: 'Add a Music to Favorites' })
    @ApiResponse({ status: 200, description: "A music is added to favorite list successfully", type: Music })
    @Post(":musicId/add-to-favorite-list/:favoriteId")
    @HttpCode(200)
    addToFavoriteList(@Param("musicId") musicId: number, @Param("favoriteId") favoriteId: number) {
        return "music is added to favorite list"
    }


}
