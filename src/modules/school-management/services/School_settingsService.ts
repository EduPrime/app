import type { SchoolSettings } from '@prisma/client'
import BaseService from '@/services/BaseService'
import errorHandler from '@/utils/error-handler'

export default class School_settingsService extends BaseService<SchoolSettings> {
  constructor() {
    super('school_settings')
  }

  async updateSettings(id: string, data: any) {
    const { data: updated, error } = await this.client
      .from('school_settings')
      .update(data)
      .eq('schoolId', id)
      .select() // Certifique-se de que esse select existe para obter a linha atualizada

    if (error)
      errorHandler(error, 'Error updating school settings')
    if (!updated || updated.length === 0)
      throw new Error('No rows returned from the update operation')

    return updated[0]
  }
}
