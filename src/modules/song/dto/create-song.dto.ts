import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsEnum, IsInstance, IsNumber, IsOptional, IsString } from "class-validator"
import { SongLanguage } from "src/modules/common/enums/song-language.enum"
import { SongType } from "src/modules/common/enums/song-type.enum"
import { SingerAlbum } from "src/modules/singer-album/singer-album.entity"


export class CreateSongDto {

    @ApiProperty()
    @IsString()
    name: string

    @ApiProperty()
    @IsString()
    description: string

    @ApiProperty()
    @IsString()
    artist: string

    @ApiProperty()
    @IsNumber()
    rate: number

    @ApiProperty({ name: "type", enum: SongType })
    @IsEnum(SongType)
    type: SongType

    @ApiProperty({ name: "language", enum: SongLanguage })
    @IsEnum(SongLanguage)
    language: SongLanguage

    @IsInstance(SingerAlbum)
    singerAlbum: SingerAlbum


    @ApiProperty()
    @IsString()
    image: string

}