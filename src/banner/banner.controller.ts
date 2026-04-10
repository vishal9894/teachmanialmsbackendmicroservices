import { Controller, Post, Body, UploadedFile, UseInterceptors, Get, Query, Delete, Param } from '@nestjs/common';
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
  getByType(@Query('type') type: ContentType) {
    return this.bannerService.findByType(type);
  }
  @Get()
  findall(){
    return this.bannerService.findAll()
  }
  @Delete(':id')
  remove(@Param('id') id:string){
    return this.bannerService.remove(id)
  }
}