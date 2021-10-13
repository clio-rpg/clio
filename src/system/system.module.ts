import { Module } from '@nestjs/common';
import { SystemService } from './system.service';
import { SystemResolver } from './system.resolver';

@Module({
  providers: [SystemResolver, SystemService],
})
export class SystemModule {}
