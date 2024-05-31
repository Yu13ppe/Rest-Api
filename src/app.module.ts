import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } from './config';

import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { CustomersModule } from './customers/customers.module';
import { CategoriesModule } from './categories/categories.module';
import { BrandsModule } from './brands/brands.module';

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
      entities: [__dirname + 'src/**/*.entity.ts'],
      autoLoadEntities: true,
      retryDelay: 3000,
      retryAttempts: 10,
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
