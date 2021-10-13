import { User } from '@clio/auth/entities/user.entity';
import { History } from '@clio/history/entities/history.entity';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCharacterInput } from './dto/create-character.input';
import { UpdateCharacterInput } from './dto/update-character.input';
import { Character } from './entities/character.entity';

@Injectable()
export class CharacterService {
  constructor(
    @InjectRepository(Character)
    private readonly characterRepository: Repository<Character>,
    @InjectRepository(History)
    private readonly historyRepository: Repository<History>,
  ) {}

  async create(
    createCharacterInput: CreateCharacterInput,
    user: User,
    historyId: string,
  ): Promise<Character> {
    const history = await this.historyRepository.findOne(historyId);
    if (!history) {
      throw new InternalServerErrorException('Error finding history');
    }
    const character = this.characterRepository.create({
      ...createCharacterInput,
      history,
      user,
    });
    if (!character) {
      throw new InternalServerErrorException('Error creating character');
    }
    return character;
  }

  async findAll() {
    const characters = await this.characterRepository.find({
      where: { private: false },
      relations: ['history', 'user'],
    });

    return characters;
  }

  async findOne(id: string): Promise<Character> {
    const character = await this.characterRepository.findOne(id);

    if (!character) {
      throw new InternalServerErrorException('Error finding character');
    }

    return character;
  }

  async findByHistory(historyId: string): Promise<Character[]> {
    const characters = await this.characterRepository.find({
      where: { history: { id: historyId } },
      relations: ['history', 'user'],
    });

    if (!characters) {
      throw new InternalServerErrorException('Error finding characters');
    }

    return characters;
  }

  async findByUser(userId: string): Promise<Character[]> {
    const characters = await this.characterRepository.find({
      where: { user: { id: userId } },
      relations: ['history', 'user'],
    });

    if (!characters) {
      throw new InternalServerErrorException('Error finding characters');
    }

    return characters;
  }

  async update(
    id: string,
    updateCharacterInput: UpdateCharacterInput,
  ): Promise<Character> {
    const character = await this.findOne(id);
    return await this.characterRepository.save({
      ...character,
      ...updateCharacterInput,
    });
  }

  async remove(id: string): Promise<boolean> {
    const character = await this.findOne(id);
    return !!(await this.characterRepository.save({
      ...character,
      deleted: true,
    }));
  }

  async hardRemove(id: string): Promise<boolean> {
    const character = await this.findOne(id);
    return !!(await this.characterRepository.remove(character));
  }
}
