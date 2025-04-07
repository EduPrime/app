import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const course = await prisma.course.createMany({
        data: [
            {
                id: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // Ensino Fundamental I
                name: 'Ensino Fundamental I',
                status: 'ACTIVE',
                schoolId: 'd488e90e-327b-4ca7-ad45-888c65d2a3ab', // Escola Municipal de Araripina
                institutionId: 'bd14f407-3758-4656-a299-e4cf3859dd29', // Prefeitura Municipal de Araripina
                tenantId: self.crypto.randomUUID(),
                courseStage: 1,
                graduate: 'fundamental',
                teachingType: 'Regular',
                courseModality: 'Manhã',
                workload: 800,
            },
            {
                id: '23ca0e75-5344-42c6-9640-97cc5bad6e97', // Maternal
                name: 'Maternal',
                status: 'ACTIVE',
                schoolId: 'd488e90e-327b-4ca7-ad45-888c65d2a3ab', // Escola Municipal de Araripina
                institutionId: 'bd14f407-3758-4656-a299-e4cf3859dd29', // Prefeitura Municipal de Araripina
                tenantId: self.crypto.randomUUID(),
                courseStage: 1,
                graduate: 'fundamental',
                teachingType: 'Regular',
                courseModality: 'Manhã',
                workload: 800,
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