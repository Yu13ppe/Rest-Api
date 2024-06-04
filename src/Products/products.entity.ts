import { Brand } from '../Brands/brands.entity';
import { Category } from '../Categories/categories.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  prod_id: number;

  @Column()
  prod_name: string;

  @Column()
  prod_description: string;

  @Column({ type: 'float' })
  prod_price: number;

  @ManyToMany(() => Brand, (brand) => brand.product)
  @JoinTable()
  brand: Brand[];

  @ManyToMany(() => Category, (category) => category.product)
  @JoinTable()
  category: Category[];
}
