import { PrismaService } from './prisma/prisma.service'
import { aulasCodigo } from '../../helpers/theoretical-classes'
import { generateRandomCode } from '../../helpers/generate-random-code'

const prisma = new PrismaService()

const formattedData = aulasCodigo.map((aula) => ({
  ...aula,
  code: generateRandomCode(4),
}))

async function seed() {
  Promise.all([prisma.class.createMany({ data: formattedData })])
}

seed()
