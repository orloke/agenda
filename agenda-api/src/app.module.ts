import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PersonController } from "./controllers/person.controller";
import { Person } from "./entities/person.entity";
import { PersonRepository } from "./repositories/person.repository";
import { PersonsService } from "./services/person.service";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT!,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [Person],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Person]),
  ],
  controllers: [PersonController],
  providers: [PersonsService, PersonRepository],
})
export class AppModule {}
