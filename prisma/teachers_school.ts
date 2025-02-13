import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface TeacherData {
    name: string;
    email: string;
    birthdate: string;
    phone: string;
    schoolid: string;
    escola_nome: string;
}

interface TransformedData {
    name: string;
    email: string;
    birthdate: string;
    phone: string;
    tenantId: string;
    schoolId: string;
}

function cleanData(data: any): any {
    if (typeof data === 'string') {
        return data.replace(/\x00/g, '');
    }
    return data;
}

function formatBirthdate(birthdate: string | null): string {
    if (!birthdate) {
        return '1980-01-01T00:00:00.000Z';
    }
    const cleanedDate = cleanData(birthdate);
    const date = new Date(cleanedDate);
    if (isNaN(date.getTime())) {
        console.log(`Invalid date encountered: ${cleanedDate}, defaulting to 1980-01-01`);
        return '1980-01-01T00:00:00.000Z';
    }
    return date.toISOString();
}

async function migrateData() {
    try {
        // Consulta ao schema de origem
        const data: TeacherData[] = await prisma.$queryRaw<TeacherData[]>`
        SELECT DISTINCT
            p.nome as name,
            p.email,
            fis.data_nasc as birthdate,    
            concat (fp.ddd, fp.fone) as phone,
            sch.id AS schoolid,
            p2.nome AS escola_nome   
        FROM pmieducar.servidor s
            JOIN cadastro.pessoa p ON s.cod_servidor::numeric = p.idpes
            LEFT JOIN cadastro.fone_pessoa fp ON p.idpes = fp.idpes
            JOIN cadastro.fisica fis ON p.idpes = fis.idpes
            JOIN pmieducar.servidor_funcao sf ON s.cod_servidor = sf.ref_cod_servidor
            JOIN pmieducar.funcao f ON sf.ref_cod_funcao = f.cod_funcao
            JOIN pmieducar.servidor_alocacao sa ON s.cod_servidor = sa.ref_cod_servidor AND sf.cod_servidor_funcao = sa.ref_cod_servidor_funcao
            LEFT JOIN modules.professor_turma pt ON pt.servidor_id = s.cod_servidor AND pt.ano = sa.ano
            LEFT JOIN pmieducar.turma t ON t.cod_turma = pt.turma_id AND t.ano = pt.ano
            JOIN pmieducar.escola e ON sa.ref_cod_escola = e.cod_escola
            JOIN cadastro.pessoa p2 ON e.ref_idpes::numeric = p2.idpes
            LEFT JOIN pmieducar.serie se ON se.cod_serie = t.ref_ref_cod_serie
            join public.school sch on e.ref_idpes = sch.idpes
            WHERE f.professor = 1
        `;
        // console.log(data);
        // if (data.length === 0) {
        //     console.log("Nenhum dado encontrado para migração.");
        //     return;
        // }

        // // console.log(Migrando ${ data.length } registros...);

        const transformedData: TransformedData[] = data.map((item) => ({
            name: cleanData(item.name),
            email: cleanData(item.email),
            birthdate: formatBirthdate(item.birthdate),
            phone: cleanData(item.phone),
            tenantId: self.crypto.randomUUID(),
            schoolId: cleanData(item.schoolid),
        }));
        // console.log(transformedData);
        // Inserção no schema de destino
        await prisma.teacher.createMany(
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