import {
  Controller,
  Post,
  Body,
  Get,
  ParseIntPipe,
  Param,
  Put,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  create(@Body() dto: CreateRoleDto) {
    console.log(dto);
    console.log(typeof dto.permissionIds[0]);
    return this.roleService.create(dto);
  }

  @Get()
  findAll() {
    return this.roleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.roleService.findOne(id);
  }

  @Get(':id/permissions')
  getPermissions(@Param('id') id: string) {
    return this.roleService.getPermissionsByRoleId(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateRoleDto) {
    return this.roleService.update(id, dto);
  }
}
