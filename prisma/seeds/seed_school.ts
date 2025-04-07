import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const school = await prisma.school.createMany({
        data: [
            {
                id: 'd488e90e-327b-4ca7-ad45-888c65d2a3ab', // Escola Municipal de Araripina
                name: 'Escola Municipal de Araripina',
                phone: '87981331477',
                institutionId: 'bd14f407-3758-4656-a299-e4cf3859dd29', // Prefeitura Municipal de Araripina
                tenantId: self.crypto.randomUUID(),
            }
        ],
        skipDuplicates: true
    })
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
