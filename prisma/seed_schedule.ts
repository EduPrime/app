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
                    teacherId: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan teacher
                    schoolId: 'd488e90e-327b-4ca7-ad45-888c65d2a3ab',
                    disciplineId: '6862a800-92c3-4d46-8740-62a02a5e5cf9', // portugues
                    tenantId: self.crypto.randomUUID(),
                    createdAt: new Date('2010-01-17')
                },
                {
                    weekday: 'WEDNESDAY',
                    start: new Date("2010-01-17T09:00:00.000Z"),
                    end: new Date("2010-01-17T10:00:00.000Z"),
                    classroomId: '0c086508-d50b-49b6-afce-0c146643129d', // 1 ano A
                    teacherId: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan teacher
                    schoolId: 'd488e90e-327b-4ca7-ad45-888c65d2a3ab',
                    disciplineId: '4ca48f5c-2987-4cab-9420-614d64d4d489', // matematica
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