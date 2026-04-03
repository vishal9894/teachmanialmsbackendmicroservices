import { Test, TestingModule } from '@nestjs/testing';
import { TopTeacherController } from './top-teacher.controller';

describe('TopTeacherController', () => {
  let controller: TopTeacherController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TopTeacherController],
    }).compile();

    controller = module.get<TopTeacherController>(TopTeacherController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
