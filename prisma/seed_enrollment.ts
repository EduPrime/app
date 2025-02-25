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
                    classroomId: '0c086508-d50b-49b6-afce-0c146643128d',
                    name: 'marcos antonio de jesus',
                    schoolId: 'd488e90e-327b-4ca7-ad45-888c65d2a3ab',
                    courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94',
                    tenantId: self.crypto.randomUUID(),
                    dateEnrollment: new Date('2010-01-17'),
                    enrollmentCode: '1234f',
                    situation: 'CURSANDO',

                }
            ]
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