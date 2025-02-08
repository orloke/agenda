import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Person {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ minLength: 3, description: 'User name' })
  @Column()
  name: string;

  @ApiProperty({ minLength: 10, description: 'Phone number' })
  @Column()
  phone: string;

  @ApiProperty()
  @Column({ unique: true })
  email: string;

  @ApiProperty({ required: false })
  @Column({ nullable: true })
  address?: string;
}
