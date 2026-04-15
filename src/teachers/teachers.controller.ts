import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { CreateTeacherDto } from './dto/create-teacher-dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('teachers')
export class TeachersController {
  constructor(private readonly teachersService: TeachersService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  create(
    @Body() dto: CreateTeacherDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
   
   return this.teachersService.create(dto, file);
  }
  @Get()
  findAll(){
   return this.teachersService.findAll()
  }
}
