import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SystemLicense } from './entities/system-license.entity';

@Injectable()
export class SystemService {
  constructor(
    @InjectRepository(SystemLicense)
    private readonly licenseRepository: Repository<SystemLicense>,
  ) {}

  async findAll(): Promise<SystemLicense[]> {
    return this.licenseRepository.find();
  }

  async findOne(id: number): Promise<SystemLicense> {
    return this.licenseRepository.findOneBy({ id });
  }

  async create(data: Partial<SystemLicense>): Promise<SystemLicense> {
    const license = this.licenseRepository.create(data);
    return this.licenseRepository.save(license);
  }

  async remove(id: number): Promise<void> {
    await this.licenseRepository.delete(id);
  }
}