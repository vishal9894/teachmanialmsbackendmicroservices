import { Module } from '@nestjs/common';
import { TopTeacherService } from './top-teacher.service';
import { TopTeacherController } from './top-teacher.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TopTeachers } from './entities/top.teacher.entity';
import { S3Module } from 'src/common/services/s3.module';

@Module({
   imports: [TypeOrmModule.forFeature([TopTeachers]),S3Module],
  providers: [TopTeacherService , S3Module],
  controllers: [TopTeacherController]
})
export class TopTeacherModule {}
