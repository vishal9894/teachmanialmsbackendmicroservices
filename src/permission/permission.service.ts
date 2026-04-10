import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from './entities/permission.entity';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    private permissionRepo: Repository<Permission>,
  ) {}

  async findAll(): Promise<Permission[]> {
    return await this.permissionRepo.find();
  }

  async findOne(id: number): Promise<Permission> {
    const permission = await this.permissionRepo.findOne({ where: { id } });
    if (!permission) {
      throw new NotFoundException(`Permission with ID ${id} not found`);
    }
    return permission;
  }

  async create(createPermissionDto: Partial<Permission>): Promise<Permission> {
    const permission = this.permissionRepo.create(createPermissionDto);
    return await this.permissionRepo.save(permission);
  }

  async update(id: number, updatePermissionDto: Partial<Permission>): Promise<Permission> {
    const permission = await this.findOne(id);
    Object.assign(permission, updatePermissionDto);
    return await this.permissionRepo.save(permission);
  }

  async remove(id: number): Promise<void> {
    const permission = await this.findOne(id);
    await this.permissionRepo.remove(permission);
  }
}