import { IsString, IsNotEmpty, IsEmail } from 'class-validator';
import { PartialType } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly use_name: string;

  @IsString()
  @IsNotEmpty()
  adm_password: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  readonly use_email: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
