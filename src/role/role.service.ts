import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { CreateRoleDto } from './dto/create-role.dto';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepo: Repository<Role>,
  ) {}

  async create(dto: CreateRoleDto) {
    const exists = await this.roleRepo.findOne({
      where: { name: dto.name },
    });

    if (exists) {
      throw new ConflictException('Role already exists');
    }

    const role = this.roleRepo.create(dto);
    return this.roleRepo.save(role);
  }

  findAll() {
    return this.roleRepo.find();
  }
}