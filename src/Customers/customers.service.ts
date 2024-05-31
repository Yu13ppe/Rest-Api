import {
  Injectable,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Customer } from './customers.entity';
import { CreateCustomerDto, UpdateCustomerDto } from './customers.dtos';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}
  // private customers: Customer[] = [
  //   {
  //     id: 1,
  //     name: 'Customer 1',
  //     email: 'customer@gmail.com',
  //     phone: '123456789',
  //     address: '1234 Street Name',
  //   },
  // ];

  findAll() {
    return this.customerRepository.find();
  }

  // findOne(id: number) {
  //   const customer = this.customers.find((customer) => customer.id === id);
  //   if (!customer) {
  //     throw new NotFoundException(`Customer #${id} not found`);
  //   }
  //   return customer;
  // }

  async findByid(cust_id: number) {
    return this.customerRepository.findOne({
      where: { cust_id },
    });
  }

  // create(payload: CreateCustomerDto) {
  //   const newCustomer = {
  //     id: this.customers.length + 1,
  //     ...payload,
  //   };
  //   this.customers.push(newCustomer);
  //   return newCustomer;
  // }

  async create(payload: CreateCustomerDto) {
    const entity = await this.customerRepository.findOne({
      where: { cust_email: payload.cust_email },
    });
    if (entity) {
      throw new HttpException('Customer is already exist', HttpStatus.CONFLICT);
    }
    const newCustomer = this.customerRepository.create(payload);
    this.customerRepository.save(newCustomer);
    return newCustomer;
  }

  // update(id: number, payload: UpdateCustomerDto) {
  //   const customer = this.findOne(id);
  //   if (customer) {
  //     const index = this.customers.findIndex((customer) => customer.id === id);
  //     this.customers[index] = {
  //       ...customer,
  //       ...payload,
  //     };
  //     return this.customers[index];
  //   }
  //   return null;
  // }

  async update(cust_id: number, payload: UpdateCustomerDto) {
    const entity = await this.customerRepository.findOne({
      where: { cust_id },
    });
    if (!entity) {
      throw new NotFoundException(`Customer #${cust_id} not found`);
    }
    this.customerRepository.update(cust_id, payload);
  }

  // delete(id: number) {
  //   const index = this.customers.findIndex((customer) => customer.id === id);
  //   if (index === -1) {
  //     throw new NotFoundException(`Customer #${id} not found`);
  //   }
  //   this.customers.splice(index, 1);
  //   return true;
  // }

  async delete(cust_id: number): Promise<DeleteResult> {
    try {
      const entity = await this.customerRepository.findOne({
        where: { cust_id },
      });
      if (!entity) {
        throw new NotFoundException(`Customer #${cust_id} not found`);
      }

      return await this.customerRepository.delete({ cust_id });
    } catch (error) {
      if (error.message.includes('a foreign key constraint fails')) {
        throw new NotFoundException(
          `Cannot delete Customer #${cust_id} because it is associated with other entities`,
        );
      }
      throw error;
    }
  }
}
