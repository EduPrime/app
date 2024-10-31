

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


CREATE EXTENSION IF NOT EXISTS "pg_net" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgsodium" WITH SCHEMA "pgsodium";








ALTER SCHEMA "public" OWNER TO "postgres";


CREATE SCHEMA IF NOT EXISTS "system";


ALTER SCHEMA "system" OWNER TO "postgres";


CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";






CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";






CREATE TYPE "public"."attendance_status" AS ENUM (
    'PRESENT',
    'ABSENT',
    'EXCUSED'
);


ALTER TYPE "public"."attendance_status" OWNER TO "postgres";


CREATE TYPE "public"."course_modality" AS ENUM (
    'Ensino Regular',
    'EJA',
    'Educação Profissional',
    'Educação Especial'
);


ALTER TYPE "public"."course_modality" OWNER TO "postgres";


CREATE TYPE "public"."course_stage_type" AS ENUM (
    'Etapa 1',
    'Etapa 2',
    'Etapa 3',
    'Etapa 4',
    'Etapa 5',
    'Etapa 6'
);


ALTER TYPE "public"."course_stage_type" OWNER TO "postgres";


CREATE TYPE "public"."day_of_week" AS ENUM (
    'Segunda',
    'Terça',
    'Quarta',
    'Quinta',
    'Sexta',
    'Sábado',
    'Domingo'
);


ALTER TYPE "public"."day_of_week" OWNER TO "postgres";


CREATE TYPE "public"."deficiency_type" AS ENUM (
    'Visual',
    'Auditiva',
    'Física',
    'Intelectual',
    'Mental',
    'Múltipla',
    'Outros',
    'Não possui'
);


ALTER TYPE "public"."deficiency_type" OWNER TO "postgres";


CREATE TYPE "public"."ethnicity_type" AS ENUM (
    'Branca',
    'Preta',
    'Parda',
    'Amarela',
    'Indígena',
    'Não declarada'
);


ALTER TYPE "public"."ethnicity_type" OWNER TO "postgres";


CREATE TYPE "public"."gender_type" AS ENUM (
    'Masculino',
    'Feminino'
);


ALTER TYPE "public"."gender_type" OWNER TO "postgres";


CREATE TYPE "public"."graduate_status" AS ENUM (
    'Sim',
    'Não'
);


ALTER TYPE "public"."graduate_status" OWNER TO "postgres";


CREATE TYPE "public"."marital_status_type" AS ENUM (
    'Solteiro',
    'Casado',
    'Divorciado',
    'Viúvo',
    'Separado',
    'União Estável',
    'Não Informado'
);


ALTER TYPE "public"."marital_status_type" OWNER TO "postgres";


CREATE TYPE "public"."period" AS ENUM (
    'Manhã',
    'Tarde',
    'Noite'
);


ALTER TYPE "public"."period" OWNER TO "postgres";


CREATE TYPE "public"."regime_type" AS ENUM (
    'Presencial',
    'EAD',
    'Semi-Presencial'
);


ALTER TYPE "public"."regime_type" OWNER TO "postgres";


CREATE TYPE "public"."residence_zone_type" AS ENUM (
    'Urbana',
    'Rural'
);


ALTER TYPE "public"."residence_zone_type" OWNER TO "postgres";


CREATE TYPE "public"."responsibletype" AS ENUM (
    'Pai',
    'Mãe',
    'Ambos'
);


ALTER TYPE "public"."responsibletype" OWNER TO "postgres";


CREATE TYPE "public"."situation_type" AS ENUM (
    'Pendente',
    'Cursando',
    'Aprovado',
    'Aprovado pelo Conselho',
    'Aprovado com Dependência',
    'Reprovado',
    'Transferido',
    'Abandono',
    'Falecido'
);


ALTER TYPE "public"."situation_type" OWNER TO "postgres";


CREATE TYPE "public"."status" AS ENUM (
    'Ativo',
    'Inativo',
    'Graduado',
    'Suspenso',
    'Transferido'
);


ALTER TYPE "public"."status" OWNER TO "postgres";


CREATE TYPE "public"."teaching_type" AS ENUM (
    'Complementar',
    'Padrão'
);


ALTER TYPE "public"."teaching_type" OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."calculate_business_days"("start_date" "date", "end_date" "date") RETURNS integer
    LANGUAGE "plpgsql"
    AS $$
DECLARE
    business_days INTEGER;
BEGIN
    -- Calcular dias úteis excluindo fins de semana e feriados
    SELECT COUNT(*)
    INTO business_days
    FROM generate_series(start_date, end_date, INTERVAL '1 day') AS day
    WHERE EXTRACT(ISODOW FROM day) < 6  -- Excluir sábados (6) e domingos (7)
      AND day::DATE NOT IN (SELECT holiday_date FROM holidays); -- Excluir feriados

    RETURN business_days;
END;
$$;


ALTER FUNCTION "public"."calculate_business_days"("start_date" "date", "end_date" "date") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."can_delete"("p_table" character varying) RETURNS boolean
    LANGUAGE "sql" SECURITY DEFINER
    AS $$
SELECT EXISTS (SELECT 1
               FROM role_permission AS rp
                        join user_role ur on ur.role_id = rp.role_id
               WHERE ur.user_id = auth.uid()
                 AND rp.school_id = ur.school_id
                 AND rp."table" = p_table
                 AND rp.school_id = current_school()
                 AND can_delete = true);
$$;


ALTER FUNCTION "public"."can_delete"("p_table" character varying) OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."can_insert"("p_table" character varying) RETURNS boolean
    LANGUAGE "sql" SECURITY DEFINER
    AS $$
SELECT EXISTS (SELECT 1
               FROM role_permission AS rp
                        join user_role ur on ur.role_id = rp.role_id
               WHERE ur.user_id = auth.uid()
                 AND rp.school_id = ur.school_id
                 AND rp."table" = p_table
                 AND rp.school_id = current_school()
                 AND rp.can_insert = true);
$$;


ALTER FUNCTION "public"."can_insert"("p_table" character varying) OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."can_select"("p_table" character varying) RETURNS boolean
    LANGUAGE "sql" SECURITY DEFINER
    AS $$
SELECT EXISTS (SELECT 1
               FROM role_permission AS rp
                        join user_role ur on ur.role_id = rp.role_id
               WHERE ur.user_id = auth.uid()
                 AND rp.school_id = ur.school_id
                 AND rp."table" = p_table
                 AND rp.school_id = current_school()
                 AND can_select = true);
$$;


ALTER FUNCTION "public"."can_select"("p_table" character varying) OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."can_update"("p_table" character varying) RETURNS boolean
    LANGUAGE "sql" SECURITY DEFINER
    AS $$
SELECT EXISTS (SELECT 1
               FROM role_permission AS rp
                        join user_role ur on ur.role_id = rp.role_id
               WHERE ur.user_id = auth.uid()
                 AND rp.school_id = ur.school_id
                 AND rp."table" = p_table
                 AND rp.school_id = current_school()
                 AND can_update = true);
$$;


ALTER FUNCTION "public"."can_update"("p_table" character varying) OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."current_school"() RETURNS "uuid"
    LANGUAGE "sql" SECURITY DEFINER
    AS $$
SELECT get_header('xschoolid')::uuid;
$$;


ALTER FUNCTION "public"."current_school"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_header"("item" "text") RETURNS "text"
    LANGUAGE "sql" STABLE
    AS $$
SELECT current_setting('request.headers', true)::jsonb ->> item;
$$;


ALTER FUNCTION "public"."get_header"("item" "text") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."my_schools"() RETURNS SETOF "uuid"
    LANGUAGE "sql" SECURITY DEFINER
    AS $$
SELECT school_id
FROM user_role
WHERE user_id = auth.uid();
$$;


ALTER FUNCTION "public"."my_schools"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."set_weekday"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
    NEW.weekday := TO_CHAR(NEW.holiday_date, 'Day');
    RETURN NEW;
END;
$$;


ALTER FUNCTION "public"."set_weekday"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."setup_rls_policies"("ignore_tables" "text"[] DEFAULT '{}'::"text"[]) RETURNS "void"
    LANGUAGE "plpgsql"
    AS $$
DECLARE
    table_record RECORD;
BEGIN
    FOR table_record IN
        SELECT table_name
        FROM information_schema.tables
        WHERE table_schema = 'public'
          AND table_type = 'BASE TABLE'
          AND table_name NOT IN (SELECT unnest(ignore_tables))
        LOOP
            -- Check if the table has a school_id column
            IF EXISTS (SELECT 1
                       FROM information_schema.columns
                       WHERE table_schema = 'public'
                         AND table_name = table_record.table_name
                         AND column_name = 'school_id') THEN
                -- Enable RLS on the table
                EXECUTE format('ALTER TABLE %I ENABLE ROW LEVEL SECURITY', table_record.table_name);

                -- Create SELECT policy
                EXECUTE format('
                CREATE POLICY %I_select_policy ON %I
                FOR SELECT
                USING (
                    %I.school_id = current_school()
                    AND can_select(%L)
                )', table_record.table_name, table_record.table_name, table_record.table_name, table_record.table_name);

                -- Create INSERT policy
                EXECUTE format('
                CREATE POLICY %I_insert_policy ON %I
                FOR INSERT
                WITH CHECK (
                    %I.school_id = current_school()
                    AND can_insert(%L)
                )', table_record.table_name, table_record.table_name, table_record.table_name, table_record.table_name);

                -- Create UPDATE policy
                EXECUTE format('
                CREATE POLICY %I_update_policy ON %I
                FOR UPDATE
                USING (
                    %I.school_id = current_school()
                    AND can_update(%L)
                )
                WITH CHECK (
                    %I.school_id = current_school()
                    AND can_update(%L)
                )', table_record.table_name, table_record.table_name, table_record.table_name, table_record.table_name,
                               table_record.table_name, table_record.table_name);

                -- Create DELETE policy
                EXECUTE format('
                CREATE POLICY %I_delete_policy ON %I
                FOR DELETE
                USING (
                    %I.school_id = current_school()
                    AND can_delete(%L)
                )', table_record.table_name, table_record.table_name, table_record.table_name, table_record.table_name);

                RAISE NOTICE 'Created policies for table: %', table_record.table_name;
            ELSE
                RAISE NOTICE 'Skipping table % (no school_id column)', table_record.table_name;
            END IF;
        END LOOP;
END;
$$;


ALTER FUNCTION "public"."setup_rls_policies"("ignore_tables" "text"[]) OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."update_updated_at_column"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$;


ALTER FUNCTION "public"."update_updated_at_column"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."validate_role"("role_name" "text") RETURNS boolean
    LANGUAGE "plpgsql"
    AS $$
BEGIN
  RETURN role_name IN ('adm', 'teacher', 'student');
END;
$$;


ALTER FUNCTION "public"."validate_role"("role_name" "text") OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."_teachertotimetable" (
    "a" "uuid" NOT NULL,
    "b" "uuid" NOT NULL
);


ALTER TABLE "public"."_teachertotimetable" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."academic_year" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "school_id" "uuid" NOT NULL,
    "template_id" "uuid" NOT NULL,
    "ref_year" integer NOT NULL,
    "metadata" "jsonb",
    "created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updated_at" timestamp with time zone,
    "deleted_at" timestamp with time zone,
    "user_created" "uuid" DEFAULT "auth"."uid"()
);


ALTER TABLE "public"."academic_year" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."academic_year_template" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "ref_year" integer NOT NULL,
    "name" character varying(100) NOT NULL,
    "stages" "jsonb" NOT NULL,
    "stage_count" integer GENERATED ALWAYS AS ("jsonb_array_length"("stages")) STORED,
    "metadata" "jsonb",
    "created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updated_at" timestamp with time zone,
    "deleted_at" timestamp with time zone,
    "user_created" "uuid" DEFAULT "auth"."uid"()
);


ALTER TABLE "public"."academic_year_template" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."attendance" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "school_id" "uuid" NOT NULL,
    "student_id" "uuid" NOT NULL,
    "date" timestamp with time zone NOT NULL,
    "status" "public"."attendance_status" NOT NULL,
    "metadata" "jsonb",
    "user_created" "uuid" DEFAULT "auth"."uid"(),
    "created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "deleted_at" timestamp with time zone,
    "updated_at" timestamp with time zone
);


ALTER TABLE "public"."attendance" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."class_session" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "school_id" "uuid" NOT NULL,
    "discipline_id" "uuid" NOT NULL,
    "timetable_id" "uuid" NOT NULL,
    "day_of_week" "public"."day_of_week" NOT NULL,
    "start_time" time without time zone NOT NULL,
    "end_time" time without time zone NOT NULL,
    "metadata" "jsonb",
    "user_created" "uuid" DEFAULT "auth"."uid"(),
    "created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "deleted_at" timestamp with time zone,
    "updated_at" timestamp with time zone
);


ALTER TABLE "public"."class_session" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."classroom" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "school_id" "uuid" NOT NULL,
    "series_id" "uuid" NOT NULL,
    "institution_id" "uuid" NOT NULL,
    "course_id" "uuid" NOT NULL,
    "teacher_id" "uuid" NOT NULL,
    "maxStudents" integer NOT NULL,
    "startTime" time without time zone,
    "startTimeInterval" time without time zone,
    "endTimeInterval" time without time zone,
    "endTime" time without time zone,
    "day_of_week" "public"."day_of_week",
    "name" character varying(100) NOT NULL,
    "period" "public"."period" DEFAULT 'Manhã'::"public"."period",
    "status" "public"."status" DEFAULT 'Ativo'::"public"."status" NOT NULL,
    "abbreviation" character varying(100),
    "year" integer NOT NULL,
    "metadata" "jsonb",
    "user_created" "uuid" DEFAULT "auth"."uid"(),
    "created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "deleted_at" timestamp with time zone,
    "updated_at" timestamp with time zone
);


ALTER TABLE "public"."classroom" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."course" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "name" character varying(100) NOT NULL,
    "status" "public"."status" DEFAULT 'Ativo'::"public"."status",
    "metadata" "jsonb",
    "user_created" "uuid" DEFAULT "auth"."uid"(),
    "created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "deleted_at" timestamp with time zone,
    "updated_at" timestamp with time zone,
    "teaching_type" "public"."teaching_type",
    "regime_type" "public"."regime_type",
    "course_modality" "public"."course_modality",
    "workload" character varying,
    "institution_id" "uuid",
    "course_stage" character varying,
    "description" "text",
    "school_id" "uuid"
);


ALTER TABLE "public"."course" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."course_series_discipline" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "course_id" "uuid",
    "series_id" "uuid",
    "discipline_id" "uuid",
    "workload" numeric,
    "deleted_at" timestamp with time zone
);


ALTER TABLE "public"."course_series_discipline" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."discipline" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "name" character varying(100) NOT NULL,
    "status" "public"."status" DEFAULT 'Ativo'::"public"."status",
    "metadata" "jsonb",
    "user_created" "uuid" DEFAULT "auth"."uid"(),
    "created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "deleted_at" timestamp with time zone,
    "updated_at" timestamp with time zone,
    "workload" numeric
);


ALTER TABLE "public"."discipline" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."document" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "file_name" character varying(255) NOT NULL,
    "mime_type" character varying(255) NOT NULL,
    "size" bigint NOT NULL,
    "is_current_version" boolean DEFAULT true,
    "file_hash" "text",
    "upload_date" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    "storage_path" "text" NOT NULL,
    "version" integer DEFAULT 1,
    "compression_applied" boolean DEFAULT false,
    "metadata" "jsonb",
    "is_deleted" boolean DEFAULT false,
    "created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updated_at" timestamp with time zone,
    "deleted_at" timestamp with time zone,
    "user_created" "uuid" DEFAULT "auth"."uid"()
);


ALTER TABLE "public"."document" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."enrollment" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "school_id" "uuid" NOT NULL,
    "student_id" "uuid" NOT NULL,
    "course_id" "uuid" NOT NULL,
    "classroom_id" "uuid" NOT NULL,
    "series_id" "uuid" NOT NULL,
    "name" character varying(100) NOT NULL,
    "created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "deleted_at" timestamp with time zone,
    "updated_at" timestamp with time zone,
    "date_enrollment" "date" NOT NULL,
    "observations" character varying(200),
    "status" "public"."status" DEFAULT 'Ativo'::"public"."status",
    "situation" "public"."situation_type",
    "enrollmentCode" character varying(100),
    "institution_id" "uuid",
    "pre_enrollment_id" "uuid"
);


ALTER TABLE "public"."enrollment" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."grade" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "school_id" "uuid" NOT NULL,
    "student_id" "uuid" NOT NULL,
    "discipline_id" "uuid" NOT NULL,
    "value" double precision NOT NULL,
    "date" timestamp with time zone NOT NULL,
    "metadata" "jsonb",
    "user_created" "uuid" DEFAULT "auth"."uid"(),
    "created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "deleted_at" timestamp with time zone,
    "updated_at" timestamp with time zone
);


ALTER TABLE "public"."grade" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."holidays" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "name" character varying(100) NOT NULL,
    "holiday_date" "date" NOT NULL,
    "description" character varying(100),
    "weekday" character varying(10)
);


ALTER TABLE "public"."holidays" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."institution" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "name" character varying(100) NOT NULL,
    "address" character varying(255),
    "city" character varying(100),
    "state" character(2),
    "postalcode" character(10),
    "phone" character varying(15),
    "email" character varying(255),
    "metadata" "jsonb",
    "user_created" "uuid" DEFAULT "auth"."uid"(),
    "singleton" integer DEFAULT 1 NOT NULL,
    "created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "deleted_at" timestamp with time zone,
    "updated_at" timestamp with time zone
);


ALTER TABLE "public"."institution" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."institution_settings" (
    "id" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "institution_id" "uuid",
    "date_opening" "date",
    "date_closing" "date",
    "school_days" numeric,
    "date_start" "date",
    "date_end" "date"
);


ALTER TABLE "public"."institution_settings" OWNER TO "postgres";


ALTER TABLE "public"."institution_settings" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."institution_settings_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "public"."pre_enrollment" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "school_id" "uuid" NOT NULL,
    "student_id" "uuid" NOT NULL,
    "course_id" "uuid" NOT NULL,
    "series_id" "uuid" NOT NULL,
    "created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "deleted_at" timestamp with time zone,
    "updated_at" timestamp with time zone,
    "date_enrollment" "date" NOT NULL,
    "observations" character varying(200),
    "status" "public"."status" DEFAULT 'Ativo'::"public"."status",
    "situation" "public"."situation_type",
    "pre_enrollment_code" character varying(100)
);


ALTER TABLE "public"."pre_enrollment" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."role" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "school_id" "uuid" NOT NULL,
    "name" character varying(100) NOT NULL
);


ALTER TABLE "public"."role" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."role_permission" (
    "school_id" "uuid" NOT NULL,
    "role_id" "uuid" NOT NULL,
    "table" character varying NOT NULL,
    "can_select" boolean NOT NULL,
    "can_insert" boolean NOT NULL,
    "can_update" boolean NOT NULL,
    "can_delete" boolean NOT NULL
);


ALTER TABLE "public"."role_permission" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."school" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "name" character varying(100) NOT NULL,
    "address" character varying(255),
    "city" character varying(100),
    "state" character(2),
    "postalcode" character(10),
    "school_zone" character varying(10),
    "phone" character varying(15),
    "email" character varying(100),
    "website" character varying(255),
    "social_network" character varying(255),
    "institution_id" "uuid" NOT NULL,
    "active" boolean DEFAULT true NOT NULL,
    "abbreviation" character varying(255),
    "logourl" character varying(255),
    "created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "deleted_at" timestamp with time zone,
    "updated_at" timestamp with time zone,
    "user_created" "uuid" DEFAULT "auth"."uid"()
);


ALTER TABLE "public"."school" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."school_course" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "school_id" "uuid",
    "course_id" "uuid"
);


ALTER TABLE "public"."school_course" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."school_settings" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "date_opening" "date",
    "date_closing" "date",
    "school_days" numeric,
    "date_start" "date",
    "date_end" "date",
    "institution_id" "uuid"
);


ALTER TABLE "public"."school_settings" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."series" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "course_id" "uuid" NOT NULL,
    "institution_id" "uuid",
    "timetable_id" "uuid",
    "name" character varying(100) NOT NULL,
    "course_stage" "public"."course_stage_type" DEFAULT 'Etapa 1'::"public"."course_stage_type" NOT NULL,
    "graduate" "public"."graduate_status" DEFAULT 'Sim'::"public"."graduate_status" NOT NULL,
    "workload" character varying(100) NOT NULL,
    "school_days" character varying(100) NOT NULL,
    "metadata" "jsonb",
    "user_created" "uuid" DEFAULT "auth"."uid"(),
    "created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "deleted_at" timestamp with time zone,
    "updated_at" timestamp with time zone,
    "school_id" "uuid"
);


ALTER TABLE "public"."series" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."student" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "name" character varying(100) NOT NULL,
    "birthdate" "date" NOT NULL,
    "gender" "public"."gender_type" DEFAULT 'Masculino'::"public"."gender_type",
    "place_of_birth" character varying(100),
    "postalcode" character varying(100),
    "residence_zone" "public"."residence_zone_type" DEFAULT 'Urbana'::"public"."residence_zone_type",
    "number_address" character varying(100),
    "cpf" character varying(100),
    "neighborhood" character varying(100),
    "city" character varying(100),
    "complement" character varying(100),
    "father_name" character varying(100),
    "father_email" character varying(100),
    "father_cpf" character varying(100),
    "father_phone" character varying(100),
    "mother_name" character varying(100),
    "mother_email" character varying(100),
    "mother_cpf" character varying(100),
    "mother_phone" character varying(100),
    "rg_number" character varying(100),
    "rg_state" character(2),
    "rg_issue_date" "date",
    "rg_issuer" character varying(100),
    "birth_certificate" character varying(100),
    "docsType" character varying(100),
    "responsibleType" "public"."responsibletype" DEFAULT 'Pai'::"public"."responsibletype",
    "email" character varying(255),
    "phone" character varying(15) NOT NULL,
    "address" character varying(255),
    "status" "public"."status" DEFAULT 'Ativo'::"public"."status",
    "photo" "bytea",
    "metadata" "jsonb",
    "user_created" "uuid" DEFAULT "auth"."uid"(),
    "created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "deleted_at" timestamp with time zone,
    "updated_at" timestamp with time zone,
    "ethnicity" "public"."ethnicity_type",
    "deficiency" "public"."deficiency_type",
    "deficiency_description" character varying,
    "city_state" character varying
);


ALTER TABLE "public"."student" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."teacher" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "school_id" "uuid" NOT NULL,
    "name" character varying(100) NOT NULL,
    "birthdate" "date" NOT NULL,
    "email" character varying(255),
    "phone" character varying(15),
    "address" character varying(255),
    "qualifications" "jsonb",
    "status" "public"."status" DEFAULT 'Ativo'::"public"."status",
    "metadata" "jsonb",
    "user_created" "uuid" DEFAULT "auth"."uid"(),
    "created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "deleted_at" timestamp with time zone,
    "updated_at" timestamp with time zone,
    "showDetails" boolean
);


ALTER TABLE "public"."teacher" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."teacher_to_timetable" (
    "school_id" "uuid" NOT NULL,
    "teacher_id" "uuid" NOT NULL,
    "timetable_id" "uuid" NOT NULL
);


ALTER TABLE "public"."teacher_to_timetable" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."timetable" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "school_id" "uuid" NOT NULL,
    "classroom_id" "uuid" NOT NULL,
    "discipline_id" "uuid",
    "name" character varying(100) NOT NULL,
    "metadata" "jsonb",
    "user_created" "uuid" DEFAULT "auth"."uid"(),
    "created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "deleted_at" timestamp with time zone,
    "updated_at" timestamp with time zone
);


ALTER TABLE "public"."timetable" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."timetable_school" (
    "timetable_id" "uuid" NOT NULL,
    "school_id" "uuid" NOT NULL,
    "metadata" "jsonb",
    "user_created" "uuid" DEFAULT "auth"."uid"(),
    "created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "deleted_at" timestamp with time zone,
    "updated_at" timestamp with time zone
);


ALTER TABLE "public"."timetable_school" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."user_role" (
    "school_id" "uuid" NOT NULL,
    "role_id" "uuid" NOT NULL,
    "user_id" "uuid" NOT NULL
);


ALTER TABLE "public"."user_role" OWNER TO "postgres";


ALTER TABLE ONLY "public"."academic_year"
    ADD CONSTRAINT "academic_year_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."academic_year_template"
    ADD CONSTRAINT "academic_year_template_name_key" UNIQUE ("name");



ALTER TABLE ONLY "public"."academic_year_template"
    ADD CONSTRAINT "academic_year_template_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."attendance"
    ADD CONSTRAINT "attendance_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."class_session"
    ADD CONSTRAINT "class_session_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."classroom"
    ADD CONSTRAINT "classroom_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."course"
    ADD CONSTRAINT "course_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."course_series_discipline"
    ADD CONSTRAINT "course_series_discipline_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."discipline"
    ADD CONSTRAINT "discipline_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."document"
    ADD CONSTRAINT "document_file_hash_key" UNIQUE ("file_hash");



ALTER TABLE ONLY "public"."document"
    ADD CONSTRAINT "document_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."enrollment"
    ADD CONSTRAINT "enrollment_enrollmentcode_key" UNIQUE ("enrollmentCode");



ALTER TABLE ONLY "public"."enrollment"
    ADD CONSTRAINT "enrollment_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."grade"
    ADD CONSTRAINT "grade_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."holidays"
    ADD CONSTRAINT "holidays_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."institution"
    ADD CONSTRAINT "institution_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."institution_settings"
    ADD CONSTRAINT "institution_settings_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."institution"
    ADD CONSTRAINT "institution_singleton_key" UNIQUE ("singleton");



ALTER TABLE ONLY "public"."pre_enrollment"
    ADD CONSTRAINT "pre_enrollment_enrollmentcode_key" UNIQUE ("pre_enrollment_code");



ALTER TABLE ONLY "public"."pre_enrollment"
    ADD CONSTRAINT "pre_enrollment_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."role_permission"
    ADD CONSTRAINT "role_permission_pkey" PRIMARY KEY ("school_id", "role_id", "table");



ALTER TABLE ONLY "public"."role"
    ADD CONSTRAINT "role_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."school_course"
    ADD CONSTRAINT "school_course_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."school"
    ADD CONSTRAINT "school_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."school_settings"
    ADD CONSTRAINT "school_settings_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."series"
    ADD CONSTRAINT "series_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."student"
    ADD CONSTRAINT "student_birth_certificate_key" UNIQUE ("birth_certificate");



ALTER TABLE ONLY "public"."student"
    ADD CONSTRAINT "student_cpf_key" UNIQUE ("cpf");



ALTER TABLE ONLY "public"."student"
    ADD CONSTRAINT "student_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."student"
    ADD CONSTRAINT "student_rg_number_key" UNIQUE ("rg_number");



ALTER TABLE ONLY "public"."teacher"
    ADD CONSTRAINT "teacher_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."teacher_to_timetable"
    ADD CONSTRAINT "teacher_to_timetable_pkey" PRIMARY KEY ("school_id", "teacher_id", "timetable_id");



ALTER TABLE ONLY "public"."timetable"
    ADD CONSTRAINT "timetable_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."timetable_school"
    ADD CONSTRAINT "timetable_school_pkey" PRIMARY KEY ("timetable_id", "school_id");



ALTER TABLE ONLY "public"."user_role"
    ADD CONSTRAINT "user_role_pkey" PRIMARY KEY ("school_id", "role_id", "user_id");



CREATE OR REPLACE TRIGGER "set_updated_at_academic_year" AFTER UPDATE ON "public"."academic_year" FOR EACH ROW WHEN (("old".* IS DISTINCT FROM "new".*)) EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "set_updated_at_academic_year_template" AFTER UPDATE ON "public"."academic_year_template" FOR EACH ROW WHEN (("old".* IS DISTINCT FROM "new".*)) EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "set_updated_at_attendance" AFTER UPDATE ON "public"."attendance" FOR EACH ROW WHEN (("old".* IS DISTINCT FROM "new".*)) EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "set_updated_at_class_session" AFTER UPDATE ON "public"."class_session" FOR EACH ROW WHEN (("old".* IS DISTINCT FROM "new".*)) EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "set_updated_at_classroom" AFTER UPDATE ON "public"."classroom" FOR EACH ROW WHEN (("old".* IS DISTINCT FROM "new".*)) EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "set_updated_at_course" AFTER UPDATE ON "public"."course" FOR EACH ROW WHEN (("old".* IS DISTINCT FROM "new".*)) EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "set_updated_at_discipline" AFTER UPDATE ON "public"."discipline" FOR EACH ROW WHEN (("old".* IS DISTINCT FROM "new".*)) EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "set_updated_at_document" AFTER UPDATE ON "public"."document" FOR EACH ROW WHEN (("old".* IS DISTINCT FROM "new".*)) EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "set_updated_at_enrollment" AFTER UPDATE ON "public"."enrollment" FOR EACH ROW WHEN (("old".* IS DISTINCT FROM "new".*)) EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "set_updated_at_grade" AFTER UPDATE ON "public"."grade" FOR EACH ROW WHEN (("old".* IS DISTINCT FROM "new".*)) EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "set_updated_at_institution" AFTER UPDATE ON "public"."institution" FOR EACH ROW WHEN (("old".* IS DISTINCT FROM "new".*)) EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "set_updated_at_school" AFTER UPDATE ON "public"."school" FOR EACH ROW WHEN (("old".* IS DISTINCT FROM "new".*)) EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "set_updated_at_series" AFTER UPDATE ON "public"."series" FOR EACH ROW WHEN (("old".* IS DISTINCT FROM "new".*)) EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "set_updated_at_student" AFTER UPDATE ON "public"."student" FOR EACH ROW WHEN (("old".* IS DISTINCT FROM "new".*)) EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "set_updated_at_teacher" AFTER UPDATE ON "public"."teacher" FOR EACH ROW WHEN (("old".* IS DISTINCT FROM "new".*)) EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "set_updated_at_timetable" AFTER UPDATE ON "public"."timetable" FOR EACH ROW WHEN (("old".* IS DISTINCT FROM "new".*)) EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "set_updated_at_timetable_school" AFTER UPDATE ON "public"."timetable_school" FOR EACH ROW WHEN (("old".* IS DISTINCT FROM "new".*)) EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "trg_set_weekday" BEFORE INSERT OR UPDATE ON "public"."holidays" FOR EACH ROW EXECUTE FUNCTION "public"."set_weekday"();



ALTER TABLE ONLY "public"."_teachertotimetable"
    ADD CONSTRAINT "_teachertotimetable_a_fkey" FOREIGN KEY ("a") REFERENCES "public"."teacher"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."_teachertotimetable"
    ADD CONSTRAINT "_teachertotimetable_b_fkey" FOREIGN KEY ("b") REFERENCES "public"."timetable"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."attendance"
    ADD CONSTRAINT "attendance_school_id_fkey" FOREIGN KEY ("school_id") REFERENCES "public"."school"("id") ON UPDATE CASCADE ON DELETE RESTRICT;



ALTER TABLE ONLY "public"."attendance"
    ADD CONSTRAINT "attendance_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "public"."student"("id") ON UPDATE CASCADE ON DELETE RESTRICT;



ALTER TABLE ONLY "public"."class_session"
    ADD CONSTRAINT "class_session_discipline_id_fkey" FOREIGN KEY ("discipline_id") REFERENCES "public"."discipline"("id") ON UPDATE CASCADE ON DELETE RESTRICT;



ALTER TABLE ONLY "public"."class_session"
    ADD CONSTRAINT "class_session_school_id_fkey" FOREIGN KEY ("school_id") REFERENCES "public"."school"("id") ON UPDATE CASCADE ON DELETE RESTRICT;



ALTER TABLE ONLY "public"."class_session"
    ADD CONSTRAINT "class_session_timetable_id_fkey" FOREIGN KEY ("timetable_id") REFERENCES "public"."timetable"("id") ON UPDATE CASCADE ON DELETE RESTRICT;



ALTER TABLE ONLY "public"."classroom"
    ADD CONSTRAINT "classroom_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "public"."course"("id") ON UPDATE CASCADE ON DELETE RESTRICT;



ALTER TABLE ONLY "public"."classroom"
    ADD CONSTRAINT "classroom_institution_id_fkey" FOREIGN KEY ("institution_id") REFERENCES "public"."institution"("id") ON UPDATE CASCADE ON DELETE RESTRICT;



ALTER TABLE ONLY "public"."classroom"
    ADD CONSTRAINT "classroom_school_id_fkey" FOREIGN KEY ("school_id") REFERENCES "public"."school"("id") ON UPDATE CASCADE ON DELETE RESTRICT;



ALTER TABLE ONLY "public"."classroom"
    ADD CONSTRAINT "classroom_seriesid_fkey" FOREIGN KEY ("series_id") REFERENCES "public"."series"("id") ON UPDATE CASCADE ON DELETE RESTRICT;



ALTER TABLE ONLY "public"."classroom"
    ADD CONSTRAINT "classroom_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "public"."teacher"("id") ON UPDATE CASCADE ON DELETE RESTRICT;



ALTER TABLE ONLY "public"."course"
    ADD CONSTRAINT "course_institution_id_fkey" FOREIGN KEY ("institution_id") REFERENCES "public"."institution"("id");



ALTER TABLE ONLY "public"."course"
    ADD CONSTRAINT "course_school_id_fkey" FOREIGN KEY ("school_id") REFERENCES "public"."school"("id");



ALTER TABLE ONLY "public"."course_series_discipline"
    ADD CONSTRAINT "course_series_discipline_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "public"."course"("id");



ALTER TABLE ONLY "public"."course_series_discipline"
    ADD CONSTRAINT "course_series_discipline_discipline_id_fkey" FOREIGN KEY ("discipline_id") REFERENCES "public"."discipline"("id");



ALTER TABLE ONLY "public"."course_series_discipline"
    ADD CONSTRAINT "course_series_discipline_series_id_fkey" FOREIGN KEY ("series_id") REFERENCES "public"."series"("id");



ALTER TABLE ONLY "public"."enrollment"
    ADD CONSTRAINT "enrollment_classroom_id_fkey" FOREIGN KEY ("classroom_id") REFERENCES "public"."classroom"("id") ON UPDATE CASCADE ON DELETE RESTRICT;



ALTER TABLE ONLY "public"."enrollment"
    ADD CONSTRAINT "enrollment_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "public"."course"("id") ON UPDATE CASCADE ON DELETE RESTRICT;



ALTER TABLE ONLY "public"."enrollment"
    ADD CONSTRAINT "enrollment_institution_id_fkey" FOREIGN KEY ("institution_id") REFERENCES "public"."institution"("id");



ALTER TABLE ONLY "public"."enrollment"
    ADD CONSTRAINT "enrollment_pre_enrollment_id_fkey" FOREIGN KEY ("pre_enrollment_id") REFERENCES "public"."pre_enrollment"("id");



ALTER TABLE ONLY "public"."enrollment"
    ADD CONSTRAINT "enrollment_school_id_fkey" FOREIGN KEY ("school_id") REFERENCES "public"."school"("id") ON UPDATE CASCADE ON DELETE RESTRICT;



ALTER TABLE ONLY "public"."enrollment"
    ADD CONSTRAINT "enrollment_series_id_fkey" FOREIGN KEY ("series_id") REFERENCES "public"."series"("id") ON UPDATE CASCADE ON DELETE RESTRICT;



ALTER TABLE ONLY "public"."enrollment"
    ADD CONSTRAINT "enrollment_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "public"."student"("id") ON UPDATE CASCADE ON DELETE RESTRICT;



ALTER TABLE ONLY "public"."grade"
    ADD CONSTRAINT "grade_discipline_id_fkey" FOREIGN KEY ("discipline_id") REFERENCES "public"."discipline"("id") ON UPDATE CASCADE ON DELETE RESTRICT;



ALTER TABLE ONLY "public"."grade"
    ADD CONSTRAINT "grade_disciplineid_fkey" FOREIGN KEY ("discipline_id") REFERENCES "public"."discipline"("id") ON UPDATE CASCADE ON DELETE RESTRICT;



ALTER TABLE ONLY "public"."grade"
    ADD CONSTRAINT "grade_school_id_fkey" FOREIGN KEY ("school_id") REFERENCES "public"."school"("id") ON UPDATE CASCADE ON DELETE RESTRICT;



ALTER TABLE ONLY "public"."grade"
    ADD CONSTRAINT "grade_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "public"."student"("id") ON UPDATE CASCADE ON DELETE RESTRICT;



ALTER TABLE ONLY "public"."grade"
    ADD CONSTRAINT "grade_studentid_fkey" FOREIGN KEY ("student_id") REFERENCES "public"."student"("id") ON UPDATE CASCADE ON DELETE RESTRICT;



ALTER TABLE ONLY "public"."institution_settings"
    ADD CONSTRAINT "institution_settings_institution_id_fkey" FOREIGN KEY ("institution_id") REFERENCES "public"."institution"("id");



ALTER TABLE ONLY "public"."pre_enrollment"
    ADD CONSTRAINT "pre_enrollment_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "public"."course"("id") ON UPDATE CASCADE ON DELETE RESTRICT;



ALTER TABLE ONLY "public"."pre_enrollment"
    ADD CONSTRAINT "pre_enrollment_school_id_fkey" FOREIGN KEY ("school_id") REFERENCES "public"."school"("id") ON UPDATE CASCADE ON DELETE RESTRICT;



ALTER TABLE ONLY "public"."pre_enrollment"
    ADD CONSTRAINT "pre_enrollment_series_id_fkey" FOREIGN KEY ("series_id") REFERENCES "public"."series"("id") ON UPDATE CASCADE ON DELETE RESTRICT;



ALTER TABLE ONLY "public"."pre_enrollment"
    ADD CONSTRAINT "pre_enrollment_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "public"."student"("id") ON UPDATE CASCADE ON DELETE RESTRICT;



ALTER TABLE ONLY "public"."role_permission"
    ADD CONSTRAINT "role_permission_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "public"."role"("id") ON UPDATE CASCADE ON DELETE RESTRICT;



ALTER TABLE ONLY "public"."role_permission"
    ADD CONSTRAINT "role_permission_school_id_fkey" FOREIGN KEY ("school_id") REFERENCES "public"."school"("id") ON UPDATE CASCADE ON DELETE RESTRICT;



ALTER TABLE ONLY "public"."role"
    ADD CONSTRAINT "role_school_id_fkey" FOREIGN KEY ("school_id") REFERENCES "public"."school"("id") ON UPDATE CASCADE ON DELETE RESTRICT;



ALTER TABLE ONLY "public"."school_course"
    ADD CONSTRAINT "school_course_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "public"."course"("id");



ALTER TABLE ONLY "public"."school_course"
    ADD CONSTRAINT "school_course_school_id_fkey" FOREIGN KEY ("school_id") REFERENCES "public"."school"("id");



ALTER TABLE ONLY "public"."school"
    ADD CONSTRAINT "school_institutionid_fkey" FOREIGN KEY ("institution_id") REFERENCES "public"."institution"("id") ON UPDATE CASCADE ON DELETE RESTRICT;



ALTER TABLE ONLY "public"."school_settings"
    ADD CONSTRAINT "school_settings_institution_id_fkey" FOREIGN KEY ("institution_id") REFERENCES "public"."institution"("id");



ALTER TABLE ONLY "public"."series"
    ADD CONSTRAINT "series_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "public"."course"("id") ON UPDATE CASCADE ON DELETE RESTRICT;



ALTER TABLE ONLY "public"."series"
    ADD CONSTRAINT "series_courseid_fkey" FOREIGN KEY ("course_id") REFERENCES "public"."course"("id") ON UPDATE CASCADE ON DELETE RESTRICT;



ALTER TABLE ONLY "public"."series"
    ADD CONSTRAINT "series_institution_id_fkey" FOREIGN KEY ("institution_id") REFERENCES "public"."institution"("id") ON UPDATE CASCADE ON DELETE SET NULL;



ALTER TABLE ONLY "public"."series"
    ADD CONSTRAINT "series_school_id_fkey" FOREIGN KEY ("school_id") REFERENCES "public"."school"("id");



ALTER TABLE ONLY "public"."series"
    ADD CONSTRAINT "series_timetable_id_fkey" FOREIGN KEY ("timetable_id") REFERENCES "public"."timetable"("id") ON UPDATE CASCADE ON DELETE SET NULL;



ALTER TABLE ONLY "public"."series"
    ADD CONSTRAINT "series_timetableid_fkey" FOREIGN KEY ("timetable_id") REFERENCES "public"."timetable"("id") ON UPDATE CASCADE ON DELETE SET NULL;



ALTER TABLE ONLY "public"."teacher"
    ADD CONSTRAINT "teacher_school_id_fkey" FOREIGN KEY ("school_id") REFERENCES "public"."school"("id") ON UPDATE CASCADE ON DELETE RESTRICT;



ALTER TABLE ONLY "public"."teacher"
    ADD CONSTRAINT "teacher_schoolid_fkey" FOREIGN KEY ("school_id") REFERENCES "public"."school"("id") ON UPDATE CASCADE ON DELETE RESTRICT;



ALTER TABLE ONLY "public"."teacher_to_timetable"
    ADD CONSTRAINT "teacher_to_timetable_school_id_fkey" FOREIGN KEY ("school_id") REFERENCES "public"."school"("id") ON UPDATE CASCADE ON DELETE RESTRICT;



ALTER TABLE ONLY "public"."teacher_to_timetable"
    ADD CONSTRAINT "teacher_to_timetable_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "public"."teacher"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."teacher_to_timetable"
    ADD CONSTRAINT "teacher_to_timetable_timetable_id_fkey" FOREIGN KEY ("timetable_id") REFERENCES "public"."timetable"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."timetable"
    ADD CONSTRAINT "timetable_classroom_id_fkey" FOREIGN KEY ("classroom_id") REFERENCES "public"."classroom"("id") ON UPDATE CASCADE ON DELETE RESTRICT;



ALTER TABLE ONLY "public"."timetable"
    ADD CONSTRAINT "timetable_classroomid_fkey" FOREIGN KEY ("classroom_id") REFERENCES "public"."classroom"("id") ON UPDATE CASCADE ON DELETE RESTRICT;



ALTER TABLE ONLY "public"."timetable"
    ADD CONSTRAINT "timetable_discipline_id_fkey" FOREIGN KEY ("discipline_id") REFERENCES "public"."discipline"("id") ON UPDATE CASCADE ON DELETE SET NULL;



ALTER TABLE ONLY "public"."timetable"
    ADD CONSTRAINT "timetable_disciplineid_fkey" FOREIGN KEY ("discipline_id") REFERENCES "public"."discipline"("id") ON UPDATE CASCADE ON DELETE SET NULL;



ALTER TABLE ONLY "public"."timetable"
    ADD CONSTRAINT "timetable_school_id_fkey" FOREIGN KEY ("school_id") REFERENCES "public"."school"("id") ON UPDATE CASCADE ON DELETE RESTRICT;



ALTER TABLE ONLY "public"."timetable_school"
    ADD CONSTRAINT "timetable_school_school_id_fkey" FOREIGN KEY ("school_id") REFERENCES "public"."school"("id") ON UPDATE CASCADE ON DELETE RESTRICT;



ALTER TABLE ONLY "public"."timetable_school"
    ADD CONSTRAINT "timetable_school_timetable_id_fkey" FOREIGN KEY ("timetable_id") REFERENCES "public"."timetable"("id") ON UPDATE CASCADE ON DELETE RESTRICT;



ALTER TABLE ONLY "public"."timetable_school"
    ADD CONSTRAINT "timetableschool_schoolid_fkey" FOREIGN KEY ("school_id") REFERENCES "public"."school"("id") ON UPDATE CASCADE ON DELETE RESTRICT;



ALTER TABLE ONLY "public"."timetable_school"
    ADD CONSTRAINT "timetableschool_timetableid_fkey" FOREIGN KEY ("timetable_id") REFERENCES "public"."timetable"("id") ON UPDATE CASCADE ON DELETE RESTRICT;



ALTER TABLE ONLY "public"."user_role"
    ADD CONSTRAINT "user_role_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "public"."role"("id") ON UPDATE CASCADE ON DELETE RESTRICT;



ALTER TABLE ONLY "public"."user_role"
    ADD CONSTRAINT "user_role_school_id_fkey" FOREIGN KEY ("school_id") REFERENCES "public"."school"("id") ON UPDATE CASCADE ON DELETE RESTRICT;



CREATE POLICY "Enable read access for all users" ON "public"."institution" FOR SELECT USING (true);



CREATE POLICY "academic_year_delete_policy" ON "public"."academic_year" FOR DELETE USING ((("school_id" = "public"."current_school"()) AND "public"."can_delete"('academic_year'::character varying)));



CREATE POLICY "academic_year_insert_policy" ON "public"."academic_year" FOR INSERT WITH CHECK ((("school_id" = "public"."current_school"()) AND "public"."can_insert"('academic_year'::character varying)));



CREATE POLICY "academic_year_select_policy" ON "public"."academic_year" FOR SELECT USING ((("school_id" = "public"."current_school"()) AND "public"."can_select"('academic_year'::character varying)));



CREATE POLICY "academic_year_update_policy" ON "public"."academic_year" FOR UPDATE USING ((("school_id" = "public"."current_school"()) AND "public"."can_update"('academic_year'::character varying))) WITH CHECK ((("school_id" = "public"."current_school"()) AND "public"."can_update"('academic_year'::character varying)));



CREATE POLICY "attendance_delete_policy" ON "public"."attendance" FOR DELETE USING ((("school_id" = "public"."current_school"()) AND "public"."can_delete"('attendance'::character varying)));



CREATE POLICY "attendance_insert_policy" ON "public"."attendance" FOR INSERT WITH CHECK ((("school_id" = "public"."current_school"()) AND "public"."can_insert"('attendance'::character varying)));



CREATE POLICY "attendance_select_policy" ON "public"."attendance" FOR SELECT USING ((("school_id" = "public"."current_school"()) AND "public"."can_select"('attendance'::character varying)));



CREATE POLICY "attendance_update_policy" ON "public"."attendance" FOR UPDATE USING ((("school_id" = "public"."current_school"()) AND "public"."can_update"('attendance'::character varying))) WITH CHECK ((("school_id" = "public"."current_school"()) AND "public"."can_update"('attendance'::character varying)));



CREATE POLICY "class_session_delete_policy" ON "public"."class_session" FOR DELETE USING ((("school_id" = "public"."current_school"()) AND "public"."can_delete"('class_session'::character varying)));



CREATE POLICY "class_session_insert_policy" ON "public"."class_session" FOR INSERT WITH CHECK ((("school_id" = "public"."current_school"()) AND "public"."can_insert"('class_session'::character varying)));



CREATE POLICY "class_session_select_policy" ON "public"."class_session" FOR SELECT USING ((("school_id" = "public"."current_school"()) AND "public"."can_select"('class_session'::character varying)));



CREATE POLICY "class_session_update_policy" ON "public"."class_session" FOR UPDATE USING ((("school_id" = "public"."current_school"()) AND "public"."can_update"('class_session'::character varying))) WITH CHECK ((("school_id" = "public"."current_school"()) AND "public"."can_update"('class_session'::character varying)));



CREATE POLICY "classroom_delete_policy" ON "public"."classroom" FOR DELETE USING ((("school_id" = "public"."current_school"()) AND "public"."can_delete"('classroom'::character varying)));



CREATE POLICY "classroom_insert_policy" ON "public"."classroom" FOR INSERT WITH CHECK ((("school_id" = "public"."current_school"()) AND "public"."can_insert"('classroom'::character varying)));



CREATE POLICY "classroom_select_policy" ON "public"."classroom" FOR SELECT USING ((("school_id" = "public"."current_school"()) AND "public"."can_select"('classroom'::character varying)));



CREATE POLICY "classroom_update_policy" ON "public"."classroom" FOR UPDATE USING ((("school_id" = "public"."current_school"()) AND "public"."can_update"('classroom'::character varying))) WITH CHECK ((("school_id" = "public"."current_school"()) AND "public"."can_update"('classroom'::character varying)));



CREATE POLICY "enrollment_delete_policy" ON "public"."enrollment" FOR DELETE USING ((("school_id" = "public"."current_school"()) AND "public"."can_delete"('enrollment'::character varying)));



CREATE POLICY "enrollment_insert_policy" ON "public"."enrollment" FOR INSERT WITH CHECK ((("school_id" = "public"."current_school"()) AND "public"."can_insert"('enrollment'::character varying)));



CREATE POLICY "enrollment_select_policy" ON "public"."enrollment" FOR SELECT USING ((("school_id" = "public"."current_school"()) AND "public"."can_select"('enrollment'::character varying)));



CREATE POLICY "enrollment_update_policy" ON "public"."enrollment" FOR UPDATE USING ((("school_id" = "public"."current_school"()) AND "public"."can_update"('enrollment'::character varying))) WITH CHECK ((("school_id" = "public"."current_school"()) AND "public"."can_update"('enrollment'::character varying)));



CREATE POLICY "grade_delete_policy" ON "public"."grade" FOR DELETE USING ((("school_id" = "public"."current_school"()) AND "public"."can_delete"('grade'::character varying)));



CREATE POLICY "grade_insert_policy" ON "public"."grade" FOR INSERT WITH CHECK ((("school_id" = "public"."current_school"()) AND "public"."can_insert"('grade'::character varying)));



CREATE POLICY "grade_select_policy" ON "public"."grade" FOR SELECT USING ((("school_id" = "public"."current_school"()) AND "public"."can_select"('grade'::character varying)));



CREATE POLICY "grade_update_policy" ON "public"."grade" FOR UPDATE USING ((("school_id" = "public"."current_school"()) AND "public"."can_update"('grade'::character varying))) WITH CHECK ((("school_id" = "public"."current_school"()) AND "public"."can_update"('grade'::character varying)));



ALTER TABLE "public"."institution_settings" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "role_delete_policy" ON "public"."role" FOR DELETE USING ((("school_id" = "public"."current_school"()) AND "public"."can_delete"('role'::character varying)));



CREATE POLICY "role_insert_policy" ON "public"."role" FOR INSERT WITH CHECK ((("school_id" = "public"."current_school"()) AND "public"."can_insert"('role'::character varying)));



CREATE POLICY "role_permission_delete_policy" ON "public"."role_permission" FOR DELETE USING ((("school_id" = "public"."current_school"()) AND "public"."can_delete"('role_permission'::character varying)));



CREATE POLICY "role_permission_insert_policy" ON "public"."role_permission" FOR INSERT WITH CHECK ((("school_id" = "public"."current_school"()) AND "public"."can_insert"('role_permission'::character varying)));



CREATE POLICY "role_permission_select_policy" ON "public"."role_permission" FOR SELECT USING ((("school_id" = "public"."current_school"()) AND "public"."can_select"('role_permission'::character varying)));



CREATE POLICY "role_permission_update_policy" ON "public"."role_permission" FOR UPDATE USING ((("school_id" = "public"."current_school"()) AND "public"."can_update"('role_permission'::character varying))) WITH CHECK ((("school_id" = "public"."current_school"()) AND "public"."can_update"('role_permission'::character varying)));



CREATE POLICY "role_select_policy" ON "public"."role" FOR SELECT USING ((("school_id" = "public"."current_school"()) AND "public"."can_select"('role'::character varying)));



CREATE POLICY "role_update_policy" ON "public"."role" FOR UPDATE USING ((("school_id" = "public"."current_school"()) AND "public"."can_update"('role'::character varying))) WITH CHECK ((("school_id" = "public"."current_school"()) AND "public"."can_update"('role'::character varying)));



CREATE POLICY "school_delete_policy" ON "public"."school" FOR DELETE USING ((("id" = "public"."current_school"()) AND "public"."can_delete"('school'::character varying)));



CREATE POLICY "school_insert_policy" ON "public"."school" FOR INSERT WITH CHECK ((("id" = "public"."current_school"()) AND "public"."can_insert"('school'::character varying)));



CREATE POLICY "school_select_policy" ON "public"."school" FOR SELECT USING (("id" IN ( SELECT "public"."my_schools"() AS "my_schools")));



CREATE POLICY "school_update_policy" ON "public"."school" FOR UPDATE USING ((("id" = "public"."current_school"()) AND "public"."can_update"('school'::character varying))) WITH CHECK ((("id" = "public"."current_school"()) AND "public"."can_update"('school'::character varying)));



CREATE POLICY "teacher_delete_policy" ON "public"."teacher" FOR DELETE USING ((("school_id" = "public"."current_school"()) AND "public"."can_delete"('teacher'::character varying)));



CREATE POLICY "teacher_insert_policy" ON "public"."teacher" FOR INSERT WITH CHECK ((("school_id" = "public"."current_school"()) AND "public"."can_insert"('teacher'::character varying)));



CREATE POLICY "teacher_select_policy" ON "public"."teacher" FOR SELECT USING ((("school_id" = "public"."current_school"()) AND "public"."can_select"('teacher'::character varying)));



CREATE POLICY "teacher_to_timetable_delete_policy" ON "public"."teacher_to_timetable" FOR DELETE USING ((("school_id" = "public"."current_school"()) AND "public"."can_delete"('teacher_to_timetable'::character varying)));



CREATE POLICY "teacher_to_timetable_insert_policy" ON "public"."teacher_to_timetable" FOR INSERT WITH CHECK ((("school_id" = "public"."current_school"()) AND "public"."can_insert"('teacher_to_timetable'::character varying)));



CREATE POLICY "teacher_to_timetable_select_policy" ON "public"."teacher_to_timetable" FOR SELECT USING ((("school_id" = "public"."current_school"()) AND "public"."can_select"('teacher_to_timetable'::character varying)));



CREATE POLICY "teacher_to_timetable_update_policy" ON "public"."teacher_to_timetable" FOR UPDATE USING ((("school_id" = "public"."current_school"()) AND "public"."can_update"('teacher_to_timetable'::character varying))) WITH CHECK ((("school_id" = "public"."current_school"()) AND "public"."can_update"('teacher_to_timetable'::character varying)));



CREATE POLICY "teacher_update_policy" ON "public"."teacher" FOR UPDATE USING ((("school_id" = "public"."current_school"()) AND "public"."can_update"('teacher'::character varying))) WITH CHECK ((("school_id" = "public"."current_school"()) AND "public"."can_update"('teacher'::character varying)));



CREATE POLICY "timetable_delete_policy" ON "public"."timetable" FOR DELETE USING ((("school_id" = "public"."current_school"()) AND "public"."can_delete"('timetable'::character varying)));



CREATE POLICY "timetable_insert_policy" ON "public"."timetable" FOR INSERT WITH CHECK ((("school_id" = "public"."current_school"()) AND "public"."can_insert"('timetable'::character varying)));



CREATE POLICY "timetable_school_delete_policy" ON "public"."timetable_school" FOR DELETE USING ((("school_id" = "public"."current_school"()) AND "public"."can_delete"('timetable_school'::character varying)));



CREATE POLICY "timetable_school_insert_policy" ON "public"."timetable_school" FOR INSERT WITH CHECK ((("school_id" = "public"."current_school"()) AND "public"."can_insert"('timetable_school'::character varying)));



CREATE POLICY "timetable_school_select_policy" ON "public"."timetable_school" FOR SELECT USING ((("school_id" = "public"."current_school"()) AND "public"."can_select"('timetable_school'::character varying)));



CREATE POLICY "timetable_school_update_policy" ON "public"."timetable_school" FOR UPDATE USING ((("school_id" = "public"."current_school"()) AND "public"."can_update"('timetable_school'::character varying))) WITH CHECK ((("school_id" = "public"."current_school"()) AND "public"."can_update"('timetable_school'::character varying)));



CREATE POLICY "timetable_select_policy" ON "public"."timetable" FOR SELECT USING ((("school_id" = "public"."current_school"()) AND "public"."can_select"('timetable'::character varying)));



CREATE POLICY "timetable_update_policy" ON "public"."timetable" FOR UPDATE USING ((("school_id" = "public"."current_school"()) AND "public"."can_update"('timetable'::character varying))) WITH CHECK ((("school_id" = "public"."current_school"()) AND "public"."can_update"('timetable'::character varying)));



CREATE POLICY "user_role_delete_policy" ON "public"."user_role" FOR DELETE USING ((("school_id" = "public"."current_school"()) AND "public"."can_delete"('user_role'::character varying)));



CREATE POLICY "user_role_insert_policy" ON "public"."user_role" FOR INSERT WITH CHECK ((("school_id" = "public"."current_school"()) AND "public"."can_insert"('user_role'::character varying)));



CREATE POLICY "user_role_select_policy" ON "public"."user_role" FOR SELECT USING ((("school_id" = "public"."current_school"()) AND "public"."can_select"('user_role'::character varying)));



CREATE POLICY "user_role_update_policy" ON "public"."user_role" FOR UPDATE USING ((("school_id" = "public"."current_school"()) AND "public"."can_update"('user_role'::character varying))) WITH CHECK ((("school_id" = "public"."current_school"()) AND "public"."can_update"('user_role'::character varying)));





ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";





REVOKE USAGE ON SCHEMA "public" FROM PUBLIC;
GRANT ALL ON SCHEMA "public" TO PUBLIC;
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";



SET SESSION AUTHORIZATION "postgres";
RESET SESSION AUTHORIZATION;



SET SESSION AUTHORIZATION "postgres";
RESET SESSION AUTHORIZATION;



SET SESSION AUTHORIZATION "postgres";
RESET SESSION AUTHORIZATION;



SET SESSION AUTHORIZATION "postgres";
RESET SESSION AUTHORIZATION;



SET SESSION AUTHORIZATION "postgres";
RESET SESSION AUTHORIZATION;



SET SESSION AUTHORIZATION "postgres";
RESET SESSION AUTHORIZATION;



SET SESSION AUTHORIZATION "postgres";
RESET SESSION AUTHORIZATION;



SET SESSION AUTHORIZATION "postgres";
RESET SESSION AUTHORIZATION;



SET SESSION AUTHORIZATION "postgres";
RESET SESSION AUTHORIZATION;



SET SESSION AUTHORIZATION "postgres";
RESET SESSION AUTHORIZATION;



SET SESSION AUTHORIZATION "postgres";
RESET SESSION AUTHORIZATION;



SET SESSION AUTHORIZATION "postgres";
RESET SESSION AUTHORIZATION;



SET SESSION AUTHORIZATION "postgres";
RESET SESSION AUTHORIZATION;



SET SESSION AUTHORIZATION "postgres";
RESET SESSION AUTHORIZATION;



SET SESSION AUTHORIZATION "postgres";
RESET SESSION AUTHORIZATION;



SET SESSION AUTHORIZATION "postgres";
RESET SESSION AUTHORIZATION;



SET SESSION AUTHORIZATION "postgres";
RESET SESSION AUTHORIZATION;












SET SESSION AUTHORIZATION "postgres";
RESET SESSION AUTHORIZATION;



SET SESSION AUTHORIZATION "postgres";
RESET SESSION AUTHORIZATION;



SET SESSION AUTHORIZATION "postgres";
RESET SESSION AUTHORIZATION;



SET SESSION AUTHORIZATION "postgres";
RESET SESSION AUTHORIZATION;



SET SESSION AUTHORIZATION "postgres";
RESET SESSION AUTHORIZATION;



SET SESSION AUTHORIZATION "postgres";
RESET SESSION AUTHORIZATION;



SET SESSION AUTHORIZATION "postgres";
RESET SESSION AUTHORIZATION;



SET SESSION AUTHORIZATION "postgres";
RESET SESSION AUTHORIZATION;



SET SESSION AUTHORIZATION "postgres";
RESET SESSION AUTHORIZATION;



SET SESSION AUTHORIZATION "postgres";
RESET SESSION AUTHORIZATION;



SET SESSION AUTHORIZATION "postgres";
RESET SESSION AUTHORIZATION;



SET SESSION AUTHORIZATION "postgres";
RESET SESSION AUTHORIZATION;



SET SESSION AUTHORIZATION "postgres";
RESET SESSION AUTHORIZATION;



SET SESSION AUTHORIZATION "postgres";
RESET SESSION AUTHORIZATION;



SET SESSION AUTHORIZATION "postgres";
RESET SESSION AUTHORIZATION;



SET SESSION AUTHORIZATION "postgres";
RESET SESSION AUTHORIZATION;



SET SESSION AUTHORIZATION "postgres";
RESET SESSION AUTHORIZATION;



SET SESSION AUTHORIZATION "postgres";
RESET SESSION AUTHORIZATION;



SET SESSION AUTHORIZATION "postgres";
RESET SESSION AUTHORIZATION;



SET SESSION AUTHORIZATION "postgres";
RESET SESSION AUTHORIZATION;



SET SESSION AUTHORIZATION "postgres";
RESET SESSION AUTHORIZATION;



SET SESSION AUTHORIZATION "postgres";
RESET SESSION AUTHORIZATION;



SET SESSION AUTHORIZATION "postgres";
RESET SESSION AUTHORIZATION;



SET SESSION AUTHORIZATION "postgres";
RESET SESSION AUTHORIZATION;



SET SESSION AUTHORIZATION "postgres";
RESET SESSION AUTHORIZATION;



SET SESSION AUTHORIZATION "postgres";
RESET SESSION AUTHORIZATION;



SET SESSION AUTHORIZATION "postgres";
RESET SESSION AUTHORIZATION;



SET SESSION AUTHORIZATION "postgres";
RESET SESSION AUTHORIZATION;



SET SESSION AUTHORIZATION "postgres";
RESET SESSION AUTHORIZATION;



SET SESSION AUTHORIZATION "postgres";
RESET SESSION AUTHORIZATION;



SET SESSION AUTHORIZATION "postgres";
RESET SESSION AUTHORIZATION;



SET SESSION AUTHORIZATION "postgres";
RESET SESSION AUTHORIZATION;



SET SESSION AUTHORIZATION "postgres";
RESET SESSION AUTHORIZATION;



SET SESSION AUTHORIZATION "postgres";
RESET SESSION AUTHORIZATION;



SET SESSION AUTHORIZATION "postgres";
RESET SESSION AUTHORIZATION;





















GRANT ALL ON FUNCTION "public"."calculate_business_days"("start_date" "date", "end_date" "date") TO "anon";
GRANT ALL ON FUNCTION "public"."calculate_business_days"("start_date" "date", "end_date" "date") TO "authenticated";
GRANT ALL ON FUNCTION "public"."calculate_business_days"("start_date" "date", "end_date" "date") TO "service_role";



GRANT ALL ON FUNCTION "public"."can_delete"("p_table" character varying) TO "anon";
GRANT ALL ON FUNCTION "public"."can_delete"("p_table" character varying) TO "authenticated";
GRANT ALL ON FUNCTION "public"."can_delete"("p_table" character varying) TO "service_role";



GRANT ALL ON FUNCTION "public"."can_insert"("p_table" character varying) TO "anon";
GRANT ALL ON FUNCTION "public"."can_insert"("p_table" character varying) TO "authenticated";
GRANT ALL ON FUNCTION "public"."can_insert"("p_table" character varying) TO "service_role";



GRANT ALL ON FUNCTION "public"."can_select"("p_table" character varying) TO "anon";
GRANT ALL ON FUNCTION "public"."can_select"("p_table" character varying) TO "authenticated";
GRANT ALL ON FUNCTION "public"."can_select"("p_table" character varying) TO "service_role";



GRANT ALL ON FUNCTION "public"."can_update"("p_table" character varying) TO "anon";
GRANT ALL ON FUNCTION "public"."can_update"("p_table" character varying) TO "authenticated";
GRANT ALL ON FUNCTION "public"."can_update"("p_table" character varying) TO "service_role";



GRANT ALL ON FUNCTION "public"."current_school"() TO "anon";
GRANT ALL ON FUNCTION "public"."current_school"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."current_school"() TO "service_role";



GRANT ALL ON FUNCTION "public"."get_header"("item" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."get_header"("item" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_header"("item" "text") TO "service_role";



GRANT ALL ON FUNCTION "public"."my_schools"() TO "anon";
GRANT ALL ON FUNCTION "public"."my_schools"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."my_schools"() TO "service_role";



GRANT ALL ON FUNCTION "public"."set_weekday"() TO "anon";
GRANT ALL ON FUNCTION "public"."set_weekday"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."set_weekday"() TO "service_role";



GRANT ALL ON FUNCTION "public"."setup_rls_policies"("ignore_tables" "text"[]) TO "anon";
GRANT ALL ON FUNCTION "public"."setup_rls_policies"("ignore_tables" "text"[]) TO "authenticated";
GRANT ALL ON FUNCTION "public"."setup_rls_policies"("ignore_tables" "text"[]) TO "service_role";



GRANT ALL ON FUNCTION "public"."update_updated_at_column"() TO "anon";
GRANT ALL ON FUNCTION "public"."update_updated_at_column"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."update_updated_at_column"() TO "service_role";



GRANT ALL ON FUNCTION "public"."validate_role"("role_name" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."validate_role"("role_name" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."validate_role"("role_name" "text") TO "service_role";


















GRANT ALL ON TABLE "public"."_teachertotimetable" TO "anon";
GRANT ALL ON TABLE "public"."_teachertotimetable" TO "authenticated";
GRANT ALL ON TABLE "public"."_teachertotimetable" TO "service_role";
GRANT SELECT ON TABLE "public"."_teachertotimetable" TO "student";
GRANT SELECT,INSERT,UPDATE ON TABLE "public"."_teachertotimetable" TO "teacher";
GRANT ALL ON TABLE "public"."_teachertotimetable" TO "adm";



GRANT ALL ON TABLE "public"."academic_year" TO "anon";
GRANT ALL ON TABLE "public"."academic_year" TO "authenticated";
GRANT ALL ON TABLE "public"."academic_year" TO "service_role";
GRANT SELECT ON TABLE "public"."academic_year" TO "student";
GRANT SELECT,INSERT,UPDATE ON TABLE "public"."academic_year" TO "teacher";
GRANT ALL ON TABLE "public"."academic_year" TO "adm";



GRANT ALL ON TABLE "public"."academic_year_template" TO "anon";
GRANT ALL ON TABLE "public"."academic_year_template" TO "authenticated";
GRANT ALL ON TABLE "public"."academic_year_template" TO "service_role";
GRANT SELECT ON TABLE "public"."academic_year_template" TO "student";
GRANT SELECT,INSERT,UPDATE ON TABLE "public"."academic_year_template" TO "teacher";
GRANT ALL ON TABLE "public"."academic_year_template" TO "adm";



GRANT ALL ON TABLE "public"."attendance" TO "anon";
GRANT ALL ON TABLE "public"."attendance" TO "authenticated";
GRANT ALL ON TABLE "public"."attendance" TO "service_role";
GRANT SELECT ON TABLE "public"."attendance" TO "student";
GRANT SELECT,INSERT,UPDATE ON TABLE "public"."attendance" TO "teacher";
GRANT ALL ON TABLE "public"."attendance" TO "adm";



GRANT ALL ON TABLE "public"."class_session" TO "anon";
GRANT ALL ON TABLE "public"."class_session" TO "authenticated";
GRANT ALL ON TABLE "public"."class_session" TO "service_role";
GRANT SELECT ON TABLE "public"."class_session" TO "student";
GRANT SELECT,INSERT,UPDATE ON TABLE "public"."class_session" TO "teacher";
GRANT ALL ON TABLE "public"."class_session" TO "adm";



GRANT ALL ON TABLE "public"."classroom" TO "anon";
GRANT ALL ON TABLE "public"."classroom" TO "authenticated";
GRANT ALL ON TABLE "public"."classroom" TO "service_role";
GRANT SELECT ON TABLE "public"."classroom" TO "student";
GRANT SELECT,INSERT,UPDATE ON TABLE "public"."classroom" TO "teacher";
GRANT ALL ON TABLE "public"."classroom" TO "adm";



GRANT ALL ON TABLE "public"."course" TO "anon";
GRANT ALL ON TABLE "public"."course" TO "authenticated";
GRANT ALL ON TABLE "public"."course" TO "service_role";
GRANT SELECT ON TABLE "public"."course" TO "student";
GRANT SELECT,INSERT,UPDATE ON TABLE "public"."course" TO "teacher";
GRANT ALL ON TABLE "public"."course" TO "adm";



GRANT ALL ON TABLE "public"."course_series_discipline" TO "anon";
GRANT ALL ON TABLE "public"."course_series_discipline" TO "authenticated";
GRANT ALL ON TABLE "public"."course_series_discipline" TO "service_role";



GRANT ALL ON TABLE "public"."discipline" TO "anon";
GRANT ALL ON TABLE "public"."discipline" TO "authenticated";
GRANT ALL ON TABLE "public"."discipline" TO "service_role";
GRANT SELECT ON TABLE "public"."discipline" TO "student";
GRANT SELECT,INSERT,UPDATE ON TABLE "public"."discipline" TO "teacher";
GRANT ALL ON TABLE "public"."discipline" TO "adm";



GRANT ALL ON TABLE "public"."document" TO "anon";
GRANT ALL ON TABLE "public"."document" TO "authenticated";
GRANT ALL ON TABLE "public"."document" TO "service_role";
GRANT SELECT ON TABLE "public"."document" TO "student";
GRANT SELECT,INSERT,UPDATE ON TABLE "public"."document" TO "teacher";
GRANT ALL ON TABLE "public"."document" TO "adm";



GRANT ALL ON TABLE "public"."enrollment" TO "anon";
GRANT ALL ON TABLE "public"."enrollment" TO "authenticated";
GRANT ALL ON TABLE "public"."enrollment" TO "service_role";
GRANT SELECT ON TABLE "public"."enrollment" TO "student";
GRANT SELECT,INSERT,UPDATE ON TABLE "public"."enrollment" TO "teacher";
GRANT ALL ON TABLE "public"."enrollment" TO "adm";



GRANT ALL ON TABLE "public"."grade" TO "anon";
GRANT ALL ON TABLE "public"."grade" TO "authenticated";
GRANT ALL ON TABLE "public"."grade" TO "service_role";
GRANT SELECT ON TABLE "public"."grade" TO "student";
GRANT SELECT,INSERT,UPDATE ON TABLE "public"."grade" TO "teacher";
GRANT ALL ON TABLE "public"."grade" TO "adm";



GRANT ALL ON TABLE "public"."holidays" TO "anon";
GRANT ALL ON TABLE "public"."holidays" TO "authenticated";
GRANT ALL ON TABLE "public"."holidays" TO "service_role";
GRANT SELECT ON TABLE "public"."holidays" TO "student";
GRANT SELECT,INSERT,UPDATE ON TABLE "public"."holidays" TO "teacher";
GRANT ALL ON TABLE "public"."holidays" TO "adm";



GRANT ALL ON TABLE "public"."institution" TO "anon";
GRANT ALL ON TABLE "public"."institution" TO "authenticated";
GRANT ALL ON TABLE "public"."institution" TO "service_role";
GRANT SELECT ON TABLE "public"."institution" TO "student";
GRANT SELECT,INSERT,UPDATE ON TABLE "public"."institution" TO "teacher";
GRANT ALL ON TABLE "public"."institution" TO "adm";



GRANT ALL ON TABLE "public"."institution_settings" TO "anon";
GRANT ALL ON TABLE "public"."institution_settings" TO "authenticated";
GRANT ALL ON TABLE "public"."institution_settings" TO "service_role";
GRANT SELECT ON TABLE "public"."institution_settings" TO "student";
GRANT SELECT,INSERT,UPDATE ON TABLE "public"."institution_settings" TO "teacher";
GRANT ALL ON TABLE "public"."institution_settings" TO "adm";



GRANT ALL ON SEQUENCE "public"."institution_settings_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."institution_settings_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."institution_settings_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."pre_enrollment" TO "anon";
GRANT ALL ON TABLE "public"."pre_enrollment" TO "authenticated";
GRANT ALL ON TABLE "public"."pre_enrollment" TO "service_role";



GRANT ALL ON TABLE "public"."role" TO "anon";
GRANT ALL ON TABLE "public"."role" TO "authenticated";
GRANT ALL ON TABLE "public"."role" TO "service_role";
GRANT SELECT ON TABLE "public"."role" TO "student";
GRANT SELECT,INSERT,UPDATE ON TABLE "public"."role" TO "teacher";
GRANT ALL ON TABLE "public"."role" TO "adm";



GRANT ALL ON TABLE "public"."role_permission" TO "anon";
GRANT ALL ON TABLE "public"."role_permission" TO "authenticated";
GRANT ALL ON TABLE "public"."role_permission" TO "service_role";
GRANT SELECT ON TABLE "public"."role_permission" TO "student";
GRANT SELECT,INSERT,UPDATE ON TABLE "public"."role_permission" TO "teacher";
GRANT ALL ON TABLE "public"."role_permission" TO "adm";



GRANT ALL ON TABLE "public"."school" TO "anon";
GRANT ALL ON TABLE "public"."school" TO "authenticated";
GRANT ALL ON TABLE "public"."school" TO "service_role";
GRANT SELECT ON TABLE "public"."school" TO "student";
GRANT SELECT,INSERT,UPDATE ON TABLE "public"."school" TO "teacher";
GRANT ALL ON TABLE "public"."school" TO "adm";



GRANT ALL ON TABLE "public"."school_course" TO "anon";
GRANT ALL ON TABLE "public"."school_course" TO "authenticated";
GRANT ALL ON TABLE "public"."school_course" TO "service_role";
GRANT SELECT ON TABLE "public"."school_course" TO "student";
GRANT SELECT,INSERT,UPDATE ON TABLE "public"."school_course" TO "teacher";
GRANT ALL ON TABLE "public"."school_course" TO "adm";



GRANT ALL ON TABLE "public"."school_settings" TO "anon";
GRANT ALL ON TABLE "public"."school_settings" TO "authenticated";
GRANT ALL ON TABLE "public"."school_settings" TO "service_role";
GRANT SELECT ON TABLE "public"."school_settings" TO "student";
GRANT SELECT,INSERT,UPDATE ON TABLE "public"."school_settings" TO "teacher";
GRANT ALL ON TABLE "public"."school_settings" TO "adm";



GRANT ALL ON TABLE "public"."series" TO "anon";
GRANT ALL ON TABLE "public"."series" TO "authenticated";
GRANT ALL ON TABLE "public"."series" TO "service_role";
GRANT SELECT ON TABLE "public"."series" TO "student";
GRANT SELECT,INSERT,UPDATE ON TABLE "public"."series" TO "teacher";
GRANT ALL ON TABLE "public"."series" TO "adm";



GRANT ALL ON TABLE "public"."student" TO "anon";
GRANT ALL ON TABLE "public"."student" TO "authenticated";
GRANT ALL ON TABLE "public"."student" TO "service_role";
GRANT SELECT ON TABLE "public"."student" TO "student";
GRANT SELECT,INSERT,UPDATE ON TABLE "public"."student" TO "teacher";
GRANT ALL ON TABLE "public"."student" TO "adm";



GRANT ALL ON TABLE "public"."teacher" TO "anon";
GRANT ALL ON TABLE "public"."teacher" TO "authenticated";
GRANT ALL ON TABLE "public"."teacher" TO "service_role";
GRANT SELECT ON TABLE "public"."teacher" TO "student";
GRANT SELECT,INSERT,UPDATE ON TABLE "public"."teacher" TO "teacher";
GRANT ALL ON TABLE "public"."teacher" TO "adm";



GRANT ALL ON TABLE "public"."teacher_to_timetable" TO "anon";
GRANT ALL ON TABLE "public"."teacher_to_timetable" TO "authenticated";
GRANT ALL ON TABLE "public"."teacher_to_timetable" TO "service_role";
GRANT SELECT ON TABLE "public"."teacher_to_timetable" TO "student";
GRANT SELECT,INSERT,UPDATE ON TABLE "public"."teacher_to_timetable" TO "teacher";
GRANT ALL ON TABLE "public"."teacher_to_timetable" TO "adm";



GRANT ALL ON TABLE "public"."timetable" TO "anon";
GRANT ALL ON TABLE "public"."timetable" TO "authenticated";
GRANT ALL ON TABLE "public"."timetable" TO "service_role";
GRANT SELECT ON TABLE "public"."timetable" TO "student";
GRANT SELECT,INSERT,UPDATE ON TABLE "public"."timetable" TO "teacher";
GRANT ALL ON TABLE "public"."timetable" TO "adm";



GRANT ALL ON TABLE "public"."timetable_school" TO "anon";
GRANT ALL ON TABLE "public"."timetable_school" TO "authenticated";
GRANT ALL ON TABLE "public"."timetable_school" TO "service_role";
GRANT SELECT ON TABLE "public"."timetable_school" TO "student";
GRANT SELECT,INSERT,UPDATE ON TABLE "public"."timetable_school" TO "teacher";
GRANT ALL ON TABLE "public"."timetable_school" TO "adm";



GRANT ALL ON TABLE "public"."user_role" TO "anon";
GRANT ALL ON TABLE "public"."user_role" TO "authenticated";
GRANT ALL ON TABLE "public"."user_role" TO "service_role";
GRANT SELECT ON TABLE "public"."user_role" TO "student";
GRANT SELECT,INSERT,UPDATE ON TABLE "public"."user_role" TO "teacher";
GRANT ALL ON TABLE "public"."user_role" TO "adm";



ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";



ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";



ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";



























RESET ALL;
