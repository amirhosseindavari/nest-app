import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // swagger config
  const config = new DocumentBuilder()
    .setTitle('Nest Js Application')
    .setDescription('This is my first nest application')
    .addBearerAuth()
    .setVersion('2.0.0')
    .build();

  const document = SwaggerModule.createDocument(app,config);

  SwaggerModule.setup('api/docs' , app , document);

  await app.listen(process.env.PORT ?? 3000);

  // api_key
}
bootstrap();
