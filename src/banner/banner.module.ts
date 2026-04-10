import { Module } from '@nestjs/common';
import { BannerController } from './banner.controller';
import { BannerService } from './banner.service';
import { S3Service } from 'src/common/services/s3.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Banner } from './entities/banner.entity';

@Module({
   imports: [TypeOrmModule.forFeature([Banner])],
  controllers: [BannerController],
  providers: [BannerService , S3Service]
})
export class BannerModule {}
