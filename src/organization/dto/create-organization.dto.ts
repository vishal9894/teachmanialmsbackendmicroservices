import { IsString, IsOptional, MinLength } from 'class-validator';

export class CreateOrganizationDto {
 
  name!: string;

 
  code!: string;

 
  description?: string;

  status!: boolean;
}
