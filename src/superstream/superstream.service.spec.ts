import { Test, TestingModule } from '@nestjs/testing';
import { SuperstreamService } from './superstream.service';

describe('SuperstreamService', () => {
  let service: SuperstreamService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SuperstreamService],
    }).compile();

    service = module.get<SuperstreamService>(SuperstreamService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
