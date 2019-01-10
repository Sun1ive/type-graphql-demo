import { Entity, Column, BaseEntity, PrimaryColumn } from 'typeorm';
import { Field, ObjectType, ID } from 'type-graphql';

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryColumn('varchar', { unique: true })
  id: string;

  @Field()
  @Column('text', { unique: true })
  email: string;

  @Column()
  password: string;
}
