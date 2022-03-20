import { ApiPropertyOptional } from "@nestjs/swagger"
import { IsEnum, IsOptional, IsString } from "class-validator"
import { SongLanguage } from "src/modules/common/enums/song-language.enum"
import { SongType } from "src/modules/common/enums/song-type.enum"


export class UpdateSongDto {

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    name: string

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    description: string

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    artist: string

    @ApiPropertyOptional({ name: "type", enum: SongType })
    @IsEnum(SongType)
    @IsOptional()
    type: SongType

    @ApiPropertyOptional({ name: "language", enum: SongLanguage })
    @IsEnum(SongLanguage)
    @IsOptional()
    language: SongLanguage

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    source: string


    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    image: string


}