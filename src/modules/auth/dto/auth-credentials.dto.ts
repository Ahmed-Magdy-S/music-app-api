import { IsEmail, IsString } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class AuthCredentialsDto {
    @ApiProperty()
    @IsString()
    username: string

    @ApiProperty()
    @IsString()
    password: string

    @ApiProperty()
    @IsEmail()
    email : string
}