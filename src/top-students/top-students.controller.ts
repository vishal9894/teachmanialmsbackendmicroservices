import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { TopStudentsService } from './top-students.service';


import { CreateTopStudentDto } from './dto/create-topStudent.dto';

@Controller('top-student')
export class TopStudentsController {
  constructor(private readonly service: TopStudentsService) {}

  @Post('create')
  @UseInterceptors(FileInterceptor('image'))
  create(
    @Body() createDto: CreateTopStudentDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.service.create(createDto, file);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('image'))
  update(
    @Param('id') id: string,
    @Body() updateDto: CreateTopStudentDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.service.update(id, updateDto, file);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}