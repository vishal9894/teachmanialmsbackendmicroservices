import { Module } from '@nestjs/common';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './entities/create-event.entity';
import { S3Service } from 'src/common/services/s3.service';

@Module({
  imports:[TypeOrmModule.forFeature([Event])],
  controllers: [EventsController],
  providers: [EventsService , S3Service]
})
export class EventsModule {}
