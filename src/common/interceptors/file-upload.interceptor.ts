import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  mixin,
  Type,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

export function UploadInterceptor(fieldName: string): Type<NestInterceptor> {
  @Injectable()
  class MixinInterceptor implements NestInterceptor {
    private interceptor = new (FileInterceptor(fieldName))();

    intercept(context: ExecutionContext, next: CallHandler) {
      return this.interceptor.intercept(context, next);
    }
  }

  return mixin(MixinInterceptor);
}