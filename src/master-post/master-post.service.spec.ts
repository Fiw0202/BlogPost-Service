import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { MasterPostService } from './master-post.service';
import { masterPost, masterPostDocument } from './schema/master.post.schema';
import { user, userDocument } from 'src/user/schema/user.schema';
import { Model } from 'mongoose';
import { HttpStatus } from '@nestjs/common';

const mockMasterPostModel = {
  find: jest.fn(),
  findById: jest.fn(),
  findByIdAndDelete: jest.fn(),
  create: jest.fn(),
};

const mockUserModel = {
  findById: jest.fn(),
};

describe('MasterPostService', () => {
  let service: MasterPostService;
  let masterPostModel: Model<masterPostDocument>;
  let userModel: Model<userDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MasterPostService,
        {
          provide: getModelToken(masterPost.name),
          useValue: mockMasterPostModel,
        },
        {
          provide: getModelToken(user.name),
          useValue: mockUserModel,
        },
      ],
    }).compile();

    service = module.get<MasterPostService>(MasterPostService);
    masterPostModel = module.get<Model<masterPostDocument>>(getModelToken(masterPost.name));
    userModel = module.get<Model<userDocument>>(getModelToken(user.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllPost', () => {
    it('should return an array of posts', async () => {
      const mockPosts = [{ userId: '1', subject: 'Test' }];
      jest.spyOn(masterPostModel, 'find').mockReturnValue({
        sort: jest.fn().mockResolvedValue(mockPosts),
      } as any);
      const result = await service.getAllPost();
      expect(result).toEqual({
        statusCode: HttpStatus.OK,
        statusText: HttpStatus[HttpStatus.OK],
        result: mockPosts,
      });
    });
  });

  describe('getPostById', () => {
    it('should return a single post', async () => {
      const mockPost = { userId: '1', subject: 'Test' };
      jest.spyOn(masterPostModel, 'findById').mockResolvedValue(mockPost as any);
      const result = await service.getPostById('1');
      expect(result).toEqual({
        statusCode: HttpStatus.OK,
        statusText: HttpStatus[HttpStatus.OK],
        result: mockPost,
      });
    });
  });

  // describe('createPost', () => {
  //   it('should create and return a post', async () => {
  //     const mockUser = { _id: '1', displayName: 'John Doe' };
  //     const createPostDto = { userId: '1', subject: 'Test', content: 'Content' };
  //     const savedPost = { ...createPostDto, createName: mockUser.displayName, createDate: new Date() };

  //     jest.spyOn(userModel, 'findById').mockResolvedValue(mockUser as any);
  //     jest.spyOn(masterPostModel, 'create').mockImplementation(async () => ({
  //       ...savedPost,
  //       save: jest.fn().mockResolvedValue(savedPost),
  //     }));

  //     const result = await service.createPost(createPostDto);
  //     expect(result).toEqual({
  //       statusCode: HttpStatus.OK,
  //       statusText: HttpStatus[HttpStatus.OK],
  //       result: savedPost,
  //     });
  //   });
  // });

  describe('deletePost', () => {
    it('should delete and return a post', async () => {
      const mockPost = { _id: '1', subject: 'Test' };
      jest.spyOn(masterPostModel, 'findByIdAndDelete').mockResolvedValue(mockPost as any);
      const result = await service.deletePost('1');
      expect(result).toEqual({
        statusCode: HttpStatus.OK,
        statusText: HttpStatus[HttpStatus.OK],
        result: mockPost,
      });
    });

    it('should throw an error if post not found', async () => {
      jest.spyOn(masterPostModel, 'findByIdAndDelete').mockResolvedValue(null);
      await expect(service.deletePost('1')).rejects.toThrow('Post id 1 not found');
    });
  });
});
