import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSystemInput } from './dto/create-system.input';
import { UpdateSystemInput } from './dto/update-system.input';
import { System } from './entities/system.entity';

@Injectable()
export class SystemService {
  constructor(
    @InjectRepository(System)
    private readonly systemRepository: Repository<System>,
  ) {}

  async create(createSystemInput: CreateSystemInput): Promise<System> {
    const system = await this.systemRepository.create(createSystemInput);
    const systemSaved = this.systemRepository.save(system);

    if (!systemSaved) {
      throw new InternalServerErrorException('Error creating system');
    }

    return systemSaved;
  }

  async findAll(): Promise<System[]> {
    const systems = await this.systemRepository.find({
      where: {
        private: false,
      },
    });

    if (!systems) {
      throw new InternalServerErrorException('Error finding systems');
    }

    return systems;
  }

  async findOne(id: string): Promise<System> {
    const system = await this.systemRepository.findOne(id);

    if (!system) {
      throw new InternalServerErrorException('Error finding system');
    }

    return system;
  }

  async update(
    id: string,
    updateSystemInput: UpdateSystemInput,
  ): Promise<System> {
    const system = await this.findOne(id);
    const systemUpdated = await this.systemRepository.save({
      ...system,
      ...updateSystemInput,
    });

    if (!systemUpdated) {
      throw new InternalServerErrorException('Error updating system');
    }

    return systemUpdated;
  }
}
