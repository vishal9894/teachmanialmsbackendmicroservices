import { Test, TestingModule } from '@nestjs/testing';
import { TopTeacherService } from './top-teacher.service';

describe('TopTeacherService', () => {
  let service: TopTeacherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TopTeacherService],
    }).compile();

    service = module.get<TopTeacherService>(TopTeacherService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
