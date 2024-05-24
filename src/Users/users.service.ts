import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './users.entity';
import { Order } from '../Orders/order.entity';
import { ProductsService } from '../Products/products.service';
import { CreateUserDto, UpdateUserDto } from './users.dtos';

@Injectable()
export class UsersService {
  constructor(private productsService: ProductsService) {}

  private users: User[] = [
    {
      id: 1,
      name: 'User 1',
      email: 'user@gmail.com',
    },
  ];

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  create(payload: CreateUserDto) {
    const newUser = {
      id: this.users.length + 1,
      ...payload,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, payload: UpdateUserDto) {
    const user = this.findOne(id);
    if (user) {
      const index = this.users.findIndex((user) => user.id === id);
      this.users[index] = {
        ...user,
        ...payload,
      };
      return this.users[index];
    }
    return null;
  }

  delete(id: number) {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) {
      throw new NotFoundException(`User #${id} not found`);
    }
    this.users.splice(index, 1);
    return true;
  }

  getOrdersByUser(userId: number): Order {
    const user = this.findOne(userId);
    return {
      id: 1,
      orderNumber: '1234',
      orderDate: new Date(),
      user,
      products: this.productsService.findAll(),
    };
  }
}
