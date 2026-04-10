import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import { Admin } from './entities/admin.entity';
import { Role } from 'src/role/entities/role.entity';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { AdminMiddleware } from 'src/middleware/auth/admin.middleware';
import { Permission } from 'src/permission/entities/permission.entity';
import { S3Service } from 'src/common/services/s3.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Admin, Role ,Permission]),

    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secretKey',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AdminController],
  providers: [AdminService , S3Service],
})
export class AdminModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AdminMiddleware)
      .forRoutes('admin/profile');
  }
}