import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const owner = await prisma.user.createMany({
        data: [
            // {
            //     id: "2ff6dd60-a29c-4f11-86cb-a8d505cad813",
            //     name: "Matheus Zanela",
            //     role: "ADMIN",
            //     tenantId: self.crypto.randomUUID(),
            //     email: "matheusdeveloper001@gmail.com",
            //     apiUserId: 'x8Tamaq9lFgVAw4H0SdoT',
            // },
            // {
            //     id: "43bce152-348b-4105-bd3d-182c03582925",
            //     name: "Jefferson Gonçalves",
            //     role: "ADMIN",
            //     tenantId: self.crypto.randomUUID(),
            //     email: "jefferson_jipa14@hotmail.com",
            //     apiUserId: 'x8Tamaq9lFgVAw4H0SdoT',
            // },
            // {
            //     id: "4ab06fc9-335c-489f-8fc6-ebe2c70204ac",
            //     name: "Albérico Andrade",
            //     role: "ADMIN",
            //     tenantId: self.crypto.randomUUID(),
            //     email: "andrade.benhur@softagon.com.br",
            //     apiUserId: 'x8Tamaq9lFgVAw4H0SdoT',
            // },
            // {
            //     id: "54dbf779-07c1-43e7-9ff1-fdab21594a58",
            //     name: "Alan Cleveston",
            //     role: "ADMIN",
            //     tenantId: self.crypto.randomUUID(),
            //     email: "alan.cleveston@softagon.com.br",
            //     apiUserId: 'x8Tamaq9lFgVAw4H0SdoT',
            // },
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
            // {
            //     id: "6b040124-5097-4088-b5b1-907c10f50a1d",
            //     name: "Sauany Alves",
            //     role: "ADMIN",
            //     tenantId: self.crypto.randomUUID(),
            //     email: "sauany.alves@softagon.com.br",
            //     apiUserId: 'x8Tamaq9lFgVAw4H0SdoT',
            // },
            // {
            //     id: "a6a9185c-ac5a-4e91-a9a3-1962cd4fa2fc",
            //     name: "Victor Pessoa",
            //     role: "ADMIN",
            //     tenantId: self.crypto.randomUUID(),
            //     email: "victor.pessoa@softagon.com.br",
            //     apiUserId: 'x8Tamaq9lFgVAw4H0SdoT',
            // },
            // {
            //     id: "b3aa9ded-11be-4d67-8144-bbb77e956dd4",
            //     name: "Mariana Ferraz",
            //     role: "ADMIN",
            //     tenantId: self.crypto.randomUUID(),
            //     email: "mariana.ferraz@softagon.com.br",
            //     apiUserId: 'x8Tamaq9lFgVAw4H0SdoT',
            // },
            // {
            //     id: "bb9a54e5-1581-4d5c-b168-06d8acd28dd6",
            //     name: "Patricia Xavier Dos Santos",
            //     role: "ADMIN",
            //     tenantId: self.crypto.randomUUID(),
            //     email: "professor2@gmail.com",
            //     apiUserId: 'x8Tamaq9lFgVAw4H0SdoT',
            // },
            // {
            //     id: "c0631d11-3047-49ad-a9dc-f895901377e0",
            //     name: "Rodrigo Miguel",
            //     role: "ADMIN",
            //     tenantId: self.crypto.randomUUID(),
            //     email: "rodrigo.miguel@eduprime.chat",
            //     apiUserId: 'x8Tamaq9lFgVAw4H0SdoT',
            // },
            // {
            //     id: "d36c3c8b-e7fc-4d0b-a8b2-d4258cadabc2",
            //     name: "Softagon Sistemas",
            //     role: "ADMIN",
            //     tenantId: self.crypto.randomUUID(),
            //     email: "dev@softagon.com.br",
            //     apiUserId: 'x8Tamaq9lFgVAw4H0SdoT',
            // },
            // {
            //     id: "dea3da75-9c2d-489a-a0f9-d283cbb5ac90",
            //     name: "Professor Teste",
            //     role: "ADMIN",
            //     tenantId: self.crypto.randomUUID(),
            //     email: "professor@gmail.com",
            //     apiUserId: 'x8Tamaq9lFgVAw4H0SdoT',
            // },
            // {
            //     id: "decc6235-ed36-4c80-a6c8-5232929a4f16",
            //     name: "Maria Aparecida Alves de Araujo",
            //     role: "ADMIN",
            //     tenantId: self.crypto.randomUUID(),
            //     email: "cida1079ms@gmail.com",
            //     apiUserId: 'x8Tamaq9lFgVAw4H0SdoT',
            // },
            // {
            //     id: "f2c73979-5f22-427d-9398-d46181f16fb8",
            //     name: "Jardel Filho",
            //     role: "ADMIN",
            //     tenantId: self.crypto.randomUUID(),
            //     email: "jardeltz@gmail.com",
            //     apiUserId: 'x8Tamaq9lFgVAw4H0SdoT',
            // }
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
