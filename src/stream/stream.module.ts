import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Stream } from './entities/stream.entity';
import { SuperStream } from '../superstream/entities/superstream.entity';

import { StreamService } from './stream.service';
import { StreamController } from './stream.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Stream, SuperStream]), // ⭐ REQUIRED
  ],
  controllers: [StreamController],
  providers: [StreamService],
})
export class StreamModule {}