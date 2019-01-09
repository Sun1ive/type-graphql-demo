import { ObjectID } from 'mongodb';
import { Entity, ObjectIdColumn, Column, BaseEntity } from 'typeorm';
import { Field, ObjectType, ID } from 'type-graphql';

ObjectID.prototype.valueOf = function() {
  return this.toString();
};

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @ObjectIdColumn()
  id: ObjectID;

  @Field()
  @Column('text', { unique: true })
  email: string;

  @Column()
  password: string;
}
