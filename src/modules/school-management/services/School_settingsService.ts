import BaseService from '@/services/BaseService'

const table = 'school_settings' as const

type TabelaType = typeof table

export default class School_settingsService extends BaseService<TabelaType> {
  constructor() {
    super(table)
  }
}
