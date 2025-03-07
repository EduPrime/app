import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const bnccs = await prisma.bncc.createMany({
        data: [
            {
                id: '006d4da3-f7a5-4cab-b83e-e3b25002ea1a',
                code: 'EF35LP22PE',
                objective: 'Perceber diálogos em textos narrativos, observando o efeito de sentido de verbos de enunciação, marcas linguísticas e, se for o caso, o uso de variedades linguísticas no discurso direto, e sua relevância para a construção de sentidos dos textos.',
                themathicUnit: 'Unidade temática 2',
                knowledgeArea: 'Area 1',
                languagePractice: 'Leitura/escuta (compartilhada e autônoma)',
                fieldsOfAction: 'Campo artístico-literário',
                knowledgeObjects: 'Formação do leitor literário/ Leitura multissemiótica',
                courseId: '0e2833bf-6ef1-4bb0-b83a-b036fc04cac6', // ensino fundamental II
                disciplineId: 'a01f22f6-d792-48e8-9324-8baee795476b', // Língua Portuguesa
                seriesId: '1ba89502-452c-478a-a60c-23bdc6d59214', // 5º ano
                userCreated: '49eabcc1-5e6f-4ab7-a0a3-b9b5e08e1f65', // Yohan professor
                tenantId: self.crypto.randomUUID(),
            },
            {
                id: '00857cf3-6d75-4891-bf8d-c8a78aa185b7',
                code: 'EF05MA16PE',
                objective: 'Associar figuras espaciais a suas planificações (prismas, pirâmides, cilindros e cones) e analisar, nomear e comparar seus atributos, utilizando e/ou recursos tecnológicos.',
                themathicUnit: 'GEOMETRIA',
                knowledgeArea: 'Area 2',
                languagePractice: 'Practice 2',
                fieldsOfAction: 'Field 2',
                knowledgeObjects: 'Object 2',
                courseId: '0e2833bf-6ef1-4bb0-b83a-b036fc04cac6', // Ensino fundamental II
                disciplineId: '19d97987-e2da-4a3a-8a95-35f2772e6e62', // Matemática
                seriesId: '1ba89502-452c-478a-a60c-23bdc6d59214', // 5º ano
                userCreated: '49eabcc1-5e6f-4ab7-a0a3-b9b5e08e1f65', // Yohan professor
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
                disciplineId: 'a01f22f6-d792-48e8-9324-8baee795476b', // Lingua Espanhola
                seriesId: '352a5857-193f-4672-9abf-c5302afd1c37', // 1º ano
                userCreated: '49eabcc1-5e6f-4ab7-a0a3-b9b5e08e1f65', // Yohan professor
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
                disciplineId: '665c6577-9cc7-44ad-a654-6cd6b099cf47', // Direitos Humanos e Cidadania
                seriesId: '352a5857-193f-4672-9abf-c5302afd1c37', // 1º ano
                userCreated: '49eabcc1-5e6f-4ab7-a0a3-b9b5e08e1f65', // Yohan professor
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
                disciplineId: '85fed6be-e74c-4042-ade2-b70c9ca997f4', // Ensino Religioso
                seriesId: '352a5857-193f-4672-9abf-c5302afd1c37', // 1º ano
                userCreated: '49eabcc1-5e6f-4ab7-a0a3-b9b5e08e1f65', // Yohan professor
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
                disciplineId: 'c1b58f5c-1be2-43a9-b4bd-6c2a115608cb', // Ciclo de Leitura e Produção Textual
                seriesId: '352a5857-193f-4672-9abf-c5302afd1c37', // 1º ano
                userCreated: '49eabcc1-5e6f-4ab7-a0a3-b9b5e08e1f65', // Yohan professor
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
                disciplineId: '9a9a8ded-8f0a-443b-9090-049e92904f7f', // Iniciação Científica
                seriesId: '352a5857-193f-4672-9abf-c5302afd1c37', // 1º ano
                userCreated: '49eabcc1-5e6f-4ab7-a0a3-b9b5e08e1f65', // Yohan professor
                tenantId: self.crypto.randomUUID(),
            },
            {
                id: 'b5743aca-ba49-428e-8e2c-ee8f459fd686',
                code: 'EF04GE13PE',
                objective: 'Desenvolver habilidades de compreensão e aplicação de conceitos geométricos em diferentes contextos.',
                themathicUnit: 'Geometria',
                knowledgeArea: 'Matemática',
                languagePractice: 'Resolução de Problemas',
                fieldsOfAction: 'Campo matemático',
                knowledgeObjects: 'Conceitos Geométricos',
                courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // Ensino fundamental I
                disciplineId: 'b5743aca-ba49-428e-8e2c-ee8f459fd686', // Geometria
                seriesId: '352a5857-193f-4672-9abf-c5302afd1c37', // 1º ano
                userCreated: '49eabcc1-5e6f-4ab7-a0a3-b9b5e08e1f65', // Yohan professor
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
                disciplineId: '5dbaf0c3-24e2-4ee2-ad86-f3748fb2b497', // Robótica
                seriesId: '352a5857-193f-4672-9abf-c5302afd1c37', // 1º ano
                userCreated: '49eabcc1-5e6f-4ab7-a0a3-b9b5e08e1f65', // Yohan professor
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
                disciplineId: '6fa00b38-fd00-4e66-bf61-d721cabebd30', // Raciocínio Lógico
                seriesId: '352a5857-193f-4672-9abf-c5302afd1c37', // 1º ano
                userCreated: '49eabcc1-5e6f-4ab7-a0a3-b9b5e08e1f65', // Yohan professor
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
                disciplineId: '407675d2-b0ea-4a2a-ac32-640d4915cffe', // Projeto de Vida
                seriesId: '352a5857-193f-4672-9abf-c5302afd1c37', // 1º ano
                userCreated: '49eabcc1-5e6f-4ab7-a0a3-b9b5e08e1f65', // Yohan professor
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
                disciplineId: '3ec7391b-2112-466e-a348-f178b69bc83b', // Empreendedorismo e Educação Financeira
                seriesId: '352a5857-193f-4672-9abf-c5302afd1c37', // 1º ano
                userCreated: '49eabcc1-5e6f-4ab7-a0a3-b9b5e08e1f65', // Yohan professor
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
                disciplineId: '51b8d59d-cf21-4ebe-98d8-7b6a3a1a07a3', // Ciências
                seriesId: '352a5857-193f-4672-9abf-c5302afd1c37', // 1º ano
                userCreated: '49eabcc1-5e6f-4ab7-a0a3-b9b5e08e1f65', // Yohan professor
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
                disciplineId: '3e63403d-655d-4e43-a4f4-a370fa79f50a', // Artes
                seriesId: '352a5857-193f-4672-9abf-c5302afd1c37', // 1º ano
                userCreated: '49eabcc1-5e6f-4ab7-a0a3-b9b5e08e1f65', // Yohan professor
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
                disciplineId: '75cbc517-ff2d-4dd3-9589-b54ffba77486', // História
                seriesId: '352a5857-193f-4672-9abf-c5302afd1c37', // 1º ano
                userCreated: '49eabcc1-5e6f-4ab7-a0a3-b9b5e08e1f65', // Yohan professor
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
                disciplineId: '97623bfd-fe3c-4c68-80dd-c622312ad921', // Geografia
                seriesId: '352a5857-193f-4672-9abf-c5302afd1c37', // 1º ano
                userCreated: '49eabcc1-5e6f-4ab7-a0a3-b9b5e08e1f65', // Yohan professor
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
                disciplineId: 'f17a37de-e7b1-4aa4-94dc-d1d7c763f3fe', // Educação Física
                seriesId: '352a5857-193f-4672-9abf-c5302afd1c37', // 1º ano
                userCreated: '49eabcc1-5e6f-4ab7-a0a3-b9b5e08e1f65', // Yohan professor
                tenantId: self.crypto.randomUUID(),
            },
            {
                id: '50f5d8aa-1598-4864-97c2-5780615b3d7d',
                code: 'EF14GE23PE',
                objective: 'Desenvolver habilidades gerais, compreendendo e aplicando conhecimentos de diferentes áreas em contextos variados.',
                themathicUnit: 'Geral',
                knowledgeArea: 'Interdisciplinar',
                languagePractice: 'Aplicação de Conhecimentos',
                fieldsOfAction: 'Campo geral',
                knowledgeObjects: 'Conhecimentos Gerais',
                courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // Ensino fundamental I
                disciplineId: '50f5d8aa-1598-4864-97c2-5780615b3d7d', // Geral
                seriesId: '352a5857-193f-4672-9abf-c5302afd1c37', // 1º ano
                userCreated: '49eabcc1-5e6f-4ab7-a0a3-b9b5e08e1f65', // Yohan professor
                tenantId: self.crypto.randomUUID(),
            },
        ],
        skipDuplicates: true
    })

    // const contents = await prisma.content.createMany({
    //     data: [
    //         {
    //             id: '00b669ae-fe91-461f-87c6-3a836eef6623',
    //             date: new Date('2025-02-24'),
    //             description: 'Leitura e interpretação textual nas páginas 14, 15 e 16 do livro didático, seguido de resumo básico escrito em inglês com auxílio do dicionário tradutor.',
    //             classroomId: '0c086508-d50b-49b6-afce-0c146643129d', // 1º Ano A
    //             // disciplineId: '07786f72-728f-4046-8d75-337841c57bd8', // Língua Portuguesa
    //             teacherId: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', // Paulo de paula (Yohan User)
    //             userCreated: '49eabcc1-5e6f-4ab7-a0a3-b9b5e08e1f65', // Yohan professor
    //             tenantId: '5f04059c-69d4-44dd-b228-3a5ebdda6d22', // from Better Auth
    //         }
    //     ],
    //     skipDuplicates: true
    // })

    // const contentDiscipline = await prisma.contentDiscipline.createMany({
    //     data: [
    //         {
    //             contentId: '00b669ae-fe91-461f-87c6-3a836eef6623',
    //             disciplineId: '07786f72-728f-4046-8d75-337841c57bd8', // Língua Portuguesa
    //         },
    //         {
    //             contentId: '00b669ae-fe91-461f-87c6-3a836eef6623',
    //             disciplineId: '19d97987-e2da-4a3a-8a95-35f2772e6e62', // Matemática
    //         },
    //     ],
    //     skipDuplicates: true
    // });

    // const contentBncc = await prisma.contentBncc.createMany({
    //     data: [
    //         {
    //             contentId: '00b669ae-fe91-461f-87c6-3a836eef6623',
    //             bnccId: '006d4da3-f7a5-4cab-b83e-e3b25002ea1a', // Língua Portuguesa
    //         },
    //         {
    //             contentId: '00b669ae-fe91-461f-87c6-3a836eef6623',
    //             bnccId: '00857cf3-6d75-4891-bf8d-c8a78aa185b7', // Matemática
    //         },
    //     ],
    //     skipDuplicates: true
    // });

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
