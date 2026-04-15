import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsArray,
  ValidateIf,
} from 'class-validator';

export class CreateContentDto {
  
  name!: string;

 
  type?: string;

  
  contentType?: string;

  access?: string;

 
  parentId?: string;

  // ================= VIDEO =================
  @ValidateIf((o) => o.type === 'video')

  videoLink?: string;

  @ValidateIf((o) => o.type === 'video')
  
  source?: string;

  @ValidateIf((o) => o.type === 'video')

  thumbnail?: string;

  // ================= PDF =================
  @ValidateIf((o) => o.type === 'pdf')
 
  file?: string;

  @ValidateIf((o) => o.type === 'pdf')
  
  title?: string;

  @ValidateIf((o) => o.type === 'pdf')
 
  downloadType?: string;

  // ================= TEST =================
  @ValidateIf((o) => o.type === 'test')
  
  description?: string;

  @ValidateIf((o) => o.type === 'test')
 
  duration?: number;

  @ValidateIf((o) => o.type === 'test')
  
  categories?: any[];

  @ValidateIf((o) => o.type === 'test')
  
  negativeMarking?: boolean;

  @ValidateIf((o) => o.type === 'test')
  
  negativeMarks?: number;

  @ValidateIf((o) => o.type === 'test')
  
  testType?: string;

  @ValidateIf((o) => o.type === 'test')
 
  postedBy?: string;
}
