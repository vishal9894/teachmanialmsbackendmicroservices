import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SuperStream } from './entities/superstream.entity';
import { Repository } from 'typeorm';

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
      select :{
        id: true ,
        name :true
      }
    });
  }
}