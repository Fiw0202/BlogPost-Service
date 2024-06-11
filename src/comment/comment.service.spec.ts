import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { CommentService } from './comment.service';
import { masterComment, masterCommentDocument } from './schema/master.comment.schema';
import { masterPost, masterPostDocument } from 'src/master-post/schema/master.post.schema';
import { user, userDocument } from 'src/user/schema/user.schema';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Model } from 'mongoose';
import { HttpStatus } from '@nestjs/common';

describe('CommentService', () => {
  let service: CommentService;
  let masterCommentModel: Model<masterCommentDocument>;
  let masterPostModel: Model<masterPostDocument>;
  let userModel: Model<userDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommentService,
        {
          provide: getModelToken(masterComment.name),
          useValue: {
            find: jest.fn(),
            findById: jest.fn(),
            create: jest.fn(),
          },
        },
        {
          provide: getModelToken(masterPost.name),
          useValue: {
            findById: jest.fn(),
          },
        },
        {
          provide: getModelToken(user.name),
          useValue: {
            findById: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CommentService>(CommentService);
    masterCommentModel = module.get<Model<masterCommentDocument>>(getModelToken(masterComment.name));
    masterPostModel = module.get<Model<masterPostDocument>>(getModelToken(masterPost.name));
    userModel = module.get<Model<userDocument>>(getModelToken(user.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllComment', () => {
    it('should return all comments', async () => {
      const mockComments = [{ content: 'Test Comment' }];
      jest.spyOn(masterCommentModel, 'find').mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockComments),
      } as any);

      const result = await service.getAllComment();
      expect(result).toEqual({
        statusCode: HttpStatus.OK,
        statusText: HttpStatus[HttpStatus.OK],
        result: mockComments,
      });
    });
  });

  describe('getCommentById', () => {
    it('should return a comment by id', async () => {
      const mockComment = { content: 'Test Comment' };
      jest.spyOn(masterCommentModel, 'findById').mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockComment),
      } as any);

      const result = await service.getCommentById('someId');
      expect(result).toEqual({
        statusCode: HttpStatus.OK,
        statusText: HttpStatus[HttpStatus.OK],
        result: mockComment,
      });
    });
  });

  describe('getCommentByPostId', () => {
    it('should return comments by post id', async () => {
      const mockComments = [{ content: 'Test Comment' }];
      jest.spyOn(masterCommentModel, 'find').mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockComments),
      } as any);

      const result = await service.getCommentByPostId('somePostId');
      expect(result).toEqual({
        statusCode: HttpStatus.OK,
        statusText: HttpStatus[HttpStatus.OK],
        result: mockComments,
      });
    });
  });

  describe('createPost', () => {
    it('should create a comment', async () => {
      const mockUser = { displayName: 'Test User' };
      const mockPost = {};
      const mockComment = { content: 'Test Comment' };

      jest.spyOn(masterPostModel, 'findById').mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockPost),
      } as any);
      jest.spyOn(userModel, 'findById').mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockUser),
      } as any);
      jest.spyOn(masterCommentModel, 'create').mockReturnValue({
        save: jest.fn().mockResolvedValue(mockComment),
      } as any);

      const createCommentDto: CreateCommentDto = { postId: 'somePostId', userId: 'someUserId', content: 'Test Comment' };

      const result = await service.createPost(createCommentDto);
      expect(result).toEqual({
        statusCode: HttpStatus.OK,
        statusText: HttpStatus[HttpStatus.OK],
        result: mockComment,
      });
    });
  });
});
