import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const bnccs = await prisma.bncc.createMany({
        data: [
            {@todo#####################
                id: '5fa081dd-f43b-4631-81f1-2a8047f7fac1',
            code: 'EF07EE01PE',
            objective: 'Desenvolver habilidades de empreendedorismo e educação financeira, promovendo a autonomia e a gestão responsável de recursos.',
            themathicUnit: 'Empreendedorismo e Educação Financeira',
            knowledgeArea: 'Área de Ciências Humanas',
            languagePractice: 'Prática interdisciplinar',
            fieldsOfAction: 'Campo social e econômico',
            knowledgeObjects: 'Planejamento financeiro e empreendedorismo',
            courseId: '0e2833bf-6ef1-4bb0-b83a-b036fc04cac6', // ensino fundamental II
            disciplineId: '1e222b35-25da-430e-8bbf-03218baccbd7', // Empreendedorismo e Educação Financeira
            seriesId: 'b1ce4726-de53-47ed-8c6e-34eaa1e39747', // 7º Ano
            userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
            tenantId: self.crypto.randomUUID(),
            },
        {
            id: '317d070d-9d13-4c2f-bb28-e2b12356f64e',
            code: 'EF07RL01PE',
            objective: 'Desenvolver o raciocínio lógico por meio de desafios e problemas matemáticos, promovendo a resolução criativa e analítica.',
            themathicUnit: 'Raciocínio Lógico',
            knowledgeArea: 'Área de Matemática',
            languagePractice: 'Resolução de problemas',
            fieldsOfAction: 'Campo lógico-matemático',
            knowledgeObjects: 'Estratégias de resolução de problemas',
            courseId: '0e2833bf-6ef1-4bb0-b83a-b036fc04cac6', // ensino fundamental II
            disciplineId: '2efd92b6-51fd-4f88-b036-0517ae40ee01', // Raciocínio Lógico
            seriesId: 'b1ce4726-de53-47ed-8c6e-34eaa1e39747', // 7º Ano
            userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
            tenantId: self.crypto.randomUUID(),
        },
        ],
    skipDuplicates: true
});

console.log('Seed data created successfully!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
