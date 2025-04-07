import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const attendance = await prisma.attendance.createMany({
        data: [
            {
                id: '006d4da3-f7a5-4cab-b83e-e3b25002ea1a',
                date: new Date('2025-03-03'),
                presence: false,
                teacherId: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
                studentId: '6990c778-1c07-40ee-a062-cf0d34fb7f9f', // Bia (Existem varias pessoas com exatamente esse mesmo nome, ATENÇÃO)
                classroomId: '48702fd4-5841-4d4d-bace-740cc915f39d', // 6 Ano A
                enrollmentId: '6e123202-0bd7-45de-a0d4-e3da3551ff30', // Bia
                disciplineId: '59f326bf-7a1f-4b66-9049-b7df572f901b', // Historia
                justificationId: '4ca48f5c-2987-4cab-9420-614d64d4d489', // Compromisso médico
                stageId: '149665ec-a230-439e-aeb2-4cb7bfc8ebb4', // Etapa 1
                schoolId: 'd488e90e-327b-4ca7-ad45-888c65d2a3ab', // Araripina
                tenantId: self.crypto.randomUUID()
            },
            { // confirmar consistência deste aluno
                id: '00857cf3-6d75-4891-bf8d-c8a78aa185b7',
                date: new Date('2023-03-03'),
                presence: false,
                teacherId: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
                studentId: '7342b6cb-87f2-40c1-bae0-ea26dae9a394', // Jon
                classroomId: '48702fd4-5841-4d4d-bace-740cc915f39d', // 6 Ano A
                enrollmentId: 'ff009ba1-13f8-463c-bad6-97979292c673', // Jon
                disciplineId: '59f326bf-7a1f-4b66-9049-b7df572f901b', // Historia
                justificationId: '59f326bf-7a1f-4b66-9049-b7df572f901b', //	Circunstâncias excepcionais
                stageId: '149665ec-a230-439e-aeb2-4cb7bfc8ebb4', // Etapa 1
                schoolId: 'd488e90e-327b-4ca7-ad45-888c65d2a3ab', // Araripina
                tenantId: self.crypto.randomUUID()
            },
        ],
        skipDuplicates: true,
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
