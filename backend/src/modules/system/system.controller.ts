import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { SystemService } from './system.service';
import { SystemLicense } from './entities/system-license.entity';

@Controller('system/license')
export class SystemController {
  constructor(private readonly systemService: SystemService) {}

  @Get()
  findAll(): Promise<SystemLicense[]> {
    return this.systemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<SystemLicense> {
    return this.systemService.findOne(Number(id));
  }

  @Post()
  create(@Body() data: Partial<SystemLicense>): Promise<SystemLicense> {
    return this.systemService.create(data);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.systemService.remove(Number(id));
  }
}