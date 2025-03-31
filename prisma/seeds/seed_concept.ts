import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.conceptualGrade.createMany({
    data: [
      {
        id: '12455fb3-d64d-440d-ac41-c354908b45d8',
        studentId: 'c1e76f52-27a8-43f9-aafe-6ce3975db218',
        stageId: '149665ec-a230-439e-aeb2-4cb7bfc8ebb4',
        enrollmentId: '4461883c-6e54-486c-9dd8-dd7798354f82',
        classroomId: '12ab8210-e080-491b-8f6c-45e240a8990e',
        disciplineId: '6862a800-92c3-4d46-8740-62a02a5e5cf9',
        schoolId: 'd488e90e-327b-4ca7-ad45-888c65d2a3ab',
      },
    ],
  })
  await prisma.conceptualGradeByThematicUnit.createMany({
    data: [
      {
        conceptualGradeId: '12455fb3-d64d-440d-ac41-c354908b45d8',
        thematicUnitId: 'e1885ac2-82b8-43e8-b0cf-7cba14d955db',
        grade: 'PEC',
      },
      {
        conceptualGradeId: '12455fb3-d64d-440d-ac41-c354908b45d8',
        thematicUnitId: 'fc741d2a-6629-41bd-8372-22253daf4dc8',
        grade: 'PEC',
      },
      {
        conceptualGradeId: '12455fb3-d64d-440d-ac41-c354908b45d8',
        thematicUnitId: 'ac6a1da6-a5b1-42b9-8120-bc5fe72c6c5c',
        grade: 'PC',
      },
      {
        conceptualGradeId: '12455fb3-d64d-440d-ac41-c354908b45d8',
        thematicUnitId: '8a696ee0-1905-4951-b853-2247cd9e169e',
        grade: 'NT',
      },
      {
        conceptualGradeId: '12455fb3-d64d-440d-ac41-c354908b45d8',
        thematicUnitId: 'a70e0e5d-9d3e-4102-807b-7b531d60c0e5',
        grade: 'PC',
      },
    ],
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
