import {
  Controller,
  Post,
  Body,
  UploadedFile,
  UseInterceptors,
  Get,
  Query,
  Delete,
  Param,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { BannerService } from './banner.service';
import { CreateBannerDto } from './dto/create-banner.dto';
import { ContentType } from './entities/banner.entity';

@Controller('banners')
export class BannerController {
  constructor(private readonly bannerService: BannerService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image')) // 'image' is the field name
  async create(
    @Body() createBannerDto: CreateBannerDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.bannerService.create(createBannerDto, file);
  }

  @Get()
  findAll(@Query('type') type?: ContentType) {
    if (type) {
      return this.bannerService.findByType(type);
    }
    return this.bannerService.findAll();
  }

  @Get('stream/:streamId')
  findByStream(@Param('streamId') streamId: string) {
    return this.bannerService.findByStream(streamId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bannerService.remove(id);
  }
}
