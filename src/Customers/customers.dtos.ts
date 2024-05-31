import { IsString, IsNotEmpty, IsEmail } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateCustomerDto {
  @ApiProperty({
    description: 'The name of a customer',
    type: String,
    example: 'John Doe',
  })
  @IsString()
  @IsNotEmpty()
  readonly cust_name: string;

  @ApiProperty({
    description: 'The email of a customer',
    type: String,
    example: 'email@gmail.com',
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  readonly cust_email: string;

  @ApiProperty({
    description: 'The phone number of a customer',
    type: String,
    example: '1234567890',
  })
  @IsString()
  @IsNotEmpty()
  readonly cust_phone: string;

  @ApiProperty({
    description: 'The address of a customer',
    type: String,
    example: '1234 Elm St, Springfield, IL 62701',
  })
  @IsString()
  @IsNotEmpty()
  readonly cust_address: string;
}

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}
