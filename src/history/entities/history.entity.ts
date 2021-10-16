import { Character } from '@clio/character/entities/character.entity';
import { System } from '@clio/system/entities/system.entity';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User } from 'src/auth/entities/user.entity';
import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  ManyToMany,
  JoinTable,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

@ObjectType()
@Entity('histories')
export class History {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  slug: string;

  @Column()
  description: string;

  @Column()
  origin: string;

  @Column({ default: true })
  active: boolean;

  @Column({ default: false })
  deleted: boolean;

  @Column({ default: true })
  private: boolean;

  @Column({ default: false, name: 'invite_enabled' })
  inviteEnabled: boolean;

  @Column({ nullable: true, unique: true, name: 'invite_code' })
  inviteCode?: string;

  @ManyToOne(() => User, (User) => User.masterHistories, {
    cascade: true,
  })
  @JoinColumn({
    name: 'master_id',
    referencedColumnName: 'id',
  })
  @Field(() => User)
  master: User;

  //TO-DO: add configs

  @ManyToMany(() => User, (user) => user.histories)
  @JoinTable({
    joinColumn: { name: 'histories_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'users_id', referencedColumnName: 'id' },
  })
  @Field(() => [User], { nullable: 'itemsAndList' })
  users?: User[];

  @OneToMany(() => Character, (character) => character.history)
  @Field(() => [Character], { nullable: 'itemsAndList' })
  characters?: Character[];

  @ManyToOne(() => System, (system) => system.histories, {
    cascade: true,
  })
  @JoinColumn({
    name: 'system_id',
    referencedColumnName: 'id',
  })
  @Field(() => System)
  system?: System;
}
