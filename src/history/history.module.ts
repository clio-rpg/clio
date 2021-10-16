import { Module } from '@nestjs/common';
import { HistoryService } from './history.service';
import { HistoryResolver } from './history.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { History } from './entities/history.entity';
import { GqlAuthGuard } from '../auth/guards/auth.guard';
import { System } from '@clio/system/entities/system.entity';
import { SystemModule } from '@clio/system/system.module';

@Module({
  imports: [TypeOrmModule.forFeature([History, System]), SystemModule],
  providers: [HistoryResolver, HistoryService, GqlAuthGuard],
})
export class HistoryModule {}
