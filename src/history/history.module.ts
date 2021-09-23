import { Module } from '@nestjs/common';
import { HistoryService } from './history.service';
import { HistoryResolver } from './history.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { History } from './entities/history.entity';
import { GqlAuthGuard } from '../auth/guards/auth.guard';

@Module({
  imports: [TypeOrmModule.forFeature([History])],
  providers: [HistoryResolver, HistoryService, GqlAuthGuard],
})
export class HistoryModule {}
