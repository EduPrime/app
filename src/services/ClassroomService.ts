import type { Classroom } from '@prisma/client'
import BaseService from '@/services/BaseService'
import errorHandler from '@/utils/error-handler'

const table = 'classroom' as const // Modifique para sua tabela

export default class ClassroomService extends BaseService<Classroom> {
  constructor() {
    super(table) // Passando o nome da tabela para a classe base
  }

  async getClassroom() {
    const { data, error } = await this.client
      .from(table)
      .select(`name, id, period, year, series:seriesId(id, name)`)
    // .eq('classroomId',classroomId)

    if (error) {
      errorHandler(error, 'Erro ao buscar turmas')
    }
    if (!data) {
      throw new Error('Nenhuma turma encontrada')
    }

    return data
  }

  async listSchoolsAndClass(classes: string[]) {
    const { data, error } = await this.client
      .from('classroom')
      .select('id, name, school:schoolId (id, name), series:seriesId (id, name, courseId)')
      .in('id', classes)

    if (error) {
      errorHandler(error, 'Erro ao buscar turmas e escolas')
    }
    if (!data) {
      throw new Error('Nenhuma nota encontrada')
    }

    const schoolMap = new Map<string, { schoolId: string, schoolName: string, seriesId: string, seriesName: string, coursesId: string, classes: { classroomId: string, classroomName: string, serieId: string, serieName: string, courseId: string }[] }>()

    data.forEach((item: { id: string, name: string, school: { id: string, name: string } | any, series: { id: string, name: string, courseId: string } | any }) => {
      const schoolId = item.school?.id
      const schoolName = item.school?.name
      const classroomId = item.id
      const classroomName = item.name
      const serieId = item.series?.id
      const serieName = item.series?.name
      const courseId = item.series?.courseId

      if (schoolId && schoolName && classroomId && classroomName && serieId && serieName && courseId) {
        if (!schoolMap.has(schoolId)) {
          schoolMap.set(schoolId, { schoolId, schoolName, seriesId: serieId, seriesName: serieName, coursesId: courseId, classes: [] })
        }

        const schoolEntry = schoolMap.get(schoolId)
        if (schoolEntry && !schoolEntry.classes.some(cls => cls.classroomId === classroomId)) {
          schoolEntry.classes.push({ classroomId, classroomName, serieId, serieName, courseId })
        }
      }
    })
    return Array.from(schoolMap.values())
  }
}
