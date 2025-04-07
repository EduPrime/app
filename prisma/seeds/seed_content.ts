import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const bnccs = await prisma.bncc.createMany({
        data: [
            // {
            //     id: '006d4da3-f7a5-4cab-b83e-e3b25002ea1a',
            //     code: 'EF35LS22PE',
            //     objective: 'Perceber diálogos em textos narrativos, observando o efeito de sentido de verbos de enunciação, marcas linguísticas e, se for o caso, o uso de variedades linguísticas no discurso direto, e sua relevância para a construção de sentidos dos textos.',
            //     themathicUnit: 'Unidade temática 2',
            //     knowledgeArea: 'Area 1',
            //     languagePractice: 'Leitura/escuta (compartilhada e autônoma)',
            //     fieldsOfAction: 'Campo artístico-literário',
            //     knowledgeObjects: 'Formação do leitor literário/ Leitura multissemiótica',
            //     courseId: '0e2833bf-6ef1-4bb0-b83a-b036fc04cac6', // ensino fundamental II
            //     disciplineId: '53ca155c-a3da-43c4-b280-4724a065471a', // Língua Espanhola
            //     seriesId: '1ba89502-452c-478a-a60c-23bdc6d59214', // 5º ano
            //     userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
            //     tenantId: self.crypto.randomUUID(),
            // },
            // {
            //     id: '00857cf3-6d75-4891-bf8d-c8a78aa185b7',
            //     code: 'EF05E16PE',
            //     objective: 'Associar figuras espaciais a suas planificações (prismas, pirâmides, cilindros e cones) e analisar, nomear e comparar seus atributos, utilizando e/ou recursos tecnológicos.',
            //     themathicUnit: 'GEOMETRIA',
            //     knowledgeArea: 'Area 2',
            //     languagePractice: 'Practice 2',
            //     fieldsOfAction: 'Field 2',
            //     knowledgeObjects: 'Object 2',
            //     courseId: '0e2833bf-6ef1-4bb0-b83a-b036fc04cac6', // Ensino fundamental II
            //     disciplineId: 'c030869a-3b07-4f7d-b11d-69765af91f9a', // Geometria
            //     seriesId: '1ba89502-452c-478a-a60c-23bdc6d59214', // 5º ano
            //     userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
            //     tenantId: self.crypto.randomUUID(),
            // },
            {
                id: '15eb2a81-3c3a-4c75-95b8-082d0ccf4b14',
                code: 'EF01LP10PE',
                objective: 'Desenvolver habilidades de comunicação em língua portuguesa, compreendendo e produzindo textos orais e escritos em diferentes contextos.',
                themathicUnit: 'Comunicação e Expressão',
                knowledgeArea: 'Linguagens',
                languagePractice: 'Leitura e Produção Textual',
                fieldsOfAction: 'Campo comunicativo',
                knowledgeObjects: 'Interpretação e Produção de Textos',
                courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // Ensino fundamental I
                disciplineId: '6862a800-92c3-4d46-8740-62a02a5e5cf9', // Lingua Portuguesa
                seriesId: '352a5857-193f-4672-9abf-c5302afd1c37', // 1º ano
                userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
                tenantId: self.crypto.randomUUID(),
            },
            {
                id: '1f16f2af-8c42-40dc-8a4a-c04836db0a51',
                code: 'EF01ES10PE',
                objective: 'Desenvolver habilidades de comunicação em língua espanhola, compreendendo e produzindo textos orais e escritos em diferentes contextos.',
                themathicUnit: 'Comunicação e Expressão',
                knowledgeArea: 'Linguagens',
                languagePractice: 'Leitura e Produção Textual',
                fieldsOfAction: 'Campo comunicativo',
                knowledgeObjects: 'Interpretação e Produção de Textos',
                courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // Ensino fundamental I
                disciplineId: '53ca155c-a3da-43c4-b280-4724a065471a', // Lingua Espanhola
                seriesId: '352a5857-193f-4672-9abf-c5302afd1c37', // 1º ano
                userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
                tenantId: self.crypto.randomUUID(),
            },
            {
                id: '626048f8-ccc6-4d84-880c-0c2b6029915f',
                code: 'EF01DH11PE',
                objective: 'Promover a compreensão e o respeito aos direitos humanos e à cidadania, incentivando a participação ativa e consciente na sociedade.',
                themathicUnit: 'Direitos Humanos e Cidadania',
                knowledgeArea: 'Ciências Humanas',
                languagePractice: 'Discussão e Reflexão',
                fieldsOfAction: 'Campo social',
                knowledgeObjects: 'Direitos e Deveres',
                courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // Ensino fundamental I
                disciplineId: '788cbb82-b429-4508-bd99-c25b33fd1d3c', // Direitos Humanos e Cidadania
                seriesId: '352a5857-193f-4672-9abf-c5302afd1c37', // 1º ano
                userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
                tenantId: self.crypto.randomUUID(),
            },
            {
                id: '85fed6be-e74c-4042-ade2-b70c9ca997f4',
                code: 'EF01ER10PE',
                objective: 'Compreender e respeitar as diversas manifestações religiosas, promovendo a tolerância e o diálogo inter-religioso.',
                themathicUnit: 'Religião e Sociedade',
                knowledgeArea: 'Ciências Humanas',
                languagePractice: 'Discussão e Reflexão',
                fieldsOfAction: 'Campo social',
                knowledgeObjects: 'Diversidade Religiosa',
                courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // Ensino fundamental I
                disciplineId: '6988e9d0-6b6b-44fe-adbe-7af90a8a0e27', // Ensino Religioso
                seriesId: '352a5857-193f-4672-9abf-c5302afd1c37', // 1º ano
                userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
                tenantId: self.crypto.randomUUID(),
            },
            {
                id: 'c1b58f5c-1be2-43a9-b4bd-6c2a115608cb',
                code: 'EF02CL11PE',
                objective: 'Desenvolver habilidades de leitura e produção textual, compreendendo e produzindo textos em diferentes gêneros e contextos.',
                themathicUnit: 'Leitura e Produção Textual',
                knowledgeArea: 'Linguagens',
                languagePractice: 'Leitura e Produção Textual',
                fieldsOfAction: 'Campo comunicativo',
                knowledgeObjects: 'Interpretação e Produção de Textos',
                courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // Ensino fundamental I
                disciplineId: 'ed5a57b7-828f-4737-bc78-ca919f0f833c', // Ciclo de Leitura e Produção Textual
                seriesId: '352a5857-193f-4672-9abf-c5302afd1c37', // 1º ano
                userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
                tenantId: self.crypto.randomUUID(),
            },
            {
                id: '9a9a8ded-8f0a-443b-9090-049e92904f7f',
                code: 'EF03IC12PE',
                objective: 'Desenvolver habilidades de investigação científica, compreendendo e aplicando métodos científicos em diferentes contextos.',
                themathicUnit: 'Iniciação Científica',
                knowledgeArea: 'Ciências da Natureza',
                languagePractice: 'Investigação e Experimentação',
                fieldsOfAction: 'Campo científico',
                knowledgeObjects: 'Métodos Científicos',
                courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // Ensino fundamental I
                disciplineId: '3e90c314-51bb-4482-af68-99bc04371281', // Iniciação Científica
                seriesId: '352a5857-193f-4672-9abf-c5302afd1c37', // 1º ano
                userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
                tenantId: self.crypto.randomUUID(),
            },
            {
                id: 'b5743aca-ba49-428e-8e2c-ee8f459fd686',
                code: 'EF01MA13PE',
                objective: 'Desenvolver habilidades de compreensão e aplicação de conceitos geométricos em diferentes contextos.',
                themathicUnit: 'Geometria',
                knowledgeArea: 'Matemática',
                languagePractice: 'Resolução de Problemas',
                fieldsOfAction: 'Campo matemático',
                knowledgeObjects: 'Conceitos Geométricos',
                courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // Ensino fundamental I
                disciplineId: '4ca48f5c-2987-4cab-9420-614d64d4d489', // Matematica
                seriesId: '352a5857-193f-4672-9abf-c5302afd1c37', // 1º ano
                userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
                tenantId: self.crypto.randomUUID(),
            },
            {
                id: '5dbaf0c3-24e2-4ee2-ad86-f3748fb2b497',
                code: 'EF05RO14PE',
                objective: 'Desenvolver habilidades de programação e robótica, compreendendo e aplicando conceitos de lógica e automação em diferentes contextos.',
                themathicUnit: 'Robótica',
                knowledgeArea: 'Tecnologia',
                languagePractice: 'Programação e Automação',
                fieldsOfAction: 'Campo tecnológico',
                knowledgeObjects: 'Conceitos de Robótica',
                courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // Ensino fundamental I
                disciplineId: 'd90ce4c2-2b1a-4cb2-b339-263f37f7363a', // Robótica
                seriesId: '352a5857-193f-4672-9abf-c5302afd1c37', // 1º ano
                userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
                tenantId: self.crypto.randomUUID(),
            },
            {
                id: '6fa00b38-fd00-4e66-bf61-d721cabebd30',
                code: 'EF06RL15PE',
                objective: 'Desenvolver habilidades de raciocínio lógico, compreendendo e aplicando conceitos de lógica em diferentes contextos.',
                themathicUnit: 'Raciocínio Lógico',
                knowledgeArea: 'Matemática',
                languagePractice: 'Resolução de Problemas',
                fieldsOfAction: 'Campo matemático',
                knowledgeObjects: 'Conceitos de Lógica',
                courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // Ensino fundamental I
                disciplineId: '2efd92b6-51fd-4f88-b036-0517ae40ee01', // Raciocínio Lógico
                seriesId: '352a5857-193f-4672-9abf-c5302afd1c37', // 1º ano
                userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
                tenantId: self.crypto.randomUUID(),
            },
            {
                id: '407675d2-b0ea-4a2a-ac32-640d4915cffe',
                code: 'EF07PV16PE',
                objective: 'Desenvolver habilidades de planejamento e organização pessoal, compreendendo a importância do projeto de vida.',
                themathicUnit: 'Projeto de Vida',
                knowledgeArea: 'Desenvolvimento Pessoal',
                languagePractice: 'Planejamento e Organização',
                fieldsOfAction: 'Campo pessoal',
                knowledgeObjects: 'Planejamento de Vida',
                courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // Ensino fundamental I
                disciplineId: '91fa3596-4de7-4a06-8aba-5465b81f8077', // Projeto de Vida
                seriesId: '352a5857-193f-4672-9abf-c5302afd1c37', // 1º ano
                userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
                tenantId: self.crypto.randomUUID(),
            },
            {
                id: '3ec7391b-2112-466e-a348-f178b69bc83b',
                code: 'EF08EF17PE',
                objective: 'Desenvolver habilidades de empreendedorismo e educação financeira, compreendendo a importância da gestão financeira pessoal.',
                themathicUnit: 'Empreendedorismo e Educação Financeira',
                knowledgeArea: 'Economia',
                languagePractice: 'Gestão Financeira',
                fieldsOfAction: 'Campo econômico',
                knowledgeObjects: 'Educação Financeira',
                courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // Ensino fundamental I
                disciplineId: '1e222b35-25da-430e-8bbf-03218baccbd7', // Empreendedorismo e Educação Financeira
                seriesId: '352a5857-193f-4672-9abf-c5302afd1c37', // 1º ano
                userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
                tenantId: self.crypto.randomUUID(),
            },
            {
                id: '51b8d59d-cf21-4ebe-98d8-7b6a3a1a07a3',
                code: 'EF09CI18PE',
                objective: 'Desenvolver habilidades de investigação científica, compreendendo e aplicando métodos científicos em diferentes contextos.',
                themathicUnit: 'Ciências',
                knowledgeArea: 'Ciências da Natureza',
                languagePractice: 'Investigação e Experimentação',
                fieldsOfAction: 'Campo científico',
                knowledgeObjects: 'Métodos Científicos',
                courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // Ensino fundamental I
                disciplineId: '5e34bc6d-37ce-49cd-905f-d0c002f42a96', // Ciências
                seriesId: '352a5857-193f-4672-9abf-c5302afd1c37', // 1º ano
                userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
                tenantId: self.crypto.randomUUID(),
            },
            {
                id: '3e63403d-655d-4e43-a4f4-a370fa79f50a',
                code: 'EF10AR19PE',
                objective: 'Desenvolver habilidades artísticas, compreendendo e aplicando técnicas de diferentes expressões artísticas.',
                themathicUnit: 'Artes',
                knowledgeArea: 'Artes',
                languagePractice: 'Expressão Artística',
                fieldsOfAction: 'Campo artístico',
                knowledgeObjects: 'Técnicas Artísticas',
                courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // Ensino fundamental I
                disciplineId: '9a7b90a1-feff-4a47-8224-0ab8352e090a', // Artes
                seriesId: '352a5857-193f-4672-9abf-c5302afd1c37', // 1º ano
                userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
                tenantId: self.crypto.randomUUID(),
            },
            {
                id: '75cbc517-ff2d-4dd3-9589-b54ffba77486',
                code: 'EF11HI20PE',
                objective: 'Desenvolver habilidades de compreensão histórica, analisando eventos e processos históricos em diferentes contextos.',
                themathicUnit: 'História',
                knowledgeArea: 'Ciências Humanas',
                languagePractice: 'Análise Histórica',
                fieldsOfAction: 'Campo histórico',
                knowledgeObjects: 'Eventos Históricos',
                courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // Ensino fundamental I
                disciplineId: '59f326bf-7a1f-4b66-9049-b7df572f901b', // História
                seriesId: '352a5857-193f-4672-9abf-c5302afd1c37', // 1º ano
                userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
                tenantId: self.crypto.randomUUID(),
            },
            {
                id: '97623bfd-fe3c-4c68-80dd-c622312ad921',
                code: 'EF12GE21PE',
                objective: 'Desenvolver habilidades de compreensão geográfica, analisando o espaço geográfico e suas interações em diferentes contextos.',
                themathicUnit: 'Geografia',
                knowledgeArea: 'Ciências Humanas',
                languagePractice: 'Análise Geográfica',
                fieldsOfAction: 'Campo geográfico',
                knowledgeObjects: 'Espaço Geográfico',
                courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // Ensino fundamental I
                disciplineId: '9747133a-8225-4eaf-9a88-40ca56f94698', // Geografia
                seriesId: '352a5857-193f-4672-9abf-c5302afd1c37', // 1º ano
                userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
                tenantId: self.crypto.randomUUID(),
            },
            {
                id: 'f17a37de-e7b1-4aa4-94dc-d1d7c763f3fe',
                code: 'EF13EF22PE',
                objective: 'Desenvolver habilidades de educação física, compreendendo a importância da atividade física para a saúde e bem-estar.',
                themathicUnit: 'Educação Física',
                knowledgeArea: 'Saúde',
                languagePractice: 'Atividade Física',
                fieldsOfAction: 'Campo esportivo',
                knowledgeObjects: 'Saúde e Bem-estar',
                courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // Ensino fundamental I
                disciplineId: '9825f111-81f3-4f34-ab36-7a30387d0c14', // Educação Física
                seriesId: '352a5857-193f-4672-9abf-c5302afd1c37', // 1º ano
                userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
                tenantId: self.crypto.randomUUID(),
            },
            {
                id: '754f886b-f3be-4b8c-9c46-b36b2daf9723',
                code: 'EF13LI22PE',
                objective: 'Desenvolver habilidades de lingua inglesa, compreendendo a importância da atividade linguisticas.',
                themathicUnit: 'Língua Inglesa',
                knowledgeArea: 'Linguagem',
                languagePractice: 'Atividade de comunicação',
                fieldsOfAction: 'Linguagem',
                knowledgeObjects: 'Comunicação',
                courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // Ensino fundamental I
                disciplineId: 'c7c08355-9bd8-405b-87c6-4b99b75ff1f9', // Língua Inglesa
                seriesId: '352a5857-193f-4672-9abf-c5302afd1c37', // 1º ano
                userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
                tenantId: self.crypto.randomUUID(),
            },
        ],
        skipDuplicates: true
    })

    const contents = await prisma.content.createMany({
        data: [
            {
                id: '00b669ae-fe91-461f-87c6-3a836eef6623',
                date: new Date('2025-03-12'),
                description: 'Leitura e interpretação textual nas páginas 14, 15 e 16 do livro didático, seguido de resumo básico escrito em inglês com auxílio do dicionário tradutor.',
                classroomId: '0c086508-d50b-49b6-afce-0c146643129d', // 1º Ano A
                teacherId: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor (Yohan professor)
                userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
                tenantId: '5f04059c-69d4-44dd-b228-3a5ebdda6d22', // from Better Auth
            }
        ],
        skipDuplicates: true
    })

    const contentDiscipline = await prisma.contentDiscipline.createMany({
        data: [
            {
                contentId: '00b669ae-fe91-461f-87c6-3a836eef6623',
                disciplineId: '6862a800-92c3-4d46-8740-62a02a5e5cf9', // Língua Portuguesa
            },
            {
                contentId: '00b669ae-fe91-461f-87c6-3a836eef6623',
                disciplineId: '4ca48f5c-2987-4cab-9420-614d64d4d489', // Matemática
            },
        ],
        skipDuplicates: true
    });

    const contentBncc = await prisma.contentBncc.createMany({
        data: [
            {
                contentId: '00b669ae-fe91-461f-87c6-3a836eef6623',
                bnccId: '15eb2a81-3c3a-4c75-95b8-082d0ccf4b14', // bncc Língua Portuguesa
            },
            {
                contentId: '00b669ae-fe91-461f-87c6-3a836eef6623',
                bnccId: 'b5743aca-ba49-428e-8e2c-ee8f459fd686', // Matemática
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
