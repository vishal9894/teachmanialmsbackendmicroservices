import { Module } from '@nestjs/common';
import { TopStudentsService } from './top-students.service';
import { TopStudentsController } from './top-students.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TopStudents } from './entities/top.student.entity';
import { S3Service } from 'src/common/services/s3.service';

@Module({
  imports :[TypeOrmModule.forFeature([TopStudents]),],
  providers: [TopStudentsService ,S3Service],
  controllers: [TopStudentsController]
})
export class TopStudentsModule {}
