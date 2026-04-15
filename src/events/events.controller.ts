import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event-dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  createEvent(
    @Req() req: any,
    @Body() createEventDto: CreateEventDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const dto = req.body as CreateEventDto;
    return this.eventsService.createEvent(dto, file);
  }

  @Get()
  findAll() {
    return this.eventsService.findAll();
  }
  @Get(':folderId')
  findById(@Param('folderId') folderId: string) {
    return this.eventsService.findById(folderId);
  }
  @Delete(':id')
  deleteEvent(@Param('id') id: string) {
    return this.eventsService.deleteEvent(id);
  }
}
