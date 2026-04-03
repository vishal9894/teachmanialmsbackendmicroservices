import { Controller, Post, Body, Get } from '@nestjs/common';
import { SuperstreamService } from './superstream.service';

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
}