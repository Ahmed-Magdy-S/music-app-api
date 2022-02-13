import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SingerRepository } from './singer.repo';
import { SingerController } from './singer.controller';

@Module({
    imports: [TypeOrmModule.forFeature([SingerRepository])],
    controllers: [SingerController]
})
export class SingerModule {}
