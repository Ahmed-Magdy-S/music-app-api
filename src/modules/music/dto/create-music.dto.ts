import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsInstance, IsString } from "class-validator";
import { MusicType } from "src/modules/common/enums/music-type.enum";
import { MusicianAlbum } from "src/modules/musician-album/musician-album.entity";

export class CreateMusicDto {
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
    @IsEnum({ name: "type", enum: MusicType })
    type: MusicType

    @ApiProperty()
    @IsString()
    source: string

    @ApiProperty()
    @IsInstance(MusicianAlbum)
    musicianAlbum: MusicianAlbum

    @ApiProperty()
    @IsString()
    image: string

}