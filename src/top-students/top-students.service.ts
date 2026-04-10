import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TopStudents } from './entities/top.student.entity';
import { CreateTopStudentDto } from './dto/create-topStudent.dto';
import { S3Service } from 'src/common/services/s3.service';


@Injectable()
export class TopStudentsService {
  constructor(
    @InjectRepository(TopStudents)
    private readonly studentRepository: Repository<TopStudents>,
        private readonly s3Service: S3Service,
  ) {}

  // CREATE
  async create(createDto: CreateTopStudentDto , file?: Express.Multer.File) {
    const imageUrl = file ? await this.s3Service.upload(file, 'students') : undefined;
    const student = this.studentRepository.create({
        ...createDto ,
        image :imageUrl
    });
    const savedStudent = await this.studentRepository.save(student);
    return {
      message: 'Student created successfully',
      data: savedStudent,
    };
  }

  // GET ALL
  async findAll() {
    const students = await this.studentRepository.find();
    return {
      message: 'Students fetched successfully',
      data: students,
    };
  }

  // GET BY ID
  async findOne(id: string) {
    const student = await this.studentRepository.findOne({ where: { id } });
    if (!student) throw new NotFoundException('Student not found');
    return {
      message: 'Student fetched successfully',
      data: student,
    };
  }

  // UPDATE
  async update(id: string, updateDto: CreateTopStudentDto, file: any) {
    const student = await this.studentRepository.findOne({ where: { id } });
    if (!student) throw new NotFoundException('Student not found');

    Object.assign(student, updateDto);
    const updatedStudent = await this.studentRepository.save(student);
    return {
      message: 'Student updated successfully',
      data: updatedStudent,
    };
  }

  // DELETE
  async remove(id: string) {
    const student = await this.studentRepository.findOne({ where: { id } });
    if (!student) throw new NotFoundException('Student not found');

    await this.studentRepository.remove(student);
    return {
      message: 'Student deleted successfully',
    };
  }
}