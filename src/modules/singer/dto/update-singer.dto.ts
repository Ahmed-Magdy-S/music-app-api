import { ApiPropertyOptional } from "@nestjs/swagger"
import { IsEnum, IsOptional, IsString } from "class-validator"
import { ArtistType } from "src/modules/common/enums/artist-type.enum"
import { Gender } from "src/modules/common/enums/gender.enum"

export class UpdateSingerDto {
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    name: string

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    info: string

    @ApiPropertyOptional({ name: "gender", enum: Gender })
    @IsOptional()
    @IsEnum(Gender)
    gender: Gender

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    nationality: string

    @ApiPropertyOptional({ enum: ArtistType })
    @IsOptional()
    @IsEnum(ArtistType)
    type: ArtistType

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    image: string
}
