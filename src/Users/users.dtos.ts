import { IsString, IsNotEmpty, IsEmail } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'The name of a user',
    type: String,
    example: 'John Doe',
  })
  @IsString()
  @IsNotEmpty()
  readonly use_name: string;

  @ApiProperty({
    description: 'The email of a user',
    type: String,
    example: '',
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  readonly use_email: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
