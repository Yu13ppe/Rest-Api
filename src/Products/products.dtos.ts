import { IsString, IsNumber, IsNotEmpty, IsPositive } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({
    description: 'The name of a product',
    type: String,
    example: 'iPhone 12 Pro',
  })
  @IsString()
  @IsNotEmpty()
  readonly prod_name: string;

  @ApiProperty({
    description: 'The description of a product',
    type: String,
    example: 'A smartphone with 5G capabilities',
  })
  @IsString()
  @IsNotEmpty()
  readonly prod_description: string;

  @ApiProperty({
    description: 'The price of a product',
    type: Number,
    example: 999.99,
  })
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly prod_price: number;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}
