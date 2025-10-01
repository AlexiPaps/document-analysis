import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configure CORS for local and production frontend
  app.enableCors({
    origin: [
      'http://localhost:5173',
      'https://document-analysis-eta.vercel.app',
    ],
    methods: 'GET,POST,OPTIONS',
    allowedHeaders: 'Content-Type,Authorization',
    credentials: true,
  });

  await app.init(); // For Vercel serverless compatibility
}
bootstrap();