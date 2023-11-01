import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api")

  const config = new DocumentBuilder()
    // заголовок
    .setTitle('next-pizza-backend')
    // описание
    .setDescription('pet project on next.js + nest.js')
    // версия
    .setVersion('0.01')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  // первый параметр - префикс пути, по которому будет доступна документация
  SwaggerModule.setup('swagger', app, document);


  await app.listen(process.env.PORT ? parseInt(process.env.PORT) : 3005);
}
bootstrap();
