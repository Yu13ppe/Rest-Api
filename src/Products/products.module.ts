import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './products.entity';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { CategoriesService } from '../Categories/categories.service';
import { BrandsService } from '../Brands/brands.service';
import { Brand } from '../Brands/brands.entity';
import { Category } from '../Categories/categories.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Category, Brand])],
  controllers: [ProductsController],
  providers: [ProductsService, CategoriesService, BrandsService],
})
export class ProductsModule {}
