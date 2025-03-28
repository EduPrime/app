import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.thematicUnit.createMany({
    data: [
      {
        name: 'Leitura/Escrita',
        seriesId: '352a5857-193f-4672-9abf-c5302afd1c37',
        disciplineId: '6862a800-92c3-4d46-8740-62a02a5e5cf9',
      },
      {
        name: 'Escrita',
        seriesId: '352a5857-193f-4672-9abf-c5302afd1c37',
        disciplineId: '6862a800-92c3-4d46-8740-62a02a5e5cf9',
      },
      {
        name: 'Oralidade',
        seriesId: '352a5857-193f-4672-9abf-c5302afd1c37',
        disciplineId: '6862a800-92c3-4d46-8740-62a02a5e5cf9',
      },
      {
        name: 'Produção de Textos',
        seriesId: '352a5857-193f-4672-9abf-c5302afd1c37',
        disciplineId: '6862a800-92c3-4d46-8740-62a02a5e5cf9',
      },
      {
        name: 'Análise Linguística/semiótica',
        seriesId: '352a5857-193f-4672-9abf-c5302afd1c37',
        disciplineId: '6862a800-92c3-4d46-8740-62a02a5e5cf9',
      },
      {
        name: 'Números',
        seriesId: '352a5857-193f-4672-9abf-c5302afd1c37',
        disciplineId: '4ca48f5c-2987-4cab-9420-614d64d4d489',
      },
      {
        name: 'Álgebra',
        seriesId: '352a5857-193f-4672-9abf-c5302afd1c37',
        disciplineId: '4ca48f5c-2987-4cab-9420-614d64d4d489',
      },
      {
        name: 'Geometria',
        seriesId: '352a5857-193f-4672-9abf-c5302afd1c37',
        disciplineId: '4ca48f5c-2987-4cab-9420-614d64d4d489',
      },
      {
        name: 'Grandezas e Medidas',
        seriesId: '352a5857-193f-4672-9abf-c5302afd1c37',
        disciplineId: '4ca48f5c-2987-4cab-9420-614d64d4d489',
      },
      {
        name: 'Probabilidade e Estatística',
        seriesId: '352a5857-193f-4672-9abf-c5302afd1c37',
        disciplineId: '4ca48f5c-2987-4cab-9420-614d64d4d489',
      },
      {
        name: 'Artes Visuais',
        seriesId: '352a5857-193f-4672-9abf-c5302afd1c37',
        disciplineId: '9a7b90a1-feff-4a47-8224-0ab8352e090a',
      },
      {
        name: 'Dança',
        seriesId: '352a5857-193f-4672-9abf-c5302afd1c37',
        disciplineId: '9a7b90a1-feff-4a47-8224-0ab8352e090a',
      },
      {
        name: 'Música',
        seriesId: '352a5857-193f-4672-9abf-c5302afd1c37',
        disciplineId: '9a7b90a1-feff-4a47-8224-0ab8352e090a',
      },
      {
        name: 'Teatro',
        seriesId: '352a5857-193f-4672-9abf-c5302afd1c37',
        disciplineId: '9a7b90a1-feff-4a47-8224-0ab8352e090a',
      },
      {
        name: 'Mundo pessoal: meu lugar no mundo',
        seriesId: '352a5857-193f-4672-9abf-c5302afd1c37',
        disciplineId: '59f326bf-7a1f-4b66-9049-b7df572f901b',
      },
      {
        name: 'Mundo pessoal: eu, meu grupo social e meu tempo',
        seriesId: '352a5857-193f-4672-9abf-c5302afd1c37',
        disciplineId: '59f326bf-7a1f-4b66-9049-b7df572f901b',
      },
      {
        name: 'Matéria e energia',
        seriesId: '352a5857-193f-4672-9abf-c5302afd1c37',
        disciplineId: '5e34bc6d-37ce-49cd-905f-d0c002f42a96',
      },
      {
        name: 'Vida e evolução',
        seriesId: '352a5857-193f-4672-9abf-c5302afd1c37',
        disciplineId: '5e34bc6d-37ce-49cd-905f-d0c002f42a96',
      },
      {
        name: 'Terra e universo',
        seriesId: '352a5857-193f-4672-9abf-c5302afd1c37',
        disciplineId: '5e34bc6d-37ce-49cd-905f-d0c002f42a96',
      },
      {
        name: 'Identidades e alteridades',
        seriesId: '352a5857-193f-4672-9abf-c5302afd1c37',
        disciplineId: '6988e9d0-6b6b-44fe-adbe-7af90a8a0e27',
      },
      {
        name: 'Manifestações religiosas',
        seriesId: '352a5857-193f-4672-9abf-c5302afd1c37',
        disciplineId: '6988e9d0-6b6b-44fe-adbe-7af90a8a0e27',
      },
      {
        name: 'O Sujeito e seu lugar no mundo',
        seriesId: '352a5857-193f-4672-9abf-c5302afd1c37',
        disciplineId: '9747133a-8225-4eaf-9a88-40ca56f94698',
      },
      {
        name: 'Conexões e escalas',
        seriesId: '352a5857-193f-4672-9abf-c5302afd1c37',
        disciplineId: '9747133a-8225-4eaf-9a88-40ca56f94698',
      },
      {
        name: 'Mundo do trabalho',
        seriesId: '352a5857-193f-4672-9abf-c5302afd1c37',
        disciplineId: '9747133a-8225-4eaf-9a88-40ca56f94698',
      },
      {
        name: 'Formas de representação e pensamento espacial',
        seriesId: '352a5857-193f-4672-9abf-c5302afd1c37',
        disciplineId: '9747133a-8225-4eaf-9a88-40ca56f94698',
      },
      {
        name: 'Natureza, ambiente e qualidade de vida',
        seriesId: '352a5857-193f-4672-9abf-c5302afd1c37',
        disciplineId: '9747133a-8225-4eaf-9a88-40ca56f94698',
      },
      {
        name: 'Brincadeiras e jogos',
        seriesId: '352a5857-193f-4672-9abf-c5302afd1c37',
        disciplineId: '9825f111-81f3-4f34-ab36-7a30387d0c14',
      },
      {
        name: 'Esportes',
        seriesId: '352a5857-193f-4672-9abf-c5302afd1c37',
        disciplineId: '9825f111-81f3-4f34-ab36-7a30387d0c14',
      },
      {
        name: 'Ginásticas',
        seriesId: '352a5857-193f-4672-9abf-c5302afd1c37',
        disciplineId: '9825f111-81f3-4f34-ab36-7a30387d0c14',
      },
      {
        name: 'Danças',
        seriesId: '352a5857-193f-4672-9abf-c5302afd1c37',
        disciplineId: '9825f111-81f3-4f34-ab36-7a30387d0c14',
      },
      {
        name: 'Leitura/Escrita',
        seriesId: 'a1eed49f-2832-467f-ae6f-7270244971ba',
        disciplineId: '6862a800-92c3-4d46-8740-62a02a5e5cf9',
      },
      {
        name: 'Escrita',
        seriesId: 'a1eed49f-2832-467f-ae6f-7270244971ba',
        disciplineId: '6862a800-92c3-4d46-8740-62a02a5e5cf9',
      },
      {
        name: 'Oralidade',
        seriesId: 'a1eed49f-2832-467f-ae6f-7270244971ba',
        disciplineId: '6862a800-92c3-4d46-8740-62a02a5e5cf9',
      },
      {
        name: 'Produção de Textos',
        seriesId: 'a1eed49f-2832-467f-ae6f-7270244971ba',
        disciplineId: '6862a800-92c3-4d46-8740-62a02a5e5cf9',
      },
      {
        name: 'Análise Linguística/semiótica',
        seriesId: 'a1eed49f-2832-467f-ae6f-7270244971ba',
        disciplineId: '6862a800-92c3-4d46-8740-62a02a5e5cf9',
      },
      {
        name: 'Números',
        seriesId: 'a1eed49f-2832-467f-ae6f-7270244971ba',
        disciplineId: '4ca48f5c-2987-4cab-9420-614d64d4d489',
      },
      {
        name: 'Álgebra',
        seriesId: 'a1eed49f-2832-467f-ae6f-7270244971ba',
        disciplineId: '4ca48f5c-2987-4cab-9420-614d64d4d489',
      },
      {
        name: 'Geometria',
        seriesId: 'a1eed49f-2832-467f-ae6f-7270244971ba',
        disciplineId: '4ca48f5c-2987-4cab-9420-614d64d4d489',
      },
      {
        name: 'Grandezas e Medidas',
        seriesId: 'a1eed49f-2832-467f-ae6f-7270244971ba',
        disciplineId: '4ca48f5c-2987-4cab-9420-614d64d4d489',
      },
      {
        name: 'Probabilidade e Estatística',
        seriesId: 'a1eed49f-2832-467f-ae6f-7270244971ba',
        disciplineId: '4ca48f5c-2987-4cab-9420-614d64d4d489',
      },
      {
        name: 'Artes Visuais',
        seriesId: 'a1eed49f-2832-467f-ae6f-7270244971ba',
        disciplineId: '9a7b90a1-feff-4a47-8224-0ab8352e090a',
      },
      {
        name: 'Dança',
        seriesId: 'a1eed49f-2832-467f-ae6f-7270244971ba',
        disciplineId: '9a7b90a1-feff-4a47-8224-0ab8352e090a',
      },
      {
        name: 'Música',
        seriesId: 'a1eed49f-2832-467f-ae6f-7270244971ba',
        disciplineId: '9a7b90a1-feff-4a47-8224-0ab8352e090a',
      },
      {
        name: 'Teatro',
        seriesId: 'a1eed49f-2832-467f-ae6f-7270244971ba',
        disciplineId: '9a7b90a1-feff-4a47-8224-0ab8352e090a',
      },
      {
        name: 'A comunidade e seus registros',
        seriesId: 'a1eed49f-2832-467f-ae6f-7270244971ba',
        disciplineId: '59f326bf-7a1f-4b66-9049-b7df572f901b',
      },
      {
        name: 'As formas de registrar as experiências da comunidade',
        seriesId: 'a1eed49f-2832-467f-ae6f-7270244971ba',
        disciplineId: '59f326bf-7a1f-4b66-9049-b7df572f901b',
      },
      {
        name: 'O trabalho e a sustentabilidade na comunidade',
        seriesId: 'a1eed49f-2832-467f-ae6f-7270244971ba',
        disciplineId: '59f326bf-7a1f-4b66-9049-b7df572f901b',
      },
      {
        name: 'Matéria e energia',
        seriesId: 'a1eed49f-2832-467f-ae6f-7270244971ba',
        disciplineId: '5e34bc6d-37ce-49cd-905f-d0c002f42a96',
      },
      {
        name: 'Vida e evolução',
        seriesId: 'a1eed49f-2832-467f-ae6f-7270244971ba',
        disciplineId: '5e34bc6d-37ce-49cd-905f-d0c002f42a96',
      },
      {
        name: 'Terra e universo',
        seriesId: 'a1eed49f-2832-467f-ae6f-7270244971ba',
        disciplineId: '5e34bc6d-37ce-49cd-905f-d0c002f42a96',
      },
      {
        name: 'Identidades e alteridades',
        seriesId: 'a1eed49f-2832-467f-ae6f-7270244971ba',
        disciplineId: '6988e9d0-6b6b-44fe-adbe-7af90a8a0e27',
      },
      {
        name: 'Manifestações religiosas',
        seriesId: 'a1eed49f-2832-467f-ae6f-7270244971ba',
        disciplineId: '6988e9d0-6b6b-44fe-adbe-7af90a8a0e27',
      },
      {
        name: 'O Sujeito e seu lugar no mundo',
        seriesId: 'a1eed49f-2832-467f-ae6f-7270244971ba',
        disciplineId: '9747133a-8225-4eaf-9a88-40ca56f94698',
      },
      {
        name: 'Conexões e escalas',
        seriesId: 'a1eed49f-2832-467f-ae6f-7270244971ba',
        disciplineId: '9747133a-8225-4eaf-9a88-40ca56f94698',
      },
      {
        name: 'Mundo do trabalho',
        seriesId: 'a1eed49f-2832-467f-ae6f-7270244971ba',
        disciplineId: '9747133a-8225-4eaf-9a88-40ca56f94698',
      },
      {
        name: 'Formas de representação e pensamento espacial',
        seriesId: 'a1eed49f-2832-467f-ae6f-7270244971ba',
        disciplineId: '9747133a-8225-4eaf-9a88-40ca56f94698',
      },
      {
        name: 'Natureza, ambiente e qualidade de vida',
        seriesId: 'a1eed49f-2832-467f-ae6f-7270244971ba',
        disciplineId: '9747133a-8225-4eaf-9a88-40ca56f94698',
      },
      {
        name: 'Brincadeiras e jogos',
        seriesId: 'a1eed49f-2832-467f-ae6f-7270244971ba',
        disciplineId: '9825f111-81f3-4f34-ab36-7a30387d0c14',
      },
      {
        name: 'Esportes',
        seriesId: 'a1eed49f-2832-467f-ae6f-7270244971ba',
        disciplineId: '9825f111-81f3-4f34-ab36-7a30387d0c14',
      },
      {
        name: 'Ginásticas',
        seriesId: 'a1eed49f-2832-467f-ae6f-7270244971ba',
        disciplineId: '9825f111-81f3-4f34-ab36-7a30387d0c14',
      },
      {
        name: 'Danças',
        seriesId: 'a1eed49f-2832-467f-ae6f-7270244971ba',
        disciplineId: '9825f111-81f3-4f34-ab36-7a30387d0c14',
      },
      {
        name: 'Leitura/Escrita',
        seriesId: 'c459fbfb-c33e-4d02-bb30-2875f1904e39',
        disciplineId: '6862a800-92c3-4d46-8740-62a02a5e5cf9',
      },
      {
        name: 'Escrita',
        seriesId: 'c459fbfb-c33e-4d02-bb30-2875f1904e39',
        disciplineId: '6862a800-92c3-4d46-8740-62a02a5e5cf9',
      },
      {
        name: 'Oralidade',
        seriesId: 'c459fbfb-c33e-4d02-bb30-2875f1904e39',
        disciplineId: '6862a800-92c3-4d46-8740-62a02a5e5cf9',
      },
      {
        name: 'Produção de Textos',
        seriesId: 'c459fbfb-c33e-4d02-bb30-2875f1904e39',
        disciplineId: '6862a800-92c3-4d46-8740-62a02a5e5cf9',
      },
      {
        name: 'Análise Linguística/semiótica',
        seriesId: 'c459fbfb-c33e-4d02-bb30-2875f1904e39',
        disciplineId: '6862a800-92c3-4d46-8740-62a02a5e5cf9',
      },
      {
        name: 'Números',
        seriesId: 'c459fbfb-c33e-4d02-bb30-2875f1904e39',
        disciplineId: '4ca48f5c-2987-4cab-9420-614d64d4d489',
      },
      {
        name: 'Álgebra',
        seriesId: 'c459fbfb-c33e-4d02-bb30-2875f1904e39',
        disciplineId: '4ca48f5c-2987-4cab-9420-614d64d4d489',
      },
      {
        name: 'Geometria',
        seriesId: 'c459fbfb-c33e-4d02-bb30-2875f1904e39',
        disciplineId: '4ca48f5c-2987-4cab-9420-614d64d4d489',
      },
      {
        name: 'Grandezas e Medidas',
        seriesId: 'c459fbfb-c33e-4d02-bb30-2875f1904e39',
        disciplineId: '4ca48f5c-2987-4cab-9420-614d64d4d489',
      },
      {
        name: 'Probabilidade e Estatística',
        seriesId: 'c459fbfb-c33e-4d02-bb30-2875f1904e39',
        disciplineId: '4ca48f5c-2987-4cab-9420-614d64d4d489',
      },
      {
        name: 'Artes Visuais',
        seriesId: 'c459fbfb-c33e-4d02-bb30-2875f1904e39',
        disciplineId: '9a7b90a1-feff-4a47-8224-0ab8352e090a',
      },
      {
        name: 'Dança',
        seriesId: 'c459fbfb-c33e-4d02-bb30-2875f1904e39',
        disciplineId: '9a7b90a1-feff-4a47-8224-0ab8352e090a',
      },
      {
        name: 'Música',
        seriesId: 'c459fbfb-c33e-4d02-bb30-2875f1904e39',
        disciplineId: '9a7b90a1-feff-4a47-8224-0ab8352e090a',
      },
      {
        name: 'Teatro',
        seriesId: 'c459fbfb-c33e-4d02-bb30-2875f1904e39',
        disciplineId: '9a7b90a1-feff-4a47-8224-0ab8352e090a',
      },
      {
        name: 'As pessoas e os grupos que compõem a cidade e o município',
        seriesId: 'c459fbfb-c33e-4d02-bb30-2875f1904e39',
        disciplineId: '59f326bf-7a1f-4b66-9049-b7df572f901b',
      },
      {
        name: 'O lugar em que vive',
        seriesId: 'c459fbfb-c33e-4d02-bb30-2875f1904e39',
        disciplineId: '59f326bf-7a1f-4b66-9049-b7df572f901b',
      },
      {
        name: 'A noção de espaço público e privado',
        seriesId: 'c459fbfb-c33e-4d02-bb30-2875f1904e39',
        disciplineId: '59f326bf-7a1f-4b66-9049-b7df572f901b',
      },
      {
        name: 'Matéria e energia',
        seriesId: 'c459fbfb-c33e-4d02-bb30-2875f1904e39',
        disciplineId: '5e34bc6d-37ce-49cd-905f-d0c002f42a96',
      },
      {
        name: 'Vida e evolução',
        seriesId: 'c459fbfb-c33e-4d02-bb30-2875f1904e39',
        disciplineId: '5e34bc6d-37ce-49cd-905f-d0c002f42a96',
      },
      {
        name: 'Terra e universo',
        seriesId: 'c459fbfb-c33e-4d02-bb30-2875f1904e39',
        disciplineId: '5e34bc6d-37ce-49cd-905f-d0c002f42a96',
      },
      {
        name: 'Identidades e alteridades',
        seriesId: 'c459fbfb-c33e-4d02-bb30-2875f1904e39',
        disciplineId: '6988e9d0-6b6b-44fe-adbe-7af90a8a0e27',
      },
      {
        name: 'Manifestações religiosas',
        seriesId: 'c459fbfb-c33e-4d02-bb30-2875f1904e39',
        disciplineId: '6988e9d0-6b6b-44fe-adbe-7af90a8a0e27',
      },
      {
        name: 'O Sujeito e seu lugar no mundo',
        seriesId: 'c459fbfb-c33e-4d02-bb30-2875f1904e39',
        disciplineId: '9747133a-8225-4eaf-9a88-40ca56f94698',
      },
      {
        name: 'Conexões e escalas',
        seriesId: 'c459fbfb-c33e-4d02-bb30-2875f1904e39',
        disciplineId: '9747133a-8225-4eaf-9a88-40ca56f94698',
      },
      {
        name: 'Mundo do trabalho',
        seriesId: 'c459fbfb-c33e-4d02-bb30-2875f1904e39',
        disciplineId: '9747133a-8225-4eaf-9a88-40ca56f94698',
      },
      {
        name: 'Formas de representação e pensamento espacial',
        seriesId: 'c459fbfb-c33e-4d02-bb30-2875f1904e39',
        disciplineId: '9747133a-8225-4eaf-9a88-40ca56f94698',
      },
      {
        name: 'Natureza, ambiente e qualidade de vida',
        seriesId: 'c459fbfb-c33e-4d02-bb30-2875f1904e39',
        disciplineId: '9747133a-8225-4eaf-9a88-40ca56f94698',
      },
      {
        name: 'Brincadeiras e jogos',
        seriesId: 'c459fbfb-c33e-4d02-bb30-2875f1904e39',
        disciplineId: '9825f111-81f3-4f34-ab36-7a30387d0c14',
      },
      {
        name: 'Esportes',
        seriesId: 'c459fbfb-c33e-4d02-bb30-2875f1904e39',
        disciplineId: '9825f111-81f3-4f34-ab36-7a30387d0c14',
      },
      {
        name: 'Ginásticas',
        seriesId: 'c459fbfb-c33e-4d02-bb30-2875f1904e39',
        disciplineId: '9825f111-81f3-4f34-ab36-7a30387d0c14',
      },
      {
        name: 'Danças',
        seriesId: 'c459fbfb-c33e-4d02-bb30-2875f1904e39',
        disciplineId: '9825f111-81f3-4f34-ab36-7a30387d0c14',
      },
      {
        name: 'Lutas',
        seriesId: 'c459fbfb-c33e-4d02-bb30-2875f1904e39',
        disciplineId: '9825f111-81f3-4f34-ab36-7a30387d0c14',
      },
      {
        name: 'Leitura/Escrita',
        seriesId: 'd131b737-72ff-4c5c-9fd6-1dbd810b5cce',
        disciplineId: '6862a800-92c3-4d46-8740-62a02a5e5cf9',
      },
      {
        name: 'Escrita',
        seriesId: 'd131b737-72ff-4c5c-9fd6-1dbd810b5cce',
        disciplineId: '6862a800-92c3-4d46-8740-62a02a5e5cf9',
      },
      {
        name: 'Oralidade',
        seriesId: 'd131b737-72ff-4c5c-9fd6-1dbd810b5cce',
        disciplineId: '6862a800-92c3-4d46-8740-62a02a5e5cf9',
      },
      {
        name: 'Produção de Textos',
        seriesId: 'd131b737-72ff-4c5c-9fd6-1dbd810b5cce',
        disciplineId: '6862a800-92c3-4d46-8740-62a02a5e5cf9',
      },
      {
        name: 'Análise Linguística/semiótica',
        seriesId: 'd131b737-72ff-4c5c-9fd6-1dbd810b5cce',
        disciplineId: '6862a800-92c3-4d46-8740-62a02a5e5cf9',
      },
      {
        name: 'Números',
        seriesId: 'd131b737-72ff-4c5c-9fd6-1dbd810b5cce',
        disciplineId: '4ca48f5c-2987-4cab-9420-614d64d4d489',
      },
      {
        name: 'Álgebra',
        seriesId: 'd131b737-72ff-4c5c-9fd6-1dbd810b5cce',
        disciplineId: '4ca48f5c-2987-4cab-9420-614d64d4d489',
      },
      {
        name: 'Geometria',
        seriesId: 'd131b737-72ff-4c5c-9fd6-1dbd810b5cce',
        disciplineId: '4ca48f5c-2987-4cab-9420-614d64d4d489',
      },
      {
        name: 'Grandezas e Medidas',
        seriesId: 'd131b737-72ff-4c5c-9fd6-1dbd810b5cce',
        disciplineId: '4ca48f5c-2987-4cab-9420-614d64d4d489',
      },
      {
        name: 'Probabilidade e Estatística',
        seriesId: 'd131b737-72ff-4c5c-9fd6-1dbd810b5cce',
        disciplineId: '4ca48f5c-2987-4cab-9420-614d64d4d489',
      },
      {
        name: 'Artes Visuais',
        seriesId: 'd131b737-72ff-4c5c-9fd6-1dbd810b5cce',
        disciplineId: '9a7b90a1-feff-4a47-8224-0ab8352e090a',
      },
      {
        name: 'Dança',
        seriesId: 'd131b737-72ff-4c5c-9fd6-1dbd810b5cce',
        disciplineId: '9a7b90a1-feff-4a47-8224-0ab8352e090a',
      },
      {
        name: 'Música',
        seriesId: 'd131b737-72ff-4c5c-9fd6-1dbd810b5cce',
        disciplineId: '9a7b90a1-feff-4a47-8224-0ab8352e090a',
      },
      {
        name: 'Teatro',
        seriesId: 'd131b737-72ff-4c5c-9fd6-1dbd810b5cce',
        disciplineId: '9a7b90a1-feff-4a47-8224-0ab8352e090a',
      },
      {
        name: 'Transformações e permanências nas trajetórias dos grupos humanos',
        seriesId: 'd131b737-72ff-4c5c-9fd6-1dbd810b5cce',
        disciplineId: '59f326bf-7a1f-4b66-9049-b7df572f901b',
      },
      {
        name: 'Circulação de pessoas, produtos e culturas',
        seriesId: 'd131b737-72ff-4c5c-9fd6-1dbd810b5cce',
        disciplineId: '59f326bf-7a1f-4b66-9049-b7df572f901b',
      },
      {
        name: 'As questões históricas relativas às migrações',
        seriesId: 'd131b737-72ff-4c5c-9fd6-1dbd810b5cce',
        disciplineId: '59f326bf-7a1f-4b66-9049-b7df572f901b',
      },
      {
        name: 'Matéria e energia',
        seriesId: 'd131b737-72ff-4c5c-9fd6-1dbd810b5cce',
        disciplineId: '5e34bc6d-37ce-49cd-905f-d0c002f42a96',
      },
      {
        name: 'Vida e evolução',
        seriesId: 'd131b737-72ff-4c5c-9fd6-1dbd810b5cce',
        disciplineId: '5e34bc6d-37ce-49cd-905f-d0c002f42a96',
      },
      {
        name: 'Terra e universo',
        seriesId: 'd131b737-72ff-4c5c-9fd6-1dbd810b5cce',
        disciplineId: '5e34bc6d-37ce-49cd-905f-d0c002f42a96',
      },
      {
        name: 'Crenças religiosas e filosofias de vida',
        seriesId: 'd131b737-72ff-4c5c-9fd6-1dbd810b5cce',
        disciplineId: '6988e9d0-6b6b-44fe-adbe-7af90a8a0e27',
      },
      {
        name: 'Manifestações religiosas',
        seriesId: 'd131b737-72ff-4c5c-9fd6-1dbd810b5cce',
        disciplineId: '6988e9d0-6b6b-44fe-adbe-7af90a8a0e27',
      },
      {
        name: 'O Sujeito e seu lugar no mundo',
        seriesId: 'd131b737-72ff-4c5c-9fd6-1dbd810b5cce',
        disciplineId: '9747133a-8225-4eaf-9a88-40ca56f94698',
      },
      {
        name: 'Conexões e escalas',
        seriesId: 'd131b737-72ff-4c5c-9fd6-1dbd810b5cce',
        disciplineId: '9747133a-8225-4eaf-9a88-40ca56f94698',
      },
      {
        name: 'Mundo do trabalho',
        seriesId: 'd131b737-72ff-4c5c-9fd6-1dbd810b5cce',
        disciplineId: '9747133a-8225-4eaf-9a88-40ca56f94698',
      },
      {
        name: 'Formas de representação e pensamento espacial',
        seriesId: 'd131b737-72ff-4c5c-9fd6-1dbd810b5cce',
        disciplineId: '9747133a-8225-4eaf-9a88-40ca56f94698',
      },
      {
        name: 'Natureza, ambiente e qualidade de vida',
        seriesId: 'd131b737-72ff-4c5c-9fd6-1dbd810b5cce',
        disciplineId: '9747133a-8225-4eaf-9a88-40ca56f94698',
      },
      {
        name: 'Brincadeiras e jogos',
        seriesId: 'd131b737-72ff-4c5c-9fd6-1dbd810b5cce',
        disciplineId: '9825f111-81f3-4f34-ab36-7a30387d0c14',
      },
      {
        name: 'Esportes',
        seriesId: 'd131b737-72ff-4c5c-9fd6-1dbd810b5cce',
        disciplineId: '9825f111-81f3-4f34-ab36-7a30387d0c14',
      },
      {
        name: 'Ginásticas',
        seriesId: 'd131b737-72ff-4c5c-9fd6-1dbd810b5cce',
        disciplineId: '9825f111-81f3-4f34-ab36-7a30387d0c14',
      },
      {
        name: 'Danças',
        seriesId: 'd131b737-72ff-4c5c-9fd6-1dbd810b5cce',
        disciplineId: '9825f111-81f3-4f34-ab36-7a30387d0c14',
      },
      {
        name: 'Lutas',
        seriesId: 'd131b737-72ff-4c5c-9fd6-1dbd810b5cce',
        disciplineId: '9825f111-81f3-4f34-ab36-7a30387d0c14',
      },
      {
        name: 'Leitura/Escrita',
        seriesId: '4a909dc9-f78f-41d9-9451-87a2708bbf99',
        disciplineId: '6862a800-92c3-4d46-8740-62a02a5e5cf9',
      },
      {
        name: 'Escrita',
        seriesId: '4a909dc9-f78f-41d9-9451-87a2708bbf99',
        disciplineId: '6862a800-92c3-4d46-8740-62a02a5e5cf9',
      },
      {
        name: 'Oralidade',
        seriesId: '4a909dc9-f78f-41d9-9451-87a2708bbf99',
        disciplineId: '6862a800-92c3-4d46-8740-62a02a5e5cf9',
      },
      {
        name: 'Produção de Textos',
        seriesId: '4a909dc9-f78f-41d9-9451-87a2708bbf99',
        disciplineId: '6862a800-92c3-4d46-8740-62a02a5e5cf9',
      },
      {
        name: 'Análise Linguística/semiótica',
        seriesId: '4a909dc9-f78f-41d9-9451-87a2708bbf99',
        disciplineId: '6862a800-92c3-4d46-8740-62a02a5e5cf9',
      },
      {
        name: 'Números',
        seriesId: '4a909dc9-f78f-41d9-9451-87a2708bbf99',
        disciplineId: '4ca48f5c-2987-4cab-9420-614d64d4d489',
      },
      {
        name: 'Álgebra',
        seriesId: '4a909dc9-f78f-41d9-9451-87a2708bbf99',
        disciplineId: '4ca48f5c-2987-4cab-9420-614d64d4d489',
      },
      {
        name: 'Geometria',
        seriesId: '4a909dc9-f78f-41d9-9451-87a2708bbf99',
        disciplineId: '4ca48f5c-2987-4cab-9420-614d64d4d489',
      },
      {
        name: 'Grandezas e Medidas',
        seriesId: '4a909dc9-f78f-41d9-9451-87a2708bbf99',
        disciplineId: '4ca48f5c-2987-4cab-9420-614d64d4d489',
      },
      {
        name: 'Probabilidade e Estatística',
        seriesId: '4a909dc9-f78f-41d9-9451-87a2708bbf99',
        disciplineId: '4ca48f5c-2987-4cab-9420-614d64d4d489',
      },
      {
        name: 'Artes Visuais',
        seriesId: '4a909dc9-f78f-41d9-9451-87a2708bbf99',
        disciplineId: '9a7b90a1-feff-4a47-8224-0ab8352e090a',
      },
      {
        name: 'Dança',
        seriesId: '4a909dc9-f78f-41d9-9451-87a2708bbf99',
        disciplineId: '9a7b90a1-feff-4a47-8224-0ab8352e090a',
      },
      {
        name: 'Música',
        seriesId: '4a909dc9-f78f-41d9-9451-87a2708bbf99',
        disciplineId: '9a7b90a1-feff-4a47-8224-0ab8352e090a',
      },
      {
        name: 'Teatro',
        seriesId: '4a909dc9-f78f-41d9-9451-87a2708bbf99',
        disciplineId: '9a7b90a1-feff-4a47-8224-0ab8352e090a',
      },
      {
        name: 'Povos e culturas: meu lugar no mundo e meu grupo social',
        seriesId: '4a909dc9-f78f-41d9-9451-87a2708bbf99',
        disciplineId: '59f326bf-7a1f-4b66-9049-b7df572f901b',
      },
      {
        name: 'Registro da história: linguagens e culturas',
        seriesId: '4a909dc9-f78f-41d9-9451-87a2708bbf99',
        disciplineId: '59f326bf-7a1f-4b66-9049-b7df572f901b',
      },
      {
        name: 'Matéria e energia',
        seriesId: '4a909dc9-f78f-41d9-9451-87a2708bbf99',
        disciplineId: '5e34bc6d-37ce-49cd-905f-d0c002f42a96',
      },
      {
        name: 'Vida e evolução',
        seriesId: '4a909dc9-f78f-41d9-9451-87a2708bbf99',
        disciplineId: '5e34bc6d-37ce-49cd-905f-d0c002f42a96',
      },
      {
        name: 'Terra e universo',
        seriesId: '4a909dc9-f78f-41d9-9451-87a2708bbf99',
        disciplineId: '5e34bc6d-37ce-49cd-905f-d0c002f42a96',
      },
      {
        name: 'Crenças religiosas e filosofias de vida',
        seriesId: '4a909dc9-f78f-41d9-9451-87a2708bbf99',
        disciplineId: '6988e9d0-6b6b-44fe-adbe-7af90a8a0e27',
      },
      {
        name: 'O Sujeito e seu lugar no mundo',
        seriesId: '4a909dc9-f78f-41d9-9451-87a2708bbf99',
        disciplineId: '9747133a-8225-4eaf-9a88-40ca56f94698',
      },
      {
        name: 'Conexões e escalas',
        seriesId: '4a909dc9-f78f-41d9-9451-87a2708bbf99',
        disciplineId: '9747133a-8225-4eaf-9a88-40ca56f94698',
      },
      {
        name: 'Mundo do trabalho',
        seriesId: '4a909dc9-f78f-41d9-9451-87a2708bbf99',
        disciplineId: '9747133a-8225-4eaf-9a88-40ca56f94698',
      },
      {
        name: 'Formas de representação e pensamento espacial',
        seriesId: '4a909dc9-f78f-41d9-9451-87a2708bbf99',
        disciplineId: '9747133a-8225-4eaf-9a88-40ca56f94698',
      },
      {
        name: 'Natureza, ambiente e qualidade de vida',
        seriesId: '4a909dc9-f78f-41d9-9451-87a2708bbf99',
        disciplineId: '9747133a-8225-4eaf-9a88-40ca56f94698',
      },
      {
        name: 'Brincadeiras e jogos',
        seriesId: '4a909dc9-f78f-41d9-9451-87a2708bbf99',
        disciplineId: '9825f111-81f3-4f34-ab36-7a30387d0c14',
      },
      {
        name: 'Esportes',
        seriesId: '4a909dc9-f78f-41d9-9451-87a2708bbf99',
        disciplineId: '9825f111-81f3-4f34-ab36-7a30387d0c14',
      },
      {
        name: 'Ginásticas',
        seriesId: '4a909dc9-f78f-41d9-9451-87a2708bbf99',
        disciplineId: '9825f111-81f3-4f34-ab36-7a30387d0c14',
      },
      {
        name: 'Danças',
        seriesId: '4a909dc9-f78f-41d9-9451-87a2708bbf99',
        disciplineId: '9825f111-81f3-4f34-ab36-7a30387d0c14',
      },
      {
        name: 'Lutas',
        seriesId: '4a909dc9-f78f-41d9-9451-87a2708bbf99',
        disciplineId: '9825f111-81f3-4f34-ab36-7a30387d0c14',
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
