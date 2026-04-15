import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Folder } from './entities/folder.entity';
import { Repository, In } from 'typeorm';
import { S3Service } from 'src/common/services/s3.service';
import { FileContent } from 'src/file-content/entities/file-content-entity';
import { Event } from 'src/events/entities/create-event.entity';

@Injectable()
export class FoldersService {
  constructor(
    @InjectRepository(Folder)
    private readonly folderRepo: Repository<Folder>,

    @InjectRepository(FileContent)
    private readonly fileContentRepo: Repository<FileContent>,
    @InjectRepository(Event)
    private readonly eventRepo: Repository<Event>,

    private readonly s3Service: S3Service,
  ) {}

  async create(createDto: any, file: any) {
    const imageUrl = file ? await this.s3Service.upload(file, 'folder') : '';

    const folder = this.folderRepo.create({
      name: createDto.name,
      parentId: createDto.parentId || null,
      image: imageUrl,
    });

    const folderData = await this.folderRepo.save(folder);

    return {
      message: 'create folder sucessfully',
      data: folderData,
    };
  }

  async fetchAll(id: string) {
    const folders = await this.folderRepo.find({
      where: {
        parentId: id,
      },
    });

    const fileContents = await this.fileContentRepo.find({
      where: {
        parentId: id,
      },
    });

    const events = await this.eventRepo.find({
      where: {
        folderId: id,
      },
    });

    return {
      message: 'Fetched folders and file contents successfully',
      folders,
      fileContents,
      events,
    };
  }

  private async collectFolderIds(
    id: string,
    ids: string[] = [],
  ): Promise<string[]> {
    ids.push(id);

    const children = await this.folderRepo.find({
      where: { parentId: id },
    });

    for (const child of children) {
      await this.collectFolderIds(child.id, ids);
    }

    return ids;
  }

  async remove(id: string) {
    const folder = await this.folderRepo.findOne({
      where: { id },
    });

    if (!folder) {
      throw new NotFoundException('Folder not found');
    }

    const folderIds = await this.collectFolderIds(id);

    await this.fileContentRepo.delete({
      parentId: In(folderIds),
    });

    await this.eventRepo.delete({ folderId: In(folderIds) });

    await this.folderRepo.delete(folderIds);

    return { message: 'Deleted folder and all related contents successfully' };
  }

  async update(id: string, updateDto: any, file: any) {
    const folder = await this.folderRepo.findOne({
      where: { id },
    });

    if (!folder) {
      throw new NotFoundException('Folder not found');
    }
    let imageUrl = folder.image;
    if (file) {
      imageUrl = await this.s3Service.upload(file, 'folder');
    }
    folder.name = updateDto.name || folder.name;
    folder.image = imageUrl;
    const updatedFolder = await this.folderRepo.save(folder);
    return {
      message: 'Folder updated successfully',
      data: updatedFolder,
    };
  }
}
