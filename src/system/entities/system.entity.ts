import { SystemDetails } from '@clio/common/enums/system.enum';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import JSON from 'graphql-type-json';
import { History } from '@clio/history/entities/history.entity';

@ObjectType()
@Entity('systems')
export class System<
  SystemDetailsStats extends Record<string, unknown> = Record<string, unknown>,
> {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => String)
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Field(() => String)
  @Column({ type: 'varchar', length: 255 })
  description: string;

  @Column({
    type: 'enum',
    enum: SystemDetails,
    default: SystemDetails.Custom,
  })
  @Field(() => SystemDetails)
  type: SystemDetails;

  @Column('simple-json')
  @Field(() => JSON)
  stats: SystemDetailsStats;

  @Column({
    default: true,
  })
  @Field(() => Boolean)
  private: boolean;

  @OneToMany(() => History, (history) => history.system)
  @Field(() => [History])
  histories?: History[];
}
