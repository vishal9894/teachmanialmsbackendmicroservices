import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './dto/registerUser.dto';
import * as bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

 async register(registerUserDto: RegisterDto) {
  const isMatch = await this.userService.findByEmail(registerUserDto.email);
  if (isMatch) return { message: 'User already exists' };

  const hashpassword = await bcrypt.hash(registerUserDto.password, 10);

  const user = await this.userService.createUser({
    ...registerUserDto,
    password: hashpassword,
  });

  const secret = process.env.JWT_SECRET || 'defaultsecretkey';

  const token = jwt.sign({ id: user.id, email: user.email }, secret, {
    expiresIn: '7h',
  });

  const refreshToken = jwt.sign({ id: user.id, email: user.email }, secret, {
    expiresIn: '15d',
  });

  await this.userService.setRefreshToken(user.id, refreshToken); 

  const { password, ...userWithoutPassword } = user;
  return { message: 'User registered', user: userWithoutPassword, token };
}

async login(email: string, password: string) {
  const user = await this.userService.findByEmail(email);

  if (!user) throw new UnauthorizedException('Invalid email');
  if (!user.password) throw new UnauthorizedException('Password not set');

  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) throw new UnauthorizedException('Invalid password');

  const secret = process.env.JWT_SECRET || 'defaultsecretkey';

  const token = jwt.sign({ id: user.id, email: user.email }, secret, { expiresIn: '7h' });
  const refreshToken = jwt.sign({ id: user.id, email: user.email }, secret, { expiresIn: '15d' });

  await this.userService.setRefreshToken(user.id, refreshToken); 

  const { password: _, ...userWithoutPassword } = user;
  return { message: 'Login successful', user: userWithoutPassword, token };
}
  async profile() {
    const users = await this.userService.findAllUsers();
    return users.map(({ password, ...user }) => user);
  }

  async getProfile(userPayload: any) {
    const user = await this.userService.findById(userPayload.id);
    if (!user) return { message: 'User not found' };

    const { password, ...userWithoutPassword } = user;
    return { message: 'User profile fetched', user: userWithoutPassword };
  }
}