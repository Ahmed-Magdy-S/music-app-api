import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './repos/userRepo';
import { JwtModule } from '@nestjs/jwt'
import { JwtStrategy } from './strategies/jwt-strategy';
import { EmailVerification } from './entities/email-verification.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
    imports: [PassportModule.register({defaultStrategy: "jwt" }), JwtModule.register({ secret: "secret key", signOptions: { expiresIn: "10h" } }), TypeOrmModule.forFeature([UserRepository, EmailVerification])],
    providers:[JwtStrategy, AuthService],
    exports: [JwtStrategy, JwtModule, PassportModule],
    controllers: [AuthController]
})
export class AuthModule { }
