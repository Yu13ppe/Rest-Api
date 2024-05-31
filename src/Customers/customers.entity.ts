import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  cust_id: number;

  @Column()
  cust_name: string;

  @Column()
  cust_email: string;

  @Column()
  cust_phone: string;

  @Column()
  cust_address: string;
}
