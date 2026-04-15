import { Module } from '@nestjs/common';
import { TeachersController } from './teachers.controller';
import { TeachersService } from './teachers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teacher } from './entities/teacher.entity';
import { S3Service } from 'src/common/services/s3.service';

@Module({
  imports:[TypeOrmModule.forFeature([Teacher])],
  controllers: [TeachersController],
  providers: [TeachersService , S3Service]
})
export class TeachersModule {}
