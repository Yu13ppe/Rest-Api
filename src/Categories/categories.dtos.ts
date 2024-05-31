import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({
    description: 'The name of a category',
    type: String,
    example: 'Electronics',
  })
  @IsString()
  @IsNotEmpty()
  readonly cat_name: string;
}

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}
