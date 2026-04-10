import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFiles,
  Get,
  Query,
  Put,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CreateCourseDto } from './dto/create-courses.dto';
import { CoursesService } from './courses.service';
import { CourseType } from './entities/courses.entity';
import { UpdateCourseDto } from './dto/update-courses.dto';

@Controller('courses')
export class CoursesController {
  constructor(private readonly courseService: CoursesService) {}

@Post()
@UseInterceptors(
  FileFieldsInterceptor([
    { name: 'courseimage', maxCount: 1 },
    { name: 'timetable', maxCount: 1 },
    { name: 'batchinfo', maxCount: 1 },
  ]),
)
create(
  @UploadedFiles()
  files: {
    courseimage?: Express.Multer.File[];
    timetable?: Express.Multer.File[];
    batchinfo?: Express.Multer.File[];
  },
  @Body() body: CreateCourseDto,
) {
  return this.courseService.create(body, files);
}
  @Get()
  findAll(@Query('type') type: CourseType) {
    return this.courseService.findByType(type);
  }
  @Patch(':id')
  updateStatus(@Param('id') id: string, @Body() dto: UpdateCourseDto) {
    console.log(id);
    return this.courseService.status(id, dto);
  }
  @Delete(':id')
  remove (@Param('id') id:string){
    return this.courseService.remove(id)
  }
}
