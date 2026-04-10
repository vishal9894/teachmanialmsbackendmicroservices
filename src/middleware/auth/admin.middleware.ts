import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {} // Inject JwtService

  use(req: Request & { admin?: any }, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Token missing');
    }

    const token = authHeader.split(' ')[1];

    try {
      // Use JwtService to verify
      const decoded = this.jwtService.verify(token);
      req.admin = decoded;
      next();
    } catch (err) {
      console.error('Token verification error:');
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}