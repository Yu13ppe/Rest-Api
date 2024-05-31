import {
  Injectable,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { User } from './users.entity';
// import { Order } from '../Orders/order.entity';
import { ProductsService } from '../Products/products.service';
import { CreateUserDto, UpdateUserDto } from './users.dtos';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private productsService: ProductsService,
  ) {}

  // private users: User[] = [
  //   {
  //     id: 1,
  //     name: 'User 1',
  //     email: 'user@gmail.com',
  //   },
  // ];

  findAll() {
    return this.userRepository.find();
  }

  async findByid(use_id: number) {
    return this.userRepository.findOne({
      where: { use_id },
    });
  }

  async findByEmail(use_email: string) {
    return await this.userRepository.findOne({
      where: { use_email },
    });
  }

  // create(payload: CreateUserDto) {
  //   const newUser = {
  //     id: this.users.length + 1,
  //     ...payload,
  //   };
  //   this.users.push(newUser);
  //   return newUser;
  // }

  async create(payload: CreateUserDto) {
    const entity = await this.userRepository.findOne({
      where: { use_email: payload.use_email },
    });
    if (entity) {
      throw new HttpException('User is already exist', HttpStatus.CONFLICT);
    }
    const newUser = this.userRepository.create(payload);
    this.userRepository.save(newUser);
    return newUser;
  }

  // update(id: number, payload: UpdateUserDto) {
  //   const user = this.findOne(id);
  //   if (user) {
  //     const index = this.users.findIndex((user) => user.id === id);
  //     this.users[index] = {
  //       ...user,
  //       ...payload,
  //     };
  //     return this.users[index];
  //   }
  //   return null;
  // }

  async update(use_id: number, payload: UpdateUserDto) {
    const entity = await this.userRepository.findOne({
      where: { use_id },
    });
    if (!entity) {
      throw new NotFoundException(`User #${use_id} not found`);
    }
    this.userRepository.update(use_id, payload);
  }

  // delete(id: number) {
  //   const index = this.users.findIndex((user) => user.id === id);
  //   if (index === -1) {
  //     throw new NotFoundException(`User #${id} not found`);
  //   }
  //   this.users.splice(index, 1);
  //   return true;
  // }

  async delete(use_id: number): Promise<DeleteResult> {
    try {
      const entity = await this.userRepository.findOne({
        where: { use_id },
      });
      if (!entity) {
        throw new NotFoundException(`User #${use_id} not found`);
      }

      return await this.userRepository.delete({ use_id });
    } catch (error) {
      if (error.message.includes('a foreign key constraint fails')) {
        throw new NotFoundException(
          `Cannot delete User #${use_id} because it is associated with other entities`,
        );
      }
      throw error;
    }
  }

  // getOrdersByUser(userId: number): Order {
  //   const user = this.findOne(userId);
  //   return {
  //     id: 1,
  //     orderNumber: '1234',
  //     orderDate: new Date(),
  //     user,
  //     products: this.productsService.findAll(),
  //   };
  // }
}
