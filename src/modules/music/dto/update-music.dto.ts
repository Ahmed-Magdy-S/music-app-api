import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsInstance, IsString , IsOptional } from "class-validator";
import { MusicType } from "src/modules/common/enums/music-type.enum";
import { MusicianAlbum } from "src/modules/musician-album/musician-album.entity";

export class CreateMusicDto {
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

    @ApiPropertyOptional()
    @IsEnum({ name: "type", enum: MusicType })
    @IsOptional()
    type: MusicType

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    source: string

    @ApiPropertyOptional()
    @IsInstance(MusicianAlbum)
    @IsOptional()
    musicianAlbum: MusicianAlbum

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    image: string
}