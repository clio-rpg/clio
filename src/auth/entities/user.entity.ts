import { Field, HideField, ID, ObjectType } from '@nestjs/graphql';
import { hashPasswordTransform } from '../../common/helpers/crypto';
import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from 'src/common/enums/role.enum';
import { History } from 'src/history/entities/history.entity';
import { Character } from '@clio/character/entities/character.entity';

@ObjectType()
@Entity('users')
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column({
    transformer: hashPasswordTransform,
  })
  @HideField()
  password: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.User,
  })
  @Field()
  role: Role;

  @ManyToMany(() => History, (history) => history.users)
  @Field(() => [History], { nullable: 'itemsAndList' })
  histories: History[];

  @OneToMany(() => History, (history) => history.master)
  @Field(() => [History])
  masterHistories?: History[];

  @OneToMany(() => Character, (character) => character.user)
  @Field(() => [Character], { nullable: 'itemsAndList' })
  characters: Character[];
}
