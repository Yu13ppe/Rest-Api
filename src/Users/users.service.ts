import {
  Injectable,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { User } from './users.entity';
import { CreateUserDto, UpdateUserDto } from './users.dtos';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

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

  async update(use_id: number, payload: UpdateUserDto) {
    const entity = await this.userRepository.findOne({
      where: { use_id },
    });
    if (!entity) {
      throw new NotFoundException(`User #${use_id} not found`);
    }
    this.userRepository.update(use_id, payload);
  }

  async delete(use_id: number) {
    // Buscamos el Administrador a eliminar por su ID
    const entity = await this.userRepository.findOne({
      where: { use_id },
    });
    if (!entity) {
      // Si no existe, lanzamos una excepción
      throw new NotFoundException(`Admin #${use_id} not found`);
    }
    // Si existe, lo eliminamos de la base de datos
    return this.userRepository.delete({ use_id });
  }
}
