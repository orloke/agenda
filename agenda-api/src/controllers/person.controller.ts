import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { CreatePersonDto } from "src/dto/create-person.dto";
import { UpdatePersonDto } from "src/dto/update-person.dto";
import { Person } from "src/entities/person.entity";
import { PersonsService } from "src/services/person.service";

@Controller("persons")
export class PersonController {
  constructor(private readonly personService: PersonsService) {}

  @Get()
  async findAll(): Promise<Person[]> {
    return this.personService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: number): Promise<Person | null> {
    return this.personService.findOne(id);
  }

  @Post()
  async create(@Body() createPersonDto: CreatePersonDto): Promise<Person> {
    return this.personService.create(createPersonDto);
  }

  @Put(":id")
  async update(
    @Param("id") id: number,
    @Body() updatePersonDto: UpdatePersonDto,
  ): Promise<Person | null> {
    return this.personService.update(id, updatePersonDto);
  }

  @Delete(":id")
  async delete(@Param("id") id: number): Promise<void> {
    return this.personService.delete(id);
  }
}
