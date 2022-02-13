import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SongType } from '../common/enums/song-type.enum';
import { Song } from './song.entity';

@ApiTags("Songs")
@Controller('songs')
export class SongController {


    //route         api/v1/songs
    //access        Public
    @ApiOperation({ description: "Fetching all songs from database.", summary: 'Get Songs' })
    @ApiResponse({ status: 200, description: "All songs are returned successfully", type: Song })
    @Get()
    getAllSongs() {
        return "all Songs"
    }

    //route         api/v1/songs/:id
    //access        Public
    @ApiOperation({ description: "Fetching a single song from database.", summary: 'Get a Song' })
    @ApiResponse({ status: 200, description: "A song is returned successfully", type: Song })
    @Get(":id")
    getSongById(@Param("id") id: number) {
        return "Songs"
    }

    //route         api/v1/songs/limited
    //access        Public
    @ApiOperation({ description: "Fetching limited songs from database.", summary: 'Get Limited Songs' })
    @ApiResponse({ status: 200, description: "Limited songs are returned successfully", type: Song })
    @Get("limited")
    getLimtedSongs(@Query("limit") limit: number) {
        return "limited Songs"
    }

    //route         api/v1/songs/filtered
    //access        Public
    @ApiOperation({ description: "Fetching filtered songs from database according to some request queries.", summary: 'Get Filtered Songs' })
    @ApiResponse({ status: 200, description: "Filtered songs are returned successfully", type: Song })
    @Get("filtered")
    getFilteredSongs(@Query("limit") limit: number, @Query("type") type: SongType, @Query("rate") rate: number) {
        return "filtered Songs"
    }


    //route         api/v1/songs/:id/update
    //access        Private
    @ApiBearerAuth()
    @ApiOperation({ description: "Update a single song and save it to database.", summary: 'Update a Song' })
    @ApiResponse({ status: 200, description: "A song is updated successfully", type: Song })
    @Put(":id/update")
    updateSong(@Param("id") id: number, @Body() songData: any) {
        return "update Song"
    }

    //route         api/v1/songs/:id/delete
    //access        Private
    @ApiBearerAuth()
    @ApiOperation({ description: "Removing a single song from database.", summary: 'Delete a Song' })
    @ApiResponse({ status: 200, description: "A song is deleted successfully", type: Song })
    @Delete(":id/delete")
    deleteSong(@Param("id") id: number) {
        return "Song is deleted"
    }


    //route         api/v1/songs/:songId/add-to-playlist/:playlistId
    //access        Private
    @ApiBearerAuth()
    @ApiOperation({ description: "Add a single song to a playlist and save it to database.", summary: 'Add a Song to Playlist' })
    @ApiResponse({ status: 200, description: "A song is added to playlist successfully", type: Song })
    @Post(":songId/add-to-playlist/:playlistId")
    @HttpCode(200)
    addToPlaylist(@Param("songId") songId: number, @Param("playlistId") playlistId: number) {
        return "song is added to playlist"
    }


    //route         api/v1/songs/:songId/add-to-favorite-list/:favoriteId
    //access        Private
    @ApiBearerAuth()
    @ApiOperation({ description: "Add a single song to a favorite list and save it to database.", summary: 'Add a Song to Favorites' })
    @ApiResponse({ status: 200, description: "A song is added to favorite list successfully", type: Song })
    @Post(":songId/add-to-favorite-list/:favoriteId")
    @HttpCode(200)
    addToFavoriteList(@Param("songId") songId: number, @Param("favoriteId") favoriteId: number) {
        return "song is added to favorite list"
    }





}
