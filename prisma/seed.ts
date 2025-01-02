import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const owner = await prisma.user.create({
        data: {
            name: 'Evilásio Mateus',
            email: 'user@back3nd.com',
            tenantId: self.crypto.randomUUID(),
            role: 'owner',
        },
    })

    const institution = await prisma.institution.create({
        data: {
            name: 'Prefeitura Municipal de Araripina',
            phone: '87981331477',
            email: ''
        }
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