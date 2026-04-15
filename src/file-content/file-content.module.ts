import { Module } from '@nestjs/common';
import { FileContentController } from './file-content.controller';
import { FileContentService } from './file-content.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileContent } from './entities/file-content-entity';
import { S3Service } from 'src/common/services/s3.service';

@Module({
  imports : [TypeOrmModule.forFeature([FileContent])] ,
  controllers: [FileContentController],
  providers: [FileContentService , S3Service]
})
export class FileContentModule {}
