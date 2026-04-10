import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { StreamService } from './stream.service';
import { CreateStreamDto } from './dto/create-stream.dto';


@Controller('stream')
export class StreamController {
  constructor(private readonly streamService: StreamService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  createStream(
    @Body() createStreamDto: CreateStreamDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.streamService.create(createStreamDto, file);
  }

  @Get()
  getStreams() {
    return this.streamService.findAll();
  }

  @Get('superstream/:id')
  getStreamBySuperStream(@Param('id') id: string) {
    return this.streamService.findBySuperStream(id);
  }

  @Get(':id')
  getStream(@Param('id') id: string) {
    return this.streamService.findOne(id);
  }
  @Delete(':id')
  delete (@Param('id') id : string){
    return this.streamService.remove(id)
  }
}