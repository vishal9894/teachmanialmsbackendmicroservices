import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Req,
  Put,
  Patch,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { LoginAdminDto } from './dto/login-admin.dto';
import { Request } from 'express';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  create(
    @Body() dto: CreateAdminDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.adminService.create(dto, file);
  }

  @Post('login')
  login(@Body() dto: LoginAdminDto) {
    console.log(dto);

    return this.adminService.login(dto);
  }

  @Get()
  findAll() {
    return this.adminService.findAll();
  }

  @Get('profile')
  getProfile(@Req() req: Request & { admin?: any }) {
    const adminData = req.admin;
    return this.adminService.getProfile(adminData.id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('image'))
  update(
    @Param('id') id: string,
    @Body() updateAdminDto: UpdateAdminDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.adminService.update(id, updateAdminDto, file);
  }
  @Delete(':id')
  delelte(@Param('id') id: string) {
    return this.adminService.delete(id);
  }
}
