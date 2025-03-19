import type { School } from '@prisma/client'
import BaseService from '@/services/BaseService'

const table = 'school'

export default class SchoolService extends BaseService<School> {
    constructor() {
        super(table)
    }

    async getSchool(schoolId: string | null) {
        const { data } = await this.client.from(table).select(`
            name,
            id
        `).eq('id', schoolId).single()
        return (data)
    }
}
