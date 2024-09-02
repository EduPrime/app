export function isValidDDD(phoneNumber: string): boolean {
  // Lista de DDDs válidos no Brasil
  const validDDDs = [
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19', // São Paulo
    '21',
    '22',
    '24', // Rio de Janeiro
    '27',
    '28', // Espírito Santo
    '31',
    '32',
    '33',
    '34',
    '35',
    '37',
    '38', // Minas Gerais
    '41',
    '42',
    '43',
    '44',
    '45',
    '46', // Paraná
    '47',
    '48',
    '49', // Santa Catarina
    '51',
    '53',
    '54',
    '55', // Rio Grande do Sul
    '61', // Distrito Federal
    '62',
    '64', // Goiás
    '63', // Tocantins
    '65',
    '66', // Mato Grosso
    '67', // Mato Grosso do Sul
    '68', // Acre
    '69', // Rondônia
    '71',
    '73',
    '74',
    '75',
    '77', // Bahia
    '79', // Sergipe
    '81',
    '87', // Pernambuco
    '82', // Alagoas
    '83', // Paraíba
    '84', // Rio Grande do Norte
    '85',
    '88', // Ceará
    '86',
    '89', // Piauí
    '91',
    '93',
    '94', // Pará
    '92',
    '97', // Amazonas
    '95', // Roraima
    '96', // Amapá
    '98',
    '99', // Maranhão
  ]

  // Extrair o DDD do número de telefone usando regex
  const dddMatch = phoneNumber.match(/^\((\d{2})\)/)
  if (!dddMatch) {
    return false // Se não encontrar o DDD, retorna falso
  }

  const ddd = dddMatch[1] // Captura o DDD
  return validDDDs.includes(ddd) // Verifica se o DDD é válido
}