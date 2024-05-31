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

import { BrandsService } from './brands.service';
import { CreateBrandDto, UpdateBrandDto } from './brands.dtos';

@ApiTags('brands')
@Controller('brands')
export class BrandsController {
  constructor(private brandsService: BrandsService) {}

  @Get()
  getAll() {
    return this.brandsService.findAll();
  }

  @Get(':brandId')
  getOne(@Param('brandId', ParseIntPipe) brandId: number) {
    return this.brandsService.findById(brandId);
  }

  @Get('/name/:cat_name')
  findByName(@Param('cat_name') cat_name: string) {
    return this.brandsService.findByName(cat_name);
  }

  @Post()
  create(@Body() payload: CreateBrandDto) {
    return this.brandsService.create(payload);
  }

  @Put(':brandId')
  update(
    @Param('brandId', ParseIntPipe) brandId: number,
    @Body() payload: UpdateBrandDto,
  ) {
    return this.brandsService.update(brandId, payload);
  }

  @Delete(':brandId')
  delete(@Param('brandId', ParseIntPipe) brandId: number) {
    return this.brandsService.delete(brandId);
  }
}
