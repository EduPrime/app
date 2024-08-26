export interface Class {
  name: string
  teacher: string
  schedule: string
  subjects: string[]
}

export interface Series {
  name: string
  classes: Class[]
}

export interface School {
  name: string
  address: string
  showDetails: boolean
  series: Series[]
}

export const schools: School[] = [
  {
    name: 'Escola Mercúrio',
    address: 'Rua A, Bairro B',
    showDetails: false,
    series: [
      {
        name: 'Educação Infantil',
        classes: [
          { name: 'Creche - Turma A', teacher: 'Marie Curie', schedule: 'Matutino (08:00 - 12:00)', subjects: ['Brincadeiras Educativas', 'Artes'] },
          { name: 'Creche - Turma B', teacher: 'Isaac Newton', schedule: 'Vespertino (13:00 - 17:00)', subjects: ['Brincadeiras Educativas', 'Artes'] },
        ],
      },
      {
        name: 'Ensino Fundamental I',
        classes: [
          { name: '1º ano - Turma A', teacher: 'Albert Einstein', schedule: 'Vespertino (13:00 - 17:00)', subjects: ['Português', 'Matemática', 'Ciências'] },
          { name: '1º ano - Turma B', teacher: 'Richard Feynman', schedule: 'Matutino (08:00 - 12:00)', subjects: ['Português', 'Matemática', 'Ciências'] },
        ],
      },
    ],
  },
  {
    name: 'Escola Vênus',
    address: 'Rua B, Bairro C',
    showDetails: false,
    series: [
      {
        name: 'Ensino Fundamental I',
        classes: [
          { name: '4º ano - Turma A', teacher: 'Rosalind Franklin', schedule: 'Vespertino (13:00 - 17:00)', subjects: ['Português', 'História'] },
          { name: '4º ano - Turma B', teacher: 'Gregor Mendel', schedule: 'Integral (08:00 - 17:00)', subjects: ['Português', 'História'] },
          { name: '5º ano - Turma A', teacher: 'Ada Lovelace', schedule: 'Matutino (08:00 - 12:00)', subjects: ['Matemática', 'Ciências'] },
          { name: '5º ano - Turma B', teacher: 'James Clerk Maxwell', schedule: 'Vespertino (13:00 - 17:00)', subjects: ['Matemática', 'Ciências'] },
          { name: '5º ano - Turma C', teacher: 'Michael Faraday', schedule: 'Integral (08:00 - 17:00)', subjects: ['Matemática', 'Ciências'] },
        ],
      },
      {
        name: 'Ensino Fundamental II',
        classes: [
          { name: '6º ano - Turma A', teacher: 'Richard Feynman', schedule: 'Matutino (08:00 - 12:00)', subjects: ['Ciências', 'Matemática'] },
          { name: '6º ano - Turma B', teacher: 'Stephen Jay Gould', schedule: 'Integral (08:00 - 17:00)', subjects: ['Ciências', 'Matemática'] },
          { name: '7º ano - Turma A', teacher: 'Dorothy Hodgkin', schedule: 'Vespertino (13:00 - 17:00)', subjects: ['Química', 'Física'] },
          { name: '7º ano - Turma B', teacher: 'Niels Bohr', schedule: 'Integral (08:00 - 17:00)', subjects: ['Química', 'Física'] },
        ],
      },
    ],
  },
  {
    name: 'Escola Terra',
    address: 'Rua C, Bairro D',
    showDetails: false,
    series: [
      {
        name: 'Ensino Fundamental II',
        classes: [
          { name: '8º ano - Turma A', teacher: 'Carl Sagan', schedule: 'Matutino (08:00 - 12:00)', subjects: ['Astronomia', 'Física'] },
          { name: '8º ano - Turma B', teacher: 'Jane Goodall', schedule: 'Vespertino (13:00 - 17:00)', subjects: ['Biologia', 'Ciências'] },
          { name: '8º ano - Turma C', teacher: 'Neil deGrasse Tyson', schedule: 'Integral (08:00 - 17:00)', subjects: ['Astronomia', 'Física'] },
          { name: '9º ano - Turma A', teacher: 'Alan Turing', schedule: 'Integral (08:00 - 17:00)', subjects: ['Matemática', 'Ciências da Computação'] },
          { name: '9º ano - Turma B', teacher: 'Katherine Johnson', schedule: 'Matutino (08:00 - 12:00)', subjects: ['Matemática', 'Física'] },
          { name: '9º ano - Turma C', teacher: 'Rosalind Franklin', schedule: 'Vespertino (13:00 - 17:00)', subjects: ['Química', 'Biologia'] },
        ],
      },
    ],
  },
  {
    name: 'Escola Marte',
    address: 'Rua D, Bairro E',
    showDetails: false,
    series: [
      {
        name: 'Educação Infantil',
        classes: [
          { name: 'Creche - Turma A', teacher: 'Leonardo da Vinci', schedule: 'Matutino (08:00 - 12:00)', subjects: ['Artes', 'Ciências'] },
          { name: 'Creche - Turma B', teacher: 'Galileo Galilei', schedule: 'Vespertino (13:00 - 17:00)', subjects: ['Ciências', 'Brincadeiras Educativas'] },
        ],
      },
      {
        name: 'Ensino Fundamental I',
        classes: [
          { name: '1º ano - Turma A', teacher: 'Marie Curie', schedule: 'Vespertino (13:00 - 17:00)', subjects: ['Química', 'Ciências'] },
          { name: '1º ano - Turma B', teacher: 'Isaac Newton', schedule: 'Matutino (08:00 - 12:00)', subjects: ['Física', 'Matemática'] },
        ],
      },
    ],
  },
  {
    name: 'Escola Júpiter',
    address: 'Rua E, Bairro F',
    showDetails: false,
    series: [
      {
        name: 'Ensino Fundamental II',
        classes: [
          { name: '6º ano - Turma A', teacher: 'Nikola Tesla', schedule: 'Matutino (08:00 - 12:00)', subjects: ['Física', 'Ciências'] },
          { name: '6º ano - Turma B', teacher: 'Stephen Hawking', schedule: 'Integral (08:00 - 17:00)', subjects: ['Física', 'Matemática'] },
        ],
      },
      {
        name: 'Ensino Fundamental I',
        classes: [
          { name: '2º ano - Turma A', teacher: 'Alan Turing', schedule: 'Vespertino (13:00 - 17:00)', subjects: ['Matemática', 'Ciências da Computação'] },
          { name: '2º ano - Turma B', teacher: 'Grace Hopper', schedule: 'Matutino (08:00 - 12:00)', subjects: ['Ciências da Computação', 'Matemática'] },
        ],
      },
    ],
  },
  {
    name: 'Escola Saturno',
    address: 'Rua F, Bairro G',
    showDetails: false,
    series: [
      {
        name: 'Ensino Fundamental II',
        classes: [
          { name: '7º ano - Turma A', teacher: 'Rosalind Franklin', schedule: 'Matutino (08:00 - 12:00)', subjects: ['Biologia', 'Química'] },
          { name: '7º ano - Turma B', teacher: 'Jane Goodall', schedule: 'Vespertino (13:00 - 17:00)', subjects: ['Ciências', 'Biologia'] },
        ],
      },
      {
        name: 'Ensino Fundamental I',
        classes: [
          { name: '3º ano - Turma A', teacher: 'Michael Faraday', schedule: 'Integral (08:00 - 17:00)', subjects: ['Física', 'Química'] },
          { name: '3º ano - Turma B', teacher: 'Marie Curie', schedule: 'Matutino (08:00 - 12:00)', subjects: ['Química', 'Ciências'] },
        ],
      },
    ],
  },
  {
    name: 'Escola Urano',
    address: 'Rua G, Bairro H',
    showDetails: false,
    series: [
      {
        name: 'Educação Infantil',
        classes: [
          { name: 'Pré I - Turma A', teacher: 'Charles Darwin', schedule: 'Matutino (08:00 - 12:00)', subjects: ['Ciências', 'Linguagem'] },
          { name: 'Pré I - Turma B', teacher: 'Gregor Mendel', schedule: 'Integral (08:00 - 17:00)', subjects: ['Ciências', 'Linguagem'] },
        ],
      },
      {
        name: 'Ensino Fundamental I',
        classes: [
          { name: '4º ano - Turma A', teacher: 'Isaac Asimov', schedule: 'Matutino (08:00 - 12:00)', subjects: ['Português', 'História'] },
          { name: '4º ano - Turma B', teacher: 'Albert Einstein', schedule: 'Vespertino (13:00 - 17:00)', subjects: ['Matemática', 'Física'] },
        ],
      },
    ],
  },
  {
    name: 'Escola Netuno',
    address: 'Rua H, Bairro I',
    showDetails: false,
    series: [
      {
        name: 'Educação Infantil',
        classes: [
          { name: 'Pré II - Turma A', teacher: 'Isaac Newton', schedule: 'Integral (08:00 - 17:00)', subjects: ['Física', 'Matemática'] },
          { name: 'Pré II - Turma B', teacher: 'Marie Curie', schedule: 'Vespertino (13:00 - 17:00)', subjects: ['Química', 'Ciências'] },
        ],
      },
      {
        name: 'Ensino Fundamental I',
        classes: [
          { name: '5º ano - Turma A', teacher: 'Galileo Galilei', schedule: 'Matutino (08:00 - 12:00)', subjects: ['Astronomia', 'Ciências'] },
          { name: '5º ano - Turma B', teacher: 'Isaac Asimov', schedule: 'Integral (08:00 - 17:00)', subjects: ['Ciências', 'História'] },
        ],
      },
    ],
  },
  {
    name: 'Escola Plutão',
    address: 'Rua I, Bairro J',
    showDetails: false,
    series: [
      {
        name: 'Educação Infantil',
        classes: [
          { name: 'Creche - Turma A', teacher: 'Charles Darwin', schedule: 'Matutino (08:00 - 12:00)', subjects: ['Ciências', 'Brincadeiras Educativas'] },
          { name: 'Creche - Turma B', teacher: 'Gregor Mendel', schedule: 'Vespertino (13:00 - 17:00)', subjects: ['Ciências', 'Brincadeiras Educativas'] },
        ],
      },
      {
        name: 'Ensino Fundamental I',
        classes: [
          { name: '1º ano - Turma A', teacher: 'Nikola Tesla', schedule: 'Matutino (08:00 - 12:00)', subjects: ['Física', 'Ciências'] },
          { name: '1º ano - Turma B', teacher: 'Marie Curie', schedule: 'Integral (08:00 - 17:00)', subjects: ['Química', 'Ciências'] },
        ],
      },
    ],
  },
  {
    name: 'Escola Lua',
    address: 'Rua J, Bairro K',
    showDetails: false,
    series: [
      {
        name: 'Ensino Fundamental II',
        classes: [
          { name: '8º ano - Turma A', teacher: 'Isaac Newton', schedule: 'Matutino (08:00 - 12:00)', subjects: ['Física', 'Matemática'] },
          { name: '8º ano - Turma B', teacher: 'Marie Curie', schedule: 'Integral (08:00 - 17:00)', subjects: ['Química', 'Ciências'] },
        ],
      },
      {
        name: 'Ensino Fundamental I',
        classes: [
          { name: '2º ano - Turma A', teacher: 'Galileo Galilei', schedule: 'Vespertino (13:00 - 17:00)', subjects: ['Astronomia', 'Matemática'] },
          { name: '2º ano - Turma B', teacher: 'Isaac Asimov', schedule: 'Matutino (08:00 - 12:00)', subjects: ['História', 'Ciências'] },
        ],
      },
    ],
  },
  {
    name: 'Escola Sol',
    address: 'Rua K, Bairro L',
    showDetails: false,
    series: [
      {
        name: 'Ensino Fundamental II',
        classes: [
          { name: '9º ano - Turma A', teacher: 'Carl Sagan', schedule: 'Integral (08:00 - 17:00)', subjects: ['Astronomia', 'Ciências'] },
          { name: '9º ano - Turma B', teacher: 'Jane Goodall', schedule: 'Matutino (08:00 - 12:00)', subjects: ['Biologia', 'Ciências'] },
        ],
      },
      {
        name: 'Ensino Fundamental I',
        classes: [
          { name: '3º ano - Turma A', teacher: 'Marie Curie', schedule: 'Matutino (08:00 - 12:00)', subjects: ['Química', 'Física'] },
          { name: '3º ano - Turma B', teacher: 'Isaac Newton', schedule: 'Vespertino (13:00 - 17:00)', subjects: ['Matemática', 'Física'] },
        ],
      },
    ],
  },
]
