import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';

import { FileContentService } from './file-content.service';
import { CreateContentDto } from './dto/create-file-content-dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('content')
export class FileContentController {
  constructor(private readonly service: FileContentService) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'file', maxCount: 1 },
      { name: 'thumbnail', maxCount: 1 },
    ]),
  )
  create(
    @Body() dto: CreateContentDto,
    @UploadedFiles()
    files: {
      file?: Express.Multer.File[];
      thumbnail?: Express.Multer.File[];
    },
  ) {
    const pdf = files?.file?.[0];
    const thumb = files?.thumbnail?.[0];

   

    return this.service.create(dto, pdf, thumb);
  }
  @Get(':id')
  fetchByParentId(@Param('id') id: string) {
    return this.service.fetchByParentId(id);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
