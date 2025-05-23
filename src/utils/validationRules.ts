import { email, max, min, required } from '@vee-validate/rules'
import {
  validateCep,
  validateCNPJ,
  validateCPF,
  validateEmail,
  validatePhone,
} from 'validations-br'
import { defineRule } from 'vee-validate'

defineRule('required', required)
defineRule('min', min)
defineRule('max', max)
defineRule('email', email)

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

defineRule('checandoNumero', (value: string) => {
  if (!value)
    return true

  const num = Number(value)

  if (Number.isNaN(num))
    return 'Deve ser um número válido'

  if (num < 0)
    return 'O número deve ser maior ou igual a 0'

  return true
})

defineRule('formatoHora', (value: string) => {
  if (!value)
    return true

  const regex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/
  if (!regex.test(value))
    return 'Formato inválido. Use HH:MM (ex: 08:30)'

  return true
})