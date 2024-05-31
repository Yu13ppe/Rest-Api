import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  use_id: number;

  @Column()
  use_name: string;

  @Column()
  use_email: string;
}
