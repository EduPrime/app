import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const schedule = await prisma.enrollment.createMany(
        {
            data: [
                {
                    studentId: '03f22c85-729a-4916-a500-992616003bc1',
                    seriesId: '352a5857-193f-4672-9abf-c5302afd1c37',
                    classroomId: '0c086508-d50b-49b6-afce-0c146643129d',
                    name: 'João da Silva',
                    schoolId: 'd488e90e-327b-4ca7-ad45-888c65d2a3ab',
                    courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94',
                    tenantId: self.crypto.randomUUID(),
                    dateEnrollment: new Date('2010-01-17'),
                    enrollmentCode: '1234d',
                    situation: 'CURSANDO',
                },
                {
                    studentId: '9554f5f2-5b05-4043-ac2b-a19aa5a7f370',
                    seriesId: '352a5857-193f-4672-9abf-c5302afd1c37',
                    classroomId: '0c086508-d50b-49b6-afce-0c146643129d',
                    name: 'Maria josé dos anjos',
                    schoolId: 'd488e90e-327b-4ca7-ad45-888c65d2a3ab',
                    courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94',
                    tenantId: self.crypto.randomUUID(),
                    dateEnrollment: new Date('2010-01-17'),
                    enrollmentCode: '1234e',
                    situation: 'CURSANDO',
                },
                {
                    studentId: 'd12be810-c062-4384-8278-f72a170f1b6e',
                    seriesId: '352a5857-193f-4672-9abf-c5302afd1c37',
                    classroomId: '12ab8210-e080-491b-8f6c-45e240a8990e',
                    name: 'marcos antonio de jesus',
                    schoolId: 'd488e90e-327b-4ca7-ad45-888c65d2a3ab',
                    courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94',
                    tenantId: self.crypto.randomUUID(),
                    dateEnrollment: new Date('2010-01-17'),
                    enrollmentCode: '1234f',
                    situation: 'CURSANDO',
                },
                {
                    studentId: 'a8bd7728-3b46-4b6d-8071-25d8f40f95e2',
                    seriesId: '352a5857-193f-4672-9abf-c5302afd1c37',
                    classroomId: '0c086508-d50b-49b6-afce-0c146643129d', // 1º Ano A
                    name: 'Juci 2',
                    schoolId: 'd488e90e-327b-4ca7-ad45-888c65d2a3ab',
                    courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // Ensino Fundamental I
                    tenantId: self.crypto.randomUUID(),
                    dateEnrollment: new Date('2010-03-15'),
                    enrollmentCode: '1234g',
                    situation: 'CURSANDO',

                },
                {
                    studentId: '967c6a3b-62c5-41df-80d5-ffd02ba12567',
                    seriesId: '352a5857-193f-4672-9abf-c5302afd1c37',
                    classroomId: '0c086508-d50b-49b6-afce-0c146643129d', // 1º Ano A
                    name: 'Renatin 1',
                    schoolId: 'd488e90e-327b-4ca7-ad45-888c65d2a3ab',
                    courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // Ensino Fundamental I
                    tenantId: self.crypto.randomUUID(),
                    dateEnrollment: new Date('2010-03-15'),
                    enrollmentCode: '1234h',
                    situation: 'CURSANDO',

                },
                {
                    studentId: 'c0d10d24-1668-4b6d-8175-ae87df82b17d',
                    seriesId: '352a5857-193f-4672-9abf-c5302afd1c37',
                    classroomId: '0c086508-d50b-49b6-afce-0c146643129d', // 1º Ano A
                    name: 'Patricia',
                    schoolId: 'd488e90e-327b-4ca7-ad45-888c65d2a3ab',
                    courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // Ensino Fundamental I
                    tenantId: self.crypto.randomUUID(),
                    dateEnrollment: new Date('2010-03-15'),
                    enrollmentCode: '1234i',
                    situation: 'CURSANDO',

                },
                {
                    studentId: 'b71845b8-cc37-44ef-bc01-11db73cc1246',
                    seriesId: '352a5857-193f-4672-9abf-c5302afd1c37',
                    classroomId: '12ab8210-e080-491b-8f6c-45e240a8990e', // 1º Ano B
                    name: 'Bia',
                    schoolId: 'd488e90e-327b-4ca7-ad45-888c65d2a3ab',
                    courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // Ensino Fundamental I
                    tenantId: self.crypto.randomUUID(),
                    dateEnrollment: new Date('2010-03-15'),
                    enrollmentCode: '1234j',
                    situation: 'CURSANDO',
                },
                {
                    studentId: '0237e73d-5656-4db0-9153-cd801203988c',
                    seriesId: '352a5857-193f-4672-9abf-c5302afd1c37',
                    classroomId: '12ab8210-e080-491b-8f6c-45e240a8990e', // 1º Ano B
                    name: 'Fabio',
                    schoolId: 'd488e90e-327b-4ca7-ad45-888c65d2a3ab',
                    courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // Ensino Fundamental I
                    tenantId: self.crypto.randomUUID(),
                    dateEnrollment: new Date('2010-03-15'),
                    enrollmentCode: '1234k',
                    situation: 'CURSANDO',
                },
                {
                    studentId: '22cdcbea-bac9-4ded-a5f3-5d06af5e9a42',
                    seriesId: '352a5857-193f-4672-9abf-c5302afd1c37',
                    classroomId: '12ab8210-e080-491b-8f6c-45e240a8990e', // 1º Ano B
                    name: 'cadu',
                    schoolId: 'd488e90e-327b-4ca7-ad45-888c65d2a3ab',
                    courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // Ensino Fundamental I
                    tenantId: self.crypto.randomUUID(),
                    dateEnrollment: new Date('2010-03-15'),
                    enrollmentCode: '1234l',
                    situation: 'CURSANDO',
                },
                {
                    studentId: '73778e08-f017-400a-b0c4-3544c3a4dd00',
                    seriesId: '352a5857-193f-4672-9abf-c5302afd1c37',
                    classroomId: '12ab8210-e080-491b-8f6c-45e240a8990e', // 1º Ano B
                    name: 'maria',
                    schoolId: 'd488e90e-327b-4ca7-ad45-888c65d2a3ab',
                    courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // Ensino Fundamental I
                    tenantId: self.crypto.randomUUID(),
                    dateEnrollment: new Date('2010-03-15'),
                    enrollmentCode: '1234m',
                    situation: 'CURSANDO',
                },
            ],
            skipDuplicates: true,
        }
    )
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });