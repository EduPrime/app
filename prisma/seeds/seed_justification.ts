import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const justification = await prisma.justification.createMany({
    data: [
      {
        id: '1e222b35-25da-430e-8bbf-03218baccbd7',
        name: 'Doença',
        tenantId: self.crypto.randomUUID(),
      },
      {
        id: '2efd92b6-51fd-4f88-b036-0517ae40ee01',
        name: 'Falta de Transporte',
        tenantId: self.crypto.randomUUID(),
      },
      {
        id: '3e90c314-51bb-4482-af68-99bc04371281',
        name: 'Emergência familiar',
        tenantId: self.crypto.randomUUID(),
      },
      {
        id: '4ca48f5c-2987-4cab-9420-614d64d4d489',
        name: 'Compromisso médico',
        tenantId: self.crypto.randomUUID(),
      },
      {
        id: '53ca155c-a3da-43c4-b280-4724a065471a',
        name: 'Eventos educacionais',
        tenantId: self.crypto.randomUUID(),
      },
      {
        id: '59f326bf-7a1f-4b66-9049-b7df572f901b',
        name: 'Circunstâncias excepcionais',
        tenantId: self.crypto.randomUUID(),
      },
      {
        id: '5e34bc6d-37ce-49cd-905f-d0c002f42a96',
        name: 'Falecimento familiar',
        tenantId: self.crypto.randomUUID(),
      },
      {
        id: '6862a800-92c3-4d46-8740-62a02a5e5cf9',
        name: 'Procedimento médico',
        tenantId: self.crypto.randomUUID(),
      },
      {
        id: '6988e9d0-6b6b-44fe-adbe-7af90a8a0e27',
        name: 'Mudança de residência',
        tenantId: self.crypto.randomUUID(),
      },
      {
        id: '788cbb82-b429-4508-bd99-c25b33fd1d3c',
        name: 'Desastre natural',
        tenantId: self.crypto.randomUUID(),
      },
      {
        id: '91fa3596-4de7-4a06-8aba-5465b81f8077',
        name: 'Transfêrencia de escola',
        tenantId: self.crypto.randomUUID(),
      },
      {
        id: '9747133a-8225-4eaf-9a88-40ca56f94698',
        name: 'Ausência de cuidador no Transporte Escolar',
        tenantId: self.crypto.randomUUID(),
      },
    ],
    skipDuplicates: true,
  })

  console.log('Seed data created successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
