import * as yup from 'yup'

// Esquema de validação para Class
const classSchema = yup.object().shape({
  name: yup.string().required('Nome da turma é obrigatório'),
  teacher: yup.string().required('Nome do professor é obrigatório'),
  schedule: yup.string().required('Horário é obrigatório'),
  subjects: yup.array().of(yup.string().required('Assunto é obrigatório')).required('Os assuntos são obrigatórios'),
})

// Esquema de validação para Series
const seriesSchema = yup.object().shape({
  name: yup.string().required('Nome da série é obrigatório'),
  classes: yup.array().of(classSchema).required('As turmas são obrigatórias'),
})

// Esquema de validação para School
const schoolSchema = yup.object().shape({
  name: yup.string().required('Nome da escola é obrigatório'),
  address: yup.string().required('Endereço é obrigatório'),
  showDetails: yup.boolean().required('Campo showDetails é obrigatório'),
  series: yup.array().of(seriesSchema).required('As séries são obrigatórias'),
})

export { schoolSchema }
