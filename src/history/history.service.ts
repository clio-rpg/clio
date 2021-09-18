import { Injectable } from '@nestjs/common';
import { CreateHistoryInput } from './dto/create-history.input';
import { UpdateHistoryInput } from './dto/update-history.input';

@Injectable()
export class HistoryService {
  create(createHistoryInput: CreateHistoryInput) {
    return 'This action adds a new history';
  }

  findAll() {
    return `This action returns all history`;
  }

  findOne(id: number) {
    return `This action returns a #${id} history`;
  }

  update(id: number, updateHistoryInput: UpdateHistoryInput) {
    return `This action updates a #${id} history`;
  }

  remove(id: number) {
    return `This action removes a #${id} history`;
  }
}
