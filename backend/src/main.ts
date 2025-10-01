import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      'http://localhost:5173',
      'https://document-analysis-eta.vercel.app',
    ],
    methods: 'GET,POST,OPTIONS',
    allowedHeaders: 'Content-Type,Authorization,X-CSRF-Token,X-Requested-With,Accept,Accept-Version,Content-Length,Content-MD5,Date,X-Api-Version',
    credentials: true,
  });

  // Use PORT from env or default to 3000
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Nest application running on port ${port}`);
}
bootstrap();