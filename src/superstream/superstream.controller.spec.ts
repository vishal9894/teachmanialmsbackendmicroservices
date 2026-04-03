import { Test, TestingModule } from '@nestjs/testing';
import { SuperstreamController } from './superstream.controller';

describe('SuperstreamController', () => {
  let controller: SuperstreamController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SuperstreamController],
    }).compile();

    controller = module.get<SuperstreamController>(SuperstreamController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
