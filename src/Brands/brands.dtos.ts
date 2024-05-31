import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateBrandDto {
  @ApiProperty({
    description: 'The name of a brand',
    type: String,
    example: 'Nike',
  })
  @IsString()
  @IsNotEmpty()
  readonly bra_name: string;
}

export class UpdateBrandDto extends PartialType(CreateBrandDto) {}
