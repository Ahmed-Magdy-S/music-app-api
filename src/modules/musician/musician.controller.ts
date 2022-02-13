import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ArtistType } from '../common/enums/artist-type.enum';
import { Gender } from '../common/enums/gender.enum';
import { MusicianAlbum } from '../musician-album/musician-album.entity';
import { CreateAlbumDto } from '../shared/dto/create-album.dto';
import { CreateMusicianDto } from './dto/create-musician.dto';
import { UpdateMusicianDto } from './dto/update-musician.dto';
import { Musician } from './musician.entity';

@ApiTags("Musicians")
@Controller('musicians')
export class MusicianController {

    //route         api/v1/musicians
    //access        Public
    @Get()
    @ApiOperation({ description: "Fetching all musicians from database.", summary: 'Get all Musicians' })
    @ApiResponse({ status: 200, description: "All musicians are returned successfully", type: Musician })
    getAllMusicians() {
        return "All musicians"
    }

    //route         api/v1/musicians/filtered
    //access        Public
    @Get("filtered")
    @ApiOperation({ description: "Fetching all musicians from database with some filtering options.", summary: 'Get Filtered Musicians' })
    @ApiResponse({ status: 200, description: "All filtered musicians are returned successfully", type: Musician })
    getFilteredMusicians(@Query("limit") limit: number, @Query("nationality") nationality: string, @Query("type") type: ArtistType, @Query("gender") gender: Gender) {
        return "filtered musicians"
    }


    //route         api/v1/musicians/limited
    //access        Public
    @Get("limited")
    @ApiOperation({ description: "Fetching limited number of musicians from database.", summary: 'Get Limited Musicians' })
    @ApiResponse({ status: 200, description: "All limited musicians are returned successfully", type: Musician })
    getLimitedMusicians(@Query("limit") limit: number) {
        return "limited musicians"
    }


    //route         api/v1/musicians
    //access        Private
    @Post()
    @ApiBearerAuth()
    @ApiOperation({ description: "Create a new musician and add it to database.", summary: 'Create a Musician' })
    @ApiResponse({ status: 200, description: "A new musician is created successfully", type: Musician })
    createMusician(@Body() createMusicianDto: CreateMusicianDto) {
        return "create musicians"
    }

    //route         api/v1/musicians/:id
    //access        Public
    @Get(":id")
    @ApiOperation({ description: "Get a musician from database by id.", summary: 'Get a Musician' })
    @ApiResponse({ status: 200, description: "A musician is returned successfully", type: Musician })
    getMusicianById(@Param("id") id: number) {
        return "musician by id"
    }

    //route         api/v1/musicians/:id/new-album
    //access        Private
    @Post(":id/new-album")
    @ApiBearerAuth()
    @ApiOperation({ description: "Create a new album that belongs to a specific musician", summary: 'Create a New Musician Album' })
    @ApiResponse({ status: 201, description: "A new musician album is created successfully", type: MusicianAlbum })
    createMusicianAlbum(@Param("id") id: number, @Body() createMusicianAlbumDto: CreateAlbumDto) {
        return "new musician album created"
    }

    //route         api/v1/musicians/:id/update
    //access        Private
    @Put(":id/update")
    @ApiBearerAuth()
    @ApiOperation({ description: "Update the details of a specific musician.", summary: 'Update Musician' })
    @ApiResponse({ status: 200, description: "A musician has been updated successfully", type: Musician })
    updateMusician(@Param("id") id: number, @Body() updateMusicianDto: UpdateMusicianDto) {
        return "musician updated"
    }

    //route         api/v1/musicians/:id/delete
    //access        Private
    @Delete(":id/delete")
    @ApiBearerAuth()
    @ApiOperation({ description: "Delete a specific musician", summary: 'Delete Musician' })
    @ApiResponse({ status: 200, description: "A musician has been deleted successfully", type: Musician })
    deleteMusician(@Param("id") id: number) {
        return "musician deleted"
    }




}

