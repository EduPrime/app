import type { School } from '@prisma/client'
import BaseService from '@/services/BaseService'

export default class SchoolService extends BaseService<School> {
    constructor() {
        super('school')
    }

    async getSchools() {
        const { data } = await this.client.from('school').select(`
            name,
            id
        `)
        return (data)
    }
}
