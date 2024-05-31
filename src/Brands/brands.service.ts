import {
  Injectable,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Brand } from './brands.entity';
import { CreateBrandDto, UpdateBrandDto } from './brands.dtos';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(Brand)
    private brandRepository: Repository<Brand>,
  ) {}
  // private brands: Brand[] = [
  //   {
  //     id: 1,
  //     name: 'Brand 1',
  //   },
  // ];

  findAll() {
    return this.brandRepository.find();
  }

  // findOne(bra_id: number) {
  //   const brand = this.brands.find((brand) => brand.id === id);
  //   if (!brand) {
  //     throw new NotFoundException(`Brand #${id} not found`);
  //   }
  //   return brand;
  // }

  async findByid(bra_id: number) {
    return this.brandRepository.findOne({
      where: { bra_id },
    });
  }

  // create(payload: CreateBrandDto) {
  //   const newBrand = {
  //     id: this.brands.length + 1,
  //     ...payload,
  //   };
  //   this.brands.push(newBrand);
  //   return newBrand;
  // }

  async create(payload: CreateBrandDto) {
    const entity = await this.brandRepository.findOne({
      where: { bra_name: payload.bra_name },
    });
    if (entity) {
      throw new HttpException('Brand is already exist', HttpStatus.CONFLICT);
    }
    const newBrand = this.brandRepository.create(payload);
    this.brandRepository.save(newBrand);
    return newBrand;
  }

  // update(id: number, payload: UpdateBrandDto) {
  //   const brand = this.findOne(id);
  //   if (brand) {
  //     const index = this.brands.findIndex((brand) => brand.id === id);
  //     this.brands[index] = {
  //       ...brand,
  //       ...payload,
  //     };
  //     return this.brands[index];
  //   }
  //   return null;
  // }

  async update(bra_id: number, payload: UpdateBrandDto) {
    const entity = await this.brandRepository.findOne({
      where: { bra_id },
    });
    if (!entity) {
      throw new NotFoundException(`Brand #${bra_id} not found`);
    }
    this.brandRepository.update(bra_id, payload);
  }

  // delete(id: number) {
  //   const index = this.brands.findIndex((brand) => brand.id === id);
  //   if (index === -1) {
  //     throw new NotFoundException(`Brand #${id} not found`);
  //   }
  //   this.brands.splice(index, 1);
  //   return true;
  // }

  async delete(bra_id: number): Promise<DeleteResult> {
    try {
      const entity = await this.brandRepository.findOne({
        where: { bra_id },
      });
      if (!entity) {
        throw new NotFoundException(`Brand #${bra_id} not found`);
      }

      return await this.brandRepository.delete({ bra_id });
    } catch (error) {
      if (error.message.includes('a foreign key constraint fails')) {
        throw new NotFoundException(
          `Cannot delete Brand #${bra_id} because it is associated with other entities`,
        );
      }
      throw error;
    }
  }
}
