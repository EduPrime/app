import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function createTeacherAttendance() {
    const newTeacherAttendance = await prisma.teacherAttendance.create({
        data: {

            date: new Date('2025-03-17'),
            totalClasses: 5,
            type: 'DISCIPLINA',
            teacherId: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan Professor
            classroomId: '29cf9857-0fe4-45f4-8b00-fc10e626eba8', // 7º Ano A
            disciplineId: 'c030869a-3b07-4f7d-b11d-69765af91f9a', // Geometria
            stageId: '149665ec-a230-439e-aeb2-4cb7bfc8ebb4', // etapa 1
            schoolId: 'd488e90e-327b-4ca7-ad45-888c65d2a3ab', // Escola Municipal de Araripina
        }
    });

    console.log(newTeacherAttendance);
}

createTeacherAttendance()
    .catch((e) => {
        throw e;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });