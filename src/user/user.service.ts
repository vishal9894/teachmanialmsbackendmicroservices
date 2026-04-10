import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { RegisterDto } from 'src/auth/dto/registerUser.dto';

@Injectable()
export class UserService {
  repo: any;
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  
  async createUser(registerUserDto: RegisterDto) {
    const user = this.userRepository.create(registerUserDto);
    return await this.userRepository.save(user);
  }

  
  async findByEmail(email: string) {
  return await this.userRepository.findOne({
    where: { email },
  });
}

  
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

async updateUser(id: string, data: Partial<User>) {
  await this.userRepository.update(id, data);
  return this.findById(id);
}


async remove(user: User) {
  return await this.userRepository.remove(user); 
}


async deleteById(id: string) {
  const result = await this.userRepository.delete(id);
  if (result.affected === 0) {
    throw new NotFoundException("User not found");
  }
  return result;
}
}