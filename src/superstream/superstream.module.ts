import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuperstreamService } from './superstream.service';
import { SuperstreamController } from './superstream.controller';
import { SuperStream } from './entities/superstream.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([SuperStream]), // ⭐ IMPORTANT
  ],
  controllers: [SuperstreamController],
  providers: [SuperstreamService],
  exports: [SuperstreamService],
})
export class SuperstreamModule {}