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

import { CategoriesService } from './categories.service';
import { CreateCategoryDto, UpdateCategoryDto } from './categories.dtos';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  getAll() {
    return this.categoriesService.findAll();
  }

  @Get(':categoryId')
  getOne(@Param('id', ParseIntPipe) categoryId: number) {
    return this.categoriesService.findById(categoryId);
  }

  @Get('/name/:cat_name')
  findByName(@Param('cat_name') cat_name: string) {
    return this.categoriesService.findByName(cat_name);
  }

  @Post()
  create(@Body() payload: CreateCategoryDto) {
    return this.categoriesService.create(payload);
  }

  @Put(':categoryId')
  update(
    @Param('categoryId', ParseIntPipe) categoryId: number,
    @Body() payload: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(categoryId, payload);
  }

  @Delete(':categoryId')
  delete(@Param('categoryId', ParseIntPipe) categoryId: number) {
    return this.categoriesService.delete(categoryId);
  }
}
