import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
	const institution = await prisma.institution.createMany({
		data: [
			{
				id: 'bd14f407-3758-4656-a299-e4cf3859dd29', // Prefeitura Municipal de Araripina
				name: 'Prefeitura Municipal de Araripina',
				phone: '87981331477',
				email: '',
				tenantId: self.crypto.randomUUID(),
			}
		],
		skipDuplicates: true
	})
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
