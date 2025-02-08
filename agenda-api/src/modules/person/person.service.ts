import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePersonDto } from 'src/modules/person/dto/create-person.dto';
import { UpdatePersonDto } from 'src/modules/person/dto/update-person.dto';
import { Person } from 'src/modules/person/entities/person.entity';
import { FiltersDto } from './dto/filter.dto';
import { IPersonRepository } from './interfaces/person-repository.interface';
import { IPersonService } from './interfaces/person-service.interface';

@Injectable()
export class PersonsService implements IPersonService {
  constructor(private readonly personRepository: IPersonRepository) {}

  public async findAll(filters?: FiltersDto): Promise<Person[]> {
    return await this.personRepository.findAll({
      where: { email: filters?.email },
    });
  }

  public async findOne(id: number): Promise<Person> {
    const person = await this.personRepository
      .findOne({ where: { id } })
      .catch((err) => {
        throw new BadRequestException(err.message);
      });
    if (!person) {
      throw new NotFoundException('Person not found');
    }
    return person;
  }

  public async create(createPersonDto: CreatePersonDto): Promise<Person> {
    const person = await this.personRepository.findOne({
      where: { email: createPersonDto.email },
    });

    if (person) {
      throw new ConflictException('Email already exists');
    }

    return await this.personRepository.create(createPersonDto);
  }

  public async update(
    id: number,
    updatePersonDto: UpdatePersonDto,
  ): Promise<Person> {
    const personUpdate = await this.personRepository.update(
      id,
      updatePersonDto,
    );
    return personUpdate;
  }

  public async delete(id: number): Promise<{ message: string }> {
    const person = await this.personRepository.findOne({ where: { id } });
    if (!person) {
      throw new NotFoundException('Person not found');
    }
    await this.personRepository.delete(id);
    return { message: 'Person deleted' };
  }
}
