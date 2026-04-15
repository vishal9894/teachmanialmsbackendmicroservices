import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FileContent } from './entities/file-content-entity';
import { CreateContentDto } from './dto/create-file-content-dto';
import { S3Service } from 'src/common/services/s3.service';

@Injectable()
export class FileContentService {
  constructor(
    @InjectRepository(FileContent)
    private readonly repo: Repository<FileContent>,
    private readonly s3Service: S3Service,
  ) {}

  async create(
    dto: any,
    pdf?: Express.Multer.File,
    thumbnail?: Express.Multer.File,
  ) {
    try {
      console.log('DTO:', dto);
      console.log('PDF:', pdf);
      console.log('THUMB:', thumbnail);

      dto.name = dto.name || dto.title || 'Untitled';

      let pdfUrl: string | null = null;
      let thumbUrl: string | null = null;

      if (pdf) {
        pdfUrl = await this.s3Service.upload(pdf, 'pdf');
      }

      if (thumbnail) {
        thumbUrl = await this.s3Service.upload(thumbnail, 'thumbnail');
      }

      const content = this.repo.create({
        ...dto,
        file: pdfUrl,
        thumbnail: thumbUrl,
      });

      const result = await this.repo.save(content);

      return {
        success: true,
        data: result,
      };
    } catch (error) {
      console.error('CREATE CONTENT ERROR:', error);

      return {
        success: false,
        message: 'Failed to save content',
        error: error,
      };
    }
  }

  async fetchByParentId(parentId: string) {
    const data = await this.repo.find({
      where: { parentId },
    });

    return {
      message: 'fetch the contents',
      data,
    };
  }

  async remove(id: string) {
    const content = await this.repo.findOne({
      where: { id },
    });
    if (!content) {
      return new NotFoundException('Content not found');
    }

    await this.repo.delete(id);
    return {
      
      message: 'Content deleted successfully',
    };
  }
}
