import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


type CourseData = {
    pessoa_nome: string;
    crso_nm_curso: string;
    crso_qtd_etapas: number;
    crso_carga_horaria: number;
    ref_cod_tipo_ensino: number;
    ref_cod_tipo_regime: number;
    modalidade_curso: number;
    schoolide: string;
    instituteide: string;
};

type TransformedData = {
    name: string;
    schoolId: string;
    tenantId: string;
    courseStage: number;
    workload: number;
    teachingType: string;
    regimeType: string;
    courseModality: string;
    institutionId: string;
};

function formatTeachingType(teachingType: number): string {
    const types = ['Complementar', 'Padrão'];
    return types[teachingType] || 'Padrão';
}

function formatRegimeType(regimeType: number): string {
    const types = ['Presencial', 'EAD', 'Semi-Presencial'];
    return types[regimeType] || 'Presencial';
}

function formatCourseModality(courseModality: number): string {
    const types = ['Ensino Regular', 'EJA', 'Educação Profissional', 'Educação Especial'];
    return types[courseModality] || 'Ensino Regular';
}

async function migrateData() {
    try {
        // Consulta ao schema de origem
        const data: CourseData[] = await prisma.$queryRaw<CourseData[]>`
        -- softagon.mv_escola_serie_turma fonte
        select distinct on (p.nome)
            p.nome AS pessoa_nome,    
            cur.nm_curso AS crso_nm_curso,
            cur.qtd_etapas AS crso_qtd_etapas,
            cur.carga_horaria AS crso_carga_horaria,
            cur.ref_cod_tipo_ensino,
            cur.ref_cod_tipo_regime,
            cur.modalidade_curso,
            sch.id as schoolide,
            pi.id as instituteide,
            s.nm_serie AS serie_nm_serie,
            s.carga_horaria AS serie_carga_horaria, 
            t.nm_turma AS turma_nm_turma,
            t.multiseriada AS turma_multiseriada,
            t.ativo AS turma_ativo,
            t.ref_cod_turma_tipo AS turma_cod_turma_tipo,
            t.tipo_boletim AS turma_tipo_boletim,
            t.turma_turno_id,
            t.ano AS turma_ano
        FROM pmieducar.escola e
            LEFT JOIN cadastro.pessoa p ON e.ref_idpes::numeric = p.idpes
            LEFT JOIN pmieducar.escola_curso ecur ON e.cod_escola = ecur.ref_cod_escola
            LEFT JOIN pmieducar.curso cur ON ecur.ref_cod_curso = cur.cod_curso
            LEFT JOIN pmieducar.escola_serie eserie ON e.cod_escola = eserie.ref_cod_escola
            LEFT JOIN pmieducar.serie s ON ecur.ref_cod_curso = s.ref_cod_curso
            LEFT JOIN modules.regra_avaliacao_serie_ano regraserie ON regraserie.serie_id = s.cod_serie
            LEFT JOIN modules.regra_avaliacao regra ON regraserie.regra_avaliacao_id = regra.id
            JOIN pmieducar.turma t ON eserie.ref_cod_escola = t.ref_ref_cod_escola AND s.cod_serie = t.ref_ref_cod_serie
            join public.school sch on e.ref_idpes = sch.idpes
            join public.institution pi on sch."institutionId" = pi.id
            WHERE t.ano IN (2025,2024)     
        group BY e.cod_escola, sch.id, pi.id, e.ref_idpes, e.ativo, e.ref_idpes_gestor, e.email_gestor, p.nome, ecur.ativo, ecur.anos_letivos, cur.cod_curso, cur.ref_cod_nivel_ensino, cur.ref_cod_tipo_ensino, cur.nm_curso, cur.qtd_etapas, cur.carga_horaria, cur.ativo, cur.multi_seriado, cur.modalidade_curso, eserie.ativo, s.cod_serie, s.ref_cod_curso, s.nm_serie, s.etapa_curso, s.carga_horaria, s.ativo, t.cod_turma, t.ref_usuario_cad, t.ref_ref_cod_serie, t.ref_ref_cod_escola, t.nm_turma, t.multiseriada, t.ativo, t.ref_cod_turma_tipo, t.tipo_boletim, t.turma_turno_id, t.ano, regraserie.regra_avaliacao_id, regraserie.ano_letivo, regra.id, regra.nome, regra.tipo_nota, regra.porcentagem_presenca, regra.parecer_descritivo, regra.tipo_presenca, regra.media_recuperacao
        `;
        // console.log(data);
        // if (data.length === 0) {
        //     console.log("Nenhum dado encontrado para migração.");
        //     return;
        // }

        // // console.log(Migrando ${ data.length } registros...);

        const transformedData: TransformedData[] = data.map((item) => ({
            name: item.crso_nm_curso,
            schoolId: item.schoolide,
            tenantId: self.crypto.randomUUID(),
            courseStage: item.crso_qtd_etapas,
            workload: item.crso_carga_horaria,
            teachingType: formatTeachingType(item.ref_cod_tipo_ensino),
            regimeType: formatRegimeType(item.ref_cod_tipo_regime),
            courseModality: formatCourseModality(item.modalidade_curso),
            institutionId: item.instituteide
        }));
        // console.log(transformedData);
        // Inserção no schema de destino
        await prisma.course.createMany(
            {
                data: transformedData,
            }
        );

        console.log("Migração concluída com sucesso!");
    } catch (error) {
        console.error("Erro durante a migração:", error);
    } finally {
        await prisma.$disconnect();
    }
}



migrateData();