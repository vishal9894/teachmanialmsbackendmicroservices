import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Stream } from './entities/stream.entity';
import { SuperStream } from 'src/superstream/entities/superstream.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StreamService {
  constructor(
    @InjectRepository(Stream)
    private streamRepo: Repository<Stream>,

    @InjectRepository(SuperStream)
    private superstreamRepo: Repository<SuperStream>,
  ) {}

  // ✅ CREATE STREAM
  async create(name: string, superstreamId: string) {
    const superstream = await this.superstreamRepo.findOne({
      where: { id: superstreamId },
    });

    if (!superstream) {
      throw new NotFoundException('SuperStream not found');
    }

    const stream = this.streamRepo.create({
      name,
      superstream,
    });

    return await this.streamRepo.save(stream);
  }

  // ✅ GET ALL STREAMS
  async findAll() {
    return await this.streamRepo.find({
      relations: ['superstream'],
    });
  }

  // ✅ GET SINGLE STREAM
  async findOne(id: string) {
    const stream = await this.streamRepo.findOne({
      where: { id },
      relations: ['superstream'],
    });

    if (!stream) {
      throw new NotFoundException('Stream not found');
    }

    return stream;
  }

  async findBySuperStream(superstreamId: string) {
  const streams = await this.streamRepo.find({
    where: {
      superstream: {
        id: superstreamId,
      },
    },
    select :{
      id: true ,
      name : true
    }
  });

  return streams;
}

  async update(
    id: string,
    name?: string,
    superstreamId?: string,
  ) {
    const stream = await this.streamRepo.findOne({
      where: { id },
      relations: ['superstream'],
    });

    if (!stream) {
      throw new NotFoundException('Stream not found');
    }

    // update name
    if (name) {
      stream.name = name;
    }

    // update superstream relation
    if (superstreamId) {
      const superstream = await this.superstreamRepo.findOne({
        where: { id: superstreamId },
      });

      if (!superstream) {
        throw new NotFoundException('SuperStream not found');
      }

      stream.superstream = superstream;
    }

    return await this.streamRepo.save(stream);
  }

  async remove(id: string) {
    const stream = await this.streamRepo.findOne({
      where: { id },
    });

    if (!stream) {
      throw new NotFoundException('Stream not found');
    }

    await this.streamRepo.remove(stream);

    return {
      message: 'Stream deleted successfully',
    };
  }
}