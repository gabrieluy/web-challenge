import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ErrorsInterceptor } from './common/errors/errors.interceptor';
import { ValidationPipe } from '@nestjs/common';
import { InvalidRecordError } from './common/errors/invalid-record.error';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (errors) => {
        return new InvalidRecordError(errors);
      },
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('Web challenge')
    .setDescription('The post API description')
    .setVersion('1.0')
    .addTag('posts')
    .build();

  app.useGlobalInterceptors(new ErrorsInterceptor());

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.SERVER_PORT || 3000);
}
bootstrap();
