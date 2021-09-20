import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';

@ObjectType()
@Entity()
export class History {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
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

  //TO-DO: Add master relation
  // @ManyToOne(() => User, user => user.histories);
  // master: number;

  //TO-DO: add configs
}
