import {
  IsEmail,
  IsNotEmpty,
  MinLength,
  IsOptional,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateAdminDto {
    
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;

  // ✅ OPTIONAL ROLE
  @IsOptional()
  @Type(() => Number) // converts string -> number
  @IsNumber()
  roleId?: number;
}