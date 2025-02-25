import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
	const owner = await prisma.institution.createMany({
		data: [
			{
				id: "1f0cb6c1-e074-4555-812b-378920649b71",
				name: "Secretaria de Educação de Acauã",
				address: "Bonifácio Severo Coelho, 443",
				city: "Acauã",
				state: "PI",
				postalCode: "64790-000",
				phone: "123456789",
				email: "secretaria@acaua.pi.gov.br",
				metadata: {},
				createdAt: new Date("2024-03-17T22:26:27.730Z"),
				deletedAt: null,
				updatedAt: new Date("2024-03-26T11:34:31.236Z"),
				updatedBy: "54dbf779-07c1-43e7-9ff1-fdab21594a58",
				tenantId: "dababe60-6832-4244-b65a-91d5321375a6",
				userCreated: "dababe60-6832-4244-b65a-91d5321375a6",
				singleton: 1
			},
			{
				id: "547f4c04-d8eb-4e01-b13a-e648e81de59d",
				name: "Softagon Sistemas",
				address: "Agamenon Magalhães, 603",
				city: "Softagon",
				state: "PE",
				postalCode: "56280-000",
				phone: "987654321",
				email: "dev@softagon.com.br",
				metadata: {},
				createdAt: new Date("2024-01-11T11:10:18.326Z"),
				deletedAt: null,
				updatedAt: new Date("2024-02-28T16:31:04.587Z"),
				updatedBy: "dababe60-6832-4244-b65a-91d5321375a6",
				tenantId: "d36c3c8b-e7fc-4d0b-a8b2-d4258cadabc2",
				userCreated: "d36c3c8b-e7fc-4d0b-a8b2-d4258cadabc2",
				singleton: 1
			},
			{
				id: "5796ee79-7e43-4137-bf7a-016f925684a4",
				name: "Prefeitura de Araripina Pernambuco",
				address: "Paço Municipal Francisco da Rosa Muniz, 174",
				city: "Araripina",
				state: "PE",
				postalCode: "56280-000",
				phone: "1122334455",
				email: "prefeitura@araripina.pe.gov.br",
				metadata: {},
				createdAt: new Date("2024-02-28T16:36:03.991Z"),
				deletedAt: null,
				updatedAt: new Date("2024-02-28T16:37:29.544Z"),
				updatedBy: "dababe60-6832-4244-b65a-91d5321375a6",
				tenantId: "dababe60-6832-4244-b65a-91d5321375a6",
				userCreated: "dababe60-6832-4244-b65a-91d5321375a6",
				singleton: 1
			},
			{
				id: "720fd4db-f8f7-4f46-bf1c-991627f84f29",
				name: "Secretaria Municipal de Educação de Ipubi - PE",
				address: "Praça Professor Agamanon Magalhães, 56",
				city: "Ipubi",
				state: "PE",
				postalCode: "56260-000",
				phone: "5566778899",
				email: "educacao@ipubi.pe.gov.br",
				metadata: {},
				createdAt: new Date("2024-02-16T18:42:31.509Z"),
				deletedAt: null,
				updatedAt: new Date("2024-02-17T10:13:54.607Z"),
				updatedBy: "dababe60-6832-4244-b65a-91d5321375a6",
				tenantId: "54dbf779-07c1-43e7-9ff1-fdab21594a58",
				userCreated: "54dbf779-07c1-43e7-9ff1-fdab21594a58",
				singleton: 1
			},
		]
	});
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
