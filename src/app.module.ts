import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_USER,
  DATABASE_URL,
} from './config';

import { ProductsModule } from './Products/products.module';
import { UsersModule } from './Users/users.module';
import { CustomersModule } from './Customers/customers.module';
import { CategoriesModule } from './Categories/categories.module';
import { BrandsModule } from './Brands/brands.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: DB_HOST,
      port: DB_PORT,
      username: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
      url: DATABASE_URL,
      entities: [__dirname + 'src/**/*.entity.ts'],
      autoLoadEntities: true,
      retryDelay: 3000,
      retryAttempts: 10,
      ssl: true,
      synchronize: true, //No usar en produccion.
      dropSchema: true, //No usar en produccion.
    }),
    ProductsModule,
    UsersModule,
    CustomersModule,
    CategoriesModule,
    BrandsModule,
  ],
})
export class AppModule {}
