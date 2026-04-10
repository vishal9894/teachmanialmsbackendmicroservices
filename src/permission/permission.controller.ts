import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { Permission } from './entities/permission.entity';

@Controller('permissions')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Get()
  async findAll(): Promise<Permission[]> {
    return this.permissionService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Permission> {
    return this.permissionService.findOne(+id);
  }

  @Post()
  async create(@Body() createPermissionDto: any): Promise<Permission> {
    return this.permissionService.create(createPermissionDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updatePermissionDto: any): Promise<Permission> {
    return this.permissionService.update(+id, updatePermissionDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.permissionService.remove(+id);
  }
}