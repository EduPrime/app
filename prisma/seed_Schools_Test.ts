import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
	const schools = await prisma.school.createMany({
		data: [
			{
				id: crypto.randomUUID(),
				name: "Escola Teste",
				address: "Rua Teste, 206",
				city: "Araripina",
				state: "PE",
				phone: "(87) 99999-9999",
				institutionId: "bd14f407-3758-4656-a299-e4cf3859dd29",
				tenantId: crypto.randomUUID(),
				createdAt: new Date(),
			},
			{
				id: crypto.randomUUID(),
				name: "Escola Teste Modelo",
				address: "Avenida Principal, 123",
				city: "Araripina",
				state: "PE",
				phone: "(81) 98888-8888",
				institutionId: "bd14f407-3758-4656-a299-e4cf3859dd29",
				tenantId: crypto.randomUUID(),
				createdAt: new Date(),
			},
			{
				id: crypto.randomUUID(),
				name: "Escola Teste 2",
				address: "Rua Tiradentes, 480",
				city: "Araripina",
				state: "PE",
				phone: "(87) 99154-8888",
				institutionId: "bd14f407-3758-4656-a299-e4cf3859dd29",
				tenantId: crypto.randomUUID(),
				createdAt: new Date(),
			},
		],
	});
	console.log("Seed de escolas inserido com sucesso:", schools);
}

main()
	.catch((e) => {
		console.error("Erro ao inserir seed:", e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
