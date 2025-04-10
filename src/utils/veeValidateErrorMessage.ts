import { configure } from 'vee-validate'

configure({
  generateMessage: (ctx) => {
    const params = Array.isArray(ctx.rule?.params) ? ctx.rule.params : []
    const messages: Record<string, string> = {
      required: `O campo "${ctx.field}" é obrigatório.`,
      min: `O campo "${ctx.field}" precisa ter ao menos ${params[0]} caracteres.`,
      max: `O campo "${ctx.field}" não pode ter mais de ${params[0]} caracteres.`,
      email: `O campo "${ctx.field}" precisa ser um e-mail válido.`,
      cpf: `${ctx.field} inválido.`,
      phone: `${ctx.field} inválido.`,
      cep: `${ctx.field} inválido.`,
      notaValida: `A nota na ${ctx.field} está inválida.`,
    }

    if (!ctx.rule?.name) {
      return `O campo "${ctx.field}" é inválido.`
    }

    return messages[ctx.rule?.name] || `O campo "${ctx.field}" é inválido.`
  },
  validateOnBlur: true,
  validateOnChange: true,
  validateOnInput: false,
})
