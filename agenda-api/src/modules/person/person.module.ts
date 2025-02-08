import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from 'src/modules/person/entities/person.entity';
import { PersonController } from 'src/modules/person/person.controller';
import { PersonsService } from 'src/modules/person/person.service';
import { IPersonRepository } from './interfaces/person-repository.interface';
import { IPersonService } from './interfaces/person-service.interface';
import { PersonRepository } from './person.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Person])],
  controllers: [PersonController],
  providers: [
    {
      provide: IPersonService,
      useClass: PersonsService,
    },
    {
      provide: IPersonRepository,
      useClass: PersonRepository,
    },
  ],
})
export class PersonModule {}
