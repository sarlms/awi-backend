import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 5000;

  // Activer CORS avec des configurations spécifiques
  app.enableCors({
    origin: [
      'http://localhost:4200',  // Development Angular app
      'https://ahoui-front.cluster-ig4.igpolytech.fr' // Deployed frontend
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Allow cookies and auth headers
  });

  await app.listen(PORT);
  console.log(`Server is running on http://localhost:${PORT}`);
}
bootstrap();
