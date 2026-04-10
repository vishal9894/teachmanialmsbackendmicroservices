// src/admin/dto/update-admin.dto.ts

import { Transform } from 'class-transformer';
import {
  IsOptional,
  IsEmail,
  MinLength,
  IsUUID,
  IsBoolean,
} from 'class-validator';
import { Column } from 'typeorm';

export class UpdateAdminDto {

  @IsOptional()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @MinLength(6)
  password?: string;

  // ✅ ADD THIS (your error fix)
  @IsOptional()
  @IsUUID()
  roleId?: string;

  @IsOptional()
  @Column()
  phone_number!: string;

   @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  status?: boolean;

  @IsOptional()
  image!: string;
}