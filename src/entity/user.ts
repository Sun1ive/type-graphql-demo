import { Entity, ObjectID, ObjectIdColumn, Column } from 'typeorm';

@Entity()
export class User {
  @ObjectIdColumn()
  // @ts-ignore
  id: ObjectID;

  @Column()
  // @ts-ignore
  email: string;

  @Column()
  // @ts-ignore
  password: string;

  // constructor(id: ObjectID, email: string, password: string) {
  //   this.id = id;
  //   this.email = email;
  //   this.password = password;
  // }
}
