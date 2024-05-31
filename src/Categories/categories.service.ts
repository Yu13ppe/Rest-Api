import {
  Injectable,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Category } from './categories.entity';
import { CreateCategoryDto, UpdateCategoryDto } from './categories.dtos';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}
  // private categories: Category[] = [
  //   {
  //     id: 1,
  //     name: 'Category 1',
  //   },
  // ];

  findAll() {
    return this.categoryRepository.find();
  }

  // findOne(id: number) {
  //   const category = this.categories.find((category) => category.id === id);
  //   if (!category) {
  //     throw new NotFoundException(`Category #${id} not found`);
  //   }
  //   return category;
  // }

  async findById(cat_id: number) {
    const category = await this.categoryRepository.findOne({
      where: { cat_id },
    });
    if (!category) {
      throw new NotFoundException(`Category #${cat_id} not found`);
    }
    return category;
  }

  async findByName(cat_name: string) {
    const category = await this.categoryRepository.findOne({
      where: { cat_name },
    });
    if (!category) {
      throw new NotFoundException(`Category #${cat_name} not found`);
    }
    return category;
  }

  // create(payload: CreateCategoryDto) {
  //   const newCategory = {
  //     id: this.categories.length + 1,
  //     ...payload,
  //   };
  //   this.categories.push(newCategory);
  //   return newCategory;
  // }

  async create(payload: CreateCategoryDto) {
    const entity = await this.categoryRepository.findOne({
      where: { cat_name: payload.cat_name },
    });
    if (entity) {
      throw new HttpException('Linea ya existente', HttpStatus.CONFLICT);
    }
    const newCategory = this.categoryRepository.create(payload);
    this.categoryRepository.save(newCategory);
  }

  // update(id: number, payload: UpdateCategoryDto) {
  //   const category = this.findOne(id);
  //   if (category) {
  //     const index = this.categories.findIndex((category) => category.id === id);
  //     this.categories[index] = {
  //       ...category,
  //       ...payload,
  //     };
  //     return this.categories[index];
  //   }
  //   return null;
  // }

  async update(cat_id: number, payload: UpdateCategoryDto) {
    const entity = await this.categoryRepository.findOne({
      where: { cat_id },
    });
    if (!entity) {
      throw new NotFoundException(`Category #${cat_id} not found`);
    }
    this.categoryRepository.update(cat_id, payload);
  }

  // delete(id: number) {
  //   const index = this.categories.findIndex((category) => category.id === id);
  //   if (index === -1) {
  //     throw new NotFoundException(`Category #${id} not found`);
  //   }
  //   this.categories.splice(index, 1);
  //   return true;
  // }

  async delete(cat_id: number): Promise<DeleteResult> {
    try {
      const entity = await this.categoryRepository.findOne({
        where: { cat_id },
      });
      if (!entity) {
        throw new NotFoundException(`Category #${cat_id} not found`);
      }

      return await this.categoryRepository.delete({ cat_id });
    } catch (error) {
      if (error.message.includes('a foreign key constraint fails')) {
        throw new NotFoundException(
          `Cannot delete Category #${cat_id} because it is associated with other entities`,
        );
      }
      throw error;
    }
  }
}
