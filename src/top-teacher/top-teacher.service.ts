import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { topTeacherDto } from './dto/create-topTeacher';
import { TopTeachers } from './entities/top.teacher.entity';
import { S3Service } from 'src/common/services/s3.service';


@Injectable()
export class TopTeacherService {

  constructor(
    @InjectRepository(TopTeachers)
    private readonly teacherRepository: Repository<TopTeachers>,
    private readonly s3Service: S3Service,
  ) {}

  async create(dto: topTeacherDto, file?: Express.Multer.File) {

    // ✅ TS-safe: use undefined instead of null
    const imageUrl = file ? await this.s3Service.upload(file, 'teachers') : undefined;

    const teacher = this.teacherRepository.create({
      ...dto,
      image: imageUrl, // ✅ undefined if no file
    });

    const savedTeacher = await this.teacherRepository.save(teacher);

    return {
      message: 'Teacher created successfully',
      data: savedTeacher,
    };
  }

  async getTeacher() {
    const data = await this.teacherRepository.find();

    return {
      message: 'Teachers fetched successfully',
      data,
    };
  }
  async update(
    id: string,
    dto: topTeacherDto,
    file?: Express.Multer.File,
  ) {
    const teacher = await this.teacherRepository.findOne({
      where: { id },
    });

    if (!teacher) {
      throw new NotFoundException('Teacher not found');
    }

    if (file) {
      teacher.image = await this.s3Service.upload(file, 'teachers');
    }

    Object.assign(teacher, dto);

    const updatedTeacher = await this.teacherRepository.save(teacher);

    return {
      message: 'Teacher updated successfully',
      data: updatedTeacher,
    };
  }

  /* ================= DELETE ================= */
  async delete(id: string) {
    const teacher = await this.teacherRepository.findOne({
      where: { id },
    });

    if (!teacher) {
      throw new NotFoundException('Teacher not found');
    }

    await this.teacherRepository.remove(teacher);

    return {
      message: 'Teacher deleted successfully',
    };
  }
}