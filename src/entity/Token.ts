import { Entity, Column, BaseEntity, PrimaryColumn } from 'typeorm';
import { Field, ObjectType, ID } from 'type-graphql';

@ObjectType()
@Entity()
export class Token extends BaseEntity {
  @Field(() => ID)
  @PrimaryColumn('varchar', { unique: true })
  id: string;

  @Field()
  @Column('varchar', { unique: true })
  userId: string;

  @Field()
  @Column('varchar', { unique: true })
  refreshToken: string;

  @Field()
  @Column('varchar', { unique: true })
  token: string;
}
