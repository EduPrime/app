import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const servers = await prisma.servers.createMany({
        data: [
            {
                "id": "00332ac3-5083-4403-9b08-eced3a7a312d",
                "name": "Maria Gabriele da Silva Xavier",
                "cpf": "16870309442",
                "phone": "87999706976",
                "codServidor": 19404,
                "email": "mariagabrielesilva277@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "006a11f7-d8cb-4ab5-a07c-e679ae7709d8",
                "name": "Maria Vilmária do Nascimento Lima",
                "cpf": "02228836427",
                "phone": "87981758498",
                "codServidor": 62263,
                "email": "vilmarialima743@gmail.com",
                "position": "Coordenador(a)",
                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "00b42da7-5803-4c75-abf1-a92ab47ab891",
                "name": "Vaniele Kelly Siqueira da Silva",
                "cpf": "11520347405",
                "phone": "87996828620",
                "codServidor": 11180,
                "email": "jn.kerthelly06@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "00e24a59-618d-4a8a-aec6-54dd2498bd1a",
                "name": "Hialy Steffany Cardozo Araujo",
                "cpf": "10993586473",
                "phone": "87999399982",
                "codServidor": 19140,
                "email": "hialycardozo@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "015d513f-218c-4008-9bce-d01a9ebcf083",
                "name": "Fabricia Alves Lacerda",
                "cpf": "05042588426",
                "phone": "8791122616",
                "codServidor": 43750,
                "email": "falacerdavale@gmail.com",
                "position": "Aux. Administrativo",
                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "0170a93c-9d1e-4924-ad4b-dea98be4b26c",
                "name": "Paulyana Andrade Batista",
                "cpf": "09603674460",
                "phone": "87974007264",
                "codServidor": 61563,
                "email": "Paulyanaandrade@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "03280ab5-5edb-4c8f-99e2-bb6f16298b40",
                "name": "Maria Lucineide Feitosa de Andrade",
                "cpf": "02240474424",
                "phone": "87996257649",
                "codServidor": 6355,
                "email": "maria.lucineide.feitosa@hotmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "038e8068-e177-4e72-bd1c-479e51e453cf",
                "name": "Francisca Aline de Oliveira Torres",
                "cpf": "05758552402",
                "phone": "87991495883",
                "codServidor": 50945,
                "email": "thathy_0@hotmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "03c94057-3b09-4b74-9a3e-79d68ad0d559",
                "name": "André Jonathas de Carvalho Felix",
                "cpf": "00683229338",
                "phone": "89999301318",
                "codServidor": 39276,
                "email": "andrefelix086@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "03e19f4f-f386-4e3d-b3de-53097e267cb4",
                "name": "Arlene Lacerda Alencar",
                "cpf": "02119301484",
                "phone": "87991226833",
                "codServidor": 50684,
                "email": "arlenethuany@gmail.com",
                "position": "Coordenador(a)",
                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "0421b224-3a73-438e-86c2-15014ea77754",
                "name": "Lenilva Maria Gomes",
                "cpf": "83216146391",
                "phone": "89994629050",
                "codServidor": 21711,
                "email": "lenilvagomes990@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "045b544a-49e0-427c-8f7a-dea91d0920b8",
                "name": "Maria Adriana dos Santos Rodrigues Sousa",
                "cpf": "05893455401",
                "phone": "87981606476",
                "codServidor": 25799,
                "email": "santossousamariaadriana1@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "045d9847-857f-4e1b-bb6b-5d967b68934c",
                "name": "Cassiana Lourenço de Sousa Alencar",
                "cpf": "05825239405",
                "phone": "87991611697",
                "codServidor": 40426,
                "email": "cassiana17alencar@gmail.com",
                "position": "Secretário(a)",
                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "051b7473-715c-4a73-aa67-b14e2993bf4c",
                "name": "Ediene Alves dos Santos Silva",
                "cpf": "02628174464",
                "phone": "87996629190",
                "codServidor": 16929,
                "email": "alvesediene02@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "05323d6c-73b2-4a57-b103-c9b756962289",
                "name": "Edzangela Andrade Souza Barros",
                "cpf": "05445648478",
                "phone": "87992107527",
                "codServidor": 20593,
                "email": "edsangelaandradesouza@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "05e82345-1ca6-45e2-9f65-b47b45a5599a",
                "name": "Francielmar Caroline Abreu Delmondes",
                "cpf": "10394297423",
                "phone": "87996208333",
                "codServidor": 53005,
                "email": "karoldelmondes50@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "05f8b341-b7ce-491f-96fc-f11c39b3468b",
                "name": "Jordania Mendes de Oliveira",
                "cpf": "04864954429",
                "phone": "87991509033",
                "codServidor": 61796,
                "email": "jordaniamendes98@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "0610e012-4303-45e1-b40e-fe8bf6903c70",
                "name": "Maria Eliana Eugenio de Alencar",
                "cpf": "05111368469",
                "phone": "87981282848",
                "codServidor": 10384,
                "email": "elianamercantilcarvalho@gmail.com",
                "position": "Professor(a)",
                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "06221761-5d7f-4a40-9f9d-afca6d15807c",
                "name": "Adriana Rejane Arrais Modesto",
                "cpf": "03339098441",
                "phone": "87991883663",
                "codServidor": 11945,
                "email": "rejaneadriana1@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "072ad2a9-040d-4c03-aee5-80ff1930c2df",
                "name": "Durvalina de Andrade Lima",
                "cpf": "02616479460",
                "phone": "87991249103",
                "codServidor": 9775,
                "email": "durvaandrade67@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "074ff5d8-25f5-4af4-ad6a-1ddf7d65aeeb",
                "name": "Professor Teste",
                "cpf": "66997574076",
                "phone": "87991189300",
                "codServidor": 24282,
                "email": "professorteste@gmail.com",
                "position": "Professor(a)",

                "institutionId": "547f4c04-d8eb-4e01-b13a-e648e81de59d"
            },
            {
                "id": "076a9a66-68ed-4499-b0a0-ce0f45d1c9ad",
                "name": "Maria de Fatima Delmondes de Souza",
                "cpf": "02218454459",
                "phone": "87991008134",
                "codServidor": 32860,
                "email": "fatinhaprofessora1976@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "0797d23a-6b15-4951-8c82-9bf0e065131a",
                "name": "Michelle Marinho Pinho",
                "cpf": "07973634401",
                "phone": "87981655939",
                "codServidor": 10124,
                "email": "michellempinho@hotmail.com",
                "position": "Orientador Pedagógico",
                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "07be73e7-764f-4da7-80fe-4eb436d88f1b",
                "name": "Alan Ricardo Antao Bezerra",
                "cpf": "02476882313",
                "phone": "87999795307",
                "codServidor": 18124,
                "email": "alanantao@hotmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "07c4ddb6-af80-4799-90e4-769549db2f96",
                "name": "Maria Girlene de Araujo Silva",
                "cpf": "01186228385",
                "phone": "87981641471",
                "codServidor": 40663,
                "email": "girlenemaria773@gmail.com",
                "position": "Secretário(a)",
                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "07c59ab2-8dbc-49d1-9b01-6b06a6ef3951",
                "name": "Ana Clara da Silva Galdino",
                "cpf": "12428771426",
                "phone": "8799946899",
                "codServidor": 4855,
                "email": "anaclrasg21@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "07e933cc-71df-46b3-8437-d4cfdaa13f5d",
                "name": "Edevaldo Braz Nunes",
                "cpf": "00041913310",
                "phone": "87998093267",
                "codServidor": 16436,
                "email": "edeves.braz.nunes@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "081ec29d-7694-4638-9f4a-f4bf198d5c9c",
                "name": "Antonia Dionete Barros Paiva",
                "cpf": "04698056411",
                "phone": "89994418915",
                "codServidor": 24791,
                "email": "dionetebarros256@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "083e9e29-4632-4aff-9904-3efcfabf7e09",
                "name": "Vaglania Rodrigues de Oliveira Lima",
                "cpf": "99821494404",
                "phone": "87981723775",
                "codServidor": 2960,
                "email": "vaglaniarodriguesdeoliveira@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "08584589-420b-40ca-a7ff-1a4d263f5cbc",
                "name": "Nedersara Delmondes Coelho Cordeiro",
                "cpf": "05864983462",
                "phone": "87981187302",
                "codServidor": 50495,
                "email": "saradelmondes86@gmail.com",
                "position": "Professor(a)",



                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "08b952e3-bbbe-4a31-b3c4-34ad58f09570",
                "name": "Regina Delmondes dos Santos",
                "cpf": "03066516458",
                "phone": "87981273479",
                "codServidor": 5470,
                "email": "reginalian02@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "094d1e98-4861-4cd5-b0bd-71932f189bef",
                "name": "Cinthya Costa Silva",
                "cpf": "34486238818",
                "phone": "87996223100",
                "codServidor": 13864,
                "email": "cinthyacosta1515@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "09795b56-3cf8-4372-9f96-5698b4032cc5",
                "name": "Juvenal Francisco da Paixao #1",
                "cpf": "39557979372",
                "phone": "89994335615",
                "codServidor": 208,
                "email": "juvenalfcopaixao@hotmail.com",
                "position": "Professor(a)",



                "institutionId": "1f0cb6c1-e074-4555-812b-378920649b71"
            },
            {
                "id": "099b86c0-1021-4dec-aefa-fa4db9efefe4",
                "name": "Simone Pereira Novais Coelho",
                "cpf": "04703053470",
                "phone": "87981054070",
                "codServidor": 16493,
                "email": "escola.virgilio.coelho@hotmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "09d42d79-7cd1-4905-8ea4-0836f689ce2f",
                "name": "Jarcleide de Jesus Delmondes",
                "cpf": "04202318463",
                "phone": "87996427899",
                "codServidor": 50549,
                "email": "kleidinhamaozita2@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "09f744a4-8bdf-4593-a153-8997fd92a07a",
                "name": "Gabrielly da Conceicao Andrade",
                "cpf": "71361492406",
                "phone": "87996205205",
                "codServidor": 12043,
                "email": "gabyconceicaoandrade2@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "0a39f1f2-13a4-43da-89d2-d6c5dac632c6",
                "name": "Marisete Pereira Barros Regis",
                "cpf": "05147390456",
                "phone": "87981678702",
                "codServidor": 10555,
                "email": "pereirabarrosmarisete@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "0ae69b59-0ea3-4bfd-a735-1e349e2db25f",
                "name": "Janadyely Barboza Medeiros",
                "cpf": "08544302459",
                "phone": "87999148612",
                "codServidor": 10949,
                "email": "janadyely@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "0b017dbb-aac0-4b27-8fbd-711ba9346e05",
                "name": "Leticia Macedo Morais",
                "cpf": "15288075450",
                "phone": "87981131260",
                "codServidor": 19367,
                "email": "moraisleticiam@icloud.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "0b354ba0-25e0-411d-a331-d28aaa6fce18",
                "name": "Monica Girlene Cordeiro Modesto",
                "cpf": "65668359387",
                "phone": "87981548474",
                "codServidor": 12706,
                "email": "modestomonica94@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "0b390c52-e12b-47d5-acbc-cf0a170945fd",
                "name": "Ana Lucia Limoeiro Limoeiro",
                "cpf": "85454320382",
                "phone": "89994669794",
                "codServidor": 3317,
                "email": "analucialimoeirolimoeiro@gmail.com",
                "position": "Professor(a)",
                "institutionId": "1f0cb6c1-e074-4555-812b-378920649b71"
            },
            {
                "id": "0b4a6f6b-ca42-43e1-a943-245954250b8e",
                "name": "Juliana Karla Santos Silva",
                "cpf": "10119385457",
                "phone": "89994719747",
                "codServidor": 62998,
                "email": "julianakarlla@outlook.coM",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "0bade3e9-8b63-4537-b619-0ac72d5e8464",
                "name": "Cleidimar Raimunda da Silva",
                "cpf": "82572518368",
                "phone": "89994049908",
                "codServidor": 3096,
                "email": "cleidimarraimunda2014@hotmail.com",
                "position": "Professor(a)",



                "institutionId": "1f0cb6c1-e074-4555-812b-378920649b71"
            },
            {
                "id": "0bb981de-552d-4795-97df-acc13eb87aca",
                "name": "Francinalda Pereira de Carvalho Leite",
                "cpf": "03714746471",
                "phone": "87981173949",
                "codServidor": 7455,
                "email": "cinalva2024@hotmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "0bc76db3-cab5-4901-b1e1-b39e352a3fe6",
                "name": "Jaqueline Kelly Alencar e Souza",
                "cpf": "04864990492",
                "phone": "87991802613",
                "codServidor": 31014,
                "email": "alencarkelly2017@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "0bdf8b98-e4d7-40d8-84aa-751a6cd02ea1",
                "name": "Elisvania Dias da Silva",
                "cpf": "05161644494",
                "phone": "87991223214",
                "codServidor": 34621,
                "email": "elisvaniad@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "0c0c78df-4f46-4810-8261-6193480f42e5",
                "name": "Vanessa da Silva Penha",
                "cpf": "39127080889",
                "phone": "87991551908",
                "codServidor": 52567,
                "email": "vanessafafopa@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "0c3ac23d-c59b-4150-b932-eb26419c3e80",
                "name": "Liliane Silva do Nascimento",
                "cpf": "11804715476",
                "phone": "87981687643",
                "codServidor": 9539,
                "email": "reinaldop.s199611@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "0ca870e9-31e9-4545-bd67-3a56bc63f2cd",
                "name": "Francisca Madia Bezerra de Lima",
                "cpf": "06832217447",
                "phone": "87981273770",
                "codServidor": 5238,
                "email": "madiaatx@hotmail.com",
                "position": "Coordenador(a)",
                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "0d2059eb-f136-46b8-879c-370ccf33325f",
                "name": "Administrador",
                "cpf": "00000000000",
                "codServidor": 1,
                "position": "Administrador(a)",
                "institutionId": "1f0cb6c1-e074-4555-812b-378920649b71"
            },
            {
                "id": "0d502079-8f6c-4d7b-b637-aea3cf5ac44c",
                "name": "Joselma Lima Pereira",
                "cpf": "86517902449",
                "phone": "87991565663",
                "codServidor": 18785,
                "email": "josyclick21@hotmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "0d72079d-a06a-424f-a7da-0c36d622505a",
                "name": "Maria Luzimar Silva Santos Lacerda",
                "cpf": "03759861466",
                "phone": "87991247416",
                "codServidor": 62691,
                "email": "luzimarlacerda@gmail.coM",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "0d945591-2a48-453f-91b0-f0c4a80ec5fb",
                "name": "Sandra Carvalho de Alencar e Sousa",
                "cpf": "03761700423",
                "phone": "87991800484",
                "codServidor": 41888,
                "email": "sandracarvalhoveras@hotmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "0dabf3c7-d1ba-4a9d-a0b6-1d98a99799af",
                "name": "Iris de Figueredo Almeida",
                "cpf": "58206132449",
                "phone": "87991794639",
                "codServidor": 30643,
                "email": "irisfigueredo140269@gmail.com",
                "position": "Diretor(a)",
                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "0e5827c1-90b9-4e47-94ae-9d86824a559e",
                "name": "Maria Darticlea de Oliveira",
                "cpf": "90256913404",
                "phone": "87991828619",
                "codServidor": 11716,
                "email": "darticleiaoliveira71@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "0ee4983d-6434-429b-b314-6feda943adaf",
                "name": "Maria Clêdjane Carvalho Moreira",
                "cpf": "84576383434",
                "phone": "87999957143",
                "codServidor": 62561,
                "email": "janemfff@hotmaiil.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "0f8bcc16-5c9a-41c9-affc-71efeb1e59c6",
                "name": "Veronica de Lima Alves",
                "cpf": "04771658420",
                "phone": "87992121954",
                "codServidor": 54749,
                "email": "veronicaekaue@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "1016c69b-ec6b-443e-bb44-d3137d5f8f7a",
                "name": "Sandra Beatriz Alves Lopes",
                "cpf": "05463477469",
                "phone": "87981539602",
                "codServidor": 16935,
                "email": "muitofeliz460@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "1017c01e-e5ec-450d-9346-6139e230f029",
                "name": "Maria da Penha Silva Forte",
                "cpf": "76538524400",
                "phone": "87991997526",
                "codServidor": 426,
                "email": "ma.riapenhasilva.45@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "101e1cb8-7670-4326-9731-78b9aa9a99c6",
                "name": "Francisca Rosselene Rodrigues Coelho",
                "cpf": "03513710445",
                "phone": "87991030581",
                "codServidor": 18948,
                "email": "rosselene_29@hotmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "10ce2552-9563-496f-b1c9-1d040913dd1b",
                "name": "Nagela Maria Alencar Marinho de Maximo Lacerda",
                "cpf": "88408035487",
                "phone": "87996803182",
                "codServidor": 250,
                "email": "nagelaalencar@hotmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "10fc0977-29c7-4f61-8c88-e4a0f877760d",
                "name": "Jamile de Oliveira Silva",
                "cpf": "12860272410",
                "phone": "87998023150",
                "codServidor": 12016,
                "email": "jamiledeoliveirasilvamilly@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "11020ec1-de34-41f2-809b-432c81fb842b",
                "name": "Guacy Kelly Rodrigues de Carvalho Alencar",
                "cpf": "05171343497",
                "phone": "87996401941",
                "codServidor": 35437,
                "email": "guacykelly@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "1103c468-7114-47b2-b1f9-1432f8d807e9",
                "name": "Derleandro da Silva Santos",
                "cpf": "07800608492",
                "phone": "87991498998",
                "codServidor": 17903,
                "email": "Derleandro.santos@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "1122b267-bb5b-4cb0-ae6e-5e20c4b83b15",
                "name": "Samária Mércia Delmondes",
                "cpf": "03440738400",
                "phone": "87999347946",
                "codServidor": 60202,
                "email": "samariamercia@hotmail.com",
                "position": "Professor(a)",
                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "115fc401-44b6-404a-ba7a-16cd77787696",
                "name": "Marilza Maria de Macedo",
                "cpf": "96737999387",
                "phone": "89994226701",
                "codServidor": 4511,
                "email": "marilza86@hotmail.com",
                "position": "Professor(a)",



                "institutionId": "1f0cb6c1-e074-4555-812b-378920649b71"
            },
            {
                "id": "119894ac-4413-4489-ad4c-0513bbf48a0e",
                "name": "Maria Eliete Silva Ferreira",
                "cpf": "89980930497",
                "phone": "87981780110",
                "codServidor": 40636,
                "email": "mariaelietesf2@gmail.com",
                "position": "Coordenador(a)",
                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "11d92575-adcf-41eb-a190-056cbd25800f",
                "name": "Ana Clecia Ferraz Pereira",
                "cpf": "07404041481",
                "phone": "87992084016",
                "codServidor": 59383,
                "email": "cleciaferraz002@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "11fb79a2-f7b4-4535-b180-473776a27c2d",
                "name": "Verônica Pereira Bezerra",
                "cpf": "08672011422",
                "phone": "87981323484",
                "codServidor": 53542,
                "email": "veronicabezerra93@gmail.com",
                "position": "AUXILIAR DE SALA",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "1226603d-4e40-48b0-9741-6c74faefae8c",
                "name": "Jucimaria Sabino da Silva",
                "cpf": "08905910408",
                "phone": "87999672228",
                "codServidor": 11305,
                "email": "jucimariamara578@gmail.com",
                "position": "Agente Administrativo",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "1251dde4-a9a4-4509-9a46-381bd8f4b43e",
                "name": "Josimar Francisco de Lima",
                "cpf": "04255804400",
                "phone": "87996292840",
                "codServidor": 23948,
                "email": "jfl10.josimar@gmail.com",
                "position": "Professor(a)",



                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "1290e41c-9b94-4bac-98ce-025b7ef89ea4",
                "name": "Raimunda Gomes da Silva",
                "cpf": "54110424453",
                "phone": "87992430652",
                "codServidor": 28349,
                "email": "raimunda.bezerra1969@gmail.com",
                "position": "Diretor(a)",
                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "132165b1-3a43-4010-b53a-34fca023e166",
                "name": "Anisia Maria de Sousa",
                "cpf": "83125698391",
                "phone": "89994664335",
                "codServidor": 14,
                "email": "anisiasousa517@gmail.com",
                "position": "Professor(a)",



                "institutionId": "1f0cb6c1-e074-4555-812b-378920649b71"
            },
            {
                "id": "132aa95a-16f2-46fd-abd1-f63be8d9c656",
                "name": "Maria do Socorro Batista Silva",
                "cpf": "88408027468",
                "phone": "87991497141",
                "codServidor": 40102,
                "email": "socorrojms@gmail.com",
                "position": "Professor (a) em Readaptação",
                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "13b83122-f3d5-437c-83b8-c90cc8ea9a9c",
                "name": "Maria Francisca de Lima Carvalho",
                "cpf": "96353066449",
                "phone": "87992080608",
                "codServidor": 32774,
                "email": "educacao1704@hotmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "13fc70da-89e1-4d1e-8381-5afeaf44a163",
                "name": "Murillo Kedson Mattos Silva",
                "cpf": "09443549476",
                "phone": "87981695317",
                "codServidor": 3323,
                "email": "murillo200990@hotmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "1427bdff-64c1-434b-bdf4-034c01811c40",
                "name": "Valdelice Macedo Delmondes",
                "cpf": "05522258438",
                "phone": "87991993950",
                "codServidor": 36277,
                "email": "valdelicemacedo5@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "1430b7ff-e80c-44b0-95b2-40a1d15e14bb",
                "name": "Anarleide de sa Silva Cunha",
                "cpf": "11565034422",
                "phone": "8791090408",
                "codServidor": 46922,
                "email": "Cunhaanarleide@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "14357a81-d712-4b11-b7c2-04c2b6b29e1e",
                "name": "Roselma Alzeni Gomes",
                "cpf": "95718109320",
                "phone": "89994403510",
                "codServidor": 4352,
                "email": "gomesroselma440@gmail.com",
                "position": "Professor(a)",



                "institutionId": "1f0cb6c1-e074-4555-812b-378920649b71"
            },
            {
                "id": "14521ffa-6bc7-4d95-a0c5-f75bc7464405",
                "name": "Rizelia Maria dos Santos Rodrigues",
                "cpf": "03671940409",
                "phone": "87999809042",
                "codServidor": 886,
                "email": "rizeliamariadossantosrodrigues@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "1489de30-b7bc-46cf-b079-b754fe78a6b2",
                "name": "Lidjane Josefa de Sousa",
                "cpf": "03890838367",
                "phone": "89994145214",
                "codServidor": 5227,
                "email": "lele_felipe2012@hotmail.com",
                "position": "Professor(a)",



                "institutionId": "1f0cb6c1-e074-4555-812b-378920649b71"
            },
            {
                "id": "1509e618-6dca-425e-9209-2f679ad1dbe3",
                "name": "Doralice de Sousa Caetano Lima",
                "cpf": "01960866478",
                "phone": "97991523816",
                "codServidor": 41718,
                "email": "sousadoralice1968@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "1524a354-0918-40cb-ab9b-28ed381c3613",
                "name": "Zoe Barros Oliveira",
                "cpf": "70147823471",
                "phone": "87996368825",
                "codServidor": 16926,
                "email": "zoebarros4@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "153f90ce-939d-4995-890b-5635c91bd490",
                "name": "Jessica de Farias Silva",
                "cpf": "12264530405",
                "phone": "87991826956",
                "codServidor": 46910,
                "email": "lleofarias51@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "15be75c0-111e-4b5e-92da-f85023106fff",
                "name": "Bruno Barbosa Cavalcanti",
                "cpf": "08554877470",
                "phone": "83988270925",
                "codServidor": 25286,
                "email": "brunocavalcanti8@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "1607987a-5e84-4f45-a63e-5ae5502e8262",
                "name": "Francisca Jocelma de Sousa Santos",
                "cpf": "05582718478",
                "phone": "89994049792",
                "codServidor": 54238,
                "email": "jocelmasousa697@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "1647f8a9-6b10-4924-8bd6-c32c767bd670",
                "name": "Georgiana Batista dos Santos",
                "cpf": "12357159499",
                "phone": "8791818816",
                "codServidor": 46928,
                "email": "georgianabatista18@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "164c9674-844a-4a41-bb1e-a0c294394b01",
                "name": "Francisca Dalvanir da Silva Pereira",
                "cpf": "05295316408",
                "phone": "87991981246",
                "codServidor": 6429,
                "email": "dalvanir26@hotmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "168cb142-0703-4d8b-905e-84005064e1d7",
                "name": "Ligia Maria Costa Silva",
                "cpf": "10128678461",
                "phone": "87999680568",
                "codServidor": 4094,
                "email": "ligiamariacosta.s@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "16901556-5061-4e00-9780-bf725848d143",
                "name": "Maria Elisandra dos Santos Costa",
                "cpf": "00935846360",
                "phone": "89999133304",
                "codServidor": 36659,
                "email": "mariaelisandra.costa@prof.edu.araripina.pe.gov.br",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "16af9c4b-443a-4025-b5d5-1e0eeefbec60",
                "name": "Maria Aparecida Pereira de Carvalho",
                "cpf": "09741077432",
                "phone": "87981336832",
                "codServidor": 40646,
                "email": "maparecida1232021@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "17243de0-3bfa-429f-a44a-f24f4991d45a",
                "name": "Neurisvania Andrade Galvao",
                "cpf": "00976119480",
                "phone": "87996346098",
                "codServidor": 16573,
                "email": "neurisvania3@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "187a017f-f87c-4bc7-b847-9d9597a98a8c",
                "name": "Rita de Cassia Rodrigues de Macedo",
                "cpf": "06191936460",
                "phone": "8994633238",
                "codServidor": 1460,
                "email": "rcassia2013@outlook.com",
                "position": "Professor(a)",



                "institutionId": "1f0cb6c1-e074-4555-812b-378920649b71"
            },
            {
                "id": "18b80801-37fe-4c13-89b9-c30ef617ef1b",
                "name": "Elielma Batista Duarte",
                "cpf": "03993474457",
                "phone": "87991143766",
                "codServidor": 32378,
                "email": "elielmaduarte9@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "19204712-4aad-404d-8f6f-2f12dd7cc6c2",
                "name": "Paula Rocha de Oliveira",
                "cpf": "03130883495",
                "phone": "87999858499",
                "codServidor": 17308,
                "email": "paulardo38@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "193c0e44-558a-46a8-859d-d242be1565fc",
                "name": "Damiana Maria da Silva Santos",
                "cpf": "08695204405",
                "phone": "87999996829",
                "codServidor": 496,
                "email": "ds5613402@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "19b15a61-f2ee-49f2-a0f1-d18ab8ea4da3",
                "name": "Maria Laianes Alencar Campos",
                "cpf": "09341837405",
                "phone": "87991299102",
                "codServidor": 55224,
                "email": "laianes1991@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "19e26c9a-4d58-4bd7-8f81-ab4c85264f2a",
                "name": "Antonia Auricelia de Morais",
                "cpf": "02796080471",
                "phone": "87981083403",
                "codServidor": 726,
                "email": "moraisauricelia28@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "1a1cac46-a2f3-45c3-9f68-36ecfa203268",
                "name": "Roberio Batista Silva",
                "cpf": "09107856431",
                "phone": "87991226970",
                "codServidor": 49261,
                "email": "robebatist@hotmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "1a4991b1-f6a4-4a3b-892b-e7487a9c572f",
                "name": "Leticia Silva",
                "cpf": "13124081463",
                "phone": "87999718908",
                "codServidor": 11512,
                "email": "99718908silva@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "1b09fcf9-01d6-41cc-af6e-541a916c2faf",
                "name": "Neide Maria de Santana",
                "cpf": "05817213494",
                "phone": "87981185146",
                "codServidor": 2697,
                "email": "neidesantana123@outlook.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "1bb3f419-3b31-48bb-887b-cf992856099e",
                "name": "Maria Lindete da Cruz Pereira",
                "cpf": "86761056420",
                "phone": "87991256785",
                "codServidor": 11409,
                "email": "marialindete29@outlook.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "1bca37c6-ce27-4dd2-89be-7fa29fbd4fde",
                "name": "Ronalva Ferreira Paixao Lima",
                "cpf": "03176511450",
                "phone": "87991236469",
                "codServidor": 17855,
                "email": "ronalvaferreirapaixaolima@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "1bf53185-9f78-4861-a329-b48ea1f1a4a5",
                "name": "Maria Jádylla da Silva Vieira",
                "cpf": "11529479401",
                "phone": "87981173614",
                "codServidor": 19369,
                "email": "jadyllamariav@hotmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "1c42878d-4f0a-4a0a-b0e2-5b8e94ce0844",
                "name": "Maria do Socorro Teixeira de Sousa #1",
                "cpf": "59040343349",
                "phone": "89994145824",
                "codServidor": 1635,
                "email": "socorroteixeira@outlook.com",
                "position": "Professor(a)",



                "institutionId": "1f0cb6c1-e074-4555-812b-378920649b71"
            },
            {
                "id": "1c5b13db-833b-4fdd-b556-43f1dbaf084c",
                "name": "Maria Rivaneide Ramos Oliveira",
                "cpf": "03097508490",
                "phone": "87991709102",
                "codServidor": 1933,
                "email": "neideram77@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "1ccd2954-4676-432b-9aae-5abed338c925",
                "name": "Nubia Sousa Modesto Feitoza",
                "cpf": "02842994485",
                "phone": "87991191122",
                "codServidor": 34949,
                "email": "nubia.modesto@prof.edu.araripina.com.br",
                "position": "PROFESSOR(A)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "1cd09b40-a9bb-4929-b069-d30d20dec1f4",
                "name": "Luzia Maria Rodrigues dos Santos",
                "cpf": "11465394443",
                "phone": "87996556723",
                "codServidor": 19325,
                "email": "luzia123rodrigues456@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "1cecfa50-67ef-403e-a20e-a99a8526e4c4",
                "name": "Raimunda Nonata Rosal Soares",
                "cpf": "07276122476",
                "phone": "87991181743",
                "codServidor": 32026,
                "email": "raimunda.rosal@prof.edu.araripina.pe.gov.br",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "1d65e09a-ac7e-42ec-a624-47bb03812ba5",
                "name": "Joelma Maria da Silva Gomes",
                "cpf": "92225462453",
                "phone": "87991516181",
                "codServidor": 22042,
                "email": "joelma1027@hotmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "1da31535-e0d1-42d9-b72b-915ae4bb53dd",
                "name": "Marisa Rodrigues dos Santos",
                "cpf": "07761794464",
                "phone": "87991055165",
                "codServidor": 53534,
                "email": "rodriguesdossantosmarisa@gmail.com",
                "position": "PROFESSOR(A)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "1ddd807b-51a6-4fdb-93ee-2a9c2b81006a",
                "name": "Maria do Socorro Sousa Moura Alves",
                "cpf": "90167600400",
                "phone": "87991362009",
                "codServidor": 29450,
                "email": "mariadsocorros629@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "1dfb7d7e-0d86-4b23-b261-4cd24dbacff4",
                "name": "Veronica Ferreira dos Santos",
                "cpf": "93511264472",
                "phone": "87991124278",
                "codServidor": 27361,
                "email": "veronica.santos@prof.edu.araripina.pe.gov.br",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "1e6f7fe4-431c-422b-85f3-035666ab949b",
                "name": "Valderval Brito Lima",
                "cpf": "04119531414",
                "phone": "87991032065",
                "codServidor": 20488,
                "email": "almeidarafaelalmeida26@gmail.com",
                "position": "Professor(a)",



                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "1ea08cd5-e140-497f-85bf-2ecd7781af1e",
                "name": "Tereza Cristina de Oliveira",
                "cpf": "04054481477",
                "phone": "87991923506",
                "codServidor": 6080,
                "email": "terezacristinaeesc@gmail.com",
                "position": "Professor(a)",



                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "1eb19d38-359e-4186-89c5-b2085284526b",
                "name": "Flavia Maria dos Santos",
                "cpf": "07416596467",
                "phone": "87996011099",
                "codServidor": 12921,
                "email": "fs1465890@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "1edaa8ff-188a-40ae-9ee5-7fef82553f70",
                "name": "Marizete da Silva Bento",
                "cpf": "02449834451",
                "phone": "87991114101",
                "codServidor": 62288,
                "email": "leticiaerosa2020.1@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "1f9de0a2-5b39-44e1-94d9-945ae9735ccf",
                "name": "Maria Paloma da Silva Alves",
                "cpf": "13592131478",
                "phone": "87981672914",
                "codServidor": 6831,
                "email": "mpaloma@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "20aca3bc-0073-4949-833d-139d717eec8c",
                "name": "Francisco Salomão da Silva Alves",
                "cpf": "08008031409",
                "phone": "87991157170",
                "codServidor": 61566,
                "email": "salomaoalves140@hotmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "2123edee-1b7d-4503-ac2d-eb53a9c6173e",
                "name": "Maria de Fatima Nunes Pereira de Sousa",
                "cpf": "01029165432",
                "phone": "87991131880",
                "codServidor": 51386,
                "email": "tati123nunes@outlook.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "21c0b7d8-cd3d-463f-b282-ddfc652f0920",
                "name": "Wilma Lucia dos Anjos Gomes",
                "cpf": "69696799420",
                "phone": "87991045726",
                "codServidor": 9610,
                "email": "wilmasero@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "222d5b14-df8d-4c34-9d96-c864f533a04b",
                "name": "Vanilza Oliveira Rodrigues",
                "cpf": "07138969490",
                "phone": "87981103462",
                "codServidor": 16414,
                "email": "vanilzaor@hotmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "2268e9a1-9738-461d-b043-803388c1d109",
                "name": "Lindalva Souza Delmondes",
                "cpf": "86576461453",
                "phone": "87981250632",
                "codServidor": 22819,
                "email": "lindalvadelmondes2019@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "2276ac1b-428c-4ef7-ab79-9777f9dbe0fa",
                "name": "Dionizio Ferreira da Silva",
                "cpf": "84576324420",
                "phone": "87981608353",
                "codServidor": 13449,
                "email": "dionizio.gtn@hotmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "22836554-dbc5-4862-9fa5-493518a4faed",
                "name": "Elenice Pereira da Silva",
                "cpf": "04613087465",
                "phone": "87981147605",
                "codServidor": 4796,
                "email": "pereiraelenice41@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "2284ed35-b83d-4bc3-9c70-954b7d024cbc",
                "name": "Amaralina Maria Cavalcante Clementino",
                "cpf": "39556913300",
                "phone": "89994328962",
                "codServidor": 2896,
                "email": "gleyciele.sousa@hotmail.com",
                "position": "Professor(a)",



                "institutionId": "1f0cb6c1-e074-4555-812b-378920649b71"
            },
            {
                "id": "22c265ec-4497-42c4-ac59-3ed056e89217",
                "name": "Maria Janailda da Silva",
                "cpf": "01173679405",
                "phone": "87981415478",
                "codServidor": 4163,
                "email": "janailda10@hotmail.com",
                "position": "Coordenador(a)",
                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "22e78684-279e-42ec-b25b-5b401860e429",
                "name": "Maria Silvia Araujo Pereira Bezerra",
                "cpf": "03748210469",
                "phone": "87981822058",
                "codServidor": 8568,
                "email": "araujosilvia474@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "2330c00e-8b8e-4fec-a7f1-f34fa6840aec",
                "name": "Antonia Maria do Nascimento",
                "cpf": "10354784471",
                "phone": "87981138928",
                "codServidor": 7531,
                "email": "nascimentotoinha06@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "2369254c-5440-460b-8e09-613f5172cf88",
                "name": "Luis Jose de Sousa",
                "cpf": "24761486368",
                "phone": "89994006975",
                "codServidor": 1027,
                "email": "marcelomacedosousa@hotmail.com",
                "position": "Professor(a)",
                "institutionId": "1f0cb6c1-e074-4555-812b-378920649b71"
            },
            {
                "id": "23a73e45-f94f-43de-9474-67a3b9b90178",
                "name": "Antonia Andrade do Nascimento",
                "cpf": "02068012464",
                "phone": "8798116875",
                "codServidor": 15079,
                "email": "antonia.nascimento@prof.edu.araripina.pe.gov.br",
                "position": "Professor(a)",
                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "2470bcc4-f133-4f56-ad0a-b837a8ba7dd0",
                "name": "Antonia Fernanda de Sales Silva",
                "cpf": "11334917400",
                "phone": "87998083397",
                "codServidor": 13156,
                "email": "fernandasales411@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "25359495-d4a9-44da-8c1f-a5c5083dd5c3",
                "name": "Francisco Elivan de Alencar",
                "cpf": "03966734494",
                "phone": "87996014947",
                "codServidor": 26437,
                "email": "franelivan@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "25858724-1c33-4e1f-bca8-852d6d09a443",
                "name": "Mágia Irandi dos Santos",
                "cpf": "09203055479",
                "phone": "87981413608",
                "codServidor": 50181,
                "email": "magia.irandi@gmail.com",
                "position": "Professor(a)",



                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "25fc1e8a-21b5-4afd-a160-c3de1f8597b4",
                "name": "Maria Oberdenia Freire de Oliveira",
                "cpf": "83096655472",
                "phone": "87991319509",
                "codServidor": 34618,
                "email": "oberdeniafreireoliveira@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "26043be7-129c-4dd1-8993-9aee3154abdf",
                "name": "Antonia de Padua da Silva",
                "cpf": "03604524423",
                "phone": "87981611298",
                "codServidor": 8486,
                "email": "ANTPVS2010@HOTMAIL.COM",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "262833fa-6030-4fa3-bf70-68fffb738463",
                "name": "Wellington dos Santos Rodrigues #1",
                "cpf": "03562124325",
                "phone": "89994326261",
                "codServidor": 3516,
                "email": "professorwellingtonescola@gmail.com",
                "position": "Professor(a)",



                "institutionId": "1f0cb6c1-e074-4555-812b-378920649b71"
            },
            {
                "id": "269f1afc-ed42-4a38-9537-74b1de74f901",
                "name": "Umberto Silva Santos",
                "cpf": "74649841453",
                "phone": "87991148832",
                "codServidor": 1585,
                "email": "umbertosilvasantos8@gmail.com",
                "position": "Orientador Educacional",
                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "26e5204a-babf-4447-ba0f-470672aa12cb",
                "name": "Valeria Rocha de Oliveira",
                "cpf": "07242297443",
                "phone": "87998101868",
                "codServidor": 18511,
                "email": "valeriaipubi@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "26e902c4-bbc6-4285-a6ee-4402b3697b03",
                "name": "Joao Cicero Rodrigues",
                "cpf": "21272603334",
                "phone": "89994325341",
                "codServidor": 1630,
                "email": "rjoaocicero@gmail.com",
                "position": "Professor(a)",



                "institutionId": "1f0cb6c1-e074-4555-812b-378920649b71"
            },
            {
                "id": "26f385d2-759f-4c5f-a321-218c7bb1d27c",
                "name": "Maria Luciana Nogueira de Aquino",
                "cpf": "06444411432",
                "phone": "87999355183",
                "codServidor": 18899,
                "email": "luciananogueiraaquino@outlook.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "26f5af04-2f65-4868-9e58-01300212bd1f",
                "name": "Francisco Samuel Franca dos Santos",
                "cpf": "09634830480",
                "phone": "87981722137",
                "codServidor": 9006,
                "email": "sam-franca@hotmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "273c793f-6fca-443d-9372-13fe6b1a016c",
                "name": "Francisca Naldiene de Sousa Cordeiro",
                "cpf": "08917686451",
                "phone": "87991640237",
                "codServidor": 41620,
                "email": "naldienecordeirodacruz@gmail.coM",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "2774fd26-83e7-4dc2-bac7-7ebc90b6aed6",
                "name": "Alecilda Serio Lopes",
                "cpf": "00303063378",
                "phone": "89999306263",
                "codServidor": 23083,
                "email": "alecilda.serio.lopes@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "27aec607-5dcc-41dc-aea4-21196859bc05",
                "name": "Maria Salete Faustino do Nascimento Silva",
                "cpf": "50788744453",
                "phone": "8799316259",
                "codServidor": 24700,
                "email": "salete.silva2321@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "283eb8f0-ac04-4a84-8bb7-6f36acdacd54",
                "name": "Aline Oliveira Modesto de Castro",
                "cpf": "10099098431",
                "phone": "87991423489",
                "codServidor": 33297,
                "email": "alinelmb@yahoo.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "2887cace-468c-4656-8e43-ffc978634097",
                "name": "Gilvanda dos Santos Rodrigues de Araujo",
                "cpf": "02139082478",
                "phone": "87991492156",
                "codServidor": 1265,
                "email": "gilvandarodrigues74@gmail.com",
                "position": "Professor(a)",
                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "2895fab0-c80c-4fab-9740-ae2693d8d7b8",
                "name": "Filipe Ferreira do Nascimento",
                "cpf": "10984813489",
                "phone": "87996135774",
                "codServidor": 15912,
                "email": "filipeferreira_nascimento@hotmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "28a1b05a-0148-4ad2-8175-c500e69ed39b",
                "name": "Maria Crisnaudia de Macedo Silva",
                "cpf": "03800139405",
                "phone": "87991554500",
                "codServidor": 33530,
                "email": "mariacrisnaudia@hotmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "28a55112-e2e0-4582-9513-a822d838ebc6",
                "name": "Paulo Roque Veloso de Alencar",
                "cpf": "08641545425",
                "phone": "87992108531",
                "codServidor": 59071,
                "email": "paulo.alencar@edu.araripina.pe.gov.br",
                "position": "Secretário(a)",
                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "28c4b387-7717-4131-b941-a20c367fa945",
                "name": "Maria Lesimaria Cruz e Silva",
                "cpf": "05122595429",
                "phone": "87991393152",
                "codServidor": 7209,
                "email": "lesimariamaria14@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "28d2bb05-9241-49a5-8622-bdd392e8cbde",
                "name": "Porfirio Jose de Alencar",
                "cpf": "02376718406",
                "phone": "87991897475",
                "codServidor": 20671,
                "email": "porfiriojose@hotmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "2931a894-87d1-478b-b640-ce57a452451b",
                "name": "Maria Laudelina Cordeiro Muniz",
                "cpf": "01061809404",
                "phone": "87981217971",
                "codServidor": 11188,
                "email": "marialaudeli8@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "2974b208-f18f-494b-ba35-4e5e3639e291",
                "name": "Gisele de Arruda Batista",
                "cpf": "05560864498",
                "phone": "87991701713",
                "codServidor": 14150,
                "email": "gip-gizele@hotmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "2986ee4f-6360-47b9-b6e2-3ae4e56ba9d3",
                "name": "Alana Evile Dantas de Macedo",
                "cpf": "06624867140",
                "phone": "87996466505",
                "codServidor": 18808,
                "email": "macedoalana504@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "2a12611d-715b-45a9-89d0-87a5bbe4791e",
                "name": "Maria Vanessa Bezerra Alves de Oliveira",
                "cpf": "10278570437",
                "phone": "87998046073",
                "codServidor": 12602,
                "email": "lauravictoriaalves2012@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "2a20d58b-718b-47fa-b0f1-56606dbba6b2",
                "name": "Francisca Monica Aparecida dos Santos Silva",
                "cpf": "12383299421",
                "phone": "89994294385",
                "codServidor": 62918,
                "email": "franciscamonicaaparecidasilva@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "2a6c8840-80c5-422e-8d8b-45e1e9ddf8e7",
                "name": "Ana Mileny Oliveira de Souza",
                "cpf": "11345955499",
                "phone": "87999639942",
                "codServidor": 13126,
                "email": "anamileny2019@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "2a960241-bab9-4deb-a23f-253b139e539c",
                "name": "Maria Erivaneide de Vasconcelos",
                "cpf": "99358301449",
                "phone": "87996198553",
                "codServidor": 14585,
                "email": "erivaneide1974@hotmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "2ae2749c-f3a6-4401-8a51-3384f18d3bce",
                "name": "Jaelsa da Silva Ferreira",
                "cpf": "05619869407",
                "phone": "87981678842",
                "codServidor": 12942,
                "email": "Jaelsaeducacaofisica@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "2b3b60c1-aa7a-44dd-a557-d6db5d794d86",
                "name": "Jocilene de Sousa Carvalho",
                "cpf": "99303108353",
                "phone": "89999337372",
                "codServidor": 36946,
                "email": "jocilene.sousa@edu.araripina.pe.gov.br",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "2ba861d3-970f-4fde-b802-5d15b60b6590",
                "name": "Damiana Silva Feliciano Mendes",
                "cpf": "03186252458",
                "phone": "87981332268",
                "codServidor": 5107,
                "email": "damifeliciano124@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "2c296b51-14a6-4010-9cd1-fe6acc902484",
                "name": "Patrícia Deiva Silva Rodrigues",
                "cpf": "07627095450",
                "phone": "87991071410",
                "codServidor": 53623,
                "email": "katarinalorraynesilvaoliveira@gmail.coM",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "2c3bcb88-68ea-4979-b377-2d63ebb404df",
                "name": "Maria Silmara Bezerra de Assis",
                "cpf": "96344660449",
                "phone": "87996626366",
                "codServidor": 28510,
                "email": "Silmaragloria1@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "2c7cb594-fe57-4857-8132-49317d1a80dd",
                "name": "Maria Edjane do Nascimento Silva",
                "cpf": "03160400450",
                "phone": "87999448516",
                "codServidor": 17370,
                "email": "mariaedijja2019@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "2cf1a12a-dc7b-4e42-9912-23c624b1ecfa",
                "name": "Carmem da Silva Dias",
                "cpf": "96334150472",
                "phone": "87981274903",
                "codServidor": 16626,
                "email": "carmemsdias@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "2d5ce904-729c-46c7-a1ff-e523cad75cb9",
                "name": "Raniere Marques Jaco",
                "cpf": "04723122435",
                "phone": "87991024294",
                "codServidor": 27524,
                "email": "ranierejaco67@gmail.com",
                "position": "PROFESSOR(A)",
                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "2da0585a-bfcf-4eec-a0ff-ee0de8201855",
                "name": "Risomar Bianor Ramalho",
                "cpf": "03521887405",
                "phone": "87991359092",
                "codServidor": 40720,
                "email": "risa.ramalho@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "2e50a309-270d-4dd9-9bd4-a99889c5fef6",
                "name": "Sabina Maria Antunes",
                "cpf": "02125649438",
                "phone": "87991769711",
                "codServidor": 7227,
                "email": "sabinantunes@hotmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "2ebe682a-5621-4c5f-8cde-04e9d7d90001",
                "name": "Jose Janailson Feitoza dos Santos",
                "cpf": "03703242426",
                "phone": "87999210732",
                "codServidor": 5197,
                "email": "janailson.feitoza@yahoo.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "2f10fbd6-bbe1-4ebb-afe3-7566c834d679",
                "name": "Gecianna de Lima Bispo",
                "cpf": "08119633490",
                "phone": "87981473429",
                "codServidor": 32274,
                "email": "geci.anna@hotmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "2f9a711d-d720-415a-a6d7-1eb4fdb3f6c9",
                "name": "Francimara do Nascimento Eugenio",
                "cpf": "12633790445",
                "phone": "87981680530",
                "codServidor": 57832,
                "email": "francimara.123@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "2fc2f35e-07e2-4b1a-8de4-2065b06bd50b",
                "name": "Damiao de Sousa Cordeiro",
                "cpf": "02439846422",
                "phone": "87981576196",
                "codServidor": 29551,
                "email": "daodcordeiro@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "2fc99849-ea12-4d48-864c-2191f31d9610",
                "name": "Gildete Benicio da Silva",
                "cpf": "26760549880",
                "phone": "87981271487",
                "codServidor": 16568,
                "email": "gildetecoelho01@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "2fd5290e-d95c-4158-95f8-e00e298f00fd",
                "name": "Armando Nilo de Carvalho Santos",
                "cpf": "06230699389",
                "phone": "87981142869",
                "codServidor": 4679,
                "email": "armandonilo37@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "308057c5-f810-4ed8-a3b1-d2d70ad0c32f",
                "name": "Socorro Rodrigues dos Santos",
                "cpf": "70493578471",
                "phone": "87981166642",
                "codServidor": 58863,
                "email": "Socorro12rodrigues47@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "30da8b03-9264-4e57-8144-77228d98fa6b",
                "name": "Edinalva Francisca dos Santos Alencar",
                "cpf": "06360425459",
                "phone": "87999386893",
                "codServidor": 4370,
                "email": "edinlavaalencar@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "310daeec-2a80-4819-96c3-872c45fd425c",
                "name": "Cicera Maria Pereira dos Santos",
                "cpf": "13745249488",
                "phone": "87981005286",
                "codServidor": 273,
                "email": "escolinhadefutsaluniao@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "315c6dc7-2473-4d10-8e54-dc68683a7dba",
                "name": "Antonia Veronica Alencar Lima",
                "cpf": "94434603434",
                "phone": "87991431875",
                "codServidor": 21219,
                "email": "veronicalimaa50@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "31bbf598-a42c-42d4-a0c8-1fb497a26d2d",
                "name": "Francisca Maria Silva Nascimento",
                "cpf": "07182846403",
                "phone": "87981151898",
                "codServidor": 62943,
                "email": "extragesso2019@gmail.coM",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "31d58aa3-d6b2-4180-a3d3-a3ccbec0859d",
                "name": "Marilia Uiara Moura de Lucena Soares",
                "cpf": "10128640499",
                "phone": "87996169398",
                "codServidor": 17365,
                "email": "mariliauiaramoura@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "32023362-2b55-45c9-bc22-48e4bbb66aca",
                "name": "Enivalda Chaves de Oliveira",
                "cpf": "83097031472",
                "phone": "87991507266",
                "codServidor": 18572,
                "email": "enivaldachaves38@gmail.com",
                "position": "Professor(a)",



                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "321c35fc-fa3d-437c-8216-01e01b2e68db",
                "name": "Rafaela de Figueredo Almeida",
                "cpf": "11660500419",
                "phone": "87991551512",
                "codServidor": 57917,
                "email": "rafaelafigueredo429@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "326ac4a6-b774-43c1-8260-4aecfcdf462b",
                "name": "Lucejania Alencar e Souza",
                "cpf": "02557480436",
                "phone": "87996138780",
                "codServidor": 6455,
                "email": "janealencarr657@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "3298dcb8-af9c-4da9-99c7-75f3288acf3e",
                "name": "Miqueias Daniel da Silva Batista",
                "cpf": "08965066492",
                "phone": "87996337426",
                "codServidor": 16258,
                "email": "mikdaniel2011@hotmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "330d3e55-e686-48fa-a3bb-972d1fc51951",
                "name": "Ana Keila Penha dos Santos",
                "cpf": "03317097400",
                "phone": "87991017433",
                "codServidor": 19947,
                "email": "ksbioksbio@gmail.com",
                "position": "Professor(a)",



                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "33401979-6b9e-4230-8f26-034f4387db12",
                "name": "Patricia Kelly da Silva",
                "cpf": "04581234395",
                "phone": "89994135023",
                "codServidor": 5424,
                "email": "patriciakelly2020.pk@gmail.com",
                "position": "Mediador(a)",



                "institutionId": "1f0cb6c1-e074-4555-812b-378920649b71"
            },
            {
                "id": "33818fe7-8f88-4b80-abb6-ba620968f4fb",
                "name": "Lusinete Maria Alencar Moraes",
                "cpf": "92284752420",
                "phone": "87991647704",
                "codServidor": 8607,
                "email": "lusi.123.mam@gmail.com",
                "position": "Diretor(a)",
                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "33a5ce2b-f51d-4535-aeec-25c7a9a506cb",
                "name": "Rosinaide Lima Alves",
                "cpf": "12203928476",
                "phone": "87998118410",
                "codServidor": 10629,
                "email": "arielsondiniz99@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "33b75603-420b-44c9-adb0-e40832d4cb1f",
                "name": "Laislangela Delmondes Cordeiro",
                "cpf": "07388388451",
                "phone": "87981045565",
                "codServidor": 37651,
                "email": "laislangelacordeiro@gmail.com",
                "position": "Orientador Pedagógico",
                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "33c3e468-9688-4d8c-aff5-9713628a315f",
                "name": "Wennyo Érico Bezerra de Sousa",
                "cpf": "07441941482",
                "phone": "87991071594",
                "codServidor": 57084,
                "email": "wen_nysousa@hotmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "33ce4e64-b77a-47e7-8ae1-0dde96ae62bb",
                "name": "Meire da Silva de Oliveira Rodrigues",
                "cpf": "05293866400",
                "phone": "87991635715",
                "codServidor": 18082,
                "email": "meiresilvapnaic@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "35516ab5-4a41-4694-adc6-1033b32bbcdf",
                "name": "Edjane de Abreu Lima Guimaraes",
                "cpf": "05755566410",
                "phone": "87991382142",
                "codServidor": 25727,
                "email": "edjanelima1479@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "3595f237-df7b-4913-8259-500bc12c1596",
                "name": "Elvidio Gonçalves da Silva",
                "cpf": "02942633492",
                "phone": "87991087408",
                "codServidor": 45792,
                "email": "elvidiosilva032018@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "35bd0d16-bc7a-48a9-9f0d-8a69002b8a7d",
                "name": "Antonia Isabel da Silva Pereira",
                "cpf": "76473910468",
                "phone": "87991513657",
                "codServidor": 30905,
                "email": "Isabelantonia050@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "35d21c4c-6b69-48d9-b22d-8c2f28de7ac3",
                "name": "Enercia Oliveira Almeida",
                "cpf": "01003071406",
                "phone": "87991334250",
                "codServidor": 6809,
                "email": "mecinha-oliveira2012@hotmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "3682e8e0-1fc2-4782-9d09-fa81684f7c6f",
                "name": "Girlene Nonato Pereira Lopes",
                "cpf": "90908490330",
                "phone": "89994478748",
                "codServidor": 24840,
                "email": "girlene.nonato@prof.edu.araripina.pe.gov.br",
                "position": "Diretor(a)",
                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "36a29536-ab3c-4fd8-b171-c4073cce803b",
                "name": "Valcimeire Cordeiro Nunes",
                "cpf": "04153307424",
                "phone": "87981183394",
                "codServidor": 56033,
                "email": "meire2wm@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "36f9520b-a77b-4e6a-89cd-c1eab34f3a4d",
                "name": "Eliana Modesto da Silva",
                "cpf": "04799832409",
                "phone": "87992539806",
                "codServidor": 60812,
                "email": "elianamodesto2017@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "37080385-11c2-46ab-b2cc-fb2b6ba5a8bd",
                "name": "Maria Felicidade Rodrigues",
                "cpf": "04581236339",
                "phone": "89994298460",
                "codServidor": 2582,
                "email": "mariafelicidade13@hotmail.com",
                "position": "Professor(a)",



                "institutionId": "1f0cb6c1-e074-4555-812b-378920649b71"
            },
            {
                "id": "37aace42-23de-4c3c-a0b9-632d0e0b28a7",
                "name": "Maria Edevanha da Silva",
                "cpf": "02957284340",
                "phone": "8994587104",
                "codServidor": 39183,
                "email": "vandinha.x8@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "38aac2f0-4975-4c8b-b6da-489490794c2f",
                "name": "Josecleide Galvao Rodrigues",
                "cpf": "04824496403",
                "phone": "87981791659",
                "codServidor": 24911,
                "email": "cleiderodrigues4046@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "38b19dfd-2684-4535-8c3c-c803ea1fd938",
                "name": "Joceli Rufino da Silva",
                "cpf": "07182845423",
                "phone": "87991733801",
                "codServidor": 30111,
                "email": "jo_araripina@hotmail.com",
                "position": "Coordenador(a)",
                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "397a0406-b7b5-4f07-bb96-0e1251d987d3",
                "name": "Lusineide da Conceicao Santos",
                "cpf": "94434913468",
                "phone": "87991303023",
                "codServidor": 7292,
                "email": "santoslusineide94@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "39b3dbb5-b9f8-4fb2-b09b-2b211e7a5817",
                "name": "Márcia de Jesus Silva Oliveira",
                "cpf": "04650677432",
                "phone": "87991260685",
                "codServidor": 32705,
                "email": "marcia-emanuelly@hotmail.com",
                "position": "Diretor(a)",
                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "39bd1127-88e3-4cfc-a605-54e87d2cf5b5",
                "name": "José Arribamar de Miranda",
                "cpf": "10534517412",
                "phone": "87999348840",
                "codServidor": 5261,
                "email": "arribamar2016@hotmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "39dad82d-0fe0-458d-9fc8-14999eca5039",
                "name": "Ivone dos Santos Silva",
                "cpf": "11839230401",
                "phone": "87998027480",
                "codServidor": 3822,
                "email": "Is9819ivone@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "3a77ff5a-c577-4136-89df-81e1f0a2cc30",
                "name": "Francisco Jackson Nunes dos Santos",
                "cpf": "59977264449",
                "phone": "8799078638",
                "codServidor": 16715,
                "email": "Theo2020.ipubi@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "3ac713b6-77e9-4da8-a4d7-38c77ae12784",
                "name": "Julia Thais Santos Pereira",
                "cpf": "70936210400",
                "phone": "87999919866",
                "codServidor": 11633,
                "email": "juliathaissantospereira@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "3acc4c29-c078-42e7-8c50-fdfbeac0f2b6",
                "name": "Maria Aparecida Rodrigues de Sousa",
                "cpf": "07384239397",
                "phone": "89994141054",
                "codServidor": 5384,
                "email": "souscidinha12@gmail.com",
                "position": "Facilitador(a)",
                "institutionId": "1f0cb6c1-e074-4555-812b-378920649b71"
            },
            {
                "id": "3b0cb57a-0c2a-4c4b-aebb-fd06cd1fb60d",
                "name": "Adelma Moura de Lucena Sarmento",
                "cpf": "38612844487",
                "phone": "87996353749",
                "codServidor": 16231,
                "email": "adelmamoura@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "3b1fc0a6-9d83-4949-9950-dc0bb6338633",
                "name": "Maria da Conceicao de Aquino Alencar",
                "cpf": "06162613496",
                "phone": "87991707845",
                "codServidor": 4073,
                "email": "aquinomariaalencar@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "3b47a3a2-4f7b-490c-a937-8995e0670656",
                "name": "Leonardo do Nascimento Moura",
                "cpf": "08237332466",
                "phone": "87991683590",
                "codServidor": 18037,
                "email": "leonardo.nmoura10@gmail.com",
                "position": "Professor(a)",
                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "3b8e19dd-5354-4424-a8ae-ac36047a4927",
                "name": "Francineide da Conceicao Silva",
                "cpf": "07478094457",
                "phone": "87991248775",
                "codServidor": 62830,
                "email": "francineideconceicaosilva12@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "3bf283d7-ed1c-477e-927f-28e09a48ec50",
                "name": "Ronniemaria Ferreira Paixao",
                "cpf": "76476324420",
                "phone": "87981282904",
                "codServidor": 11315,
                "email": "ronniemariaferreirapaixao@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "3c3fcf90-cc5c-40ff-861f-f7cad4473dda",
                "name": "Joana Darc Sousa Oliveira",
                "cpf": "13768282430",
                "phone": "87991468303",
                "codServidor": 51836,
                "email": "joanadarc2024@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "3d26140c-e95c-43b0-8855-ab591cbacad0",
                "name": "Auriélia Coelho Isaque Floriano",
                "cpf": "06898420402",
                "phone": "87991696127",
                "codServidor": 40756,
                "email": "aurieliaisaque@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "3d4e379b-88c1-4f34-9988-3fd1cf9b58da",
                "name": "Meriane Marinho Coelho Modesto",
                "cpf": "02792426462",
                "phone": "87981051656",
                "codServidor": 17395,
                "email": "merianemcoelho@hotmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "3d7b067a-28b3-4606-87e1-5e433ad77450",
                "name": "Marclene da Silva Queiroz",
                "cpf": "04106207427",
                "phone": "87991266292",
                "codServidor": 202,
                "email": "silvamarclene36@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "3dcc246c-a378-4d70-8118-c3a98c2d4a24",
                "name": "Francisca Marisalva Lopes de Souza",
                "cpf": "68940700406",
                "phone": "87991424953",
                "codServidor": 26266,
                "email": "marisalva.lopes@prof.edu.araripina.pe.gov.br",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "3e4fd4f8-5c0e-4b93-87db-4bad21349f06",
                "name": "Harlisson de Carvalho Bezerra",
                "cpf": "01123307385",
                "phone": "87999589988",
                "codServidor": 19611,
                "email": "mikaelemra@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "3f16ade7-5681-49be-9ec2-3b5f5e25f6a5",
                "name": "Maria Ivone da Silva",
                "cpf": "09141165411",
                "phone": "87991788586",
                "codServidor": 48651,
                "email": "ivone9661@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "3f2ede4a-72ef-4f7e-953d-ead3932053af",
                "name": "Iolanda Martins Ferraz",
                "cpf": "02672617481",
                "phone": "87991441280",
                "codServidor": 7311,
                "email": "iolandamartins1223@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "3f7b2252-287f-40e8-b1b6-d9a789368d33",
                "name": "Elaise Delmondes Albuquerque Cordeiro",
                "cpf": "07390791403",
                "phone": "87981679277",
                "codServidor": 22694,
                "email": "laislaisadelmondeslais@hotmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "3f9297a2-b098-4e6a-b3fc-18c433d8ecba",
                "name": "Mary Anne de Lima Bezerra",
                "cpf": "02688797450",
                "phone": "87991056770",
                "codServidor": 32445,
                "email": "maryanneararipina@hotmail.com",
                "position": "Coordenador(a)",
                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "4019aef3-bd42-4660-b127-5169d6105032",
                "name": "Gessica Jayne Alves Diniz",
                "cpf": "10186237448",
                "phone": "87998033392",
                "codServidor": 5135,
                "email": "jaynegessica9@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "4050dedd-63cf-479e-adab-d9ab060fe8b7",
                "name": "Regilandia Josefa de Carvalho Lima",
                "cpf": "00346466393",
                "phone": "87991340485",
                "codServidor": 24499,
                "email": "regilandia.lima@hotmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "406dede6-db74-472a-8fc1-19123a5e5ae0",
                "name": "Gabriela Coelho Batista",
                "cpf": "06448856374",
                "phone": "89994442021",
                "codServidor": 3396,
                "email": "gabi.coelho2002@outlook.coM",
                "position": "Professor(a)",



                "institutionId": "1f0cb6c1-e074-4555-812b-378920649b71"
            },
            {
                "id": "410ebc9c-c16f-470d-b532-b3e9d50be573",
                "name": "Luciana Feliciana da Silva",
                "cpf": "05260517440",
                "phone": "87981513217",
                "codServidor": 6752,
                "email": "lucianafeliciano410@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "410f0cc4-8870-405b-a938-84287fb5714a",
                "name": "Zilda Miranda da Silva",
                "cpf": "02775088198",
                "phone": "87981736591",
                "codServidor": 26869,
                "email": "zildamiranda96@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "415a3245-b961-4700-b3bc-75514b0b527e",
                "name": "Luciana Batista Oliveira",
                "cpf": "02386339424",
                "phone": "87991114250",
                "codServidor": 21477,
                "email": "lo976018@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "41e6ba5f-ebfa-4369-b309-9ba0beb86f3a",
                "name": "Jessyca Nayanne Andrade Francelino",
                "cpf": "10169980405",
                "phone": "8791808462",
                "codServidor": 46950,
                "email": "jessycanay@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "41f5375a-3909-4843-be0f-bea9634150d7",
                "name": "Pedro Petronio da Silva Sousa",
                "cpf": "07290077407",
                "phone": "87991625135",
                "codServidor": 37018,
                "email": "pedroaguiabrasil@gmail.com",
                "position": "Aux. Administrativo",
                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "42b4e67e-67f1-4bdc-90e8-c61ced541592",
                "name": "Maria Alice Rodrigues",
                "cpf": "00449227367",
                "phone": "89994301829",
                "codServidor": 844,
                "email": "maryalicerodrigues2020@gmail.com",
                "position": "Professor(a)",

                "institutionId": "1f0cb6c1-e074-4555-812b-378920649b71"
            },
            {
                "id": "42cde161-1080-4070-a402-3d413cee8ec1",
                "name": "Regivania Lima Silva Jaques",
                "cpf": "10447867440",
                "phone": "87991393621",
                "codServidor": 53207,
                "email": "regivaniajaques@gmail.com",
                "position": "PROFESSOR(A)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "42edad12-52d7-4be3-8730-8eb6700ff622",
                "name": "Renata Gomes Goncalves",
                "cpf": "07319267497",
                "phone": "87991385665",
                "codServidor": 2074,
                "email": "renathagg51@gmail.com",
                "position": "Secretario(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "42f3ae6f-849e-4986-bd2e-cdcebbe3d695",
                "name": "Maria do Socorro Araujo de Carvalho",
                "cpf": "00642066370",
                "phone": "8999063631",
                "codServidor": 23240,
                "email": "sa4232067@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "430ef743-7da1-4477-a386-4d85b77e321b",
                "name": "Maria Juraneide Rodrigues Aragao",
                "cpf": "03418124470",
                "phone": "87981396948",
                "codServidor": 25182,
                "email": "juraneiderodriguesaragao@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "4318dc67-97cb-4fcd-b951-fb517d5dc3a6",
                "name": "Maria Márcia Pedroza e Silva",
                "cpf": "05915852432",
                "phone": "87991098439",
                "codServidor": 38548,
                "email": "marcipedroza@hotmail.com",
                "position": "Coordenador(a)",
                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "43444d76-e5e7-4c49-b582-eb05cc7c666a",
                "name": "Maria Das Gracas Andrade Batista",
                "cpf": "74709178453",
                "phone": "87991149716",
                "codServidor": 6499,
                "email": "graandradee17@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "436e938e-ca10-4cc6-8ae2-3d10def12fb1",
                "name": "Bruna Karine Arruda da Silva",
                "cpf": "04513262451",
                "phone": "87991827942",
                "codServidor": 34155,
                "email": "bkarruda@hotmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "4394dd8b-7b01-4703-adf7-9e78ae34c641",
                "name": "Alexcilda Rodrigues Barbosa Pereira",
                "cpf": "06516565406",
                "phone": "87991703894",
                "codServidor": 61698,
                "email": "rodriguesalexcilda@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "43a21e44-160c-46d0-b135-dc86e261dbf0",
                "name": "Joseany Fulgencio de Lima Arruda Gomes",
                "cpf": "04999808404",
                "phone": "87992100527",
                "codServidor": 20938,
                "email": "joseanyfulgencio@hotmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "43b89bfd-9711-49a4-afb6-20103c42e71a",
                "name": "Maria de Lourdes de Souza",
                "cpf": "05124437421",
                "phone": "87991343408",
                "codServidor": 53551,
                "email": "lourdessousa266@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "43c83d46-4d74-4641-b3a6-0b8aa8307fbf",
                "name": "Inara Carollyne de Lima Cunha",
                "cpf": "07635896407",
                "phone": "87991196198",
                "codServidor": 62027,
                "email": "inaraiorrana2018@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "43f14aaf-0466-4641-8b79-afd6d0ed4be8",
                "name": "Maria de Lourdes Cosmo Pereira",
                "cpf": "03484093463",
                "phone": "87981614959",
                "codServidor": 25014,
                "email": "mariadelurdescosmo141@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "4426e78a-e6ce-4b5e-9b47-c12f949f0d86",
                "name": "Mairle Pereira Gomes",
                "cpf": "15572450456",
                "phone": "87981535409",
                "codServidor": 6355,
                "email": "mairle.gomes2020@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "44c4c9ae-aa79-4bff-9baa-d85c91ead2de",
                "name": "Antonia Alves de Oliveira Souza",
                "cpf": "44105150472",
                "phone": "87999885964",
                "codServidor": 3403,
                "email": "toinhaalves1703@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "44f388cf-4d0a-4086-9251-de87af07a144",
                "name": "Laurindo Pereira Alencar",
                "cpf": "68203357415",
                "phone": "87981450604",
                "codServidor": 61289,
                "email": "shadon1663@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "451b189d-185c-404a-9275-1be309064073",
                "name": "Simone Coelho de Sousa",
                "cpf": "61249565359",
                "phone": "89994287471",
                "codServidor": 5215,
                "email": "simonecoelho08@outlook.com",
                "position": "Professor(a)",



                "institutionId": "1f0cb6c1-e074-4555-812b-378920649b71"
            },
            {
                "id": "452497da-9af4-497d-802e-3955fb038b35",
                "name": "Audeni Coelho Nobre",
                "cpf": "99822288468",
                "phone": "87981523887",
                "codServidor": 50176,
                "email": "audeni.nobre@hotmail.com",
                "position": "Professor(a)",
                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "45388ba6-125a-4552-9205-4acf786332ac",
                "name": "Jussicle Felix dos Santos",
                "cpf": "03238324403",
                "phone": "87991940165",
                "codServidor": 26452,
                "email": "jussiclefelix@gmail.com",
                "position": "Professor(a)",
                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "456e392f-b2e1-4d2f-b7be-375bfc24bcfb",
                "name": "Ana Kaisa Freitas Alencar",
                "cpf": "11214327435",
                "phone": "87981195108",
                "codServidor": 12183,
                "email": "kaisaana4@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "4587b52b-ffb6-4598-a126-23987a2a2736",
                "name": "Fernanda Maria de Carvalho",
                "cpf": "00964607336",
                "phone": "89999196929",
                "codServidor": 23220,
                "email": "fernandamary1980@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "45e0c3ca-3747-4b15-ae02-6e96cad4916a",
                "name": "Iza Vitoria Silva Oliveira",
                "cpf": "13382816407",
                "phone": "87991568452",
                "codServidor": 58727,
                "email": "izavitoriasilvaoliveira@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "462684c9-81b8-444d-9685-df6d5e8a786e",
                "name": "Francisca Betania Santos Alencar",
                "cpf": "05806700402",
                "phone": "87992129022",
                "codServidor": 5131,
                "email": "alencarbetania83@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "46fd8627-126f-40bb-b2b0-92e778f41416",
                "name": "Maria Aparecida Gomes de Oliveira",
                "cpf": "99359103420",
                "phone": "87998260011",
                "codServidor": 16738,
                "email": "aparecidaipubi@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "47acc922-7e4f-46d2-94ce-9f88765b6379",
                "name": "Andria Celia Soares de Mota Sousa",
                "cpf": "05837620427",
                "phone": "87991122954",
                "codServidor": 30837,
                "email": "andriaceliasoares@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "47e17e1e-056e-417b-b80d-26f95efc6cf9",
                "name": "Gizélia de Sousa Silva",
                "cpf": "05303145336",
                "phone": "89994112933",
                "codServidor": 5497,
                "email": "gizeliasilva466@gmail.com",
                "position": "Professor(a)",



                "institutionId": "1f0cb6c1-e074-4555-812b-378920649b71"
            },
            {
                "id": "47ea6cae-511d-4018-8b84-83f5404c7468",
                "name": "Josilene de sa Sousa Macedo",
                "cpf": "05097803426",
                "phone": "87981002216",
                "codServidor": 17151,
                "email": "sousaepifanio2024@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "484f8c10-5e64-4916-a289-246fb29af5b7",
                "name": "Mayara Victória da Silva Souza",
                "cpf": "12979849430",
                "phone": "87991168816",
                "codServidor": 60457,
                "email": "mayaravictoria44@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "485490b5-496d-41eb-8b72-c68863c2c262",
                "name": "Damiana Renata de Souza Cruz",
                "cpf": "13011497486",
                "phone": "87999701336",
                "codServidor": 12658,
                "email": "damyanarenatta@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "48b2a9b6-243e-47eb-889a-e384a11c2bcc",
                "name": "Edilson Elisio Rodrigues",
                "cpf": "52739775334",
                "phone": "89994440396",
                "codServidor": 724,
                "email": "edilsonelisio@yahoo.com.br",
                "position": "Professor(a)",



                "institutionId": "1f0cb6c1-e074-4555-812b-378920649b71"
            },
            {
                "id": "493c5bce-6742-4958-92e8-671cd84a71fb",
                "name": "Cicera Niuvanda Alencar",
                "cpf": "03406506488",
                "phone": "87996674584",
                "codServidor": 4353,
                "email": "cniuvanda@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "493ee8e5-994e-46ab-a307-13e73c40dcb1",
                "name": "Elenilce Delmondes de Macedo",
                "cpf": "99829207404",
                "phone": "87981314614",
                "codServidor": 2848,
                "email": "eledelmondes@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "4a0c013a-c632-488a-870a-e3c1feddcac3",
                "name": "Maria Gerlandia Andrade Carvalho",
                "cpf": "07357224473",
                "phone": "8799064266",
                "codServidor": 41908,
                "email": "mandradecarvalho55@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "4a28e43e-5669-4bd5-a675-0fe62db87d8a",
                "name": "Maria Iva da Conceicao de Sousa",
                "cpf": "02194741410",
                "phone": "87991675657",
                "codServidor": 989,
                "email": "ivasousa133@gmail.com",
                "position": "PROFESSOR(A)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "4a5c089d-3793-44c5-a8af-b877aab61e41",
                "name": "Antonia Heliuda Alencar Silva de Carvalho",
                "cpf": "05268866419",
                "phone": "87991129802",
                "codServidor": 18988,
                "email": "heliudaalencarcarvalho@gmail.com",
                "position": "Professor(a)",



                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "4a755cd0-a8a8-426b-9e2b-671861198033",
                "name": "Edivandia Brasil Alves da Silva",
                "cpf": "04471928414",
                "phone": "87991596470",
                "codServidor": 22469,
                "email": "edvandia2023brasil@outlook.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "4ad23909-47ab-4df0-99a0-377c037978a2",
                "name": "Erica dos Santos Cavalcante",
                "cpf": "10888863454",
                "phone": "87981247470",
                "codServidor": 831,
                "email": "ericacavalcante1998@gmail.com",
                "position": "Tradutor e Intérprete de Libras",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "4afd58c9-6a67-4bde-b6ba-4b6fe809cac7",
                "name": "Adinacia Uyara Moura de Lucena",
                "cpf": "01017076499",
                "phone": "87999240560",
                "codServidor": 17297,
                "email": "adinaciauiara@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "4b3621fc-31f1-4889-ab71-071832f2e3db",
                "name": "Inácia de Cássia Lima Chalegre",
                "cpf": "03887557417",
                "phone": "8798473607",
                "codServidor": 10694,
                "email": "iclchalegre@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "4b549cf0-7e3d-47fb-a940-30a28131d7b9",
                "name": "Maria Gorete Oliveira Costa",
                "cpf": "03322137490",
                "phone": "87991119241",
                "codServidor": 31485,
                "email": "goreteoliveiracosta7@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "4bea217c-6298-441a-a160-df4088e8fab5",
                "name": "Cicera Elena de Souza Siqueira",
                "cpf": "02911504461",
                "phone": "87999261713",
                "codServidor": 14619,
                "email": "cicera@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "4c0293ce-2454-4049-99e1-f88193654e7b",
                "name": "Edilma de Lima Batista",
                "cpf": "00911958452",
                "phone": "87991870553",
                "codServidor": 31622,
                "email": "edilmabatista@windowslive.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "4d2320f4-4cb1-4348-a2c8-9f1d1d08c881",
                "name": "Barbara Fernanda Garcia Pereira",
                "cpf": "12127703405",
                "phone": "87981456140",
                "codServidor": 8176,
                "email": "barbarafernanda263@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "4db12a40-8161-4935-84ea-92be88979b1c",
                "name": "José Edvaldo de Sousa",
                "cpf": "93899378504",
                "phone": "89994026653",
                "codServidor": 927,
                "email": "zedivaldo@yahoo.com.br",
                "position": "Professor(a)",



                "institutionId": "1f0cb6c1-e074-4555-812b-378920649b71"
            },
            {
                "id": "4dbe8ba1-fd8f-4732-98d6-869900ab48eb",
                "name": "Maria Ivonete de Jesus Brito",
                "cpf": "92352162300",
                "phone": "89999944339",
                "codServidor": 36832,
                "email": "mariaivonete.brito@prof.edu.araripina.pe.gov.br",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "4ec97464-2136-4ca6-bf9e-b538f2d58fc5",
                "name": "Francisca Eliane Pereira Melo",
                "cpf": "92244211487",
                "phone": "87992436602",
                "codServidor": 3516,
                "email": "elianepm61@hotmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "4ed944a9-e59c-406e-b4f0-cecf565ff512",
                "name": "Maria do Socorro Gomes Alencar",
                "cpf": "86576550472",
                "phone": "87981595329",
                "codServidor": 50378,
                "email": "mariadosocorrog453@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "4edb0bbb-c0d2-4479-a5d1-14ca6a8deb40",
                "name": "Girlandia da Conceição de Sousa Ferreira",
                "cpf": "02113075482",
                "phone": "87981309749",
                "codServidor": 50108,
                "email": "girlandia.dcferreira@adm.educacao.pe.gov.br",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "4ee0ce05-99e6-4106-b6ec-aa0d0f4f0b66",
                "name": "Manoel de Sousa Rodrigues",
                "cpf": "67677355315",
                "phone": "89994009553",
                "codServidor": 1429,
                "email": "sousamanoel898@gmail.com",
                "position": "Professor(a)",



                "institutionId": "1f0cb6c1-e074-4555-812b-378920649b71"
            },
            {
                "id": "4f2e618d-7f1f-467c-90fb-39e2aa0aa56d",
                "name": "Aline de Sousa Silva",
                "cpf": "12523065479",
                "phone": "87996263767",
                "codServidor": 13707,
                "email": "linedan0116@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "4f6fcbeb-993d-4d93-957c-560e19eb32d8",
                "name": "Paula Elionária Monteiro Batista Costa",
                "cpf": "05104682412",
                "phone": "87991141598",
                "codServidor": 34636,
                "email": "paulaelionaria@hotmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "5016c49b-6dbb-47be-95f2-06994a7275da",
                "name": "Caio Danilo de Lima Gomes ",
                "cpf": "08837567499",
                "phone": "87992129029",
                "codServidor": 50164,
                "email": "caio_danilo@hotmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "504867f4-a778-4d30-a6aa-4d64544e5897",
                "name": "Marile da Silva Mendes Gomes",
                "cpf": "30803462387",
                "phone": "87991802860",
                "codServidor": 5828,
                "email": "marile46@hotmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "505fae17-ba75-434a-99ee-5fc30282998d",
                "name": "Karla Regina da Silva Cordeiro",
                "cpf": "09143562400",
                "phone": "87992047793",
                "codServidor": 53803,
                "email": "reginakarla059@gmail.com",
                "position": "Professor(a)",
                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "50c53808-c194-438b-981b-a672a088fc71",
                "name": "Marineide de Lima Souza",
                "cpf": "61807397491",
                "phone": "87991648193",
                "codServidor": 32320,
                "email": "limamarineide949@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "516edba4-7b66-4362-8485-9dbb8d63f024",
                "name": "Sueli Antonia Vieira",
                "cpf": "04170551451",
                "phone": "87981072440",
                "codServidor": 9701,
                "email": "SUELIVIEIRA2012@HOTMAIL.COM",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "517a8def-49d5-4b01-aa7a-02ccb6ca5ecb",
                "name": "Luan Matheus do Vale Batista Alencar",
                "cpf": "09397755498",
                "phone": "87991003074",
                "codServidor": 51904,
                "email": "lwaanmatheus_1@hotmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "5187f067-3c8b-4a52-b451-392112c7875f",
                "name": "Cicero Floriano de Santana",
                "cpf": "03100879457",
                "phone": "87991235079",
                "codServidor": 19054,
                "email": "ciceroprof21@gmail.com",
                "position": "Professor(a)",



                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "524c6587-6af0-4ac9-b00c-606bbc04ff30",
                "name": "Jakeliny Maria de Castro Figueiredo Fabricio",
                "cpf": "02774654432",
                "phone": "87996449799",
                "codServidor": 19326,
                "email": "Figueiredojakeliny@yahoo.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "52b88229-7697-4d74-aea6-f2e7a1c67233",
                "name": "Joseci Francelina de Sousa",
                "cpf": "86767968315",
                "phone": "89994127828",
                "codServidor": 1610,
                "email": "josecifrancelina.20@gmail.com",
                "position": "Professor(a)",



                "institutionId": "1f0cb6c1-e074-4555-812b-378920649b71"
            },
            {
                "id": "52f84789-5e32-4650-ba66-b3321cfc0af9",
                "name": "Francisco Marlon Melquiades da Cruz",
                "cpf": "05824258325",
                "phone": "87991070192",
                "codServidor": 50100,
                "email": "marlondocen@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "5331afbc-edd6-4a3a-9fcd-e75490d7d207",
                "name": "Francileide Rodrigues de Macedo #1",
                "cpf": "07221152373",
                "phone": "89994570683",
                "codServidor": 4687,
                "email": "francileidemacedo123@outlook.com",
                "position": "Professor(a)",



                "institutionId": "1f0cb6c1-e074-4555-812b-378920649b71"
            },
            {
                "id": "5351734e-7a13-43db-b65b-896a9a5827bc",
                "name": "Joseane Raimunda de Sousa",
                "cpf": "06298103465",
                "phone": "87992116297",
                "codServidor": 29735,
                "email": "joseane3sousa@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "53bc5acd-f904-4c1d-88e3-132c2e99a81d",
                "name": "Luzivania de Carvalho Cruz",
                "cpf": "04202962478",
                "phone": "87981778689",
                "codServidor": 2669,
                "email": "luzimel-2019@hotmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "554bb36d-486d-4096-950d-0b9d76172e11",
                "name": "Richelly Santana Cruz",
                "cpf": "94039437349",
                "phone": "8791565113",
                "codServidor": 7596,
                "email": "richellynhasantana@hotmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "561657f5-3bed-40ec-bc7e-ce87b8fb69ac",
                "name": "Veralucia Pereira de Melo Pedroza",
                "cpf": "05796564463",
                "phone": "87992043403",
                "codServidor": 33703,
                "email": "veraluciamello13@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "562248d0-3864-487a-b6ec-a0765339fcce",
                "name": "Ana Regia Lopes da Silva",
                "cpf": "03682792430",
                "phone": "87981022335",
                "codServidor": 17249,
                "email": "ana.regia_@hotmail.com",
                "position": "Professor (a) em Readaptação",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "56240069-5917-4fef-b3e2-b55f42f40ffa",
                "name": "Fabiana de Alencar Pereira",
                "cpf": "85340200353",
                "phone": "87991699956",
                "codServidor": 51828,
                "email": "fabilopes222@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "56b33714-2b6f-4265-ba76-958854de70f4",
                "name": "Maria Elizete Lopes da Silva",
                "cpf": "03494094470",
                "phone": "87981486067",
                "codServidor": 17181,
                "email": "mariaelisete773@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "571d81c7-4cad-4217-8106-2454a15c5f5d",
                "name": "Fábio Regis Lopes Feitosa",
                "cpf": "03543235478",
                "phone": "87999399582",
                "codServidor": 36953,
                "email": "ffabiolopes2008@hotmail.com",
                "position": "Professor(a)",
                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "57cc7807-61f0-4e1b-98fa-711cbdc1896d",
                "name": "Cleusa Leocadia Xavier da Silva",
                "cpf": "67922988320",
                "phone": "89994504903",
                "codServidor": 2885,
                "email": "cleusaleocadia1@gmail.com",
                "position": "Professor(a)",



                "institutionId": "1f0cb6c1-e074-4555-812b-378920649b71"
            },
            {
                "id": "57f42587-a0cf-4a67-8a13-4106681f971f",
                "name": "Paula Naira Coelho Cordeiro",
                "cpf": "06327619460",
                "phone": "87981171516",
                "codServidor": 54083,
                "email": "paulanaira2018@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "581dd0ae-a0e7-4cba-9b24-2e8ca45d3380",
                "name": "Elzani Soares Nobre",
                "cpf": "05895046495",
                "phone": "87981615513",
                "codServidor": 55983,
                "email": "elzanisoares@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "58b7b994-3c5d-4700-b50b-d703a6ac5181",
                "name": "Maria Isoneide Lopes dos Santos",
                "cpf": "07413529408",
                "phone": "89994244147",
                "codServidor": 23724,
                "email": "isoneide-lopes27@hotmail.com",
                "position": "Zelador(a)",
                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "59349a3e-9fe9-4bb7-846b-c5b153de6023",
                "name": "Veronica do Socorro Batista de Souza Alencar",
                "cpf": "49687468491",
                "phone": "87991154680",
                "codServidor": 20981,
                "email": "veronica.do.socorro@hotmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "59419983-516d-4744-84e7-8906798bc84a",
                "name": "Walkiria Cristilaine Alencar",
                "cpf": "05903437427",
                "phone": "87991038489",
                "codServidor": 34219,
                "email": "walkiria.wca@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "59cee4d9-aa7d-46ec-9e00-bae47c557d04",
                "name": "Francisco Marcondes Silva e Sousa",
                "cpf": "76354962472",
                "phone": "87992536582",
                "codServidor": 32753,
                "email": "marcondessousa2012@hotmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "5a75f570-4db8-4859-9082-0c43134163a3",
                "name": "Wládia Aparecida de Menezes Morais",
                "cpf": "04807345427",
                "phone": "87991760235",
                "codServidor": 44293,
                "email": "wladia.moraes@hotmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "5a7fca59-c0a9-4526-bb42-7f39fecb50e2",
                "name": "Francisca Cleidimar Cunha de Melo",
                "cpf": "99884011400",
                "phone": "87991398236",
                "codServidor": 3923,
                "email": "cunhacleidimar@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "5b687271-899b-4bf6-822f-f03a7806a9f9",
                "name": "Joelma Ferreira Delmondes",
                "cpf": "05776999464",
                "phone": "87981443504",
                "codServidor": 22720,
                "email": "joelmadelmondes@hotmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "5be2b1c1-5ab1-48b7-8509-5270a0158004",
                "name": "Geovanna de Lira Silva",
                "cpf": "07304747471",
                "phone": "87991133004",
                "codServidor": 26565,
                "email": "geovannalira28@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "5c797f7b-655e-495e-bdc1-0f456b14ae75",
                "name": "Francisca de Souza Isidio",
                "cpf": "05484681413",
                "phone": "87991076644",
                "codServidor": 54033,
                "email": "nildaisidio21@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "5dd48420-6667-44d6-985e-0155a607c425",
                "name": "Maria Iris Cloris Delmondes",
                "cpf": "04234587443",
                "phone": "87998031998",
                "codServidor": 12848,
                "email": "adielcalebe@gamil.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "5dfc631a-4a07-435a-996e-e7a401f71416",
                "name": "Renata Moura Silva",
                "cpf": "11491203471",
                "phone": "87991531475",
                "codServidor": 57842,
                "email": "echylei_nathy@hotmail.com",
                "position": "Professor(a)",



                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "5e20aaef-b65e-4553-bce1-217111724167",
                "name": "Francisca Edcleide da Silva",
                "cpf": "05453450495",
                "phone": "87991524320",
                "codServidor": 12342,
                "email": "edcleidesilva100@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "5e24c1f5-7a43-45e7-b402-09d9fd7e8e5f",
                "name": "Eliomar Gomes Ferreira",
                "cpf": "03649185431",
                "phone": "8781173355",
                "codServidor": 17018,
                "email": "eliomar.ferreira2010@bol.com.br",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "5e270ab5-9d14-427a-8bdc-d146ce82606d",
                "name": "Carpegiane de Souza Lima",
                "cpf": "06847809418",
                "phone": "87981624901",
                "codServidor": 10854,
                "email": "souzacarpegiane792@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "5ed1216c-5028-4068-bbc2-2df738a754b4",
                "name": "Raissa Maria Nascimento Silva",
                "cpf": "11165547473",
                "phone": "87981617607",
                "codServidor": 24325,
                "email": "raissamaria95@hotmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "5ed64b7f-3f3c-47a2-9ef3-005cc4a1eefb",
                "name": "Dalvenisa Joana de Sousa",
                "cpf": "06944149303",
                "phone": "89994039402",
                "codServidor": 4029,
                "email": "dalvenisa.6991@yahoo.com",
                "position": "Professor(a)",



                "institutionId": "1f0cb6c1-e074-4555-812b-378920649b71"
            },
            {
                "id": "5efb0aee-c352-482d-856b-ff8ae5fc41e3",
                "name": "Francisca Lucia da Conceicao",
                "cpf": "54789168468",
                "phone": "87991441576",
                "codServidor": 26681,
                "email": "mulherpequena2010@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "5f39bf98-62d5-4a8e-bdde-9ffe81067394",
                "name": "Vaniele Alves Siqueira Araujo",
                "cpf": "08357395465",
                "phone": "87996273329",
                "codServidor": 25029,
                "email": "vanielesiqueira3@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "5f6341a7-8f0b-4e5d-91db-5e2b9eb02ca1",
                "name": "Aires da Silva Barboza",
                "cpf": "04160486410",
                "phone": "87991108978",
                "codServidor": 21444,
                "email": "aires.silva@araripina.pe.gov.br",
                "position": "Diretor(a)",
                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "5fc78a10-5ace-4fbb-9f6c-1069f955163a",
                "name": "Maria Rosilania de Morais",
                "cpf": "03951563435",
                "phone": "87981451379",
                "codServidor": 7726,
                "email": "mariarosilania40@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "5fe2222b-3124-4024-a1d8-fedb0fcbfcb8",
                "name": "Francisca Rafaela Pereira Torre",
                "cpf": "10146701445",
                "phone": "87996257168",
                "codServidor": 19315,
                "email": "frptsrafa@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "60555b1a-90ec-452a-807b-74092904d57d",
                "name": "Maria do Socorro Silva Moura",
                "cpf": "74745255420",
                "phone": "87991997091",
                "codServidor": 11861,
                "email": "md1077769@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "606ddec9-cf04-4abd-bb21-f8ef89a8cfd2",
                "name": "Laianne Barbosa de Luna",
                "cpf": "10703621408",
                "phone": "87991668353",
                "codServidor": 19324,
                "email": "laiannebarbosa24@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "6085a923-47c1-4a54-9efe-bf915f10a151",
                "name": "Genecilda Damacena Rodrigues Souza",
                "cpf": "05664602465",
                "phone": "87981022716",
                "codServidor": 16749,
                "email": "genecildadamacena@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "6090c2ac-4880-44d4-b9a9-155279d33e43",
                "name": "Nailan Batista Silva",
                "cpf": "09641591479",
                "phone": "87981210267",
                "codServidor": 28173,
                "email": "nailan2011@hotmail.com",
                "position": "Professor(a)",
                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "60a48e8a-6177-4d4f-b8a2-185581c866ad",
                "name": "Cassia Regina Batista Lopes Gomes",
                "cpf": "04056848432",
                "phone": "87992096947",
                "codServidor": 14003,
                "email": "cassiareginabatista2007@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "60c4ddc6-e326-4730-8bf0-7584942158bc",
                "name": "Creusimar de sa e Silva Dias",
                "cpf": "26381863846",
                "phone": "87981036635",
                "codServidor": 17920,
                "email": "creusa1913@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "6115f8e4-d0a1-4575-9c75-5158298402e0",
                "name": "Maria Mercia Teles Alencar",
                "cpf": "70851115420",
                "phone": "87992436236",
                "codServidor": 30928,
                "email": "mmerciateles@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "612597cd-21a9-4fb3-a9d7-e8e7850809fb",
                "name": "Aridiana Ferreira da Silva",
                "cpf": "05368644469",
                "phone": "87991876923",
                "codServidor": 26327,
                "email": "aridianadl@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "61702ac4-399e-4cb1-aab0-498f6ef4fefb",
                "name": "Kerley Francisco Gualter Batista Modesto",
                "cpf": "01857833414",
                "phone": "87991140992",
                "codServidor": 51816,
                "position": "Professor(a)",
                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "61baae6e-8543-408a-8f8e-78f5d13b9201",
                "name": "Regina Coelho da Silva",
                "cpf": "96148241315",
                "phone": "89994051551",
                "codServidor": 5201,
                "email": "reginacoelho26@hotmail.com",
                "position": "Professor(a)",

                "institutionId": "1f0cb6c1-e074-4555-812b-378920649b71"
            },
            {
                "id": "61d2bf48-a20b-4933-8f9b-c37e33c8657f",
                "name": "Erika Miguel dos Santos Rodrigues",
                "cpf": "05123753486",
                "phone": "87981400199",
                "codServidor": 8857,
                "email": "ERIKAMIGUEL849@GMAIL.COM",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "625edf69-43a9-4cf4-9b65-608a074ace5d",
                "name": "Fatima Marcia Moura da Silva",
                "cpf": "02548619460",
                "phone": "89994562169",
                "codServidor": 18261,
                "email": "marciaceru@hotmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "6277004f-6b74-4273-baad-8d60b9211397",
                "name": "Tácia Tainá de Sousa",
                "cpf": "05007301302",
                "phone": "89994688884",
                "codServidor": 5235,
                "email": "tacia79taina@gmail.com",
                "position": "Professor(a)",

                "institutionId": "1f0cb6c1-e074-4555-812b-378920649b71"
            },
            {
                "id": "6281b504-e14d-4432-aaa9-9e8f4cfb6cd3",
                "name": "Juliana Celia de Andrade Silva",
                "cpf": "03991715414",
                "phone": "87998202489",
                "codServidor": 12831,
                "email": "juliana.celia@hotmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "62a74fe0-6a5d-4616-b6b6-e7da58b99208",
                "name": "Marileusa Raimunda da Silva",
                "cpf": "36095982391",
                "phone": "87999390080",
                "codServidor": 26234,
                "email": "marileusaraimundasilva@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "62bdc014-35fb-43ad-9d1f-3b059934792b",
                "name": "Rozana Mendes da Silva",
                "cpf": "03020968330",
                "phone": "89994290138",
                "codServidor": 4947,
                "email": "mendesrosa2020@gmail.com",
                "position": "Professor(a)",



                "institutionId": "1f0cb6c1-e074-4555-812b-378920649b71"
            },
            {
                "id": "63026eb3-2665-49aa-a2fa-474ab4ca392c",
                "name": "Dartcleide Henrique Pereira",
                "cpf": "05048333403",
                "phone": "87991182015",
                "codServidor": 20320,
                "email": "dartcleide@hotmail.com",
                "position": "Professor(a)",



                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "630cf758-a21c-4e5c-9aff-f6cefea91031",
                "name": "Anita Régis Nobre",
                "cpf": "09741000480",
                "phone": "87981093984",
                "codServidor": 58379,
                "email": "anitaregis5522@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "6341350b-2982-4b59-8d4e-f766d357276a",
                "name": "Rita de Cassia dos Anjos Gomes",
                "cpf": "02889140407",
                "phone": "87991833119",
                "codServidor": 30549,
                "email": "cassinhagomes34@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "6478e6a1-c766-4080-a4a8-2e398ab053ea",
                "name": "Jeane Cristina de Sousa Martins",
                "cpf": "02139614402",
                "phone": "87991367219",
                "codServidor": 61445,
                "email": "scjeane77@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "6553d006-bfd0-4f52-9c2c-8481f9f03e6b",
                "name": "Joao Felipe Souza Silva",
                "cpf": "12308361441",
                "phone": "8799346422",
                "codServidor": 15836,
                "email": "jotafss0815@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "6562107d-ae4d-4a71-a52f-65b17ec38d01",
                "name": "Jekson Carlos Jaco",
                "cpf": "06627418460",
                "phone": "87981292818",
                "codServidor": 40289,
                "email": "jeksonjaco@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "6599bfbd-f247-4907-bcab-7129079698f0",
                "name": "Flavio Regis Lopes Feitosa",
                "cpf": "03295824452",
                "phone": "87991252520",
                "codServidor": 6824,
                "email": "flavinho_rlopes@hotmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "65f5eccc-8377-442b-9843-78f8109ebd4b",
                "name": "Ana Cristina Pereira Silva",
                "cpf": "02513355423",
                "phone": "87996356105",
                "codServidor": 15586,
                "email": "anacristina.silva@prof.edu.araripina.pe.gov.br",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "6616fa53-8268-43c3-b653-44f1b3417126",
                "name": "Roselia de sa Lima",
                "cpf": "03396102479",
                "phone": "87981552846",
                "codServidor": 16956,
                "email": "limaroselia2@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "66dddaf2-18a3-433d-993b-4310733253a8",
                "name": "Francisca Leide Holanda Souza",
                "cpf": "07326232431",
                "phone": "87991867839",
                "codServidor": 1183,
                "email": "franciscaleideholanda@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "66f52ee6-854e-453d-b9ae-314d457873e7",
                "name": "Salvaneide Maria Reis Santos",
                "cpf": "91285330382",
                "phone": "89994054131",
                "codServidor": 36611,
                "email": "salvaneide.santos@prof.edu.araripina.pe.gov.br",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "66fe80f9-e504-4dfc-9d6e-76c8c5a62f1f",
                "name": "Soraia Kaline Delmondes",
                "cpf": "05788652464",
                "phone": "87981476414",
                "codServidor": 8610,
                "email": "soraiakaline20@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "67171f0a-143e-4c29-862e-6562571a1131",
                "name": "Bethearan da Silva Ferreira",
                "cpf": "12330673701",
                "phone": "87981102539",
                "codServidor": 27982,
                "email": "bethearanferreiradasilva@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "67548eee-a4bc-4683-bbf0-8de2923506e8",
                "name": "Maria Eliete Ribeiro de Araujo",
                "cpf": "02775306446",
                "phone": "87991030172",
                "codServidor": 20243,
                "email": "ellietiribeiroescola@gmail.com",
                "position": "Diretor(a)",



                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "677cd05c-b0d5-4c22-88d6-3ee894d53e00",
                "name": "Francisca Gildene dos Santos Rodrigues",
                "cpf": "04583771479",
                "phone": "87991468803",
                "codServidor": 986,
                "email": "marcleano25hotmail.com@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "67f984d6-64f0-442b-be61-52bcc2314ac1",
                "name": "Sandra Ferreira",
                "cpf": "13848448483",
                "phone": "87996350772",
                "codServidor": 19329,
                "email": "sandrafe2304@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "6836167e-ecbf-4827-bda8-d324522204ef",
                "name": "Elenilda Leonor de Lima Morais",
                "cpf": "48227846300",
                "phone": "87999203838",
                "codServidor": 26484,
                "email": "elen_morais@hotmail.com",
                "position": "Coordenador(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "6848874f-4756-4cc1-85b9-dfc5bffc3ac3",
                "name": "Ícaro Gutemberg Silva Alencar",
                "cpf": "11469743450",
                "phone": "87999975522",
                "codServidor": 62936,
                "email": "icaroalencarint@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "6848e3aa-b2a9-42af-b5ce-25a35e7aa335",
                "name": "José Cristino Paixão #1",
                "cpf": "24417203334",
                "phone": "89994198105",
                "codServidor": 1614,
                "email": "jcpaixao15@hotmail.com",
                "position": "Professor(a)",



                "institutionId": "1f0cb6c1-e074-4555-812b-378920649b71"
            },
            {
                "id": "6857bba0-2f1c-48fc-8270-b3bf7a05e38e",
                "name": "Flavia Regina dos Santos Nascimento",
                "cpf": "92332021353",
                "phone": "89999887038",
                "codServidor": 23223,
                "email": "flaviarsn33@hotmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "68637b35-5a27-435b-b780-42a3672e0b6d",
                "name": "Tayrinne da Silva Victor",
                "cpf": "11777148413",
                "phone": "87999359095",
                "codServidor": 12622,
                "email": "tayrinnedasilvasantoss@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "68750462-f450-4d0b-924a-7e5a1b64eed4",
                "name": "Edileide Maria de Souza",
                "cpf": "00879212438",
                "phone": "87991035618",
                "codServidor": 4053,
                "email": "edileide.maria.souza@hotmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "687a1b11-8cf2-4b32-b61b-da88c86a00ae",
                "name": "Anaclélia Costa Jacó",
                "cpf": "74265253415",
                "phone": "87996261593",
                "codServidor": 36961,
                "email": "aninhafisk@hotmail.com",
                "position": "Orientador Pedagógico",
                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "69d3d12c-06fc-4954-a3b0-061967d421b2",
                "name": "Francimaria Sousa Santos Silvana",
                "cpf": "04334102484",
                "phone": "87981365362",
                "codServidor": 14447,
                "email": "francimariasantos07@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "69ddc20d-c042-4c89-9759-a7f8cb8ec012",
                "name": "Adriana Pereira de Santana",
                "cpf": "07555402475",
                "phone": "87981590759",
                "codServidor": 12773,
                "email": "adrianaperei265@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "69f76f0e-8867-4c12-aaeb-b50534637995",
                "name": "Wagner de Lima Batista",
                "cpf": "05204847464",
                "phone": "87991379137",
                "codServidor": 20449,
                "email": "wagnerb_@hotmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "6a25a18c-4c1c-4321-b757-ec0c7e14b135",
                "name": "Jose Jailson Gonçalves Rodrigues",
                "cpf": "04505787478",
                "phone": "8791291962",
                "codServidor": 34946,
                "email": "jailson97@yahoo.com.br",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "6a3b798a-35fd-44a3-bc98-57143c0311eb",
                "name": "Lucelia Silva Oliveira",
                "cpf": "08317670490",
                "phone": "87991292023",
                "codServidor": 1555,
                "email": "Luceliameneses244@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "6a61acda-8f76-43c2-91a0-49a4d153b55f",
                "name": "Maria Josiane Gomes de Oliveira",
                "cpf": "02703436440",
                "phone": "87991145207",
                "codServidor": 25637,
                "email": "gomesjosiany@hotmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "6a99e9b3-0a39-45a7-bebe-96ac446483ff",
                "name": "Elza Pereira Rodrigues Silva",
                "cpf": "03050437499",
                "phone": "8791363094",
                "codServidor": 32756,
                "email": "rodrigueselza67@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "6a9a8e19-9a44-489a-bbdd-9f87e306698a",
                "name": "Maria Auxiliadora Cruz Oliveira",
                "cpf": "03052115448",
                "phone": "87991762828",
                "codServidor": 35802,
                "email": "mariacruzoliveira2019@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "6aa4a906-a9d4-4807-b009-c000943cf0ee",
                "name": "Edenilda Maria de Amorim Silva",
                "cpf": "04743276470",
                "phone": "87981061072",
                "codServidor": 15687,
                "email": "edenildamaria06@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "6ab87380-3d38-413a-bd00-5e116649dace",
                "name": "Avelar Rodrigues Paixao",
                "cpf": "01039048323",
                "phone": "89994050548",
                "codServidor": 828,
                "email": "avelarpaix@hotmail.com",
                "position": "Professor(a)",



                "institutionId": "1f0cb6c1-e074-4555-812b-378920649b71"
            },
            {
                "id": "6afd1905-3b56-487a-a6eb-69300dc3334b",
                "name": "Francisca Sandra Alencar do Vale",
                "cpf": "03125518431",
                "phone": "87991629272",
                "codServidor": 7075,
                "email": "sandraalencarwalle@hotmail.com",
                "position": "Coordenador(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "6b011d40-18a6-42fd-b6d0-9c8e8dcd2552",
                "name": "Maria Cleidmar de Jesus Souza",
                "cpf": "03345313499",
                "phone": "87991558656",
                "codServidor": 62089,
                "email": "cleidefialho2012@hotmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "6b462982-1ed7-41bc-b4a8-7f14101eae21",
                "name": "Ana Marcia Alencar Batista Modesto",
                "cpf": "91045100382",
                "phone": "87991430113",
                "codServidor": 57918,
                "email": "anamarcia677w@gmail.coM",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "6b81ced6-e274-45f4-811e-c619a6f68983",
                "name": "Rose Mary Tavares dos Reis Gomes de Lima",
                "cpf": "51431998400",
                "phone": "87991189458",
                "codServidor": 8296,
                "email": "rose.tavares123@gmail.com",
                "position": "Coordenador(a)",
                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "6c0e4481-3d3e-466a-925c-65b61aebdc16",
                "name": "Valdimir Cunha de Oliveira",
                "cpf": "02056081407",
                "phone": "87999626634",
                "codServidor": 11752,
                "email": "valdimircunhadeoliveira@gemail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "6c1ab0ab-6fca-4c73-9ce9-cdedb653b4da",
                "name": "Maria Leticia Andrade Sousa",
                "cpf": "11692912445",
                "phone": "87974002677",
                "codServidor": 53217,
                "email": "leticiaasm95@mail.com",
                "position": "PROFESSOR(A)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "6c2415dc-5d7e-428a-a317-240443dff9f4",
                "name": "Jucirene Carvalho Clementino Silva",
                "cpf": "02645175392",
                "phone": "89994063102",
                "codServidor": 4646,
                "email": "jucirenecarvalho@hotmail.com",
                "position": "Professor(a)",



                "institutionId": "1f0cb6c1-e074-4555-812b-378920649b71"
            },
            {
                "id": "6c4ef8fd-f8fa-4a1d-9237-8f586fb7d5cd",
                "name": "Pedro Esdras Leite Cunha",
                "cpf": "07904156407",
                "phone": "87991315466",
                "codServidor": 61799,
                "email": "pedroesdras549@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "6ca22cdb-6b59-47d3-abe8-09c041e7adf0",
                "name": "Maria Iris Silva Lopes",
                "cpf": "32468218876",
                "phone": "87991321456",
                "codServidor": 18502,
                "email": "iris-araripina@hotmail.com",
                "position": "Professor(a)",



                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "6d77829f-f2ac-49d4-9aae-73adcbd1f3c9",
                "name": "Francisca Georgina Antunes e Silva",
                "cpf": "04781816479",
                "phone": "87991233741",
                "codServidor": 1924,
                "email": "georginaararipe@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "6d7baea3-b85e-4651-9c09-7896600c586b",
                "name": "Juçara Gomes Baldoino",
                "cpf": "07390753498",
                "phone": "87981295095",
                "codServidor": 40575,
                "email": "Jucara.gomes@prof.edu.araripina.pe.gov",
                "position": "Orientador Pedagógico",
                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "6d7e5a81-53d3-4d44-91fa-f7fe0c4013d1",
                "name": "Virlândia Maria Cordeiro Nunes",
                "cpf": "03597325424",
                "phone": "89999881943",
                "codServidor": 39273,
                "email": "virlandia_nunes@hotmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "6d814cf5-026b-4b44-b583-bf4d15bfe8f6",
                "name": "Maria Juvani Andrade",
                "cpf": "88366049434",
                "phone": "8791092652",
                "codServidor": 9145,
                "email": "andrademariajuvany@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "6dedec2b-913b-462c-b5ce-9eab16bf7773",
                "name": "Maria Aldileide de Oliveira Lopes",
                "cpf": "02791031405",
                "phone": "87991248180",
                "codServidor": 554,
                "email": "aldileide.oliveira@outlook.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "6dfcadd9-41e8-4f1f-885c-f631eb3a34df",
                "name": "Eduarda Issis Araujo Lacerda",
                "cpf": "05667433451",
                "phone": "87996503371",
                "codServidor": 7792,
                "email": "eduarda.issis@hotmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "6e13b40e-0d29-4f85-be25-8f1fbe208372",
                "name": "Rosilania Pereira de Carvalho",
                "cpf": "09137865439",
                "phone": "87991927791",
                "codServidor": 5104,
                "email": "rosilaniapereira20@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "6ead9257-1a6c-411a-8804-e5c1584d0914",
                "name": "Joice de Sousa Silva",
                "cpf": "05722753408",
                "phone": "87991373512",
                "codServidor": 9805,
                "email": "joicesousasil@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "6ed40d8a-7662-4c8d-abe8-f8df403d752d",
                "name": "Benedito Jose Filho",
                "cpf": "81119500397",
                "phone": "89994638460",
                "codServidor": 548,
                "email": "benedito.josefilho@hotmail.com",
                "position": "Professor(a)",



                "institutionId": "1f0cb6c1-e074-4555-812b-378920649b71"
            },
            {
                "id": "6f15e17d-6509-4ee8-949f-b44437b39517",
                "name": "Manoel Jose de Sousa #1",
                "cpf": "47393661349",
                "phone": "89994033427",
                "codServidor": 200,
                "email": "manjose2011@hotmail.com",
                "position": "Professor(a)",



                "institutionId": "1f0cb6c1-e074-4555-812b-378920649b71"
            },
            {
                "id": "6f271639-a33f-481e-9785-8816141ae127",
                "name": "Geismara Pereira Leite Rocha",
                "cpf": "12584033402",
                "phone": "87981631340",
                "codServidor": 14272,
                "email": "geismara.leite@prof.edu.araripina.pe.gov.br",
                "position": "Professor(a)",



                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "6f6fe3c6-8e96-474d-bba9-2b4e0fcef5b7",
                "name": "Sandra Mara Dias da Silva",
                "cpf": "02332803408",
                "phone": "87992010093",
                "codServidor": 44868,
                "email": "sandra_maradias@hotmail.com",
                "position": "Professor(a)",
                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "701d51ca-04fd-4c35-b617-5f88d7f89630",
                "name": "Francirlene Guiomar de Carvalho Vieira",
                "cpf": "04231575401",
                "phone": "87991519097",
                "codServidor": 3331,
                "email": "francine_vieira@hotmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "708279f4-a020-496e-a438-b6935dadac6b",
                "name": "Raquel Farias Silva Araujo",
                "cpf": "13351833458",
                "phone": "87999914472",
                "codServidor": 10626,
                "email": "fariasraque0504@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "708c75e1-2716-46bc-ba64-eabe50be6924",
                "name": "Zicilvania Maria Baldoino Gomes",
                "cpf": "10147765463",
                "phone": "87981686942",
                "codServidor": 54013,
                "email": "zicilvania@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "7105df2e-208e-4c60-871d-f3880cdd9d4b",
                "name": "Andrey Philip Batista de Lima",
                "cpf": "10163359466",
                "phone": "87999185277",
                "codServidor": 19311,
                "email": "andreybatista0609@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "7147c3df-26b4-4313-acdc-09a616667fd7",
                "name": "Maria Alâne de Sousa Oliveira",
                "cpf": "10582811430",
                "phone": "87991675013",
                "codServidor": 60791,
                "email": "alanesousaoliveira2024@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "714be067-37a0-4c81-b1ff-b61cf1eefdfe",
                "name": "Maria Edilsa Ferreira Viana",
                "cpf": "03438977419",
                "phone": "88994444678",
                "codServidor": 4634,
                "email": "edilvianafe@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "71ec0a28-2cf1-4c1f-99c1-98eb0bba9931",
                "name": "Gleisson Robson Rodrigues",
                "cpf": "13376833451",
                "phone": "87981727568",
                "codServidor": 59908,
                "email": "gleissonsilva1619@gmail.coM",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "729baf2f-685d-48a1-a8cd-a3e88a8deb0d",
                "name": "Suzana Maria Rodrigues",
                "cpf": "00686347307",
                "phone": "89994471037",
                "codServidor": 1256,
                "email": "suzanamariarodrigues123456789@gmail.com",
                "position": "Coordenador(a)",
                "institutionId": "1f0cb6c1-e074-4555-812b-378920649b71"
            },
            {
                "id": "72b678aa-f18b-4f74-b275-d4ea8faeec6e",
                "name": "Maria Veronica Simao Nunes",
                "cpf": "03460992425",
                "phone": "87991664283",
                "codServidor": 27013,
                "email": "veronicasimaonunes3@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "72dac59e-030a-474d-b097-aa2514ef5ce0",
                "name": "Veroneide Maria de Sousa",
                "cpf": "02196059471",
                "phone": "35998873332",
                "codServidor": 29099,
                "email": "veroneide.x5@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "73242694-7dc7-4fe9-8644-b944f6cfa0cd",
                "name": "Arlete de Carvalho Silva Alencar",
                "cpf": "92244866491",
                "phone": "87991595413",
                "codServidor": 44656,
                "email": "arletealencar@Gmail.com",
                "position": "Secretário(a)",
                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "735e1726-1072-4e0b-a398-cc100c1eda46",
                "name": "Josimere Alves Bezerra",
                "cpf": "99821907415",
                "phone": "87981399025",
                "codServidor": 21781,
                "email": "josimere.alves@araripina.pe.gov.br",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "737073e1-7976-4770-968d-47bd99263bd4",
                "name": "Ernantina Maria de Sousa",
                "cpf": "55455239368",
                "phone": "8994559063",
                "codServidor": 2843,
                "email": "sousaernanm@gmail.com",
                "position": "Professor(a)",



                "institutionId": "1f0cb6c1-e074-4555-812b-378920649b71"
            },
            {
                "id": "737083d1-a806-4e09-8f6c-1b541936dc82",
                "name": "Edna Mendes de Oliveira",
                "cpf": "06019554473",
                "phone": "87991055359",
                "codServidor": 9674,
                "email": "ednamendes-@hotmail.com",
                "position": "Professor(a)",
                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "737e649c-bf6f-42ed-a0b7-7b5fd1ce0f1a",
                "name": "Lorena Souza Arruda Alencar",
                "cpf": "08427376421",
                "phone": "89994071074",
                "codServidor": 11556,
                "email": "lorema.granja@gmail.com",
                "position": "Professor(a)",
                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "73ed288b-e469-4c4c-8b91-3c7068b65c4b",
                "name": "Cristiane Letícia de Andrade Oliveira",
                "cpf": "07443085427",
                "phone": "87991366662",
                "codServidor": 24097,
                "email": "c.leticiaa.oliveira@hotmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "73f07c3e-70f2-4467-b17e-9320ab801cfb",
                "name": "Maria Oneide de Souza Delmondes",
                "cpf": "76474623420",
                "phone": "87991210088",
                "codServidor": 36983,
                "email": "maria.oneide@prof.edu.araripina.pe.gov.br",
                "position": "Secretário(a)",
                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "73f9ccd8-6010-4381-96ea-d32581f7c050",
                "name": "Bruna Dayanne Oliveira Felix",
                "cpf": "43436701807",
                "phone": "87991947358",
                "codServidor": 20746,
                "email": "felixbruna2805@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "7469eaea-588f-4423-a406-354aff23eff1",
                "name": "Francisco Cineval Lopes",
                "cpf": "05404247495",
                "phone": "87981727577",
                "codServidor": 11321,
                "email": "cinevallopes23@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "74f5e6e8-d78f-42a2-afea-0c1252615905",
                "name": "Gilvaneide Faustino do Nascimento Ramos",
                "cpf": "03937236406",
                "phone": "87991384373",
                "codServidor": 7254,
                "email": "gilvaneidefaustino28@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "752ab3b0-7fa2-4e7a-966e-dbafd856a855",
                "name": "Francisca Edlene Lopes Pereira",
                "cpf": "05053856435",
                "phone": "87991427507",
                "codServidor": 45194,
                "email": "edlene_lopes18@hotmail.com",
                "position": "Professor (a) em Readaptação",
                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "75622f5d-6800-4134-8d48-1c756902f589",
                "name": "Ilane Maisa Silva Crispim",
                "cpf": "04061997521",
                "phone": "87996307605",
                "codServidor": 18406,
                "email": "ilanamaisa5@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "76f11d9c-cfc5-496f-86e6-596cdc739293",
                "name": "Francisco Romulo Bento de Assis",
                "cpf": "70925003387",
                "phone": "89999351745",
                "codServidor": 23322,
                "email": "romulo-38@outlook.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "76f37795-0247-45bf-9c05-1c2b6722bd50",
                "name": "Francisca Aparecida Gomes Delmondes Franco",
                "cpf": "03475524473",
                "phone": "87981391542",
                "codServidor": 14934,
                "email": "francisca.delmondes@prof.edu.araripina.pe.gov.br",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "7721d23f-5661-4537-bb69-a7ed37c82b7a",
                "name": "Carmem Conceição Barbosa de Sousa",
                "cpf": "01270639358",
                "phone": "89994470723",
                "codServidor": 4706,
                "email": "carmem-sousa@hotmail.com",
                "position": "Professor(a)",



                "institutionId": "1f0cb6c1-e074-4555-812b-378920649b71"
            },
            {
                "id": "773d9f08-c46d-4dbb-851f-181f7e664449",
                "name": "Leocárdio Hércules Florêncio Batista",
                "cpf": "12676036408",
                "phone": "87981845439",
                "codServidor": 40761,
                "email": "leocardiohercules@outlook.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "779f512d-2082-43a9-9aeb-67dc33bf4146",
                "name": "Jakeline Rodrigues Ferreira",
                "cpf": "07151733321",
                "phone": "89994160119",
                "codServidor": 5625,
                "email": "kelyferreira1111@gmail.com",
                "position": "Professor(a)",



                "institutionId": "1f0cb6c1-e074-4555-812b-378920649b71"
            },
            {
                "id": "77a9d5b9-3670-4f3a-b9d3-9943b8739302",
                "name": "Irene Neri de Oliveira Carvalho",
                "cpf": "02296096433",
                "phone": "87991842963",
                "codServidor": 36259,
                "email": "irene.carvalho@prof.edu.araripina.pe.gov.br",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "77f25cf8-d32f-42a5-bbc2-39540d917920",
                "name": "Maria Helena Alencar Lima",
                "cpf": "01026022479",
                "phone": "87991545700",
                "codServidor": 21856,
                "email": "mariahelenaalencar06@gmail.com",
                "position": "Diretor(a)",
                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "77fb0879-8a69-4392-8036-cf2423da28a0",
                "name": "Josenildo Avelino da Silva",
                "cpf": "03499641496",
                "phone": "87981189201",
                "codServidor": 35202,
                "email": "josenildoavelino@hotmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "78158fb2-c7b4-4cd5-8c04-29df4454ea09",
                "name": "Maria Aparecida Cordeiro Bihum",
                "cpf": "96379650415",
                "phone": "87981008400",
                "codServidor": 27925,
                "email": "aparecida.bihum@gmail.com",
                "position": "Orientador Pedagógico",
                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "782e8098-491c-46e9-96d6-8fcac61f49f5",
                "name": "Clacilda de Sousa Soares",
                "cpf": "09686844406",
                "phone": "87981598624",
                "codServidor": 13018,
                "email": "clacilda8@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "785914c5-571a-43c1-b4bd-81acedd9d206",
                "name": "Cristiano Delmondes Leite",
                "cpf": "06625522457",
                "phone": "8791706822",
                "codServidor": 15868,
                "email": "cristianodelmondes97@gmail.com",
                "position": "Diretor(a)",
                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "78703ef3-a697-4256-bf2e-3f6657cbbd7c",
                "name": "Vanessa Maria de Alencar Rodrigues",
                "cpf": "06521272403",
                "phone": "87999351202",
                "codServidor": 12918,
                "email": "wanessa_1986@live.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "788ee058-12b7-44dd-9929-2f127479d9c6",
                "name": "José Marcelo de Souza Modesto",
                "cpf": "09464241446",
                "phone": "21968759243",
                "codServidor": 58426,
                "email": "modestomarcelo.12@outlook.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "78f56fa3-7df6-42b6-b474-755690fbb05f",
                "name": "Alecxandro Luiz da Silva Filho",
                "cpf": "13976644447",
                "phone": "87996788988",
                "codServidor": 6076,
                "email": "ALECXANDROTRINDADE@GMAIL.COM",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "794131ce-67c1-4994-a2f8-f7b2f0c340f6",
                "name": "Maria Lucimar de Jesus Sousa",
                "cpf": "00973498447",
                "phone": "87991102919",
                "codServidor": 62216,
                "email": "lucyjs2010@hotmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "7953254a-cfab-43ac-beba-471fa4ae4f5c",
                "name": "Luzia Maria Delmondes Ferreira",
                "cpf": "02014222479",
                "phone": "87991886549",
                "codServidor": 9688,
                "email": "luziaadelmondes@gmail.com",
                "position": "Professor(a)",
                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "79bfab46-311f-4286-8e62-c1faf68f7bbe",
                "name": "Susana da Silva Morais",
                "cpf": "11140420488",
                "phone": "87981552821",
                "codServidor": 59556,
                "email": "susanamorais2016@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "7a046712-c75d-4810-a5b1-0be9ee4df208",
                "name": "Maria Deocassia de Souza Modesto",
                "cpf": "00040014436",
                "phone": "87991838255",
                "codServidor": 49821,
                "email": "deocassiamodesto@hotmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "7a0e9b36-e17d-4e7c-9929-855350090042",
                "name": "Macilene Neri Lima",
                "cpf": "08247015420",
                "phone": "87981121723",
                "codServidor": 15831,
                "email": "macileneneri@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "7a12cd7e-b1b3-4c61-a248-bf698beb6db4",
                "name": "Eva Auricléia Neri da Mota Oliveira",
                "cpf": "79530036434",
                "phone": "87991139641",
                "codServidor": 60217,
                "email": "cleiamota88@gmail.com",
                "position": "Professor(a)",



                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "7a48e435-0589-438d-a0a5-bce8845bd13d",
                "name": "Marinalva Souza Nunes Lima",
                "cpf": "03546699408",
                "phone": "87981230059",
                "codServidor": 16297,
                "email": "marinalvasouzanuneslima@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "7a986fdb-8216-4f67-956e-b16592d9e208",
                "name": "Anderson Ramon dos Santos Goncalves",
                "cpf": "08907457492",
                "phone": "87981340615",
                "codServidor": 12403,
                "email": "ramon.xt@hotmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "7ac35ee2-b20f-4e69-99e1-0d829de92ac1",
                "name": "Eliane Marcelino da Silva",
                "cpf": "07786648488",
                "phone": "87996288078",
                "codServidor": 5719,
                "email": "ELIANEMARCELINOSILVA@OUTLOOK.COM.BR",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "7b259a41-9717-49e5-9493-4a68c744254e",
                "name": "Selvani Das Neves Beserra Gomes",
                "cpf": "03828813461",
                "phone": "87992050991",
                "codServidor": 33066,
                "email": "nevessilvani69@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "7b29b221-759c-4d5a-a83e-b00976b51b47",
                "name": "Maria Elielde Ferreira Coelho",
                "cpf": "03846432482",
                "phone": "8781083621",
                "codServidor": 17069,
                "email": "elieldecoelho2020@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "7b316aea-cdaa-4838-8758-d1532a824857",
                "name": "Antonio Jailton de Lima",
                "cpf": "75012227468",
                "phone": "87991072522",
                "codServidor": 15929,
                "email": "antonio.jailton@prof.edu.araripina.pe.gov.br",
                "position": "Coordenador(a)",
                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "7ba5a73e-0f13-458d-84c3-dd6a765ff725",
                "name": "Juscilmara Gomes Baldoino",
                "cpf": "10348071450",
                "phone": "87981744338",
                "codServidor": 22582,
                "email": "juscilmaragomes@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "7be1f627-1abb-41e4-a080-87a519312847",
                "name": "Patrícia Cristina Modesto",
                "cpf": "03038926418",
                "phone": "8799209316",
                "codServidor": 40295,
                "email": "patrciacristina.modesto413@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "7bfebc57-a4e7-4580-bfdb-73faf82df4f2",
                "name": "Thais v s Rodrigues",
                "cpf": "04473917398",
                "phone": "89994211015",
                "codServidor": 5230,
                "email": "thaisvirginia93@gmail.com",
                "position": "Professor(a)",



                "institutionId": "1f0cb6c1-e074-4555-812b-378920649b71"
            },
            {
                "id": "7c0c6d97-c310-496e-9a4b-5ca91affe509",
                "name": "Alexandrina Pereira da Silva Cordeiro",
                "cpf": "66007224449",
                "phone": "87991138450",
                "codServidor": 907,
                "email": "pe.alexandrina@hotmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "7c3e49cf-ca56-4175-8933-9af2360d3576",
                "name": "Marluz Delmondes Leite",
                "cpf": "05597434403",
                "phone": "87988265259",
                "codServidor": 20348,
                "email": "marlym0413@gmail.com",
                "position": "Professor(a)",



                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "7c42ac7b-e038-4a12-b72e-6cff56c78cac",
                "name": "Regina Maria de Andrade Silva",
                "cpf": "05380644473",
                "phone": "87991372428",
                "codServidor": 14097,
                "email": "andraderegina012@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "7c4b792d-5042-4d9e-8276-882e9adf3aa0",
                "name": "Nadja Nayany Ferreira Gomes",
                "cpf": "11193942446",
                "phone": "87999334400",
                "codServidor": 18463,
                "email": "nadjanayany990@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "7c895b2a-866e-49b4-a183-27541b0fa13b",
                "name": "Douglas Rodrigues Torres",
                "cpf": "09452756411",
                "phone": "87981473136",
                "codServidor": 732,
                "email": "douglasrt7@outlook.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "7c9807d5-9a20-4687-8bc6-b073380ac772",
                "name": "Leonarda Carvalho de Macedo",
                "cpf": "03417195446",
                "phone": "87996116604",
                "codServidor": 48363,
                "email": "leovalho2008@hotmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "7d12f86e-0282-497e-a79f-c718be617ff6",
                "name": "Ana Paula de Sousa Costa",
                "cpf": "05765084460",
                "phone": "87991632829",
                "codServidor": 41983,
                "email": "paula.costa@edu.araripina.pe.gov.br",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "7d2ad8f0-2235-461d-9661-c8cde637245e",
                "name": "Deydejane Henrique de Sousa Ferreira",
                "cpf": "05461595405",
                "phone": "87996794958",
                "codServidor": 21170,
                "email": "deydjane_22@hotmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "7d60a8a4-37cd-4116-8ee4-7067f99650d4",
                "name": "Jose Rodrigues",
                "cpf": "80313469334",
                "phone": "89994120334",
                "codServidor": 3443,
                "email": "jracaua@hotmail.com",
                "position": "Professor(a)",
                "institutionId": "1f0cb6c1-e074-4555-812b-378920649b71"
            },
            {
                "id": "7ddba9c5-9dcd-402f-a7c0-1f9081d58d4c",
                "name": "Joedna Neres da Silva",
                "cpf": "09166561442",
                "phone": "87981080379",
                "codServidor": 7114,
                "email": "joednaneri5@icloud.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "7dfdf323-4350-46bc-b7c5-557aa6238607",
                "name": "Maria Vandenice Pereira Silva",
                "cpf": "04580163494",
                "phone": "87981246998",
                "codServidor": 30446,
                "email": "vandenice.pereira@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "7e0d45f0-5d25-4720-909b-2d6eec6e7b6c",
                "name": "Erika Bezerra Silva",
                "cpf": "04279821461",
                "phone": "8799571645",
                "codServidor": 17611,
                "email": "bezerraerika24@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "7e139599-3bf5-4028-bd70-c4bc23b12ec6",
                "name": "Evanez de Lima Felix",
                "cpf": "04847260481",
                "phone": "87991713358",
                "codServidor": 1703,
                "email": "limafelix1983@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "7e58dd4a-bf9b-4b55-ae2d-2c34997c2dbd",
                "name": "Hellynny Pereira de Brito",
                "cpf": "87641356320",
                "phone": "87996090497",
                "codServidor": 15788,
                "email": "hellynnybrato@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "7efc8e3d-5fba-488b-8e51-6ab68a9bd7a9",
                "name": "Veronica Luciene Alencar Pereira",
                "cpf": "02522423436",
                "phone": "87996205854",
                "codServidor": 506,
                "email": "veronicaalencarpereira@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "7f176a1d-c142-4e28-8255-4dac36583063",
                "name": "José Athaíde Beserra Rodrigues",
                "cpf": "12823551476",
                "phone": "87996790890",
                "codServidor": 25285,
                "email": "athaidebezerra1@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "7f4e06ed-faa9-40b0-b441-96fe03feafd9",
                "name": "Marcia Fernanda Leite Sousa",
                "cpf": "05771898406",
                "phone": "87981097968",
                "codServidor": 15684,
                "email": "fernandaleite.marcia@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "7f691d00-2830-48fd-8208-73a4aa133b38",
                "name": "Maria Joelma Neris da Silva",
                "cpf": "04969574499",
                "phone": "87981163590",
                "codServidor": 6270,
                "email": "joelmajulia2020@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "7f844405-026e-4cda-8286-2bb60bdc312c",
                "name": "Veridiana Delmondes de Macedo Lucena",
                "cpf": "04864517479",
                "phone": "87991273007",
                "codServidor": 44690,
                "email": "vdelmndes@hotmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "7f9fcce5-a9bf-4840-a4fb-ad9b134d4dc9",
                "name": "Antonia Iraildes Maia Rodrigues Souza",
                "cpf": "03082174469",
                "codServidor": 48543,
                "email": "",
                "position": "EDUCADORA DE APOIO",
                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "7fd8c87e-5a1b-4754-99a0-7ce6749ea7b7",
                "name": "Francisca Gilda do Nascimento",
                "cpf": "84360011415",
                "phone": "87991170643",
                "codServidor": 13775,
                "email": "gijdanascimento@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "801e839b-ac53-41a0-9570-7945ffaaf132",
                "name": "Maria Aparecida de Carvalho",
                "cpf": "98182641349",
                "phone": "8999754064",
                "codServidor": 23765,
                "email": "maria-aparecida.carvalho@hotmail.com",
                "position": "Orientador Pedagógico",
                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "8056d55b-ba2a-476a-b4e1-af75b8f0df10",
                "name": "Ligia Sousa Modesto",
                "cpf": "04105025457",
                "phone": "87991531424",
                "codServidor": 42727,
                "email": "ligia.ssmodesto@outlook.com",
                "position": "Orientador Pedagógico",
                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "807fc94b-dfc9-43ed-8d06-c7b1cbc44a5c",
                "name": "Maria Rosemery Bie de Lima Silva",
                "cpf": "00970300409",
                "phone": "87998043923",
                "codServidor": 15040,
                "email": "mariarosymeire.silva@prof.edu.araripina.pe.gov.br",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "809b5f7e-1d30-40cc-b20e-4ac3ab94955a",
                "name": "Maria Cristina de Andrade Oliveira",
                "cpf": "04989715462",
                "phone": "87991170513",
                "codServidor": 33063,
                "email": "andradecristina073@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "813a484f-f64d-4ac9-a98c-c615c1fb81d1",
                "name": "Verônica da Silva Souza",
                "cpf": "02318999473",
                "phone": "87981462981",
                "codServidor": 47077,
                "email": "vera201023@hotmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "819e3551-037e-4335-ae4c-8465dc1fa6ab",
                "name": "Kerolaine Chaves Goncalves Matos",
                "cpf": "91919517472",
                "phone": "87999392892",
                "codServidor": 27051,
                "email": "kerolaine.matos@prof.edu.araripina.pe.gov.br",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "81a1e3d9-704e-4e2d-a86c-b0c73d3821d0",
                "name": "Veronisse Batista de Sousa",
                "cpf": "86577123420",
                "phone": "87996035677",
                "codServidor": 16181,
                "email": "veronissebatista86@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "81dc93fb-4a05-4d8b-8c15-c89abfdbb896",
                "name": "Maria Aparecida Soares de Oliveira Morais",
                "cpf": "03126556493",
                "phone": "87991374430",
                "codServidor": 9440,
                "email": "aparecidacom76@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "81ff70c9-32a9-4a60-8f38-18504e8d3eaf",
                "name": "Silvaneide Maria da Silva",
                "cpf": "02362124355",
                "phone": "89994167558",
                "codServidor": 5296,
                "email": "silvaneid1984@gmail.com",
                "position": "Professor(a)",



                "institutionId": "1f0cb6c1-e074-4555-812b-378920649b71"
            },
            {
                "id": "8228ebdd-978f-4dd2-a593-631eebdf8511",
                "name": "Lindevanio Marques Diniz",
                "cpf": "03073935428",
                "phone": "87991252561",
                "codServidor": 19015,
                "email": "lindevanio@hotmail.com",
                "position": "Professor(a)",



                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "8267bf73-1209-4cf0-9157-ef2daceafe0c",
                "name": "Andreson Oliveira do Nascimento",
                "cpf": "07697486431",
                "phone": "87991169588",
                "codServidor": 54456,
                "email": "andreson1010@hotmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "82f3ddba-8dcc-41c1-9d83-b3547812364b",
                "name": "Israel da Silva Costa",
                "cpf": "07486571420",
                "phone": "87991776748",
                "codServidor": 62323,
                "email": "israelcosta1303@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "835b85be-dabb-4d85-bc25-aeaff358f1bc",
                "name": "Celma Maria Lima Rodrigues de Oliveira",
                "cpf": "76475816434",
                "phone": "87996567834",
                "codServidor": 15435,
                "email": "celma.oliveiera@prof.edu.araripina.pe.gov.br",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "83a8c2ea-243a-4932-a1a7-3d608d5d0a51",
                "name": "Celio Roberto de Aquino Alencar",
                "cpf": "05475281408",
                "phone": "87991773828",
                "codServidor": 12291,
                "email": "celioecida746@gmail.com",
                "position": "Diretor(a)",
                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "83a978e5-9b67-4dd0-a1ac-e3c1da2e2793",
                "name": "Cicero Felipe de Brito Silva",
                "cpf": "12167043414",
                "phone": "87999437823",
                "codServidor": 18250,
                "email": "felipe597ciicero@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "83e877ba-9764-4d9d-9707-6d85a7934cca",
                "name": "Maria Ediene Silva",
                "cpf": "07911002436",
                "phone": "87991613682",
                "codServidor": 12203,
                "email": "ediene.mirely2014@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "853bd11e-a525-412b-a2da-b08dd36dd310",
                "name": "Maria Fernanda Pereira Bezerra",
                "cpf": "09877068451",
                "phone": "87981468089",
                "codServidor": 7963,
                "email": "mariafernandabezerra997@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "85431f48-15a5-489b-ab04-76842b3c1102",
                "name": "Maria Ireide de Alencar Silva",
                "cpf": "84266856334",
                "phone": "87991036095",
                "codServidor": 29747,
                "email": "ireidealencar1004@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "857cd36e-68d2-44b2-9fcf-faafdb1485d1",
                "name": "Silvia Neyara Lacerda Alves",
                "cpf": "09673007462",
                "phone": "87991281040",
                "codServidor": 20851,
                "email": "silvialacerda2307@gamil.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "85a61004-e526-43b4-9daa-3affcd3ceb9c",
                "name": "Maria Vanessa Gomes Coelho",
                "cpf": "03951606428",
                "phone": "87991954194",
                "codServidor": 5906,
                "email": "mvgcoelho@yahoo.com.br",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "85b40c6e-6b1a-458a-897e-825d60111bec",
                "name": "Francisca Iranilza da Silva",
                "cpf": "06805162475",
                "phone": "87991913627",
                "codServidor": 37168,
                "email": "iranilzaxavier@gmail.com",
                "position": "Aux. Secretaria",
                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "85ee36e6-ca14-4367-8ff6-afa77d0c3bf0",
                "name": "Kamilla Silva Coelho",
                "cpf": "03174850401",
                "phone": "87992435518",
                "codServidor": 48655,
                "email": "kamilla.scoelho@hotmail.com",
                "position": "Professor(a)",
                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "86881e1a-535d-49b5-8637-336a0afbb726",
                "name": "Francisca de Paiva Bento",
                "cpf": "98892690400",
                "phone": "87991401537",
                "codServidor": 30165,
                "email": "bentofrancisca76@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "869edc38-d79f-4cea-aa0a-483ba2f1dd44",
                "name": "Magda dos Santos Pereira",
                "cpf": "07656397345",
                "phone": "87981287924",
                "codServidor": 6754,
                "email": "magdasantos302020@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "87206824-00c9-4b64-a9ca-83dbcecd3430",
                "name": "Edimara do Nascimento Costa",
                "cpf": "11536625400",
                "phone": "87981549655",
                "codServidor": 1414,
                "email": "mara40nascimento@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "87514c7e-984e-4398-aadb-fa985d9df9fd",
                "name": "Rosiele dos Santos Souza",
                "cpf": "12453435485",
                "phone": "87999313973",
                "codServidor": 578,
                "email": "rosiele21santos@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "87881dd8-ea24-4e6a-a114-7d7eea5d1095",
                "name": "Maria Juscileide de Andrade Cordeiro de Moraes",
                "cpf": "02805140427",
                "phone": "87991053692",
                "codServidor": 3382,
                "email": "Juscyandrade0211@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "880b59fc-c3b9-41bf-ba0f-1e638803adcb",
                "name": "Valdenir de Sousa Carvalho",
                "cpf": "00771628463",
                "phone": "87999146409",
                "codServidor": 61677,
                "email": "valdenircarvalho2022@gmail.com",
                "position": "Professor(a)",
                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "8827eaf4-8764-47b0-9a56-af111e3c4a25",
                "name": "Mariza da Silva de Oliveira",
                "cpf": "04726157426",
                "phone": "89994061117",
                "codServidor": 36900,
                "email": "mariza.santos@prof.edu.araripina.pe.gov.br",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "892cab2f-9c7c-474d-b031-e295cd5a352c",
                "name": "Edria Pereira Delmondes",
                "cpf": "05538135446",
                "phone": "87996654736",
                "codServidor": 29528,
                "email": "edriadelmondes@gmail.com",
                "position": "Secretário(a)",
                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "89c84d4e-e85b-476b-b62f-014f5ac7a716",
                "name": "Luciana Simplicia Batista de Araujo Brandao",
                "cpf": "01097057429",
                "phone": "87991254545",
                "codServidor": 6130,
                "email": "luciana.simplicia@araripina.pe.gov.br",
                "position": "Diretor(a)",
                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "8a2083a7-f451-420e-a125-966f46f1ed96",
                "name": "Francisca Goncalves da Silva Carvalho",
                "cpf": "03065354403",
                "phone": "87991106944",
                "codServidor": 35665,
                "email": "franciscaprof.2024@gamil.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "8a564552-07e6-42f6-9a80-8894c5dc5de6",
                "name": "Keyla Regina Modesto de Carvalho",
                "cpf": "02386036448",
                "phone": "87991953034",
                "codServidor": 9235,
                "email": "krmc1922@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "8bd14b0b-35ac-4ea7-8b25-b674792ead17",
                "name": "Camila Cinthya Santos Silva",
                "cpf": "07721341469",
                "phone": "87991387727",
                "codServidor": 51865,
                "email": "camilacynthia@live.com",
                "position": "Coordenador(a)",
                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "8c00cfbd-7944-4743-89f6-c5751932d085",
                "name": "Inês Rodrigues Pereira Pinho",
                "cpf": "92301967468",
                "phone": "87981747118",
                "codServidor": 37648,
                "email": "neidinha_pinho@hotmail.com",
                "position": "Orientador Educacional",
                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "8c0946ba-cc54-4771-ae72-73219f1d1fb4",
                "name": "Patricia Maria Pereira da Silva",
                "cpf": "03991071428",
                "phone": "87996023776",
                "codServidor": 13713,
                "email": "patriciamariasb@outlook.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "8c1d9241-ab70-481a-ba8f-8a67c8a8d124",
                "name": "Ilana Raissa Vicente de Souza",
                "cpf": "12156315450",
                "phone": "87981350295",
                "codServidor": 19373,
                "email": "reinaldo.silva@edu.ipubi.pe.gov.br",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "8c6b3af6-87a6-4fe0-a582-9f2697fbd64d",
                "name": "Talles Jorge Nascimento Silva",
                "cpf": "12390139493",
                "phone": "87996759048",
                "codServidor": 62294,
                "email": "tallesilva2018@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "8ca5b3fe-82f3-411e-9b4f-bf337f761441",
                "name": "Ana Patricia Soares Rodriguess",
                "cpf": "92086586353",
                "phone": "89994638470",
                "codServidor": 3638,
                "email": "anasoares2450@hotmail.com",
                "position": "Diretor(a)",
                "institutionId": "1f0cb6c1-e074-4555-812b-378920649b71"
            },
            {
                "id": "8cd31e0f-dd2a-464c-8419-390209f3031c",
                "name": "Edinalda Maria Gomes dos Santos",
                "cpf": "03640161408",
                "phone": "87991002213",
                "codServidor": 62359,
                "email": "edinaldamaria@outlook.com",
                "position": "Coordenador(a)",
                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "8d0ad89f-4c01-496e-829a-8b99d594a628",
                "name": "Joana Dark da Silva",
                "cpf": "01469420350",
                "phone": "89994116883",
                "codServidor": 251,
                "email": "joanadarksilva2020@gmail.com",
                "position": "Professor(a)",



                "institutionId": "1f0cb6c1-e074-4555-812b-378920649b71"
            },
            {
                "id": "8d8c22b2-5e78-46d0-9735-82fab4efa4ae",
                "name": "Francisco Jasiel dos Santos",
                "cpf": "03571542401",
                "phone": "87991594704",
                "codServidor": 35686,
                "email": "dossantosfranciscojasiel@gmail.com",
                "position": "Diretor(a)",
                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "8db69006-17af-44e8-b8bd-d5a3e75db757",
                "name": "Kelly Neri de Barros",
                "cpf": "07003057425",
                "phone": "87981661228",
                "codServidor": 20809,
                "email": "kellybarrosnery@gmail.com",
                "position": "Professor(a)",
                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "8dd78dfa-2dd6-428f-95f7-486ab4419d09",
                "name": "Helaine Franca Batista Alencar",
                "cpf": "04160011497",
                "phone": "87991071803",
                "codServidor": 9938,
                "email": "helainefb29@hotmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "8dfd3f48-c5cd-41fc-8872-15680a0706db",
                "name": "Cicera Valeria Miguel Gomes",
                "cpf": "11267472464",
                "phone": "87999294902",
                "codServidor": 3597,
                "email": "Valeriasouza8649@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "8e351c8d-c32f-4f40-a6ec-fce6e07570fe",
                "name": "Marcos do Nascimento Silva",
                "cpf": "07189843400",
                "phone": "87981341785",
                "codServidor": 15317,
                "email": "mnsmarcos@hotmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "8e94c208-9f56-4fcc-81d6-b6175187a78b",
                "name": "Francisco Augusto Aparecido Silva Ramalho",
                "cpf": "12151039480",
                "phone": "87991801340",
                "codServidor": 54265,
                "email": "papex77@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "8ebc3a71-43d7-4812-abfd-c3cfdf6a8dbf",
                "name": "Antonia Suely da Silva Alencar",
                "cpf": "05068067407",
                "phone": "87981548105",
                "codServidor": 15499,
                "email": "suelysilva13699@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "8ef033ba-e9ab-4625-b2d7-3b12646e9f62",
                "name": "Alana Braz Pereira da Silva",
                "cpf": "12373341441",
                "phone": "87991778467",
                "codServidor": 50161,
                "email": "alana.brazadm@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "8f32277d-70c1-44f9-9cbd-90a65d1de870",
                "name": "Myrella Lopes de Souza",
                "cpf": "09161427446",
                "phone": "87991432412",
                "codServidor": 4126,
                "email": "myrellalopes44@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "8fc830ff-f7a4-420b-916a-bb1303e833bc",
                "name": "Geanilde Maria Cordeiro de Holanda",
                "cpf": "02426336412",
                "phone": "87981473458",
                "codServidor": 24953,
                "email": "souteumilagrejesus@hotmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "90133b4f-d386-46dc-b3f4-881c7d1b7bb3",
                "name": "Leidaiane Cordeiro de Oliveira",
                "cpf": "04609324466",
                "phone": "87981718926",
                "codServidor": 13349,
                "email": "leidaianecordeiro@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "904c4033-f722-4b8f-9cbf-2d7669465555",
                "name": "Francisca Christya Evangelliny de Lucena Sarmento",
                "cpf": "09743633405",
                "phone": "87999596798",
                "codServidor": 16233,
                "email": "christyalucena@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "9063a40a-5fe5-483f-a62a-250a711ef14d",
                "name": "Paulo Junior Granja de Arruda",
                "cpf": "07348307426",
                "phone": "87991041601",
                "codServidor": 7842,
                "email": "paulojuniorgranjaarruda@gmail.com",
                "position": "Professor(a)",
                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "90701abb-91b3-4722-86f3-8f2a0db53a0c",
                "name": "Valci Maria Pereira",
                "cpf": "89981766453",
                "phone": "8781620936",
                "codServidor": 24084,
                "email": "Valcimariapereirap@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "907ccb4e-f992-47ba-9706-d4d5b6159a0e",
                "name": "Nilvanda Aparecida Feitosa da Silva",
                "cpf": "04015803426",
                "phone": "87981132610",
                "codServidor": 16598,
                "email": "feitosanilvanda@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "91d914af-0f98-4b22-9189-5f03b6025107",
                "name": "Luciene Candido da Silva",
                "cpf": "26286933808",
                "phone": "87981090663",
                "codServidor": 14712,
                "email": "lauracecyllya2017@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "91f4c2e7-6ff7-4a2c-af02-8f9e1a001876",
                "name": "Maria do Socorro Feitosa Rodrigues",
                "cpf": "50698044487",
                "phone": "8791831839",
                "codServidor": 40270,
                "email": "feitosamoraes2016@outlook.com",
                "position": "Orientador Pedagógico",
                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "9245414f-a83c-4b00-907d-24951d6b0e88",
                "name": "Edigleide de Sousa Cordeiro",
                "cpf": "07966887456",
                "phone": "87991610365",
                "codServidor": 41899,
                "email": "edigleidecordeiro@gmail.com",
                "position": "Orientador Educacional",
                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "929292d0-0dd8-4d2a-b41a-02dacd197717",
                "name": "Maria Pereira da Silva",
                "cpf": "28447864804",
                "phone": "87981361442",
                "codServidor": 4856,
                "email": "maria.pereira@prof.edu.araripina.pe.gov.br",
                "position": "Coordenador(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "929a19ae-af64-42d9-9ef0-c2e198e9e4bd",
                "name": "Maria Ironeide de Araujo",
                "cpf": "02845879407",
                "phone": "87981585449",
                "codServidor": 13530,
                "email": "ironeide347@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "92be6687-dea2-4a9e-bb5e-8b15186cb389",
                "name": "Ana Days dos Reis",
                "cpf": "00089339363",
                "phone": "89999278473",
                "codServidor": 23267,
                "email": "anadaysreis@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "92f61d2f-8df0-4649-87f0-d0121233cfa3",
                "name": "Jose Sostenes de Lima Silva",
                "cpf": "11368593496",
                "phone": "87991450864",
                "codServidor": 48752,
                "email": "sostenesdls@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "9351f685-e29a-4c9b-b665-257ba0f98455",
                "name": "Professor Teste",
                "cpf": "12003951075",
                "phone": "87991140992",
                "codServidor": 59080,
                "email": "modestokerley@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "9384e87e-6681-478a-b2ff-b41dec57aec1",
                "name": "Jocelia Gomes da Silva",
                "cpf": "11378649400",
                "phone": "87981383280",
                "codServidor": 16575,
                "email": "joceliahgomes2018@outlook.com",
                "position": "Professor(a)",



                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "93de5e28-2790-4267-845f-b1c2690c4a53",
                "name": "Gizelle Medeiros Sobral",
                "cpf": "08182115477",
                "phone": "87981418178",
                "codServidor": 57604,
                "email": "gizellemedeiros439@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "942ad50e-1e7d-4d31-941a-fdb091fd8e46",
                "name": "Juscelia de Oliveira",
                "cpf": "06777936424",
                "phone": "87991501779",
                "codServidor": 42160,
                "email": "jusceliacirilooliveira@gmail.com",
                "position": "Secretário(a)",
                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "9437abbb-5915-4804-8084-716068849df1",
                "name": "Jaine de Abreu Rodrigues",
                "cpf": "04890473432",
                "phone": "87991587651",
                "codServidor": 25480,
                "email": "jaineabreu515@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "948f65fb-2037-4a1b-981a-6511b124d9fe",
                "name": "Maria Rosangela Batista Alves",
                "cpf": "02805165411",
                "phone": "87991420944",
                "codServidor": 50634,
                "email": "alvesrosangel774@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "95b5f3bd-c4f2-4239-90b6-83a9e9f8ebda",
                "name": "Edjarles Pereira e Silva",
                "cpf": "03542724467",
                "phone": "87991318166",
                "codServidor": 19724,
                "position": "Professor(a)",
                "email": "pereiraedjarles@gmail.com",



                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "95c7f549-0caa-45bb-ab22-2e6b5cd72b5b",
                "name": "Maria Ivaneide da Silva",
                "cpf": "70850542472",
                "phone": "8988140281",
                "codServidor": 36560,
                "email": "ivaneide.leal@prof.edu.araripina.pe.gov.br",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "965ccb33-f19c-4d8a-9fe4-e0539defb6fa",
                "name": "Alex de Sousa Oliveira",
                "cpf": "11618870408",
                "phone": "87991461833",
                "codServidor": 63095,
                "email": "alexoliveirasousa26@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "9686fd6a-c92c-43a5-8f0e-05072c1d0d04",
                "name": "Maria Evani da Silva Leite",
                "cpf": "74747185453",
                "phone": "87991670215",
                "codServidor": 11864,
                "email": "evanileite37@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "9689f3d8-035f-4ae8-962c-d7a182a49f34",
                "name": "Francisca Joselia da Silva Cunha",
                "cpf": "03083206461",
                "phone": "87991323028",
                "codServidor": 23793,
                "email": "joseliacunha39@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "96ff6cae-cc34-402b-b1e2-560f100c02c9",
                "name": "Tatiana Modesto Bezerra",
                "cpf": "24613528879",
                "phone": "87991139290",
                "codServidor": 32996,
                "email": "tatianamodestobezerra@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "9728f807-e87a-4a13-b7dc-591f701d03cc",
                "name": "Macia de Souza Alves",
                "cpf": "07864340407",
                "phone": "87999002169",
                "codServidor": 29075,
                "email": "marciaalves7121@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "97588213-310e-45bb-ab60-6767717ffc5a",
                "name": "Adriana Aparecida da Costa",
                "cpf": "02191232418",
                "phone": "87991110101",
                "codServidor": 51913,
                "email": "adrianagserra@hotmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "97c7384b-96b3-44d2-bedb-3b1d8b972d2f",
                "name": "Geiza Cordeiro de Holanda",
                "cpf": "78019656472",
                "phone": "87981349254",
                "codServidor": 13223,
                "email": "geiza.cordeiroh@outlook.com",
                "position": "Coordenador(a)",
                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "97c875f8-6ec1-45e9-bc60-a6674076fe29",
                "name": "Francisca Maria Vieira Galdino",
                "cpf": "03949274430",
                "phone": "87981677293",
                "codServidor": 9469,
                "email": "FranciscamariaZX09@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "97f5f353-11b6-47e9-9914-a6fefadb9be2",
                "name": "Maria Denise Conceição Oliveira Santos",
                "cpf": "12170009418",
                "phone": "8791719943",
                "codServidor": 62655,
                "email": "mariadenise@2024gmail.com",
                "position": "Orientador Pedagógico",
                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "981e087c-9a61-496b-9a29-a11fd37d8fe5",
                "name": "Antonia Williana Pereira Rodrigues",
                "cpf": "09212538428",
                "phone": "87981764365",
                "codServidor": 6900,
                "email": "Willianerodriguesgabriel@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "984f1713-da1a-4a97-9924-6284b8d2d228",
                "name": "Lucas Andrade Sousa",
                "cpf": "13370454467",
                "phone": "87996588671",
                "codServidor": 19306,
                "email": "llucas6713@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "98f99610-c2f2-485e-8e9a-e675b98629be",
                "name": "Francisco da Silva",
                "cpf": "16325069471",
                "phone": "87999325372",
                "codServidor": 5385,
                "email": "franciscasilva20.com@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "9a6c622b-8899-4806-a379-aa0d81f26216",
                "name": "Josimar Joao de Sousa",
                "cpf": "32018550306",
                "phone": "89994289898",
                "codServidor": 3008,
                "email": "jjsimar@zipmail.com.br",
                "position": "Professor(a)",



                "institutionId": "1f0cb6c1-e074-4555-812b-378920649b71"
            },
            {
                "id": "9ac7d1e7-2b55-4aea-96d3-85283685aa45",
                "name": "Vera Lucia Pereira Ricarte",
                "cpf": "02427861464",
                "phone": "87991288611",
                "codServidor": 18811,
                "email": "verar0728@gmail.com",
                "position": "Professor(a)",



                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "9b3b2b75-0301-4397-98f8-8a8b35434384",
                "name": "Celia Maria Romao da Silva",
                "cpf": "53707109453",
                "phone": "87991568432",
                "codServidor": 7013,
                "email": "celiabraz231@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "9ba93bb9-0382-4b86-bc0a-c4c712f4d2dd",
                "name": "Kelly Daiane Sena do Vale",
                "cpf": "08387380440",
                "phone": "87991648379",
                "codServidor": 62026,
                "email": "kelly.lara1@outlook.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "9bbfd0f3-cd4e-4c3d-9bf4-8b85fe577548",
                "name": "Antonia Risoneide Barbosa da Silva Caldeira",
                "cpf": "58187065400",
                "phone": "87981213610",
                "codServidor": 49696,
                "email": "risoneideexu@outlook.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "9bff041b-111e-4275-a759-9b27ebf926fc",
                "name": "Francisco de Assis Sousa",
                "cpf": "82374740315",
                "phone": "98994301495",
                "codServidor": 1551,
                "email": "francisacau@hotmail.com",
                "position": "Professor(a)",



                "institutionId": "1f0cb6c1-e074-4555-812b-378920649b71"
            },
            {
                "id": "9ca34e89-28a8-4903-b91b-464369adda33",
                "name": "Simone Fabricio da Silva Rodrigues",
                "cpf": "05207316460",
                "phone": "87981716783",
                "codServidor": 12253,
                "email": "ssimonefabricio@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "9d735de6-b1a7-4c99-b452-9d38f67805d4",
                "name": "Silvaneide Maria Barboza",
                "cpf": "05887075465",
                "phone": "87998113940",
                "codServidor": 13279,
                "email": "silvaneidebarboza262@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "9dcb86f6-a3aa-4a6e-9514-089cfae44677",
                "name": "Josilene Macedo dos Santos",
                "cpf": "08162003436",
                "phone": "87981129484",
                "codServidor": 7200,
                "email": "josileny2010@hotmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "9dfe24fe-6a8e-4ee3-9bbe-642615ff4542",
                "name": "Girllianne Pereira de Oliveira",
                "cpf": "07472990485",
                "phone": "87981586419",
                "codServidor": 32117,
                "email": "girllianneoliveira@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "9e315f0e-52ed-4a06-9a5e-4a427b438680",
                "name": "Cicera Janielly Pereira Silva",
                "cpf": "06596343413",
                "phone": "87998082848",
                "codServidor": 12880,
                "email": "Cicerajanielly@outlook.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "9e59ba08-cc57-4fbd-9c31-0c0e21c4dfca",
                "name": "Francisco Tavares de Souza",
                "cpf": "02505149402",
                "phone": "8781116447",
                "codServidor": 11312,
                "email": "franciscotavares.21@hotmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "9e869179-516d-41f9-acf6-bebd334cd8ed",
                "name": "Maria Socorro do Carmo Sousa",
                "cpf": "04088419405",
                "phone": "8799037275",
                "codServidor": 21708,
                "email": "socorroprofessora@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "9eea6418-efe1-47d7-8965-961916ac27d1",
                "name": "Francisca Edjânia Pereira e Silva",
                "cpf": "02774477476",
                "phone": "87991410795",
                "codServidor": 51909,
                "email": "edjania.pereira23@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "9f6e71cd-0ebc-4557-8429-fb02ea689033",
                "name": "Neyla Lidiane da Cruz",
                "cpf": "05676914467",
                "phone": "87991056707",
                "codServidor": 38170,
                "email": "neyla.li.cruz@gmail.com",
                "position": "Coordenador(a)",
                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "a03d7dc9-b155-4ad3-89de-e0a0269e6e22",
                "name": "Mirene Dias da Silva",
                "cpf": "03827973457",
                "phone": "87981268953",
                "codServidor": 13396,
                "email": "mirenedias01@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "a15620ad-6852-418f-add7-7df5c7356bd2",
                "name": "Luciene Barbosa Alves Silva",
                "cpf": "97411302368",
                "phone": "87981007423",
                "codServidor": 1710,
                "email": "lucienenoke@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "a1948562-3f1f-40b5-a8d2-095b04cfa6f0",
                "name": "Cecilia Maria Rodrigues",
                "cpf": "68523386300",
                "phone": "89994616399",
                "codServidor": 52,
                "email": "ceciliarodrigues201326@hotmail.com",
                "position": "Professor(a)",



                "institutionId": "1f0cb6c1-e074-4555-812b-378920649b71"
            },
            {
                "id": "a28ef0d0-3d04-4379-b59d-8c163adb6d10",
                "name": "Jucilene Alves dos Santos",
                "cpf": "37391879568",
                "phone": "87996048964",
                "codServidor": 56067,
                "email": "jucilenealvesdossantosprof@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "a3b2a973-36b0-4372-b8a7-acbcdfde86cb",
                "name": "Jean Herllis Lacerda Paixao",
                "cpf": "04214138406",
                "phone": "87991309457",
                "codServidor": 18291,
                "email": "jeanlacerda714@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "a3b5c8d3-d0e1-4cee-802f-28f1587edad3",
                "name": "Ana Silva Nonato Andrade",
                "cpf": "04200959429",
                "phone": "8791054070",
                "codServidor": 19087,
                "email": "ananonato03@gmail.com",
                "position": "Professor(a)",



                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "a3bed3e4-94ad-44cc-a5f6-426932a7b249",
                "name": "Veronica de Oliveira Lima",
                "cpf": "02751661475",
                "phone": "87991144171",
                "codServidor": 62355,
                "email": "veronica.lima290880@gmail.com",
                "position": "Aux. Secretaria",
                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "a3df4a39-2e00-46e5-aef8-b7c88c6008a5",
                "name": "Maria Soraya Bezerra da Silva",
                "cpf": "10186240406",
                "phone": "87999590182",
                "codServidor": 12445,
                "email": "sorayabezerra6@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "a40312f5-6e18-4560-9897-91f825988d8d",
                "name": "Maria Eutimia de Moura Santos Coelho",
                "cpf": "02342909438",
                "phone": "87981538944",
                "codServidor": 16399,
                "email": "eutimiamoura@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "a44c4023-46ae-4ce5-a236-a7a58537642d",
                "name": "Alto da Boa Vista Almeida Rodrigues",
                "cpf": "71119239443",
                "phone": "87991772283",
                "codServidor": 62259,
                "email": "geneioalmeida12@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "a4bb40e2-417d-4604-be41-6fda88d80934",
                "name": "Eva Lopes de Macedo Cordeiro",
                "cpf": "03635944424",
                "phone": "87981296574",
                "codServidor": 43320,
                "email": "evamacedocordeiro@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "a4c3bcdc-07e1-4542-8d39-a0421e1df32f",
                "name": "Rosangela Francisca Damacena",
                "cpf": "02055576437",
                "phone": "87999652222",
                "codServidor": 25469,
                "email": "rosadamacena8@hotmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "a4fd5f83-641a-4a02-aecb-0a9c44230066",
                "name": "Maria Nenoza da Silva Rodrigues",
                "cpf": "94446660420",
                "phone": "87991325550",
                "codServidor": 14582,
                "email": "lia2002rodrigues@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "a5390b8f-8d2d-4cd9-8e88-d9131bd02b24",
                "name": "Sirleide Maria Alves",
                "cpf": "04535361401",
                "phone": "87999675682",
                "codServidor": 8256,
                "email": "sirleidemariaalves@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "a5593c84-077c-41aa-b060-d2b71a0b9241",
                "name": "Maria Aparecida Alves de Araujo",
                "cpf": "97871749021",
                "phone": "87981071171",
                "codServidor": 7859,
                "email": "cida1079ms@gmail.com",
                "position": "Professor(a)",

                "institutionId": "547f4c04-d8eb-4e01-b13a-e648e81de59d"
            },
            {
                "id": "a5d3067b-248e-4399-bfb8-9767d3672e42",
                "name": "Lucas Tadeu Gomes do Nascimento",
                "cpf": "10650392477",
                "phone": "87981477724",
                "codServidor": 14329,
                "email": "lucasmorais71@hotmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "a6234851-33de-4df5-a133-5c2fc771e56e",
                "name": "Francisca Eduarda Dias dos Santos",
                "cpf": "14102034412",
                "phone": "87999135249",
                "codServidor": 13546,
                "email": "es3240888@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "a62de2a5-ae92-40a5-8390-b47603c69ff6",
                "name": "Mary Rodrigues da Silva",
                "cpf": "33273090430",
                "phone": "87991061887",
                "codServidor": 21242,
                "email": "maryrodrigues7912@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "a68c4d68-e426-4681-917b-a36ac0a336c7",
                "name": "Rosalynne Carlla Lima Gomes",
                "cpf": "93564864415",
                "phone": "87999246189",
                "codServidor": 5506,
                "email": "rosalynnecarlla9@gmail.com",
                "position": "Professor (a) em Readaptação",
                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "a6d7ec1a-20aa-4047-946a-7164e61d63c2",
                "name": "Francisca Keliane Soares Pereira da Silva",
                "cpf": "10031581455",
                "phone": "87981383334",
                "codServidor": 7804,
                "email": "keylasoares234@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "a6f7b350-92d3-46a0-86f9-57f492a7786b",
                "name": "Djavan Cesar Coelho Batista",
                "cpf": "09108704465",
                "phone": "87991893003",
                "codServidor": 62063,
                "email": "djavancesar7@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "a73d10fe-966c-4619-ae8d-4350a21f1845",
                "name": "Silvana Maria de Freitas Sousa",
                "cpf": "03019581494",
                "phone": "89994121643",
                "codServidor": 1106,
                "email": "silvana_secretariado@hotmail.com",
                "position": "Professor(a)",

                "institutionId": "1f0cb6c1-e074-4555-812b-378920649b71"
            },
            {
                "id": "a802f219-8338-4b8b-aeb5-4aae060bccbc",
                "name": "Jucilene Maria de Sousa",
                "cpf": "04253300448",
                "phone": "87981239427",
                "codServidor": 2813,
                "email": "jucy_maria2013@outlook.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "a81bb598-f0e7-4858-b2ff-f4e2d1c443ed",
                "name": "Simone Barbosa Vieira Magalhães Silva",
                "cpf": "04152874481",
                "phone": "87991864579",
                "codServidor": 7552,
                "email": "simone_verbo@hotmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "a83b72a8-8422-4137-9a21-bcf5b73cec78",
                "name": "Vanilda Maria Cordeiro Nunes Romualdo",
                "cpf": "02030320471",
                "phone": "87981747290",
                "codServidor": 13393,
                "email": "vanildacordeiro73@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "a84b9070-8796-4c50-ad75-95c9a2d7374c",
                "name": "Francisca Delvania Gomes da Silva Souza",
                "cpf": "04252669405",
                "phone": "87991000597",
                "codServidor": 3911,
                "email": "delvania.souza@hotmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "a84c7f83-3276-4a39-8851-9333bbddf482",
                "name": "Kawanny Paiva Alencar",
                "cpf": "10489174442",
                "phone": "87991692216",
                "codServidor": 53143,
                "email": "Kawannyalencar123@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "a8e2fb2a-1cdb-4965-8f6d-b7b86732fb9d",
                "name": "Nubia Brilhante Dias",
                "cpf": "02098910410",
                "phone": "89994112594",
                "codServidor": 38925,
                "email": "nubia03brilhante@gmail.com",
                "position": "Aux. Administrativo",
                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "a9319017-8674-43d3-8860-96dd13a21ca2",
                "name": "Marinalva de Lima",
                "cpf": "01962192482",
                "phone": "87996224257",
                "codServidor": 16342,
                "email": "loremelk93@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "a9ab8375-711e-4457-8b72-e0fbbbba8631",
                "name": "Lucelia Lima Marques",
                "cpf": "04833810476",
                "phone": "87981642542",
                "codServidor": 28106,
                "email": "lucelialimamarqueslima@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "a9ae371c-7b28-4506-9864-03e2291d66dd",
                "name": "Cicero Ivanildo Regis do Nascimento",
                "cpf": "03896346466",
                "phone": "87996260749",
                "codServidor": 8360,
                "email": "eletropecas_regis@hotmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "a9d872c3-7c80-4c0c-a577-89988169c671",
                "name": "Maria Jose Moraes Holanda",
                "cpf": "09907191469",
                "phone": "87991523213",
                "codServidor": 53212,
                "email": "mariamoraes062@gmail.coM",
                "position": "PROFESSOR(A)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "a9e897e7-ae38-41f6-8c36-eb77b64f8792",
                "name": "Francisca Alves Bezerra Gomes",
                "cpf": "02991495448",
                "phone": "87981202642",
                "codServidor": 9657,
                "email": "francienebezerra2018@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "aa5c3e77-a67a-4b78-b860-83aae8472c12",
                "name": "Maria da Penha de Lima Gomes",
                "cpf": "50698605420",
                "phone": "87981266524",
                "codServidor": 5041,
                "email": "penhalima2013@outlook.com",
                "position": "Professor(a)",



                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "aaa132a9-83ab-4fac-9f16-1e555b13ad73",
                "name": "Madjane de Oliveira Silva",
                "cpf": "08195860486",
                "phone": "87996126963",
                "codServidor": 13045,
                "email": "madjaneoliveira99@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "ab00b223-6eff-4789-a84b-0901dd5ce212",
                "name": "Regiane Silva Souza",
                "cpf": "11060406438",
                "phone": "87998248165",
                "codServidor": 24322,
                "email": "regianesilva0309@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "ab596251-56f0-4caa-b9ab-1e159ae6034d",
                "name": "Maria do Socorro Dantas",
                "cpf": "90099087472",
                "phone": "89994526265",
                "codServidor": 23159,
                "email": "dantasmariadosocorro105@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "ab6f0345-e834-4934-9682-6d7392c5723b",
                "name": "Raimundo Rodrigues de Macedo Neto #1",
                "cpf": "77553039349",
                "phone": "89994151950",
                "codServidor": 1628,
                "email": "netimgiirlene1820@gmail.com",
                "position": "Professor(a)",



                "institutionId": "1f0cb6c1-e074-4555-812b-378920649b71"
            },
            {
                "id": "ab839217-cc32-4e74-8c2e-c0399fbc21b1",
                "name": "Linarda de Sena Silva",
                "cpf": "02981528432",
                "phone": "87991734778",
                "codServidor": 26931,
                "email": "linardasena@hotmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "abb6faa6-c5c1-406d-a63c-9da57759d2bf",
                "name": "Rosylene Alvino Modesto",
                "cpf": "57193657453",
                "phone": "87991709531",
                "codServidor": 28367,
                "email": "rosylenealvino@bol.com.br",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "abd92a81-684b-4a99-ae46-56d9d1b2ea01",
                "name": "Marineide Neri de Oliveira Silva",
                "cpf": "90256557420",
                "phone": "87991482955",
                "codServidor": 32993,
                "email": "nerideoliveirasilvam@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "acabc3c1-b75b-43f0-97e4-d7624406c5ba",
                "name": "Tarcila Kataliane Dias Silva",
                "cpf": "04277016430",
                "phone": "87991725500",
                "codServidor": 38500,
                "email": "tarcila_kataliane@hotmail.com",
                "position": "Coordenador(a)",
                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "ad2cc962-193f-41a2-82b7-f7d8fc7f97eb",
                "name": "Raquel de Jesus Sena",
                "cpf": "91284007391",
                "phone": "87991311054",
                "codServidor": 26934,
                "email": "raquel.sena@prof.edu.araripina.pe.gov.br",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "adcdee14-acc0-45cd-a950-eedd0df64043",
                "name": "Mariana de Queiroz Silva",
                "cpf": "12194696709",
                "phone": "87999205135",
                "codServidor": 12218,
                "email": "queirozmariana@39gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "adf75a05-4a2a-4d00-9803-25af0bea9922",
                "name": "Maria Noelia Leite da Silva",
                "cpf": "07396919452",
                "phone": "87981776036",
                "codServidor": 2411,
                "email": "milknoelhita@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "ae3ee7a8-fe46-4075-973b-95ea58012cad",
                "name": "Maria do Socorro Andrade dos Santos",
                "cpf": "37020717845",
                "phone": "87991040535",
                "codServidor": 46582,
                "email": "socorroandrade@gmail.com",
                "position": "AUXILIAR DE SALA",
                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "ae70bfed-c686-4ddc-be18-eae6f3cffbe9",
                "name": "Maria Das Graças Dantas de Andrade",
                "cpf": "35989807449",
                "phone": "87991596470",
                "codServidor": 49651,
                "email": "gracadantas1962@gmail.com",
                "position": "Secretário(a)",
                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "aeb57938-e4f0-4bee-aafc-4b1411f30bf7",
                "name": "Maria Francinete Ferreira Souza",
                "cpf": "42143519400",
                "phone": "87996708052",
                "codServidor": 857,
                "email": "neidecunha324@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "aec0967e-2b7e-4262-aa4b-db7b667aae4f",
                "name": "Mairam Auzenir Rodrigues",
                "cpf": "66562104572",
                "phone": "89994067553",
                "codServidor": 312,
                "email": "mai.ram@hotmail.com",
                "position": "Professor(a)",

                "institutionId": "1f0cb6c1-e074-4555-812b-378920649b71"
            },
            {
                "id": "af110678-90bb-416b-85f7-b3149f4aa7dd",
                "name": "Eliane de Oliveira Torres",
                "cpf": "03649144409",
                "phone": "87991106458",
                "codServidor": 24249,
                "email": "eli9oliveira9@hotmail.com",
                "position": "Professor(a)",
                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "af3b9977-b8d7-4b29-a9fa-286a0469a788",
                "name": "Weydson da Silva Souza",
                "cpf": "08645641470",
                "phone": "87991231180",
                "codServidor": 61914,
                "email": "weydsonararipina@hotmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "af9cb1bb-5e08-4523-840a-72d15c7e3edd",
                "name": "Alexsandra Araujo Santos Sousa",
                "cpf": "04471950428",
                "phone": "87991409443",
                "codServidor": 40016,
                "email": "araujoalexsandra574@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "afa66b87-f939-40e2-bfb3-5a6291438b6e",
                "name": "Maria Claudijania da Silva",
                "cpf": "09031844438",
                "phone": "87981596841",
                "codServidor": 7639,
                "email": "klaudyjaniab@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "afb47b4b-99e6-4cf8-b86d-6bd8437bef90",
                "name": "Maria Magna Bezerra de Lima",
                "cpf": "05157969481",
                "phone": "87981610809",
                "codServidor": 7164,
                "email": "magnalyma@hotmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "b0157213-1499-4854-9bcf-24e7ad61496b",
                "name": "Maria Aparecida Alves de Araujo",
                "cpf": "01024502422",
                "phone": "87981071171",
                "codServidor": 7859,
                "email": "cida1979ma@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "b0b6da31-2c0d-42f7-955a-e09e091e477c",
                "name": "Rejane Silva Carvalho",
                "cpf": "06424323414",
                "phone": "87991310314",
                "codServidor": 18360,
                "email": "rejanesilva495@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "b0ca05ab-b038-4e0c-8b17-a1816136a052",
                "name": "Maria Verdejane Pereira Santos",
                "cpf": "05237706428",
                "phone": "87991038522",
                "codServidor": 54170,
                "email": "mariaverdejane@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "b0d84c72-b139-4522-9ec9-496c14079abd",
                "name": "Maria Deusaneide Rufino da Silva",
                "cpf": "04652345429",
                "phone": "87992075747",
                "codServidor": 28767,
                "email": "m.desusaneide019@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "b0f9d4a9-dbb8-401f-9ee8-8103c593ed0e",
                "name": "Vandilene de Souza",
                "cpf": "03403191435",
                "phone": "8781564539",
                "codServidor": 11053,
                "email": "vandilene55@gmail.com",
                "position": "Professor(a)",



                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "b1a27b30-8a7c-477a-b185-69073fc1d4ab",
                "name": "Juscivania Pereira de Carvalho",
                "cpf": "05431598414",
                "phone": "8791366701",
                "codServidor": 49065,
                "email": "Juscivaniacarvalho23@gmail.com",
                "position": "Aux. Secretaria",
                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "b20b5b4c-3928-49cc-a94a-1f1f99f79c64",
                "name": "Lourival Mesquita Souza",
                "cpf": "66160863215",
                "phone": "87996514414",
                "codServidor": 34200,
                "email": "lourivalmsousa@hotmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "b25a1db9-f902-469c-aa5d-d49a035cd0c4",
                "name": "Patricia do Nascimento Moura Silva",
                "cpf": "07286938444",
                "phone": "08791457352",
                "codServidor": 26021,
                "email": "patricia.educamoura@hotmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "b2bf0498-053d-48ea-9d08-40ccd345ce7d",
                "name": "Marcos Paulo de Sousa",
                "cpf": "91837960372",
                "phone": "89994043683",
                "codServidor": 23361,
                "email": "pauloprofessor@gmail.com",
                "position": "Professor(a)",
                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "b32b58e8-b83b-4b12-8025-ecc1613b4f15",
                "name": "Mariane Freitas Cabral",
                "cpf": "16596059464",
                "phone": "87996264845",
                "codServidor": 19395,
                "email": "arianeribeiro156@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "b3557ccc-b4fa-414d-aaee-f2414fb8666a",
                "name": "Taine Pereira Araujo",
                "cpf": "11807797465",
                "phone": "87998047763",
                "codServidor": 6115,
                "email": "ARAUJOTAINE138@GMAIL.COM",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "b38d14c4-dbb0-4f69-9b39-f889b90ed349",
                "name": "Angela Maria Lima de Oliveira Araujo",
                "cpf": "35027177372",
                "phone": "87992001136",
                "codServidor": 19756,
                "email": "angelalimbat03@gmail.com",
                "position": "Professor(a)",



                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "b47fdd1b-d152-40a2-a72b-f2de75cdb5ca",
                "name": "Marenilvia Lopes Alves",
                "cpf": "02775124410",
                "phone": "87991450494",
                "codServidor": 21790,
                "email": "marenilvalopes@hotmail.com",
                "position": "Professor(a)",
                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "b4f10ffd-6ebe-4051-8173-63387e9a1539",
                "name": "Maria Aparecida Ramalho",
                "cpf": "02232157407",
                "phone": "8791163448",
                "codServidor": 30646,
                "email": "aparecidaramalhoara@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "b501be0e-71ea-4182-99ab-c92d910a190c",
                "name": "Jucielma Leite Alves",
                "cpf": "08162004408",
                "phone": "87981665162",
                "codServidor": 7769,
                "email": "jucielmamilk@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "b5171187-b640-41e6-965c-671a35602b42",
                "name": "Ana Claudia Nunes Batista Silva",
                "cpf": "56263864400",
                "phone": "87991360104",
                "codServidor": 6747,
                "email": "anacnbs@hormail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "b5294376-2d04-4a67-a220-6c9f36bda989",
                "name": "Leonaria dos Santos Nascimento",
                "cpf": "15538579417",
                "phone": "87981713553",
                "codServidor": 14114,
                "email": "leonarya097@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "b548c65f-9e62-4454-a7ec-bbd2b3a20129",
                "name": "Judite Regis Cavalcante",
                "cpf": "06178763476",
                "phone": "87981287524",
                "codServidor": 59555,
                "email": "juditereges1@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "b571bc8a-a412-4f3c-8ca5-2512aba12d6d",
                "name": "Luana Raquel Lima Sousa",
                "cpf": "10329922475",
                "phone": "87991211856",
                "codServidor": 32326,
                "email": "luanaalice14lima@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "b5b3eecd-3239-4078-9a2a-77e59aecf4b5",
                "name": "Francinete da Silva Santos",
                "cpf": "10006162401",
                "phone": "89994110962",
                "codServidor": 40201,
                "email": "franfrancinetesilvafran@outllok.com.br",
                "position": "Professor(a)",
                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "b603fe1b-236e-4b5b-a934-d346c42209bd",
                "name": "Maria Lindinauva Pereira Gomes de Moura",
                "cpf": "22032843404",
                "phone": "87999989775",
                "codServidor": 4995,
                "email": "nauvagomesmoura@vmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "b63f2c56-5af1-4acf-aed5-fb2e82b0d8c2",
                "name": "Alana Mara Gomes Silva Cruz",
                "cpf": "09713711483",
                "phone": "87996089069",
                "codServidor": 24318,
                "email": "laramaepyetra2013@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "b6562c36-a25a-4d5b-a078-465e8a9bf123",
                "name": "Antonia Cristina Lima",
                "cpf": "05753067425",
                "phone": "8791599397",
                "codServidor": 9345,
                "email": "limacristina089@gmail.coM",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "b67b3388-ca1a-4a4b-98cf-c03ba6a2adeb",
                "name": "Gescica Batista de Souza",
                "cpf": "10426145470",
                "phone": "87981282038",
                "codServidor": 6999,
                "email": "gescica2015@outlook.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "b6d2cd1f-47ed-42e6-a4ad-4d0d5240d594",
                "name": "Anailton de Sousa Araujo",
                "cpf": "04970399409",
                "phone": "87988683761",
                "codServidor": 62665,
                "email": "anailtonsousaaraujo33@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "b6dc93c8-2c55-44bc-8d41-2fd47b080eea",
                "name": "Maria de Fatima Muniz Batista",
                "cpf": "41954653468",
                "phone": "87992538670",
                "codServidor": 45763,
                "email": "estcesar_mb@outlook.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "b6e79f50-33df-487a-935d-722e298ec0b8",
                "name": "Francisca Paula Goncalves da Silva",
                "cpf": "06183081485",
                "phone": "87981761569",
                "codServidor": 22453,
                "email": "paulinha.18.juan@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "b75b4585-cf55-4996-bd28-689954dc96b4",
                "name": "Andreia Severiano Modesto Soares",
                "cpf": "02579907475",
                "phone": "87991051010",
                "codServidor": 5888,
                "email": "andreiasmsoares@hotmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "b7690af6-9dc7-4705-92b5-17b47d59392e",
                "name": "Sonia Maria de Carvalho Oliveira",
                "cpf": "00039856445",
                "phone": "87991181763",
                "codServidor": 33145,
                "email": "scsoninha17@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "b79598cb-df35-4108-a1b7-bc2ab7daa65c",
                "name": "Jose Jaildo Pereira da Silva",
                "cpf": "05509976446",
                "phone": "87991061535",
                "codServidor": 51329,
                "email": "jaidohand@yahoo.com.br",
                "position": "Professor(a)",
                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "b7f7ef08-e8b2-415e-a9e7-1c9d2b1dc0f4",
                "name": "Marcleane Nasiazene de Sousa",
                "cpf": "77038118234",
                "phone": "87981582548",
                "codServidor": 41701,
                "email": "marcleanenasizenemn@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "b8327078-b3ea-4465-b418-a88c724aa7dd",
                "name": "Simone da Silva Queiroz",
                "cpf": "10414214439",
                "phone": "87981453137",
                "codServidor": 15194,
                "email": "simone.queiroz@prof.edu.araripina.pe.gov.br",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "b85214f3-532b-4493-83c4-10742ff37ba2",
                "name": "Danubia Menezes Cordeiro",
                "cpf": "05508024441",
                "phone": "87991099482",
                "codServidor": 2536,
                "email": "danubia.cea@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "b8933a4d-fd34-41db-b3fa-ccbe2c8ed66a",
                "name": "Maria Aucirene Araújo Pacheco",
                "cpf": "02730366458",
                "phone": "87991078400",
                "codServidor": 37354,
                "email": "tieniaraujo@gmail.com",
                "position": "Secretário(a)",
                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "b9835dda-e8f2-44a7-a136-b3d970ad213f",
                "name": "Lusangela Cordeiro Pinto Lacerda",
                "cpf": "00894073427",
                "phone": "87981163520",
                "codServidor": 25327,
                "email": "lusangelacpinto@outlook.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "b9d96cf3-2a22-45b1-a24f-33b8e483a44f",
                "name": "Pedro Lucas da Silva",
                "cpf": "70513146458",
                "phone": "87991553942",
                "codServidor": 62633,
                "email": "pedro2013.pe@outlook.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "b9e3527a-8a3b-46b7-b923-1719a49db555",
                "name": "Geremias de Sousa Rodrigues",
                "cpf": "07404169364",
                "phone": "87999999999",
                "codServidor": 4704,
                "email": "jabrinde@gmail.com",
                "position": "Facilitador(a)",



                "institutionId": "1f0cb6c1-e074-4555-812b-378920649b71"
            },
            {
                "id": "ba1151ae-c544-49bc-a179-b28b58357e52",
                "name": "Maria Wilmara de Souza",
                "cpf": "02442158477",
                "phone": "87981538333",
                "codServidor": 2375,
                "email": "professorawilmara@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "ba1fafdb-a47d-41da-a7f0-bda604c1efd2",
                "name": "Franciete da Silva Macedo",
                "cpf": "12634146485",
                "phone": "87999289165",
                "codServidor": 12148,
                "email": "francietesilva300@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "baebad4a-e497-437f-bf24-6f8ff53b14dc",
                "name": "Maria Erica de Oliveira",
                "cpf": "05271676498",
                "phone": "87996276235",
                "codServidor": 17051,
                "email": "mariaerica1984@hotmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "baee99cd-087a-4596-acfb-6114bfaedb33",
                "name": "Rosa Lucia de Sousa Coelho",
                "cpf": "85519650349",
                "phone": "89994198100",
                "codServidor": 35,
                "email": "rosaluciac13@hotmail.com",
                "position": "Professor(a)",



                "institutionId": "1f0cb6c1-e074-4555-812b-378920649b71"
            },
            {
                "id": "bb1bfb04-dd6a-465c-b958-eb944dc6d8e4",
                "name": "Damião José Oliveira Santos",
                "cpf": "11171491450",
                "phone": "87991738609",
                "codServidor": 53131,
                "email": "damyaojozze@gmail.com",
                "position": "Professor(a)",
                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "bb3e0118-ef1d-4f25-b9f0-f4f548fe6a83",
                "name": "Rubensmaria Lima Arruda",
                "cpf": "04009988401",
                "phone": "87991110083",
                "codServidor": 13664,
                "email": "jednaldo1968@hotmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "bb446e1b-1d80-4788-a022-dbc365b010cb",
                "name": "Francisca Mariane Pereira da Silva",
                "cpf": "70935164405",
                "phone": "87998181572",
                "codServidor": 10726,
                "email": "maryanesilva631@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "bb6704b1-74e8-457e-9527-ef8e3ec42081",
                "name": "Maria Nazare de Almeida Moura",
                "cpf": "39658082300",
                "phone": "89994438443",
                "codServidor": 85,
                "email": "nazare.almeida2011@hotmail.com",
                "position": "Professor(a)",



                "institutionId": "1f0cb6c1-e074-4555-812b-378920649b71"
            },
            {
                "id": "bba9108d-7744-4c00-b4c0-4b7ce42da05d",
                "name": "Maria Cristina Delmondes Nascimento",
                "cpf": "06743858455",
                "phone": "87991813612",
                "codServidor": 37122,
                "email": "professoracristinadel@gmail.com",
                "position": "Coordenador(a)",
                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "bc188360-f56e-4db6-b425-3c446eeffcfa",
                "name": "Elaine Cristina de Oliveira Santos Ferreira",
                "cpf": "05983059475",
                "phone": "87981446905",
                "codServidor": 25062,
                "email": "cristinamaria5489@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "bc84b8a4-b194-40c1-b9ca-586feb859d4b",
                "name": "Celso Dias Carvalho",
                "cpf": "13058165447",
                "phone": "87991137061",
                "codServidor": 56985,
                "email": "celsotik7@gmail.com",
                "position": "Professor(a)",
                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "bca0dabe-3eb1-4241-9dd8-da58531a0a3e",
                "name": "Victor Gleuber de Lima Silva",
                "cpf": "12400469440",
                "phone": "87991452195",
                "codServidor": 46942,
                "email": "gleubervictor07@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "bca3b905-0ecd-4ebf-ae2d-3b7c77a9509a",
                "name": "Luana Diniz da Silva",
                "cpf": "09720091401",
                "phone": "87981374564",
                "codServidor": 8787,
                "email": "luanadinizdasilva01@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "bd13b58b-490a-49b0-95ef-1998d49d156e",
                "name": "Poliana Coelho Dias Goncalves",
                "cpf": "04922308466",
                "phone": "87981649723",
                "codServidor": 16623,
                "email": "vilsonpoliana@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "bd76653d-ff9d-4b93-afd9-1bb79fa1316d",
                "name": "Maria Paloma de Jesus Silva",
                "cpf": "10961521422",
                "phone": "87991909911",
                "codServidor": 55351,
                "email": "palomaprof2024@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "bd9abea6-875a-4701-a7fe-6095c1a5b5d4",
                "name": "Jadna Ellen Santos Araujo",
                "cpf": "13609392452",
                "phone": "87996570699",
                "codServidor": 10529,
                "email": "jadnaellen105@hotmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "bdd53ec6-d32f-43d9-8650-a675ef44d933",
                "name": "Alan Cleveston",
                "cpf": "11453132481",
                "codServidor": 49651,
                "email": "gracadantas1962@gmail.com",
                "position": "Secretário(a)",
                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "be400a79-f811-4989-8b6e-d2af518939de",
                "name": "Valeria de Figueredo Almeida",
                "cpf": "07972735492",
                "phone": "87991245197",
                "codServidor": 30780,
                "email": "valeriafigueredoalmeida@gmail.com",
                "position": "Professor(a)",
                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "bea01fbc-c4d9-43d7-9621-fefba0cc20c6",
                "name": "Maria da Penha Eliete de Sousa Oliveira",
                "cpf": "36767999415",
                "phone": "87991326555",
                "codServidor": 21513,
                "email": "m.penhaeliete@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "bea0af5a-9588-41dd-8d46-31bea8527988",
                "name": "André Lucas Barreto Gomes",
                "cpf": "12152333454",
                "phone": "87999485561",
                "codServidor": 62039,
                "email": "andrelucas-barreto@hotmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "beafc660-d5c9-4ada-95ef-e353b2043103",
                "name": "Francisca Auricelia da Silva Matias Alencar",
                "cpf": "04105979450",
                "phone": "87992129071",
                "codServidor": 40415,
                "email": "aurimatias2018@gmail.com",
                "position": "Diretor(a)",
                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "beb06205-10e0-4002-808f-b6038eb17605",
                "name": "Maria Alice Silva Andrade Jaco",
                "cpf": "02132091447",
                "phone": "08791033589",
                "codServidor": 13683,
                "email": "malicenonato03@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "bf9cc5af-7125-4a10-87c2-85eb3f62bc15",
                "name": "Silverlene Reis Santos",
                "cpf": "91285984315",
                "phone": "89999302313",
                "codServidor": 36665,
                "email": "silverlene.santos@prof.edu.araripina.pe.gov.br",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "bff2f17d-db88-4429-9b2e-5a780f87077d",
                "name": "Salome Teixeira Paulino",
                "cpf": "93549237472",
                "phone": "87996507488",
                "codServidor": 31640,
                "email": "bebelloba28@hotmail.com",
                "position": "Professor(a)",
                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "c0c03234-3e10-439c-aca4-39d7ad2cf09b",
                "name": "Kerolaik Mireai dos Santos Nunes",
                "cpf": "46774373860",
                "phone": "87996065977",
                "codServidor": 19380,
                "email": "mireaik.diota@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "c1001fd7-7838-4124-87f9-8bce3362aac7",
                "name": "Welma Silva Modesto Lima",
                "cpf": "08714907496",
                "phone": "87991112358",
                "codServidor": 54126,
                "email": "welmasilvamodesto@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "c18ffa22-6bc9-4323-a012-61ed2a6df057",
                "name": "Maria Jaildes de Lima",
                "cpf": "02713503426",
                "phone": "87991123814",
                "codServidor": 3706,
                "email": "mariajaildeslima23@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "c1a281fa-ea1d-4035-a664-7c25aceccf35",
                "name": "Francisca Aline Alencar Coelho",
                "cpf": "09400203438",
                "phone": "87981439228",
                "codServidor": 10017,
                "email": "aline.allencar5@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "c21da455-f5f4-4d66-930c-af576b726070",
                "name": "Raquel da Silva Soares Gonçalves",
                "cpf": "10792964411",
                "phone": "87991029432",
                "codServidor": 62051,
                "email": "raquelsoaressilva31@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "c26286d7-8b39-40fd-98be-c388c248af28",
                "name": "Ana Clecia de Albuquerque e Silva",
                "cpf": "03091646483",
                "phone": "87991742804",
                "codServidor": 19240,
                "email": "anacleciaprofessora2018@gmail.com",
                "position": "Professor(a)",



                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "c2b09f49-9eac-40a3-9983-bc4ff7be65be",
                "name": "Janaete Cabral Feitoza",
                "cpf": "07573468474",
                "phone": "87999737574",
                "codServidor": 19322,
                "email": "janaetecabral@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "c39885e9-209b-4324-9e5e-677c247f3542",
                "name": "Maria Diva da Silva Rodrigues",
                "cpf": "03956507479",
                "phone": "87992029068",
                "codServidor": 22346,
                "email": "mariadivac1@hotmail.com",
                "position": "Professor(a)",
                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "c3c7a1ac-ed17-4515-b686-5d52b375dba4",
                "name": "Adriana de Araujo Santos",
                "cpf": "08658305414",
                "phone": "87991873423",
                "codServidor": 45880,
                "email": "araujiadriana06@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "c40482d4-c994-4188-9176-b86f4587baa1",
                "name": "Leiliane da Costa Santos Rodrigues",
                "cpf": "04782576358",
                "phone": "89994352761",
                "codServidor": 3501,
                "email": "leylyane43@hotmail.com",
                "position": "Professor(a)",



                "institutionId": "1f0cb6c1-e074-4555-812b-378920649b71"
            },
            {
                "id": "c4294830-71c4-4c97-826d-ee6bf40e58ea",
                "name": "Cássia Kely Guimaraes Batista",
                "cpf": "08531799481",
                "phone": "87991261061",
                "codServidor": 58735,
                "email": "cassiakely10@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "c4a7af25-5a5c-42f6-b4ab-e02981e8b9d8",
                "name": "Denilra Aureliano da Silva",
                "cpf": "65630726404",
                "phone": "87991156003",
                "codServidor": 4294,
                "email": "sdenilra@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "c4aac0bc-3696-49f5-b32b-ca3d37841fb3",
                "name": "Cleidnilde Maria de Jesus Silva",
                "cpf": "96346779400",
                "phone": "87981494768",
                "codServidor": 14736,
                "email": "escoladionisiobom@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "c5660ae9-40c3-4432-8429-fc3cbbb4c76b",
                "name": "Alanna de Lima Bispo Albuquerque",
                "cpf": "01204695458",
                "phone": "87981793493",
                "codServidor": 57091,
                "email": "alanna.lima@edu.araripina.pe.gov.br",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "c5914696-eebc-4b30-a49b-06ca6e77331b",
                "name": "Airan Morais Pinheiro",
                "cpf": "03109352451",
                "phone": "87981146702",
                "codServidor": 9229,
                "email": "airan.pinheiro2016@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "c5d21230-3cc6-4e78-85f7-2b58012968ce",
                "name": "Maria Naiclê dos Santos Ferreira Cruz",
                "cpf": "07050927473",
                "phone": "87991570194",
                "codServidor": 40292,
                "email": "Naiclesantos@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "c6625cea-09f3-40e4-b60c-b51ea82f2edf",
                "name": "Maria Aparecida do Nascimento Bem",
                "cpf": "02046866444",
                "phone": "87991223346",
                "codServidor": 23855,
                "email": "aparecidanascimento3@hotmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "c67313ec-d5b8-40f0-af81-2e5da67033d2",
                "name": "Maria Simone Lacerda Dias",
                "cpf": "07668561439",
                "phone": "8799189580",
                "codServidor": 1126,
                "email": "simonelacerdadiasvg@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "c67f7456-2d1e-4941-b63f-c5a526bd1442",
                "name": "Maria Agna de Morais Silva",
                "cpf": "11207899402",
                "phone": "87981287813",
                "codServidor": 1394,
                "email": "moraisagna43@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "c6b9d3b6-0559-4568-a288-9f26f9e0cf6a",
                "name": "Alany Adrija Pereira",
                "cpf": "08544307418",
                "phone": "87996018356",
                "codServidor": 18823,
                "email": "alanyadrija2010@hotmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "c6e58993-09df-4906-95e1-d75259a2b756",
                "name": "Bruna Aparecida de Oliveira Silva",
                "cpf": "05842222469",
                "phone": "87991637890",
                "codServidor": 62028,
                "email": "Bruna.ao1105@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "c70422c3-4c51-4e1f-bb0f-a336350da6cb",
                "name": "Josilene Barros Cavalcante",
                "cpf": "04582614400",
                "phone": "87999784686",
                "codServidor": 3506,
                "email": "barrosjosilene675@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "c7f61199-e8c8-436b-8bb0-6e48b16dd65b",
                "name": "Ranilson Rodrigues de Macedo",
                "cpf": "05624643365",
                "phone": "89981489763",
                "codServidor": 5218,
                "email": "rrmacedo44@gmail.com",
                "position": "Professor(a)",



                "institutionId": "1f0cb6c1-e074-4555-812b-378920649b71"
            },
            {
                "id": "c890e9a8-2f72-4a36-a22f-9174eeae239f",
                "name": "Darlene da Conceicao Silva",
                "cpf": "03458161457",
                "phone": "87991000643",
                "codServidor": 50833,
                "email": "darlenyararipina@hotmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "c8c4f8b5-9b0d-4605-86e5-490f1c79d0a2",
                "name": "Maria Rita do Nascimento Silva",
                "cpf": "13517776459",
                "phone": "87999646736",
                "codServidor": 4031,
                "email": "nmariarita428@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "c8d4976e-e05b-4c7e-b6fc-a58fd4a7880f",
                "name": "Solange Maria de Souza",
                "cpf": "03500727441",
                "phone": "87996049348",
                "codServidor": 14424,
                "email": "solms0895@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "c9b98732-0018-4f17-840e-2710dfc7c1b5",
                "name": "Rita de Andrade Souza",
                "cpf": "04247365436",
                "phone": "87981152357",
                "codServidor": 10876,
                "email": "ritandrade1981@hotmail.com",
                "position": "Diretor(a)",
                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "c9d5c1bf-9c68-4a10-aec3-9df64452e6aa",
                "name": "Maria Das Graças Marques Pereira",
                "cpf": "03549627440",
                "phone": "87981112219",
                "codServidor": 52535,
                "email": "mariadasgracasmarquespereira9@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "ca197e83-a5c8-48f0-a8b4-b77b7d555935",
                "name": "Aparecida da Silva Flor",
                "cpf": "09416516490",
                "phone": "87996495520",
                "codServidor": 13231,
                "email": "floraparecida70@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "cac24211-19aa-4cb5-bd40-79e69c41fcaf",
                "name": "Blissei Elida de Carvalho da Silva",
                "cpf": "10795842422",
                "phone": "87998276246",
                "codServidor": 13100,
                "email": "carvalhoblissei@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "cac58d60-c83d-40f3-a39a-337102215b83",
                "name": "Erica Millene da Silva Freire",
                "cpf": "11264203446",
                "phone": "87999723173",
                "codServidor": 19356,
                "email": "erica.millene2606@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "cbb7b58a-4262-474d-8a7c-e63bd87fcbe5",
                "name": "Silvana Pereira da Silva Goncalves",
                "cpf": "08691080426",
                "phone": "8788328184",
                "codServidor": 33327,
                "email": "spereiradasilvagoncalves@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "cc4370a6-4cd4-44a8-adde-390eb0b8fce0",
                "name": "Lucicleide Jaques Coelho",
                "cpf": "03539095489",
                "phone": "87992086184",
                "codServidor": 20885,
                "email": "lucicleidejaques3015@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "cca75665-f4e5-4d0c-a690-45277e5fad47",
                "name": "Francisca Edimaria Taveira de Souza",
                "cpf": "15442413488",
                "phone": "87981737551",
                "codServidor": 7881,
                "email": "souzaedimaria840@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "ccb289ec-85d2-4874-97ac-e4b04b861955",
                "name": "Josefa Izabel Rodrigues",
                "cpf": "01101370351",
                "phone": "89994602194",
                "codServidor": 952,
                "email": "zefinha2021isr@gmail.com",
                "position": "Professor(a)",
                "institutionId": "1f0cb6c1-e074-4555-812b-378920649b71"
            },
            {
                "id": "ccd3d08e-3f6d-4660-a2ec-0b2d68eb0687",
                "name": "Cirley Regina de Souza Carvalho",
                "cpf": "04471932446",
                "phone": "87991545758",
                "codServidor": 32083,
                "email": "rc302220@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "cd33c90e-bcb9-4de6-8bd0-ecd4ca5d3b47",
                "name": "Edicleia Feitosa de Carvalho Oliveira",
                "cpf": "07450657406",
                "phone": "87991978898",
                "codServidor": 36373,
                "email": "feitosaedicleia39@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "cd39286d-cebb-4735-94ff-1bf3a85fa3f0",
                "name": "Maria da Conceição Cordeiro da Cruz",
                "cpf": "02291243489",
                "phone": "87981550522",
                "codServidor": 3073,
                "email": "maria.2020.cordeiro123@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "cda01b12-7f9c-4736-bb88-3eef7050bbad",
                "name": "Francisco Neri de Sousa",
                "cpf": "06318868429",
                "phone": "87992105335",
                "codServidor": 38553,
                "email": "nerythayla@gmail.com",
                "position": "Secretário(a)",
                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "cda55328-58cd-4b6c-8a13-5df06251831f",
                "name": "Veraneide Alves de Sousa",
                "cpf": "85770787449",
                "phone": "87991154738",
                "codServidor": 47,
                "email": "veraneidealves2@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "cdbb3060-bdb6-40d0-a2bc-d409d008cf0a",
                "name": "Generlan Coelho dos Reis",
                "cpf": "02912049458",
                "phone": "87991831810",
                "codServidor": 50552,
                "email": "generlanprofessor@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "ce16ebba-8f31-47bc-a54d-21bf8eabcabe",
                "name": "Francisca da Purificacao Costa",
                "cpf": "05140193442",
                "phone": "87991961839",
                "codServidor": 13935,
                "email": "costafrancisca293@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "ce2f7fa4-5b5d-4801-92be-78adf7dc3d44",
                "name": "Anailka Paula Soares Cordeiro",
                "cpf": "04505806448",
                "phone": "87981363793",
                "codServidor": 22105,
                "email": "anailka.paula@yahoo.com",
                "position": "Diretor(a)",
                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "ce3b91d0-cf49-4c70-9e88-c08b6474074c",
                "name": "Erasma de Jesus Andrade",
                "cpf": "05706852499",
                "phone": "87991085445",
                "codServidor": 42720,
                "email": "erasmaandrade55@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "ce5ac178-f348-46e5-bfb8-637d6c2bd8ad",
                "name": "Erica Naiane Rodrigues Silva Ferreira",
                "cpf": "11777293421",
                "phone": "87999299537",
                "codServidor": 12712,
                "email": "naianeferreira511@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "ced8f01b-5240-47ee-ae3e-81887ade0a40",
                "name": "Irone Gilberto de Sousa",
                "cpf": "00148740324",
                "phone": "87991767509",
                "codServidor": 62069,
                "email": "ironegilberto@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "cefb9655-7d3c-4958-8029-16aace6821d4",
                "name": "Eugenia Evangelista Salustiano",
                "cpf": "95068830330",
                "phone": "89994324251",
                "codServidor": 1119,
                "email": "eugenia-evange@hotmail.com",
                "position": "Professor(a)",



                "institutionId": "1f0cb6c1-e074-4555-812b-378920649b71"
            },
            {
                "id": "cf1887b1-c3c9-45c5-9d5d-0c5f5a1741b9",
                "name": "Josimar Cardoso Campos",
                "cpf": "06012988451",
                "phone": "89994520132",
                "codServidor": 23558,
                "email": "josimaridc@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "cf2fe2c8-1553-4e1a-9b0c-6cc8087b8c82",
                "name": "Gesiany Ferreira da Silva",
                "cpf": "06001059462",
                "phone": "87996004097",
                "codServidor": 13285,
                "email": "ferreiragesiany35@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "cfcfd76d-c4e0-453b-a768-bb7014a53cd0",
                "name": "Crisnacleuton de Macedo Silva",
                "cpf": "01413407463",
                "phone": "87991781122",
                "codServidor": 36468,
                "email": "crisnacleuton@gmail.com",
                "position": "Professor(a)",
                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "d0a07e84-8e2f-4715-8a20-616f659e4382",
                "name": "Josimeire Rodrigues Lopes Coelho",
                "cpf": "07508020499",
                "phone": "87981608298",
                "codServidor": 13402,
                "email": "josimeirelopesc@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "d132b0f4-505b-4537-9d00-45a933a12057",
                "name": "Damiana Daniela Vieira Fabricio",
                "cpf": "09741166451",
                "phone": "87981600516",
                "codServidor": 62981,
                "email": "daniela-fabricio@hotmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "d14ffea5-a752-4dfe-b89d-d06fba7a4b51",
                "name": "Poliany Oliveira Silva",
                "cpf": "09562309460",
                "phone": "87991690808",
                "codServidor": 51054,
                "email": "polianyoliveira.93@hotmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "d1ccb233-f677-4a51-af43-286740deff6f",
                "name": "Marinalva de Carvalho Felix",
                "cpf": "53541693304",
                "phone": "8999301787",
                "codServidor": 36625,
                "email": "marinalva.feliz@prof.edu.araripine.pe.gov.br",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "d1d5b03d-3332-421d-bb5d-68d859527abf",
                "name": "Maria Maricelia Muniz da Silva",
                "cpf": "03126825494",
                "phone": "8781713020",
                "codServidor": 50135,
                "email": "mmariceliamuniz@gmail.com",
                "position": "Professor(a)",



                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "d26ca880-cd0d-4421-b8e4-35b91dddd80e",
                "name": "Maria de Fatima Macedo",
                "cpf": "96346485415",
                "phone": "87991186411",
                "codServidor": 16258,
                "email": "mfmacedo124578@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "d27027ac-b908-41d4-9304-55e212858b6c",
                "name": "Tumere dos Santos Fravoline",
                "cpf": "04181790428",
                "phone": "87996315928",
                "codServidor": 15982,
                "email": "mfravoline@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "d27177c7-3895-42c6-a9c0-f21c28674148",
                "name": "Oneide Lopes de Oliveira Felix",
                "cpf": "28660027841",
                "phone": "87981046055",
                "codServidor": 27971,
                "email": "one2017123@hotmail.com",
                "position": "Secretário(a)",
                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "d2d874ef-b6b5-4a33-ae2f-6e981d1a74f9",
                "name": "Pessoa Teste",
                "cpf": "27179230049",
                "phone": "87991111111",
                "codServidor": 54105,
                "email": "llanso@hotmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "d2e37498-f069-4c89-918c-b910994217cf",
                "name": "Ruanna Paz Silva",
                "cpf": "10302707670",
                "phone": "87981379864",
                "codServidor": 58997,
                "email": "ruannasilva73@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "d2f35201-7541-4e98-8fda-3d0fe0ffce45",
                "name": "Albérico Ben-Hur Carneiro de Andrade",
                "cpf": "44441861788",
                "codServidor": 27097,
                "position": "Administrador(a)",
                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "d30257d1-d95e-49a3-b181-399d5d1b58ff",
                "name": "Edlane Dias da Silva",
                "cpf": "03805305460",
                "phone": "8799990658",
                "codServidor": 30876,
                "email": "edlllane888@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "d3419826-a946-4ddd-8f5d-95d56c1cdd18",
                "name": "Cintia Nayara Souza Silva",
                "cpf": "10000301485",
                "phone": "87996659601",
                "codServidor": 13009,
                "email": "cintianayarasouza08@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "d34b9ec6-3d01-4d06-9386-f342b954373a",
                "name": "Ana Maria Carlos",
                "cpf": "93631472404",
                "phone": "87992126940",
                "codServidor": 30034,
                "email": "anamariacarlos06@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "d374f723-d6b3-4dc9-9180-d0388add3b61",
                "name": "Gessica do Nascimento Moreira",
                "cpf": "10421814462",
                "phone": "87998195037",
                "codServidor": 12337,
                "email": "gessicamoreira22@idoud.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "d3c630c8-cd88-4c38-b1fd-1281209cb151",
                "name": "Maria Evanir Gonçalves",
                "cpf": "04444614420",
                "phone": "89994261640",
                "codServidor": 39296,
                "email": "evanirgonsalves92@hotmail.com",
                "position": "Coordenador(a)",
                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "d3c8dab8-909c-482b-819b-dc1b281617de",
                "name": "Maria Veronilde Felipe de Andrade",
                "cpf": "79527345472",
                "phone": "87991283406",
                "codServidor": 61478,
                "email": "andradenilda465@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "d3e8bda1-02df-4bfc-b4fe-c0e49e063a66",
                "name": "Ana Lucia Rodrigues Lima Santana",
                "cpf": "17822289420",
                "phone": "87996000313",
                "codServidor": 37019,
                "email": "aninhacapitao@hotmail.com",
                "position": "Orientador Educacional",
                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "d3f686e8-194a-49a2-a7f8-c9fa3574a41e",
                "name": "Daniela de Oliveira Souza Gomes",
                "cpf": "07176656401",
                "phone": "8799355813",
                "codServidor": 14351,
                "email": "dg1009813@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "d41f9f3d-ad9d-4bf1-8046-bdafa966a323",
                "name": "Maria Ednaide Ferreira da Silva",
                "cpf": "02959331435",
                "phone": "87981175395",
                "codServidor": 17718,
                "email": "m.ednaide123@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "d42a4175-640a-496a-a6f6-50544a64174a",
                "name": "Rita Maria dos Santos Silva",
                "cpf": "03627695402",
                "phone": "87991622836",
                "codServidor": 28758,
                "email": "franciscoytallo68@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "d487a100-9f04-4b5c-a063-a250c5ccfcd4",
                "name": "Zivanilda Rodrigues Pereira",
                "cpf": "07051296400",
                "phone": "87996580603",
                "codServidor": 13494,
                "email": "nenafitness17@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "d4f365da-7514-4bc0-b285-74543d8bbe8d",
                "name": "Vania Carlos",
                "cpf": "88284859491",
                "phone": "87981628226",
                "codServidor": 30225,
                "email": "vaniajaco44@gmail.com",
                "position": "Coordenador(a)",
                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "d5048ddb-0af4-41ad-bf9c-ae56b6996724",
                "name": "Ingrid Maria Feitosa Morais",
                "cpf": "11170354416",
                "phone": "87981437648",
                "codServidor": 56960,
                "email": "feitosaingrid07@outlook.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "d5c4ce8c-361a-4c47-b47e-c132365f0482",
                "name": "Patricia Xavier dos Santos",
                "cpf": "12172343498",
                "phone": "87999720343",
                "codServidor": 15056,
                "email": "patyxavier98@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "d65e5dbd-ea45-4d8c-a634-aa4ae4e2ac08",
                "name": "Maria do Socorro de Lima Souza",
                "cpf": "03994764408",
                "phone": "87991162284",
                "codServidor": 5803,
                "email": "pmariadosocorro100@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "d6845c95-5501-4e50-b500-d1c2de95f705",
                "name": "Cybele Lima Batista",
                "cpf": "68284187434",
                "phone": "87991507429",
                "codServidor": 50581,
                "email": "cybele.l.batista@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "d6a9d903-37a7-4e59-8648-8a3e5cfb2adb",
                "name": "Vanusa Alencar Oliveira",
                "cpf": "93499310449",
                "phone": "87991414707",
                "codServidor": 62955,
                "email": "vanusalindinho@hotmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "d6b6e58a-8ca7-40ad-b6e5-86e8068fd5ee",
                "name": "Maria Jailma Geronimo de Souza",
                "cpf": "11903068401",
                "phone": "87996215582",
                "codServidor": 4315,
                "email": "jailmasouza2002@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "d6e5e1f8-00e2-4a64-9886-545f7e7bed67",
                "name": "Maria do Socorro Campos Barbosa",
                "cpf": "95561129368",
                "phone": "89994419842",
                "codServidor": 23416,
                "email": "socorrocampos858@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "d6f6a7f7-f63f-4e6b-8e35-13e5e6d24cea",
                "name": "Jeane de Carvalho Silva Santana",
                "cpf": "78088259304",
                "phone": "89994060155",
                "codServidor": 1032,
                "email": "jeaneisaguesc@gmail.com",
                "position": "Professor(a)",

                "institutionId": "1f0cb6c1-e074-4555-812b-378920649b71"
            },
            {
                "id": "d76631ec-5170-4bc0-a295-7835cb21838e",
                "name": "Adriana Izaquel da Silva",
                "cpf": "10155719483",
                "phone": "87991433899",
                "codServidor": 14908,
                "email": "adrianaiza830@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "d783420a-0547-4d80-8232-c1c7f19cc355",
                "name": "Barbara Tainar dos Santos Silva",
                "cpf": "13162670403",
                "phone": "87981381649",
                "codServidor": 1899,
                "email": "tainarbarbara@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "d78c24ec-54c5-4b5a-a081-46b5ab222124",
                "name": "Cicera Cavalcante da Silva",
                "cpf": "10485935414",
                "phone": "87981441875",
                "codServidor": 7099,
                "email": "ciceraa.2045@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "d78d5ed7-edb5-4eed-b0bd-6d9a5ebffb9c",
                "name": "Expedita Franco de Lima Andrade",
                "cpf": "07193251457",
                "phone": "87991252810",
                "codServidor": 31424,
                "email": "expeditafranco@hotmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "d792d335-b2fa-45c7-be30-bf9ef2c1c917",
                "name": "Maria Lusiene Silva Santos",
                "cpf": "05922808451",
                "phone": "87991114101",
                "codServidor": 47855,
                "email": "LUSIENE82@HOTMAIL.COM",
                "position": "Diretor(a)",
                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "d7d955b4-4ea4-4e61-9490-abd433d5e658",
                "name": "Maria de Fátima Rodrigues",
                "cpf": "02522155326",
                "phone": "89994405329",
                "codServidor": 4514,
                "email": "mariadefatima.acaua@gmail.com",
                "position": "Professor(a)",



                "institutionId": "1f0cb6c1-e074-4555-812b-378920649b71"
            },
            {
                "id": "d7f0cae8-729b-4c4e-a847-9bb7c27803e3",
                "name": "Marina Gomes de Sousa Silva",
                "cpf": "10041245466",
                "phone": "87981432449",
                "codServidor": 3116,
                "email": "marinass09mg@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "d7f8f04c-7309-4e38-90de-36d175a54807",
                "name": "Fábia Batista de Oliveira",
                "cpf": "07680386420",
                "phone": "87996236844",
                "codServidor": 19328,
                "email": "oliveirafabia954@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "d811b691-0532-4cd4-81a4-e2b5ecca9297",
                "name": "Márcia Regina Cordeiro da Cruz",
                "cpf": "06878396450",
                "phone": "87981069968",
                "codServidor": 40630,
                "email": "marciaregina1202200@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "d817a47d-1e3e-4f42-a611-e912c96f6ec1",
                "name": "Nessandra Cebia Coelho Modesto",
                "cpf": "74710460400",
                "phone": "87991319495",
                "codServidor": 28432,
                "email": "nessandramodesto@hotmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "d817b30e-ddce-482c-ae25-2ccde95f3f6b",
                "name": "Isabel de Lima Alencar",
                "cpf": "64227952468",
                "phone": "8799198008",
                "codServidor": 27048,
                "email": "emaildaisabel50@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "d85c24b9-bf15-4614-9556-67a727e335f0",
                "name": "Joseiza Nobre Alves",
                "cpf": "04531109406",
                "phone": "87981020320",
                "codServidor": 16959,
                "email": "izanobre21@hotmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "d89ec91c-3819-40ce-9385-49c3b48d8973",
                "name": "Isamara Dias Rodrigues Abreu",
                "cpf": "11085110400",
                "phone": "87991394403",
                "codServidor": 40711,
                "email": "elsondavi03@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "d8dfc654-8fca-42c3-b83e-0afc117981ed",
                "name": "Elieide Ferreira da Silva",
                "cpf": "05182889437",
                "phone": "87981386527",
                "codServidor": 13346,
                "email": "elieidesilva2009@hotmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "d8f6b36f-a26f-4460-b69f-9d4baacada96",
                "name": "Armando Arruda Gomes",
                "cpf": "42090393491",
                "phone": "87991501623",
                "codServidor": 61111,
                "email": "armandoarruda27@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "d984c326-9542-4dcd-90ef-59f03f12872e",
                "name": "Amara Maria Batista da Silva Andrade",
                "cpf": "08119583450",
                "phone": "87991003406",
                "codServidor": 40708,
                "email": "am0433640@gmail.com",
                "position": "Professor(a)",
                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "d9bd8019-9252-4e39-a7db-ae8dec6f0b8a",
                "name": "Paula do Nascimento Moura",
                "cpf": "06180863318",
                "phone": "87991786713",
                "codServidor": 52448,
                "email": "paulanascimentomourasilva@gmail.com",
                "position": "PROFESSOR(A)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "d9c66d93-5d18-47ba-b5c8-743dfdbabba5",
                "name": "Nadja Damacena Pereira Avelino",
                "cpf": "03097864440",
                "phone": "8781513439",
                "codServidor": 31161,
                "email": "nadjaavelino53@hotmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "da20cb82-1e26-4db2-92c3-a9c6b8a5684b",
                "name": "Sandra Roslai Ferreira de Sousa",
                "cpf": "02843527481",
                "phone": "87981431087",
                "codServidor": 47963,
                "email": "roslaysandra13@gmail.com",
                "position": "Coordenador(a)",
                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "da48a04e-b631-4792-8736-dec8a833d9cc",
                "name": "Kelly Silva Torres",
                "cpf": "04717654498",
                "phone": "87996113340",
                "codServidor": 19429,
                "email": "kellytorres0010@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "da863162-169e-49f1-a9bb-dd687743c17e",
                "name": "Maria Eliane de Brito",
                "cpf": "98407899453",
                "phone": "87992005656",
                "codServidor": 33755,
                "email": "maria@softagon.com.br",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "da8fcd22-ee49-411a-bbd0-8f5970eef01b",
                "name": "Marineide Alves dos Santos",
                "cpf": "03546700422",
                "phone": "87996003368",
                "codServidor": 15397,
                "email": "marineide.santos@prof.edu.araripina.pe.gov.br",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "daebba23-a6af-4755-bd6f-2b565b6e16eb",
                "name": "Iara da Silva Tavares",
                "cpf": "13325519474",
                "phone": "87991096411",
                "codServidor": 12278,
                "email": "2409tavaresiara@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "dafb9351-3790-4d0e-95cb-70816e4762b9",
                "name": "Ismênia Rodrigues Souza",
                "cpf": "08539238411",
                "phone": "87998057610",
                "codServidor": 19430,
                "email": "ysmeniamariana@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "db09fd68-814e-4f2b-a3ff-db2335800134",
                "name": "Veronica Maria de Araujo",
                "cpf": "10039070409",
                "phone": "87991359931",
                "codServidor": 41679,
                "email": "Veronaraujo169@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "db0c6a23-c5ef-4350-a323-a7ec380e2a1b",
                "name": "Ana Lucia Batista Alencar Silva",
                "cpf": "03420224400",
                "phone": "87991377774",
                "codServidor": 24057,
                "email": "analuciaba1975@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "db1de1ba-dfe4-423c-9213-b85c719a77a8",
                "name": "Clecia Kerles Ferreira Valeriano",
                "cpf": "09765593406",
                "phone": "87996571986",
                "codServidor": 15878,
                "email": "cleciakerles@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "dba60b28-5e8c-4e19-84d0-9cef432b79f8",
                "name": "Ivaneide da Silva Souza",
                "cpf": "02965369465",
                "phone": "87981365588",
                "codServidor": 25393,
                "email": "antoniosamir20@gmail.com",
                "position": "Diretor(a)",
                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "dcaa2af9-2e27-4826-b13f-5d622d6e8aef",
                "name": "Maria Luciene Santos Sousa",
                "cpf": "03588164405",
                "phone": "87991012333",
                "codServidor": 33109,
                "email": "lucienellms@hotmail.com",
                "position": "Coordenador(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "dd35d968-9558-4c18-acec-6f26ca2845e3",
                "name": "Ana Paula Ramos Arraes",
                "cpf": "02260496474",
                "position": "Adiministrador(a)",
                "codServidor": 2,
                "institutionId": "547f4c04-d8eb-4e01-b13a-e648e81de59d"
            },
            {
                "id": "dd747758-f2f5-4f74-a53d-602f7b1c782a",
                "name": "Katia Silva Mendes",
                "cpf": "03960825480",
                "phone": "87991118733",
                "codServidor": 3618,
                "email": "katialudugero@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "ddf8e891-564a-48de-a410-770e8eb6c580",
                "name": "Josecleide Lopes de Macedo",
                "cpf": "02957352443",
                "phone": "87981632995",
                "codServidor": 22094,
                "email": "josecleidelopes@hotmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "de30692e-f0e2-4a05-9f9f-4eeac338b2dd",
                "name": "Maria Das Gracas Batista Oliveira Silva",
                "cpf": "36732613472",
                "phone": "87996220850",
                "codServidor": 28626,
                "email": "dasgracamaria28@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "de5bee14-20aa-4315-bc03-32f908e1da5a",
                "name": "Narciso de Sousa Rodrigues",
                "cpf": "06963025355",
                "codServidor": 4684,
                "position": "Desconhecido(a)",
                "institutionId": "1f0cb6c1-e074-4555-812b-378920649b71"
            },
            {
                "id": "deb327af-1c4f-450a-9e73-aa98a8427d24",
                "name": "Carolina Moura dos Santos Silva",
                "cpf": "13093294436",
                "phone": "87981478956",
                "codServidor": 8389,
                "email": "carolinamoura055@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "defab04a-4357-4b63-a924-e5fb3f687bdc",
                "name": "Maria da Conceição Silva e Souza",
                "cpf": "01340343410",
                "phone": "87981194223",
                "codServidor": 61944,
                "email": "smaria30391@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "df22d0db-3f9f-40b3-b71e-0ed0bef7098f",
                "name": "Juscielleide Monteiro Chaves",
                "cpf": "00767480490",
                "phone": "87991124190",
                "codServidor": 37131,
                "email": "juscielleide@hotmail.com",
                "position": "Orientador Educacional",
                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "dfa42725-db35-492c-a19b-af9e4ed77c4d",
                "name": "Geovania Kailane Batista Farias Lima",
                "cpf": "12289276421",
                "phone": "87996316199",
                "codServidor": 12895,
                "email": "lgeovania982@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "e02299bf-e581-45d0-b128-abf6a0e71499",
                "name": "Arlete Neri de Oliveira Barros",
                "cpf": "99822296487",
                "phone": "87981712277",
                "codServidor": 22706,
                "email": "arleteneri236@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "e0acb5de-5d9f-4e81-a313-7aa085676490",
                "name": "Ana Lucia Cordeiro da Silva",
                "cpf": "05707459421",
                "phone": "87991366627",
                "codServidor": 205,
                "email": "analuciabrito02@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "e1314ccc-6314-4e15-a7bc-7a049677c26f",
                "name": "Aline Gomes Pereira",
                "cpf": "07141363440",
                "phone": "87991687991",
                "codServidor": 40305,
                "email": "alinepg31@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "e14e581b-c142-40d6-b12b-20c2458b178e",
                "name": "Joanie Alves Jardim Lopes Sousa",
                "cpf": "70579482391",
                "phone": "89994031917",
                "codServidor": 1272,
                "email": "jardim-sousa@hotmail.com",
                "position": "Professor(a)",



                "institutionId": "1f0cb6c1-e074-4555-812b-378920649b71"
            },
            {
                "id": "e1b9ff14-1bab-46b2-8075-e3d0fdc3fa9a",
                "name": "Vera-lucia Batista de Sousa Arraes",
                "cpf": "50697943453",
                "phone": "87998004745",
                "codServidor": 41646,
                "email": "veraluciaarraes@hotmail.com",
                "position": "Professor(a)",
                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "e1c18413-62cf-4291-91d4-abb30c6d689c",
                "name": "Macksandra Cordeiro Modesto",
                "cpf": "04146487498",
                "phone": "87981353032",
                "codServidor": 37658,
                "email": "macksandra@hotmail.com",
                "position": "Orientador Educacional",
                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "e1e16d8e-bea1-4596-b87a-1dd18f82a92f",
                "name": "Maria do Socorro Alves Batista",
                "cpf": "90257227415",
                "phone": "87991620857",
                "codServidor": 2156,
                "email": "socorroab01@gmail.com",
                "position": "Professor(a)",
                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "e1eb3498-edf9-499b-8b7d-b2d425b62cfc",
                "name": "SILVINO LUIZ DA SILVA FILHO",
                "cpf": "99085979064",
                "codServidor": 5881,
                "position": "Desconhecido(a)",
                "institutionId": "547f4c04-d8eb-4e01-b13a-e648e81de59d"
            },
            {
                "id": "e28cc35f-1334-4635-baa5-ca5e2fa85c3e",
                "name": "Mônica Sousa Coelho",
                "cpf": "11115878417",
                "phone": "87991041119",
                "codServidor": 58818,
                "email": "monicacoelho781@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "e2bc642c-018b-4760-954c-6d924dfbd68c",
                "name": "Marinalva Lopes de Alencar",
                "cpf": "05728838464",
                "phone": "87981578886",
                "codServidor": 17072,
                "email": "marinalva.lopes1980@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "e33ea150-e11b-4ed7-b668-1dc317a731bc",
                "name": "Marta Betania de Andrade Ferreira",
                "cpf": "05244494490",
                "phone": "87991214072",
                "codServidor": 54254,
                "email": "martabetania1@hotmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "e47d1dae-d9c4-4457-a232-f7091aa8b789",
                "name": "Angela de Souza Nascimento",
                "cpf": "07999926400",
                "phone": "87991443617",
                "codServidor": 44026,
                "email": "nascimentoangela084@gmail.com",
                "position": "Orientador Educacional",
                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "e4942c0e-2b48-4fc8-bef0-b163d16dd388",
                "name": "Leandro Andrade Silva",
                "cpf": "04309258409",
                "phone": "87999675428",
                "codServidor": 20446,
                "email": "leandro_andrade2010@hotmail.com",
                "position": "Professor(a)",



                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "e4aefa83-84cf-4d7d-af15-8feef31f3e06",
                "name": "Vaneide Carlos",
                "cpf": "96353953453",
                "phone": "87992000276",
                "codServidor": 29883,
                "email": "vaneidecarlos1974@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "e517d14b-c8c0-49ff-b84e-5896f99dd0cc",
                "name": "Francisca Maria de Oliveira Mendes",
                "cpf": "81135149453",
                "phone": "87992531138",
                "codServidor": 16226,
                "email": "franciscamendes1057@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "e53bfc96-1158-4a88-b072-dc2b32e3dc1a",
                "name": "Tania de Cassia Delmondes de Oliveira",
                "cpf": "84576286404",
                "phone": "87991129834",
                "codServidor": 33019,
                "email": "taniadecassia134@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "e54441fa-e54b-4eb1-adcf-42fb7ce37da5",
                "name": "Agostinho Antonio de Sousa",
                "cpf": "83006001320",
                "phone": "89994106539",
                "codServidor": 1504,
                "email": "agostinhoasousa93@gmail.com.com",
                "position": "Professor(a)",



                "institutionId": "1f0cb6c1-e074-4555-812b-378920649b71"
            },
            {
                "id": "e55622e3-8161-482e-a337-3084575cea56",
                "name": "Antonio da Silva Lima Junior",
                "cpf": "04106833450",
                "phone": "87991235189",
                "codServidor": 25441,
                "email": "jjunior182008@hotmail.com",
                "position": "SECRETARIO (A)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "e694c4f9-94fd-4c42-9bc1-0f479869e8de",
                "name": "Geraldina Pereira Cavalcante",
                "cpf": "59976780400",
                "phone": "87996549700",
                "codServidor": 34247,
                "email": "geraldinapereiracavalcante@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "e7d534b0-fae9-48e1-a481-84c65ca4eb21",
                "name": "Ilza Josefa de Sousa",
                "cpf": "66956870304",
                "phone": "89994282458",
                "codServidor": 4173,
                "email": "ilzasous@hotmail.com",
                "position": "Coordenador(a)",
                "institutionId": "1f0cb6c1-e074-4555-812b-378920649b71"
            },
            {
                "id": "e89fe38f-f766-4a20-a8db-a5b3db742a80",
                "name": "Maria Evania Felix da Silva",
                "cpf": "03497492485",
                "phone": "34997295267",
                "codServidor": 3275,
                "email": "evania_fdelmondes@hotmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "e9552218-6f59-4923-bf2d-ef5679cafd24",
                "name": "Anilda Freire de Vasconcelos",
                "cpf": "08678666404",
                "phone": "87981468798",
                "codServidor": 27955,
                "email": "anildafreire20@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "e986f756-29ae-4ec3-84e7-8ce6c446a03f",
                "name": "Leusa Arlinda Gomes",
                "cpf": "56645775334",
                "phone": "89994201057",
                "codServidor": 925,
                "email": "leusagomesarlinda17@outlook.com",
                "position": "Professor(a)",



                "institutionId": "1f0cb6c1-e074-4555-812b-378920649b71"
            },
            {
                "id": "e9f7f22c-a2ef-4434-b245-104f8031bcde",
                "name": "Catia Rejane da Cunha Silva",
                "cpf": "10520288459",
                "phone": "87998095143",
                "codServidor": 4981,
                "email": "katiarejane241@hotmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "e9fe0c2f-e3d3-45d4-9b3e-b26043d4c94e",
                "name": "Ana Terezinha Mendes",
                "cpf": "98910990406",
                "phone": "87991740078",
                "codServidor": 5586,
                "email": "anaterezinhasilva19@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "ea949446-d3e4-4157-9a62-bae1f07aece8",
                "name": "Tyciana Ferreira Goncalves",
                "cpf": "01062608470",
                "phone": "87996132093",
                "codServidor": 12246,
                "email": "tycianaferreira.ferreira@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "ea97c2a3-543f-4c36-ba73-badbcea983f4",
                "name": "Essueli Modesto Ferreira",
                "cpf": "89982118404",
                "phone": "63984436384",
                "codServidor": 34158,
                "email": "essueli@hotmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "eafbe9c4-4bb5-467d-8d5e-252718f1cb6d",
                "name": "Maria da Conceicao Santos e Souza Silva",
                "cpf": "04167541475",
                "phone": "8791219467",
                "codServidor": 41895,
                "email": "mceica426@gmail.com",
                "position": "Professor(a)",
                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "ebd89644-2720-40e0-b049-7df94b379bac",
                "name": "Francislandia Carvalho Modesto",
                "cpf": "04609335409",
                "phone": "87981005261",
                "codServidor": 13399,
                "email": "cirlandiamodesto@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "ec06e4dc-8195-4843-9937-25e3bd45c79c",
                "name": "Antonia de Alencar Souza",
                "cpf": "06176230403",
                "phone": "87991988099",
                "codServidor": 38970,
                "email": "dulcealencarsouza@outlook.com",
                "position": "Diretor(a)",
                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "ec1fbc86-a3d9-46ae-af54-f2342076417b",
                "name": "Leide Jane Barbosa da Costa Lima",
                "cpf": "89596323334",
                "codServidor": 5557,
                "position": "Desconhecido(a)",
                "institutionId": "1f0cb6c1-e074-4555-812b-378920649b71"
            },
            {
                "id": "ec63b341-6fa0-49d4-b2ef-edede92a90b5",
                "name": "Maria Vilma Miranda de Matos",
                "cpf": "03520589435",
                "phone": "87981220893",
                "codServidor": 6491,
                "email": "vilmamaria3080@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "edf7f202-70fc-44ab-be57-ae8c37d2d2c4",
                "name": "Antonia Cordeiro da Cruz sa",
                "cpf": "99889021404",
                "phone": "87991097211",
                "codServidor": 9226,
                "email": "antoniacordeiro377@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "eea42714-8bae-46f7-8d58-73cd5758156c",
                "name": "Amanda Nunes Moreira",
                "cpf": "08242144478",
                "phone": "87991441753",
                "codServidor": 62972,
                "email": "amandaisabela@hotmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "ef0c7f86-5561-4072-aaff-3535c1034554",
                "name": "Maria Elma da Rocha Lima",
                "cpf": "47104694404",
                "phone": "87999241464",
                "codServidor": 6041,
                "email": "mariaamle@hotmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "ef5d9b76-0633-4205-8b63-f5b12e9b95e1",
                "name": "Professor Teste 1",
                "cpf": "25205134038",
                "phone": "8799999999",
                "codServidor": 36956,
                "email": "professor3@gmail.com",
                "position": "Professor(a)",
                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "f054e3f4-abcb-47bd-a2ce-62753503ab8d",
                "name": "Francislania Francisca Santos",
                "cpf": "11346733457",
                "phone": "87981628863",
                "codServidor": 19381,
                "email": "fran_soares_trabalho@outlook.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "f0e3df8b-551e-45ed-b174-c8b7a01a59cf",
                "name": "Selma de Oliveira Santos",
                "cpf": "00951542486",
                "phone": "87991543192",
                "codServidor": 40267,
                "email": "anony0312@gmail.com",
                "position": "Secretário(a)",
                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "f0ef5d6e-da64-4535-aa7a-55f21c419e63",
                "name": "Maria Hallynesman Coelho Cordeiro",
                "cpf": "05769638443",
                "phone": "87981322504",
                "codServidor": 50071,
                "email": "alineaissa.cordeiro@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "f0f5742d-e716-484b-9c6a-dba2159c728a",
                "name": "Josefa Janeide Miroro do Nascimento",
                "cpf": "07057536461",
                "phone": "87996473509",
                "codServidor": 16202,
                "email": "janeide-miroro@hotmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "f1ba8896-3938-4bc4-989d-74c98c4dd93a",
                "name": "Vanêssa Almeida Viana",
                "cpf": "12582556424",
                "phone": "87981556032",
                "codServidor": 9672,
                "email": "VANESSAV2725@GMAIL.COM",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "f1df5deb-acdd-4d7e-8213-ba6f158f3789",
                "name": "Haroldo Edmundo Sousa Modesto",
                "cpf": "05957382493",
                "phone": "87991262685",
                "codServidor": 8331,
                "email": "haroldomodesto@hotmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "f246f81c-a31f-464f-9361-293a4e231941",
                "name": "Marta Vânia Ferreira de Amorim",
                "cpf": "45127476304",
                "phone": "89994004370",
                "codServidor": 351,
                "email": "martavaniaferreira@hotmail.com",
                "position": "Professor(a)",



                "institutionId": "1f0cb6c1-e074-4555-812b-378920649b71"
            },
            {
                "id": "f26fb5e9-c70e-472e-ad83-2dda22fe8164",
                "name": "Jailson Pereira Gomes dos Santos",
                "cpf": "05816228471",
                "phone": "87991423824",
                "codServidor": 53224,
                "email": "jailson2024@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "f272c590-7f51-4c3b-a51f-e3f794a0836b",
                "name": "Thamires da Silva Santos",
                "cpf": "07345980413",
                "phone": "8791080015",
                "codServidor": 22231,
                "email": "thamirestellle1@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "f2fcc70e-f176-4af5-8bc6-a874361b54a6",
                "name": "Jacilene Fernandes Coelho",
                "cpf": "05368608403",
                "phone": "87988392613",
                "codServidor": 11632,
                "email": "jacilenefernandes322@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "f3ad62fb-69b5-420b-b11d-7055a9f13cc8",
                "name": "Rejane Maria Pereira da Silva",
                "cpf": "03098267488",
                "phone": "87996147378",
                "codServidor": 13855,
                "email": "rejanep196@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "f4047105-313a-44bc-98b7-59e3d83ba71f",
                "name": "Joao Pedro da Silva",
                "cpf": "15466239496",
                "phone": "12996165537",
                "codServidor": 19527,
                "email": "jp1665502@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "f4251be9-40ba-4fc0-8266-8967ba06e4df",
                "name": "Francianny Keille Oliveira",
                "cpf": "04219175474",
                "phone": "87996172412",
                "codServidor": 4519,
                "email": "franciannyoliveira34@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "f425f145-da00-4344-9c1a-fc69f9bbb7b4",
                "name": "Evila Naiany Silva Marinho",
                "cpf": "10989247465",
                "phone": "87999390692",
                "codServidor": 11058,
                "email": "naianemarinho410@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "f45b2caf-2843-4b9a-84cb-917c3f460a3e",
                "name": "Maria Lino Vicente de Souza",
                "cpf": "01022493426",
                "phone": "87999372657",
                "codServidor": 3868,
                "email": "cidalinoipubi01@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "f469ff22-d18c-4238-a12a-e8dc19fc02c1",
                "name": "MATHEUS FRANCISCO DA SILVA",
                "cpf": "12135001414",
                "phone": "87981399432",
                "codServidor": 5777,
                "position": "Professor(a)",
                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "f4f40b64-9f30-4345-adb2-826ffdfc4f45",
                "name": "Mylane Jacyelida Muniz Ferreira Laurentino",
                "cpf": "03866607431",
                "phone": "87999756727",
                "codServidor": 2177,
                "email": "mylanemuniz@yahoo.com.br",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "f50364f9-5538-46f1-9e84-248d98092507",
                "name": "Lucélia Lopes Araújo Felix",
                "cpf": "03391163402",
                "phone": "87981255481",
                "codServidor": 40571,
                "email": "lucelialopes142@yahoo.com.br",
                "position": "Secretário(a)",
                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "f5160324-c4d5-49cd-99bc-f1e6d74f9512",
                "name": "Mayle Pereira de Sousa",
                "cpf": "10970796439",
                "phone": "87999727928",
                "codServidor": 12374,
                "email": "maylesouza69@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "f52dd78a-3344-4ba5-87b7-66619e79c6cd",
                "name": "Maria Aparecida Alencar",
                "cpf": "02166464483",
                "phone": "87992007242",
                "codServidor": 40298,
                "email": "mariaparecidalncr@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "f55bd6a0-29f8-49f0-b7a2-faa08121e1fc",
                "name": "Claúdia Regina Souza Alves Santos",
                "cpf": "04970422400",
                "phone": "87991315806",
                "codServidor": 1515,
                "email": "claudiaregina2024@gmail.coM",
                "position": "Coordenador(a)",
                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "f55ec3d3-e18a-4300-bbc1-1a720a1f83ef",
                "name": "Kathiane Oliveira Diniz",
                "cpf": "08678748486",
                "phone": "87991365411",
                "codServidor": 40308,
                "email": "dinizkatiane84@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "f56e2c65-8b7c-4387-aca4-db8857db47c3",
                "name": "Maria Lucimaria da Silva",
                "cpf": "11982959452",
                "phone": "87996269807",
                "codServidor": 16782,
                "email": "lucimariaeufrasio1223@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "f63a2c02-6106-464a-bc9b-55252e0ca260",
                "name": "Maria Gileneide de Alencar Silva",
                "cpf": "87917718387",
                "phone": "89994561729",
                "codServidor": 30189,
                "email": "gigikawa759@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "f643e024-b33a-45d7-8d5d-43583cc4b74b",
                "name": "Francisco de Assis Simao Nunes",
                "cpf": "04163668489",
                "phone": "87996235969",
                "codServidor": 19271,
                "email": "simaofranciscodeassis@gmail.com",
                "position": "Professor(a)",



                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "f69b0586-2e49-4723-a7dd-2e6f4b783acb",
                "name": "Jeane Mara da Silva",
                "cpf": "05019130338",
                "phone": "89994064143",
                "codServidor": 5224,
                "email": "jeanemara23@outlook.com",
                "position": "Professor(a)",



                "institutionId": "1f0cb6c1-e074-4555-812b-378920649b71"
            },
            {
                "id": "f6b8e33c-3df7-47a7-95ec-39456c367ca8",
                "name": "Edvania dos Reis Leite",
                "cpf": "03973430438",
                "phone": "87981353920",
                "codServidor": 19022,
                "email": "edvaniareisleite@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "f6e22aba-5068-45b2-8c2a-a7ccfc650feb",
                "name": "Maria Elisangela da Silva",
                "cpf": "10452935636",
                "phone": "87999650279",
                "codServidor": 12756,
                "email": "angelaleandroferreira5@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "f7125b38-1b2f-4a52-912a-2308427227f3",
                "name": "Paula Jeane de Andrade Alves",
                "cpf": "11641084413",
                "phone": "87999420225",
                "codServidor": 13766,
                "email": "paulajeaneandrade@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "f7550a5a-7883-4b37-8ef0-9d1d30b701f4",
                "name": "Renata Pereira de Lima",
                "cpf": "01017653470",
                "phone": "87996425422",
                "codServidor": 4468,
                "email": "renatapereira202320@hotmal.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "f759c01c-2777-4e40-a29e-f6234cd8289d",
                "name": "Maria Auxiliadora da Silva Vila Nova",
                "cpf": "02865276341",
                "phone": "89994029198",
                "codServidor": 4709,
                "email": "doravillanova03@gmail.com",
                "position": "Professor(a)",



                "institutionId": "1f0cb6c1-e074-4555-812b-378920649b71"
            },
            {
                "id": "f7abe696-6f22-477b-87ac-03bd0ef7660d",
                "name": "Maria Rivanda da Silva",
                "cpf": "64227227453",
                "phone": "87981017351",
                "codServidor": 29228,
                "email": "riivandaa321@gmail.coM",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "f7b80437-4ea3-4ca5-9472-d692c369a702",
                "name": "Jaires Bruna Silva Moraes",
                "cpf": "12169079432",
                "phone": "87991648108",
                "codServidor": 43530,
                "email": "brunasilvq00@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "f8871bd2-2c35-4fe1-94af-d90a314dd325",
                "name": "Elaine Cristina Nogueira Neri",
                "cpf": "05368643497",
                "phone": "87991745156",
                "codServidor": 35592,
                "email": "elainenogueira552@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "f8a370cb-ceff-43f3-b7bb-6275d675d4f1",
                "name": "Paula Sousa Santos",
                "cpf": "03547037492",
                "phone": "87991959698",
                "codServidor": 5771,
                "email": "paulasouza0333@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "f936a391-79ad-4e4d-a7dd-f69568cd0596",
                "name": "Aglaete Riolino Lima Muniz",
                "cpf": "04281588469",
                "phone": "87991379533",
                "codServidor": 9834,
                "email": "aglaetelima15@gmail.com",
                "position": "Professor(a)",
                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "f9589583-fb0c-4601-8bdb-94eae004465e",
                "name": "Francisca Irineide de Brito Alencar",
                "cpf": "76475344400",
                "phone": "87991319530",
                "codServidor": 31353,
                "email": "francisca.irineide@prof.edu.araripina.pe.gov.br",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "f9a8dac5-1570-4bb4-b096-2e9001f809fe",
                "name": "Denise Cavalcanti da Silva",
                "cpf": "03831358427",
                "phone": "87988148931",
                "codServidor": 24180,
                "email": "dcavalcanti878@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "f9a9db2e-faf5-4ced-ae10-1c51f18833f9",
                "name": "Eva Silane Coelho Alves",
                "cpf": "05827977489",
                "phone": "87991035366",
                "codServidor": 31240,
                "email": "eva_silane@hotmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "fa17806d-02ac-44ca-a46d-d8fe70d81ba1",
                "name": "Ketyllyn Morais Oliveira",
                "cpf": "16848654418",
                "phone": "35910035311",
                "codServidor": 21278,
                "email": "ketyllynmorais@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "fa3d6c66-0bdb-492c-8a32-45a3fcd3056d",
                "name": "Antonielma Leite Alves",
                "cpf": "08162006451",
                "phone": "87981228209",
                "codServidor": 2972,
                "email": "antonielmaleite@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "fa6023a5-f94d-432f-9f22-57d545a45822",
                "name": "Gleiciano Belo Lima",
                "cpf": "09737865405",
                "phone": "87991399775",
                "codServidor": 40940,
                "email": "gleiciano280@hotmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "fa659dd8-5c10-4e64-8588-3900343796fc",
                "name": "Francisca Eliane Rodrigues Bezerra",
                "cpf": "31296386368",
                "phone": "87981406885",
                "codServidor": 10381,
                "email": "profeliane24@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "fa76be87-3108-476e-97d0-9f4a1e08c03f",
                "name": "Ariadene Ferreira da Silva",
                "cpf": "07304715430",
                "phone": "87991680563",
                "codServidor": 26481,
                "email": "aryadenne.fs@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "fb105e1a-403b-41c8-a332-22b037fef73d",
                "name": "Ana Paula Rodrigues de Sousa",
                "cpf": "12697194401",
                "phone": "87981022784",
                "codServidor": 7690,
                "email": "ann.absolluty@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "fb745d68-c1c4-4c4f-b7ae-c845142ec558",
                "name": "Carla Jeanne de Souza Coelho",
                "cpf": "03548518451",
                "phone": "87981213798",
                "codServidor": 11077,
                "email": "prof.jeanne.cemei2023@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "fb988ca5-d23c-4fb4-a1d5-74b268f9bf94",
                "name": "Naiuza Rodrigues de Moura",
                "cpf": "07314130400",
                "phone": "87981392736",
                "codServidor": 17795,
                "email": "rodriguesnailza608@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "fbb138df-a8f5-402d-86cc-871be54b64b0",
                "name": "Elma Delmondes Lima",
                "cpf": "05787420470",
                "phone": "87996086236",
                "codServidor": 14364,
                "email": "elma-delmondes@hotmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "fbe18ebe-f618-4e4a-a924-e9c8639701fd",
                "name": "Ariela Menezes Cavalcante Fonseca",
                "cpf": "05233192403",
                "phone": "87998045673",
                "codServidor": 16409,
                "email": "ariela.mcf@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "fcc2c588-9c2d-44f4-b4d7-a40aa41418b1",
                "name": "Roseane Maria de Jesus Souza",
                "cpf": "06165029400",
                "phone": "87991098405",
                "codServidor": 54234,
                "email": "rosy.souza87@hotmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "fcdb5753-d039-41ba-825b-42d1b8a44c5a",
                "name": "ALANA EVILE DANTAS DE MACEDO OLD",
                "cpf": "25205134039",
                "codServidor": 18808,
                "position": "Administrador(a)",
                "institutionId": "547f4c04-d8eb-4e01-b13a-e648e81de59d"
            },
            {
                "id": "fced51a6-e451-4dae-8705-6a1d6f20c6d3",
                "name": "Francisco Regis do Nascimento",
                "cpf": "98409700468",
                "phone": "87991654393",
                "codServidor": 18678,
                "email": "Francisco.nascimento@prof.edu.araripina.pe.gov.br",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "fd67a234-9fe2-42a3-a345-22f4b4d1bbe2",
                "name": "Heloiza Coelho dos Santos",
                "cpf": "64229920415",
                "phone": "87991365666",
                "codServidor": 24620,
                "email": "heloizacooee02@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "fd78eeb9-f13a-49ae-bfb9-d0ab41d5885d",
                "name": "Rogeane Pereira de Figueiredo",
                "cpf": "58141499149",
                "phone": "87991225316",
                "codServidor": 1785,
                "email": "rogeanefigueiredo7@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "fd7a4346-4465-408b-a88c-93842f041398",
                "name": "Jocy Batista Rodrigues",
                "cpf": "81843348349",
                "phone": "89994184828",
                "codServidor": 1660,
                "email": "jocybr2014@gmail.com",
                "position": "Diretor(a)",
                "institutionId": "1f0cb6c1-e074-4555-812b-378920649b71"
            },
            {
                "id": "fdfe0fbf-de18-4352-b273-d9d1f99e102d",
                "name": "Maria Vilma de Souza Nascimento",
                "cpf": "58846662415",
                "phone": "87991050704",
                "codServidor": 7946,
                "email": "souzamonteiro.26@hotmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "fe1ccd05-5f86-4041-832b-f1a390527582",
                "name": "Maria Eliene Coelho de Carvalho",
                "cpf": "03972756410",
                "phone": "87996088994",
                "codServidor": 25733,
                "email": "elienecoelho888@gmail.com",
                "position": "Coordenador(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "fe420682-aaa9-4471-b298-f0c2af11db6c",
                "name": "Claudiana Serafim da Silva",
                "cpf": "03172744493",
                "phone": "87981312133",
                "codServidor": 6077,
                "email": "petloverspet316@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "fe4a6a3d-5888-4f6a-b137-e848d246a776",
                "name": "Maria Aglailda Leite de Sousa  Pereira",
                "cpf": "02123226483",
                "phone": "87981307334",
                "codServidor": 27961,
                "email": "elizangelaemesson24@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "fe8f416a-1d67-4f06-9e19-e074c2367d9f",
                "name": "Maria Eliene de Albuquerque Vieira",
                "cpf": "00361581351",
                "phone": "8781283301",
                "codServidor": 4889,
                "email": "jafiaingridalbuquerque@gmail.coM",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "ff380d6f-6614-4263-9042-279cf735160a",
                "name": "Antonio Uelson dos Santos",
                "cpf": "10031546463",
                "phone": "87981377755",
                "codServidor": 1569,
                "email": "sanny77.welson@gmail.com",
                "position": "Professor(a)",

                "institutionId": "720fd4db-f8f7-4f46-bf1c-991627f84f29"
            },
            {
                "id": "ff7a4363-b259-4125-af9e-0e62666b2312",
                "name": "Patricia Xavier Dos Santos",
                "cpf": "74913392042",
                "phone": "87992005656",
                "codServidor": 15056,
                "email": "hermes@araripina.com.br",
                "position": "Professor(a)",

                "institutionId": "547f4c04-d8eb-4e01-b13a-e648e81de59d"
            },
            {
                "id": "ff91e646-34e4-4db7-9160-01ea61079990",
                "name": "Pamera Ferreira do Nascimento Silva",
                "cpf": "00788557483",
                "phone": "87992434697",
                "codServidor": 33978,
                "email": "pamera.silva@prof.edu.araripina.gov.br",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "fff7073d-83cf-417b-9cb7-153d399e6882",
                "name": "Ana Kellen Vieira Mendes da Silva",
                "cpf": "10958779414",
                "phone": "87991230833",
                "codServidor": 59929,
                "email": "anakellen02@gmail.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            },
            {
                "id": "fff969d1-a8c8-43f1-b426-4eaebb04b28a",
                "name": "Iaponira Costa Modesto de Paulo",
                "cpf": "84551429449",
                "phone": "87991014635",
                "codServidor": 2459,
                "email": "iaponiramodesto@outlook.com",
                "position": "Professor(a)",

                "institutionId": "5796ee79-7e43-4137-bf7a-016f925684a4"
            }
        ],
        skipDuplicates: true
    })


    console.log('Seed data created successfully!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
