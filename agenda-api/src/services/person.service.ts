import { Injectable } from "@nestjs/common";
import { CreatePersonDto } from "src/dto/create-person.dto";
import { UpdatePersonDto } from "src/dto/update-person.dto";
import { Person } from "src/entities/person.entity";
import { PersonRepository } from "src/repositories/person.repository";

@Injectable()
export class PersonsService {
  constructor(private readonly personRepository: PersonRepository) {}

  async findAll(): Promise<Person[]> {
    return this.personRepository.findAll();
  }

  async findOne(id: number): Promise<Person | null> {
    return this.personRepository.findOne(id);
  }

  async create(createPersonDto: CreatePersonDto): Promise<Person> {
    return this.personRepository.create(createPersonDto);
  }

  async update(
    id: number,
    updatePersonDto: UpdatePersonDto,
  ): Promise<Person | null> {
    return this.personRepository.update(id, updatePersonDto);
  }

  async delete(id: number): Promise<void> {
    return this.personRepository.delete(id);
  }
}
