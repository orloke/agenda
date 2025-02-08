import { DeleteResult, FindManyOptions, FindOneOptions } from "typeorm";
import { Person } from "../entities/person.entity";
import { CreatePersonDto } from "../dto/create-person.dto";
import { UpdatePersonDto } from "../dto/update-person.dto";

export abstract class IPersonRepository {
  abstract findAll(where?: FindManyOptions<Person>): Promise<Person[]>;
  abstract findOne(where: FindOneOptions<Person>): Promise<Person | null>;
  abstract create(personData: CreatePersonDto): Promise<Person>;
  abstract update(id: number, personData: UpdatePersonDto): Promise<Person | null>;
  abstract delete(id: number): Promise<DeleteResult>;
}
