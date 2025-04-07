import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const preEnrollment = await prisma.preEnrollment.createMany({
        data: [
            {
                studentId: '03f22c85-729a-4916-a500-992616003bc1', // João da Silva
                institutionId: 'bd14f407-3758-4656-a299-e4cf3859dd29', // Prefeitura Municipal de Araripina
                schoolId: 'd488e90e-327b-4ca7-ad45-888c65d2a3ab', // Escola Municipal de Araripina
                courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // Ensino Fundamental I
                seriesId: '352a5857-193f-4672-9abf-c5302afd1c37', // 1º Ano
                preferShift: 'MORNING',
                datePreenrollment: new Date()
            },
            {
                studentId: '9554f5f2-5b05-4043-ac2b-a19aa5a7f370', // Maria josé dos anjos
                institutionId: 'bd14f407-3758-4656-a299-e4cf3859dd29', // Prefeitura Municipal de Araripina
                schoolId: 'd488e90e-327b-4ca7-ad45-888c65d2a3ab', // Escola Municipal de Araripina
                courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // Ensino Fundamental I
                seriesId: '352a5857-193f-4672-9abf-c5302afd1c37', // 1º Ano
                preferShift: 'AFTERNOON',
                datePreenrollment: new Date()
            },
            {
                studentId: 'd12be810-c062-4384-8278-f72a170f1b6e', // marcos antonio de jesus
                institutionId: 'bd14f407-3758-4656-a299-e4cf3859dd29', // Prefeitura Municipal de Araripina
                schoolId: 'd488e90e-327b-4ca7-ad45-888c65d2a3ab', // Escola Municipal de Araripina
                courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // Ensino Fundamental I
                seriesId: 'a1eed49f-2832-467f-ae6f-7270244971ba', // 2º Ano
                preferShift: 'MORNING',
                datePreenrollment: new Date()
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