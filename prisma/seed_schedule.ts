import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const schedule = await prisma.schedule.createMany(
        {
            data: [
                {
                    weekday: 'WEDNESDAY',
                    start: new Date("2010-01-17T08:00:00.000Z"),
                    end: new Date("2010-01-17T09:00:00.000Z"),
                    classroomId: '0c086508-d50b-49b6-afce-0c146643129d',
                    teacherId: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
                    schoolId: 'd488e90e-327b-4ca7-ad45-888c65d2a3ab',
                    disciplineId: '665c6577-9cc7-44ad-a654-6cd6b099cf47',
                    tenantId: self.crypto.randomUUID(),
                    createdAt: new Date('2010-01-17')
                },
                {
                    weekday: 'WEDNESDAY',
                    start: new Date("2010-01-17T09:00:00.000Z"),
                    end: new Date("2010-01-17T10:00:00.000Z"),
                    classroomId: '0c086508-d50b-49b6-afce-0c146643129d',
                    teacherId: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
                    schoolId: 'd488e90e-327b-4ca7-ad45-888c65d2a3ab',
                    disciplineId: 'a01f22f6-d792-48e8-9324-8baee795476b',
                    tenantId: self.crypto.randomUUID(),
                    createdAt: new Date('2010-01-18')
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