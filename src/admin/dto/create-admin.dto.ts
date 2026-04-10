import {
  IsEmail,
  IsNotEmpty,
  MinLength,
  IsOptional,
  IsUUID,
  IsBoolean,
} from 'class-validator';

export class CreateAdminDto {

  @IsNotEmpty()
  name!: string;

  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @MinLength(6)
  password!: string;

  @IsOptional()
  @IsUUID()
  roleId?: string;

  @IsOptional()
 
  status?: boolean;

  @IsOptional()
  image!:string;
}