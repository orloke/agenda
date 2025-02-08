import { CreatePersonDto } from '../dto/create-person.dto';
import { FiltersDto } from '../dto/filter.dto';
import { UpdatePersonDto } from '../dto/update-person.dto';
import { Person } from '../entities/person.entity';

export abstract class IPersonService {
  abstract findAll(filters?: FiltersDto): Promise<{
    data: Person[];
    pagination: {
      page: number;
      limit: number;
      totalItems: number;
      totalPages: number;
    };
  }>;
  abstract findOne(id: number): Promise<Person | null>;
  abstract create(createPersonDto: CreatePersonDto): Promise<Person>;
  abstract update(
    id: number,
    updatePersonDto: UpdatePersonDto,
  ): Promise<Person>;
  abstract delete(id: number): Promise<{ message: string }>;
}
