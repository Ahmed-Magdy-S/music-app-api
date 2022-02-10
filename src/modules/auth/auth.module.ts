import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './repos/userRepo';

@Module({
    imports: [TypeOrmModule.forFeature([UserRepository])]
})
export class AuthModule {}
