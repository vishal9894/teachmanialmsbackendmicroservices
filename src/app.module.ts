import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { SuperstreamModule } from './superstream/superstream.module';
import { StreamModule } from './stream/stream.module';
import { AdminModule } from './admin/admin.module';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';
import { TopTeacherModule } from './top-teacher/top-teacher.module';
import { S3Service } from './common/services/s3.service';
import { TopStudentsModule } from './top-students/top-students.module';
import { CoursesModule } from './courses/courses.module';
import { BannerModule } from './banner/banner.module';
import { FoldersModule } from './folders/folders.module';
import { TeachersModule } from './teachers/teachers.module';
import { FileContentModule } from './file-content/file-content.module';
import { EventsModule } from './events/events.module';
import { AttachmentsModule } from './attachments/attachments.module';
import { OrganizationModule } from './organization/organization.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: process.env.DB_HOST || 'localhost',
    //   port: Number(process.env.DB_PORT) || 5432,
    //   username: process.env.DB_USER || 'postgres',
    //   password: process.env.DB_PASSWORD || '', // ✅ fallback to empty string
    //   database: process.env.DB_NAME || 'teachmaniabackend',
    //   autoLoadEntities: true,
    //   synchronize: true,
    // }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false,
      },
      autoLoadEntities: true,
      synchronize: true,
    }),

    AuthModule,
    UserModule,
    SuperstreamModule,
    StreamModule,
    AdminModule,
    RoleModule,
    PermissionModule,
    TopTeacherModule,
    TopStudentsModule,
    CoursesModule,
    BannerModule,
    FoldersModule,
    TeachersModule,
    FileContentModule,
    EventsModule,
    AttachmentsModule,
    OrganizationModule,
  ],
  controllers: [AppController],
  providers: [AppService, S3Service],

  exports: [S3Service],
})
export class AppModule {}
