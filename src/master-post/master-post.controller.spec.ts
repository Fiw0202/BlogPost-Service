import { Test, TestingModule } from '@nestjs/testing';
import { MasterPostController } from './master-post.controller';
import { MasterPostService } from './master-post.service';

describe('MasterPostController', () => {
  let controller: MasterPostController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MasterPostController],
      providers: [MasterPostService],
    }).compile();

    controller = module.get<MasterPostController>(MasterPostController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
