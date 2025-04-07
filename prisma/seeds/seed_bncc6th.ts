import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const bnccs = await prisma.bncc.createMany({
        data: [
            {
                id: '4c51baa2-bdee-4861-ab12-d0669b0e34a0',
                code: 'EF06EE01PE',
                objective: 'Desenvolver habilidades de empreendedorismo e educação financeira, promovendo a gestão de recursos e a tomada de decisões conscientes.',
                themathicUnit: 'Empreendedorismo e Educação Financeira',
                knowledgeArea: 'Ciências Humanas',
                languagePractice: 'Planejamento e Gestão',
                fieldsOfAction: 'Campo econômico e social',
                knowledgeObjects: 'Gestão de recursos e planejamento financeiro',
                courseId: '0e2833bf-6ef1-4bb0-b83a-b036fc04cac6', // ensino fundamental II
                disciplineId: '1e222b35-25da-430e-8bbf-03218baccbd7', // Empreendedorismo e Educação Financeira
                seriesId: '19bcbcde-8016-4e7e-b0e4-bc3fcb73c53c', // 6º Ano
                userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
                tenantId: self.crypto.randomUUID(),
            },
            {
                id: '768e616e-6505-4ead-bdb1-823b07dd7f99',
                code: 'EF06RL01PE',
                objective: 'Desenvolver habilidades de raciocínio lógico, promovendo a resolução de problemas e a análise de padrões.',
                themathicUnit: 'Raciocínio Lógico',
                knowledgeArea: 'Matemática',
                languagePractice: 'Análise e Resolução',
                fieldsOfAction: 'Campo lógico-matemático',
                knowledgeObjects: 'Estruturas lógicas e padrões matemáticos',
                courseId: '0e2833bf-6ef1-4bb0-b83a-b036fc04cac6', // ensino fundamental II
                disciplineId: '2efd92b6-51fd-4f88-b036-0517ae40ee01', // Raciocínio Lógico
                seriesId: '19bcbcde-8016-4e7e-b0e4-bc3fcb73c53c', // 6º Ano
                userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
                tenantId: self.crypto.randomUUID(),
            },
            {
                id: '026b4d7c-7b9c-4707-9eef-c310f49244e3',
                code: 'EF06IC01PE',
                objective: 'Desenvolver habilidades de investigação científica, promovendo a curiosidade e a aplicação do método científico.',
                themathicUnit: 'Iniciação Científica',
                knowledgeArea: 'Ciências da Natureza',
                languagePractice: 'Investigação e Experimentação',
                fieldsOfAction: 'Campo científico',
                knowledgeObjects: 'Método científico e experimentação',
                courseId: '0e2833bf-6ef1-4bb0-b83a-b036fc04cac6', // ensino fundamental II
                disciplineId: '3e90c314-51bb-4482-af68-99bc04371281', // Iniciação Científica
                seriesId: '19bcbcde-8016-4e7e-b0e4-bc3fcb73c53c', // 6º Ano
                userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
                tenantId: self.crypto.randomUUID(),
            },
            {
                id: '5c261362-f019-4d23-959e-06134b0084a8',
                code: 'EF06MA01PE',
                objective: 'Desenvolver habilidades matemáticas, promovendo a resolução de problemas e o pensamento lógico.',
                themathicUnit: 'Matemática',
                knowledgeArea: 'Matemática',
                languagePractice: 'Resolução de Problemas',
                fieldsOfAction: 'Campo lógico-matemático',
                knowledgeObjects: 'Conceitos matemáticos fundamentais',
                courseId: '0e2833bf-6ef1-4bb0-b83a-b036fc04cac6', // ensino fundamental II
                disciplineId: '4ca48f5c-2987-4cab-9420-614d64d4d489', // Matemática
                seriesId: '19bcbcde-8016-4e7e-b0e4-bc3fcb73c53c', // 6º Ano
                userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
                tenantId: self.crypto.randomUUID(),
            },
            {
                id: '00bb8a97-7892-4a2b-a0f0-441813bfb6cf',
                code: 'EF06ES01PE',
                objective: 'Desenvolver habilidades de comunicação em língua espanhola, promovendo a compreensão e produção textual.',
                themathicUnit: 'Língua Espanhola',
                knowledgeArea: 'Linguagens',
                languagePractice: 'Leitura e Produção Textual',
                fieldsOfAction: 'Campo comunicativo',
                knowledgeObjects: 'Interpretação e Produção de Textos',
                courseId: '0e2833bf-6ef1-4bb0-b83a-b036fc04cac6', // ensino fundamental II
                disciplineId: '53ca155c-a3da-43c4-b280-4724a065471a', // Língua Espanhola
                seriesId: '19bcbcde-8016-4e7e-b0e4-bc3fcb73c53c', // 6º Ano
                userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
                tenantId: self.crypto.randomUUID(),
            },
            {
                id: 'abb1196e-ff1a-49b4-8fa7-1479b4f6c9d0',
                code: 'EF06HI01PE',
                objective: 'Desenvolver habilidades de análise histórica, promovendo a compreensão de eventos e processos históricos.',
                themathicUnit: 'História',
                knowledgeArea: 'Ciências Humanas',
                languagePractice: 'Análise Histórica',
                fieldsOfAction: 'Campo histórico',
                knowledgeObjects: 'Eventos e processos históricos',
                courseId: '0e2833bf-6ef1-4bb0-b83a-b036fc04cac6', // ensino fundamental II
                disciplineId: '59f326bf-7a1f-4b66-9049-b7df572f901b', // História
                seriesId: '19bcbcde-8016-4e7e-b0e4-bc3fcb73c53c', // 6º Ano
                userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
                tenantId: self.crypto.randomUUID(),
            },
            {
                id: '5130bbd6-3644-44fb-9ff2-caf7e2ccda56',
                code: 'EF06CI01PE',
                objective: 'Desenvolver habilidades de compreensão científica, promovendo a análise de fenômenos naturais.',
                themathicUnit: 'Ciências',
                knowledgeArea: 'Ciências da Natureza',
                languagePractice: 'Investigação e Experimentação',
                fieldsOfAction: 'Campo científico',
                knowledgeObjects: 'Fenômenos naturais e suas interações',
                courseId: '0e2833bf-6ef1-4bb0-b83e-b036fc04cac6', // ensino fundamental II
                disciplineId: '5e34bc6d-37ce-49cd-905f-d0c002f42a96', // Ciências
                seriesId: '19bcbcde-8016-4e7e-b0e4-bc3fcb73c53c', // 6º Ano
                userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
                tenantId: self.crypto.randomUUID(),
            },
            {
                id: '538b57c2-2724-4d07-aab2-4cf295cabbd4',
                code: 'EF06LP01PE',
                objective: 'Desenvolver habilidades de leitura e escrita em língua portuguesa, promovendo a interpretação e produção textual.',
                themathicUnit: 'Língua Portuguesa',
                knowledgeArea: 'Linguagens',
                languagePractice: 'Leitura e Produção Textual',
                fieldsOfAction: 'Campo comunicativo',
                knowledgeObjects: 'Interpretação e Produção de Textos',
                courseId: '0e2833bf-6ef1-4bb0-b83e-b036fc04cac6', // ensino fundamental II
                disciplineId: '6862a800-92c3-4d46-8740-62a02a5e5cf9', // Língua Portuguesa
                seriesId: '19bcbcde-8016-4e7e-b0e4-bc3fcb73c53c', // 6º Ano
                userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
                tenantId: self.crypto.randomUUID(),
            },
            {
                id: '07ab4407-79d5-491f-9a68-c206674ecb14',
                code: 'EF06ER01PE',
                objective: 'Desenvolver habilidades de compreensão religiosa, promovendo o respeito à diversidade e o diálogo inter-religioso.',
                themathicUnit: 'Ensino Religioso',
                knowledgeArea: 'Ciências Humanas',
                languagePractice: 'Discussão e Reflexão',
                fieldsOfAction: 'Campo social e religioso',
                knowledgeObjects: 'Diversidade religiosa e ética',
                courseId: '0e2833bf-6ef1-4bb0-b83e-b036fc04cac6', // ensino fundamental II
                disciplineId: '6988e9d0-6b6b-44fe-adbe-7af90a8a0e27', // Ensino Religioso
                seriesId: '19bcbcde-8016-4e7e-b0e4-bc3fcb73c53c', // 6º Ano
                userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
                tenantId: self.crypto.randomUUID(),
            },
            {
                id: '89ab4259-1ca8-46f6-9b49-b46f927e1f3a',
                code: 'EF06DH01PE',
                objective: 'Desenvolver habilidades de cidadania e direitos humanos, promovendo a participação ativa e consciente na sociedade.',
                themathicUnit: 'Direitos Humanos e Cidadania',
                knowledgeArea: 'Ciências Humanas',
                languagePractice: 'Discussão e Reflexão',
                fieldsOfAction: 'Campo social',
                knowledgeObjects: 'Direitos e deveres do cidadão',
                courseId: '0e2833bf-6ef1-4bb0-b83e-b036fc04cac6', // ensino fundamental II
                disciplineId: '788cbb82-b429-4508-bd99-c25b33fd1d3c', // Direitos Humanos e Cidadania
                seriesId: '19bcbcde-8016-4e7e-b0e4-bc3fcb73c53c', // 6º Ano
                userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
                tenantId: self.crypto.randomUUID(),
            },
            {
                id: '317a4e41-065f-4a6f-828e-39854c9735bd',
                code: 'EF06PV01PE',
                objective: 'Desenvolver habilidades de planejamento e autoconhecimento, promovendo a construção de um projeto de vida.',
                themathicUnit: 'Projeto de Vida',
                knowledgeArea: 'Ciências Humanas',
                languagePractice: 'Reflexão e Planejamento',
                fieldsOfAction: 'Campo pessoal e social',
                knowledgeObjects: 'Autoconhecimento e planejamento de metas',
                courseId: '0e2833bf-6ef1-4bb0-b83a-b036fc04cac6', // ensino fundamental II
                disciplineId: '91fa3596-4de7-4a06-8aba-5465b81f8077', // Projeto de Vida
                seriesId: '19bcbcde-8016-4e7e-b0e4-bc3fcb73c53c', // 6º Ano
                userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
                tenantId: self.crypto.randomUUID(),
            },
            {
                id: '5fd22fd6-965d-43ff-a013-a028350dc37b',
                code: 'EF06GE01PE',
                objective: 'Desenvolver habilidades de análise geográfica, promovendo a compreensão do espaço e das interações humanas.',
                themathicUnit: 'Geografia',
                knowledgeArea: 'Ciências Humanas',
                languagePractice: 'Análise Espacial',
                fieldsOfAction: 'Campo geográfico',
                knowledgeObjects: 'Espaço geográfico e suas dinâmicas',
                courseId: '0e2833bf-6ef1-4bb0-b83a-b036fc04cac6', // ensino fundamental II
                disciplineId: '9747133a-8225-4eaf-9a88-40ca56f94698', // Geografia
                seriesId: '19bcbcde-8016-4e7e-b0e4-bc3fcb73c53c', // 6º Ano
                userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
                tenantId: self.crypto.randomUUID(),
            },
            {
                id: 'd24cc65f-1eaf-4b01-b6e6-26bb0fc483b7',
                code: 'EF06EF01PE',
                objective: 'Desenvolver habilidades motoras e de cooperação, promovendo a prática de atividades físicas e esportivas.',
                themathicUnit: 'Educação Física',
                knowledgeArea: 'Educação Física',
                languagePractice: 'Prática e Cooperação',
                fieldsOfAction: 'Campo esportivo',
                knowledgeObjects: 'Movimento e práticas corporais',
                courseId: '0e2833bf-6ef1-4bb0-b83a-b036fc04cac6', // ensino fundamental II
                disciplineId: '9825f111-81f3-4f34-ab36-7a30387d0c14', // Educação Física
                seriesId: '19bcbcde-8016-4e7e-b0e4-bc3fcb73c53c', // 6º Ano
                userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
                tenantId: self.crypto.randomUUID(),
            },
            {
                id: '7e0d2420-95ba-4113-af18-6203251d5581',
                code: 'EF06AR01PE',
                objective: 'Desenvolver habilidades artísticas, promovendo a expressão e a apreciação estética.',
                themathicUnit: 'Artes',
                knowledgeArea: 'Linguagens',
                languagePractice: 'Expressão e Criação',
                fieldsOfAction: 'Campo artístico',
                knowledgeObjects: 'Produção e apreciação de obras artísticas',
                courseId: '0e2833bf-6ef1-4bb0-b83a-b036fc04cac6', // ensino fundamental II
                disciplineId: '9a7b90a1-feff-4a47-8224-0ab8352e090a', // Artes
                seriesId: '19bcbcde-8016-4e7e-b0e4-bc3fcb73c53c', // 6º Ano
                userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
                tenantId: self.crypto.randomUUID(),
            },
            {
                id: 'b43d90a9-2360-4d4e-9d56-061a3595edfe',
                code: 'EF06GM01PE',
                objective: 'Desenvolver habilidades de raciocínio espacial, promovendo a compreensão de formas e estruturas geométricas.',
                themathicUnit: 'Geometria',
                knowledgeArea: 'Matemática',
                languagePractice: 'Raciocínio Espacial',
                fieldsOfAction: 'Campo lógico-matemático',
                knowledgeObjects: 'Formas geométricas e suas propriedades',
                courseId: '0e2833bf-6ef1-4bb0-b83a-b036fc04cac6', // ensino fundamental II
                disciplineId: 'c030869a-3b07-4f7d-b11d-69765af91f9a', // Geometria
                seriesId: '19bcbcde-8016-4e7e-b0e4-bc3fcb73c53c', // 6º Ano
                userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
                tenantId: self.crypto.randomUUID(),
            },
            {
                id: '96cadaf7-7d6b-474f-931c-0ad71232ebf9',
                code: 'EF06LI01PE',
                objective: 'Desenvolver habilidades de comunicação em língua inglesa, promovendo a compreensão e produção textual.',
                themathicUnit: 'Língua Inglesa',
                knowledgeArea: 'Linguagens',
                languagePractice: 'Leitura e Produção Textual',
                fieldsOfAction: 'Campo comunicativo',
                knowledgeObjects: 'Interpretação e Produção de Textos em Inglês',
                courseId: '0e2833bf-6ef1-4bb0-b83a-b036fc04cac6', // ensino fundamental II
                disciplineId: 'c7c08355-9bd8-405b-87c6-4b99b75ff1f9', // Língua Inglesa
                seriesId: '19bcbcde-8016-4e7e-b0e4-bc3fcb73c53c', // 6º Ano
                userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
                tenantId: self.crypto.randomUUID(),
            },
            {
                id: '7e22705b-e100-4e1d-82f0-a13fd26202a5',
                code: 'EF06RB01PE',
                objective: 'Desenvolver habilidades de pensamento computacional, promovendo a criação e análise de soluções tecnológicas.',
                themathicUnit: 'Robótica',
                knowledgeArea: 'Tecnologia',
                languagePractice: 'Criação e Experimentação',
                fieldsOfAction: 'Campo tecnológico',
                knowledgeObjects: 'Conceitos básicos de robótica e programação',
                courseId: '0e2833bf-6ef1-4bb0-b83a-b036fc04cac6', // ensino fundamental II
                disciplineId: 'd90ce4c2-2b1a-4cb2-b339-263f37f7363a', // Robótica
                seriesId: '19bcbcde-8016-4e7e-b0e4-bc3fcb73c53c', // 6º Ano
                userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
                tenantId: self.crypto.randomUUID(),
            },
            {
                id: '1fe3419c-607b-4949-b060-dfe4564d8a6c',
                code: 'EF06CL01PE',
                objective: 'Desenvolver habilidades de leitura e escrita, promovendo a interpretação e produção textual em diferentes gêneros.',
                themathicUnit: 'Ciclo de Leitura e Produção Textual',
                knowledgeArea: 'Linguagens',
                languagePractice: 'Leitura e Produção Textual',
                fieldsOfAction: 'Campo comunicativo',
                knowledgeObjects: 'Interpretação e Produção de Textos em diferentes gêneros',
                courseId: '0e2833bf-6ef1-4bb0-b83a-b036fc04cac6', // ensino fundamental II
                disciplineId: 'ed5a57b7-828f-4737-bc78-ca919f0f833c', // Ciclo de Leitura e Produção Textual
                seriesId: '19bcbcde-8016-4e7e-b0e4-bc3fcb73c53c', // 6º Ano
                userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
                tenantId: self.crypto.randomUUID(),
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
