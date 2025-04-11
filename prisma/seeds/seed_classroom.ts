import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const classroom = await prisma.classroom.createMany({
        data: [
            {
                id: '0c086508-d50b-49b6-afce-0c146643129d',
                maxStudents: 30,
                name: '1º Ano A',
                year: 2025,
                schoolId: 'd488e90e-327b-4ca7-ad45-888c65d2a3ab', // Escola Municipal de Araripina
                tenantId: self.crypto.randomUUID(),
                seriesId: '352a5857-193f-4672-9abf-c5302afd1c37', // 1º Ano
            },
            {
                id: '0c086508-d50b-49b6-afce-0c146643131d',
                maxStudents: 30,
                name: '9º Ano A',
                year: 2025,
                schoolId: 'd488e90e-327b-4ca7-ad45-888c65d2a3ab', // Escola Municipal de Araripina
                tenantId: self.crypto.randomUUID(),
                seriesId: 'ea01d929-3479-4dc6-b162-6ed6a5c66a26', // 9º Ano
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