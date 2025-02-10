
// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = 5000;

  // Activer CORS avec des configurations spécifiques
  app.enableCors({
    origin: 'http://localhost:4200', // L'origine de votre application Angular
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.listen(PORT);
}
bootstrap();
