import {
  Injectable,
  ConflictException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './entities/admin.entity';
import { Role } from 'src/role/entities/role.entity';
import { CreateAdminDto } from './dto/create-admin.dto';
import { LoginAdminDto } from './dto/login-admin.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepo: Repository<Admin>,

    @InjectRepository(Role)
    private readonly roleRepo: Repository<Role>,

    private readonly jwtService: JwtService,
  ) {}

  async create(dto: CreateAdminDto) {
    const { name, email, password, roleId } = dto;

    const existingAdmin = await this.adminRepo.findOne({
      where: { email },
    });

    if (existingAdmin) {
      throw new ConflictException(
        'Admin already exists with this email',
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

   let role: Role | undefined;

const adminCount = await this.adminRepo.count();

if (adminCount === 0) {
  const superAdminRole = await this.roleRepo.findOne({
    where: { name: 'SUPER_ADMIN' },
  });

  if (!superAdminRole) {
    throw new NotFoundException('SUPER_ADMIN role not found');
  }

  role = superAdminRole; // ✅ never null now
} else if (roleId) {
  const foundRole = await this.roleRepo.findOne({
    where: { id: roleId },
  });

  if (!foundRole) {
    throw new NotFoundException('Role not found');
  }

  role = foundRole;
}

    const admin = this.adminRepo.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    const savedAdmin: Admin = await this.adminRepo.save(admin);

    return {
      message: 'Admin created successfully',
      admin: {
        id: savedAdmin.id,
        name: savedAdmin.name,
        email: savedAdmin.email,
        role: savedAdmin.role?.name ?? null,
      },
    };
  }

  async login(dto: LoginAdminDto) {
    const { email, password } = dto;

    const admin = await this.adminRepo.findOne({
      where: { email },
      relations: ['role'],
    });

    if (!admin) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      admin.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      sub: admin.id,
      email: admin.email,
      role: admin.role?.name ?? null,
    };

    const token = await this.jwtService.signAsync(payload);

    return {
      message: 'Login successful',
      access_token: token,
      admin: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        role: admin.role?.name ?? null,
      },
    };
  }

  async findAll() {
    const admins = await this.adminRepo.find({
      relations: ['role'],
      select: {
        id: true,
        name: true,
        email: true,
        role: {
          id: true,
          name: true,
        },
      },
    });

    return {
      message: 'Admins fetched successfully',
      data: admins,
    };
  }

  async getProfile(id: string) {
    const admin = await this.adminRepo.findOne({
      where: { id },
      relations: ['role'],
      select: {
        id: true,
        name: true,
        email: true,
        role: {
          id: true,
          name: true,
        },
      },
    });

    if (!admin) {
      throw new NotFoundException('Admin not found');
    }

    return {
      message: 'Profile fetched successfully',
      admin,
    };
  }
}