import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SingerRepository } from './singer.repo';

@Module({
    imports: [TypeOrmModule.forFeature([SingerRepository])]
})
export class SingerModule {}
