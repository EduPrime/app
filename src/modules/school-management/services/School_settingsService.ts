import BaseService from '@/services/BaseService'

const table = 'school_settings' as const

type TabelaType = typeof table

export default class School_settingsService extends BaseService<TabelaType> {
  constructor() {
    super(table)
  }

  async updateSettings(id: string, data: any) {
    const { data: updated, error } = await this.client
      .from('school_settings')
      .update(data)
      .eq('school_id', id)
      .select() // Certifique-se de que esse select existe para obter a linha atualizada

    if (error)
      throw new Error(`Failed to update record in school_settings: ${error.message}`)
    if (!updated || updated.length === 0)
      throw new Error('No rows returned from the update operation')

    return updated[0]
  }
}
