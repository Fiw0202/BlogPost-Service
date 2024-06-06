import { Test, TestingModule } from '@nestjs/testing';
import { MasterPostService } from './master-post.service';

describe('MasterPostService', () => {
  let service: MasterPostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MasterPostService],
    }).compile();

    service = module.get<MasterPostService>(MasterPostService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
