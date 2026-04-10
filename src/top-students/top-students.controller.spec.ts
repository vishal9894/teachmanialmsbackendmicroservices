import { Test, TestingModule } from '@nestjs/testing';
import { TopStudentsController } from './top-students.controller';

describe('TopStudentsController', () => {
  let controller: TopStudentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TopStudentsController],
    }).compile();

    controller = module.get<TopStudentsController>(TopStudentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
