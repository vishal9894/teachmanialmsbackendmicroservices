import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Event } from './entities/create-event.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateEventDto } from './dto/create-event-dto';
import { S3Service } from 'src/common/services/s3.service';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    private readonly s3Service: S3Service,
  ) {}

  async createEvent(createEventDto: CreateEventDto, file: Express.Multer.File) {
    try {
      const imageUrl = await this.s3Service.upload(file, 'events');

      const event = this.eventRepository.create({
        ...createEventDto,
        image: imageUrl,
      });
      await this.eventRepository.save(event);

      return {
        message: 'Event created successfully',
        event,
      };
    } catch (error) {
      console.error('Error creating event:', error);
      throw new Error('Failed to create event');
    }
  }

  async findAll() {
    try {
      const events = await this.eventRepository.find();
      return events;
    } catch (error) {
      console.error('Error fetching events:', error);
      throw new Error('Failed to fetch events');
    }
  }
  async findById(folderId: string) {
    try {
      const event = await this.eventRepository.findOne({ where: { folderId } });
      if (!event) {
        throw new NotFoundException ('Event not found');
      }
      return event;
    } catch (error) {
      console.error('Error fetching event:', error);
      throw new Error('Failed to fetch event');
    }
  }

  async deleteEvent(id: string) {
    try {
      const event = await this.eventRepository.findOne({ where: { id } });
      if (!event) {
        throw new Error('Event not found');
      }

      await this.eventRepository.delete(id);
      return { message: 'Event deleted successfully' };
    } catch (error) {
      console.error('Error deleting event:', error);
      throw new Error('Failed to delete event');
    }
  }
}
