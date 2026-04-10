// dto/create-role.dto.ts
import { IsString, IsArray, IsInt, IsOptional, ArrayMinSize } from 'class-validator';

export class CreateRoleDto {
  @IsString()
  name!: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsArray()
  @ArrayMinSize(1, { message: 'permissionIds should not be empty' })
  @IsInt({ each: true, message: 'each value in permissionIds must be an integer number' })
  permissionIds!: number[];
}