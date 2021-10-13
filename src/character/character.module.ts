import { Module } from '@nestjs/common';
import { CharacterService } from './character.service';
import { CharacterResolver } from './character.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Character } from './entities/character.entity';
import { HistoryModule } from '@clio/history/history.module';
import { History } from '@clio/history/entities/history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Character, History]), HistoryModule],
  providers: [CharacterResolver, CharacterService],
})
export class CharacterModule {}
