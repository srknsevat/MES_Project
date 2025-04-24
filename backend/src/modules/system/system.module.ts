import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SystemLicense } from './entities/system-license.entity';
import { SystemService } from './system.service';
import { SystemController } from './system.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SystemLicense])],
  providers: [SystemService],
  controllers: [SystemController],
})
export class SystemModule {}