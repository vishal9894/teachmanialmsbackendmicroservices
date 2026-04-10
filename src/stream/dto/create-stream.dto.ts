import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateStreamDto {
  @IsNotEmpty()
    @IsString()
    name!: string;

  @IsOptional()
    @IsString()
    description!: string;

  @IsNotEmpty()
    @IsString()
    superstreamId!: string;
}