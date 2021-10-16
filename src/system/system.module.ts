import { Module } from '@nestjs/common';
import { SystemService } from './system.service';
import { SystemResolver } from './system.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { System } from './entities/system.entity';

@Module({
  imports: [TypeOrmModule.forFeature([System])],
  providers: [SystemResolver, SystemService],
})
export class SystemModule {}
