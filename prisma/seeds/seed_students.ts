import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const student = await prisma.student.createMany({
        data: [
            {
                id: '03f22c85-729a-4916-a500-992616003bc1', // João da Silva
                name: 'João da Silva',
                birthdate: new Date('2010-01-17'),
                gender: 'M',
                disability: ['SURDEZ'],
            },
            {
                id: '9554f5f2-5b05-4043-ac2b-a19aa5a7f370', // Maria josé dos anjos
                name: 'Maria josé dos anjos',
                birthdate: new Date('2014-10-10'),
                gender: 'F',
                disability: ['SURDEZ'],
            },
            {
                id: 'd12be810-c062-4384-8278-f72a170f1b6e', // marcos antonio de jesus
                name: 'marcos antonio de jesus',
                birthdate: new Date('2011-05-07'),
                gender: 'M',
                disability: ['SURDEZ'],
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