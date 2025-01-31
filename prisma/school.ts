import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function cleanData(data: any): any {
    if (typeof data === 'string') {
        return data.replace(/\x00/g, '');
    }
    return data;
}

async function migrateData() {
    try {
        // Consulta ao schema de origem
        const data = await prisma.juridica.findMany(
            {
                select: {
                    cnpj: true,
                    idpes: true,
                    fantasia: true
                },
                where: {
                    cnpj: null,
                }
            }
        );

        if (data.length === 0) {
            console.log("Nenhum dado encontrado para migração.");
            return;
        }

        const transformedData = data.map((item) => ({
            cnpj: cleanData(item.cnpj),
            idpes: cleanData(item.idpes),
            name: cleanData(item.fantasia),
            tenantId: self.crypto.randomUUID(),
            institutionId: cleanData("bd14f407-3758-4656-a299-e4cf3859dd29"),
        }));
        // console.log(transformedData);
        // Inserção no schema de destino
        await prisma.school.createMany(
            {
                data: transformedData,
            }
        );

        console.log("Migração concluída com sucesso!");
    } catch (error) {
        console.error("Erro durante a migração:", error);
    } finally {
        await prisma.$disconnect();
    }
}

migrateData();