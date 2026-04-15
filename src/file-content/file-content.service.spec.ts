import { Test, TestingModule } from '@nestjs/testing';
import { FileContentService } from './file-content.service';

describe('FileContentService', () => {
  let service: FileContentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FileContentService],
    }).compile();

    service = module.get<FileContentService>(FileContentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
