import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const schedule = await prisma.stage.createMany(
        {
            data: [
                {
                    numberStage: 1,
                    startDate: new Date("2025-01-01T08:00:00.000Z"),
                    endDate: new Date("2025-02-28T09:00:00.000Z"),
                    institutionId: 'bd14f407-3758-4656-a299-e4cf3859dd29',
                    tenantId: self.crypto.randomUUID(),
                    createdAt: new Date('2010-01-17')
                },
                {
                    numberStage: 2,
                    startDate: new Date("2025-03-01T08:00:00.000Z"),
                    endDate: new Date("2025-04-30T09:00:00.000Z"),
                    institutionId: 'bd14f407-3758-4656-a299-e4cf3859dd29',
                    tenantId: self.crypto.randomUUID(),
                    createdAt: new Date('2010-01-17')
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