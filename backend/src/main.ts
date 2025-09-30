// backend/src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors({
    origin: ['http://localhost:5173', 'https://document-analysis-eta.vercel.app/'], // Allow frontend origin
    methods: 'GET,POST', // Allow GraphQL methods
    allowedHeaders: 'Content-Type, Authorization', // Allow necessary headers
  });

  await app.listen(3000);
}
bootstrap();