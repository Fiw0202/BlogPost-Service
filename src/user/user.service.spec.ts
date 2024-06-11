import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { user, userDocument } from './schema/user.schema';
import { HttpStatus } from '@nestjs/common';

const mockUserModel = {
  findById: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
};

describe('UserService', () => {
  let service: UserService;
  let model: Model<userDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken(user.name),
          useValue: mockUserModel,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    model = module.get<Model<userDocument>>(getModelToken(user.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getUserById', () => {
    it('should return user data when user is found', async () => {
      const userId = 'someUserId';
      const userData = { _id: userId, userName: 'testuser', firstName: 'Test', lastName: 'User', displayName: 'Test User' };
      jest.spyOn(model, 'findById').mockReturnValue({
        exec: jest.fn().mockResolvedValue(userData),
      } as any);

      const result = await service.getUserById(userId);
      
      expect(result).toEqual({
        statusCode: HttpStatus.OK,
        statusText: HttpStatus[HttpStatus.OK],
        result: userData,
      });
    });

    it('should handle error when findById throws an error', async () => {
      const userId = 'someUserId';
      jest.spyOn(model, 'findById').mockReturnValue({
        exec: jest.fn().mockRejectedValue(new Error('Some error')),
      } as any);

      const result = await service.getUserById(userId);
      expect(result).toBeUndefined();
    });
  });

  describe('createUser', () => {
    it('should return conflict when user already exists', async () => {
      const createUserDto = { userName: 'existingUser', firstName: 'Test', lastName: 'User' };
      jest.spyOn(model, 'findOne').mockResolvedValue(createUserDto);

      const result = await service.createUser(createUserDto);

      expect(result).toEqual({
        statusCode: HttpStatus.CONFLICT,
        statusText: HttpStatus[HttpStatus.CONFLICT],
        message: `username ${createUserDto.userName} ถูกใช้งานเเล้ว`,
      });
    });

    it('should create a new user successfully', async () => {
      const createUserDto = { userName: 'newUser', firstName: 'Test', lastName: 'User' };
      const savedUser = { _id: 'newUserId', ...createUserDto, displayName: 'Test User' };
      const userInstance = {
        ...savedUser,
        save: jest.fn().mockResolvedValue(savedUser),
      };
      jest.spyOn(model, 'findOne').mockResolvedValue(null);
      jest.spyOn(model, 'create').mockReturnValue(userInstance as any);

      const result = await service.createUser(createUserDto);

      expect(result).toEqual({
        statusCode: HttpStatus.OK,
        statusText: HttpStatus[HttpStatus.OK],
        result: savedUser,
      });
    });

    it('should handle error when createUser throws an error', async () => {
      const createUserDto = { userName: 'newUser', firstName: 'Test', lastName: 'User' };
      jest.spyOn(model, 'findOne').mockRejectedValue(new Error('Some error'));

      const result = await service.createUser(createUserDto);
      expect(result).toBeUndefined();
    });
  });
});
