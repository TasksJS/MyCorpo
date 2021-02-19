import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import configuration from './config/configuration';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  if (configuration().dev) {
    const config = new DocumentBuilder()
      .setTitle('MyCorpo')
      .setDescription('Never miss croissant')
      .addBearerAuth({
        type: 'http',
        description: 'Please give me token or u die u lil fuking corpo noob',
      })
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api-docs', app, document);
  }

  await app.listen(3333);
}
bootstrap();
