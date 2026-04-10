import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { Admin } from './entities/admin.entity';
import { Role } from 'src/role/entities/role.entity';
import { CreateAdminDto } from './dto/create-admin.dto';
import { LoginAdminDto } from './dto/login-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Permission } from 'src/permission/entities/permission.entity';
import { S3Service } from 'src/common/services/s3.service';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,

    @InjectRepository(Role)
    private roleRepository: Repository<Role>,

    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
    private readonly s3Service: S3Service,

    private jwtService: JwtService,
  ) {}

  async create(dto: CreateAdminDto, file?: Express.Multer.File) {
    const { name, email, password, roleId } = dto;

    const imageUrl = file
      ? await this.s3Service.upload(file, 'admins')
      : undefined;

    const existing = await this.adminRepository.findOne({
      where: { email },
    });

    if (existing) {
      throw new UnauthorizedException('Admin already exists');
    }

    let role: Role | null = null;

    if (roleId) {
      role = await this.roleRepository.findOne({
        where: { id: roleId },
        relations: ['permissions'],
      });

      if (!role) {
        throw new NotFoundException('Role not found');
      }
    }

    if (!role) {
      role = await this.roleRepository.findOne({
        where: { name: 'SUPERADMIN' },
        relations: ['permissions'],
      });

      if (!role) {
        const permissions = await this.permissionRepository.find();

        role = this.roleRepository.create({
          name: 'SUPERADMIN',
          description: 'Auto generated super admin',
          permissions,
        });

        role = await this.roleRepository.save(role);
      }
    }

    const hashpassword = await bcrypt.hash(password, 10);

    const admin = this.adminRepository.create({
      name,
      email,
      password: hashpassword,
      role,
      image: imageUrl,
    });

    const savedAdmin = await this.adminRepository.save(admin);

    return {
      message: 'Admin created successfully',
      admin: {
        id: savedAdmin.id,
        name: savedAdmin.name,
        email: savedAdmin.email,
        role: savedAdmin.role.name,
      },
    };
  }

  async login(loginAdminDto: LoginAdminDto) {
  const { email, password } = loginAdminDto;

 
  const admin = await this.adminRepository
    .createQueryBuilder('admin')
    .addSelect('admin.password') 
    .leftJoinAndSelect('admin.role', 'role')
    .where('admin.email = :email', { email })
    .getOne();

  if (!admin) {
    throw new UnauthorizedException('Invalid credentials');
  }

 
  if (!admin.password) {
    throw new UnauthorizedException('Password not found');
  }

  const isPasswordValid = await bcrypt.compare(
    password,
    admin.password,
  );

  if (!isPasswordValid) {
    throw new UnauthorizedException('Invalid credentials');
  }

  const payload = {
    id: admin.id,
    email: admin.email,
  };

  const access_token = this.jwtService.sign(payload);

  return {
    access_token,
    admin: {
      id: admin.id,
      name: admin.name,
      email: admin.email,
      role: admin.role?.name,
    },
  };
}

  async findAll() {
    const admins = await this.adminRepository.find({
      relations: ['role'],
    });

    return admins.map((admin) => ({
      ...admin,
      role: admin.role?.name ?? null,
    }));
  }

  async getProfile(id: string) {
    const admin = await this.adminRepository.findOne({
      where: { id },
      relations: ['role'],
    });

    if (!admin) {
      throw new NotFoundException('Admin not found');
    }

    const {password , ...res} = admin;
    

    return {
      ...res ,
      role : admin.role?.name
    };
  }

  async update(id: string, dto: UpdateAdminDto, file?: Express.Multer.File) {
    const admin = await this.adminRepository.findOne({
      where: { id },
      relations: ['role'],
    });

    if (!admin) {
      throw new NotFoundException('Admin not found');
    }

    const { password, roleId, status, ...rest } = dto;

    // ✅ upload image only if provided
    let imageUrl: string | undefined;
    if (file) {
      imageUrl = await this.s3Service.upload(file, 'admins');
    }

    // ✅ update normal fields
    Object.assign(admin, rest);

    // ✅ update image
    if (imageUrl) {
      admin.image = imageUrl;
    }

    // ✅ update status
    if (status !== undefined) {
      admin.status = status;
    }

    // ✅ update password
    if (password) {
      admin.password = await bcrypt.hash(password, 10);
    }

    // ✅ update role
    if (roleId) {
      const role = await this.roleRepository.findOne({
        where: { id: roleId },
      });

      if (!role) {
        throw new NotFoundException(`Role ${roleId} not found`);
      }

      admin.role = role;
    }

    const savedAdmin = await this.adminRepository.save(admin);

    return {
      message: 'Admin updated successfully',
      admin: {
        id: savedAdmin.id,
        name: savedAdmin.name,
        email: savedAdmin.email,
        phone_number: savedAdmin.phone_number,
        status: savedAdmin.status,
        image: savedAdmin.image,
        role: savedAdmin.role?.name ?? null,
        roleId: savedAdmin.role?.id ?? null,
      },
    };
  }

  async delete(id: string) {
    const admin = await this.adminRepository.findOne({
      where: { id },
    });

    if (!admin) {
      throw new NotFoundException('Admin not exist');
    }

    await this.adminRepository.remove(admin);

    return {
      message: 'Admin deleted successfully',
    };
  }
}
