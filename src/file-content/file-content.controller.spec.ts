import { Test, TestingModule } from '@nestjs/testing';
import { FileContentController } from './file-content.controller';

describe('FileContentController', () => {
  let controller: FileContentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FileContentController],
    }).compile();

    controller = module.get<FileContentController>(FileContentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
