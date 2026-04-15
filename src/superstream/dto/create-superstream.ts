import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateSuperStreamDto {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsOptional()
  @IsUUID()
  organizationId?: string;
}
