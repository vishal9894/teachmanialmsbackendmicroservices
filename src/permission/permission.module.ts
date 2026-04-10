import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from './entities/permission.entity';
import { PermissionService } from './permission.service';
import { PermissionController } from './permission.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Permission])],
  exports: [TypeOrmModule],
  providers: [PermissionService],
  controllers: [PermissionController], // ⭐ important
})
export class PermissionModule {}