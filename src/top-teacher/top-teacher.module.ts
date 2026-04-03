import { Module } from '@nestjs/common';
import { TopTeacherService } from './top-teacher.service';
import { TopTeacherController } from './top-teacher.controller';

@Module({
  providers: [TopTeacherService],
  controllers: [TopTeacherController]
})
export class TopTeacherModule {}
