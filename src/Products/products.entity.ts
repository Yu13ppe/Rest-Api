// import { Brand } from 'src/Brands/brands.entity';
// import { Category } from 'src/Categories/categories.entity';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  prod_id: number;

  @Column()
  prod_name: string;

  @Column()
  prod_description: string;

  @Column()
  prod_price: number;

  // @ManyToMany(() => Brand, (brand) => brand.bra_id)
  // brand: Brand[];

  // @ManyToMany(() => Category, (category) => category.cat_id)
  // category: Category[];
}
