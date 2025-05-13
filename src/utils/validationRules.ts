import { email, max, min, required } from '@vee-validate/rules'
import {
  validateCep,
  validateCNPJ,
  validateCPF,
  validateEmail,
  validatePhone,
} from 'validations-br'
import { defineRule } from 'vee-validate'

const fieldLabels: Record<string, string> = {
  inepCode: 'Código INEP',
  schoolName: 'Nome da Escola',
  corporateName: 'Razão Social',
  cnpj: 'CNPJ',
  educationNetwork: 'Rede de Ensino',
  postalCode: 'CEP',
  state: 'Estado',
  address: 'Endereço',
  addressNumber: 'Número',
  additionalInfo: 'Complemento',
  neighborhood: 'Bairro',
  city: 'Município',
  unusualLocation: 'Localização diferenciada da escola',
  phone1: 'Telefone 1',
  phone2: 'Telefone 2',
  email: 'E-mail',
  website: 'Site',
  abbreviation: 'Sigla',
  blockJournalEntries: 'Bloquear lançamento no diário',
  usesAlternativeRules: 'Utiliza regra alternativa de avaliação',
  operationalStatus: 'Situação de Funcionamento',
  administrativeDependency: 'Dependência Administrativa',
  // Add more mappings as needed
}

defineRule('required', (value: string, _, context) => {
  const fieldLabel = fieldLabels[context.field] || context.field
  if (!value) {
    return `O campo "${fieldLabel}" é obrigatório.`
  }
  return true
})

defineRule('min', (value: string, [min]: [number], context) => {
  const fieldLabel = fieldLabels[context.field] || context.field
  if (value.length < min) {
    return `O campo "${fieldLabel}" deve ter pelo menos ${min} caracteres.`
  }
  return true
})

defineRule('max', (value: string, [max]: [number], context) => {
  const fieldLabel = fieldLabels[context.field] || context.field
  if (value.length > max) {
    return `O campo "${fieldLabel}" deve ter no máximo ${max} caracteres.`
  }
  return true
})

defineRule('email', (value: string, _, context) => {
  const fieldLabel = fieldLabels[context.field] || context.field
  const emailRegex = /^[^\s@]+@[^\s@][^\s.@]*\.[^\s@]+$/
  if (!emailRegex.test(value)) {
    return `O campo "${fieldLabel}" deve ser um e-mail válido.`
  }
  return true
})

defineRule('cpf', (value: string) => {
  if (!value || !validateCPF(value)) {
    return 'CPF inválido'
  }
  return true
})

defineRule('cep', (value: string) => {
  if (!value) {
    return true
  }

  if (!validateCep(value)) {
    return 'CEP inválido'
  }
  return true
})

defineRule('phone', (value: string) => {
  if (!value || !validatePhone(value)) {
    return 'Telefone inválido'
  }
  return true
})

defineRule('email', (value: string) => {
  if (!value) {
    return true
  }

  if (!validateEmail(value)) {
    return 'Email inválido'
  }
  return true
})

defineRule('cnpj', (value: string) => {
  if (!value || !validateCNPJ(value)) {
    return 'CNPJ inválido'
  }
  return true
})

defineRule('notFuture', (value: string) => {
  if (!value) {
    return true
  }

  const inputDate = new Date(value)
  const today = new Date()

  inputDate.setHours(0, 0, 0, 0)
  today.setHours(0, 0, 0, 0)

  if (inputDate > today) {
    return 'A data está invcorreta.'
  }
  return true
})

defineRule('notaValida', (value: string) => {
  if (!value)
    return true

  const num = Number(value.replace(',', '.'))

  if (Number.isNaN(num))
    return 'Deve ser um número válido'

  if (num < 0 || num > 10)
    return 'A nota deve ser de 0 a 10'
  return true
})

defineRule('somaAtividades', (_value: string, _, context) => {
  const form = context.form

  const atividades = [
    Number.parseFloat(form['1ª Atividade'] as string) || 0,
    Number.parseFloat(form['2ª Atividade'] as string) || 0,
    Number.parseFloat(form['3ª Atividade'] as string) || 0,
    Number.parseFloat(form['4ª Atividade'] as string) || 0,
    Number.parseFloat(form['5ª Atividade'] as string) || 0,
  ]

  const soma = atividades.reduce((total, nota) => total + nota, 0)

  if (soma > 10)
    return 'A soma das atividades não pode ultrapassar 10'
  return true
})

defineRule('postalCode', (value: string, _, context) => {
  const fieldLabel = fieldLabels[context.field] || context.field
  const postalCodeRegex = /^\d{5}-\d{3}$/
  if (!postalCodeRegex.test(value)) {
    return `O campo "${fieldLabel}" deve ser um CEP válido.`
  }
  return true
})
