import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';

import { Role } from './entities/role.entity';
import { Permission } from 'src/permission/entities/permission.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepo: Repository<Role>,

    @InjectRepository(Permission)
    private readonly permissionRepo: Repository<Permission>,
  ) {}

  
  async create(createRoleDto: CreateRoleDto) {
    const { name, description, permissionIds } = createRoleDto;

   
    const existingRole = await this.roleRepo.findOne({
      where: { name },
    });

    if (existingRole) {
      throw new ConflictException(
        `Role with name "${name}" already exists`,
      );
    }

    const permissions = await this.permissionRepo.find({
      where: { id: In(permissionIds) },
    });


    if (permissions.length !== permissionIds.length) {
      const foundIds = permissions.map(p => p.id);
      const missingIds = permissionIds.filter(
        id => !foundIds.includes(id),
      );

      throw new NotFoundException(
        `Permissions not found for IDs: ${missingIds.join(', ')}`,
      );
    }

   
    const role = this.roleRepo.create({
      name,
      description,
      permissions,
    });

    const savedRole = await this.roleRepo.save(role);

    return {
      message: 'Role created successfully',
      data: savedRole,
    };
  }

 
  async findAll() {
    const roles = await this.roleRepo.find({
      relations: ['permissions'],
      order: { name: 'ASC' },
    });

    return {
      message: 'Fetch all roles successfully',
      data: roles.map(role => ({
        id: role.id,
        name: role.name,
        description: role.description,
        permissionCount: role.permissions?.length ?? 0,
      })),
    };
  }

 
  async findOne(id: string) {
    const role = await this.roleRepo.findOne({
      where: { id },
      relations: ['permissions'],
    });

    if (!role) {
      throw new NotFoundException(`Role with ID ${id} not found`);
    }

    return {
      message: 'Role fetched successfully',
      data: role,
    };
  }

  
  async getPermissionsByRoleId(roleId: string) {
    const role = await this.roleRepo.findOne({
      where: { id: roleId },
      relations: ['permissions'],
    });

    if (!role) {
      throw new NotFoundException('Role not found');
    }

    return {
      message: 'Permissions fetched successfully',
      roleId: role.id,
      roleName: role.name,
      permissions: role.permissions,
    };
  }

  
async update(id: string, updateRoleDto: UpdateRoleDto) {
  const { name, description, permissionIds } = updateRoleDto;

 
  const role = await this.roleRepo.findOne({
    where: { id },
    relations: ['permissions'],
  });

  if (!role) {
    throw new NotFoundException('Role not found');
  }

 
  if (name && name !== role.name) {
    const existingRole = await this.roleRepo.findOne({
      where: { name },
    });

    if (existingRole) {
      throw new ConflictException(
        `Role with name "${name}" already exists`,
      );
    }

    role.name = name;
  }

  if (description !== undefined) {
    role.description = description;
  }

 
  if (permissionIds) {
    const permissions = await this.permissionRepo.find({
      where: { id: In(permissionIds) },
    });

    if (permissions.length !== permissionIds.length) {
      const foundIds = permissions.map(p => p.id);
      const missingIds = permissionIds.filter(
        id => !foundIds.includes(id),
      );

      throw new NotFoundException(
        `Permissions not found: ${missingIds.join(', ')}`,
      );
    }

   
    role.permissions = permissions;
  }

  const updatedRole = await this.roleRepo.save(role);

  return {
    message: 'Role updated successfully',
    data: updatedRole,
  };
}

 
  async remove(id: string) {
    const role = await this.roleRepo.findOne({
      where: { id },
    });

    if (!role) {
      throw new NotFoundException('Role not found');
    }

    await this.roleRepo.remove(role);

    return {
      message: 'Role deleted successfully',
    };
  }
}