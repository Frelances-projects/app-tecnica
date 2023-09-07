import { randomUUID } from 'node:crypto'

import { PrismaService } from './prisma/prisma.service'
import { aulasCodigo } from '../../helpers/theoretical-classes'
import { generateRandomCode } from '../../helpers/generate-random-code'

const prisma = new PrismaService()

const formattedData = aulasCodigo.map((aula) => ({
  ...aula,
  code: generateRandomCode(4),
}))

async function seed() {
  Promise.all([
    prisma.class.createMany({ data: formattedData }),
    prisma.school.createMany({
      data: [
        { id: randomUUID(), name: 'Rio Maior' },
        { id: randomUUID(), name: 'Almeirim' },
        { id: randomUUID(), name: 'Caldas' },
      ],
    }),
  ])
}

seed()
