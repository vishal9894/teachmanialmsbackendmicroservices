import { Controller, Post, Body, Get, Put, Param, Delete } from '@nestjs/common';
import { SuperstreamService } from './superstream.service';
import { CreateSuperStreamDto } from './dto/create-superstream';

@Controller('superstream')
export class SuperstreamController {
  constructor(private readonly superstreamService: SuperstreamService) {}

  @Post()
  create(@Body('name') name: string) {
    return this.superstreamService.create(name);
  }

  @Get()
  findAll() {
    return this.superstreamService.findAll();
  }
  @Put(':id')
  update(@Param('id') id : string , @Body() dto : CreateSuperStreamDto){
    return this.superstreamService.update(id , dto)
  }
  @Delete(':id')
  delete(@Param('id') id:string){
    return this.superstreamService.delete(id);
  }
}