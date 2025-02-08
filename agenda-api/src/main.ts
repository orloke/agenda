import { Logger, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function bootstrap() {
  const port = process.env.PORT || 3000;
  const version = process.env.API_VERSION || "v1";

  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(`api/${version}`);

  const swaggerConfig = new DocumentBuilder()
    .setTitle("Agenda API")
    .setDescription("API to manage agenda")
    .setVersion(`${version}`)
    .setExternalDoc("Postman Collection", `/api/${version}/docs-json`)
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup(`api/${version}/docs`, app, document);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // only allow white listed params
    forbidNonWhitelisted: true, // not allow any other params
  }));

  await app.listen(port, async () => Logger.log(`Listening on port ${port}`));
}

bootstrap();
