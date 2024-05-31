import { Product } from '../Products/products.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity()
export class Brand {
  @PrimaryGeneratedColumn()
  bra_id: number;

  @Column()
  bra_name: string;

  @ManyToMany(() => Product, (product) => product.brand)
  @JoinTable()
  product: Product;
}
