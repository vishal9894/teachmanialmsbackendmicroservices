import { Module } from '@nestjs/common';
import { FoldersController } from './folders.controller';
import { FoldersService } from './folders.service';
import { S3Service } from 'src/common/services/s3.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Folder } from './entities/folder.entity';
import { Course } from 'src/courses/entities/courses.entity';
import { FileContent } from 'src/file-content/entities/file-content-entity';
import { Event } from 'src/events/entities/create-event.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Folder, Course, FileContent , Event])],
  controllers: [FoldersController],
  providers: [FoldersService, S3Service],
})
export class FoldersModule {}
