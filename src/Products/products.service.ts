import {
  Injectable,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Product } from './products.entity';
import { CategoriesService } from '../Categories/categories.service';
import { BrandsService } from '../Brands/brands.service';
import { CreateProductDto, UpdateProductDto } from './products.dtos';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    private categoryService: CategoriesService,
    // Inyectamos el servicio de Brand
    private brandService: BrandsService,
  ) {}

  async findAll() {
    return this.productRepository.find({
      relations: ['category', 'brand'],
    });
  }

  async findById(prod_id: number) {
    const product = await this.productRepository.findOne({
      where: { prod_id },
      relations: ['category', 'brand'],
    });
    if (!product) {
      throw new NotFoundException(`Product #${prod_id} not found`);
    }
    return product;
  }

  async findByName(prod_name: string) {
    const product = await this.productRepository.findOne({
      where: { prod_name },
      relations: ['category', 'brand'],
    });
    if (!product) {
      throw new NotFoundException(`Product #${prod_name} not found`);
    }
    return product;
  }

  async findByCategory(category_id: number) {
    const cate = await this.categoryService.findById(category_id);
    const product = await this.productRepository.find({
      where: { category: cate },
      relations: ['category', 'brand'],
    });
    if (!product) {
      throw new NotFoundException(`Product #${category_id} not found`);
    }
    return product;
  }

  async findByBrand(brand_id: number) {
    const brand = await this.brandService.findById(brand_id);
    const product = await this.productRepository.find({
      where: { brand: brand },
      relations: ['category', 'brand'],
    });
    if (!product) {
      throw new NotFoundException(`Product #${brand_id} not found`);
    }
    return product;
  }

  async create(payload: CreateProductDto) {
    const entity = await this.productRepository.findOne({
      where: { prod_name: payload.prod_name },
    });
    if (entity) {
      throw new HttpException('Product is already exist', HttpStatus.CONFLICT);
    }
    const newProduct = this.productRepository.create(payload);
    this.productRepository.save(newProduct);
    return newProduct;
  }

  async update(prod_id: number, payload: UpdateProductDto) {
    const entity = await this.productRepository.findOne({
      where: { prod_id },
    });
    if (!entity) {
      throw new NotFoundException(`Product #${prod_id} not found`);
    }
    this.productRepository.update(prod_id, payload);
  }

  async delete(prod_id: number): Promise<DeleteResult> {
    try {
      const entity = await this.productRepository.findOne({
        where: { prod_id },
      });
      if (!entity) {
        throw new NotFoundException(`Product #${prod_id} not found`);
      }
      return await this.productRepository.delete({ prod_id });
    } catch (error) {
      if (error.message.includes('a foreign key constraint fails')) {
        throw new NotFoundException(
          `Cannot delete Product #${prod_id} because it is associated with other entities`,
        );
      }
      throw error;
    }
  }
}
