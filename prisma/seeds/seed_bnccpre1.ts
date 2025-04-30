import process from 'node:process'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.bncc.createMany({
    data: [
      {
        id: globalThis.crypto.randomUUID(),
        code: 'EI03EO01PE',
        objective: `Demonstrar empatia pelos outros, 
                    percebendo que as pessoas têm diferentes sentimentos, 
                    necessidades e maneiras de pensar, agir, falar e ser, 
                    respeitando as diferenças sociais, religiosas, étnico- raciais, 
                    culturais e de gênero.`,
        knowledgeArea: 'Eu, O Outro e o nós',
        themathicUnit: 'Eu e o outro',
        courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e97',
        disciplineId: '6b0cb88e-80a1-4185-a0b4-b625bb26b5fc',
        seriesId: 'c0a2b8c4-3d1e-4c5b-8f6c-6e1b3b5f0d6f',
      },
    ],
    skipDuplicates: true,
  })

  // console.log('Seed data created successfully!', _bnccs);
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
