import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Teacher } from './entities/teacher.entity';
import { CreateTeacherDto } from './dto/create-teacher-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { S3Service } from 'src/common/services/s3.service';

@Injectable()
export class TeachersService {
  constructor(
    @InjectRepository(Teacher)
    private readonly treacherRepository: Repository<Teacher>,
    private readonly s3Service: S3Service,
  ) {}

  async create(cto: CreateTeacherDto, file: Express.Multer.File) {
    const imageUrl = await this.s3Service.upload(file, 'teachers');

    const data = this.treacherRepository.create({
      ...cto,
      image: imageUrl,
    });

    return {
      message: ' teacher create sucessfully',
      data
    };
  }

  async findAll() {
    const teacher = await this.treacherRepository.find();

    return {
      message: 'fetch all teacher',
      data: teacher,
    };
  }
}
