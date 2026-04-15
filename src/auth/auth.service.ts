import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './dto/registerUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import * as bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { OrganizationService } from 'src/organization/organization.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly organizationService: OrganizationService,
  ) {}

  async register(registerUserDto: RegisterDto, organizationCode?: string) {
    const existingUser = await this.userService.findByEmail(
      registerUserDto.email,
    );

    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    const hashpassword = await bcrypt.hash(registerUserDto.password, 10);
    const joinDate = new Date().toISOString().split('T')[0];

    let organizationId: string | undefined;
    const lookupCode =
      organizationCode ?? registerUserDto.organizationCode ?? undefined;
    if (lookupCode) {
      const organization =
        await this.organizationService.findByCode(lookupCode);
      if (!organization) {
        throw new NotFoundException('Organization not found');
      }
      organizationId = organization.id;
    }

    const user = await this.userService.createUser({
      name: registerUserDto.name,
      email: registerUserDto.email,
      password: hashpassword,
      joinDate,
      organizationId,
    });

    const secret = process.env.JWT_SECRET || 'defaultsecretkey';
    const access_token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        organizationId: user.organizationId,
      },
      secret,
      {
        expiresIn: '7h',
      },
    );

    const refreshToken = jwt.sign(
      {
        id: user.id,
        email: user.email,
        organizationId: user.organizationId,
      },
      secret,
      {
        expiresIn: '15d',
      },
    );

    await this.userService.setRefreshToken(user.id, refreshToken);

    const { password, ...userWithoutPassword } = user;

    return {
      message: 'User registered successfully',
      user: userWithoutPassword,
      access_token,
    };
  }

  async login(email: string, password: string, organizationCode?: string) {
    let user;

   
    
    if (organizationCode) {
      const organization =
        await this.organizationService.findByCode(organizationCode);
      if (!organization) {
        throw new NotFoundException('Organization not found');
      }
      user = await this.userService.findByEmailAndOrg(email, organization.id);
    } else {
      user = await this.userService.findByEmail(email);
    }

    if (!user) {
      throw new UnauthorizedException('Invalid email');
    }

    if (!user.password) {
      throw new UnauthorizedException('Password not set');
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      throw new UnauthorizedException('Invalid password');
    }

    const secret = process.env.JWT_SECRET || 'defaultsecretkey';
    const access_token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        organizationId: user.organizationId,
      },
      secret,
      {
        expiresIn: '7h',
      },
    );

    const refreshToken = jwt.sign(
      {
        id: user.id,
        email: user.email,
        organizationId: user.organizationId,
      },
      secret,
      {
        expiresIn: '15d',
      },
    );

    await this.userService.setRefreshToken(user.id, refreshToken);

    const { password: _, ...userWithoutPassword } = user;

    return {
      message: 'Login successful',
      user: userWithoutPassword,
      access_token,
    };
  }

  async profile() {
    const users = await this.userService.findAllUsers();
    return users.map(({ password, ...user }) => user);
  }

  async getProfile(userPayload: any) {
    const user = await this.userService.findById(userPayload.id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const { password, ...userWithoutPassword } = user;

    return {
      message: 'User profile fetched',
      user: userWithoutPassword,
    };
  }

  async updateUserById(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userService.findById(id);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const updateData: any = {};

    if (updateUserDto.name) updateData.name = updateUserDto.name;
    if (updateUserDto.email) updateData.email = updateUserDto.email;
    if (updateUserDto.state) updateData.state = updateUserDto.state;
    if (updateUserDto.city) updateData.city = updateUserDto.city;
    if (updateUserDto.image) updateData.image = updateUserDto.image;
    if (updateUserDto.phone_number)
      updateData.phone_number = updateUserDto.phone_number;

    if (updateUserDto.password) {
      updateData.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    await this.userService.updateUser(id, updateData);

    const updatedUser = await this.userService.findById(id);

    const { password, ...userWithoutPassword } = updatedUser!;

    return {
      message: 'User updated successfully',
      user: userWithoutPassword,
    };
  }

  async remove(id: string) {
    const user = await this.userService.findById(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    await this.userService.remove(user);

    return {
      message: 'user delete successfully',
    };
  }
}
