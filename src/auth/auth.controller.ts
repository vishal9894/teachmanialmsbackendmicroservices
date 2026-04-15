import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { RegisterDto } from './dto/registerUser.dto';
import { LoginDto } from './dto/login.dto';
import type { Request } from 'express';
import { UpdateUserDto } from './dto/updateUser.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('signup')
  register(@Body() registerUserDto: RegisterDto) {
    return this.authService.register(registerUserDto);
  }

  @Post('signup/:organizationCode')
  registerWithOrganization(
    @Param('organizationCode') organizationCode: string,
    @Body() registerUserDto: RegisterDto,
  ) {
    return this.authService.register(registerUserDto, organizationCode);
  }

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    
    
    return this.authService.login(loginDto.email, loginDto.password , loginDto.organizationCode);
  }

  @Post('login/:organizationCode')
  loginWithOrganization(
    @Param('organizationCode') organizationCode: string,
    @Body() loginDto: LoginDto,
  ) {

    
    return this.authService.login(
      loginDto.email,
      loginDto.password,
      organizationCode,
    );
  }

  @Get('profile')
  getProfile(@Req() req: Request) {
    return this.authService.getProfile(req);
  }
  @Get('all_user')
  getAlluser() {
    return this.authService.profile();
  }
  @Put(':id')
  updateUser(@Param('id') id: string, @Body() updateDto: UpdateUserDto) {
    return this.authService.updateUserById(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(id);
  }
}
