import { Injectable } from '@nestjs/common';
import { CreateSystemInput } from './dto/create-system.input';
import { UpdateSystemInput } from './dto/update-system.input';

@Injectable()
export class SystemService {
  create(createSystemInput: CreateSystemInput) {
    return 'This action adds a new system';
  }

  findAll() {
    return `This action returns all system`;
  }

  findOne(id: number) {
    return `This action returns a #${id} system`;
  }

  update(id: number, updateSystemInput: UpdateSystemInput) {
    return `This action updates a #${id} system`;
  }

  remove(id: number) {
    return `This action removes a #${id} system`;
  }
}
