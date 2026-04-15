import { IsNotEmpty } from 'class-validator';

export class CreateFolderDto {
  @IsNotEmpty()
    name!: string;

  parentId!: string;
}