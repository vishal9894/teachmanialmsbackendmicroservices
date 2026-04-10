import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Stream } from './entities/stream.entity';
import { SuperStream } from '../superstream/entities/superstream.entity';

import { StreamService } from './stream.service';
import { StreamController } from './stream.controller';
import { S3Module } from 'src/common/services/s3.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Stream, SuperStream]), // ⭐ REQUIRED
  S3Module],
  controllers: [StreamController],
  providers: [StreamService],
})
export class StreamModule {}