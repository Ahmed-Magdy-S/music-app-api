import { IsEnum, IsInt, IsString } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"
import { Gender } from "src/modules/common/enums/gender.enum"

export class CreateProfileDto {
    @ApiProperty()
    @IsString()
    firstName: string

    @ApiProperty()
    @IsString()
    lastName: string

    @ApiProperty()
    @IsString()
    phone : string

    @ApiProperty()
    @IsInt()
    age: number


    @ApiProperty({ name: "gender", enum: Gender })
    @IsEnum(Gender)
    gender: Gender


    @ApiProperty()
    @IsString()
    country: string


    @ApiProperty()
    @IsString()
    city: string

    @ApiProperty()
    @IsString()
    address: string
}