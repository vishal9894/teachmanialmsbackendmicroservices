import { IsNotEmpty, IsOptional } from 'class-validator';

export class topTeacherDto {

  @IsNotEmpty()
   name!: string;

  @IsOptional()
   about!: string;

  @IsNotEmpty()
   streamid!: string;
}