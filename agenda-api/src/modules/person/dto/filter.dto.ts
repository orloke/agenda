import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class FiltersDto {
  @ApiProperty()
  @IsString()
  @IsEmail()
  @IsOptional()
  email?: string;
}
