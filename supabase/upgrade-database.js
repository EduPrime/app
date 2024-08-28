import { exec } from 'node:child_process'
import process from 'node:process'
import dotenv from 'dotenv'

dotenv.config()

const dbHost = process.env.DATABASE_HOST
const dbPort = process.env.DATABASE_PORT
const dbUser = process.env.DATABASE_USER
const dbPassword = process.env.DATABASE_PASSWORD
const dbName = process.env.DATABASE_NAME

const dbUrl = `postgresql://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`

// Função para executar um comando e retornar uma Promise
function runCommand(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Erro ao executar o comando: ${command}`)
        console.error(stderr)
        reject(error)
      }
      else {
        console.log(stdout)
        resolve()
      }
    })
  })
}

// Função para gerar tipos do Supabase
async function generateNewTypes() {
  try {
    await runCommand(`npx supabase gen types --lang=typescript --db-url "${dbUrl}" > src/types/database.types.ts`)
    console.log('Tipos do Supabase gerados com sucesso.')
  }
  catch (error) {
    console.error('Erro ao gerar tipos do Supabase:', error)
  }
}

// Função para resetar o banco de dados
async function dbReset() {
  try {
    await runCommand(`npx supabase db reset --db-url "${dbUrl}"`)
    console.log('Banco de dados resetado com sucesso.')
  }
  catch (error) {
    console.error('Erro ao resetar o banco de dados:', error)
  }
}

// Função principal para chamar a função correta com base no argumento
async function main() {
  const command = process.argv[2]

  switch (command) {
    case 'generateNewTypes':
      await generateNewTypes()
      break
    case 'dbReset':
      await dbReset()
      break
    default:
      console.error('Comando não reconhecido. Use "generateNewTypes" ou "dbReset".')
      process.exit(1)
  }
}

// Executa a função principal
main()
