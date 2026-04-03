import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { RegisterDto } from 'src/auth/dto/registerUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // ✅ create user
  async createUser(registerUserDto: RegisterDto) {
    const user = this.userRepository.create(registerUserDto);
    return await this.userRepository.save(user);
  }

  // ✅ FIX (ADD THIS METHOD)
  async findByEmail(email: string) {
    return await this.userRepository.findOne({
      where: { email },
    });
  }

  // ✅ already used in profile()
  async findAllUsers() {
    return await this.userRepository.find();
  }

 async findById(id: string) {
  return await this.userRepository.findOne({
    where: { id: id },
  });
}

async setRefreshToken(userId: string, refreshToken: string) {
  return await this.userRepository.update(userId, { refreshToken });
}
}