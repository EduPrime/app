import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const owner = await prisma.user.createMany({
        data: [
            {
                id: "612fbb5e-4744-4ed7-bbfb-ca4bd5b3e515",
                name: "Renan Andreolle",
                role: "PROFESSOR",
                tenantId: self.crypto.randomUUID(),
                email: "renan@professor.com",
                apiUserId: 'SOOqXc3gM3WtArkBtmqLN',
            },
            {
                id: "49eabcc1-5e6f-4ab7-a0a3-b9b5e08e1f65",
                name: "Yohan Sobrinho",
                role: "PROFESSOR",
                tenantId: self.crypto.randomUUID(),
                email: "yohan@professor.com",
                apiUserId: 'PtKTx4Bt8lKpnUnvAlhfK',
            },
            {
                id: "4479488a-4384-4e44-8b8d-d9876f50888d",
                name: "Andrei Gestor",
                role: "GESTORESCOLAR",
                tenantId: self.crypto.randomUUID(),
                email: "andrei@gestor.com",
                apiUserId: 'NdlLb4Bgu8AUqP-bO8oHR',
            },
            {
                id: 'd0805f36-c0c2-4478-842e-4f1c4c3602d9',
                name: 'Evilásio Mateus',
                email: 'user@back3nd.com',
                tenantId: self.crypto.randomUUID(),
                role: 'ADMIN',
                apiUserId: 'x8Tamaq9lFgVAw4H0SdoT'
            },
        ],
        skipDuplicates: true
    });

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
