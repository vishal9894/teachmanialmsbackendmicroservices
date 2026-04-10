// src/course/course.service.ts
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { Course, CourseType } from './entities/courses.entity';
import { CreateCourseDto } from './dto/create-courses.dto';
import { UpdateCourseDto } from './dto/update-courses.dto';
import { S3Service } from 'src/common/services/s3.service';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
    private readonly s3Service : S3Service,
  ) {}

async create(createCourseDto: CreateCourseDto, files: any) {

  let courseImage: string | undefined;
  let timetablePdf: string | undefined;
  let batchInfo: string | undefined;

  if (files.courseimage?.length) {
    courseImage = await this.s3Service.upload(files.courseimage[0], 'courseimage');
  }

  if (files.timetable?.length) {
    timetablePdf = await this.s3Service.upload(files.timetable[0], 'timetable');
  }

  if (files.batchinfo?.length) {
    batchInfo = await this.s3Service.upload(files.batchinfo[0], 'batchinfo');
  }

  const courseData: DeepPartial<Course> = {
    ...createCourseDto,
    courseImage,
    timetablePdf,
    batchInfo,
  };

  const course = this.courseRepository.create(courseData);

  const savedCourse = await this.courseRepository.save(course);

  return {
    message: 'course created successfully',
    course: savedCourse,
  };
}

 
 async findByType(type: CourseType) {
  const course = await this.courseRepository.find({
    where: { type: type },
  });

  return {
    message : "get all course",
    course
  }
}

 
  async findOne(id: string) {
    const course = await this.courseRepository.findOne({ where: { id } });
    if (!course) throw new NotFoundException('Course not found');
    return course;
  }

  
  async update(id: string, updateCourseDto: UpdateCourseDto) {
    const course = await this.findOne(id);

    Object.assign(course, updateCourseDto);
    return this.courseRepository.save(course);
  }

 async status(id: string, updateCourseDto: UpdateCourseDto) {

  await this.courseRepository.update(id, {
    status: updateCourseDto.status,
  });

  const updatedCourse = await this.findOne(id);

  return {
    message: "Status updated successfully",
    course: updatedCourse,
  };
}

  async remove(id: string) {
    const course = await this.findOne(id);
    await this.courseRepository.remove(course);
    return { message: 'Course deleted successfully' };
  }
}