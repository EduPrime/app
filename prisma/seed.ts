import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const owner = await prisma.user.createMany({
        data: [
            {
                id: 'd0805f36-c0c2-4478-842e-4f1c4c3602d9',
                name: 'Evilásio Mateus',
                email: 'user@back3nd.com',
                tenantId: self.crypto.randomUUID(),
                role: 'ADMIN',
                apiUserId: 'x8Tamaq9lFgVAw4H0SdoT'
            },
            {
                id: 'e02d11c0-e6f4-4525-a4dc-96113a0426b6',
                name: 'Paulo de paula',
                email: 'paulo@back3nd.com',
                tenantId: self.crypto.randomUUID(),
                role: 'PROFESSOR',
                apiUserId: 'x8Tamaq9lFgVAw4H0SdoT'
            }
        ],
        skipDuplicates: true
    })

    const institution = await prisma.institution.createMany({
        data: [
            {
                id: 'bd14f407-3758-4656-a299-e4cf3859dd29', // Prefeitura Municipal de Araripina
                name: 'Prefeitura Municipal de Araripina',
                phone: '87981331477',
                email: '',
                tenantId: self.crypto.randomUUID(),
            }
        ],
        skipDuplicates: true
    })

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

    const teacher = await prisma.teacher.createMany({
        data: [
            {
                id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', // teacher paulo random uuid
                name: 'Paulo de paula',
                email: 'paulo@back3nd.com',
                phone: '87981331477',
                schoolId: 'd488e90e-327b-4ca7-ad45-888c65d2a3ab', // Escola Municipal de Araripina
                tenantId: self.crypto.randomUUID(),
                birthdate: new Date('1980-04-11'),
            },
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
            }
        ],
        skipDuplicates: true
    })

    const series = await prisma.series.createMany({
        data: [
            {
                id: '352a5857-193f-4672-9abf-c5302afd1c37', // 1º Ano
                name: '1º Ano',
                schoolId: 'd488e90e-327b-4ca7-ad45-888c65d2a3ab', // Escola Municipal de Araripina // Escola Municipal de Araripina
                courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // Ensino Fundamental I
                institutionId: 'bd14f407-3758-4656-a299-e4cf3859dd29', // Prefeitura Municipal de Araripina // Prefeitura Municipal de Araripina
                tenantId: self.crypto.randomUUID(),
                courseStage: 'FUNDAMENTAL',
                graduate: 'fundamental',
                workload: 15.5,
                schoolDays: '2,3'
            },
            {
                id: 'a1eed49f-2832-467f-ae6f-7270244971ba', // 2º Ano
                name: '2º Ano',
                schoolId: 'd488e90e-327b-4ca7-ad45-888c65d2a3ab', // Escola Municipal de Araripina
                courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // Ensino Fundamental I
                institutionId: 'bd14f407-3758-4656-a299-e4cf3859dd29', // Prefeitura Municipal de Araripina
                tenantId: self.crypto.randomUUID(),
                courseStage: 'FUNDAMENTAL',
                graduate: 'fundamental',
                workload: 30,
                schoolDays: '2,3,4,5'
            }
        ],
        skipDuplicates: true
    })

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
            }
        ],
        skipDuplicates: true
    })

    const student = await prisma.student.createMany({
        data: [
            {
                id: '03f22c85-729a-4916-a500-992616003bc1', // João da Silva
                name: 'João da Silva',
                birthdate: new Date('2010-01-17'),
                gender: 'M',
                disability: 'SURDEZ',
            },
            {
                id: '9554f5f2-5b05-4043-ac2b-a19aa5a7f370', // Maria josé dos anjos
                name: 'Maria josé dos anjos',
                birthdate: new Date('2014-10-10'),
                gender: 'F',
                disability: 'SURDEZ',
            },
            {
                id: 'd12be810-c062-4384-8278-f72a170f1b6e', // marcos antonio de jesus
                name: 'marcos antonio de jesus',
                birthdate: new Date('2011-05-07'),
                gender: 'M',
                disability: 'SURDEZ',
            }
        ],
        skipDuplicates: true
    })

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
