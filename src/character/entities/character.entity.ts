import { User } from '@clio/auth/entities/user.entity';
import { History } from '@clio/history/entities/history.entity';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import JSON from 'graphql-type-json';

@ObjectType()
@Entity('characters')
export class Character<
  SystemDetailsStats extends Record<string, unknown> = Record<string, unknown>,
> {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name: string;

  @Column()
  bio?: string;

  @Column({ default: true })
  active: boolean;

  @Column({ default: false })
  deleted: boolean;

  @ManyToOne(() => User, (User) => User.characters, {
    cascade: true,
  })
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
  })
  @Field(() => User)
  user: User;

  @ManyToOne(() => History, (history) => history.characters, {
    cascade: true,
  })
  @JoinColumn({
    name: 'history_id',
    referencedColumnName: 'id',
  })
  @Field(() => History)
  history: History;

  @Field({
    description: 'Character thumbnail/token url',
  })
  @Column()
  thumbnail?: string;

  @Field({
    description: 'Character portrait/photo url',
  })
  @Column()
  portrait?: string;

  @Column('simple-json')
  @Field(() => JSON)
  stats: SystemDetailsStats;
}
