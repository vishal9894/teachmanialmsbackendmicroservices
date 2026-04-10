import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { TopTeacherService } from './top-teacher.service';
import { topTeacherDto } from './dto/create-topTeacher';

@Controller('top-teacher')
export class TopTeacherController {

  constructor(private readonly service: TopTeacherService) {}

  /* CREATE */
  @Post('create')
  @UseInterceptors(FileInterceptor('image'))
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: topTeacherDto,
  ) {
    return this.service.create(dto, file);
  }

  /* GET */
  @Get()
  getTeacher() {
    return this.service.getTeacher();
  }

  /* UPDATE */
  @Patch(':id')
  @UseInterceptors(FileInterceptor('image'))
  update(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: topTeacherDto,
  ) {
    return this.service.update(id, dto, file);
  }

  /* DELETE */
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }
}