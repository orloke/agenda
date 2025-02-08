import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { Person } from './entities/person.entity';
import { IPersonRepository } from './interfaces/person-repository.interface';

@Injectable()
export class PersonRepository implements IPersonRepository {
  constructor(
    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>,
  ) {}

  public async findAll(where?: FindManyOptions<Person>): Promise<Person[]> {
    return this.personRepository.find(where);
  }

  public async findOne(where: FindOneOptions<Person>): Promise<Person | null> {
    return this.personRepository.findOne(where);
  }

  public async create(personData: CreatePersonDto): Promise<Person> {
    const person = this.personRepository.create(personData);
    return this.personRepository.save(person);
  }

  public async update(
    id: number,
    personData: UpdatePersonDto,
  ): Promise<Person | null> {
    await this.personRepository.update(id, personData);
    return this.personRepository.findOne({ where: { id } });
  }

  public async delete(id: number): Promise<DeleteResult> {
    return await this.personRepository.delete(id);
  }
}
