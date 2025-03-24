import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const bnccs = await prisma.bncc.createMany({
        data: [
            {
                id: '5fa081dd-f43b-4631-81f1-2a8047f7fac1',
                code: 'EF07EE01PE',
                objective: 'Desenvolver habilidades de empreendedorismo e educação financeira, promovendo a autonomia e a gestão responsável de recursos.',
                themathicUnit: 'Empreendedorismo e Educação Financeira',
                knowledgeArea: 'Área de Ciências Humanas',
                languagePractice: 'Prática interdisciplinar',
                fieldsOfAction: 'Campo social e econômico',
                knowledgeObjects: 'Planejamento financeiro e empreendedorismo',
                courseId: '0e2833bf-6ef1-4bb0-b83a-b036fc04cac6', // ensino fundamental II
                disciplineId: '1e222b35-25da-430e-8bbf-03218baccbd7', // Empreendedorismo e Educação Financeira
                seriesId: 'b1ce4726-de53-47ed-8c6e-34eaa1e39747', // 7º Ano
                userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
                tenantId: self.crypto.randomUUID(),
            },
            {
                id: '317d070d-9d13-4c2f-bb28-e2b12356f64e',
                code: 'EF07RL01PE',
                objective: 'Desenvolver o raciocínio lógico por meio de desafios e problemas matemáticos, promovendo a resolução criativa e analítica.',
                themathicUnit: 'Raciocínio Lógico',
                knowledgeArea: 'Área de Matemática',
                languagePractice: 'Resolução de problemas',
                fieldsOfAction: 'Campo lógico-matemático',
                knowledgeObjects: 'Estratégias de resolução de problemas',
                courseId: '0e2833bf-6ef1-4bb0-b83a-b036fc04cac6', // ensino fundamental II
                disciplineId: '2efd92b6-51fd-4f88-b036-0517ae40ee01', // Raciocínio Lógico
                seriesId: 'b1ce4726-de53-47ed-8c6e-34eaa1e39747', // 7º Ano
                userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
                tenantId: self.crypto.randomUUID(),
            },
            {
                id: '76879c3c-d382-41af-af53-ba7119a40bcb',
                code: 'EF07IC01PE',
                objective: 'Introduzir conceitos básicos de iniciação científica, incentivando a formulação de hipóteses e a realização de experimentos.',
                themathicUnit: 'Iniciação Científica',
                knowledgeArea: 'Área de Ciências da Natureza',
                languagePractice: 'Investigação científica',
                fieldsOfAction: 'Campo científico',
                knowledgeObjects: 'Método científico e experimentação',
                courseId: '0e2833bf-6ef1-4bb0-b83a-b036fc04cac6', // ensino fundamental II
                disciplineId: '3e90c314-51bb-4482-af68-99bc04371281', // Iniciação Científica
                seriesId: 'b1ce4726-de53-47ed-8c6e-34eaa1e39747', // 7º Ano
                userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
                tenantId: self.crypto.randomUUID(),
            },
            {
                id: '90fb5988-63d2-4ef2-b7f8-173cf3e4c020',
                code: 'EF07MT01PE',
                objective: 'Explorar conceitos matemáticos avançados, como álgebra e geometria, aplicando-os em situações do cotidiano.',
                themathicUnit: 'Matemática',
                knowledgeArea: 'Área de Matemática',
                languagePractice: 'Resolução de problemas e aplicações práticas',
                fieldsOfAction: 'Campo lógico-matemático',
                knowledgeObjects: 'Álgebra e geometria aplicada',
                courseId: '0e2833bf-6ef1-4bb0-b83a-b036fc04cac6', // ensino fundamental II
                disciplineId: '4ca48f5c-2987-4cab-9420-614d64d4d489', // Matemática
                seriesId: 'b1ce4726-de53-47ed-8c6e-34eaa1e39747', // 7º Ano
                userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
                tenantId: self.crypto.randomUUID(),
            },
            {
                id: 'b0c6ded2-f903-4527-913b-d33b2a7b7e92',
                code: 'EF07LE01PE',
                objective: 'Aprimorar a compreensão e produção de textos em Língua Espanhola, explorando aspectos culturais e linguísticos.',
                themathicUnit: 'Língua Espanhola',
                knowledgeArea: 'Área de Linguagens',
                languagePractice: 'Leitura, escrita e oralidade',
                fieldsOfAction: 'Campo artístico-literário',
                knowledgeObjects: 'Cultura e comunicação em Língua Espanhola',
                courseId: '0e2833bf-6ef1-4bb0-b83a-b036fc04cac6', // ensino fundamental II
                disciplineId: '53ca155c-a3da-43c4-b280-4724a065471a', // Língua Espanhola
                seriesId: 'b1ce4726-de53-47ed-8c6e-34eaa1e39747', // 7º Ano
                userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
                tenantId: self.crypto.randomUUID(),
            },
            {
                id: '86af2870-e76f-4808-8468-19599992feab',
                code: 'EF07HI01PE',
                objective: 'Analisar eventos históricos relevantes, compreendendo suas causas e consequências no contexto social e político.',
                themathicUnit: 'História',
                knowledgeArea: 'Ciências Humanas',
                languagePractice: 'Análise e interpretação histórica',
                fieldsOfAction: 'Campo histórico',
                knowledgeObjects: 'Eventos históricos e suas implicações',
                courseId: '0e2833bf-6ef1-4bb0-b83a-b036fc04cac6', // ensino fundamental II
                disciplineId: '59f326bf-7a1f-4b66-9049-b7df572f901b', // História
                seriesId: 'b1ce4726-de53-47ed-8c6e-34eaa1e39747', // 7º Ano
                userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
                tenantId: self.crypto.randomUUID(),
            },
            {
                id: 'dcb13d23-b652-47d8-98af-8d2a42bd4ecd',
                code: 'EF07CI01PE',
                objective: 'Compreender conceitos científicos fundamentais e aplicá-los em experimentos práticos.',
                themathicUnit: 'Ciências',
                knowledgeArea: 'Ciências da Natureza',
                languagePractice: 'Investigação científica',
                fieldsOfAction: 'Campo científico',
                knowledgeObjects: 'Conceitos básicos de ciências naturais',
                courseId: '0e2833bf-6ef1-4bb0-b83a-b036fc04cac6', // ensino fundamental II
                disciplineId: '5e34bc6d-37ce-49cd-905f-d0c002f42a96', // Ciências
                seriesId: 'b1ce4726-de53-47ed-8c6e-34eaa1e39747', // 7º Ano
                userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
                tenantId: self.crypto.randomUUID(),
            },
            {
                id: '15335fc7-8852-4961-b539-bedf200cb8dc',
                code: 'EF07LP01PE',
                objective: 'Desenvolver habilidades de leitura e escrita, compreendendo e produzindo textos em diferentes gêneros.',
                themathicUnit: 'Língua Portuguesa',
                knowledgeArea: 'Linguagens',
                languagePractice: 'Leitura e produção textual',
                fieldsOfAction: 'Campo comunicativo',
                knowledgeObjects: 'Interpretação e produção de textos',
                courseId: '0e2833bf-6ef1-4bb0-b83a-b036fc04cac6', // ensino fundamental II
                disciplineId: '6862a800-92c3-4d46-8740-62a02a5e5cf9', // Língua Portuguesa
                seriesId: 'b1ce4726-de53-47ed-8c6e-34eaa1e39747', // 7º Ano
                userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
                tenantId: self.crypto.randomUUID(),
            },
            {
                id: 'fb5a701c-5ff4-457a-85a8-065effd8b9e4',
                code: 'EF07ER01PE',
                objective: 'Promover o respeito e a compreensão das diversas manifestações religiosas e culturais.',
                themathicUnit: 'Ensino Religioso',
                knowledgeArea: 'Ciências Humanas',
                languagePractice: 'Discussão e reflexão',
                fieldsOfAction: 'Campo social e cultural',
                knowledgeObjects: 'Diversidade religiosa e cultural',
                courseId: '0e2833bf-6ef1-4bb0-b83a-b036fc04cac6', // ensino fundamental II
                disciplineId: '6988e9d0-6b6b-44fe-adbe-7af90a8a0e27', // Ensino Religioso
                seriesId: 'b1ce4726-de53-47ed-8c6e-34eaa1e39747', // 7º Ano
                userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
                tenantId: self.crypto.randomUUID(),
            },
            {
                id: '50246647-e3ee-407c-98f1-b4d343951e5c',
                code: 'EF07DH01PE',
                objective: 'Compreender os direitos humanos e a cidadania, promovendo a participação ativa na sociedade.',
                themathicUnit: 'Direitos Humanos e Cidadania',
                knowledgeArea: 'Ciências Humanas',
                languagePractice: 'Discussão e reflexão',
                fieldsOfAction: 'Campo social',
                knowledgeObjects: 'Direitos e deveres',
                courseId: '0e2833bf-6ef1-4bb0-b83a-b036fc04cac6', // ensino fundamental II
                disciplineId: '788cbb82-b429-4508-bd99-c25b33fd1d3c', // Direitos Humanos e Cidadania
                seriesId: 'b1ce4726-de53-47ed-8c6e-34eaa1e39747', // 7º Ano
                userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
                tenantId: self.crypto.randomUUID(),
            },
            {
                id: '7b89db28-cd4f-4f76-bfdb-732d28e4ed0a',
                code: 'EF07PV01PE',
                objective: 'Desenvolver habilidades de planejamento e organização pessoal, compreendendo a importância do projeto de vida.',
                themathicUnit: 'Projeto de Vida',
                knowledgeArea: 'Desenvolvimento Pessoal',
                languagePractice: 'Planejamento e organização',
                fieldsOfAction: 'Campo pessoal',
                knowledgeObjects: 'Planejamento de vida',
                courseId: '0e2833bf-6ef1-4bb0-b83a-b036fc04cac6', // ensino fundamental II
                disciplineId: '91fa3596-4de7-4a06-8aba-5465b81f8077', // Projeto de Vida
                seriesId: 'b1ce4726-de53-47ed-8c6e-34eaa1e39747', // 7º Ano
                userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
                tenantId: self.crypto.randomUUID(),
            },
            {
                id: 'f6c04569-6630-4502-b8d9-ba4c3db1f09c',
                code: 'EF07GE02PE',
                objective: 'Compreender os conceitos fundamentais de geometria, aplicando-os na resolução de problemas práticos.',
                themathicUnit: 'Geometria',
                knowledgeArea: 'Área de Matemática',
                languagePractice: 'Resolução de problemas e visualização espacial',
                fieldsOfAction: 'Campo lógico-matemático',
                knowledgeObjects: 'Formas geométricas e suas propriedades',
                courseId: '0e2833bf-6ef1-4bb0-b83a-b036fc04cac6', // ensino fundamental II
                disciplineId: 'c030869a-3b07-4f7d-b11d-69765af91f9a', // Geometria
                seriesId: 'b1ce4726-de53-47ed-8c6e-34eaa1e39747', // 7º Ano
                userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
                tenantId: self.crypto.randomUUID(),
            },
            {
                id: 'ac1950c0-9471-483e-aebb-04b17cd7c82b',
                code: 'EF07GE01PE',
                objective: 'Analisar o espaço geográfico e suas interações, compreendendo os processos naturais e sociais.',
                themathicUnit: 'Geografia',
                knowledgeArea: 'Ciências Humanas',
                languagePractice: 'Análise geográfica',
                fieldsOfAction: 'Campo geográfico',
                knowledgeObjects: 'Espaço geográfico e suas interações',
                courseId: '0e2833bf-6ef1-4bb0-b83a-b036fc04cac6', // ensino fundamental II
                disciplineId: '9747133a-8225-4eaf-9a88-40ca56f94698', // Geografia
                seriesId: 'b1ce4726-de53-47ed-8c6e-34eaa1e39747', // 7º Ano
                userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
                tenantId: self.crypto.randomUUID(),
            },
            {
                id: 'd62a5f45-7ee8-49bc-8c33-963193752757',
                code: 'EF07EF01PE',
                objective: 'Promover a prática de atividades físicas, compreendendo sua importância para a saúde e o bem-estar.',
                themathicUnit: 'Educação Física',
                knowledgeArea: 'Saúde',
                languagePractice: 'Atividade física e saúde',
                fieldsOfAction: 'Campo esportivo',
                knowledgeObjects: 'Saúde e bem-estar',
                courseId: '0e2833bf-6ef1-4bb0-b83a-b036fc04cac6', // ensino fundamental II
                disciplineId: '9825f111-81f3-4f34-ab36-7a30387d0c14', // Educação Física
                seriesId: 'b1ce4726-de53-47ed-8c6e-34eaa1e39747', // 7º Ano
                userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
                tenantId: self.crypto.randomUUID(),
            },
            {
                id: 'f0d0195c-751b-4eac-8a26-674be9e8546d',
                code: 'EF07AR01PE',
                objective: 'Explorar diferentes formas de expressão artística, compreendendo sua importância cultural e social.',
                themathicUnit: 'Artes',
                knowledgeArea: 'Artes',
                languagePractice: 'Expressão artística',
                fieldsOfAction: 'Campo artístico',
                knowledgeObjects: 'Técnicas e expressões artísticas',
                courseId: '0e2833bf-6ef1-4bb0-b83a-b036fc04cac6', // ensino fundamental II
                disciplineId: '9a7b90a1-feff-4a47-8224-0ab8352e090a', // Artes
                seriesId: 'b1ce4726-de53-47ed-8c6e-34eaa1e39747', // 7º Ano
                userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
                tenantId: self.crypto.randomUUID(),
            },
            {
                id: 'f7974dbf-9427-41fe-8379-dbaa4f0b5890',
                code: 'EF07LI01PE',
                objective: 'Desenvolver habilidades de comunicação em língua inglesa, compreendendo e produzindo textos orais e escritos.',
                themathicUnit: 'Língua Inglesa',
                knowledgeArea: 'Linguagens',
                languagePractice: 'Leitura, escrita e oralidade',
                fieldsOfAction: 'Campo comunicativo',
                knowledgeObjects: 'Interpretação e produção de textos em inglês',
                courseId: '0e2833bf-6ef1-4bb0-b83a-b036fc04cac6', // ensino fundamental II
                disciplineId: 'c7c08355-9bd8-405b-87c6-4b99b75ff1f9', // Língua Inglesa
                seriesId: 'b1ce4726-de53-47ed-8c6e-34eaa1e39747', // 7º Ano
                userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
                tenantId: self.crypto.randomUUID(),
            },
            {
                id: '31d515a9-7773-411d-af31-3e7ee3cc3455',
                code: 'EF07RO01PE',
                objective: 'Introduzir conceitos básicos de robótica, incentivando a criatividade e a resolução de problemas.',
                themathicUnit: 'Robótica',
                knowledgeArea: 'Tecnologia',
                languagePractice: 'Programação e automação',
                fieldsOfAction: 'Campo tecnológico',
                knowledgeObjects: 'Conceitos básicos de robótica',
                courseId: '0e2833bf-6ef1-4bb0-b83a-b036fc04cac6', // ensino fundamental II
                disciplineId: 'd90ce4c2-2b1a-4cb2-b339-263f37f7363a', // Robótica
                seriesId: 'b1ce4726-de53-47ed-8c6e-34eaa1e39747', // 7º Ano
                userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
                tenantId: self.crypto.randomUUID(),
            },
            {
                id: 'd1f9fc4b-9c40-4d41-8ad2-d3de72ee4859',
                code: 'EF07CL01PE',
                objective: 'Desenvolver habilidades de leitura e produção textual, compreendendo e produzindo textos em diferentes gêneros.',
                themathicUnit: 'Ciclo de Leitura e Produção Textual',
                knowledgeArea: 'Linguagens',
                languagePractice: 'Leitura e produção textual',
                fieldsOfAction: 'Campo comunicativo',
                knowledgeObjects: 'Interpretação e produção de textos',
                courseId: '0e2833bf-6ef1-4bb0-b83a-b036fc04cac6', // ensino fundamental II
                disciplineId: 'ed5a57b7-828f-4737-bc78-ca919f0f833c', // Ciclo de Leitura e Produção Textual
                seriesId: 'b1ce4726-de53-47ed-8c6e-34eaa1e39747', // 7º Ano
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
