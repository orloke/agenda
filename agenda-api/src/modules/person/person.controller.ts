import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreatePersonDto } from 'src/modules/person/dto/create-person.dto';
import { UpdatePersonDto } from 'src/modules/person/dto/update-person.dto';
import { Person } from 'src/modules/person/entities/person.entity';
import { FiltersDto } from './dto/filter.dto';
import { IPersonService } from './interfaces/person-service.interface';

@ApiTags('Persons')
@Controller('persons')
export class PersonController {
  constructor(private readonly personService: IPersonService) {}

  @Get()
  @ApiOperation({ summary: 'Find all persons' })
  @ApiOkResponse({ type: [Person] })
  async findAll(@Query() filters?: FiltersDto): Promise<{
    data: Person[];
    pagination: {
      page: number;
      limit: number;
      totalItems: number;
      totalPages: number;
    };
  }> {
    return this.personService.findAll(filters);
  }

  @ApiOperation({ summary: 'Find one person' })
  @ApiOkResponse({ type: Person })
  @ApiNotFoundResponse({ description: 'Person not found' })
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Person | null> {
    return this.personService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new person' })
  @ApiCreatedResponse({ type: Person })
  @ApiConflictResponse({ description: 'Email already exists' })
  async create(@Body() createPersonDto: CreatePersonDto) {
    return this.personService.create(createPersonDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a person' })
  @ApiOkResponse({ type: Person })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePersonDto: UpdatePersonDto,
  ): Promise<Person | null> {
    return this.personService.update(id, updatePersonDto);
  }

  @Delete(':id')
  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: { message: { type: 'string', example: 'Person deleted' } },
    },
  })
  @ApiConflictResponse({ description: 'Person not found' })
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.personService.delete(id);
  }
}
