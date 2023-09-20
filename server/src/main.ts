import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'

import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe())

  app.enableCors({
    origin: [
      'http://localhost:3000',
      'https://app-tecnica-rodrigo001.vercel.app',
      'https://app-tecnica-kfjrsf1rm-rodrigo001.vercel.app',
    ],
    methods: ['POST', 'PUT', 'DELETE', 'GET'],
  })

  await app.listen(3333)
}
bootstrap()
