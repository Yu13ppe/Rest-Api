import { Product } from '../Products/products.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  cat_id: number;

  @Column()
  cat_name: string;

  @ManyToMany(() => Product, (product) => product.category)
  @JoinTable()
  product: Product;
}
