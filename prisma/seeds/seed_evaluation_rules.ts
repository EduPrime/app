import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {

    const query = `
        ALTER TABLE public."evaluationRule"
        ADD CONSTRAINT chk_maximum_grade CHECK ("maximumGrade" >= 0 AND "maximumGrade" <= 10),
        ADD CONSTRAINT chk_minimum_grade CHECK ("minimumGrade" >= 0 AND "minimumGrade" <= 10),
        ADD CONSTRAINT chk_number_activities CHECK ("numberActivities" >= 0 AND "numberActivities" <= 10),
        ADD CONSTRAINT chk_average CHECK (average >= 0 AND average <= 10);
    `
    await prisma.$executeRawUnsafe(query)

    const rules = await prisma.evaluationRule.createMany(
        {
            data: [
                {
                    id: 'e87bffe1-ea70-4d02-9465-4e782f638d3d',
                    courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94',
                    name: 'Regra de avaliação qualitativa',
                    gradeType: 'Nota conceitual',
                    progressionType: 'Continuada',
                    averageFormula: 'Média aritmética: Se / Et',
                    parallelMakeupExam: 'Não usar recuperação paralela',
                    maximumGrade: 10.0,
                    minimumGrade: 0.0,
                    numberActivities: 0,
                    average: 6.0,
                    frequencyType: 'Apura falta no geral (unificada)',
                    feedbackType: 'Um parecer por etapa, geral',
                    attendancePercentage: 75.00,
                    conceptualLabel:
                        [
                            {
                                "rotulo": "PC",
                                "descricao": "Processo Construído",
                                "valor": 10
                            },
                            {
                                "rotulo": "PEC",
                                "descricao": "Processo em Construção",
                                "valor": 7.9
                            },
                            {
                                "rotulo": "PNC",
                                "descricao": "Processo Não Construído",
                                "valor": 0
                            },
                            {
                                "rotulo": "NT",
                                "descricao": "Não trabalhada"
                            }
                        ],
                    frequencyReport: [
                        {
                            "nome": "Presença",
                            "abreviatura": "C"
                        },
                        {
                            "nome": "Falta",
                            "abreviatura": "F"
                        },
                        {
                            "nome": "Falta Justificada",
                            "abreviatura": "FJ"
                        },
                        {
                            "nome": "Feriado",
                            "abreviatura": "E"
                        },
                        {
                            "nome": "Recesso",
                            "abreviatura": "R"
                        }
                    ],
                },
                {
                    id: '733da695-36ed-466e-8ee1-eb9196fbfdea',
                    courseId: 'b4c7da20-b25a-46e2-8759-c9347554b09c',
                    name: 'Regra de avaliação quantitativa',
                    gradeType: 'Nota numérica',
                    progressionType: 'Não continuada: média e presença',
                    averageFormula: 'Média aritmética: Se / Et',
                    parallelMakeupExam: 'Não usar recuperação paralela',
                    makeupFormula: 'Média recuperação ponderada: Rc',
                    maximumGrade: 10.0,
                    minimumGrade: 0.0,
                    numberActivities: 3,
                    average: 6.0,
                    frequencyType: 'Apura falta por componente curricular',
                    feedbackType: 'Não usar parecer descritivo',
                    attendancePercentage: 75.0,
                    frequencyReport:
                        [
                            {
                                "nome": "Presença",
                                "abreviatura": "C"
                            },
                            {
                                "nome": "Falta",
                                "abreviatura": "F"
                            },
                            {
                                "nome": "Falta Justificada",
                                "abreviatura": "FJ"
                            },
                            {
                                "nome": "Feriado",
                                "abreviatura": "E"
                            },
                            {
                                "nome": "Recesso",
                                "abreviatura": "R"
                            }
                        ],
                },
                {
                    id: '8326a5da-2211-4785-aa53-20cbd3d7abd6',
                    courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e97',
                    name: 'Regra de avaliação parecer inicial e final',
                    gradeType: 'Não usar nota',
                    progressionType: 'Continuada',
                    maximumGrade: 10.0,
                    minimumGrade: 0.0,
                    averageFormula: 'Média aritmética: Se / Et',
                    parallelMakeupExam: 'Usar uma recuperação paralela por etapa',
                    numberActivities: 0,
                    average: 6.0,
                    frequencyType: 'Apura falta no geral (unificada)',
                    feedbackType: 'Um parecer por etapa, geral',
                    attendancePercentage: 75.0,
                    frequencyReport:
                        [
                            {
                                "nome": "Presença",
                                "abreviatura": "C"
                            },
                            {
                                "nome": "Falta",
                                "abreviatura": "F"
                            },
                            {
                                "nome": "Falta Justificada",
                                "abreviatura": "FJ"
                            },
                            {
                                "nome": "Feriado",
                                "abreviatura": "E"
                            },
                            {
                                "nome": "Recesso",
                                "abreviatura": "R"
                            }
                        ]
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