import BaseService from '@/services/BaseService'
import type { Classroom } from '@prisma/client'
import { PostgrestSingleResponse } from '@supabase/postgrest-js'

const table = 'classroom'

export default class EnrollmentService extends BaseService<Classroom> {
    constructor() {
        super(table)
    }


    async updateTotalStudents(id: any) {
        try {
            const total = await this.client.from(table)
                .select('totalStudents')
                .eq('id', id)
                .single();

            if (total.error) {
                throw new Error(total.error.message);
            }

            const novoTotal = (total.data?.totalStudents ?? 0) + 1;

            const { error } = await this.client.from(table)
                .update({ totalStudents: novoTotal })
                .eq('id', id);

            if (error) {
                throw new Error(error.message);
            }

            console.log("Total de estudantes atualizado com sucesso!");
        } catch (error: any) {
            console.error("Não foi possível atualizar o número de estudantes:", error.message);
        }
    }

    async getClasses(seriesId: string, schoolId: string) {
        let query = this.client.from(table).select(`
          *
      `)

        query = query.eq('seriesId', seriesId).eq('schoolId', schoolId)

        const { data, error } = await query

        if (error) {
            throw new Error(`Erro ao buscar pré-matrículas com dados dos alunos: ${error.message}`)
        }

        if (!data || data.length === 0) {
            throw new Error('Nenhuma pré-matrícula encontrada')
        }
        return data
    }
}