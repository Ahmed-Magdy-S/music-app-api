import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as path from "path"

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useStaticAssets(path.join(__dirname, "..", "upload"))

 
  //Swagger
  const config = new DocumentBuilder()
    .setTitle('Music App APIs')
    .setDescription('Backend API for a Music-land application, which is a music mangement system web app')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v1/documentation', app, document,{customSiteTitle:"Documentation | Music App API"});
  //Swagger
  await app.listen(3000);
}
bootstrap();
