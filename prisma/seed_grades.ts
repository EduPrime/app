import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const grades = await prisma.examGrade.createMany(
        {
            data: [
                {
                    enrollmentId: '185e6c69-494c-459f-9ce6-501abb4afa4d',
                    disciplineId: '665c6577-9cc7-44ad-a654-6cd6b099cf47',
                    stageId: 'fb53fbfd-27fc-4d32-9603-3596ce39257d',
                    schoolId: 'd488e90e-327b-4ca7-ad45-888c65d2a3ab',
                    grade: 4,
                    tenantId: self.crypto.randomUUID(),
                    createdAt: new Date('2010-01-17'),
                },
                {
                    enrollmentId: '70a553d2-91b4-4fdd-9002-761878513b6f',
                    disciplineId: '665c6577-9cc7-44ad-a654-6cd6b099cf47',
                    stageId: 'fb53fbfd-27fc-4d32-9603-3596ce39257d',
                    schoolId: 'd488e90e-327b-4ca7-ad45-888c65d2a3ab',
                    grade: 7,
                    tenantId: self.crypto.randomUUID(),
                    createdAt: new Date('2010-01-17'),
                },
                {
                    enrollmentId: '7bef062b-cf87-467e-96b3-cb7c31b89bf5',
                    disciplineId: 'a01f22f6-d792-48e8-9324-8baee795476b',
                    stageId: 'fb53fbfd-27fc-4d32-9603-3596ce39257d',
                    schoolId: 'd488e90e-327b-4ca7-ad45-888c65d2a3ab',
                    grade: 5,
                    tenantId: self.crypto.randomUUID(),
                    createdAt: new Date('2010-01-17'),
                },
            ],
        },
    )
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
