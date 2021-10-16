import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from '../dto/create-user.input';
import { UpdateUserInput } from '../dto/update-user.input';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  relations = ['masterHistories', 'histories'];

  async findAll(): Promise<User[]> {
    const users = await this.userRepository.find({
      relations: this.relations,
    });
    return users;
  }

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email },
      relations: this.relations,
    });
    if (!user) {
      throw new NotFoundException(`User with email: ${email} not found`);
    }
    return user;
  }

  async findOneById(id: string): Promise<User> {
    const user = await this.userRepository.findOne(id, {
      relations: this.relations,
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async createUser(data: CreateUserInput): Promise<User> {
    const userAlreadyExists = await this.userRepository.findOne({
      where: { email: data.email },
    });

    if (userAlreadyExists) {
      throw new HttpException('Email already in use', HttpStatus.FORBIDDEN);
    }

    const user = await this.userRepository.create(data);
    const userSaved = await this.userRepository.save(user);
    if (!userSaved) {
      throw new InternalServerErrorException('Error creating user');
    }

    return userSaved;
  }

  async updateUser(id: string, data: UpdateUserInput): Promise<User> {
    const user = await this.findOneById(id);
    return await this.userRepository.save({ ...user, ...data });
  }

  async deleteUser(id: string): Promise<boolean> {
    const user = await this.findOneById(id);
    return !!(await this.userRepository.delete(user));
  }
}
