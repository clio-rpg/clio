import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HistoryModule } from './history/history.module';
import { AuthModule } from './auth/auth.module';
import { CharacterModule } from './character/character.module';
import GraphQLJSON from 'graphql-type-json';
import { SystemDetails } from './common/enums/system.enum';
import { SystemModule } from './system/system.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({ autoLoadEntities: true }),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      context: ({ req }) => ({ req }),
      resolvers: {
        JSON: GraphQLJSON,
        SystemDetails: SystemDetails,
      },
    }),
    HistoryModule,
    AuthModule,
    CharacterModule,
    SystemModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
