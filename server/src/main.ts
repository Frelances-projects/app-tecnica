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
      'https://students-platform-mu.vercel.app',
      'https://students-platform-53j6s246g-filipesilvestre0-gmailcom.vercel.app',
      'https://backoffice-app-tecnica.vercel.app',
      'https://backoffice-app-tecnica-rgqa8nfnq-filipesilvestre0-gmailcom.vercel.app',
    ],
    methods: ['POST', 'PUT', 'DELETE', 'GET', 'PATCH'],
  })

  await app.listen(3333)
}
bootstrap()
