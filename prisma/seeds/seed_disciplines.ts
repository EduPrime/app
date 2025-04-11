import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const discipline = await prisma.discipline.createMany({
    data: [
      {
        id: '1e222b35-25da-430e-8bbf-03218baccbd7',
        name: 'Empreendedorismo e Educação Financeira',
        tenantId: self.crypto.randomUUID(),
      },
      {
        id: '2efd92b6-51fd-4f88-b036-0517ae40ee01',
        name: 'Raciocínio Lógico',
        tenantId: self.crypto.randomUUID(),
      },
      {
        id: '3e90c314-51bb-4482-af68-99bc04371281',
        name: 'Iniciação Científica',
        tenantId: self.crypto.randomUUID(),
      },
      {
        id: '4ca48f5c-2987-4cab-9420-614d64d4d489',
        name: 'Matemática',
        tenantId: self.crypto.randomUUID(),
      },
      {
        id: '53ca155c-a3da-43c4-b280-4724a065471a',
        name: 'Língua Espanhola',
        tenantId: self.crypto.randomUUID(),
      },
      {
        id: '59f326bf-7a1f-4b66-9049-b7df572f901b',
        name: 'História',
        tenantId: self.crypto.randomUUID(),
      },
      {
        id: '5e34bc6d-37ce-49cd-905f-d0c002f42a96',
        name: 'Ciências',
        tenantId: self.crypto.randomUUID(),
      },
      {
        id: '6862a800-92c3-4d46-8740-62a02a5e5cf9',
        name: 'Língua Portuguesa',
        tenantId: self.crypto.randomUUID(),
      },
      {
        id: '6988e9d0-6b6b-44fe-adbe-7af90a8a0e27',
        name: 'Ensino Religioso',
        tenantId: self.crypto.randomUUID(),
      },
      {
        id: '788cbb82-b429-4508-bd99-c25b33fd1d3c',
        name: 'Direitos Humanos e Cidadania',
        tenantId: self.crypto.randomUUID(),
      },
      {
        id: '91fa3596-4de7-4a06-8aba-5465b81f8077',
        name: '	Projeto de Vida',
        tenantId: self.crypto.randomUUID(),
      },
      {
        id: '9747133a-8225-4eaf-9a88-40ca56f94698',
        name: 'Geografia',
        tenantId: self.crypto.randomUUID(),
      },
      {
        id: '9825f111-81f3-4f34-ab36-7a30387d0c14',
        name: 'Educação Física',
        tenantId: self.crypto.randomUUID(),
      },
      {
        id: '9a7b90a1-feff-4a47-8224-0ab8352e090a',
        name: 'Artes',
        tenantId: self.crypto.randomUUID(),
      },
      {
        id: 'c030869a-3b07-4f7d-b11d-69765af91f9a',
        name: 'Geometria',
        tenantId: self.crypto.randomUUID(),
      },
      {
        id: 'c7c08355-9bd8-405b-87c6-4b99b75ff1f9',
        name: 'Língua Inglesa',
        tenantId: self.crypto.randomUUID(),
      },
      {
        id: 'd90ce4c2-2b1a-4cb2-b339-263f37f7363a',
        name: '	Robótica',
        tenantId: self.crypto.randomUUID(),
      },
      {
        id: 'ed5a57b7-828f-4737-bc78-ca919f0f833c',
        name: 'Ciclo de Leitura e Produção Textual',
        tenantId: self.crypto.randomUUID(),
      },
      {
        id: '6b0cb88e-80a1-4185-a0b4-b625bb26b5fc',
        name: 'Geral',
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
