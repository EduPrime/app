import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.bncc.createMany({
    data: [
      {
        id: '1a441433-319e-4c60-b0f9-139f413ccc28',
        code: 'EF04EE01PE',
        objective:
          'Desenvolver habilidades de empreendedorismo e educação financeira, promovendo a autonomia e a gestão responsável de recursos.',
        themathicUnit: 'Empreendedorismo e Educação Financeira',
        knowledgeArea: 'Área de Ciências Humanas',
        languagePractice: 'Prática interdisciplinar',
        fieldsOfAction: 'Campo social e econômico',
        knowledgeObjects: 'Planejamento financeiro e empreendedorismo',
        courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // ensino fundamental I
        disciplineId: '1e222b35-25da-430e-8bbf-03218baccbd7', // Empreendedorismo e Educação Financeira
        seriesId: 'd131b737-72ff-4c5c-9fd6-1dbd810b5cce', // 4º Ano
        userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
        tenantId: self.crypto.randomUUID(),
      },
      {
        id: 'eebe8d98-98b7-47b8-a305-2e371a2ea73a',
        code: 'EF04RL01PE',
        objective:
          'Desenvolver o raciocínio lógico por meio de desafios e problemas matemáticos, promovendo a resolução criativa e analítica.',
        themathicUnit: 'Raciocínio Lógico',
        knowledgeArea: 'Área de Matemática',
        languagePractice: 'Resolução de problemas',
        fieldsOfAction: 'Campo lógico-matemático',
        knowledgeObjects: 'Estratégias de resolução de problemas',
        courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // ensino fundamental I
        disciplineId: '2efd92b6-51fd-4f88-b036-0517ae40ee01', // Raciocínio Lógico
        seriesId: 'd131b737-72ff-4c5c-9fd6-1dbd810b5cce', // 4º Ano
        userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
        tenantId: self.crypto.randomUUID(),
      },
      {
        id: '3493064f-3e8b-4511-a2aa-37120aac3ace',
        code: 'EF04IC01PE',
        objective: 'Estimular a curiosidade científica e a investigação por meio de projetos e experimentos.',
        themathicUnit: 'Iniciação Científica',
        knowledgeArea: 'Área de Ciências Naturais',
        languagePractice: 'Investigação científica',
        fieldsOfAction: 'Campo científico',
        knowledgeObjects: 'Método científico e experimentação',
        courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // ensino fundamental I
        disciplineId: '3e90c314-51bb-4482-af68-99bc04371281', // Iniciação Científica
        seriesId: 'd131b737-72ff-4c5c-9fd6-1dbd810b5cce', // 4º Ano
        userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
        tenantId: self.crypto.randomUUID(),
      },
      {
        id: 'bfec2496-a135-4a7d-8147-f6be6c39bd84',
        code: 'EF04MT01PE',
        objective: 'Desenvolver habilidades matemáticas fundamentais, como operações básicas e resolução de problemas.',
        themathicUnit: 'Matemática',
        knowledgeArea: 'Área de Matemática',
        languagePractice: 'Resolução de problemas',
        fieldsOfAction: 'Campo lógico-matemático',
        knowledgeObjects: 'Operações básicas e conceitos matemáticos',
        courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // ensino fundamental I
        disciplineId: '4ca48f5c-2987-4cab-9420-614d64d4d489', // Matemática
        seriesId: 'd131b737-72ff-4c5c-9fd6-1dbd810b5cce', // 4º Ano
        userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
        tenantId: self.crypto.randomUUID(),
      },
      {
        id: '99d88443-33b2-4dae-93bd-2cdb322f16f1',
        code: 'EF04LE01PE',
        objective:
          'Desenvolver habilidades de comunicação em Língua Espanhola, promovendo a compreensão e expressão oral e escrita.',
        themathicUnit: 'Língua Espanhola',
        knowledgeArea: 'Área de Linguagens',
        languagePractice: 'Comunicação oral e escrita',
        fieldsOfAction: 'Campo linguístico',
        knowledgeObjects: 'Vocabulário e gramática básica',
        courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // ensino fundamental I
        disciplineId: '53ca155c-a3da-43c4-b280-4724a065471a', // Língua Espanhola
        seriesId: 'd131b737-72ff-4c5c-9fd6-1dbd810b5cce', // 4º Ano
        userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
        tenantId: self.crypto.randomUUID(),
      },
      {
        id: 'b0d514e6-0371-4000-84af-992449fcc2ce',
        code: 'EF04HI01PE',
        objective: 'Compreender os principais eventos históricos e sua influência na sociedade atual.',
        themathicUnit: 'História',
        knowledgeArea: 'Área de Ciências Humanas',
        languagePractice: 'Análise histórica',
        fieldsOfAction: 'Campo histórico',
        knowledgeObjects: 'Eventos históricos e suas consequências',
        courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // ensino fundamental I
        disciplineId: '59f326bf-7a1f-4b66-9049-b7df572f901b', // História
        seriesId: 'd131b737-72ff-4c5c-9fd6-1dbd810b5cce', // 4º Ano
        userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
        tenantId: self.crypto.randomUUID(),
      },
      {
        id: '87ad9fba-d07c-4038-8f4a-a713ebe6bd04',
        code: 'EF04CI01PE',
        objective: 'Explorar conceitos básicos de ciências, promovendo a curiosidade e o pensamento crítico.',
        themathicUnit: 'Ciências',
        knowledgeArea: 'Área de Ciências Naturais',
        languagePractice: 'Investigação científica',
        fieldsOfAction: 'Campo científico',
        knowledgeObjects: 'Conceitos básicos de ciências naturais',
        courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // ensino fundamental I
        disciplineId: '5e34bc6d-37ce-49cd-905f-d0c002f42a96', // Ciências
        seriesId: 'd131b737-72ff-4c5c-9fd6-1dbd810b5cce', // 4º Ano
        userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
        tenantId: self.crypto.randomUUID(),
      },
      {
        id: '67ed4bf0-18e1-42b2-9047-e7c513a34945',
        code: 'EF04LP01PE',
        objective:
          'Desenvolver habilidades de leitura e escrita em Língua Portuguesa, promovendo a interpretação e produção textual.',
        themathicUnit: 'Língua Portuguesa',
        knowledgeArea: 'Área de Linguagens',
        languagePractice: 'Leitura e escrita',
        fieldsOfAction: 'Campo linguístico',
        knowledgeObjects: 'Interpretação e produção textual',
        courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // ensino fundamental I
        disciplineId: '6862a800-92c3-4d46-8740-62a02a5e5cf9', // Língua Portuguesa
        seriesId: 'd131b737-72ff-4c5c-9fd6-1dbd810b5cce', // 4º Ano
        userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
        tenantId: self.crypto.randomUUID(),
      },
      {
        id: 'bd574c7d-5b0c-4316-bf74-d5d947674d63',
        code: 'EF04ER01PE',
        objective: 'Promover a reflexão sobre valores éticos e religiosos, respeitando a diversidade cultural.',
        themathicUnit: 'Ensino Religioso',
        knowledgeArea: 'Área de Ciências Humanas',
        languagePractice: 'Reflexão ética e religiosa',
        fieldsOfAction: 'Campo ético-religioso',
        knowledgeObjects: 'Valores éticos e diversidade cultural',
        courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // ensino fundamental I
        disciplineId: '6988e9d0-6b6b-44fe-adbe-7af90a8a0e27', // Ensino Religioso
        seriesId: 'd131b737-72ff-4c5c-9fd6-1dbd810b5cce', // 4º Ano
        userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
        tenantId: self.crypto.randomUUID(),
      },
      {
        id: '3a566281-8a57-48a8-aae8-1d129a6f8a4f',
        code: 'EF04DH01PE',
        objective:
          'Promover a compreensão dos direitos humanos e da cidadania, incentivando o respeito e a convivência harmoniosa.',
        themathicUnit: 'Direitos Humanos e Cidadania',
        knowledgeArea: 'Área de Ciências Humanas',
        languagePractice: 'Reflexão ética e cidadã',
        fieldsOfAction: 'Campo social e ético',
        knowledgeObjects: 'Direitos humanos e cidadania',
        courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94',
        disciplineId: '788cbb82-b429-4508-bd99-c25b33fd1d3c',
        seriesId: 'd131b737-72ff-4c5c-9fd6-1dbd810b5cce',
        userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65',
        tenantId: self.crypto.randomUUID(),
      },
      {
        id: '2d8b92be-6f9c-41b7-b962-bc45c8c79a42',
        code: 'EF04PV01PE',
        objective:
          'Estimular a construção de um projeto de vida, promovendo o autoconhecimento e a definição de metas pessoais.',
        themathicUnit: 'Projeto de Vida',
        knowledgeArea: 'Área de Ciências Humanas',
        languagePractice: 'Planejamento pessoal',
        fieldsOfAction: 'Campo pessoal e social',
        knowledgeObjects: 'Autoconhecimento e metas pessoais',
        courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94',
        disciplineId: '91fa3596-4de7-4a06-8aba-5465b81f8077',
        seriesId: 'd131b737-72ff-4c5c-9fd6-1dbd810b5cce',
        userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65',
        tenantId: self.crypto.randomUUID(),
      },
      {
        id: '72d92804-f719-494b-a3bf-ab70ce48fc64',
        code: 'EF04GE01PE',
        objective:
          'Compreender os conceitos básicos de geografia, como localização e paisagem, e sua relação com o espaço vivido.',
        themathicUnit: 'Geografia',
        knowledgeArea: 'Área de Ciências Humanas',
        languagePractice: 'Análise geográfica',
        fieldsOfAction: 'Campo geográfico',
        knowledgeObjects: 'Localização e paisagem',
        courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94',
        disciplineId: '9747133a-8225-4eaf-9a88-40ca56f94698',
        seriesId: 'd131b737-72ff-4c5c-9fd6-1dbd810b5cce',
        userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65',
        tenantId: self.crypto.randomUUID(),
      },
      {
        id: '0042fba7-4725-44f4-9dd5-0b95446fb1ad',
        code: 'EF04EF01PE',
        objective: 'Promover a prática de atividades físicas, incentivando hábitos saudáveis e o trabalho em equipe.',
        themathicUnit: 'Educação Física',
        knowledgeArea: 'Área de Linguagens',
        languagePractice: 'Prática corporal',
        fieldsOfAction: 'Campo esportivo e social',
        knowledgeObjects: 'Atividades físicas e hábitos saudáveis',
        courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94',
        disciplineId: '9825f111-81f3-4f34-ab36-7a30387d0c14',
        seriesId: 'd131b737-72ff-4c5c-9fd6-1dbd810b5cce',
        userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65',
        tenantId: self.crypto.randomUUID(),
      },
      {
        id: '958ae3b0-49f3-43bb-8b75-9da2f30ec483',
        code: 'EF04AR01PE',
        objective: 'Estimular a criatividade e a expressão artística por meio de diferentes linguagens e técnicas.',
        themathicUnit: 'Artes',
        knowledgeArea: 'Área de Linguagens',
        languagePractice: 'Expressão artística',
        fieldsOfAction: 'Campo cultural e artístico',
        knowledgeObjects: 'Linguagens e técnicas artísticas',
        courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94',
        disciplineId: '9a7b90a1-feff-4a47-8224-0ab8352e090a',
        seriesId: 'd131b737-72ff-4c5c-9fd6-1dbd810b5cce',
        userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65',
        tenantId: self.crypto.randomUUID(),
      },
      {
        id: '95d81e53-5af4-48ff-9494-5dab190665bc',
        code: 'EF04GM01PE',
        objective: 'Desenvolver o raciocínio espacial e a compreensão de formas geométricas no cotidiano.',
        themathicUnit: 'Geometria',
        knowledgeArea: 'Área de Matemática',
        languagePractice: 'Raciocínio espacial',
        fieldsOfAction: 'Campo lógico-matemático',
        knowledgeObjects: 'Formas geométricas e suas propriedades',
        courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94',
        disciplineId: 'c030869a-3b07-4f7d-b11d-69765af91f9a',
        seriesId: 'd131b737-72ff-4c5c-9fd6-1dbd810b5cce',
        userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65',
        tenantId: self.crypto.randomUUID(),
      },
      {
        id: '378ff75b-89d7-4f2a-a465-346a738a8954',
        code: 'EF04LI01PE',
        objective:
          'Desenvolver habilidades de comunicação em Língua Inglesa, promovendo a compreensão e expressão oral e escrita.',
        themathicUnit: 'Língua Inglesa',
        knowledgeArea: 'Área de Linguagens',
        languagePractice: 'Comunicação oral e escrita',
        fieldsOfAction: 'Campo linguístico',
        knowledgeObjects: 'Vocabulário e gramática básica',
        courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94',
        disciplineId: 'c7c08355-9bd8-405b-87c6-4b99b75ff1f9',
        seriesId: 'd131b737-72ff-4c5c-9fd6-1dbd810b5cce',
        userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65',
        tenantId: self.crypto.randomUUID(),
      },
      {
        id: '79580bfd-7e15-4b60-9045-1dd1943da48b',
        code: 'EF04RB01PE',
        objective: 'Estimular o pensamento lógico e a criatividade por meio da construção de projetos de robótica.',
        themathicUnit: 'Robótica',
        knowledgeArea: 'Área de Ciências Exatas',
        languagePractice: 'Construção e programação',
        fieldsOfAction: 'Campo tecnológico',
        knowledgeObjects: 'Conceitos básicos de robótica',
        courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94',
        disciplineId: 'd90ce4c2-2b1a-4cb2-b339-263f37f7363a',
        seriesId: 'd131b737-72ff-4c5c-9fd6-1dbd810b5cce',
        userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65',
        tenantId: self.crypto.randomUUID(),
      },
      {
        id: '9e97852a-7ba0-41f0-99cf-3ab6c5a1a2fd',
        code: 'EF04CL01PE',
        objective: 'Promover a leitura e a produção textual por meio de ciclos de leitura e escrita.',
        themathicUnit: 'Ciclo de Leitura e Produção Textual',
        knowledgeArea: 'Área de Linguagens',
        languagePractice: 'Leitura e produção textual',
        fieldsOfAction: 'Campo linguístico',
        knowledgeObjects: 'Estratégias de leitura e escrita',
        courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94',
        disciplineId: 'ed5a57b7-828f-4737-bc78-ca919f0f833c',
        seriesId: 'd131b737-72ff-4c5c-9fd6-1dbd810b5cce',
        userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65',
        tenantId: self.crypto.randomUUID(),
      },
    ],
    skipDuplicates: true,
  })

  // console.log('Seed data created successfully!', _bnccs);
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
