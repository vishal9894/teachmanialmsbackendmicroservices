import { Test, TestingModule } from '@nestjs/testing';
import { TopStudentsService } from './top-students.service';

describe('TopStudentsService', () => {
  let service: TopStudentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TopStudentsService],
    }).compile();

    service = module.get<TopStudentsService>(TopStudentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
