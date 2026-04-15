import { Injectable, NotFoundException } from '@nestjs/common';
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

  async createUser(registerUserDto: RegisterDto & { organizationId?: string }) {
    const user = this.userRepository.create(registerUserDto);
    return this.userRepository.save(user);
  }

  async findByEmail(email: string) {
    return this.userRepository.findOne({
      where: { email },
      select: [
        'id',
        'name',
        'email',
        'password',
        'organizationId',
        'refreshToken',
        'joinDate',
        'state',
        'city',
        'phone_number',
        'image',
      ],
    });
  }

  async findByEmailAndOrg(email: string, organizationId: string) {
    return this.userRepository.findOne({
      where: { email, organizationId },
      select: [
        'id',
        'name',
        'email',
        'password',
        'organizationId',
        'refreshToken',
        'joinDate',
        'state',
        'city',
        'phone_number',
        'image',
      ],
    });
  }

  async findAllUsers() {
    return this.userRepository.find();
  }

  async findById(id: string) {
    return this.userRepository.findOne({
      where: { id },
    });
  }

  async setRefreshToken(userId: string, refreshToken: string) {
    return this.userRepository.update(userId, { refreshToken });
  }

  async updateUser(id: string, data: Partial<User>) {
    await this.userRepository.update(id, data);
    return this.findById(id);
  }

  async remove(user: User) {
    return this.userRepository.remove(user);
  }

  async deleteById(id: string) {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('User not found');
    }
    return result;
  }
}
