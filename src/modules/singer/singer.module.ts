import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SingerRepository } from './singer.repo';
import { SingerController } from './singer.controller';
import { SingerService } from './singer.service';

@Module({
    imports: [TypeOrmModule.forFeature([SingerRepository])],
    controllers: [SingerController],
    providers: [SingerService]
}) 
export class SingerModule {}
