import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Stream } from './entities/stream.entity';
import { SuperStream } from 'src/superstream/entities/superstream.entity';
import { CreateStreamDto } from './dto/create-stream.dto';
import { S3Service } from 'src/common/services/s3.service';

@Injectable()
export class StreamService {
  constructor(
    @InjectRepository(Stream)
    private readonly streamRepo: Repository<Stream>,

    @InjectRepository(SuperStream)
    private readonly superstreamRepo: Repository<SuperStream>,

    private readonly s3Service: S3Service,
  ) {}

  /* ================= CREATE STREAM ================= */

 async create(
  createStreamDto: CreateStreamDto,
  file: Express.Multer.File,
) {
  const { name, description, superstreamId } = createStreamDto;

  const superstream = await this.superstreamRepo.findOne({
    where: { id: superstreamId },
  });

  if (!superstream) {
    throw new NotFoundException('SuperStream not found');
  }

  // upload image to S3
  let imageUrl: string | undefined;

  if (file) {
    const upload = await this.s3Service.upload(file, 'streams');
    imageUrl = upload;
  }

  const stream = this.streamRepo.create({
    name,
    description,
    image: imageUrl,
    superstream,
  });

  return await this.streamRepo.save(stream);
}

  /* ================= GET ALL ================= */

  async findAll() {
    return this.streamRepo.find({
      relations: {
        superstream: true,
      },
      order: {
        name: 'ASC',
      },
    });
  }

  /* ================= GET ONE ================= */

  async findOne(id: string) {
    const stream = await this.streamRepo.findOne({
      where: { id },
      relations: {
        superstream: true,
      },
    });

    if (!stream) {
      throw new NotFoundException('Stream not found');
    }

    return stream;
  }

  /* ================= GET BY SUPERSTREAM ================= */

  async findBySuperStream(superstreamId: string) {
    return this.streamRepo.find({
      where: {
        superstream: { id: superstreamId },
      },
      select: {
        id: true,
        name: true,
        image: true,
      },
    });
  }

  /* ================= UPDATE ================= */

  async update(
    id: string,
    updateDto: Partial<CreateStreamDto>,
    file?: Express.Multer.File,
  ) {
    const stream = await this.findOne(id);

    // update name
    if (updateDto.name) {
      stream.name = updateDto.name;
    }

    // update superstream
    if (updateDto.superstreamId) {
      const superstream = await this.superstreamRepo.findOne({
        where: { id: updateDto.superstreamId },
      });

      if (!superstream) {
        throw new NotFoundException('SuperStream not found');
      }

      stream.superstream = superstream;
    }

    // update image
    if (file) {
      const imageUrl = await this.s3Service.upload(
        file,
        'streams',
      );
      stream.image = imageUrl;
    }

    return this.streamRepo.save(stream);
  }

  /* ================= DELETE ================= */

  async remove(id: string) {
    const stream = await this.findOne(id);

    await this.streamRepo.remove(stream);

    return {
      message: 'Stream deleted successfully',
    };
  }
}