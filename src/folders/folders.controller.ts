import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FoldersService } from './folders.service';

import { FileInterceptor } from '@nestjs/platform-express';

@Controller('folders')
export class FoldersController {
  constructor(private readonly folderServices: FoldersService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(@Body() body: any, @UploadedFile() file: Express.Multer.File) {
    return this.folderServices.create(body, file);
  }

  @Get(':id')
  getfolder(@Param('id') id: string) {
    return this.folderServices.fetchAll(id);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.folderServices.remove(id);
  }
  @Put(':id')
  @UseInterceptors(FileInterceptor('image'))
  update(
    @Param('id') id: string,
    @Body() body: any,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.folderServices.update(id, body, file);
  }
}
