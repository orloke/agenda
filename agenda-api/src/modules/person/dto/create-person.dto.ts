import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsString, MinLength } from "class-validator";

export class CreatePersonDto {
  @ApiProperty({
    minLength: 3,
    description: "User name",
  })
  @IsString()
  @MinLength(3)
  name: string;

  @ApiProperty({minLength: 10, description: "Phone number"})
  @IsString()
  @MinLength(10)
  phone: string;

  @ApiProperty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({required: false, description: "Address"})
  @IsString()
  @IsOptional()
  address?: string;
}
