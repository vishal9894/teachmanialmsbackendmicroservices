import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { StreamService } from './stream.service';

@Controller('stream')
export class StreamController {
  constructor(private readonly streamService: StreamService) {}

  @Post()
  createStream(
    @Body() data: { name: string; superstreamId: string },
  ) {
    return this.streamService.create(
      data.name,
      data.superstreamId,
    );
  }

  // ✅ GET ALL STREAMS
  @Get()
  getStreams() {
    return this.streamService.findAll();
  }

  // ✅ GET STREAM BY ID
  @Get(':id')
  getStream(@Param('id') id: string) {
    return this.streamService.findOne(id);
  }

  @Get('superstream/:id')
  getStreamById(@Param('id') id: string){
    return this.streamService.findBySuperStream(id);
  }
}