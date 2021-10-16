import { System } from '@clio/system/entities/system.entity';
import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
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
    @InjectRepository(System)
    private systemRepository: Repository<System>,
  ) {}

  relations = ['users', 'master', 'system'];

  async create(
    createHistoryInput: CreateHistoryInput,
    user: User,
  ): Promise<History> {
    const history = await this.historyRepository.create({
      ...createHistoryInput,
      slug: slugify.create(),
      master: user,
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
      relations: this.relations,
    });
    return histories;
  }

  async findOneById(id: string): Promise<History> {
    const history = await this.historyRepository.findOne(id, {
      relations: this.relations,
    });
    if (!history) {
      throw new InternalServerErrorException('Error finding history');
    }
    return history;
  }

  async findBySlug(slug: string): Promise<History> {
    const history = await this.historyRepository.findOneOrFail({
      where: { slug },
      relations: this.relations,
    });
    if (!history) {
      throw new InternalServerErrorException('Error finding history');
    }

    //TO-DO: check if private or user is in the user list
    // if (history.private) {
    //   throw new ForbiddenException('Private history');
    // }

    return history;
  }

  async update(
    id: string,
    updateHistoryInput: UpdateHistoryInput,
  ): Promise<History> {
    const history = await this.findOneById(id);

    if (updateHistoryInput.systemId) {
      const system = await this.systemRepository.findOneOrFail(
        updateHistoryInput.systemId,
      );
      history.system = system;
    }

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

  async createInviteCode(slug: string): Promise<string> {
    const history = await this.findBySlug(slug);
    const inviteCode = slugify.inviteCode();
    await this.historyRepository.save({
      ...history,
      inviteEnabled: true,
      inviteCode,
    });
    return inviteCode;
  }

  async joinHistoryWithInviteCode(
    inviteCode: string,
    user: User,
  ): Promise<History> {
    const history = await this.historyRepository.findOneOrFail({
      where: { inviteCode },
      relations: this.relations,
    });
    if (!history) {
      throw new InternalServerErrorException('Error finding history');
    }
    if (history.private || !history.inviteEnabled) {
      throw new ForbiddenException('Private history');
    }
    history.users.push(user);
    await this.historyRepository.save(history);
    return history;
  }

  async leaveHistory(slug: string, user: User): Promise<boolean> {
    const history = await this.findBySlug(slug);
    history.users.splice(
      history.users.findIndex((u) => u.id === user.id),
      1,
    );
    return !!(await this.historyRepository.save(history));
  }
}
