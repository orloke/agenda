import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePersonDto } from 'src/modules/person/dto/create-person.dto';
import { UpdatePersonDto } from 'src/modules/person/dto/update-person.dto';
import { Person } from 'src/modules/person/entities/person.entity';
import { FindManyOptions } from 'typeorm';
import { FiltersDto } from './dto/filter.dto';
import { IPersonRepository } from './interfaces/person-repository.interface';
import { IPersonService } from './interfaces/person-service.interface';

@Injectable()
export class PersonsService implements IPersonService {
  constructor(private readonly personRepository: IPersonRepository) {}

  public async findAll(
    filters?: FiltersDto,
  ): Promise<{
    data: Person[];
    pagination: {
      page: number;
      limit: number;
      totalItems: number;
      totalPages: number;
    };
  }> {
    const { page = 1, limit = 10 } = filters || { page: 1, limit: 10 };

    const findOptions: FindManyOptions<Person> = {
      where: {},
      skip: (page - 1) * limit,
      take: limit,
    };

    if (filters) {
      if (filters.email) {
        findOptions.where['email'] = filters.email;
      }
    }

    const [data, totalItems] =
      await this.personRepository.findAndCount(findOptions);

    const totalPages = Math.ceil(totalItems / limit);

    return {
      data,
      pagination: {
        page,
        limit,
        totalItems,
        totalPages,
      },
    };
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
