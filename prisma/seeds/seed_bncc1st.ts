import process from 'node:process'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.bncc.createMany({
    data: [
      {
        id: '001b6e3d-1a2c-4f7d-9f8f-5b6a5c3b9c1d',
        code: 'EF01LP01PE',
        objective: `Reconhecer que textos são lidos e escritos da esquerda 
                para a direita e de cima para baixo da página, em situações 
                significativas, percebendo a relação da leitura para a vida`,
        themathicUnit: 'Leitura/Escuta',
        knowledgeArea: 'Língua Portuguesa',
        languagePractice: 'Leitura/Escuta',
        fieldsOfAction: 'Todos os campos de atuação',
        knowledgeObjects: 'Protocolos de leitura',

        courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // ensino fundamental I
        disciplineId: '6862a800-92c3-4d46-8740-62a02a5e5cf9', // Matemática
        seriesId: '352a5857-193f-4672-9abf-c5302afd1c37', // 5º ano
        userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
        tenantId: globalThis.crypto.randomUUID(),
      },
      {
        id: globalThis.crypto.randomUUID(),
        code: 'EF12LP01PE',
        objective: `Ler palavras novas em pequenos textos, com precisão 
                na decodificação e compreensão, no caso de palavras de uso 
                frequente, ler globalmente, por memorização em práticas de linguagem 
                situadas (texto de tradição oral como cantigas regionais e nacionais, 
                poemas, letras de músicas etc.), que proporcione a reflexão sobre o 
                sistema de escrita`,
        themathicUnit: 'Leitura/Escuta',
        knowledgeArea: 'Língua Portuguesa',
        languagePractice: 'Leitura/Escuta',
        fieldsOfAction: 'Todos os campos de atuação',
        knowledgeObjects: 'Decodificação/Compreensão de leitura',
        courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // ensino fundamental I
        disciplineId: '6862a800-92c3-4d46-8740-62a02a5e5cf9', // Matemática
        seriesId: '352a5857-193f-4672-9abf-c5302afd1c37', // 5º ano
        userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
        tenantId: globalThis.crypto.randomUUID(),
      },
      {
        id: globalThis.crypto.randomUUID(),
        code: 'EF12LP02PE',
        objective: `Buscar, selecionar e ler, com a mediação do professor 
                    (leitura compartilhada), textos que circulam em meios impressos ou 
                    digitais, de acordo com as necessidades e interesses.`,
        themathicUnit: 'Leitura/Escuta',
        knowledgeArea: 'Língua Portuguesa',
        languagePractice: 'Leitura/Escuta',
        fieldsOfAction: 'Todos os campos de atuação',
        knowledgeObjects: 'Formação de leitor',
        courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // ensino fundamental I
        disciplineId: '6862a800-92c3-4d46-8740-62a02a5e5cf9',
        seriesId: '352a5857-193f-4672-9abf-c5302afd1c37',
        userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
        tenantId: globalThis.crypto.randomUUID(),
      },
      {
        id: globalThis.crypto.randomUUID(),
        code: 'EF15LP01PE',
        objective: `Identificar a função social de textos que circulam no 
                    cotidiano, nas mídias impressa, de massa e digital, reconhecendo para 
                    que foram produzidos, onde circulam, quem os produziu e a quem se 
                    destinam e que os gêneros possuem funções sociais relacionadas aos 
                    campos de atuação nos quais circulam.`,
        themathicUnit: 'Leitura/Escuta',
        knowledgeArea: 'Língua Portuguesa',
        languagePractice: 'Leitura/Escuta',
        fieldsOfAction: 'Todos os campos de atuação',
        knowledgeObjects: 'Reconstrução das condições de produção e recepção de textos',
        courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // ensino fundamental I
        disciplineId: '6862a800-92c3-4d46-8740-62a02a5e5cf9',
        seriesId: '352a5857-193f-4672-9abf-c5302afd1c37',
        userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
        tenantId: globalThis.crypto.randomUUID(),
      },
      {
        id: globalThis.crypto.randomUUID(),
        code: 'EF15LP02PE',
        objective: `Estabelecer expectativas em relação à leitura 
                    (pressuposições antecipadoras dos sentidos, da forma e da função 
                    social do texto), apoiando-se em seus conhecimentos prévios sobre as 
                    condições de produção e recepção desse texto, o gênero, o suporte, o 
                    assunto, bem como sobre recursos gráficos, imagens, dados da própria 
                    obra (índice, prefácio etc.), confirmando antecipações e inferências 
                    realizadas antes e durante a leitura de textos, checando a adequação 
                    das hipóteses realizadas`,
        themathicUnit: 'Leitura/Escuta',
        knowledgeArea: 'Língua Portuguesa',
        languagePractice: 'Leitura/Escuta',
        fieldsOfAction: 'Todos os campos de atuação',
        knowledgeObjects: 'Estratégias de leitura',
        courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // ensino fundamental I
        disciplineId: '6862a800-92c3-4d46-8740-62a02a5e5cf9',
        seriesId: '352a5857-193f-4672-9abf-c5302afd1c37',
        userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
        tenantId: globalThis.crypto.randomUUID(),
      },
      {
        id: globalThis.crypto.randomUUID(),
        code: 'EF15LP03PE',
        objective: `Localizar informações explícitas em diferentes gêneros 
                    lidos, ouvidos e/ou sinalizados.`,
        themathicUnit: 'Leitura/Escuta',
        knowledgeArea: 'Língua Portuguesa',
        languagePractice: 'Leitura/Escuta',
        fieldsOfAction: 'Todos os campos de atuação',
        knowledgeObjects: 'Estratégias de leitura',
        courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // ensino fundamental I
        disciplineId: '6862a800-92c3-4d46-8740-62a02a5e5cf9',
        seriesId: '352a5857-193f-4672-9abf-c5302afd1c37',
        userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
        tenantId: globalThis.crypto.randomUUID(),
      },
      {
        id: globalThis.crypto.randomUUID(),
        code: 'EF15LP04PE',
        objective: `Identificar o efeito de sentido produzido pelo uso de 
                    recursos expressivos e gráficos visuais (letra capitular, negrito, itálico, 
                    som em movimento, cores e imagens, etc.), em textos multissemióticos 
                    e multimodais.`,
        themathicUnit: 'Leitura/Escuta',
        knowledgeArea: 'Língua Portuguesa',
        languagePractice: 'Leitura/Escuta',
        fieldsOfAction: 'Todos os campos de atuação',
        knowledgeObjects: 'Estratégias de leitura',
        courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // ensino fundamental I
        disciplineId: '6862a800-92c3-4d46-8740-62a02a5e5cf9',
        seriesId: '352a5857-193f-4672-9abf-c5302afd1c37',
        userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
        tenantId: globalThis.crypto.randomUUID(),
      },
      {
        id: globalThis.crypto.randomUUID(),
        code: 'EF12LPX01PE',
        objective: `Inferir informações implícitas em textos lidos, ouvidos 
                    e/ou sinalizados`,
        themathicUnit: 'Leitura/Escuta',
        knowledgeArea: 'Língua Portuguesa',
        languagePractice: 'Leitura/Escuta',
        fieldsOfAction: 'Todos os campos de atuação',
        knowledgeObjects: 'Estratégias de leitura',
        courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // ensino fundamental I
        disciplineId: '6862a800-92c3-4d46-8740-62a02a5e5cf9',
        seriesId: '352a5857-193f-4672-9abf-c5302afd1c37',
        userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
        tenantId: globalThis.crypto.randomUUID(),
      },
      {
        id: globalThis.crypto.randomUUID(),
        code: 'EF12LPW02PE',
        objective: `Inferir o sentido de palavras de acordo com o 
                    contexto, em textos lidos e/ou ouvidos.`,
        themathicUnit: 'Leitura/Escuta',
        knowledgeArea: 'Língua Portuguesa',
        languagePractice: 'Leitura/Escuta',
        fieldsOfAction: 'Todos os campos de atuação',
        knowledgeObjects: 'Estratégias de leitura',
        courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // ensino fundamental I
        disciplineId: '6862a800-92c3-4d46-8740-62a02a5e5cf9',
        seriesId: '352a5857-193f-4672-9abf-c5302afd1c37',
        userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
        tenantId: globalThis.crypto.randomUUID(),
      },
      {
        id: globalThis.crypto.randomUUID(),
        code: 'EF12LPY03PE',
        objective: `Identificar ideia central/intenção do autor, em textos 
                    lidos, ouvidos e/ou sinalizados`,
        themathicUnit: 'Leitura/Escuta',
        knowledgeArea: 'Língua Portuguesa',
        languagePractice: 'Leitura/Escuta',
        fieldsOfAction: 'Todos os campos de atuação',
        knowledgeObjects: 'Estratégias de leitura',
        courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // ensino fundamental I
        disciplineId: '6862a800-92c3-4d46-8740-62a02a5e5cf9',
        seriesId: '352a5857-193f-4672-9abf-c5302afd1c37',
        userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
        tenantId: globalThis.crypto.randomUUID(),
      },
      {
        id: globalThis.crypto.randomUUID(),
        code: 'EF12LPZ04PE',
        objective: `Estabelecer relação títulos/textos.`,
        themathicUnit: 'Leitura/Escuta',
        knowledgeArea: 'Língua Portuguesa',
        languagePractice: 'Leitura/Escuta',
        fieldsOfAction: 'Todos os campos de atuação',
        knowledgeObjects: 'Estratégias de leitura',
        courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // ensino fundamental I
        disciplineId: '6862a800-92c3-4d46-8740-62a02a5e5cf9',
        seriesId: '352a5857-193f-4672-9abf-c5302afd1c37',
        userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
        tenantId: globalThis.crypto.randomUUID(),
      },
      {
        id: globalThis.crypto.randomUUID(),
        code: 'EF12LP04PE',
        objective: `Ler, em colaboração com os colegas e com a ajuda do 
                    professor ou já com certa autonomia, listas, agendas, calendários, 
                    avisos, convites, receitas, instruções de montagem (digitais ou 
                    impressos), dentre outros gêneros do campo da vida cotidiana, 
                    considerando a situação comunicativa e o tema/assunto do texto e 
                    relacionando sua forma de organização à sua finalidade.`,
        themathicUnit: 'Leitura/Escuta',
        knowledgeArea: 'Língua Portuguesa',
        languagePractice: 'Leitura/Escuta',
        fieldsOfAction: 'Campo da vida cotidiana',
        knowledgeObjects: 'Compreensão em leitura',
        courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // ensino fundamental I
        disciplineId: '6862a800-92c3-4d46-8740-62a02a5e5cf9',
        seriesId: '352a5857-193f-4672-9abf-c5302afd1c37',
        userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
        tenantId: globalThis.crypto.randomUUID(),
      },
      {
        id: globalThis.crypto.randomUUID(),
        code: 'EF01LP16PE',
        objective: `Ler, em colaboração com os colegas e com a ajuda do 
                    professor, quadras, quadrinhas, parlendas, trava-línguas, dentre outros 
                    gêneros do campo da vida cotidiana, considerando a situação 
                    comunicativa, o tema/assunto do texto e relacionando sua forma de 
                    organização a sua finalidade.`,
        themathicUnit: 'Leitura/Escuta',
        knowledgeArea: 'Língua Portuguesa',
        languagePractice: 'Leitura/Escuta',
        fieldsOfAction: 'Campo da vida cotidiana',
        knowledgeObjects: 'Compreensão em leitura',
        courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // ensino fundamental I
        disciplineId: '6862a800-92c3-4d46-8740-62a02a5e5cf9',
        seriesId: '352a5857-193f-4672-9abf-c5302afd1c37',
        userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
        tenantId: globalThis.crypto.randomUUID(),
      },
      {
        id: globalThis.crypto.randomUUID(),
        code: 'EF15LP14PE',
        objective: `Construir o sentido de histórias em quadrinhos e 
                    tirinhas, relacionando imagens e palavras e interpretando recursos 
                    gráficos (tipos de balões, de letras, onomatopeias, expressões faciais, 
                    cores, proporção, profundidade, brilho, posição das personagens, 
                    dentre outros recursos), destacando semelhanças e diferenças entre os 
                    gêneros.`,
        themathicUnit: 'Leitura/Escuta',
        knowledgeArea: 'Língua Portuguesa',
        languagePractice: 'Leitura/Escuta',
        fieldsOfAction: 'Campo da vida cotidiana',
        knowledgeObjects: 'Leitura de imagens em narrativas visuais',
        courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // ensino fundamental I
        disciplineId: '6862a800-92c3-4d46-8740-62a02a5e5cf9',
        seriesId: '352a5857-193f-4672-9abf-c5302afd1c37',
        userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
        tenantId: globalThis.crypto.randomUUID(),
      },
      {
        id: globalThis.crypto.randomUUID(),
        code: 'EF12LP08PE',
        objective: `Ler, em colaboração com os colegas e com a ajuda do 
                    professor, fotolegendas em notícias, manchetes e lides em notícias, 
                    álbum de fotos digital noticioso e notícias curtas para público infantil, 
                    dentre outros gêneros do campo jornalístico, considerando a situação 
                    comunicativa e o tema/assunto do texto.`,
        themathicUnit: 'Leitura/Escuta',
        knowledgeArea: 'Língua Portuguesa',
        languagePractice: 'Leitura/Escuta',
        fieldsOfAction: 'Campo da vida cotidiana',
        knowledgeObjects: 'Compreensão em leitura',
        courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // ensino fundamental I
        disciplineId: '6862a800-92c3-4d46-8740-62a02a5e5cf9',
        seriesId: '352a5857-193f-4672-9abf-c5302afd1c37',
        userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
        tenantId: globalThis.crypto.randomUUID(),
      },
      {
        id: globalThis.crypto.randomUUID(),
        code: 'EF12LP09PE',
        objective: `Ler, em colaboração com os colegas e com a ajuda do 
                    professor, slogans, anúncios publicitários e textos de campanhas de 
                    conscientização destinados ao público infantil, dentre outros gêneros do 
                    campo publicitário, considerando a situação comunicativa e o 
                    tema/assunto do texto.`,
        themathicUnit: 'Leitura/Escuta',
        knowledgeArea: 'Língua Portuguesa',
        languagePractice: 'Leitura/Escuta',
        fieldsOfAction: 'Campo da vida cotidiana',
        knowledgeObjects: 'Compreensão em leitura',
        courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // ensino fundamental I
        disciplineId: '6862a800-92c3-4d46-8740-62a02a5e5cf9',
        seriesId: '352a5857-193f-4672-9abf-c5302afd1c37',
        userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
        tenantId: globalThis.crypto.randomUUID(),
      },
      {
        id: globalThis.crypto.randomUUID(),
        code: 'EF12LP10PE',
        objective: `Ler, em colaboração com os colegas e com a ajuda do 
                    professor, cartazes, avisos, folhetos, regras e regulamentos que 
                    organizam a vida na comunidade escolar, dentre outros gêneros do 
                    campo da atuação cidadã, considerando a situação comunicativa e o 
                    tema/assunto do texto.`,
        themathicUnit: 'Leitura/Escuta',
        knowledgeArea: 'Língua Portuguesa',
        languagePractice: 'Leitura/Escuta',
        fieldsOfAction: 'Campo da vida cotidiana',
        knowledgeObjects: 'Compreensão em leitura',
        courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // ensino fundamental I
        disciplineId: '6862a800-92c3-4d46-8740-62a02a5e5cf9',
        seriesId: '352a5857-193f-4672-9abf-c5302afd1c37',
        userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
        tenantId: globalThis.crypto.randomUUID(),
      },
      {
        id: globalThis.crypto.randomUUID(),
        code: 'EF12LP17PE',
        objective: `Ler, em colaboração com os colegas e com a ajuda do 
                    professor, enunciados de tarefas escolares, diagramas, curiosidades, 
                    pequenos relatos de experimentos, entrevistas, verbetes de 
                    enciclopédia infantil, entre outros gêneros do campo investigativo, 
                    considerando a situação comunicativa e o tema/assunto do texto.`,
        themathicUnit: 'Leitura/Escuta',
        knowledgeArea: 'Língua Portuguesa',
        languagePractice: 'Leitura/Escuta',
        fieldsOfAction: 'Campo das práticas de estudo e pesquisa',
        knowledgeObjects: 'Compreensão em leitura',
        courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // ensino fundamental I
        disciplineId: '6862a800-92c3-4d46-8740-62a02a5e5cf9',
        seriesId: '352a5857-193f-4672-9abf-c5302afd1c37',
        userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
        tenantId: globalThis.crypto.randomUUID(),
      },
      {
        id: globalThis.crypto.randomUUID(),
        code: 'EF12LP18PE',
        objective: `Apreciar e comentar poemas e outros textos 
                    versificados, observando rimas, jogos de palavras, recursos gráficos, 
                    sonoridade e aliterações, reconhecendo seu pertencimento ao mundo 
                    imaginário e sua dimensão de encantamento, jogo, fruição e seus 
                    efeitos de sentido.`,
        themathicUnit: 'Leitura/Escuta',
        knowledgeArea: 'Língua Portuguesa',
        languagePractice: 'Leitura/Escuta',
        fieldsOfAction: 'Campo artístico-literário',
        knowledgeObjects: 'Apreciação estética/Estilo',
        courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // ensino fundamental I
        disciplineId: '6862a800-92c3-4d46-8740-62a02a5e5cf9',
        seriesId: '352a5857-193f-4672-9abf-c5302afd1c37',
        userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
        tenantId: globalThis.crypto.randomUUID(),
      },
      {
        id: globalThis.crypto.randomUUID(),
        code: 'EF15LP15PE',
        objective: `Reconhecer que os textos literários, tanto em verso 
                    como em prosa, fazem parte do mundo do imaginário e apresentam 
                    uma dimensão lúdica, de encantamento, valorizando-os, em sua 
                    diversidade cultural, como patrimônio artístico da humanidade.`,
        themathicUnit: 'Leitura/Escuta',
        knowledgeArea: 'Língua Portuguesa',
        languagePractice: 'Leitura/Escuta',
        fieldsOfAction: 'Campo artístico-literário',
        knowledgeObjects: 'Formação do leitor literário',
        courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // ensino fundamental I
        disciplineId: '6862a800-92c3-4d46-8740-62a02a5e5cf9',
        seriesId: '352a5857-193f-4672-9abf-c5302afd1c37',
        userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
        tenantId: globalThis.crypto.randomUUID(),
      },
      {
        id: globalThis.crypto.randomUUID(),
        code: 'EF15LP16PE',
        objective: `Ler, em colaboração com os colegas e com a ajuda do 
                    professor e, mais tarde, de maneira autônoma, textos narrativos de 
                    maior porte como contos (populares, de fadas, acumulativos, de 
                    assombração etc.) e crônicas, atentando para seus aspectos linguístico- 
                    estilísticos.`,
        themathicUnit: 'Leitura/Escuta',
        knowledgeArea: 'Língua Portuguesa',
        languagePractice: 'Leitura/Escuta',
        fieldsOfAction: 'Campo artístico-literário',
        knowledgeObjects: 'Leitura colaborativa e autônoma',
        courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // ensino fundamental I
        disciplineId: '6862a800-92c3-4d46-8740-62a02a5e5cf9',
        seriesId: '352a5857-193f-4672-9abf-c5302afd1c37',
        userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
        tenantId: globalThis.crypto.randomUUID(),
      },
      {
        id: globalThis.crypto.randomUUID(),
        code: 'EF15LP17PE',
        objective: `Apreciar e comentar poemas visuais e concretos, 
                    compreendendo os efeitos de sentido criados pelo formato do texto na 
                    página, distribuição e diagramação das letras, pelas ilustrações e por 
                    outros efeitos visuais.`,
        themathicUnit: 'Leitura/Escuta',
        knowledgeArea: 'Língua Portuguesa',
        languagePractice: 'Leitura/Escuta',
        fieldsOfAction: 'Campo artístico-literário',
        knowledgeObjects: 'Apreciação estética/Estilo',
        courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // ensino fundamental I
        disciplineId: '6862a800-92c3-4d46-8740-62a02a5e5cf9',
        seriesId: '352a5857-193f-4672-9abf-c5302afd1c37',
        userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
        tenantId: globalThis.crypto.randomUUID(),
      },
      {
        id: globalThis.crypto.randomUUID(),
        code: 'EF15LP18PE',
        objective: `Relacionar texto com ilustrações e outros recursos 
                    gráficos visando à construção de sentidos do texto`,
        themathicUnit: 'Leitura/Escuta',
        knowledgeArea: 'Língua Portuguesa',
        languagePractice: 'Leitura/Escuta',
        fieldsOfAction: 'Campo artístico-literário',
        knowledgeObjects: 'Formação do leitor literário/Leitura multissemiótica',
        courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // ensino fundamental I
        disciplineId: '6862a800-92c3-4d46-8740-62a02a5e5cf9',
        seriesId: '352a5857-193f-4672-9abf-c5302afd1c37',
        userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
        tenantId: globalThis.crypto.randomUUID(),
      },
      {
        id: globalThis.crypto.randomUUID(),
        code: 'EF01LP02PE',
        objective: `Escrever, espontaneamente, ou por ditado, pequenos 
                    textos (listas, trecho de parlendas, estrofe de uma cantiga, receitas, 
                    títulos, legendas, dentre outros), de forma alfabética - usando 
                    letras/grafemas que representem fonemas.`,
        themathicUnit: 'Escrita',
        knowledgeArea: 'Língua Portuguesa',
        languagePractice: 'Escrita',
        fieldsOfAction: 'Todos os campos de atuação',
        knowledgeObjects: 'Correspondência fonema-grafema',
        courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // ensino fundamental I
        disciplineId: '6862a800-92c3-4d46-8740-62a02a5e5cf9',
        seriesId: '352a5857-193f-4672-9abf-c5302afd1c37',
        userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
        tenantId: globalThis.crypto.randomUUID(),
      },
      {
        id: globalThis.crypto.randomUUID(),
        code: 'EF01LP03PE',
        objective: `Observar escritas convencionais, comparando-as as 
                    suas produções escritas, percebendo semelhanças e diferenças em 
                    listas (de nomes de colegas, de frutas, de brinquedos, textos de tradição 
                    oral, dentre outros), que possibilitem a reflexão sobre o sistema da 
                    escrita.`,
        themathicUnit: 'Escrita',
        knowledgeArea: 'Língua Portuguesa',
        languagePractice: 'Escrita',
        fieldsOfAction: 'Todos os campos de atuação',
        knowledgeObjects: 'Construção do sistema alfabético/Convenções da escrita',
        courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // ensino fundamental I
        disciplineId: '6862a800-92c3-4d46-8740-62a02a5e5cf9',
        seriesId: '352a5857-193f-4672-9abf-c5302afd1c37',
        userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
        tenantId: globalThis.crypto.randomUUID(),
      },
      {
        id: globalThis.crypto.randomUUID(),
        code: 'EF12LP03PE',
        objective: `Transcrever textos breves, ou trecho significativos de 
                    textos longos, mantendo suas características, respeitando o limite das 
                    margens e voltando para o texto sempre que tiver dúvidas sobre sua 
                    distribuição gráfica, espaçamento entre as palavras, escrita das 
                    palavras, pontuação, acentuação, letra maiúscula, paragrafação e 
                    distribuição gráfica de suas partes, entre outros aspectos relevantes.`,
        themathicUnit: 'Escrita',
        knowledgeArea: 'Língua Portuguesa',
        languagePractice: 'Escrita',
        fieldsOfAction: 'Todos os campos de atuação',
        knowledgeObjects: `Construção do sistema alfabético/
                    Estabelecimento de relações 
                    anafóricas na referenciação e 
                    construção da coesão`,
        courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // ensino fundamental I
        disciplineId: '6862a800-92c3-4d46-8740-62a02a5e5cf9',
        seriesId: '352a5857-193f-4672-9abf-c5302afd1c37',
        userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
        tenantId: globalThis.crypto.randomUUID(),
      },
      {
        id: globalThis.crypto.randomUUID(),
        code: 'EF01LP17PE',
        objective: `Planejar e produzir, em colaboração com os colegas e 
                    com a ajuda do professor, listas, agendas, calendários, avisos, convites, 
                    receitas, instruções de montagem e legendas para álbuns, fotos ou 
                    ilustrações (digitais ou impressos), dentre outros gêneros do campo da 
                    vida cotidiana, considerando a situação comunicativa e o tema/assunto/ 
                    finalidade do texto.`,
        themathicUnit: 'Escrita',
        knowledgeArea: 'Língua Portuguesa',
        languagePractice: 'Escrita',
        fieldsOfAction: 'Campo da vida cotidiana',
        knowledgeObjects: 'Escrita autônoma e compartilhada',
        courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // ensino fundamental I
        disciplineId: '6862a800-92c3-4d46-8740-62a02a5e5cf9',
        seriesId: '352a5857-193f-4672-9abf-c5302afd1c37',
        userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
        tenantId: globalThis.crypto.randomUUID(),
      },
      {
        id: globalThis.crypto.randomUUID(),
        code: 'EF01LP18PE',
        objective: `Registrar, em colaboração com os colegas e com a 
                    ajuda do professor, cantigas, quadras, quadrinhas, parlendas, trava- 
                    línguas, dentre outros gêneros do campo da vida cotidiana, 
                    considerando a situação comunicativa e o tema/assunto/finalidade do 
                    texto.`,
        themathicUnit: 'Escrita',
        knowledgeArea: 'Língua Portuguesa',
        languagePractice: 'Escrita',
        fieldsOfAction: 'Campo da vida cotidiana',
        knowledgeObjects: 'Escrita autônoma e compartilhada',
        courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // ensino fundamental I
        disciplineId: '6862a800-92c3-4d46-8740-62a02a5e5cf9',
        seriesId: '352a5857-193f-4672-9abf-c5302afd1c37',
        userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
        tenantId: globalThis.crypto.randomUUID(),
      },
      {
        id: globalThis.crypto.randomUUID(),
        code: 'EF12LP05PE',
        objective: `Planejar e produzir, em colaboração com os colegas e 
                    com a ajuda do professor, (re) contagens de histórias, poemas e outros 
                    textos versificados (letras de canção, quadrinhas, cordel), poemas 
                    visuais, tiras e histórias em quadrinhos, dentre outros gêneros do 
                    campo artístico, considerando a situação comunicativa, a finalidade do 
                    texto, bem como semelhanças e diferenças entre os gêneros`,
        themathicUnit: 'Escrita',
        knowledgeArea: 'Língua Portuguesa',
        languagePractice: 'Escrita',
        fieldsOfAction: 'Campo da vida cotidiana',
        knowledgeObjects: 'Escrita autônoma e compartilhada',
        courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // ensino fundamental I
        disciplineId: '6862a800-92c3-4d46-8740-62a02a5e5cf9',
        seriesId: '352a5857-193f-4672-9abf-c5302afd1c37',
        userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
        tenantId: globalThis.crypto.randomUUID(),
      },
      {
        id: globalThis.crypto.randomUUID(),
        code: 'EF12LP11PE',
        objective: `Planejar e produzir, em colaboração com os colegas e 
                    com a ajuda do professor, fotolegendas em notícias, manchetes e lides 
                    em notícias, álbum de fotos digital noticioso e notícias curtas para 
                    público infantil, digitais ou impressos, dentre outros gêneros do campo 
                    jornalístico, considerando a situação comunicativa e o tema/assunto do 
                    texto.`,
        themathicUnit: 'Escrita',
        knowledgeArea: 'Língua Portuguesa',
        languagePractice: 'Escrita',
        fieldsOfAction: 'Campo da vida pública',
        knowledgeObjects: 'Escrita autônoma e compartilhada',
        courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // ensino fundamental I
        disciplineId: '6862a800-92c3-4d46-8740-62a02a5e5cf9',
        seriesId: '352a5857-193f-4672-9abf-c5302afd1c37',
        userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
        tenantId: globalThis.crypto.randomUUID(),
      },
      {
        id: globalThis.crypto.randomUUID(),
        code: 'EF12LP12PE',
        objective: `Planejar e produzir em colaboração com os colegas e 
                    com a ajuda do professor, slogans, anúncios publicitários e textos de 
                    campanhas de conscientização destinados ao público infantil, dentre 
                    outros gêneros do campo publicitário, considerando a situação 
                    comunicativa e o tema/ assunto/finalidade do texto.`,
        themathicUnit: 'Escrita',
        knowledgeArea: 'Língua Portuguesa',
        languagePractice: 'Escrita',
        fieldsOfAction: 'Campo da vida pública',
        knowledgeObjects: 'Escrita compartilhada',
        courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // ensino fundamental I
        disciplineId: '6862a800-92c3-4d46-8740-62a02a5e5cf9',
        seriesId: '352a5857-193f-4672-9abf-c5302afd1c37',
        userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
        tenantId: globalThis.crypto.randomUUID(),
      },
      {
        id: globalThis.crypto.randomUUID(),
        code: 'EF01LP22PE',
        objective: `Planejar e produzir, em colaboração com os colegas e 
                    com a ajuda do professor, diagramas, entrevistas, curiosidades, dentre 
                    outros gêneros do campo investigativo, digitais ou impressos, 
                    considerando a situação comunicativa e o tema/assunto/finalidade do 
                    texto.`,
        themathicUnit: 'Escrita',
        knowledgeArea: 'Língua Portuguesa',
        languagePractice: 'Escrita',
        fieldsOfAction: 'Campo das práticas de estudo e pesquisa',
        knowledgeObjects: 'Escrita autônoma e compartilhada',
        courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // ensino fundamental I
        disciplineId: '6862a800-92c3-4d46-8740-62a02a5e5cf9',
        seriesId: '352a5857-193f-4672-9abf-c5302afd1c37',
        userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
        tenantId: globalThis.crypto.randomUUID(),
      },
      {
        id: globalThis.crypto.randomUUID(),
        code: 'EF01LP25PE',
        objective: `Planejar e produzir, tendo o professor como escriba, 
                    recontagens de histórias lidas pelo professor, histórias imaginadas ou 
                    baseadas em livros de imagens, observando a forma de composição de 
                    textos narrativos (personagens, enredo, tempo e espaço.`,
        themathicUnit: 'Escrita',
        knowledgeArea: 'Língua Portuguesa',
        languagePractice: 'Escrita',
        fieldsOfAction: 'Campo artístico-literário',
        knowledgeObjects: 'Escrita autônoma e compartilhada',
        courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // ensino fundamental I
        disciplineId: '6862a800-92c3-4d46-8740-62a02a5e5cf9',
        seriesId: '352a5857-193f-4672-9abf-c5302afd1c37',
        userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
        tenantId: globalThis.crypto.randomUUID(),
      },
      {
        id: globalThis.crypto.randomUUID(),
        code: 'EF15LP09PE',
        objective: `Expressar-se em situações de intercâmbio oral 
                    (exposição de resultados de pesquisas, participação em debates, 
                    apresentação de livros lidos, apresentar poemas em saraus, oralização 
                    de textos produzidos para programa de rádio, de textos regionais dentre 
                    outros), com clareza, preocupando-se em ser compreendido pelo 
                    interlocutor e usando a palavra com tom de voz audível, boa articulação 
                    e ritmo adequado.`,
        themathicUnit: 'Oralidade',
        knowledgeArea: 'Língua Portuguesa',
        languagePractice: 'Oralidade',
        fieldsOfAction: 'Todos os campos de atuação',
        knowledgeObjects: 'Oralidade pública/Intercâmbio conversacional em sala de aula',
        courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // ensino fundamental I
        disciplineId: '6862a800-92c3-4d46-8740-62a02a5e5cf9',
        seriesId: '352a5857-193f-4672-9abf-c5302afd1c37',
        userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
        tenantId: globalThis.crypto.randomUUID(),
      },
      {
        id: globalThis.crypto.randomUUID(),
        code: 'EF15LP10PE',
        objective: `Escutar/visualizar, com atenção, falas de professores e 
                    colegas, formulando perguntas pertinentes ao tema e solicitando 
                    esclarecimentos sempre que necessário.`,
        themathicUnit: 'Oralidade',
        knowledgeArea: 'Língua Portuguesa',
        languagePractice: 'Oralidade',
        fieldsOfAction: 'Todos os campos de atuação',
        knowledgeObjects: 'Escuta Atenta',
        courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // ensino fundamental I
        disciplineId: '6862a800-92c3-4d46-8740-62a02a5e5cf9',
        seriesId: '352a5857-193f-4672-9abf-c5302afd1c37',
        userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
        tenantId: globalThis.crypto.randomUUID(),
      },
      {
        id: globalThis.crypto.randomUUID(),
        code: 'EF15LP11PE',
        objective: `Reconhecer características da conversação 
                    espontânea presencial, respeitando os turnos de fala, selecionando e 
                    utilizando, durante a conversação, formas adequadas de tratamento de 
                    acordo com a situação e a posição do interlocutor.`,
        themathicUnit: 'Oralidade',
        knowledgeArea: 'Língua Portuguesa',
        languagePractice: 'Oralidade',
        fieldsOfAction: 'Todos os campos de atuação',
        knowledgeObjects: 'Características da conversação espontânea',
        courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // ensino fundamental I
        disciplineId: '6862a800-92c3-4d46-8740-62a02a5e5cf9',
        seriesId: '352a5857-193f-4672-9abf-c5302afd1c37',
        userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
        tenantId: globalThis.crypto.randomUUID(),
      },
      {
        id: globalThis.crypto.randomUUID(),
        code: 'EF15LP12PE',
        objective: `Atribuir significado a aspectos não linguísticos 
                    (paralinguísticos) observados na fala, como direção do olhar, riso, 
                    gestos, movimentos da cabeça (de concordância ou discordância), 
                    expressão corporal, tom de voz em situações comunicativas.`,
        themathicUnit: 'Oralidade',
        knowledgeArea: 'Língua Portuguesa',
        languagePractice: 'Oralidade',
        fieldsOfAction: 'Todos os campos de atuação',
        knowledgeObjects: 'Aspectos não linguísticos (paralinguísticos) no ato da fala',
        courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // ensino fundamental I
        disciplineId: '6862a800-92c3-4d46-8740-62a02a5e5cf9',
        seriesId: '352a5857-193f-4672-9abf-c5302afd1c37',
        userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
        tenantId: globalThis.crypto.randomUUID(),
      },
      {
        id: globalThis.crypto.randomUUID(),
        code: 'EF15LP13PE',
        objective: `Identificar finalidades da interação oral em diferentes 
                    contextos comunicativos (solicitar informações, apresentar opiniões, 
                    informar, relatar experiências etc.).`,
        themathicUnit: 'Oralidade',
        knowledgeArea: 'Língua Portuguesa',
        languagePractice: 'Oralidade',
        fieldsOfAction: 'Todos os campos de atuação',
        knowledgeObjects: 'Relato oral/Registro formal e informal',
        courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // ensino fundamental I
        disciplineId: '6862a800-92c3-4d46-8740-62a02a5e5cf9',
        seriesId: '352a5857-193f-4672-9abf-c5302afd1c37',
        userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
        tenantId: globalThis.crypto.randomUUID(),
      },
      {
        id: globalThis.crypto.randomUUID(),
        code: 'EF01LP19PE',
        objective: `Recitar parlendas, quadras, quadrinhas, trava-línguas, 
                    textos poéticos de autores locais e regionais, com entonação adequada 
                    e observando as rimas.`,
        themathicUnit: 'Oralidade',
        knowledgeArea: 'Língua Portuguesa',
        languagePractice: 'Oralidade',
        fieldsOfAction: 'Campo da vida cotidiana',
        knowledgeObjects: 'Oralização de texto literário',
        courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // ensino fundamental I
        disciplineId: '6862a800-92c3-4d46-8740-62a02a5e5cf9',
        seriesId: '352a5857-193f-4672-9abf-c5302afd1c37',
        userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
        tenantId: globalThis.crypto.randomUUID(),
      },
      {
        id: globalThis.crypto.randomUUID(),
        code: 'EF12LP06PE',
        objective: `Planejar e produzir, em colaboração com os colegas e 
                    com a ajuda do professor, listas, recados, avisos, convites, receitas, 
                    instruções de montagem, dentre outros gêneros do campo da vida 
                    cotidiana, que possam ser repassados oralmente e/ou por meio de 
                    ferramentas digitais, em áudio ou vídeo, considerando a situação 
                    comunicativa e o tema/assunto/finalidade do texto.`,
        themathicUnit: 'Oralidade',
        knowledgeArea: 'Língua Portuguesa',
        languagePractice: 'Oralidade',
        fieldsOfAction: 'Campo da vida cotidiana',
        knowledgeObjects: 'Produção de texto oral',
        courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // ensino fundamental I
        disciplineId: '6862a800-92c3-4d46-8740-62a02a5e5cf9',
        seriesId: '352a5857-193f-4672-9abf-c5302afd1c37',
        userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
        tenantId: globalThis.crypto.randomUUID(),
      },
      {
        id: globalThis.crypto.randomUUID(),
        code: 'EF01LP23PE',
        objective: `Planejar e produzir, em colaboração com os colegas e 
                    com a ajuda do professor, entrevistas, relato de experiência, seminário, 
                    curiosidades, dentre outros gêneros do campo investigativo, que 
                    possam ser repassados oralmente por meio de ferramentas digitais, em 
                    áudio ou vídeo, considerando a situação comunicativa e o 
                    tema/assunto/finalidade do texto.`,
        themathicUnit: 'Oralidade',
        knowledgeArea: 'Língua Portuguesa',
        languagePractice: 'Oralidade',
        fieldsOfAction: 'Campo das práticas de estudo e pesquisa',
        knowledgeObjects: 'Planejamento de texto oral Exposição oral',
        courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // ensino fundamental I
        disciplineId: '6862a800-92c3-4d46-8740-62a02a5e5cf9',
        seriesId: '352a5857-193f-4672-9abf-c5302afd1c37',
        userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
        tenantId: globalThis.crypto.randomUUID(),
      },
      {
        id: globalThis.crypto.randomUUID(),
        code: 'EF12LP13PE',
        objective: `Planejar e produzir, em colaboração com os colegas e 
                    com a ajuda do professor, slogans e peça de campanha de 
                    conscientização destinada ao público infantil que possam ser 
                    repassados oralmente por meio de ferramentas digitais, em áudio ou 
                    vídeo, considerando a situação comunicativa e o 
                    tema/assunto/finalidade do texto.`,
        themathicUnit: 'Oralidade',
        knowledgeArea: 'Língua Portuguesa',
        languagePractice: 'Oralidade',
        fieldsOfAction: 'Campo da vida pública',
        knowledgeObjects: 'Produção de texto oral',
        courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // ensino fundamental I
        disciplineId: '6862a800-92c3-4d46-8740-62a02a5e5cf9',
        seriesId: '352a5857-193f-4672-9abf-c5302afd1c37',
        userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
        tenantId: globalThis.crypto.randomUUID(),
      },
      {
        id: globalThis.crypto.randomUUID(),
        code: 'EF15LP19PE',
        objective: `Recontar oralmente, com e sem apoio de imagem, 
                    textos literários, nacionais e regionais (contos, cordéis, cantigas, 
                    parlendas) lidos ou sinalizados pelo professor ou pelo próprio estudante.`,
        themathicUnit: 'Oralidade',
        knowledgeArea: 'Língua Portuguesa',
        languagePractice: 'Oralidade',
        fieldsOfAction: 'Campo artístico-literário',
        knowledgeObjects: 'Contagem de histórias',
        courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // ensino fundamental I
        disciplineId: '6862a800-92c3-4d46-8740-62a02a5e5cf9',
        seriesId: '352a5857-193f-4672-9abf-c5302afd1c37',
        userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
        tenantId: globalThis.crypto.randomUUID(),
      },
      {
        id: globalThis.crypto.randomUUID(),
        code: 'EF15LP05PE',
        objective: `Planejar, com a ajuda do professor, o texto que será 
                    produzido, considerando a situação comunicativa: (os interlocutores 
                    (quem escreve/para quem escreve); a finalidade ou o propósito 
                    (escrever para quê); a circulação (onde o texto vai circular; o suporte 
                    (qual é o portador do texto); a linguagem, organização e forma do texto 
                    e seu tema) pesquisando em meios impressos ou digitais, sempre que 
                    for preciso, informações necessárias à produção do texto, organizando 
                    em tópicos os dados e as fontes pesquisadas.`,
        themathicUnit: 'Produção de Textos',
        knowledgeArea: 'Língua Portuguesa',
        languagePractice: 'Produção de Textos',
        fieldsOfAction: 'Todos os campos de atuação',
        knowledgeObjects: 'Planejamento de texto',
        courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // ensino fundamental I
        disciplineId: '6862a800-92c3-4d46-8740-62a02a5e5cf9',
        seriesId: '352a5857-193f-4672-9abf-c5302afd1c37',
        userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
        tenantId: globalThis.crypto.randomUUID(),
      },
      {
        id: globalThis.crypto.randomUUID(),
        code: 'EF15LP06PE',
        objective: `Reler e revisar o texto produzido, individualmente ou 
                    com a ajuda do professor e a colaboração dos colegas, para ajustá-lo e 
                    aprimorá-lo, fazendo cortes, acréscimos, reformulações, correções de 
                    ortografia e pontuação, visando aos efeitos de sentidos pretendidos.`,
        themathicUnit: 'Produção de Textos',
        knowledgeArea: 'Língua Portuguesa',
        languagePractice: 'Produção de Textos',
        fieldsOfAction: 'Todos os campos de atuação',
        knowledgeObjects: 'Revisão de textos',
        courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // ensino fundamental I
        disciplineId: '6862a800-92c3-4d46-8740-62a02a5e5cf9',
        seriesId: '352a5857-193f-4672-9abf-c5302afd1c37',
        userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
        tenantId: globalThis.crypto.randomUUID(),
      },
      {
        id: globalThis.crypto.randomUUID(),
        code: 'EF15LP07PE',
        objective: `Editar a versão final do texto, em colaboração com os 
                    colegas e com a ajuda do professor, ilustrando, quando for o caso, em 
                    suporte adequado, manual ou digital.`,
        themathicUnit: 'Produção de Textos',
        knowledgeArea: 'Língua Portuguesa',
        languagePractice: 'Produção de Textos',
        fieldsOfAction: 'Todos os campos de atuação',
        knowledgeObjects: 'Edição de texto',
        courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // ensino fundamental I
        disciplineId: '6862a800-92c3-4d46-8740-62a02a5e5cf9',
        seriesId: '352a5857-193f-4672-9abf-c5302afd1c37',
        userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
        tenantId: globalThis.crypto.randomUUID(),
      },
      {
        id: globalThis.crypto.randomUUID(),
        code: 'EF15LP08PE',
        objective: `Utilizar software, inclusive programas de edição de 
                    texto, para editar e publicar os textos produzidos (folhetos com 
                    orientações sobre questões/problemas locais, guias, pesquisas sobre 
                    povos/grupos, entre outros próximos realidade/necessidade dos 
                    estudantes), explorando os recursos multissemióticos disponíveis, 
                    individualmente e/ou com colaboração de colegas e do professor`,
        themathicUnit: 'Produção de Textos',
        knowledgeArea: 'Língua Portuguesa',
        languagePractice: 'Produção de Textos',
        fieldsOfAction: 'Todos os campos de atuação',
        knowledgeObjects: 'Utilização da tecnologia digital',
        courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // ensino fundamental I
        disciplineId: '6862a800-92c3-4d46-8740-62a02a5e5cf9',
        seriesId: '352a5857-193f-4672-9abf-c5302afd1c37',
        userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
        tenantId: globalThis.crypto.randomUUID(),
      },
      {
        id: globalThis.crypto.randomUUID(),
        code: 'EF01LP04PE',
        objective: `Distinguir as letras do alfabeto de outros sinais gráficos, 
                    partindo de leitura/escrita de pequenos textos de tradição oral regionais 
                    ou outros, que favoreçam para a compreensão da relação existente 
                    entre fala e escrita e das diversas situações de comunicação.`,
        themathicUnit: 'Análise linguística/semiótica',
        knowledgeArea: 'Língua Portuguesa',
        languagePractice: 'Análise linguística/semiótica',
        fieldsOfAction: 'Todos os campos de atuação',
        knowledgeObjects: 'Conhecimento do alfabeto do português do Brasil',
        courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // ensino fundamental I
        disciplineId: '6862a800-92c3-4d46-8740-62a02a5e5cf9',
        seriesId: '352a5857-193f-4672-9abf-c5302afd1c37',
        userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
        tenantId: globalThis.crypto.randomUUID(),
      },
      {
        id: globalThis.crypto.randomUUID(),
        code: 'EF01LP05PE',
        objective: `Reconhecer o sistema de escrita alfabética como 
                    representação dos sons da fala, através da exploração de textos de 
                    tradição oral, listas, textos genuínos do repertório local, atentando para 
                    o interesse temático dos estudantes, explorando a comparação 
                    reflexiva entre as palavras (correspondência som/ letra, 
                    Quantidade/qualidade de letras, ordem das letras, etc.)`,
        themathicUnit: 'Análise linguística/semiótica',
        knowledgeArea: 'Língua Portuguesa',
        languagePractice: 'Análise linguística/semiótica',
        fieldsOfAction: 'Todos os campos de atuação',
        knowledgeObjects: 'Construção do sistema alfabético',
        courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // ensino fundamental I
        disciplineId: '6862a800-92c3-4d46-8740-62a02a5e5cf9',
        seriesId: '352a5857-193f-4672-9abf-c5302afd1c37',
        userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
        tenantId: globalThis.crypto.randomUUID(),
      },
      {
        id: globalThis.crypto.randomUUID(),
        code: 'EF01LP06PE',
        objective: `Segmentar, oralmente, palavras em sílabas em 
                    situações significativas de leitura, como uso de cantigas, parlendas de 
                    repertório local e nacional, dentre outros gêneros próximos do dia a dia 
                    dos estudantes.`,
        themathicUnit: 'Análise linguística/semiótica',
        knowledgeArea: 'Língua Portuguesa',
        languagePractice: 'Análise linguística/semiótica',
        fieldsOfAction: 'Todos os campos de atuação',
        knowledgeObjects: 'Construção do sistema alfabético',
        courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // ensino fundamental I
        disciplineId: '6862a800-92c3-4d46-8740-62a02a5e5cf9',
        seriesId: '352a5857-193f-4672-9abf-c5302afd1c37',
        userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
        tenantId: globalThis.crypto.randomUUID(),
      },
      {
        id: globalThis.crypto.randomUUID(),
        code: 'EF01LP07PE',
        objective: `Identificar fonemas e sua representação por letras, a 
                    partir de textos conhecidos dos estudantes (slogan, manchetes, 
                    propagandas, textos de tradição oral, listas, receitas, dentre outros).`,
        themathicUnit: 'Análise linguística/semiótica',
        knowledgeArea: 'Língua Portuguesa',
        languagePractice: 'Análise linguística/semiótica',
        fieldsOfAction: 'Todos os campos de atuação',
        knowledgeObjects: 'Construção do sistema alfabético e da ortografia',
        courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // ensino fundamental I
        disciplineId: '6862a800-92c3-4d46-8740-62a02a5e5cf9',
        seriesId: '352a5857-193f-4672-9abf-c5302afd1c37',
        userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
        tenantId: globalThis.crypto.randomUUID(),
      },
      {
        id: globalThis.crypto.randomUUID(),
        code: 'EF01LP08PE',
        objective: `Relacionar elementos sonoros (sílabas, fonemas, 
                    partes de palavras) com sua representação escrita, em situações de 
                    leitura e escrita de textos diversos.`,
        themathicUnit: 'Análise linguística/semiótica',
        knowledgeArea: 'Língua Portuguesa',
        languagePractice: 'Análise linguística/semiótica',
        fieldsOfAction: 'Todos os campos de atuação',
        knowledgeObjects: 'Construção do sistema alfabético e da ortografia',
        courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // ensino fundamental I
        disciplineId: '6862a800-92c3-4d46-8740-62a02a5e5cf9',
        seriesId: '352a5857-193f-4672-9abf-c5302afd1c37',
        userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
        tenantId: globalThis.crypto.randomUUID(),
      },
      {
        id: globalThis.crypto.randomUUID(),
        code: 'EF01LP09PE',
        objective: `Comparar palavras, identificando semelhanças e 
                    diferenças entre sons de sílabas iniciais, mediais e finais, a partir de 
                    textos conhecidos (crachás, listas dos nomes da sala, de objetos do 
                    mesmo campo semântico, parlendas, cantigas, dentre outros), que 
                    favoreçam a análise da relação fonema-grafema.`,
        themathicUnit: 'Análise linguística/semiótica',
        knowledgeArea: 'Língua Portuguesa',
        languagePractice: 'Análise linguística/semiótica',
        fieldsOfAction: 'Todos os campos de atuação',
        knowledgeObjects: 'Construção do sistema alfabético e da ortografia',
        courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // ensino fundamental I
        disciplineId: '6862a800-92c3-4d46-8740-62a02a5e5cf9',
        seriesId: '352a5857-193f-4672-9abf-c5302afd1c37',
        userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
        tenantId: globalThis.crypto.randomUUID(),
      },
      {
        id: globalThis.crypto.randomUUID(),
        code: 'EF01LP10PE',
        objective: `Nomear as letras do alfabeto, compreendendo a ordem 
                    das letras, através de práticas de ler e escrever textos (listas dos nomes 
                    dos colegas da classe em ordem alfabética, por exemplo), que 
                    contribuam para a relação existente entre leitura e escrita`,
        themathicUnit: 'Análise linguística/semiótica',
        knowledgeArea: 'Língua Portuguesa',
        languagePractice: 'Análise linguística/semiótica',
        fieldsOfAction: 'Todos os campos de atuação',
        knowledgeObjects: 'Conhecimento do alfabeto do português do Brasil',
        courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // ensino fundamental I
        disciplineId: '6862a800-92c3-4d46-8740-62a02a5e5cf9',
        seriesId: '352a5857-193f-4672-9abf-c5302afd1c37',
        userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
        tenantId: globalThis.crypto.randomUUID(),
      },
      {
        id: globalThis.crypto.randomUUID(),
        code: 'EF01LP11PE',
        objective: `Conhecer, diferenciar e relacionar letras em formato 
                    imprensa e cursiva maiúsculas e minúsculas, em atividades de leitura e 
                    escrita de material impresso e digitais com os diversos tipos de letras, 
                    livros, revistas, jornais impressos e digitais e textos escritos em sala de 
                    aula), favorecendo a análise e reconhecimento dos contextos de uso 
                    dos diferentes tipos de letras.`,
        themathicUnit: 'Análise linguística/semiótica',
        knowledgeArea: 'Língua Portuguesa',
        languagePractice: 'Análise linguística/semiótica',
        fieldsOfAction: 'Todos os campos de atuação',
        knowledgeObjects: 'Conhecimento das diversas grafias do alfabeto/ Acentuação',
        courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // ensino fundamental I
        disciplineId: '6862a800-92c3-4d46-8740-62a02a5e5cf9',
        seriesId: '352a5857-193f-4672-9abf-c5302afd1c37',
        userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
        tenantId: globalThis.crypto.randomUUID(),
      },
      {
        id: globalThis.crypto.randomUUID(),
        code: 'EF01LP12PE',
        objective: `Reconhecer a separação das palavras, na escrita, por 
                    espaços em branco, a partir de textos escritos, percebendo, 
                    progressivamente, que fala e escrita possuem critérios diferentes para 
                    segmentar palavras.`,
        themathicUnit: 'Análise linguística/semiótica',
        knowledgeArea: 'Língua Portuguesa',
        languagePractice: 'Análise linguística/semiótica',
        fieldsOfAction: 'Todos os campos de atuação',
        knowledgeObjects: 'Segmentação de palavras/classificação de palavras por número de sílabas',
        courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // ensino fundamental I
        disciplineId: '6862a800-92c3-4d46-8740-62a02a5e5cf9',
        seriesId: '352a5857-193f-4672-9abf-c5302afd1c37',
        userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
        tenantId: globalThis.crypto.randomUUID(),
      },
      {
        id: globalThis.crypto.randomUUID(),
        code: 'EF01LP13PE',
        objective: `Comparar palavras, identificando semelhanças e 
                    diferenças entre sons de sílabas iniciais, mediais e finais, a partir de 
                    textos conhecidos, de forma articulada com as práticas de leitura e da 
                    escrita.`,
        themathicUnit: 'Análise linguística/semiótica',
        knowledgeArea: 'Língua Portuguesa',
        languagePractice: 'Análise linguística/semiótica',
        fieldsOfAction: 'Todos os campos de atuação',
        knowledgeObjects: 'Construção do sistema alfabético',
        courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // ensino fundamental I
        disciplineId: '6862a800-92c3-4d46-8740-62a02a5e5cf9',
        seriesId: '352a5857-193f-4672-9abf-c5302afd1c37',
        userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
        tenantId: globalThis.crypto.randomUUID(),
      },
      {
        id: globalThis.crypto.randomUUID(),
        code: 'EF01LP14PE',
        objective: `Identificar outros sinais no texto além das letras, como 
                    pontos finais, de interrogação e exclamação, vírgulas (de forma 
                    introdutória), e seus efeitos na entonação e na produção de sentidos 
                    nos textos.`,
        themathicUnit: 'Análise linguística/semiótica',
        knowledgeArea: 'Língua Portuguesa',
        languagePractice: 'Análise linguística/semiótica',
        fieldsOfAction: 'Todos os campos de atuação',
        knowledgeObjects: 'Pontuação',
        courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // ensino fundamental I
        disciplineId: '6862a800-92c3-4d46-8740-62a02a5e5cf9',
        seriesId: '352a5857-193f-4672-9abf-c5302afd1c37',
        userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
        tenantId: globalThis.crypto.randomUUID(),
      },
      {
        id: globalThis.crypto.randomUUID(),
        code: 'EF01LP15PE',
        objective: `Agrupar palavras pelo critério de aproximação de 
                    significado (sinonímia) e separar palavras pelo critério de oposição de 
                    significado (antonímia), a partir das práticas de leitura.`,
        themathicUnit: 'Análise linguística/semiótica',
        knowledgeArea: 'Língua Portuguesa',
        languagePractice: 'Análise linguística/semiótica',
        fieldsOfAction: 'Todos os campos de atuação',
        knowledgeObjects: 'Sinonímia e antonímia Semântica',
        courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // ensino fundamental I
        disciplineId: '6862a800-92c3-4d46-8740-62a02a5e5cf9',
        seriesId: '352a5857-193f-4672-9abf-c5302afd1c37',
        userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
        tenantId: globalThis.crypto.randomUUID(),
      },
      {
        id: globalThis.crypto.randomUUID(),
        code: 'EF12LP15PE',
        objective: `Identificar a forma de composição de slogans 
                    publicitários, em práticas de leitura e análise de textos publicitários, 
                    apoiando-se no grau de complexidade dos referidos textos e o nível de 
                    autonomia a ser conquistado pelos estudantes.`,
        themathicUnit: 'Análise linguística/semiótica',
        knowledgeArea: 'Língua Portuguesa',
        languagePractice: 'Análise linguística/semiótica',
        fieldsOfAction: 'Campo da vida pública',
        knowledgeObjects: 'Forma de composição do texto',
        courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // ensino fundamental I
        disciplineId: '6862a800-92c3-4d46-8740-62a02a5e5cf9',
        seriesId: '352a5857-193f-4672-9abf-c5302afd1c37',
        userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
        tenantId: globalThis.crypto.randomUUID(),
      },
      {
        id: globalThis.crypto.randomUUID(),
        code: 'EF12LP16PE',
        objective: `Identificar e reproduzir, em anúncios publicitários e 
                    textos de campanhas de conscientização destinados ao público infantil 
                    (orais e escritos, digitais ou impressos), a formatação e diagramação 
                    específica de cada um desses gêneros, inclusive o uso de imagens, 
                    apoiando-se no grau de complexidade dos referidos textos e o nível de 
                    autonomia a ser conquistado pelos estudantes.`,
        themathicUnit: 'Análise linguística/semiótica',
        knowledgeArea: 'Língua Portuguesa',
        languagePractice: 'Análise linguística/semiótica',
        fieldsOfAction: 'Campo da vida pública',
        knowledgeObjects: 'Forma de composição do texto',
        courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // ensino fundamental I
        disciplineId: '6862a800-92c3-4d46-8740-62a02a5e5cf9',
        seriesId: '352a5857-193f-4672-9abf-c5302afd1c37',
        userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
        tenantId: globalThis.crypto.randomUUID(),
      },
      {
        id: globalThis.crypto.randomUUID(),
        code: 'EF12LP07PE',
        objective: `Identificar e (re)produzir, em cantiga, quadras, 
                    quadrinhas, parlendas, trava-línguas e canções, rimas, aliterações, 
                    assonâncias, o ritmo de fala relacionado ao ritmo e à melodia das 
                    músicas e seus efeitos de sentido.`,
        themathicUnit: 'Análise linguística/semiótica',
        knowledgeArea: 'Língua Portuguesa',
        languagePractice: 'Análise linguística/semiótica',
        fieldsOfAction: 'Campo da vida cotidiana',
        knowledgeObjects: 'Forma de composição do texto',
        courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // ensino fundamental I
        disciplineId: '6862a800-92c3-4d46-8740-62a02a5e5cf9',
        seriesId: '352a5857-193f-4672-9abf-c5302afd1c37',
        userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
        tenantId: globalThis.crypto.randomUUID(),
      },
      {
        id: globalThis.crypto.randomUUID(),
        code: 'EF01LP20PE',
        objective: `Identificar e reproduzir, em listas, agendas, calendários, 
                    regras, avisos, convites, receitas, instruções de montagem e legendas 
                    para álbuns, fotos ou ilustrações (digitais ou impressos), a formatação 
                    e diagramação específica de cada um desses gêneros, considerando a 
                    complexidade dos textos e a autonomia dos estudantes.`,
        themathicUnit: 'Análise linguística/semiótica',
        knowledgeArea: 'Língua Portuguesa',
        languagePractice: 'Análise linguística/semiótica',
        fieldsOfAction: 'Campo da vida cotidiana',
        knowledgeObjects: 'Forma de composição do texto',
        courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // ensino fundamental I
        disciplineId: '6862a800-92c3-4d46-8740-62a02a5e5cf9',
        seriesId: '352a5857-193f-4672-9abf-c5302afd1c37',
        userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
        tenantId: globalThis.crypto.randomUUID(),
      },
      {
        id: globalThis.crypto.randomUUID(),
        code: 'EF01LP24PE',
        objective: `Identificar, analisar e reproduzir, em enunciados de 
                    tarefas escolares, diagramas, entrevistas, curiosidades, digitais ou 
                    impressos, a formatação e diagramação específica de cada um desses 
                    gêneros, inclusive em suas versões orais, considerando a 
                    complexidade dos textos e a autonomia dos estudantes.`,
        themathicUnit: 'Análise linguística/semiótica',
        knowledgeArea: 'Língua Portuguesa',
        languagePractice: 'Análise linguística/semiótica',
        fieldsOfAction: 'Campo das práticas de estudo e pesquisa',
        knowledgeObjects: 'Forma de composição dos textos/Adequação do texto às normas de escrita',
        courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // ensino fundamental I
        disciplineId: '6862a800-92c3-4d46-8740-62a02a5e5cf9',
        seriesId: '352a5857-193f-4672-9abf-c5302afd1c37',
        userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
        tenantId: globalThis.crypto.randomUUID(),
      },
      {
        id: globalThis.crypto.randomUUID(),
        code: 'EF01LP26PE',
        objective: `Identificar elementos de uma narrativa lida ou escutada, 
                    incluindo personagens, enredo, tempo e espaço, através de leituras 
                    colaborativas, mediadas pelo professor.`,
        themathicUnit: 'Análise linguística/semiótica',
        knowledgeArea: 'Língua Portuguesa',
        languagePractice: 'Análise linguística/semiótica',
        fieldsOfAction: 'Campo da vida cotidiana',
        knowledgeObjects: 'Forma de composição do texto',
        courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // ensino fundamental I
        disciplineId: '6862a800-92c3-4d46-8740-62a02a5e5cf9',
        seriesId: '352a5857-193f-4672-9abf-c5302afd1c37',
        userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
        tenantId: globalThis.crypto.randomUUID(),
      },

      {
        id: globalThis.crypto.randomUUID(),
        code: 'EF01MA01PE',
        objective: `Utilizar números naturais como indicador de 
                    quantidade ou de ordem (valor monetário, número de estudantes em 
                    sala de aula, etc.) em diferentes situações cotidianas e reconhecer 
                    situações em que os números não indicam contagem nem ordem, mas 
                    sim código de identificação (número de telefone, casa, placa de carro, 
                    etc.).`,
        themathicUnit: 'Números',
        knowledgeArea: 'Matemática',
        knowledgeObjects: `Contagem de rotina, 
                    Contagem ascendente e descendente, 
                    Reconhecimento de números no contexto diário: 
                    indicação de quantidades, indicação de ordem ou 
                    indicação de código para a organização de informações`,
        courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // ensino fundamental I
        disciplineId: '4ca48f5c-2987-4cab-9420-614d64d4d489',
        seriesId: '352a5857-193f-4672-9abf-c5302afd1c37',
        userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
        tenantId: globalThis.crypto.randomUUID(),
      },
      {
        id: globalThis.crypto.randomUUID(),
        code: 'EF01MA02PE',
        objective: `Contar de maneira exata ou aproximada, utilizando 
                    diferentes estratégias como o pareamento e outros agrupamentos.`,
        themathicUnit: 'Números',
        knowledgeArea: 'Matemática',
        knowledgeObjects: `Quantificação de elementos de uma coleção: 
                    estimativas, contagem um a um, pareamento ou 
                    outros agrupamentos e comparação`,
        courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // ensino fundamental I
        disciplineId: '4ca48f5c-2987-4cab-9420-614d64d4d489',
        seriesId: '352a5857-193f-4672-9abf-c5302afd1c37',
        userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
        tenantId: globalThis.crypto.randomUUID(),
      },
      {
        id: globalThis.crypto.randomUUID(),
        code: 'EF01MA03PE',
        objective: `Estimar e comparar quantidades de objetos de dois 
                    conjuntos (em torno de 20 elementos), por estimativa e/ou por 
                    correspondência (um a um, dois a dois) para indicar “tem mais”, “tem 
                    menos” ou “tem a mesma quantidade”.`,
        themathicUnit: 'Números',
        knowledgeArea: 'Matemática',
        knowledgeObjects: `Quantificação de elementos de uma coleção: 
                    estimativas, contagem um a um, pareamento ou 
                    outros agrupamentos e comparação`,
        courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // ensino fundamental I
        disciplineId: '4ca48f5c-2987-4cab-9420-614d64d4d489',
        seriesId: '352a5857-193f-4672-9abf-c5302afd1c37',
        userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
        tenantId: globalThis.crypto.randomUUID(),
      },
      {
        id: globalThis.crypto.randomUUID(),
        code: 'EF01MA04PE',
        objective: `Contar a quantidade de objetos de coleções até 100 
                    unidades e apresentar o resultado por registros verbais e simbólicos 
                    em situações de seu interesse como jogos, brincadeiras, materiais da 
                    sala de aula, entre outros.`,
        themathicUnit: 'Números',
        knowledgeArea: 'Matemática',
        knowledgeObjects: `Leitura, escrita e comparação de números naturais (até 100`,
        courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // ensino fundamental I
        disciplineId: '4ca48f5c-2987-4cab-9420-614d64d4d489',
        seriesId: '352a5857-193f-4672-9abf-c5302afd1c37',
        userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
        tenantId: globalThis.crypto.randomUUID(),
      },
      {
        id: globalThis.crypto.randomUUID(),
        code: 'EF01MA05PE',
        objective: `Comparar números naturais de até duas ordens em 
                    situações cotidianas, com e sem suporte da reta numérica, como 
                    também de materiais manipuláveis diversos.`,
        themathicUnit: 'Números',
        knowledgeArea: 'Matemática',
        knowledgeObjects: `Reta numérica`,
        courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // ensino fundamental I
        disciplineId: '4ca48f5c-2987-4cab-9420-614d64d4d489',
        seriesId: '352a5857-193f-4672-9abf-c5302afd1c37',
        userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
        tenantId: globalThis.crypto.randomUUID(),
      },
      {
        id: globalThis.crypto.randomUUID(),
        code: 'EF01MA06PE',
        objective: `Construir fatos básicos da adição (utilizando-se de 
                    diversas estratégias de cálculos: composição e decomposição por 
                    meio de adições; procedimentos de contagem, diversas formas de 
                    representação) e utilizá-los em procedimentos de cálculo para 
                    resolver problemas.`,
        themathicUnit: 'Números',
        knowledgeArea: 'Matemática',
        knowledgeObjects: `Construção de fatos básicos da adição`,
        courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // ensino fundamental I
        disciplineId: '4ca48f5c-2987-4cab-9420-614d64d4d489',
        seriesId: '352a5857-193f-4672-9abf-c5302afd1c37',
        userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
        tenantId: globalThis.crypto.randomUUID(),
      },
      {
        id: globalThis.crypto.randomUUID(),
        code: 'EF01MA07PE',
        objective: `Compor e decompor número de até duas ordens por 
                    meio de diferentes adições (por exemplo: 10=2+8 ou 2+8=10; 10=5+5 
                    ou 5+5=10, etc.), com o suporte de material manipulável, contribuindo 
                    para a compreensão de características do sistema de numeração 
                    decimal e o desenvolvimento de estratégias de cálculo.`,
        themathicUnit: 'Números',
        knowledgeArea: 'Matemática',
        knowledgeObjects: `Composição e decomposição de números naturais`,
        courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // ensino fundamental I
        disciplineId: '4ca48f5c-2987-4cab-9420-614d64d4d489',
        seriesId: '352a5857-193f-4672-9abf-c5302afd1c37',
        userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
        tenantId: globalThis.crypto.randomUUID(),
      },
      {
        id: globalThis.crypto.randomUUID(),
        code: 'EF01MA08PE',
        objective: `Resolver e elaborar problemas de adição e de 
                    subtração, envolvendo números de até dois algarismos, com os 
                    significados de juntar, acrescentar, separar e retirar, com o suporte de 
                    imagens e/ou material manipulável, utilizando estratégias e formas de 
                    registro pessoais.`,
        themathicUnit: 'Números',
        knowledgeArea: 'Matemática',
        knowledgeObjects: `Problemas envolvendo diferentes 
                    significados da adição e da subtração 
                    (juntar, acrescentar, separar, retirar)`,
        courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // ensino fundamental I
        disciplineId: '4ca48f5c-2987-4cab-9420-614d64d4d489',
        seriesId: '352a5857-193f-4672-9abf-c5302afd1c37',
        userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
        tenantId: globalThis.crypto.randomUUID(),
      },
      {
        id: globalThis.crypto.randomUUID(),
        code: 'EF01MA09PE',
        objective: `Organizar e ordenar objetos familiares ou 
                    representações por figuras, por meio de atributos, tais como cor, forma 
                    e medida.`,
        themathicUnit: 'Álgebra',
        knowledgeArea: 'Matemática',
        knowledgeObjects: `Padrões figurais e numéricos: investigação de 
                    regularidades ou padrões em sequências`,
        courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // ensino fundamental I
        disciplineId: '4ca48f5c-2987-4cab-9420-614d64d4d489',
        seriesId: '352a5857-193f-4672-9abf-c5302afd1c37',
        userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
        tenantId: globalThis.crypto.randomUUID(),
      },
      {
        id: globalThis.crypto.randomUUID(),
        code: 'EF01MA10PE',
        objective: `Descrever, após o reconhecimento e a explicitação 
                    de um padrão (ou regularidade), os elementos ausentes em 
                    sequências recursivas de números naturais, objetos ou figuras.`,
        themathicUnit: 'Álgebra',
        knowledgeArea: 'Matemática',
        knowledgeObjects: `Sequências recursivas: observação de regras usadas 
                    utilizadas em seriações numéricas 
                    (mais 1, mais 2, menos 1, menos 2, por exemplo)`,
        courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // ensino fundamental I
        disciplineId: '4ca48f5c-2987-4cab-9420-614d64d4d489',
        seriesId: '352a5857-193f-4672-9abf-c5302afd1c37',
        userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
        tenantId: globalThis.crypto.randomUUID(),
      },
      {
        id: globalThis.crypto.randomUUID(),
        code: 'EF01MA11PE',
        objective: `Descrever a localização de pessoas e de objetos no 
                    espaço em relação à sua própria posição, utilizando termos como à 
                    direita, à esquerda, em frente, atrás.`,
        themathicUnit: 'Geometria',
        knowledgeArea: 'Matemática',
        knowledgeObjects: `Localização de objetos e de pessoas 
                    no espaço, utilizando diversos pontos de 
                    referência e vocabulário apropriado`,
        courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // ensino fundamental I
        disciplineId: '4ca48f5c-2987-4cab-9420-614d64d4d489',
        seriesId: '352a5857-193f-4672-9abf-c5302afd1c37',
        userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
        tenantId: globalThis.crypto.randomUUID(),
      },
      {
        id: globalThis.crypto.randomUUID(),
        code: 'EF01MA12PE',
        objective: `Descrever a localização de pessoas e de objetos no 
                    espaço segundo um dado ponto de referência, compreendendo que, 
                    para a utilização de termos que se referem à posição, como direita, 
                    esquerda, em cima, em baixo, é necessário explicitar-se o referencial.`,
        themathicUnit: 'Geometria',
        knowledgeArea: 'Matemática',
        knowledgeObjects: `Localização de objetos e de pessoas 
                    no espaço, utilizando diversos pontos de 
                    referência e vocabulário apropriado`,
        courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // ensino fundamental I
        disciplineId: '4ca48f5c-2987-4cab-9420-614d64d4d489',
        seriesId: '352a5857-193f-4672-9abf-c5302afd1c37',
        userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
        tenantId: globalThis.crypto.randomUUID(),
      },
      {
        id: globalThis.crypto.randomUUID(),
        code: 'EF01MA13PE',
        objective: `Relacionar figuras geométricas espaciais (cones, 
                    cilindros, esferas e blocos retangulares) a objetos familiares do mundo 
                    físico.`,
        themathicUnit: 'Geometria',
        knowledgeArea: 'Matemática',
        knowledgeObjects: `Figuras geométricas espaciais: reconhecimento e 
                    relações com objetos familiares do mundo físico`,
        courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // ensino fundamental I
        disciplineId: '4ca48f5c-2987-4cab-9420-614d64d4d489',
        seriesId: '352a5857-193f-4672-9abf-c5302afd1c37',
        userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
        tenantId: globalThis.crypto.randomUUID(),
      },
      {
        id: globalThis.crypto.randomUUID(),
        code: 'EF01MA14PE',
        objective: `Identificar e nomear figuras planas (círculo, 
                    quadrado, retângulo e triângulo) em desenhos apresentados em 
                    diferentes disposições ou em contornos de faces de sólidos 
                    geométricos (explorando o uso de figuras planas para criação de 
                    desenhos, por exemplo colagem, lápis e papel, "carimbos”, entre 
                    outros).`,
        themathicUnit: 'Geometria',
        knowledgeArea: 'Matemática',
        knowledgeObjects: `Figuras geométricas planas: 
                    reconhecimento do formato das faces 
                    de figuras geométricas espaciais`,
        courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // ensino fundamental I
        disciplineId: '4ca48f5c-2987-4cab-9420-614d64d4d489',
        seriesId: '352a5857-193f-4672-9abf-c5302afd1c37',
        userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
        tenantId: globalThis.crypto.randomUUID(),
      },
      {
        id: globalThis.crypto.randomUUID(),
        code: 'EF01MA15PE',
        objective: `Comparar comprimentos, capacidades ou massas, 
                    utilizando termos como mais alto, mais baixo, mais comprido, mais 
                    curto, mais grosso, mais fino, mais largo, mais pesado, mais leve, 
                    cabe mais, cabe menos, entre outros, para ordenar objetos de uso 
                    cotidiano.`,
        themathicUnit: 'Grandezas e Medidas',
        knowledgeArea: 'Matemática',
        knowledgeObjects: `Estimativas e Medidas de comprimento, 
                    massa e capacidade: comparações e 
                    unidades de medida não convencionais`,
        courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // ensino fundamental I
        disciplineId: '4ca48f5c-2987-4cab-9420-614d64d4d489',
        seriesId: '352a5857-193f-4672-9abf-c5302afd1c37',
        userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
        tenantId: globalThis.crypto.randomUUID(),
      },
      {
        id: globalThis.crypto.randomUUID(),
        code: 'EF01MAXPE',
        objective: `Utilizar estimativa de comprimentos, capacidades e 
                    massas não convencionais (por exemplo: palmos, passos, copos 
                    d'água, entre outros).`,
        themathicUnit: 'Grandezas e Medidas',
        knowledgeArea: 'Matemática',
        knowledgeObjects: `Estimativas e Medidas de comprimento, 
                    massa e capacidade: comparações e 
                    unidades de medida não convencionais`,
        courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // ensino fundamental I
        disciplineId: '4ca48f5c-2987-4cab-9420-614d64d4d489',
        seriesId: '352a5857-193f-4672-9abf-c5302afd1c37',
        userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
        tenantId: globalThis.crypto.randomUUID(),
      },
      {
        id: globalThis.crypto.randomUUID(),
        code: 'EF01MA16PE',
        objective: `Relatar em linguagem verbal ou não verbal sequência 
                    de acontecimentos relativos a um dia, utilizando expressões, como 
                    antes, depois, durante, no fim de, etc, bem como, quando possível, 
                    registros dos horários dos eventos.`,
        themathicUnit: 'Grandezas e Medidas',
        knowledgeArea: 'Matemática',
        knowledgeObjects: `Estimativas e Medidas de tempo: 
                    unidades de medida de tempo, 
                    suas relações e o uso do calendário`,
        courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // ensino fundamental I
        disciplineId: '4ca48f5c-2987-4cab-9420-614d64d4d489',
        seriesId: '352a5857-193f-4672-9abf-c5302afd1c37',
        userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
        tenantId: globalThis.crypto.randomUUID(),
      },
      {
        id: globalThis.crypto.randomUUID(),
        code: 'EF01MA17PE',
        objective: `Reconhecer e relacionar períodos do dia, dias da 
                    semana e meses do ano, utilizando calendário, quando necessário.`,
        themathicUnit: 'Grandezas e Medidas',
        knowledgeArea: 'Matemática',
        knowledgeObjects: `Estimativas e Medidas de tempo: 
                    unidades de medida de tempo, 
                    suas relações e o uso do calendário`,
        courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // ensino fundamental I
        disciplineId: '4ca48f5c-2987-4cab-9420-614d64d4d489',
        seriesId: '352a5857-193f-4672-9abf-c5302afd1c37',
        userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
        tenantId: globalThis.crypto.randomUUID(),
      },
      {
        id: globalThis.crypto.randomUUID(),
        code: 'EF01MA18PE',
        objective: `Produzir uma data, oralmente e escrita, 
                    apresentando o dia, o mês e o ano, e indicar o dia da semana de uma 
                    data, consultando calendários.`,
        themathicUnit: 'Grandezas e Medidas',
        knowledgeArea: 'Matemática',
        knowledgeObjects: `Estimativas e Medidas de tempo: 
                    unidades de medida de tempo, 
                    suas relações e o uso do calendário`,
        courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // ensino fundamental I
        disciplineId: '4ca48f5c-2987-4cab-9420-614d64d4d489',
        seriesId: '352a5857-193f-4672-9abf-c5302afd1c37',
        userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
        tenantId: globalThis.crypto.randomUUID(),
      },
      {
        id: globalThis.crypto.randomUUID(),
        code: 'EF01MA19PE',
        objective: `Reconhecer e relacionar valores de moedas e 
                    cédulas do sistema monetário brasileiro para resolver situações 
                    simples do cotidiano do estudante, explorando diversos tipos de 
                    materiais manipuláveis.`,
        themathicUnit: 'Grandezas e Medidas',
        knowledgeArea: 'Matemática',
        knowledgeObjects: `Sistema monetário brasileiro: 
                    reconhecimento de cédulas e moedas`,
        courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // ensino fundamental I
        disciplineId: '4ca48f5c-2987-4cab-9420-614d64d4d489',
        seriesId: '352a5857-193f-4672-9abf-c5302afd1c37',
        userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
        tenantId: globalThis.crypto.randomUUID(),
      },
      {
        id: globalThis.crypto.randomUUID(),
        code: 'EF01MA20PE',
        objective: `Classificar eventos envolvendo o acaso, tais como 
                    “acontecerá com certeza”, “talvez aconteça” e “é impossível 
                    acontecer”, em situações do cotidiano.`,
        themathicUnit: 'Probabilidade e Estatística',
        knowledgeArea: 'Matemática',
        knowledgeObjects: `Noção de acaso`,
        courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // ensino fundamental I
        disciplineId: '4ca48f5c-2987-4cab-9420-614d64d4d489',
        seriesId: '352a5857-193f-4672-9abf-c5302afd1c37',
        userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
        tenantId: globalThis.crypto.randomUUID(),
      },
      {
        id: globalThis.crypto.randomUUID(),
        code: 'EF01MA21PE',
        objective: `Ler dados expressos em tabelas e em gráficos de 
                    colunas simples.`,
        themathicUnit: 'Probabilidade e Estatística',
        knowledgeArea: 'Matemática',
        knowledgeObjects: `Leitura de tabelas e de gráficos de colunas simples`,
        courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // ensino fundamental I
        disciplineId: '4ca48f5c-2987-4cab-9420-614d64d4d489',
        seriesId: '352a5857-193f-4672-9abf-c5302afd1c37',
        userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
        tenantId: globalThis.crypto.randomUUID(),
      },
      {
        id: globalThis.crypto.randomUUID(),
        code: 'EF01MA22PE',
        objective: `Realizar pesquisa, envolvendo até duas variáveis 
                    categóricas de seu interesse e universo de até 30 elementos, e 
                    organizar dados por meio de representações pessoais.`,
        themathicUnit: 'Probabilidade e Estatística',
        knowledgeArea: 'Matemática',
        knowledgeObjects: `Coleta e organização de informações, 
                    Registros pessoais para comunicação de informações coletadas`,
        courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // ensino fundamental I
        disciplineId: '4ca48f5c-2987-4cab-9420-614d64d4d489',
        seriesId: '352a5857-193f-4672-9abf-c5302afd1c37',
        userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
        tenantId: globalThis.crypto.randomUUID(),
      },

    ],
    skipDuplicates: true,
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
