import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ProductsService } from './products.service';
import { CreateProductDto, UpdateProductDto } from './products.dtos';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  //Sirve para una paginacion de productos con limit y offset
  @Get()
  getAll() {
    return this.productsService.findAll();
  }

  @Get(':productId')
  getOne(@Param('productId', ParseIntPipe) productId: number) {
    return this.productsService.findByid(productId);
  }

  @Get('/name/:prod_name')
  findByName(@Param('prod_name') prod_name: string) {
    return this.productsService.findByName(prod_name);
  }

  @Get('/category/:category_id')
  findByCategory(@Param('category_id') category_id: number) {
    return this.productsService.findByCategory(category_id);
  }

  @Get('/brand/:brand_id')
  findByBrand(@Param('brand_id') brand_id: number) {
    return this.productsService.findByBrand(brand_id);
  }

  @Post()
  create(@Body() payload: CreateProductDto) {
    return this.productsService.create(payload);
  }

  @Put(':productId')
  update(
    @Param('productId', ParseIntPipe) productId: number,
    @Body() payload: UpdateProductDto,
  ) {
    return this.productsService.update(productId, payload);
  }

  @Delete(':productId')
  delete(@Param('productId', ParseIntPipe) productId: number) {
    return this.productsService.delete(productId);
  }
}
