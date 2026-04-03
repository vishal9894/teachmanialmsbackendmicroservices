import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
      throw new UnauthorizedException('Token missing');
    }

    // Bearer TOKEN
    const token = authHeader.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('Invalid token');
    }

    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET as string,
      );

      // ✅ VERY IMPORTANT
      req.user = decoded;

      next();
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}