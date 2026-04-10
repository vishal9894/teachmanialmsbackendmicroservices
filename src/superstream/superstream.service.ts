import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SuperStream } from './entities/superstream.entity';
import { Repository } from 'typeorm';
import { CreateSuperStreamDto } from './dto/create-superstream';

@Injectable()
export class SuperstreamService {
  constructor(
    @InjectRepository(SuperStream)
    private superstreamRepo: Repository<SuperStream>,
  ) {}


  async create(name: string) {
    const superstream = this.superstreamRepo.create({ name });
    return await this.superstreamRepo.save(superstream);
  }


  async findAll() {
    return await this.superstreamRepo.find({
      select: {
        id: true,
        name: true,
      },
    });
  }


  async update(id: string, updateDto: CreateSuperStreamDto) {
    const superstream = await this.superstreamRepo.findOne({
      where: { id },
    });

    if (!superstream) {
      throw new NotFoundException('SuperStream not found');
    }

    Object.assign(superstream, updateDto);

    const updated = await this.superstreamRepo.save(superstream);

    return {
      message: 'SuperStream updated successfully',
      data: updated,
    };
  }


  async delete(id: string) {
    const superstream = await this.superstreamRepo.findOne({
      where: { id },
    });

    if (!superstream) {
      throw new NotFoundException('SuperStream not found');
    }

    await this.superstreamRepo.remove(superstream);

    return {
      message: 'SuperStream deleted successfully',
    };
  }
}