import { Brand } from 'src/Brands/brands.entity';
import { Category } from 'src/Categories/categories.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';

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
  brand: Brand[];

  @ManyToMany(() => Category, (category) => category.product)
  category: Category[];
}
