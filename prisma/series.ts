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
            }
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
            },
            {
                id: 'b4c7da20-b25a-46e2-8759-c9347554b09c', // Ensino Fundamental II
                name: 'Ensino Fundamental II',
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
            },
            {
                id: 'c459fbfb-c33e-4d02-bb30-2875f1904e39',
                name: '3º Ano',
                schoolId: 'd488e90e-327b-4ca7-ad45-888c65d2a3ab', // Escola Municipal de Araripina
                courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // Ensino Fundamental I
                institutionId: 'bd14f407-3758-4656-a299-e4cf3859dd29', // Prefeitura Municipal de Araripina
                tenantId: self.crypto.randomUUID(),
                courseStage: 'FUNDAMENTAL',
                graduate: 'fundamental',
                workload: 30,
                schoolDays: '2,3,4,5'
            },
            {
                id: 'd131b737-72ff-4c5c-9fd6-1dbd810b5cce',
                name: '4º Ano',
                schoolId: 'd488e90e-327b-4ca7-ad45-888c65d2a3ab', // Escola Municipal de Araripina
                courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // Ensino Fundamental I
                institutionId: 'bd14f407-3758-4656-a299-e4cf3859dd29', // Prefeitura Municipal de Araripina
                tenantId: self.crypto.randomUUID(),
                courseStage: 'FUNDAMENTAL',
                graduate: 'fundamental',
                workload: 30,
                schoolDays: '2,3,4,5'
            },
            {
                id: '4a909dc9-f78f-41d9-9451-87a2708bbf99',
                name: '5º Ano',
                schoolId: 'd488e90e-327b-4ca7-ad45-888c65d2a3ab', // Escola Municipal de Araripina
                courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // Ensino Fundamental I
                institutionId: 'bd14f407-3758-4656-a299-e4cf3859dd29', // Prefeitura Municipal de Araripina
                tenantId: self.crypto.randomUUID(),
                courseStage: 'FUNDAMENTAL',
                graduate: 'fundamental',
                workload: 30,
                schoolDays: '2,3,4,5'
            },
            {
                id: '19bcbcde-8016-4e7e-b0e4-bc3fcb73c53c',
                name: '6º Ano',
                schoolId: 'd488e90e-327b-4ca7-ad45-888c65d2a3ab', // Escola Municipal de Araripina
                courseId: 'b4c7da20-b25a-46e2-8759-c9347554b09c', // Ensino Fundamental II
                institutionId: 'bd14f407-3758-4656-a299-e4cf3859dd29', // Prefeitura Municipal de Araripina
                tenantId: self.crypto.randomUUID(),
                courseStage: 'FUNDAMENTAL',
                graduate: 'fundamental',
                workload: 30,
                schoolDays: '2,3,4,5'
            },
            {
                id: 'b1ce4726-de53-47ed-8c6e-34eaa1e39747',
                name: '7º Ano',
                schoolId: 'd488e90e-327b-4ca7-ad45-888c65d2a3ab', // Escola Municipal de Araripina
                courseId: 'b4c7da20-b25a-46e2-8759-c9347554b09c', // Ensino Fundamental II
                institutionId: 'bd14f407-3758-4656-a299-e4cf3859dd29', // Prefeitura Municipal de Araripina
                tenantId: self.crypto.randomUUID(),
                courseStage: 'FUNDAMENTAL',
                graduate: 'fundamental',
                workload: 30,
                schoolDays: '2,3,4,5'
            },
            {
                id: 'd6c891d2-f5c7-4088-8a90-1fd4ef9b9e95',
                name: '8º Ano',
                schoolId: 'd488e90e-327b-4ca7-ad45-888c65d2a3ab', // Escola Municipal de Araripina
                courseId: 'b4c7da20-b25a-46e2-8759-c9347554b09c', // Ensino Fundamental II
                institutionId: 'bd14f407-3758-4656-a299-e4cf3859dd29', // Prefeitura Municipal de Araripina
                tenantId: self.crypto.randomUUID(),
                courseStage: 'FUNDAMENTAL',
                graduate: 'fundamental',
                workload: 30,
                schoolDays: '2,3,4,5'
            },
            {
                id: 'ea01d929-3479-4dc6-b162-6ed6a5c66a26',
                name: '9º Ano',
                schoolId: 'd488e90e-327b-4ca7-ad45-888c65d2a3ab', // Escola Municipal de Araripina
                courseId: 'b4c7da20-b25a-46e2-8759-c9347554b09c', // Ensino Fundamental II
                institutionId: 'bd14f407-3758-4656-a299-e4cf3859dd29', // Prefeitura Municipal de Araripina
                tenantId: self.crypto.randomUUID(),
                courseStage: 'FUNDAMENTAL',
                graduate: 'fundamental',
                workload: 30,
                schoolDays: '2,3,4,5'
            },

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
            },
            {
                id: '8d298d20-d90e-4b1b-95f2-49e0ea24577c',
                maxStudents: 30,
                name: '2º Ano B',
                year: 2025,
                schoolId: 'd488e90e-327b-4ca7-ad45-888c65d2a3ab', // Escola Municipal de Araripina
                tenantId: self.crypto.randomUUID(),
                seriesId: 'a1eed49f-2832-467f-ae6f-7270244971ba', // 2º Ano
                period: 'AFTERNOON'
            },
            {
                id: 'cd4ab029-71fa-43d7-b0f6-7717b50e502f',
                maxStudents: 30,
                name: '3º Ano A',
                year: 2025,
                schoolId: 'd488e90e-327b-4ca7-ad45-888c65d2a3ab', // Escola Municipal de Araripina
                tenantId: self.crypto.randomUUID(),
                seriesId: 'c459fbfb-c33e-4d02-bb30-2875f1904e39', // 3º Ano
            }, {
                id: 'd16010a5-3d47-4e1a-aa2b-badd0ac88ab7',
                maxStudents: 30,
                name: '3º Ano B',
                year: 2025,
                schoolId: 'd488e90e-327b-4ca7-ad45-888c65d2a3ab', // Escola Municipal de Araripina
                tenantId: self.crypto.randomUUID(),
                seriesId: 'c459fbfb-c33e-4d02-bb30-2875f1904e39', // 3º Ano
            }, {
                id: '6e950ac6-c705-4202-b4a2-7d78d9121a7e',
                maxStudents: 30,
                name: '4º Ano B',
                year: 2025,
                schoolId: 'd488e90e-327b-4ca7-ad45-888c65d2a3ab', // Escola Municipal de Araripina
                tenantId: self.crypto.randomUUID(),
                seriesId: 'd131b737-72ff-4c5c-9fd6-1dbd810b5cce', // 4º Ano
            }, {
                id: '7d7f8967-f875-4be2-aad6-e60a50208bd1',
                maxStudents: 30,
                name: '5º Ano A',
                year: 2025,
                schoolId: 'd488e90e-327b-4ca7-ad45-888c65d2a3ab', // Escola Municipal de Araripina
                tenantId: self.crypto.randomUUID(),
                seriesId: '4a909dc9-f78f-41d9-9451-87a2708bbf99', // 5º Ano
                period: 'AFTERNOON'
            }, {
                id: 'db894c39-8f6d-40b1-becb-a0ed11082758',
                maxStudents: 30,
                name: '5º Ano B',
                year: 2025,
                schoolId: 'd488e90e-327b-4ca7-ad45-888c65d2a3ab', // Escola Municipal de Araripina
                tenantId: self.crypto.randomUUID(),
                seriesId: '4a909dc9-f78f-41d9-9451-87a2708bbf99', // 5º Ano
                period: 'EVENING'
            },
            {
                id: '14a00ce3-2126-40fb-a8f0-00b2f20530e1',
                maxStudents: 30,
                name: '7º Ano B',
                year: 2025,
                schoolId: 'd488e90e-327b-4ca7-ad45-888c65d2a3ab', // Escola Municipal de Araripina
                tenantId: self.crypto.randomUUID(),
                seriesId: 'b1ce4726-de53-47ed-8c6e-34eaa1e39747', // 7º Ano
                period: 'AFTERNOON'
            },
            {
                id: '062ecc22-f1d2-4beb-ad9a-6fc588a92db3',
                maxStudents: 30,
                name: '8º Ano A',
                year: 2025,
                schoolId: 'd488e90e-327b-4ca7-ad45-888c65d2a3ab', // Escola Municipal de Araripina
                tenantId: self.crypto.randomUUID(),
                seriesId: 'd6c891d2-f5c7-4088-8a90-1fd4ef9b9e95', // 8º Ano
                period: 'EVENING'
            },
            {
                id: '9729f39a-e7fc-400f-8221-c0d2f710ec59',
                maxStudents: 30,
                name: '8º Ano B',
                year: 2025,
                schoolId: 'd488e90e-327b-4ca7-ad45-888c65d2a3ab', // Escola Municipal de Araripina
                tenantId: self.crypto.randomUUID(),
                seriesId: 'd6c891d2-f5c7-4088-8a90-1fd4ef9b9e95', // 8º Ano
                period: 'AFTERNOON'
            },
            {
                id: '03a0d0d6-b3aa-4937-8940-4952d45d8901',
                maxStudents: 30,
                name: '9º Ano B',
                year: 2025,
                schoolId: 'd488e90e-327b-4ca7-ad45-888c65d2a3ab', // Escola Municipal de Araripina
                tenantId: self.crypto.randomUUID(),
                seriesId: 'ea01d929-3479-4dc6-b162-6ed6a5c66a26', // 9º Ano
                period: 'EVENING'
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
