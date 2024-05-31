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

import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './users.dtos';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  //Sirve para una paginacion de usuarios con limit y offset
  @Get()
  getAll() {
    return this.usersService.findAll();
  }

  @Get(':userId')
  getOne(@Param('userId', ParseIntPipe) userId: number) {
    return this.usersService.findByid(userId);
  }

  @Get('/email/:email')
  getOneByEmail(@Param('email') email: string) {
    return this.usersService.findByEmail(email);
  }

  @Post()
  create(@Body() payload: CreateUserDto) {
    return this.usersService.create(payload);
  }

  @Put(':userId')
  update(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() payload: UpdateUserDto,
  ) {
    return this.usersService.update(userId, payload);
  }

  @Delete(':userId')
  delete(@Param('userId', ParseIntPipe) userId: number) {
    return this.usersService.delete(userId);
  }
}
