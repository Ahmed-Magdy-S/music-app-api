import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { ArtistType } from "src/modules/common/enums/artist-type.enum"
import { IsString, IsEnum, IsOptional } from "class-validator"
import { Gender } from "src/modules/common/enums/gender.enum"
export class CreateSingerDto {
    @ApiProperty()
    @IsString()
    name: string

    @ApiProperty()
    @IsString()
    info: string

    @ApiProperty({ name: "gender", enum: Gender })
    @IsEnum(Gender)
    gender: Gender

    @ApiProperty()
    @IsString()
    nationality: string

    @ApiProperty({ enum: ArtistType })
    @IsEnum(ArtistType)
    type: ArtistType

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    image: string
}