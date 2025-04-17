import process from 'node:process'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.bncc.createMany({
    data: [
      {
        id: globalThis.crypto.randomUUID(),
        code: 'EF02MA01PE',
        objective: `Ler, comparar e ordenar números naturais (até a 
                ordem de centenas) pela compreensão de características do sistema 
                de numeração decimal (valor posicional e função do zero) e de sua 
                representação na reta numérica.`,
        themathicUnit: 'Números',
        knowledgeArea: 'Matemática',
        knowledgeObjects: `Leitura, escrita, comparação e ordenação de números de 
                até três ordens pela compreensão de características do 
                sistema de numeração decimal 
                (valor posicional e papel do zero)`,
        courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // ensino fundamental I
        disciplineId: '4ca48f5c-2987-4cab-9420-614d64d4d489',
        seriesId: 'a1eed49f-2832-467f-ae6f-7270244971ba',
        userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
        tenantId: globalThis.crypto.randomUUID(),
      },
      {
        id: globalThis.crypto.randomUUID(),
        code: 'EF02MA02PE',
        objective: `Fazer estimativas por meio de estratégias diversas a 
                respeito da quantidade de objetos de coleções e registrar o resultado 
                da contagem desses objetos (até 1000 unidades).`,
        themathicUnit: 'Números',
        knowledgeArea: 'Matemática',
        knowledgeObjects: `Leitura, escrita, comparação e ordenação de números de 
                até três ordens pela compreensão de características do 
                sistema de numeração decimal 
                (valor posicional e papel do zero)`,
        courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // ensino fundamental I
        disciplineId: '4ca48f5c-2987-4cab-9420-614d64d4d489',
        seriesId: 'a1eed49f-2832-467f-ae6f-7270244971ba',
        userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
        tenantId: globalThis.crypto.randomUUID(),
      },
      {
        id: globalThis.crypto.randomUUID(),
        code: 'EF02MA03PE',
        objective: `Comparar quantidades de objetos de dois conjuntos, 
                por estimativa e/ou por correspondência (um a um, dois a dois, entre 
                outros), para indicar “tem mais”, “tem menos” ou “tem a mesma 
                quantidade”, indicando, quando for o caso, quantos a mais e quantos 
                a menos.`,
        themathicUnit: 'Números',
        knowledgeArea: 'Matemática',
        knowledgeObjects: `Leitura, escrita, comparação e ordenação de números de 
                até três ordens pela compreensão de características do 
                sistema de numeração decimal 
                (valor posicional e papel do zero)`,
        courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // ensino fundamental I
        disciplineId: '4ca48f5c-2987-4cab-9420-614d64d4d489',
        seriesId: 'a1eed49f-2832-467f-ae6f-7270244971ba',
        userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
        tenantId: globalThis.crypto.randomUUID(),
      },
      {
        id: globalThis.crypto.randomUUID(),
        code: 'EF02MA04PE',
        objective: `Compor e decompor números naturais de até três 
                ordens, com suporte de material manipulável, por meio de diferentes 
                adições (por exemplo, compreender que 140 + 5 = 145 ou 145=140+5; 
                100+40+5=145 ou 145=100+40+5 etc.).`,
        themathicUnit: 'Números',
        knowledgeArea: 'Matemática',
        knowledgeObjects: `Composição e decomposição de números naturais 
                (até 1000)`,
        courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // ensino fundamental I
        disciplineId: '4ca48f5c-2987-4cab-9420-614d64d4d489',
        seriesId: 'a1eed49f-2832-467f-ae6f-7270244971ba',
        userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
        tenantId: globalThis.crypto.randomUUID(),
      },
      {
        id: globalThis.crypto.randomUUID(),
        code: 'EF02MA05PE',
        objective: `Construir fatos básicos da adição e subtração 
                (utilizando-se de diversas estratégias de cálculos: composição e 
                decomposição por meio de adições e subtrações, procedimentos de 
                contagem, diversas formas de representação) e utilizá-los no cálculo 
                mental ou escrito.`,
        themathicUnit: 'Números',
        knowledgeArea: 'Matemática',
        knowledgeObjects: `Construção de fatos fundamentais 
                da adição e da subtração`,
        courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // ensino fundamental I
        disciplineId: '4ca48f5c-2987-4cab-9420-614d64d4d489',
        seriesId: 'a1eed49f-2832-467f-ae6f-7270244971ba',
        userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
        tenantId: globalThis.crypto.randomUUID(),
      },
      {
        id: globalThis.crypto.randomUUID(),
        code: 'EF02MA06PE',
        objective: `Resolver e elaborar problemas de adição e de 
                subtração, envolvendo números de até três ordens, com os 
                significados de juntar, acrescentar, separar, retirar e comparar, 
                utilizando estratégias pessoais ou convencionais.`,
        themathicUnit: 'Números',
        knowledgeArea: 'Matemática',
        knowledgeObjects: `Problemas envolvendo diferentes 
                significados da adição e da subtração 
                (juntar, acrescentar, separar, retirar, comparar)`,
        courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // ensino fundamental I
        disciplineId: '4ca48f5c-2987-4cab-9420-614d64d4d489',
        seriesId: 'a1eed49f-2832-467f-ae6f-7270244971ba',
        userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
        tenantId: globalThis.crypto.randomUUID(),
      },
      {
        id: globalThis.crypto.randomUUID(),
        code: 'EF02MA07PE',
        objective: `Resolver e elaborar problemas de multiplicação (por 
                2, 3, 4 e 5) com a ideia de adição de parcelas iguais por meio de 
                estratégias e formas de registro pessoais, utilizando ou não suporte 
                de imagens e/ou material manipulável.`,
        themathicUnit: 'Números',
        knowledgeArea: 'Matemática',
        knowledgeObjects: `Problemas envolvendo adição de parcelas iguais 
                (multiplicação)`,
        courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // ensino fundamental I
        disciplineId: '4ca48f5c-2987-4cab-9420-614d64d4d489',
        seriesId: 'a1eed49f-2832-467f-ae6f-7270244971ba',
        userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
        tenantId: globalThis.crypto.randomUUID(),
      },
      {
        id: globalThis.crypto.randomUUID(),
        code: 'EF02MA08PE',
        objective: `Resolver e elaborar problemas envolvendo dobro, 
                metade, triplo e terça parte, com o suporte de imagens ou material 
                manipulável, utilizando estratégias pessoais.`,
        themathicUnit: 'Números',
        knowledgeArea: 'Matemática',
        knowledgeObjects: `Problemas envolvendo significados de dobro, 
                metade, triplo e terça parte`,
        courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // ensino fundamental I
        disciplineId: '4ca48f5c-2987-4cab-9420-614d64d4d489',
        seriesId: 'a1eed49f-2832-467f-ae6f-7270244971ba',
        userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
        tenantId: globalThis.crypto.randomUUID(),
      },
      {
        id: globalThis.crypto.randomUUID(),
        code: 'EF02MAXPE',
        objective: `Resolver problemas em linguagem verbal, envolvendo 
                as ideias de repartir uma coleção em partes iguais e de determinar 
                quantas vezes uma quantidade cabe em outra.`,
        themathicUnit: 'Números',
        knowledgeArea: 'Matemática',
        knowledgeObjects: `Problemas envolvendo significados de dobro, 
                metade, triplo e terça parte`,
        courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // ensino fundamental I
        disciplineId: '4ca48f5c-2987-4cab-9420-614d64d4d489',
        seriesId: 'a1eed49f-2832-467f-ae6f-7270244971ba',
        userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
        tenantId: globalThis.crypto.randomUUID(),
      },
      {
        id: globalThis.crypto.randomUUID(),
        code: 'EF02MA09PE',
        objective: `Construir sequências de números naturais em ordem 
                crescente ou decrescente a partir de um número qualquer, utilizando 
                uma regularidade estabelecida.`,
        themathicUnit: 'Álgebra',
        knowledgeArea: 'Matemática',
        knowledgeObjects: `Construção de sequências repetitivas e 
                de sequências recursivas`,
        courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // ensino fundamental I
        disciplineId: '4ca48f5c-2987-4cab-9420-614d64d4d489',
        seriesId: 'a1eed49f-2832-467f-ae6f-7270244971ba',
        userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
        tenantId: globalThis.crypto.randomUUID(),
      },
      {
        id: globalThis.crypto.randomUUID(),
        code: 'EF02MA10PE',
        objective: `Descrever um padrão (ou regularidade) de 
                sequências repetitivas e de sequências recursivas, por meio de 
                palavras, símbolos ou desenhos.`,
        themathicUnit: 'Álgebra',
        knowledgeArea: 'Matemática',
        knowledgeObjects: `Identificação de regularidade de sequências e 
                determinação de elementos ausentes na sequência`,
        courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // ensino fundamental I
        disciplineId: '4ca48f5c-2987-4cab-9420-614d64d4d489',
        seriesId: 'a1eed49f-2832-467f-ae6f-7270244971ba',
        userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
        tenantId: globalThis.crypto.randomUUID(),
      },
      {
        id: globalThis.crypto.randomUUID(),
        code: 'EF02MA11PE',
        objective: `Descrever os elementos ausentes em sequências 
                repetitivas e em sequências recursivas de números naturais, objetos 
                ou figuras.`,
        themathicUnit: 'Álgebra',
        knowledgeArea: 'Matemática',
        knowledgeObjects: `Identificação de regularidade de sequências e 
                determinação de elementos ausentes na sequência`,
        courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // ensino fundamental I
        disciplineId: '4ca48f5c-2987-4cab-9420-614d64d4d489',
        seriesId: 'a1eed49f-2832-467f-ae6f-7270244971ba',
        userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
        tenantId: globalThis.crypto.randomUUID(),
      },
      {
        id: globalThis.crypto.randomUUID(),
        code: 'EF02MA12PE',
        objective: `Identificar e registrar, em linguagem verbal ou não 
                verbal, a localização e os deslocamentos de pessoas e de objetos no 
                espaço, considerando mais de um ponto de referência, e indicar as 
                mudanças de direção e de sentido. (Por exemplo: descrever o 
                caminho da entrada da escola à sala de aula, usando pontos de 
                referência conhecidos).`,
        themathicUnit: 'Geometria',
        knowledgeArea: 'Matemática',
        knowledgeObjects: `Localização e movimentação de pessoas e objetos no 
                espaço, segundo pontos de referência e indicação de 
                mudanças de direção e sentido`,
        courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // ensino fundamental I
        disciplineId: '4ca48f5c-2987-4cab-9420-614d64d4d489',
        seriesId: 'a1eed49f-2832-467f-ae6f-7270244971ba',
        userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
        tenantId: globalThis.crypto.randomUUID(),
      },
      {
        id: globalThis.crypto.randomUUID(),
        code: 'EF02MA13PE',
        objective: `Esboçar roteiros a ser seguidos ou plantas de 
                ambientes familiares, assinalando entradas, saídas e alguns pontos 
                de referência.`,
        themathicUnit: 'Geometria',
        knowledgeArea: 'Matemática',
        knowledgeObjects: `Esboço de roteiros e de plantas simples`,
        courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // ensino fundamental I
        disciplineId: '4ca48f5c-2987-4cab-9420-614d64d4d489',
        seriesId: 'a1eed49f-2832-467f-ae6f-7270244971ba',
        userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
        tenantId: globalThis.crypto.randomUUID(),
      },
      {
        id: globalThis.crypto.randomUUID(),
        code: 'EF02MA14PE',
        objective: `Reconhecer, nomear e comparar figuras geométricas 
                espaciais (cubo, bloco retangular, pirâmide, cone, cilindro e esfera), 
                relacionando-as com objetos do mundo físico.`,
        themathicUnit: 'Geometria',
        knowledgeArea: 'Matemática',
        knowledgeObjects: `Figuras geométricas espaciais (cubo, 
                bloco retangular, pirâmide, cone, cilindro e esfera): 
                reconhecimento e características`,
        courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // ensino fundamental I
        disciplineId: '4ca48f5c-2987-4cab-9420-614d64d4d489',
        seriesId: 'a1eed49f-2832-467f-ae6f-7270244971ba',
        userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
        tenantId: globalThis.crypto.randomUUID(),
      },
      {
        id: globalThis.crypto.randomUUID(),
        code: 'EF02MA15PE',
        objective: `Reconhecer, comparar e nomear figuras planas 
                (círculo, quadrado, retângulo e triângulo) por meio de características 
                comuns em desenhos apresentados em diferentes disposições ou em 
                sólidos geométricos, utilizando materiais manipuláveis e/ou recursos 
                digitais.`,
        themathicUnit: 'Geometria',
        knowledgeArea: 'Matemática',
        knowledgeObjects: `Figuras geométricas planas 
                (círculo, quadrado, retângulo e triângulo): 
                reconhecimento e características`,
        courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // ensino fundamental I
        disciplineId: '4ca48f5c-2987-4cab-9420-614d64d4d489',
        seriesId: 'a1eed49f-2832-467f-ae6f-7270244971ba',
        userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
        tenantId: globalThis.crypto.randomUUID(),
      },
      {
        id: globalThis.crypto.randomUUID(),
        code: 'EF02MA16PE',
        objective: `Estimar, medir e comparar comprimentos de lados de 
                salas (incluindo contorno) e de polígonos, utilizando unidades de 
                medida não padronizadas (por exemplo: palmo, passo, pé, etc.) e 
                padronizadas (metro, centímetro e milímetro) e instrumentos 
                adequados (régua, fita métrica e etc.).`,
        themathicUnit: 'Grandezas e Medidas',
        knowledgeArea: 'Matemática',
        knowledgeObjects: `Medida de comprimento: unidades 
                não padronizadas e padronizadas 
                (metro, centímetro e milímetro)`,
        courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // ensino fundamental I
        disciplineId: '4ca48f5c-2987-4cab-9420-614d64d4d489',
        seriesId: 'a1eed49f-2832-467f-ae6f-7270244971ba',
        userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
        tenantId: globalThis.crypto.randomUUID(),
      },
      {
        id: globalThis.crypto.randomUUID(),
        code: 'EF02MA17PE',
        objective: `Estimar, medir e comparar capacidade e massa, 
                utilizando estratégias pessoais e unidades de medida não 
                padronizadas ( copo, xícara, garrafa, colher, etc.) ou padronizadas 
                (litro, mililitro, centímetro cúbico, grama e quilograma) e instrumentos 
                adequados (balança, recipiente graduado, etc.).`,
        themathicUnit: 'Grandezas e Medidas',
        knowledgeArea: 'Matemática',
        knowledgeObjects: `Medida de capacidade e de massa: unidades de medida 
                não convencionais e convencionais 
                (litro, mililitro, cm3, grama e quilograma)`,
        courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // ensino fundamental I
        disciplineId: '4ca48f5c-2987-4cab-9420-614d64d4d489',
        seriesId: 'a1eed49f-2832-467f-ae6f-7270244971ba',
        userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
        tenantId: globalThis.crypto.randomUUID(),
      },
      {
        id: globalThis.crypto.randomUUID(),
        code: 'EF02MA18PE',
        objective: `Indicar a duração de intervalos de tempo entre duas 
                datas, como dias da semana e meses do ano, utilizando calendário, 
                para planejamentos e organização de agenda.`,
        themathicUnit: 'Grandezas e Medidas',
        knowledgeArea: 'Matemática',
        knowledgeObjects: `Medidas de tempo: intervalo de tempo, 
                uso do calendário, leitura de horas em relógios 
                analógico e digitais e ordenação de datas`,
        courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // ensino fundamental I
        disciplineId: '4ca48f5c-2987-4cab-9420-614d64d4d489',
        seriesId: 'a1eed49f-2832-467f-ae6f-7270244971ba',
        userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
        tenantId: globalThis.crypto.randomUUID(),
      },
      {
        id: globalThis.crypto.randomUUID(),
        code: 'EF02MA19PE',
        objective: `Ler e medir a duração de um intervalo de tempo por 
                meio de relógio analógico e digital, registrar o horário do início e do 
                fim do intervalo.`,
        themathicUnit: 'Grandezas e Medidas',
        knowledgeArea: 'Matemática',
        knowledgeObjects: `Medidas de tempo: intervalo de tempo, 
                uso do calendário, leitura de horas em relógios 
                analógico e digitais e ordenação de datas`,
        courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // ensino fundamental I
        disciplineId: '4ca48f5c-2987-4cab-9420-614d64d4d489',
        seriesId: 'a1eed49f-2832-467f-ae6f-7270244971ba',
        userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
        tenantId: globalThis.crypto.randomUUID(),
      },
      {
        id: globalThis.crypto.randomUUID(),
        code: 'EF02MAXPE',
        objective: `Ler hora cheia (três horas, seis horas etc.), meia hora 
                (dez horas e meia etc.) e quartos de hora (cinco horas e quinze 
                minutos etc.), em relógio digital e relógio analógico.`,
        themathicUnit: 'Grandezas e Medidas',
        knowledgeArea: 'Matemática',
        knowledgeObjects: `Medidas de tempo: intervalo de tempo, 
                uso do calendário, leitura de horas em relógios 
                analógico e digitais e ordenação de datas`,
        courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // ensino fundamental I
        disciplineId: '4ca48f5c-2987-4cab-9420-614d64d4d489',
        seriesId: 'a1eed49f-2832-467f-ae6f-7270244971ba',
        userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
        tenantId: globalThis.crypto.randomUUID(),
      },
      {
        id: globalThis.crypto.randomUUID(),
        code: 'EF02MA20PE',
        objective: `Estabelecer a equivalência de valores entre moedas 
                e cédulas do sistema monetário brasileiro para resolver situações 
                cotidianas.`,
        themathicUnit: 'Grandezas e Medidas',
        knowledgeArea: 'Matemática',
        knowledgeObjects: `Sistema monetário brasileiro: reconhecimento de 
                cédulas e moedas e equivalência de valores`,
        courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // ensino fundamental I
        disciplineId: '4ca48f5c-2987-4cab-9420-614d64d4d489',
        seriesId: 'a1eed49f-2832-467f-ae6f-7270244971ba',
        userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
        tenantId: globalThis.crypto.randomUUID(),
      },
      {
        id: globalThis.crypto.randomUUID(),
        code: 'EF02MA21PE',
        objective: `Classificar resultados de eventos cotidianos 
                aleatórios como “pouco prováveis”, “muito prováveis”, “improváveis” e 
                “impossíveis”.`,
        themathicUnit: 'Probabilidade e Estatística',
        knowledgeArea: 'Matemática',
        knowledgeObjects: `Análise da ideia de aleatório em 
                situações do cotidiano`,
        courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // ensino fundamental I
        disciplineId: '4ca48f5c-2987-4cab-9420-614d64d4d489',
        seriesId: 'a1eed49f-2832-467f-ae6f-7270244971ba',
        userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
        tenantId: globalThis.crypto.randomUUID(),
      },
      {
        id: globalThis.crypto.randomUUID(),
        code: 'EF02MA22PE',
        objective: `Comparar informações de pesquisas apresentadas 
                por meio de tabelas de dupla entrada e em gráficos de colunas simples 
                ou barras para melhor compreender aspectos da realidade próxima.`,
        themathicUnit: 'Probabilidade e Estatística',
        knowledgeArea: 'Matemática',
        knowledgeObjects: `Coleta, classificação e representação de 
                dados em tabelas simples e de dupla 
                entrada e em gráficos de colunas`,
        courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // ensino fundamental I
        disciplineId: '4ca48f5c-2987-4cab-9420-614d64d4d489',
        seriesId: 'a1eed49f-2832-467f-ae6f-7270244971ba',
        userCreated: '45973489-ab5c-4d36-b5c0-842dff919a65', // Yohan professor
        tenantId: globalThis.crypto.randomUUID(),
      },
      {
        id: globalThis.crypto.randomUUID(),
        code: 'EF02MA23PE',
        objective: `Realizar pesquisa em universo de até 30 elementos, 
                escolhendo até três variáveis categóricas de seu interesse, 
                organizando os dados coletados em listas, tabelas e gráficos de 
                colunas simples.`,
        themathicUnit: 'Probabilidade e Estatística',
        knowledgeArea: 'Matemática',
        knowledgeObjects: `Coleta, classificação e representação de 
                dados em tabelas simples e de dupla 
                entrada e em gráficos de colunas`,
        courseId: '23ca0e75-5344-42c6-9640-97cc5bad6e94', // ensino fundamental I
        disciplineId: '4ca48f5c-2987-4cab-9420-614d64d4d489',
        seriesId: 'a1eed49f-2832-467f-ae6f-7270244971ba',
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
