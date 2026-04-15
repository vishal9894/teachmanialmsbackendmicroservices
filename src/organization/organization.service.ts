import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Organization } from './entities/organization.entity';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';

@Injectable()
export class OrganizationService {
  constructor(
    @InjectRepository(Organization)
    private readonly organizationRepository: Repository<Organization>,
  ) {}

  async create(createDto: CreateOrganizationDto) {
    const organization = this.organizationRepository.create(createDto);
    return this.organizationRepository.save(organization);
  }

  async findAll() {
    return this.organizationRepository.find();
  }

  async findOne(id: string) {
    const organization = await this.organizationRepository.findOne({
      where: { id },
    });
    if (!organization) {
      throw new NotFoundException('Organization not found');
    }
    return organization;
  }

  async findByCode(code: string) {
    return this.organizationRepository.findOne({ where: { code } });
  }

  async update(id: string, updateDto: UpdateOrganizationDto) {
    const organization = await this.findOne(id);
    Object.assign(organization, updateDto);
    return this.organizationRepository.save(organization);
  }

  async remove(id: string) {
    const organization = await this.findOne(id);
    return this.organizationRepository.remove(organization);
  }
}
