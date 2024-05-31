import {
  Injectable,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Product } from './products.entity';
import { CreateProductDto, UpdateProductDto } from './products.dtos';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}
  // private products: Product[] = [
  //   {
  //     prod_id: 1,
  //     prod_name: 'Product 1',
  //     prod_description: 'Description 1',
  //     prod_price: 123,
  //   },
  // ];

  findAll() {
    return this.productRepository.find();
  }

  async findByid(prod_id: number) {
    return this.productRepository.findOne({
      where: { prod_id },
    });
  }

  // create(payload: CreateProductDto) {
  //   const newProduct = {
  //     id: this.products.length + 1,
  //     ...payload,
  //   };
  //   this.products.push(newProduct);
  //   return newProduct;
  // }

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

  // update(id: number, payload: UpdateProductDto) {
  //   const product = this.findOne(id);
  //   if (product) {
  //     const index = this.products.findIndex((product) => product.id === id);
  //     this.products[index] = {
  //       ...product,
  //       ...payload,
  //     };
  //     return this.products[index];
  //   }
  //   return null;
  // }

  async update(prod_id: number, payload: UpdateProductDto) {
    const entity = await this.productRepository.findOne({
      where: { prod_id },
    });
    if (!entity) {
      throw new NotFoundException(`Product #${prod_id} not found`);
    }
    this.productRepository.update(prod_id, payload);
  }

  // delete(id: number) {
  //   const index = this.products.findIndex((product) => product.id === id);
  //   if (index === -1) {
  //     throw new NotFoundException(`Product #${id} not found`);
  //   }
  //   this.products.splice(index, 1);
  //   return true;
  // }

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
