import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { AuthMiddleware } from 'src/middleware/auth/auth.middleware';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports :[UserModule]
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: 'auth/profile', method: RequestMethod.GET });
  }
}
