import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { slugify } from 'src/common/helpers/slug';
import { Repository } from 'typeorm';
import { CreateHistoryInput } from './dto/create-history.input';
import { UpdateHistoryInput } from './dto/update-history.input';
import { History } from './entities/history.entity';

@Injectable()
export class HistoryService {
  constructor(
    @InjectRepository(History)
    private historyRepository: Repository<History>,
  ) {}

  async create(createHistoryInput: CreateHistoryInput): Promise<History> {
    const history = await this.historyRepository.create({
      ...createHistoryInput,
      slug: slugify.create(),
    });
    const historySaved = await this.historyRepository.save(history);

    if (!historySaved) {
      throw new InternalServerErrorException('Error creating history');
    }

    return historySaved;
  }

  async findAll(): Promise<History[]> {
    const histories = await this.historyRepository.find({
      where: { private: false },
    });
    return histories;
  }

  async findOneById(id: string): Promise<History> {
    const history = await this.historyRepository.findOne(id);
    if (!history) {
      throw new InternalServerErrorException('Error finding history');
    }
    return history;
  }

  async findBySlug(slug: string): Promise<History> {
    const history = await this.historyRepository.findOneOrFail({
      where: { slug },
    });
    if (!history) {
      throw new InternalServerErrorException('Error finding history');
    }

    //TO-DO: check if private or user is in the user list
    if (history.private) {
      throw new ForbiddenException('Private history');
    }
    return history;
  }

  async update(
    id: string,
    updateHistoryInput: UpdateHistoryInput,
  ): Promise<History> {
    const history = await this.findOneById(id);
    return await this.historyRepository.save({
      ...history,
      ...updateHistoryInput,
    });
  }

  async remove(id: string): Promise<boolean> {
    const history = await this.findOneById(id);
    return !!(await this.historyRepository.save({ ...history, deleted: true }));
  }

  async hardRemove(id: string): Promise<boolean> {
    const history = await this.findOneById(id);
    return !!(await this.historyRepository.remove(history));
  }
}
