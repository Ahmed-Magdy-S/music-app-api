import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ArtistType } from '../common/enums/artist-type.enum';
import { Gender } from '../common/enums/gender.enum';
import { CreateAlbumDto } from '../shared/dto/create-album.dto';
import { SingerAlbum } from '../singer-album/singer-album.entity';
import { CreateSingerDto } from './dto/create-singer.dto';
import { UpdateSingerDto } from './dto/update-singer.dto';
import { Singer } from './singer.entity';
import { SingerService } from './singer.service';


@ApiTags("Singers")
@Controller('singers')
export class SingerController {
    constructor(private singerService: SingerService) {

    }

    //route         api/v1/singers
    //access        Public
    @Get()
    @ApiOperation({ description: "Fetching all singers from database.", summary: 'Get all Singers' })
    @ApiResponse({ status: 200, description: "All singers are returned successfully", type: Singer })
    getAllSingers() {
        return this.singerService.getAllSingers()
    }

    //route         api/v1/singers/filtered
    //access        Public
    @Get("filtered")
    @ApiOperation({ description: "Fetching all singers from database with some filtering options.", summary: 'Get Filtered Singers' })
    @ApiResponse({ status: 200, description: "All filtered singers are returned successfully", type: Singer })
    getFilteredSingers(@Query("limit") limit: number, @Query("nationality") nationality: string, @Query("type") type: ArtistType, @Query("gender") gender: Gender) {
        return this.singerService.getFilteredSingers(limit, nationality, type, gender)
    }


    //route         api/v1/singers/limited
    //access        Public
    @Get("limited")
    @ApiOperation({ description: "Fetching limited number of singers from database.", summary: 'Get Limited Singers' })
    @ApiResponse({ status: 200, description: "All limited singers are returned successfully", type: Singer })
    getLimitedSingers(@Query("limit") limit: number) {
        return this.singerService.getLimitedSingers(limit)
    }


    //route         api/v1/singers
    //access        Private
    //implement later
    @Post()
    @ApiBearerAuth()
    @ApiOperation({ description: "Create a new singer and add it to database.", summary: 'Create a Singer' })
    @ApiResponse({ status: 200, description: "A new singer is created successfully", type: Singer })
    createSinger(@Body() createSingerDto: CreateSingerDto) {
        return "create singers"
    }

    //route         api/v1/singers/:id
    //access        Public
    @Get(":id")
    @ApiOperation({ description: "Get a Singer from database by id.", summary: 'Get a Singer' })
    @ApiResponse({ status: 200, description: "A singer is returned successfully", type: Singer })
    getSingersById(@Param("id") id: number) {
        return this.singerService.getSingerById(id)
    }

    //route         api/v1/singers/:id/new-album
    //access        Private
    @Post(":id/new-album")
    @ApiBearerAuth()
    @ApiOperation({ description: "Create a new album that belongs to a specific singer", summary: 'Create a New Singer Album' })
    @ApiResponse({ status: 201, description: "A new singer album is created successfully", type: SingerAlbum })
    createSingersAlbum(@Param("id") id: number, @Body() createSingerAlbumDto: CreateAlbumDto) {
        return this.singerService.createNewAlbum(id, createSingerAlbumDto)
    }

    //route         api/v1/singers/:id/update
    //access        Private
    //implement later
    @Put(":id/update")
    @ApiBearerAuth()
    @ApiOperation({ description: "Update the details of a specific singer.", summary: 'Update Singer' })
    @ApiResponse({ status: 200, description: "A singer has been updated successfully", type: Singer })
    updateSinger(@Param("id") id: number, @Body() updateSingerDto: UpdateSingerDto) {
        return "singer updated"
    }

    //route         api/v1/singers/:id/delete
    //access        Private

    @Delete(":id/delete")
    @ApiBearerAuth()
    @ApiOperation({ description: "Delete a specific singer", summary: 'Delete Singer' })
    @ApiResponse({ status: 200, description: "A singer has been deleted successfully", type: Singer })
    deleteSinger(@Param("id") id: number) {
        return this.singerService.deleteSinger(id)
    }





}
