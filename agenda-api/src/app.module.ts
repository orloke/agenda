import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import dataSource from "./database/data-source"; // Importa a configuração do banco
import { PersonModule } from "./modules/person/person.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
    TypeOrmModule.forRoot(dataSource.options),
    PersonModule,
  ],
})
export class AppModule {}
