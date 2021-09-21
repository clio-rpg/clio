import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import TestUtil from '../common/test/TestUtil';
import { User } from './user.entity';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  const mockRepository = {
    findOne: jest.fn(),
    find: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('When Search All Users', () => {
    it('should return an array of users', async () => {
      const user = TestUtil.giveMeAValidUser();
      mockRepository.find.mockReturnValue([user]);
      const users = await service.findAll();
      expect(users).toEqual([user]);
      expect(users).toHaveLength(1);
      expect(mockRepository.find).toHaveBeenCalled();
      expect(mockRepository.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('When Search User By Id', () => {
    it('should return a user', async () => {
      const user = TestUtil.giveMeAValidUser();
      mockRepository.findOne.mockReturnValue(user);
      const foundUser = await service.findOneById(user.id);
      expect(foundUser).toEqual(user);
      expect(mockRepository.findOne).toHaveBeenCalledWith(user.id);
      expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
    });
    it('should return a exception if user is not found', async () => {
      const user = TestUtil.giveMeAValidUser();
      mockRepository.findOne.mockReturnValue(null);
      expect(service.findOneById(user.id)).rejects.toBeInstanceOf(
        NotFoundException,
      );
      expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
    });
  });

  describe('When Search User By Email', () => {
    it('should return a user', async () => {
      const user = TestUtil.giveMeAValidUser();
      const { email } = user;
      mockRepository.findOne.mockReturnValue(user);
      const foundUser = await service.findOneByEmail(email);
      expect(foundUser).toEqual(user);
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { email },
      });
      expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
    });
    it('should return a exception if user is not found', async () => {
      const { email } = TestUtil.giveMeAValidUser();
      mockRepository.findOne.mockReturnValue(null);
      await service.findOneByEmail(email).catch((error) => {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error).toMatchObject({
          message: `User with email: ${email} not found`,
        });
        expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('When Create User', () => {
    it('should return a user', async () => {
      const user = TestUtil.giveMeAValidUser();
      mockRepository.save.mockReturnValue(user);
      mockRepository.create.mockReturnValue(user);
      const createdUser = await service.createUser(user);
      expect(createdUser).toEqual(user);
      expect(mockRepository.save).toHaveBeenCalledWith(user);
      expect(mockRepository.create).toHaveBeenCalledWith(user);
      expect(mockRepository.save).toHaveBeenCalledTimes(1);
      expect(mockRepository.create).toHaveBeenCalledTimes(1);
    });
    it('should return a exception when doesnt create user', async () => {
      const user = TestUtil.giveMeAValidUser();
      mockRepository.save.mockReturnValue(null);
      mockRepository.create.mockReturnValue(user);

      await service.createUser(user).catch((error) => {
        expect(error).toBeInstanceOf(InternalServerErrorException);
        expect(error).toMatchObject({
          message: 'Error creating user',
        });
        expect(mockRepository.save).toHaveBeenCalledTimes(1);
        expect(mockRepository.create).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('When Update User', () => {
    it('should update a user', async () => {
      const user = TestUtil.giveMeAValidUser();
      const updatedMockUser = {
        ...user,
        name: 'Updated Name',
      };
      mockRepository.findOne.mockReturnValue(user);
      mockRepository.save.mockReturnValue(updatedMockUser);

      const updatedUser = await service.updateUser(user.id, updatedMockUser);

      expect(mockRepository.findOne).toHaveBeenCalledWith(user.id);
      expect(mockRepository.save).toHaveBeenCalledWith(updatedMockUser);
      expect(updatedUser).toMatchObject(updatedMockUser);
    });
  });

  describe('When Delete User', () => {
    it('should delete a user', async () => {
      const user = TestUtil.giveMeAValidUser();
      mockRepository.findOne.mockReturnValue(user);
      mockRepository.delete.mockReturnValue(user);

      const deletedUser = await service.deleteUser(user.id);

      expect(deletedUser).toBe(true);
      expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
      expect(mockRepository.delete).toHaveBeenCalledTimes(1);
    });

    it('should not delete if user is not found', async () => {
      const user = TestUtil.giveMeAValidUser();
      mockRepository.delete.mockReturnValue(null);
      mockRepository.findOne.mockReturnValue(user);

      const deletedUser = await service.deleteUser('9');

      expect(deletedUser).toBe(false);
      expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
      expect(mockRepository.delete).toHaveBeenCalledTimes(1);
    });
  });
});
