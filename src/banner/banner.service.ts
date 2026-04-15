import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';

import { Banner, ContentType } from './entities/banner.entity';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
import { S3Service } from 'src/common/services/s3.service';
import { Course } from 'src/courses/entities/courses.entity';

@Injectable()
export class BannerService {
  constructor(
    @InjectRepository(Banner)
    private readonly bannerRepository: Repository<Banner>,
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
    private readonly s3Sercive: S3Service,
  ) {}

  async create(createBannerDto: CreateBannerDto, file: Express.Multer.File) {
    if (!file) {
      throw new Error('Image is required'); // or handle optional
    }

    const imageUrl = await this.s3Sercive.upload(file, 'banner');

    const banner = this.bannerRepository.create({
      ...createBannerDto,
      image: imageUrl,
    });

    const savedBanner = await this.bannerRepository.save(banner);

    return {
      message: 'Banner created successfully',
      banner: savedBanner,
    };
  }

  // ✅ Get All Banners
  async findAll() {
    const banners = await this.bannerRepository.find();
    console.log('Banners from DB:', banners);
    return {
      message: 'Banner list fetched successfully',
      banners,
    };
  }

  // ✅ Get Single Banner
  async findOne(id: string) {
    const banner = await this.bannerRepository.findOne({
      where: { id },
    });

    if (!banner) {
      throw new NotFoundException('Banner not found');
    }

    return banner;
  }

  async findByType(type: ContentType) {
    return this.bannerRepository.find({
      where: {
        type,
      },
    });
  }

  async findByStream(streamId: string) {
    const courses = await this.courseRepository.find({
      where: { streamId },
      select: ['id'],
    });

    if (!courses.length) {
      return {
        message: 'No courses found for this stream',
        banners: [],
      };
    }

    const banners = await this.bannerRepository.find({
      where: { type: ContentType.BANNER },
    });

    return {
      message: 'Banners fetched for stream',
      banners,
    };
  }

  // ✅ Update Banner
  async update(id: string, updateBannerDto: UpdateBannerDto) {
    const banner = await this.findOne(id);

    Object.assign(banner, updateBannerDto);

    const updatedBanner = await this.bannerRepository.save(banner);

    return {
      message: 'Banner updated successfully',
      banner: updatedBanner,
    };
  }

  // ✅ Update Only Status
  async updateStatus(id: string, status: boolean) {
    const banner = await this.findOne(id);

    banner.status = status;

    await this.bannerRepository.save(banner);

    return {
      message: 'Banner status updated successfully',
      banner,
    };
  }

  // ✅ Delete Banner
  async remove(id: string) {
    const banner = await this.findOne(id);

    await this.bannerRepository.remove(banner);

    return {
      message: 'Banner deleted successfully',
    };
  }
}
