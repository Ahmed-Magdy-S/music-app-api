import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { CreateProfileDto } from './dto/create-profile.dto';

@ApiTags("Authentication")
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){}

    @ApiOperation({ description: "Create a user and register them to database", summary: 'User Registration' })
    @ApiResponse({ status: 201, description: "A user has been created successfully" })
    @Post("register")
    register(@Body("authCredentialsDto") authCredentialsDto: AuthCredentialsDto, @Body("createProfileDto") createProfileDto: CreateProfileDto) {
            return this.authService.register(authCredentialsDto, createProfileDto)
    }


    @ApiOperation({ description: "Verify user email", summary: 'Email Verification' })
    @ApiResponse({ status: 200, description: "A user email has been verified successfully" })
    @Get("email/verify/:token")
    verifyEmail(@Param("token") token: string){
        return this.authService.verifyEmail(token)
    } 



}

