import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const teacher = await prisma.teacher.createMany({
        data: [
            {
                id: '45973489-ab5c-4d36-b5c0-842dff919a65', // teacher Yohan random uuid
                name: 'Yohan Professor',
                email: 'yohan@professor.com',
                phone: '87981323477',
                schoolId: 'd488e90e-327b-4ca7-ad45-888c65d2a3ab', // Escola Municipal de Araripina
                userId: '49eabcc1-5e6f-4ab7-a0a3-b9b5e08e1f65', // User Yohan
                tenantId: self.crypto.randomUUID(),
                birthdate: new Date('1989-04-11'),
            },
            {
                id: 'c77179b7-86b3-42ec-b125-9ccf7f35904c', // teacher Renan random uuid
                name: 'Renan Professor',
                email: 'renan@professor.com',
                phone: '9197825277',
                schoolId: 'd488e90e-327b-4ca7-ad45-888c65d2a3ab', // Escola Municipal de Araripina
                userId: '612fbb5e-4744-4ed7-bbfb-ca4bd5b3e515', // User Renan
                tenantId: self.crypto.randomUUID(),
                birthdate: new Date('1991-04-11'),
            },
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