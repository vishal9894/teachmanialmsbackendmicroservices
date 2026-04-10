import {
  IsEmail,
  IsString,
  MinLength,
  IsOptional,
  IsDateString,
} from 'class-validator';

export class RegisterDto {

  @IsString()
    @MinLength(2)
    name!: string;

  @IsEmail()
    email!: string;

  @IsString()
    @MinLength(6)
    password!: string;

  // optional at register (usually generated after login)
  @IsOptional()
  @IsString()
  refreshtoken?: string;

  // join date when user registers
  @IsOptional()
    joinDate!: string;
}