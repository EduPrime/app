import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const servers = await prisma.servers.createMany({
        data: [
            {
                id: 'ce635582-9306-4dbe-8c47-1594b3bde0f4',
                name: 'Andrei Gestor',
                schoolId: 'd488e90e-327b-4ca7-ad45-888c65d2a3ab',
                cpf: '12345678987',
                position: 'Gestor Escolar',
                institutionId: 'bd14f407-3758-4656-a299-e4cf3859dd29',
                codServidor: 123456,
                userId: '4479488a-4384-4e44-8b8d-d9876f50888d'
            }
        ],
        skipDuplicates: true
    })


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
