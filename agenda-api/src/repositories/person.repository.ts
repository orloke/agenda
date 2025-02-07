import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreatePersonDto } from "src/dto/create-person.dto";
import { UpdatePersonDto } from "src/dto/update-person.dto";
import { Person } from "src/entities/person.entity";
import { Repository } from "typeorm";

@Injectable()
export class PersonRepository {
  constructor(
    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>,
  ) {}

  async findAll(): Promise<Person[]> {
    return this.personRepository.find();
  }

  async findOne(id: number): Promise<Person | null> {
    return this.personRepository.findOne({ where: { id } });
  }

  async create(personData: CreatePersonDto): Promise<Person> {
    const person = this.personRepository.create(personData);
    return this.personRepository.save(person);
  }

  async update(
    id: number,
    personData: UpdatePersonDto,
  ): Promise<Person | null> {
    await this.personRepository.update(id, personData);
    return this.personRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    await this.personRepository.delete(id);
  }
}
