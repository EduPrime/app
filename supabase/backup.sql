--
-- PostgreSQL database dump
--

-- Dumped from database version 15.1 (Ubuntu 15.1-1.pgdg20.04+1)
-- Dumped by pg_dump version 16.4 (Ubuntu 16.4-0ubuntu0.24.04.2)

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

--
-- Name: _realtime; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA _realtime;


ALTER SCHEMA _realtime OWNER TO postgres;

--
-- Name: auth; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA auth;


ALTER SCHEMA auth OWNER TO supabase_admin;

--
-- Name: extensions; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA extensions;


ALTER SCHEMA extensions OWNER TO postgres;

--
-- Name: graphql; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA graphql;


ALTER SCHEMA graphql OWNER TO supabase_admin;

--
-- Name: graphql_public; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA graphql_public;


ALTER SCHEMA graphql_public OWNER TO supabase_admin;

--
-- Name: pg_net; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;


--
-- Name: EXTENSION pg_net; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pg_net IS 'Async HTTP';


--
-- Name: pgbouncer; Type: SCHEMA; Schema: -; Owner: pgbouncer
--

CREATE SCHEMA pgbouncer;


ALTER SCHEMA pgbouncer OWNER TO pgbouncer;

--
-- Name: pgsodium; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA pgsodium;


ALTER SCHEMA pgsodium OWNER TO supabase_admin;

--
-- Name: pgsodium; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgsodium WITH SCHEMA pgsodium;


--
-- Name: EXTENSION pgsodium; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgsodium IS 'Pgsodium is a modern cryptography library for Postgres.';


--
-- Name: realtime; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA realtime;


ALTER SCHEMA realtime OWNER TO supabase_admin;

--
-- Name: storage; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA storage;


ALTER SCHEMA storage OWNER TO supabase_admin;

--
-- Name: supabase_functions; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA supabase_functions;


ALTER SCHEMA supabase_functions OWNER TO supabase_admin;

--
-- Name: supabase_migrations; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA supabase_migrations;


ALTER SCHEMA supabase_migrations OWNER TO postgres;

--
-- Name: system; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA system;


ALTER SCHEMA system OWNER TO postgres;

--
-- Name: vault; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA vault;


ALTER SCHEMA vault OWNER TO supabase_admin;

--
-- Name: pg_graphql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pg_graphql WITH SCHEMA graphql;


--
-- Name: EXTENSION pg_graphql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pg_graphql IS 'pg_graphql: GraphQL support';


--
-- Name: pg_stat_statements; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pg_stat_statements WITH SCHEMA extensions;


--
-- Name: EXTENSION pg_stat_statements; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pg_stat_statements IS 'track planning and execution statistics of all SQL statements executed';


--
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA extensions;


--
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


--
-- Name: pgjwt; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgjwt WITH SCHEMA extensions;


--
-- Name: EXTENSION pgjwt; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgjwt IS 'JSON Web Token API for Postgresql';


--
-- Name: supabase_vault; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS supabase_vault WITH SCHEMA vault;


--
-- Name: EXTENSION supabase_vault; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION supabase_vault IS 'Supabase Vault Extension';


--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA extensions;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- Name: aal_level; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.aal_level AS ENUM (
    'aal1',
    'aal2',
    'aal3'
);


ALTER TYPE auth.aal_level OWNER TO supabase_auth_admin;

--
-- Name: code_challenge_method; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.code_challenge_method AS ENUM (
    's256',
    'plain'
);


ALTER TYPE auth.code_challenge_method OWNER TO supabase_auth_admin;

--
-- Name: factor_status; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.factor_status AS ENUM (
    'unverified',
    'verified'
);


ALTER TYPE auth.factor_status OWNER TO supabase_auth_admin;

--
-- Name: factor_type; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.factor_type AS ENUM (
    'totp',
    'webauthn',
    'phone'
);


ALTER TYPE auth.factor_type OWNER TO supabase_auth_admin;

--
-- Name: one_time_token_type; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.one_time_token_type AS ENUM (
    'confirmation_token',
    'reauthentication_token',
    'recovery_token',
    'email_change_token_new',
    'email_change_token_current',
    'phone_change_token'
);


ALTER TYPE auth.one_time_token_type OWNER TO supabase_auth_admin;

--
-- Name: attendance_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.attendance_status AS ENUM (
    'PRESENT',
    'ABSENT',
    'EXCUSED'
);


ALTER TYPE public.attendance_status OWNER TO postgres;

--
-- Name: course_stage_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.course_stage_type AS ENUM (
    'Etapa 1',
    'Etapa 2',
    'Etapa 3',
    'Etapa 4',
    'Etapa 5',
    'Etapa 6'
);


ALTER TYPE public.course_stage_type OWNER TO postgres;

--
-- Name: day_of_week; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.day_of_week AS ENUM (
    'Segunda',
    'Terça',
    'Quarta',
    'Quinta',
    'Sexta',
    'Sábado',
    'Domingo'
);


ALTER TYPE public.day_of_week OWNER TO postgres;

--
-- Name: gender_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.gender_type AS ENUM (
    'Masculino',
    'Feminino'
);


ALTER TYPE public.gender_type OWNER TO postgres;

--
-- Name: graduate_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.graduate_status AS ENUM (
    'Sim',
    'Não'
);


ALTER TYPE public.graduate_status OWNER TO postgres;

--
-- Name: marital_status_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.marital_status_type AS ENUM (
    'Solteiro',
    'Casado',
    'Divorciado',
    'Viúvo',
    'Separado',
    'União Estável',
    'Não Informado'
);


ALTER TYPE public.marital_status_type OWNER TO postgres;

--
-- Name: period; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.period AS ENUM (
    'Manhã',
    'Tarde',
    'Noite'
);


ALTER TYPE public.period OWNER TO postgres;

--
-- Name: residence_zone_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.residence_zone_type AS ENUM (
    'Urbana',
    'Rural'
);


ALTER TYPE public.residence_zone_type OWNER TO postgres;

--
-- Name: responsibletype; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.responsibletype AS ENUM (
    'Pai',
    'Mãe',
    'Ambos'
);


ALTER TYPE public.responsibletype OWNER TO postgres;

--
-- Name: situation_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.situation_type AS ENUM (
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


ALTER TYPE public.situation_type OWNER TO postgres;

--
-- Name: status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.status AS ENUM (
    'Ativo',
    'Inativo',
    'Graduado',
    'Suspenso',
    'Transferido'
);


ALTER TYPE public.status OWNER TO postgres;

--
-- Name: action; Type: TYPE; Schema: realtime; Owner: supabase_admin
--

CREATE TYPE realtime.action AS ENUM (
    'INSERT',
    'UPDATE',
    'DELETE',
    'TRUNCATE',
    'ERROR'
);


ALTER TYPE realtime.action OWNER TO supabase_admin;

--
-- Name: equality_op; Type: TYPE; Schema: realtime; Owner: supabase_admin
--

CREATE TYPE realtime.equality_op AS ENUM (
    'eq',
    'neq',
    'lt',
    'lte',
    'gt',
    'gte',
    'in'
);


ALTER TYPE realtime.equality_op OWNER TO supabase_admin;

--
-- Name: user_defined_filter; Type: TYPE; Schema: realtime; Owner: supabase_admin
--

CREATE TYPE realtime.user_defined_filter AS (
	column_name text,
	op realtime.equality_op,
	value text
);


ALTER TYPE realtime.user_defined_filter OWNER TO supabase_admin;

--
-- Name: wal_column; Type: TYPE; Schema: realtime; Owner: supabase_admin
--

CREATE TYPE realtime.wal_column AS (
	name text,
	type_name text,
	type_oid oid,
	value jsonb,
	is_pkey boolean,
	is_selectable boolean
);


ALTER TYPE realtime.wal_column OWNER TO supabase_admin;

--
-- Name: wal_rls; Type: TYPE; Schema: realtime; Owner: supabase_admin
--

CREATE TYPE realtime.wal_rls AS (
	wal jsonb,
	is_rls_enabled boolean,
	subscription_ids uuid[],
	errors text[]
);


ALTER TYPE realtime.wal_rls OWNER TO supabase_admin;

--
-- Name: email(); Type: FUNCTION; Schema: auth; Owner: supabase_auth_admin
--

CREATE FUNCTION auth.email() RETURNS text
    LANGUAGE sql STABLE
    AS $$
  select 
  coalesce(
    nullif(current_setting('request.jwt.claim.email', true), ''),
    (nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'email')
  )::text
$$;


ALTER FUNCTION auth.email() OWNER TO supabase_auth_admin;

--
-- Name: FUNCTION email(); Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON FUNCTION auth.email() IS 'Deprecated. Use auth.jwt() -> ''email'' instead.';


--
-- Name: jwt(); Type: FUNCTION; Schema: auth; Owner: supabase_auth_admin
--

CREATE FUNCTION auth.jwt() RETURNS jsonb
    LANGUAGE sql STABLE
    AS $$
  select 
    coalesce(
        nullif(current_setting('request.jwt.claim', true), ''),
        nullif(current_setting('request.jwt.claims', true), '')
    )::jsonb
$$;


ALTER FUNCTION auth.jwt() OWNER TO supabase_auth_admin;

--
-- Name: role(); Type: FUNCTION; Schema: auth; Owner: supabase_auth_admin
--

CREATE FUNCTION auth.role() RETURNS text
    LANGUAGE sql STABLE
    AS $$
  select 
  coalesce(
    nullif(current_setting('request.jwt.claim.role', true), ''),
    (nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'role')
  )::text
$$;


ALTER FUNCTION auth.role() OWNER TO supabase_auth_admin;

--
-- Name: FUNCTION role(); Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON FUNCTION auth.role() IS 'Deprecated. Use auth.jwt() -> ''role'' instead.';


--
-- Name: uid(); Type: FUNCTION; Schema: auth; Owner: supabase_auth_admin
--

CREATE FUNCTION auth.uid() RETURNS uuid
    LANGUAGE sql STABLE
    AS $$
  select 
  coalesce(
    nullif(current_setting('request.jwt.claim.sub', true), ''),
    (nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'sub')
  )::uuid
$$;


ALTER FUNCTION auth.uid() OWNER TO supabase_auth_admin;

--
-- Name: FUNCTION uid(); Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON FUNCTION auth.uid() IS 'Deprecated. Use auth.jwt() -> ''sub'' instead.';


--
-- Name: grant_pg_cron_access(); Type: FUNCTION; Schema: extensions; Owner: postgres
--

CREATE FUNCTION extensions.grant_pg_cron_access() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  IF EXISTS (
    SELECT
    FROM pg_event_trigger_ddl_commands() AS ev
    JOIN pg_extension AS ext
    ON ev.objid = ext.oid
    WHERE ext.extname = 'pg_cron'
  )
  THEN
    grant usage on schema cron to postgres with grant option;

    alter default privileges in schema cron grant all on tables to postgres with grant option;
    alter default privileges in schema cron grant all on functions to postgres with grant option;
    alter default privileges in schema cron grant all on sequences to postgres with grant option;

    alter default privileges for user supabase_admin in schema cron grant all
        on sequences to postgres with grant option;
    alter default privileges for user supabase_admin in schema cron grant all
        on tables to postgres with grant option;
    alter default privileges for user supabase_admin in schema cron grant all
        on functions to postgres with grant option;

    grant all privileges on all tables in schema cron to postgres with grant option;
    revoke all on table cron.job from postgres;
    grant select on table cron.job to postgres with grant option;
  END IF;
END;
$$;


ALTER FUNCTION extensions.grant_pg_cron_access() OWNER TO postgres;

--
-- Name: FUNCTION grant_pg_cron_access(); Type: COMMENT; Schema: extensions; Owner: postgres
--

COMMENT ON FUNCTION extensions.grant_pg_cron_access() IS 'Grants access to pg_cron';


--
-- Name: grant_pg_graphql_access(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.grant_pg_graphql_access() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $_$
DECLARE
    func_is_graphql_resolve bool;
BEGIN
    func_is_graphql_resolve = (
        SELECT n.proname = 'resolve'
        FROM pg_event_trigger_ddl_commands() AS ev
        LEFT JOIN pg_catalog.pg_proc AS n
        ON ev.objid = n.oid
    );

    IF func_is_graphql_resolve
    THEN
        -- Update public wrapper to pass all arguments through to the pg_graphql resolve func
        DROP FUNCTION IF EXISTS graphql_public.graphql;
        create or replace function graphql_public.graphql(
            "operationName" text default null,
            query text default null,
            variables jsonb default null,
            extensions jsonb default null
        )
            returns jsonb
            language sql
        as $$
            select graphql.resolve(
                query := query,
                variables := coalesce(variables, '{}'),
                "operationName" := "operationName",
                extensions := extensions
            );
        $$;

        -- This hook executes when `graphql.resolve` is created. That is not necessarily the last
        -- function in the extension so we need to grant permissions on existing entities AND
        -- update default permissions to any others that are created after `graphql.resolve`
        grant usage on schema graphql to postgres, anon, authenticated, service_role;
        grant select on all tables in schema graphql to postgres, anon, authenticated, service_role;
        grant execute on all functions in schema graphql to postgres, anon, authenticated, service_role;
        grant all on all sequences in schema graphql to postgres, anon, authenticated, service_role;
        alter default privileges in schema graphql grant all on tables to postgres, anon, authenticated, service_role;
        alter default privileges in schema graphql grant all on functions to postgres, anon, authenticated, service_role;
        alter default privileges in schema graphql grant all on sequences to postgres, anon, authenticated, service_role;

        -- Allow postgres role to allow granting usage on graphql and graphql_public schemas to custom roles
        grant usage on schema graphql_public to postgres with grant option;
        grant usage on schema graphql to postgres with grant option;
    END IF;

END;
$_$;


ALTER FUNCTION extensions.grant_pg_graphql_access() OWNER TO supabase_admin;

--
-- Name: FUNCTION grant_pg_graphql_access(); Type: COMMENT; Schema: extensions; Owner: supabase_admin
--

COMMENT ON FUNCTION extensions.grant_pg_graphql_access() IS 'Grants access to pg_graphql';


--
-- Name: grant_pg_net_access(); Type: FUNCTION; Schema: extensions; Owner: postgres
--

CREATE FUNCTION extensions.grant_pg_net_access() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM pg_event_trigger_ddl_commands() AS ev
    JOIN pg_extension AS ext
    ON ev.objid = ext.oid
    WHERE ext.extname = 'pg_net'
  )
  THEN
    GRANT USAGE ON SCHEMA net TO supabase_functions_admin, postgres, anon, authenticated, service_role;

    ALTER function net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) SECURITY DEFINER;
    ALTER function net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) SECURITY DEFINER;

    ALTER function net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) SET search_path = net;
    ALTER function net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) SET search_path = net;

    REVOKE ALL ON FUNCTION net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) FROM PUBLIC;
    REVOKE ALL ON FUNCTION net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) FROM PUBLIC;

    GRANT EXECUTE ON FUNCTION net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) TO supabase_functions_admin, postgres, anon, authenticated, service_role;
    GRANT EXECUTE ON FUNCTION net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) TO supabase_functions_admin, postgres, anon, authenticated, service_role;
  END IF;
END;
$$;


ALTER FUNCTION extensions.grant_pg_net_access() OWNER TO postgres;

--
-- Name: FUNCTION grant_pg_net_access(); Type: COMMENT; Schema: extensions; Owner: postgres
--

COMMENT ON FUNCTION extensions.grant_pg_net_access() IS 'Grants access to pg_net';


--
-- Name: pgrst_ddl_watch(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.pgrst_ddl_watch() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
  cmd record;
BEGIN
  FOR cmd IN SELECT * FROM pg_event_trigger_ddl_commands()
  LOOP
    IF cmd.command_tag IN (
      'CREATE SCHEMA', 'ALTER SCHEMA'
    , 'CREATE TABLE', 'CREATE TABLE AS', 'SELECT INTO', 'ALTER TABLE'
    , 'CREATE FOREIGN TABLE', 'ALTER FOREIGN TABLE'
    , 'CREATE VIEW', 'ALTER VIEW'
    , 'CREATE MATERIALIZED VIEW', 'ALTER MATERIALIZED VIEW'
    , 'CREATE FUNCTION', 'ALTER FUNCTION'
    , 'CREATE TRIGGER'
    , 'CREATE TYPE', 'ALTER TYPE'
    , 'CREATE RULE'
    , 'COMMENT'
    )
    -- don't notify in case of CREATE TEMP table or other objects created on pg_temp
    AND cmd.schema_name is distinct from 'pg_temp'
    THEN
      NOTIFY pgrst, 'reload schema';
    END IF;
  END LOOP;
END; $$;


ALTER FUNCTION extensions.pgrst_ddl_watch() OWNER TO supabase_admin;

--
-- Name: pgrst_drop_watch(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.pgrst_drop_watch() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
  obj record;
BEGIN
  FOR obj IN SELECT * FROM pg_event_trigger_dropped_objects()
  LOOP
    IF obj.object_type IN (
      'schema'
    , 'table'
    , 'foreign table'
    , 'view'
    , 'materialized view'
    , 'function'
    , 'trigger'
    , 'type'
    , 'rule'
    )
    AND obj.is_temporary IS false -- no pg_temp objects
    THEN
      NOTIFY pgrst, 'reload schema';
    END IF;
  END LOOP;
END; $$;


ALTER FUNCTION extensions.pgrst_drop_watch() OWNER TO supabase_admin;

--
-- Name: set_graphql_placeholder(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.set_graphql_placeholder() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $_$
    DECLARE
    graphql_is_dropped bool;
    BEGIN
    graphql_is_dropped = (
        SELECT ev.schema_name = 'graphql_public'
        FROM pg_event_trigger_dropped_objects() AS ev
        WHERE ev.schema_name = 'graphql_public'
    );

    IF graphql_is_dropped
    THEN
        create or replace function graphql_public.graphql(
            "operationName" text default null,
            query text default null,
            variables jsonb default null,
            extensions jsonb default null
        )
            returns jsonb
            language plpgsql
        as $$
            DECLARE
                server_version float;
            BEGIN
                server_version = (SELECT (SPLIT_PART((select version()), ' ', 2))::float);

                IF server_version >= 14 THEN
                    RETURN jsonb_build_object(
                        'errors', jsonb_build_array(
                            jsonb_build_object(
                                'message', 'pg_graphql extension is not enabled.'
                            )
                        )
                    );
                ELSE
                    RETURN jsonb_build_object(
                        'errors', jsonb_build_array(
                            jsonb_build_object(
                                'message', 'pg_graphql is only available on projects running Postgres 14 onwards.'
                            )
                        )
                    );
                END IF;
            END;
        $$;
    END IF;

    END;
$_$;


ALTER FUNCTION extensions.set_graphql_placeholder() OWNER TO supabase_admin;

--
-- Name: FUNCTION set_graphql_placeholder(); Type: COMMENT; Schema: extensions; Owner: supabase_admin
--

COMMENT ON FUNCTION extensions.set_graphql_placeholder() IS 'Reintroduces placeholder function for graphql_public.graphql';


--
-- Name: get_auth(text); Type: FUNCTION; Schema: pgbouncer; Owner: postgres
--

CREATE FUNCTION pgbouncer.get_auth(p_usename text) RETURNS TABLE(username text, password text)
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
BEGIN
    RAISE WARNING 'PgBouncer auth request: %', p_usename;

    RETURN QUERY
    SELECT usename::TEXT, passwd::TEXT FROM pg_catalog.pg_shadow
    WHERE usename = p_usename;
END;
$$;


ALTER FUNCTION pgbouncer.get_auth(p_usename text) OWNER TO postgres;

--
-- Name: calculate_business_days(date, date); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.calculate_business_days(start_date date, end_date date) RETURNS integer
    LANGUAGE plpgsql
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


ALTER FUNCTION public.calculate_business_days(start_date date, end_date date) OWNER TO postgres;

--
-- Name: can_delete(character varying); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.can_delete(p_table character varying) RETURNS boolean
    LANGUAGE sql SECURITY DEFINER
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


ALTER FUNCTION public.can_delete(p_table character varying) OWNER TO postgres;

--
-- Name: can_insert(character varying); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.can_insert(p_table character varying) RETURNS boolean
    LANGUAGE sql SECURITY DEFINER
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


ALTER FUNCTION public.can_insert(p_table character varying) OWNER TO postgres;

--
-- Name: can_select(character varying); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.can_select(p_table character varying) RETURNS boolean
    LANGUAGE sql SECURITY DEFINER
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


ALTER FUNCTION public.can_select(p_table character varying) OWNER TO postgres;

--
-- Name: can_update(character varying); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.can_update(p_table character varying) RETURNS boolean
    LANGUAGE sql SECURITY DEFINER
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


ALTER FUNCTION public.can_update(p_table character varying) OWNER TO postgres;

--
-- Name: current_school(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.current_school() RETURNS uuid
    LANGUAGE sql SECURITY DEFINER
    AS $$
SELECT get_header('xschoolid')::uuid;
$$;


ALTER FUNCTION public.current_school() OWNER TO postgres;

--
-- Name: get_header(text); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.get_header(item text) RETURNS text
    LANGUAGE sql STABLE
    AS $$
SELECT current_setting('request.headers', true)::jsonb ->> item;
$$;


ALTER FUNCTION public.get_header(item text) OWNER TO postgres;

--
-- Name: my_schools(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.my_schools() RETURNS SETOF uuid
    LANGUAGE sql SECURITY DEFINER
    AS $$
SELECT school_id
FROM user_role
WHERE user_id = auth.uid();
$$;


ALTER FUNCTION public.my_schools() OWNER TO postgres;

--
-- Name: set_weekday(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.set_weekday() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    NEW.weekday := TO_CHAR(NEW.holiday_date, 'Day');
    RETURN NEW;
END;
$$;


ALTER FUNCTION public.set_weekday() OWNER TO postgres;

--
-- Name: setup_rls_policies(text[]); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.setup_rls_policies(ignore_tables text[] DEFAULT '{}'::text[]) RETURNS void
    LANGUAGE plpgsql
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


ALTER FUNCTION public.setup_rls_policies(ignore_tables text[]) OWNER TO postgres;

--
-- Name: update_updated_at_column(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.update_updated_at_column() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$;


ALTER FUNCTION public.update_updated_at_column() OWNER TO postgres;

--
-- Name: validate_role(text); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.validate_role(role_name text) RETURNS boolean
    LANGUAGE plpgsql
    AS $$
BEGIN
  RETURN role_name IN ('adm', 'teacher', 'student');
END;
$$;


ALTER FUNCTION public.validate_role(role_name text) OWNER TO postgres;

--
-- Name: apply_rls(jsonb, integer); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer DEFAULT (1024 * 1024)) RETURNS SETOF realtime.wal_rls
    LANGUAGE plpgsql
    AS $$
declare
-- Regclass of the table e.g. public.notes
entity_ regclass = (quote_ident(wal ->> 'schema') || '.' || quote_ident(wal ->> 'table'))::regclass;

-- I, U, D, T: insert, update ...
action realtime.action = (
    case wal ->> 'action'
        when 'I' then 'INSERT'
        when 'U' then 'UPDATE'
        when 'D' then 'DELETE'
        else 'ERROR'
    end
);

-- Is row level security enabled for the table
is_rls_enabled bool = relrowsecurity from pg_class where oid = entity_;

subscriptions realtime.subscription[] = array_agg(subs)
    from
        realtime.subscription subs
    where
        subs.entity = entity_;

-- Subscription vars
roles regrole[] = array_agg(distinct us.claims_role::text)
    from
        unnest(subscriptions) us;

working_role regrole;
claimed_role regrole;
claims jsonb;

subscription_id uuid;
subscription_has_access bool;
visible_to_subscription_ids uuid[] = '{}';

-- structured info for wal's columns
columns realtime.wal_column[];
-- previous identity values for update/delete
old_columns realtime.wal_column[];

error_record_exceeds_max_size boolean = octet_length(wal::text) > max_record_bytes;

-- Primary jsonb output for record
output jsonb;

begin
perform set_config('role', null, true);

columns =
    array_agg(
        (
            x->>'name',
            x->>'type',
            x->>'typeoid',
            realtime.cast(
                (x->'value') #>> '{}',
                coalesce(
                    (x->>'typeoid')::regtype, -- null when wal2json version <= 2.4
                    (x->>'type')::regtype
                )
            ),
            (pks ->> 'name') is not null,
            true
        )::realtime.wal_column
    )
    from
        jsonb_array_elements(wal -> 'columns') x
        left join jsonb_array_elements(wal -> 'pk') pks
            on (x ->> 'name') = (pks ->> 'name');

old_columns =
    array_agg(
        (
            x->>'name',
            x->>'type',
            x->>'typeoid',
            realtime.cast(
                (x->'value') #>> '{}',
                coalesce(
                    (x->>'typeoid')::regtype, -- null when wal2json version <= 2.4
                    (x->>'type')::regtype
                )
            ),
            (pks ->> 'name') is not null,
            true
        )::realtime.wal_column
    )
    from
        jsonb_array_elements(wal -> 'identity') x
        left join jsonb_array_elements(wal -> 'pk') pks
            on (x ->> 'name') = (pks ->> 'name');

for working_role in select * from unnest(roles) loop

    -- Update `is_selectable` for columns and old_columns
    columns =
        array_agg(
            (
                c.name,
                c.type_name,
                c.type_oid,
                c.value,
                c.is_pkey,
                pg_catalog.has_column_privilege(working_role, entity_, c.name, 'SELECT')
            )::realtime.wal_column
        )
        from
            unnest(columns) c;

    old_columns =
            array_agg(
                (
                    c.name,
                    c.type_name,
                    c.type_oid,
                    c.value,
                    c.is_pkey,
                    pg_catalog.has_column_privilege(working_role, entity_, c.name, 'SELECT')
                )::realtime.wal_column
            )
            from
                unnest(old_columns) c;

    if action <> 'DELETE' and count(1) = 0 from unnest(columns) c where c.is_pkey then
        return next (
            jsonb_build_object(
                'schema', wal ->> 'schema',
                'table', wal ->> 'table',
                'type', action
            ),
            is_rls_enabled,
            -- subscriptions is already filtered by entity
            (select array_agg(s.subscription_id) from unnest(subscriptions) as s where claims_role = working_role),
            array['Error 400: Bad Request, no primary key']
        )::realtime.wal_rls;

    -- The claims role does not have SELECT permission to the primary key of entity
    elsif action <> 'DELETE' and sum(c.is_selectable::int) <> count(1) from unnest(columns) c where c.is_pkey then
        return next (
            jsonb_build_object(
                'schema', wal ->> 'schema',
                'table', wal ->> 'table',
                'type', action
            ),
            is_rls_enabled,
            (select array_agg(s.subscription_id) from unnest(subscriptions) as s where claims_role = working_role),
            array['Error 401: Unauthorized']
        )::realtime.wal_rls;

    else
        output = jsonb_build_object(
            'schema', wal ->> 'schema',
            'table', wal ->> 'table',
            'type', action,
            'commit_timestamp', to_char(
                ((wal ->> 'timestamp')::timestamptz at time zone 'utc'),
                'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"'
            ),
            'columns', (
                select
                    jsonb_agg(
                        jsonb_build_object(
                            'name', pa.attname,
                            'type', pt.typname
                        )
                        order by pa.attnum asc
                    )
                from
                    pg_attribute pa
                    join pg_type pt
                        on pa.atttypid = pt.oid
                where
                    attrelid = entity_
                    and attnum > 0
                    and pg_catalog.has_column_privilege(working_role, entity_, pa.attname, 'SELECT')
            )
        )
        -- Add "record" key for insert and update
        || case
            when action in ('INSERT', 'UPDATE') then
                jsonb_build_object(
                    'record',
                    (
                        select
                            jsonb_object_agg(
                                -- if unchanged toast, get column name and value from old record
                                coalesce((c).name, (oc).name),
                                case
                                    when (c).name is null then (oc).value
                                    else (c).value
                                end
                            )
                        from
                            unnest(columns) c
                            full outer join unnest(old_columns) oc
                                on (c).name = (oc).name
                        where
                            coalesce((c).is_selectable, (oc).is_selectable)
                            and ( not error_record_exceeds_max_size or (octet_length((c).value::text) <= 64))
                    )
                )
            else '{}'::jsonb
        end
        -- Add "old_record" key for update and delete
        || case
            when action = 'UPDATE' then
                jsonb_build_object(
                        'old_record',
                        (
                            select jsonb_object_agg((c).name, (c).value)
                            from unnest(old_columns) c
                            where
                                (c).is_selectable
                                and ( not error_record_exceeds_max_size or (octet_length((c).value::text) <= 64))
                        )
                    )
            when action = 'DELETE' then
                jsonb_build_object(
                    'old_record',
                    (
                        select jsonb_object_agg((c).name, (c).value)
                        from unnest(old_columns) c
                        where
                            (c).is_selectable
                            and ( not error_record_exceeds_max_size or (octet_length((c).value::text) <= 64))
                            and ( not is_rls_enabled or (c).is_pkey ) -- if RLS enabled, we can't secure deletes so filter to pkey
                    )
                )
            else '{}'::jsonb
        end;

        -- Create the prepared statement
        if is_rls_enabled and action <> 'DELETE' then
            if (select 1 from pg_prepared_statements where name = 'walrus_rls_stmt' limit 1) > 0 then
                deallocate walrus_rls_stmt;
            end if;
            execute realtime.build_prepared_statement_sql('walrus_rls_stmt', entity_, columns);
        end if;

        visible_to_subscription_ids = '{}';

        for subscription_id, claims in (
                select
                    subs.subscription_id,
                    subs.claims
                from
                    unnest(subscriptions) subs
                where
                    subs.entity = entity_
                    and subs.claims_role = working_role
                    and (
                        realtime.is_visible_through_filters(columns, subs.filters)
                        or action = 'DELETE'
                    )
        ) loop

            if not is_rls_enabled or action = 'DELETE' then
                visible_to_subscription_ids = visible_to_subscription_ids || subscription_id;
            else
                -- Check if RLS allows the role to see the record
                perform
                    -- Trim leading and trailing quotes from working_role because set_config
                    -- doesn't recognize the role as valid if they are included
                    set_config('role', trim(both '"' from working_role::text), true),
                    set_config('request.jwt.claims', claims::text, true);

                execute 'execute walrus_rls_stmt' into subscription_has_access;

                if subscription_has_access then
                    visible_to_subscription_ids = visible_to_subscription_ids || subscription_id;
                end if;
            end if;
        end loop;

        perform set_config('role', null, true);

        return next (
            output,
            is_rls_enabled,
            visible_to_subscription_ids,
            case
                when error_record_exceeds_max_size then array['Error 413: Payload Too Large']
                else '{}'
            end
        )::realtime.wal_rls;

    end if;
end loop;

perform set_config('role', null, true);
end;
$$;


ALTER FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) OWNER TO supabase_admin;

--
-- Name: build_prepared_statement_sql(text, regclass, realtime.wal_column[]); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) RETURNS text
    LANGUAGE sql
    AS $$
      /*
      Builds a sql string that, if executed, creates a prepared statement to
      tests retrive a row from *entity* by its primary key columns.
      Example
          select realtime.build_prepared_statement_sql('public.notes', '{"id"}'::text[], '{"bigint"}'::text[])
      */
          select
      'prepare ' || prepared_statement_name || ' as
          select
              exists(
                  select
                      1
                  from
                      ' || entity || '
                  where
                      ' || string_agg(quote_ident(pkc.name) || '=' || quote_nullable(pkc.value #>> '{}') , ' and ') || '
              )'
          from
              unnest(columns) pkc
          where
              pkc.is_pkey
          group by
              entity
      $$;


ALTER FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) OWNER TO supabase_admin;

--
-- Name: cast(text, regtype); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime."cast"(val text, type_ regtype) RETURNS jsonb
    LANGUAGE plpgsql IMMUTABLE
    AS $$
    declare
      res jsonb;
    begin
      execute format('select to_jsonb(%L::'|| type_::text || ')', val)  into res;
      return res;
    end
    $$;


ALTER FUNCTION realtime."cast"(val text, type_ regtype) OWNER TO supabase_admin;

--
-- Name: check_equality_op(realtime.equality_op, regtype, text, text); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) RETURNS boolean
    LANGUAGE plpgsql IMMUTABLE
    AS $$
      /*
      Casts *val_1* and *val_2* as type *type_* and check the *op* condition for truthiness
      */
      declare
          op_symbol text = (
              case
                  when op = 'eq' then '='
                  when op = 'neq' then '!='
                  when op = 'lt' then '<'
                  when op = 'lte' then '<='
                  when op = 'gt' then '>'
                  when op = 'gte' then '>='
                  when op = 'in' then '= any'
                  else 'UNKNOWN OP'
              end
          );
          res boolean;
      begin
          execute format(
              'select %L::'|| type_::text || ' ' || op_symbol
              || ' ( %L::'
              || (
                  case
                      when op = 'in' then type_::text || '[]'
                      else type_::text end
              )
              || ')', val_1, val_2) into res;
          return res;
      end;
      $$;


ALTER FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) OWNER TO supabase_admin;

--
-- Name: is_visible_through_filters(realtime.wal_column[], realtime.user_defined_filter[]); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) RETURNS boolean
    LANGUAGE sql IMMUTABLE
    AS $_$
    /*
    Should the record be visible (true) or filtered out (false) after *filters* are applied
    */
        select
            -- Default to allowed when no filters present
            $2 is null -- no filters. this should not happen because subscriptions has a default
            or array_length($2, 1) is null -- array length of an empty array is null
            or bool_and(
                coalesce(
                    realtime.check_equality_op(
                        op:=f.op,
                        type_:=coalesce(
                            col.type_oid::regtype, -- null when wal2json version <= 2.4
                            col.type_name::regtype
                        ),
                        -- cast jsonb to text
                        val_1:=col.value #>> '{}',
                        val_2:=f.value
                    ),
                    false -- if null, filter does not match
                )
            )
        from
            unnest(filters) f
            join unnest(columns) col
                on f.column_name = col.name;
    $_$;


ALTER FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) OWNER TO supabase_admin;

--
-- Name: list_changes(name, name, integer, integer); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) RETURNS SETOF realtime.wal_rls
    LANGUAGE sql
    SET log_min_messages TO 'fatal'
    AS $$
      with pub as (
        select
          concat_ws(
            ',',
            case when bool_or(pubinsert) then 'insert' else null end,
            case when bool_or(pubupdate) then 'update' else null end,
            case when bool_or(pubdelete) then 'delete' else null end
          ) as w2j_actions,
          coalesce(
            string_agg(
              realtime.quote_wal2json(format('%I.%I', schemaname, tablename)::regclass),
              ','
            ) filter (where ppt.tablename is not null and ppt.tablename not like '% %'),
            ''
          ) w2j_add_tables
        from
          pg_publication pp
          left join pg_publication_tables ppt
            on pp.pubname = ppt.pubname
        where
          pp.pubname = publication
        group by
          pp.pubname
        limit 1
      ),
      w2j as (
        select
          x.*, pub.w2j_add_tables
        from
          pub,
          pg_logical_slot_get_changes(
            slot_name, null, max_changes,
            'include-pk', 'true',
            'include-transaction', 'false',
            'include-timestamp', 'true',
            'include-type-oids', 'true',
            'format-version', '2',
            'actions', pub.w2j_actions,
            'add-tables', pub.w2j_add_tables
          ) x
      )
      select
        xyz.wal,
        xyz.is_rls_enabled,
        xyz.subscription_ids,
        xyz.errors
      from
        w2j,
        realtime.apply_rls(
          wal := w2j.data::jsonb,
          max_record_bytes := max_record_bytes
        ) xyz(wal, is_rls_enabled, subscription_ids, errors)
      where
        w2j.w2j_add_tables <> ''
        and xyz.subscription_ids[1] is not null
    $$;


ALTER FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) OWNER TO supabase_admin;

--
-- Name: quote_wal2json(regclass); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.quote_wal2json(entity regclass) RETURNS text
    LANGUAGE sql IMMUTABLE STRICT
    AS $$
      select
        (
          select string_agg('' || ch,'')
          from unnest(string_to_array(nsp.nspname::text, null)) with ordinality x(ch, idx)
          where
            not (x.idx = 1 and x.ch = '"')
            and not (
              x.idx = array_length(string_to_array(nsp.nspname::text, null), 1)
              and x.ch = '"'
            )
        )
        || '.'
        || (
          select string_agg('' || ch,'')
          from unnest(string_to_array(pc.relname::text, null)) with ordinality x(ch, idx)
          where
            not (x.idx = 1 and x.ch = '"')
            and not (
              x.idx = array_length(string_to_array(nsp.nspname::text, null), 1)
              and x.ch = '"'
            )
          )
      from
        pg_class pc
        join pg_namespace nsp
          on pc.relnamespace = nsp.oid
      where
        pc.oid = entity
    $$;


ALTER FUNCTION realtime.quote_wal2json(entity regclass) OWNER TO supabase_admin;

--
-- Name: subscription_check_filters(); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.subscription_check_filters() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
    /*
    Validates that the user defined filters for a subscription:
    - refer to valid columns that the claimed role may access
    - values are coercable to the correct column type
    */
    declare
        col_names text[] = coalesce(
                array_agg(c.column_name order by c.ordinal_position),
                '{}'::text[]
            )
            from
                information_schema.columns c
            where
                format('%I.%I', c.table_schema, c.table_name)::regclass = new.entity
                and pg_catalog.has_column_privilege(
                    (new.claims ->> 'role'),
                    format('%I.%I', c.table_schema, c.table_name)::regclass,
                    c.column_name,
                    'SELECT'
                );
        filter realtime.user_defined_filter;
        col_type regtype;

        in_val jsonb;
    begin
        for filter in select * from unnest(new.filters) loop
            -- Filtered column is valid
            if not filter.column_name = any(col_names) then
                raise exception 'invalid column for filter %', filter.column_name;
            end if;

            -- Type is sanitized and safe for string interpolation
            col_type = (
                select atttypid::regtype
                from pg_catalog.pg_attribute
                where attrelid = new.entity
                      and attname = filter.column_name
            );
            if col_type is null then
                raise exception 'failed to lookup type for column %', filter.column_name;
            end if;

            -- Set maximum number of entries for in filter
            if filter.op = 'in'::realtime.equality_op then
                in_val = realtime.cast(filter.value, (col_type::text || '[]')::regtype);
                if coalesce(jsonb_array_length(in_val), 0) > 100 then
                    raise exception 'too many values for `in` filter. Maximum 100';
                end if;
            else
                -- raises an exception if value is not coercable to type
                perform realtime.cast(filter.value, col_type);
            end if;

        end loop;

        -- Apply consistent order to filters so the unique constraint on
        -- (subscription_id, entity, filters) can't be tricked by a different filter order
        new.filters = coalesce(
            array_agg(f order by f.column_name, f.op, f.value),
            '{}'
        ) from unnest(new.filters) f;

        return new;
    end;
    $$;


ALTER FUNCTION realtime.subscription_check_filters() OWNER TO supabase_admin;

--
-- Name: to_regrole(text); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.to_regrole(role_name text) RETURNS regrole
    LANGUAGE sql IMMUTABLE
    AS $$ select role_name::regrole $$;


ALTER FUNCTION realtime.to_regrole(role_name text) OWNER TO supabase_admin;

--
-- Name: topic(); Type: FUNCTION; Schema: realtime; Owner: supabase_realtime_admin
--

CREATE FUNCTION realtime.topic() RETURNS text
    LANGUAGE sql STABLE
    AS $$
select nullif(current_setting('realtime.topic', true), '')::text;
$$;


ALTER FUNCTION realtime.topic() OWNER TO supabase_realtime_admin;

--
-- Name: can_insert_object(text, text, uuid, jsonb); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.can_insert_object(bucketid text, name text, owner uuid, metadata jsonb) RETURNS void
    LANGUAGE plpgsql
    AS $$
BEGIN
  INSERT INTO "storage"."objects" ("bucket_id", "name", "owner", "metadata") VALUES (bucketid, name, owner, metadata);
  -- hack to rollback the successful insert
  RAISE sqlstate 'PT200' using
  message = 'ROLLBACK',
  detail = 'rollback successful insert';
END
$$;


ALTER FUNCTION storage.can_insert_object(bucketid text, name text, owner uuid, metadata jsonb) OWNER TO supabase_storage_admin;

--
-- Name: extension(text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.extension(name text) RETURNS text
    LANGUAGE plpgsql
    AS $$
DECLARE
_parts text[];
_filename text;
BEGIN
	select string_to_array(name, '/') into _parts;
	select _parts[array_length(_parts,1)] into _filename;
	-- @todo return the last part instead of 2
	return reverse(split_part(reverse(_filename), '.', 1));
END
$$;


ALTER FUNCTION storage.extension(name text) OWNER TO supabase_storage_admin;

--
-- Name: filename(text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.filename(name text) RETURNS text
    LANGUAGE plpgsql
    AS $$
DECLARE
_parts text[];
BEGIN
	select string_to_array(name, '/') into _parts;
	return _parts[array_length(_parts,1)];
END
$$;


ALTER FUNCTION storage.filename(name text) OWNER TO supabase_storage_admin;

--
-- Name: foldername(text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.foldername(name text) RETURNS text[]
    LANGUAGE plpgsql
    AS $$
DECLARE
_parts text[];
BEGIN
	select string_to_array(name, '/') into _parts;
	return _parts[1:array_length(_parts,1)-1];
END
$$;


ALTER FUNCTION storage.foldername(name text) OWNER TO supabase_storage_admin;

--
-- Name: get_size_by_bucket(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.get_size_by_bucket() RETURNS TABLE(size bigint, bucket_id text)
    LANGUAGE plpgsql
    AS $$
BEGIN
    return query
        select sum((metadata->>'size')::int) as size, obj.bucket_id
        from "storage".objects as obj
        group by obj.bucket_id;
END
$$;


ALTER FUNCTION storage.get_size_by_bucket() OWNER TO supabase_storage_admin;

--
-- Name: list_multipart_uploads_with_delimiter(text, text, text, integer, text, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.list_multipart_uploads_with_delimiter(bucket_id text, prefix_param text, delimiter_param text, max_keys integer DEFAULT 100, next_key_token text DEFAULT ''::text, next_upload_token text DEFAULT ''::text) RETURNS TABLE(key text, id text, created_at timestamp with time zone)
    LANGUAGE plpgsql
    AS $_$
BEGIN
    RETURN QUERY EXECUTE
        'SELECT DISTINCT ON(key COLLATE "C") * from (
            SELECT
                CASE
                    WHEN position($2 IN substring(key from length($1) + 1)) > 0 THEN
                        substring(key from 1 for length($1) + position($2 IN substring(key from length($1) + 1)))
                    ELSE
                        key
                END AS key, id, created_at
            FROM
                storage.s3_multipart_uploads
            WHERE
                bucket_id = $5 AND
                key ILIKE $1 || ''%'' AND
                CASE
                    WHEN $4 != '''' AND $6 = '''' THEN
                        CASE
                            WHEN position($2 IN substring(key from length($1) + 1)) > 0 THEN
                                substring(key from 1 for length($1) + position($2 IN substring(key from length($1) + 1))) COLLATE "C" > $4
                            ELSE
                                key COLLATE "C" > $4
                            END
                    ELSE
                        true
                END AND
                CASE
                    WHEN $6 != '''' THEN
                        id COLLATE "C" > $6
                    ELSE
                        true
                    END
            ORDER BY
                key COLLATE "C" ASC, created_at ASC) as e order by key COLLATE "C" LIMIT $3'
        USING prefix_param, delimiter_param, max_keys, next_key_token, bucket_id, next_upload_token;
END;
$_$;


ALTER FUNCTION storage.list_multipart_uploads_with_delimiter(bucket_id text, prefix_param text, delimiter_param text, max_keys integer, next_key_token text, next_upload_token text) OWNER TO supabase_storage_admin;

--
-- Name: list_objects_with_delimiter(text, text, text, integer, text, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.list_objects_with_delimiter(bucket_id text, prefix_param text, delimiter_param text, max_keys integer DEFAULT 100, start_after text DEFAULT ''::text, next_token text DEFAULT ''::text) RETURNS TABLE(name text, id uuid, metadata jsonb, updated_at timestamp with time zone)
    LANGUAGE plpgsql
    AS $_$
BEGIN
    RETURN QUERY EXECUTE
        'SELECT DISTINCT ON(name COLLATE "C") * from (
            SELECT
                CASE
                    WHEN position($2 IN substring(name from length($1) + 1)) > 0 THEN
                        substring(name from 1 for length($1) + position($2 IN substring(name from length($1) + 1)))
                    ELSE
                        name
                END AS name, id, metadata, updated_at
            FROM
                storage.objects
            WHERE
                bucket_id = $5 AND
                name ILIKE $1 || ''%'' AND
                CASE
                    WHEN $6 != '''' THEN
                    name COLLATE "C" > $6
                ELSE true END
                AND CASE
                    WHEN $4 != '''' THEN
                        CASE
                            WHEN position($2 IN substring(name from length($1) + 1)) > 0 THEN
                                substring(name from 1 for length($1) + position($2 IN substring(name from length($1) + 1))) COLLATE "C" > $4
                            ELSE
                                name COLLATE "C" > $4
                            END
                    ELSE
                        true
                END
            ORDER BY
                name COLLATE "C" ASC) as e order by name COLLATE "C" LIMIT $3'
        USING prefix_param, delimiter_param, max_keys, next_token, bucket_id, start_after;
END;
$_$;


ALTER FUNCTION storage.list_objects_with_delimiter(bucket_id text, prefix_param text, delimiter_param text, max_keys integer, start_after text, next_token text) OWNER TO supabase_storage_admin;

--
-- Name: operation(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.operation() RETURNS text
    LANGUAGE plpgsql STABLE
    AS $$
BEGIN
    RETURN current_setting('storage.operation', true);
END;
$$;


ALTER FUNCTION storage.operation() OWNER TO supabase_storage_admin;

--
-- Name: search(text, text, integer, integer, integer, text, text, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.search(prefix text, bucketname text, limits integer DEFAULT 100, levels integer DEFAULT 1, offsets integer DEFAULT 0, search text DEFAULT ''::text, sortcolumn text DEFAULT 'name'::text, sortorder text DEFAULT 'asc'::text) RETURNS TABLE(name text, id uuid, updated_at timestamp with time zone, created_at timestamp with time zone, last_accessed_at timestamp with time zone, metadata jsonb)
    LANGUAGE plpgsql STABLE
    AS $_$
declare
  v_order_by text;
  v_sort_order text;
begin
  case
    when sortcolumn = 'name' then
      v_order_by = 'name';
    when sortcolumn = 'updated_at' then
      v_order_by = 'updated_at';
    when sortcolumn = 'created_at' then
      v_order_by = 'created_at';
    when sortcolumn = 'last_accessed_at' then
      v_order_by = 'last_accessed_at';
    else
      v_order_by = 'name';
  end case;

  case
    when sortorder = 'asc' then
      v_sort_order = 'asc';
    when sortorder = 'desc' then
      v_sort_order = 'desc';
    else
      v_sort_order = 'asc';
  end case;

  v_order_by = v_order_by || ' ' || v_sort_order;

  return query execute
    'with folders as (
       select path_tokens[$1] as folder
       from storage.objects
         where objects.name ilike $2 || $3 || ''%''
           and bucket_id = $4
           and array_length(objects.path_tokens, 1) <> $1
       group by folder
       order by folder ' || v_sort_order || '
     )
     (select folder as "name",
            null as id,
            null as updated_at,
            null as created_at,
            null as last_accessed_at,
            null as metadata from folders)
     union all
     (select path_tokens[$1] as "name",
            id,
            updated_at,
            created_at,
            last_accessed_at,
            metadata
     from storage.objects
     where objects.name ilike $2 || $3 || ''%''
       and bucket_id = $4
       and array_length(objects.path_tokens, 1) = $1
     order by ' || v_order_by || ')
     limit $5
     offset $6' using levels, prefix, search, bucketname, limits, offsets;
end;
$_$;


ALTER FUNCTION storage.search(prefix text, bucketname text, limits integer, levels integer, offsets integer, search text, sortcolumn text, sortorder text) OWNER TO supabase_storage_admin;

--
-- Name: update_updated_at_column(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.update_updated_at_column() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW; 
END;
$$;


ALTER FUNCTION storage.update_updated_at_column() OWNER TO supabase_storage_admin;

--
-- Name: http_request(); Type: FUNCTION; Schema: supabase_functions; Owner: supabase_functions_admin
--

CREATE FUNCTION supabase_functions.http_request() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'supabase_functions'
    AS $$
  DECLARE
    request_id bigint;
    payload jsonb;
    url text := TG_ARGV[0]::text;
    method text := TG_ARGV[1]::text;
    headers jsonb DEFAULT '{}'::jsonb;
    params jsonb DEFAULT '{}'::jsonb;
    timeout_ms integer DEFAULT 1000;
  BEGIN
    IF url IS NULL OR url = 'null' THEN
      RAISE EXCEPTION 'url argument is missing';
    END IF;

    IF method IS NULL OR method = 'null' THEN
      RAISE EXCEPTION 'method argument is missing';
    END IF;

    IF TG_ARGV[2] IS NULL OR TG_ARGV[2] = 'null' THEN
      headers = '{"Content-Type": "application/json"}'::jsonb;
    ELSE
      headers = TG_ARGV[2]::jsonb;
    END IF;

    IF TG_ARGV[3] IS NULL OR TG_ARGV[3] = 'null' THEN
      params = '{}'::jsonb;
    ELSE
      params = TG_ARGV[3]::jsonb;
    END IF;

    IF TG_ARGV[4] IS NULL OR TG_ARGV[4] = 'null' THEN
      timeout_ms = 1000;
    ELSE
      timeout_ms = TG_ARGV[4]::integer;
    END IF;

    CASE
      WHEN method = 'GET' THEN
        SELECT http_get INTO request_id FROM net.http_get(
          url,
          params,
          headers,
          timeout_ms
        );
      WHEN method = 'POST' THEN
        payload = jsonb_build_object(
          'old_record', OLD,
          'record', NEW,
          'type', TG_OP,
          'table', TG_TABLE_NAME,
          'schema', TG_TABLE_SCHEMA
        );

        SELECT http_post INTO request_id FROM net.http_post(
          url,
          payload,
          params,
          headers,
          timeout_ms
        );
      ELSE
        RAISE EXCEPTION 'method argument % is invalid', method;
    END CASE;

    INSERT INTO supabase_functions.hooks
      (hook_table_id, hook_name, request_id)
    VALUES
      (TG_RELID, TG_NAME, request_id);

    RETURN NEW;
  END
$$;


ALTER FUNCTION supabase_functions.http_request() OWNER TO supabase_functions_admin;

--
-- Name: secrets_encrypt_secret_secret(); Type: FUNCTION; Schema: vault; Owner: supabase_admin
--

CREATE FUNCTION vault.secrets_encrypt_secret_secret() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
		BEGIN
		        new.secret = CASE WHEN new.secret IS NULL THEN NULL ELSE
			CASE WHEN new.key_id IS NULL THEN NULL ELSE pg_catalog.encode(
			  pgsodium.crypto_aead_det_encrypt(
				pg_catalog.convert_to(new.secret, 'utf8'),
				pg_catalog.convert_to((new.id::text || new.description::text || new.created_at::text || new.updated_at::text)::text, 'utf8'),
				new.key_id::uuid,
				new.nonce
			  ),
				'base64') END END;
		RETURN new;
		END;
		$$;


ALTER FUNCTION vault.secrets_encrypt_secret_secret() OWNER TO supabase_admin;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: extensions; Type: TABLE; Schema: _realtime; Owner: supabase_admin
--

CREATE TABLE _realtime.extensions (
    id uuid NOT NULL,
    type text,
    settings jsonb,
    tenant_external_id text,
    inserted_at timestamp(0) without time zone NOT NULL,
    updated_at timestamp(0) without time zone NOT NULL
);


ALTER TABLE _realtime.extensions OWNER TO supabase_admin;

--
-- Name: schema_migrations; Type: TABLE; Schema: _realtime; Owner: supabase_admin
--

CREATE TABLE _realtime.schema_migrations (
    version bigint NOT NULL,
    inserted_at timestamp(0) without time zone
);


ALTER TABLE _realtime.schema_migrations OWNER TO supabase_admin;

--
-- Name: tenants; Type: TABLE; Schema: _realtime; Owner: supabase_admin
--

CREATE TABLE _realtime.tenants (
    id uuid NOT NULL,
    name text,
    external_id text,
    jwt_secret text,
    max_concurrent_users integer DEFAULT 200 NOT NULL,
    inserted_at timestamp(0) without time zone NOT NULL,
    updated_at timestamp(0) without time zone NOT NULL,
    max_events_per_second integer DEFAULT 100 NOT NULL,
    postgres_cdc_default text DEFAULT 'postgres_cdc_rls'::text,
    max_bytes_per_second integer DEFAULT 100000 NOT NULL,
    max_channels_per_client integer DEFAULT 100 NOT NULL,
    max_joins_per_second integer DEFAULT 500 NOT NULL,
    suspend boolean DEFAULT false,
    jwt_jwks jsonb,
    notify_private_alpha boolean DEFAULT false
);


ALTER TABLE _realtime.tenants OWNER TO supabase_admin;

--
-- Name: audit_log_entries; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.audit_log_entries (
    instance_id uuid,
    id uuid NOT NULL,
    payload json,
    created_at timestamp with time zone,
    ip_address character varying(64) DEFAULT ''::character varying NOT NULL
);


ALTER TABLE auth.audit_log_entries OWNER TO supabase_auth_admin;

--
-- Name: TABLE audit_log_entries; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.audit_log_entries IS 'Auth: Audit trail for user actions.';


--
-- Name: flow_state; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.flow_state (
    id uuid NOT NULL,
    user_id uuid,
    auth_code text NOT NULL,
    code_challenge_method auth.code_challenge_method NOT NULL,
    code_challenge text NOT NULL,
    provider_type text NOT NULL,
    provider_access_token text,
    provider_refresh_token text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    authentication_method text NOT NULL,
    auth_code_issued_at timestamp with time zone
);


ALTER TABLE auth.flow_state OWNER TO supabase_auth_admin;

--
-- Name: TABLE flow_state; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.flow_state IS 'stores metadata for pkce logins';


--
-- Name: identities; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.identities (
    provider_id text NOT NULL,
    user_id uuid NOT NULL,
    identity_data jsonb NOT NULL,
    provider text NOT NULL,
    last_sign_in_at timestamp with time zone,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    email text GENERATED ALWAYS AS (lower((identity_data ->> 'email'::text))) STORED,
    id uuid DEFAULT gen_random_uuid() NOT NULL
);


ALTER TABLE auth.identities OWNER TO supabase_auth_admin;

--
-- Name: TABLE identities; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.identities IS 'Auth: Stores identities associated to a user.';


--
-- Name: COLUMN identities.email; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON COLUMN auth.identities.email IS 'Auth: Email is a generated column that references the optional email property in the identity_data';


--
-- Name: instances; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.instances (
    id uuid NOT NULL,
    uuid uuid,
    raw_base_config text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE auth.instances OWNER TO supabase_auth_admin;

--
-- Name: TABLE instances; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.instances IS 'Auth: Manages users across multiple sites.';


--
-- Name: mfa_amr_claims; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.mfa_amr_claims (
    session_id uuid NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    authentication_method text NOT NULL,
    id uuid NOT NULL
);


ALTER TABLE auth.mfa_amr_claims OWNER TO supabase_auth_admin;

--
-- Name: TABLE mfa_amr_claims; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.mfa_amr_claims IS 'auth: stores authenticator method reference claims for multi factor authentication';


--
-- Name: mfa_challenges; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.mfa_challenges (
    id uuid NOT NULL,
    factor_id uuid NOT NULL,
    created_at timestamp with time zone NOT NULL,
    verified_at timestamp with time zone,
    ip_address inet NOT NULL,
    otp_code text
);


ALTER TABLE auth.mfa_challenges OWNER TO supabase_auth_admin;

--
-- Name: TABLE mfa_challenges; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.mfa_challenges IS 'auth: stores metadata about challenge requests made';


--
-- Name: mfa_factors; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.mfa_factors (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    friendly_name text,
    factor_type auth.factor_type NOT NULL,
    status auth.factor_status NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    secret text,
    phone text,
    last_challenged_at timestamp with time zone
);


ALTER TABLE auth.mfa_factors OWNER TO supabase_auth_admin;

--
-- Name: TABLE mfa_factors; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.mfa_factors IS 'auth: stores metadata about factors';


--
-- Name: one_time_tokens; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.one_time_tokens (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    token_type auth.one_time_token_type NOT NULL,
    token_hash text NOT NULL,
    relates_to text NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    CONSTRAINT one_time_tokens_token_hash_check CHECK ((char_length(token_hash) > 0))
);


ALTER TABLE auth.one_time_tokens OWNER TO supabase_auth_admin;

--
-- Name: refresh_tokens; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.refresh_tokens (
    instance_id uuid,
    id bigint NOT NULL,
    token character varying(255),
    user_id character varying(255),
    revoked boolean,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    parent character varying(255),
    session_id uuid
);


ALTER TABLE auth.refresh_tokens OWNER TO supabase_auth_admin;

--
-- Name: TABLE refresh_tokens; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.refresh_tokens IS 'Auth: Store of tokens used to refresh JWT tokens once they expire.';


--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE; Schema: auth; Owner: supabase_auth_admin
--

CREATE SEQUENCE auth.refresh_tokens_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE auth.refresh_tokens_id_seq OWNER TO supabase_auth_admin;

--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE OWNED BY; Schema: auth; Owner: supabase_auth_admin
--

ALTER SEQUENCE auth.refresh_tokens_id_seq OWNED BY auth.refresh_tokens.id;


--
-- Name: saml_providers; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.saml_providers (
    id uuid NOT NULL,
    sso_provider_id uuid NOT NULL,
    entity_id text NOT NULL,
    metadata_xml text NOT NULL,
    metadata_url text,
    attribute_mapping jsonb,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    name_id_format text,
    CONSTRAINT "entity_id not empty" CHECK ((char_length(entity_id) > 0)),
    CONSTRAINT "metadata_url not empty" CHECK (((metadata_url = NULL::text) OR (char_length(metadata_url) > 0))),
    CONSTRAINT "metadata_xml not empty" CHECK ((char_length(metadata_xml) > 0))
);


ALTER TABLE auth.saml_providers OWNER TO supabase_auth_admin;

--
-- Name: TABLE saml_providers; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.saml_providers IS 'Auth: Manages SAML Identity Provider connections.';


--
-- Name: saml_relay_states; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.saml_relay_states (
    id uuid NOT NULL,
    sso_provider_id uuid NOT NULL,
    request_id text NOT NULL,
    for_email text,
    redirect_to text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    flow_state_id uuid,
    CONSTRAINT "request_id not empty" CHECK ((char_length(request_id) > 0))
);


ALTER TABLE auth.saml_relay_states OWNER TO supabase_auth_admin;

--
-- Name: TABLE saml_relay_states; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.saml_relay_states IS 'Auth: Contains SAML Relay State information for each Service Provider initiated login.';


--
-- Name: schema_migrations; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.schema_migrations (
    version character varying(255) NOT NULL
);


ALTER TABLE auth.schema_migrations OWNER TO supabase_auth_admin;

--
-- Name: TABLE schema_migrations; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.schema_migrations IS 'Auth: Manages updates to the auth system.';


--
-- Name: sessions; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.sessions (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    factor_id uuid,
    aal auth.aal_level,
    not_after timestamp with time zone,
    refreshed_at timestamp without time zone,
    user_agent text,
    ip inet,
    tag text
);


ALTER TABLE auth.sessions OWNER TO supabase_auth_admin;

--
-- Name: TABLE sessions; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.sessions IS 'Auth: Stores session data associated to a user.';


--
-- Name: COLUMN sessions.not_after; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON COLUMN auth.sessions.not_after IS 'Auth: Not after is a nullable column that contains a timestamp after which the session should be regarded as expired.';


--
-- Name: sso_domains; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.sso_domains (
    id uuid NOT NULL,
    sso_provider_id uuid NOT NULL,
    domain text NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    CONSTRAINT "domain not empty" CHECK ((char_length(domain) > 0))
);


ALTER TABLE auth.sso_domains OWNER TO supabase_auth_admin;

--
-- Name: TABLE sso_domains; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.sso_domains IS 'Auth: Manages SSO email address domain mapping to an SSO Identity Provider.';


--
-- Name: sso_providers; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.sso_providers (
    id uuid NOT NULL,
    resource_id text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    CONSTRAINT "resource_id not empty" CHECK (((resource_id = NULL::text) OR (char_length(resource_id) > 0)))
);


ALTER TABLE auth.sso_providers OWNER TO supabase_auth_admin;

--
-- Name: TABLE sso_providers; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.sso_providers IS 'Auth: Manages SSO identity provider information; see saml_providers for SAML.';


--
-- Name: COLUMN sso_providers.resource_id; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON COLUMN auth.sso_providers.resource_id IS 'Auth: Uniquely identifies a SSO provider according to a user-chosen resource ID (case insensitive), useful in infrastructure as code.';


--
-- Name: users; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.users (
    instance_id uuid,
    id uuid NOT NULL,
    aud character varying(255),
    role character varying(255),
    email character varying(255),
    encrypted_password character varying(255),
    email_confirmed_at timestamp with time zone,
    invited_at timestamp with time zone,
    confirmation_token character varying(255),
    confirmation_sent_at timestamp with time zone,
    recovery_token character varying(255),
    recovery_sent_at timestamp with time zone,
    email_change_token_new character varying(255),
    email_change character varying(255),
    email_change_sent_at timestamp with time zone,
    last_sign_in_at timestamp with time zone,
    raw_app_meta_data jsonb,
    raw_user_meta_data jsonb,
    is_super_admin boolean,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    phone text DEFAULT NULL::character varying,
    phone_confirmed_at timestamp with time zone,
    phone_change text DEFAULT ''::character varying,
    phone_change_token character varying(255) DEFAULT ''::character varying,
    phone_change_sent_at timestamp with time zone,
    confirmed_at timestamp with time zone GENERATED ALWAYS AS (LEAST(email_confirmed_at, phone_confirmed_at)) STORED,
    email_change_token_current character varying(255) DEFAULT ''::character varying,
    email_change_confirm_status smallint DEFAULT 0,
    banned_until timestamp with time zone,
    reauthentication_token character varying(255) DEFAULT ''::character varying,
    reauthentication_sent_at timestamp with time zone,
    is_sso_user boolean DEFAULT false NOT NULL,
    deleted_at timestamp with time zone,
    is_anonymous boolean DEFAULT false NOT NULL,
    CONSTRAINT users_email_change_confirm_status_check CHECK (((email_change_confirm_status >= 0) AND (email_change_confirm_status <= 2)))
);


ALTER TABLE auth.users OWNER TO supabase_auth_admin;

--
-- Name: TABLE users; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.users IS 'Auth: Stores user login data within a secure schema.';


--
-- Name: COLUMN users.is_sso_user; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON COLUMN auth.users.is_sso_user IS 'Auth: Set this column to true when the account comes from SSO. These accounts can have duplicate emails.';


--
-- Name: _teachertotimetable; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._teachertotimetable (
    a uuid NOT NULL,
    b uuid NOT NULL
);


ALTER TABLE public._teachertotimetable OWNER TO postgres;

--
-- Name: academic_year; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.academic_year (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    school_id uuid NOT NULL,
    template_id uuid NOT NULL,
    ref_year integer NOT NULL,
    metadata jsonb,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone,
    user_created uuid DEFAULT auth.uid()
);


ALTER TABLE public.academic_year OWNER TO postgres;

--
-- Name: academic_year_template; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.academic_year_template (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    ref_year integer NOT NULL,
    name character varying(100) NOT NULL,
    stages jsonb NOT NULL,
    stage_count integer GENERATED ALWAYS AS (jsonb_array_length(stages)) STORED,
    metadata jsonb,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone,
    user_created uuid DEFAULT auth.uid()
);


ALTER TABLE public.academic_year_template OWNER TO postgres;

--
-- Name: attendance; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.attendance (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    school_id uuid NOT NULL,
    student_id uuid NOT NULL,
    date timestamp with time zone NOT NULL,
    status public.attendance_status NOT NULL,
    metadata jsonb,
    user_created uuid DEFAULT auth.uid(),
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE public.attendance OWNER TO postgres;

--
-- Name: class_session; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.class_session (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    school_id uuid NOT NULL,
    discipline_id uuid NOT NULL,
    timetable_id uuid NOT NULL,
    day_of_week public.day_of_week NOT NULL,
    start_time time without time zone NOT NULL,
    end_time time without time zone NOT NULL,
    metadata jsonb,
    user_created uuid DEFAULT auth.uid(),
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE public.class_session OWNER TO postgres;

--
-- Name: classroom; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.classroom (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    school_id uuid NOT NULL,
    series_id uuid NOT NULL,
    institution_id uuid NOT NULL,
    course_id uuid NOT NULL,
    teacher_id uuid NOT NULL,
    maxstudents integer NOT NULL,
    starttime time without time zone NOT NULL,
    starttimeinterval time without time zone NOT NULL,
    endtimeinterval time without time zone NOT NULL,
    endtime time without time zone NOT NULL,
    day_of_week public.day_of_week NOT NULL,
    name character varying(100) NOT NULL,
    period public.period DEFAULT 'Manhã'::public.period NOT NULL,
    status public.status DEFAULT 'Ativo'::public.status NOT NULL,
    abbreviation character varying(100),
    year integer NOT NULL,
    metadata jsonb,
    user_created uuid DEFAULT auth.uid(),
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE public.classroom OWNER TO postgres;

--
-- Name: course; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.course (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    school_id uuid NOT NULL,
    name character varying(100) NOT NULL,
    status public.status DEFAULT 'Ativo'::public.status,
    metadata jsonb,
    user_created uuid DEFAULT auth.uid(),
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE public.course OWNER TO postgres;

--
-- Name: discipline; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.discipline (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    school_id uuid NOT NULL,
    teacher_id uuid NOT NULL,
    name character varying(100) NOT NULL,
    status public.status DEFAULT 'Ativo'::public.status,
    metadata jsonb,
    user_created uuid DEFAULT auth.uid(),
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE public.discipline OWNER TO postgres;

--
-- Name: document; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.document (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    file_name character varying(255) NOT NULL,
    mime_type character varying(255) NOT NULL,
    size bigint NOT NULL,
    is_current_version boolean DEFAULT true,
    file_hash text,
    upload_date timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    storage_path text NOT NULL,
    version integer DEFAULT 1,
    compression_applied boolean DEFAULT false,
    metadata jsonb,
    is_deleted boolean DEFAULT false,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone,
    user_created uuid DEFAULT auth.uid()
);


ALTER TABLE public.document OWNER TO postgres;

--
-- Name: enrollment; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.enrollment (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    school_id uuid NOT NULL,
    student_id uuid NOT NULL,
    institution_id uuid NOT NULL,
    course_id uuid NOT NULL,
    classroom_id uuid NOT NULL,
    series_id uuid NOT NULL,
    name character varying(100),
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamp with time zone,
    updated_at timestamp with time zone,
    date_enrollment date NOT NULL,
    observations character varying(200),
    status public.status DEFAULT 'Ativo'::public.status,
    situation public.situation_type,
    enrollmentcode character varying(100)
);


ALTER TABLE public.enrollment OWNER TO postgres;

--
-- Name: grade; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.grade (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    school_id uuid NOT NULL,
    student_id uuid NOT NULL,
    discipline_id uuid NOT NULL,
    value double precision NOT NULL,
    date timestamp with time zone NOT NULL,
    metadata jsonb,
    user_created uuid DEFAULT auth.uid(),
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE public.grade OWNER TO postgres;

--
-- Name: holidays; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.holidays (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name character varying(100) NOT NULL,
    holiday_date date NOT NULL,
    description character varying(100),
    weekday character varying(10)
);


ALTER TABLE public.holidays OWNER TO postgres;

--
-- Name: institution; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.institution (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name character varying(100) NOT NULL,
    address character varying(255),
    city character varying(100),
    state character(2),
    postalcode character(10),
    phone character varying(15),
    email character varying(255),
    metadata jsonb,
    user_created uuid DEFAULT auth.uid(),
    singleton integer DEFAULT 1 NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE public.institution OWNER TO postgres;

--
-- Name: role; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.role (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    school_id uuid NOT NULL,
    name character varying(100) NOT NULL
);


ALTER TABLE public.role OWNER TO postgres;

--
-- Name: role_permission; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.role_permission (
    school_id uuid NOT NULL,
    role_id uuid NOT NULL,
    "table" character varying NOT NULL,
    can_select boolean NOT NULL,
    can_insert boolean NOT NULL,
    can_update boolean NOT NULL,
    can_delete boolean NOT NULL
);


ALTER TABLE public.role_permission OWNER TO postgres;

--
-- Name: school; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.school (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name character varying(100) NOT NULL,
    address character varying(255),
    city character varying(100),
    state character(2),
    postalcode character(10),
    school_zone character varying(10),
    phone character varying(15),
    email character varying(100),
    website character varying(255),
    social_network character varying(255),
    institution_id uuid NOT NULL,
    active boolean DEFAULT true NOT NULL,
    abbreviation character varying(255),
    logourl character varying(255),
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamp with time zone,
    updated_at timestamp with time zone,
    user_created uuid DEFAULT auth.uid()
);


ALTER TABLE public.school OWNER TO postgres;

--
-- Name: series; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.series (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    school_id uuid NOT NULL,
    course_id uuid NOT NULL,
    institution_id uuid,
    timetable_id uuid,
    name character varying(100) NOT NULL,
    course_stage public.course_stage_type DEFAULT 'Etapa 1'::public.course_stage_type NOT NULL,
    graduate public.graduate_status DEFAULT 'Sim'::public.graduate_status NOT NULL,
    workload character varying(100) NOT NULL,
    school_days character varying(100) NOT NULL,
    metadata jsonb,
    user_created uuid DEFAULT auth.uid(),
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE public.series OWNER TO postgres;

--
-- Name: student; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.student (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    school_id uuid NOT NULL,
    classroom_id uuid NOT NULL,
    name character varying(100) NOT NULL,
    birthdate date NOT NULL,
    gender public.gender_type DEFAULT 'Masculino'::public.gender_type,
    place_of_birth character varying(100),
    postalcode character varying(100),
    residence_zone public.residence_zone_type DEFAULT 'Urbana'::public.residence_zone_type,
    number_address character varying(100),
    cpf character varying(100) NOT NULL,
    neighborhood character varying(100),
    city character varying(100),
    complement character varying(100),
    father_name character varying(100),
    father_email character varying(100),
    father_cpf character varying(100),
    father_phone character varying(100),
    mother_name character varying(100),
    mother_email character varying(100),
    mother_cpf character varying(100),
    mother_phone character varying(100),
    rg_number character varying(100),
    rg_state character(2),
    rg_issue_date date,
    rg_issuer character varying(100),
    new_birth_cert_number character varying(100),
    old_birth_cert_term character varying(100),
    old_birth_cert_book character varying(100),
    old_birth_cert_sheet character varying(100),
    docstype character varying(100),
    old_birth_cert_date_issue date,
    old_birth_cert_state character varying(100),
    responsibletype public.responsibletype DEFAULT 'Pai'::public.responsibletype,
    series_id uuid NOT NULL,
    email character varying(255),
    phone character varying(15) NOT NULL,
    address character varying(255),
    status public.status DEFAULT 'Ativo'::public.status,
    photo bytea,
    metadata jsonb,
    user_created uuid DEFAULT auth.uid(),
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE public.student OWNER TO postgres;

--
-- Name: teacher; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.teacher (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    school_id uuid NOT NULL,
    name character varying(100) NOT NULL,
    birthdate date NOT NULL,
    email character varying(255),
    phone character varying(15),
    address character varying(255),
    qualifications jsonb,
    status public.status DEFAULT 'Ativo'::public.status,
    metadata jsonb,
    user_created uuid DEFAULT auth.uid(),
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE public.teacher OWNER TO postgres;

--
-- Name: teacher_to_timetable; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.teacher_to_timetable (
    school_id uuid NOT NULL,
    teacher_id uuid NOT NULL,
    timetable_id uuid NOT NULL
);


ALTER TABLE public.teacher_to_timetable OWNER TO postgres;

--
-- Name: timetable; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.timetable (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    school_id uuid NOT NULL,
    classroom_id uuid NOT NULL,
    discipline_id uuid,
    name character varying(100) NOT NULL,
    metadata jsonb,
    user_created uuid DEFAULT auth.uid(),
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE public.timetable OWNER TO postgres;

--
-- Name: timetable_school; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.timetable_school (
    timetable_id uuid NOT NULL,
    school_id uuid NOT NULL,
    metadata jsonb,
    user_created uuid DEFAULT auth.uid(),
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE public.timetable_school OWNER TO postgres;

--
-- Name: user_role; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_role (
    school_id uuid NOT NULL,
    role_id uuid NOT NULL,
    user_id uuid NOT NULL
);


ALTER TABLE public.user_role OWNER TO postgres;

--
-- Name: messages; Type: TABLE; Schema: realtime; Owner: supabase_realtime_admin
--

CREATE TABLE realtime.messages (
    id bigint NOT NULL,
    topic text NOT NULL,
    extension text NOT NULL,
    inserted_at timestamp(0) without time zone NOT NULL,
    updated_at timestamp(0) without time zone NOT NULL
);


ALTER TABLE realtime.messages OWNER TO supabase_realtime_admin;

--
-- Name: messages_id_seq; Type: SEQUENCE; Schema: realtime; Owner: supabase_realtime_admin
--

CREATE SEQUENCE realtime.messages_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE realtime.messages_id_seq OWNER TO supabase_realtime_admin;

--
-- Name: messages_id_seq; Type: SEQUENCE OWNED BY; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER SEQUENCE realtime.messages_id_seq OWNED BY realtime.messages.id;


--
-- Name: schema_migrations; Type: TABLE; Schema: realtime; Owner: supabase_admin
--

CREATE TABLE realtime.schema_migrations (
    version bigint NOT NULL,
    inserted_at timestamp(0) without time zone
);


ALTER TABLE realtime.schema_migrations OWNER TO supabase_admin;

--
-- Name: subscription; Type: TABLE; Schema: realtime; Owner: supabase_admin
--

CREATE TABLE realtime.subscription (
    id bigint NOT NULL,
    subscription_id uuid NOT NULL,
    entity regclass NOT NULL,
    filters realtime.user_defined_filter[] DEFAULT '{}'::realtime.user_defined_filter[] NOT NULL,
    claims jsonb NOT NULL,
    claims_role regrole GENERATED ALWAYS AS (realtime.to_regrole((claims ->> 'role'::text))) STORED NOT NULL,
    created_at timestamp without time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);


ALTER TABLE realtime.subscription OWNER TO supabase_admin;

--
-- Name: subscription_id_seq; Type: SEQUENCE; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE realtime.subscription ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME realtime.subscription_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: buckets; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.buckets (
    id text NOT NULL,
    name text NOT NULL,
    owner uuid,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    public boolean DEFAULT false,
    avif_autodetection boolean DEFAULT false,
    file_size_limit bigint,
    allowed_mime_types text[],
    owner_id text
);


ALTER TABLE storage.buckets OWNER TO supabase_storage_admin;

--
-- Name: COLUMN buckets.owner; Type: COMMENT; Schema: storage; Owner: supabase_storage_admin
--

COMMENT ON COLUMN storage.buckets.owner IS 'Field is deprecated, use owner_id instead';


--
-- Name: migrations; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.migrations (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    hash character varying(40) NOT NULL,
    executed_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE storage.migrations OWNER TO supabase_storage_admin;

--
-- Name: objects; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.objects (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    bucket_id text,
    name text,
    owner uuid,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    last_accessed_at timestamp with time zone DEFAULT now(),
    metadata jsonb,
    path_tokens text[] GENERATED ALWAYS AS (string_to_array(name, '/'::text)) STORED,
    version text,
    owner_id text,
    user_metadata jsonb
);


ALTER TABLE storage.objects OWNER TO supabase_storage_admin;

--
-- Name: COLUMN objects.owner; Type: COMMENT; Schema: storage; Owner: supabase_storage_admin
--

COMMENT ON COLUMN storage.objects.owner IS 'Field is deprecated, use owner_id instead';


--
-- Name: s3_multipart_uploads; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.s3_multipart_uploads (
    id text NOT NULL,
    in_progress_size bigint DEFAULT 0 NOT NULL,
    upload_signature text NOT NULL,
    bucket_id text NOT NULL,
    key text NOT NULL COLLATE pg_catalog."C",
    version text NOT NULL,
    owner_id text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    user_metadata jsonb
);


ALTER TABLE storage.s3_multipart_uploads OWNER TO supabase_storage_admin;

--
-- Name: s3_multipart_uploads_parts; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.s3_multipart_uploads_parts (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    upload_id text NOT NULL,
    size bigint DEFAULT 0 NOT NULL,
    part_number integer NOT NULL,
    bucket_id text NOT NULL,
    key text NOT NULL COLLATE pg_catalog."C",
    etag text NOT NULL,
    owner_id text,
    version text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE storage.s3_multipart_uploads_parts OWNER TO supabase_storage_admin;

--
-- Name: hooks; Type: TABLE; Schema: supabase_functions; Owner: supabase_functions_admin
--

CREATE TABLE supabase_functions.hooks (
    id bigint NOT NULL,
    hook_table_id integer NOT NULL,
    hook_name text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    request_id bigint
);


ALTER TABLE supabase_functions.hooks OWNER TO supabase_functions_admin;

--
-- Name: TABLE hooks; Type: COMMENT; Schema: supabase_functions; Owner: supabase_functions_admin
--

COMMENT ON TABLE supabase_functions.hooks IS 'Supabase Functions Hooks: Audit trail for triggered hooks.';


--
-- Name: hooks_id_seq; Type: SEQUENCE; Schema: supabase_functions; Owner: supabase_functions_admin
--

CREATE SEQUENCE supabase_functions.hooks_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE supabase_functions.hooks_id_seq OWNER TO supabase_functions_admin;

--
-- Name: hooks_id_seq; Type: SEQUENCE OWNED BY; Schema: supabase_functions; Owner: supabase_functions_admin
--

ALTER SEQUENCE supabase_functions.hooks_id_seq OWNED BY supabase_functions.hooks.id;


--
-- Name: migrations; Type: TABLE; Schema: supabase_functions; Owner: supabase_functions_admin
--

CREATE TABLE supabase_functions.migrations (
    version text NOT NULL,
    inserted_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE supabase_functions.migrations OWNER TO supabase_functions_admin;

--
-- Name: schema_migrations; Type: TABLE; Schema: supabase_migrations; Owner: postgres
--

CREATE TABLE supabase_migrations.schema_migrations (
    version text NOT NULL,
    statements text[],
    name text
);


ALTER TABLE supabase_migrations.schema_migrations OWNER TO postgres;

--
-- Name: decrypted_secrets; Type: VIEW; Schema: vault; Owner: supabase_admin
--

CREATE VIEW vault.decrypted_secrets AS
 SELECT secrets.id,
    secrets.name,
    secrets.description,
    secrets.secret,
        CASE
            WHEN (secrets.secret IS NULL) THEN NULL::text
            ELSE
            CASE
                WHEN (secrets.key_id IS NULL) THEN NULL::text
                ELSE convert_from(pgsodium.crypto_aead_det_decrypt(decode(secrets.secret, 'base64'::text), convert_to(((((secrets.id)::text || secrets.description) || (secrets.created_at)::text) || (secrets.updated_at)::text), 'utf8'::name), secrets.key_id, secrets.nonce), 'utf8'::name)
            END
        END AS decrypted_secret,
    secrets.key_id,
    secrets.nonce,
    secrets.created_at,
    secrets.updated_at
   FROM vault.secrets;


ALTER VIEW vault.decrypted_secrets OWNER TO supabase_admin;

--
-- Name: refresh_tokens id; Type: DEFAULT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.refresh_tokens ALTER COLUMN id SET DEFAULT nextval('auth.refresh_tokens_id_seq'::regclass);


--
-- Name: messages id; Type: DEFAULT; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER TABLE ONLY realtime.messages ALTER COLUMN id SET DEFAULT nextval('realtime.messages_id_seq'::regclass);


--
-- Name: hooks id; Type: DEFAULT; Schema: supabase_functions; Owner: supabase_functions_admin
--

ALTER TABLE ONLY supabase_functions.hooks ALTER COLUMN id SET DEFAULT nextval('supabase_functions.hooks_id_seq'::regclass);


--
-- Data for Name: extensions; Type: TABLE DATA; Schema: _realtime; Owner: supabase_admin
--

COPY _realtime.extensions (id, type, settings, tenant_external_id, inserted_at, updated_at) FROM stdin;
c9c59328-9e3a-48dd-9a0a-19a4dc68c813	postgres_cdc_rls	{"region": "us-east-1", "db_host": "9I1wrSmtpkyIm45kQsM3who2KDalrXqw1CNGhKPwZvDs5O4uTuPWzEe127b8gTir", "db_name": "sWBpZNdjggEPTQVlI52Zfw==", "db_port": "+enMDFi1J/3IrrquHHwUmA==", "db_user": "uxbEq/zz8DXVD53TOI1zmw==", "slot_name": "supabase_realtime_replication_slot", "db_password": "sWBpZNdjggEPTQVlI52Zfw==", "publication": "supabase_realtime", "ssl_enforced": false, "poll_interval_ms": 100, "poll_max_changes": 100, "poll_max_record_bytes": 1048576}	realtime-dev	2024-10-14 12:12:31	2024-10-14 12:12:31
\.


--
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: _realtime; Owner: supabase_admin
--

COPY _realtime.schema_migrations (version, inserted_at) FROM stdin;
20210706140551	2024-10-11 17:08:44
20220329161857	2024-10-11 17:08:45
20220410212326	2024-10-11 17:08:45
20220506102948	2024-10-11 17:08:45
20220527210857	2024-10-11 17:08:45
20220815211129	2024-10-11 17:08:45
20220815215024	2024-10-11 17:08:45
20220818141501	2024-10-11 17:08:45
20221018173709	2024-10-11 17:08:45
20221102172703	2024-10-11 17:08:45
20221223010058	2024-10-11 17:08:45
20230110180046	2024-10-11 17:08:45
20230810220907	2024-10-11 17:08:45
20230810220924	2024-10-11 17:08:45
20231024094642	2024-10-11 17:08:45
20240306114423	2024-10-11 17:08:45
20240418082835	2024-10-11 17:08:45
20240625211759	2024-10-11 17:08:45
20240704172020	2024-10-11 17:08:45
20240902173232	2024-10-11 17:08:45
\.


--
-- Data for Name: tenants; Type: TABLE DATA; Schema: _realtime; Owner: supabase_admin
--

COPY _realtime.tenants (id, name, external_id, jwt_secret, max_concurrent_users, inserted_at, updated_at, max_events_per_second, postgres_cdc_default, max_bytes_per_second, max_channels_per_client, max_joins_per_second, suspend, jwt_jwks, notify_private_alpha) FROM stdin;
c2cfcc50-9cfb-4b7b-8e17-c5c82cea851a	realtime-dev	realtime-dev	iNjicxc4+llvc9wovDvqymwfnj9teWMlyOIbJ8Fh6j2WNU8CIJ2ZgjR6MUIKqSmeDmvpsKLsZ9jgXJmQPpwL8w==	200	2024-10-14 12:12:31	2024-10-14 12:12:31	100	postgres_cdc_rls	100000	100	100	f	{"keys": [{"k": "c3VwZXItc2VjcmV0LWp3dC10b2tlbi13aXRoLWF0LWxlYXN0LTMyLWNoYXJhY3RlcnMtbG9uZw", "kty": "oct"}]}	t
\.


--
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) FROM stdin;
\.


--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.flow_state (id, user_id, auth_code, code_challenge_method, code_challenge, provider_type, provider_access_token, provider_refresh_token, created_at, updated_at, authentication_method, auth_code_issued_at) FROM stdin;
\.


--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.identities (provider_id, user_id, identity_data, provider, last_sign_in_at, created_at, updated_at, id) FROM stdin;
\.


--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.instances (id, uuid, raw_base_config, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.mfa_amr_claims (session_id, created_at, updated_at, authentication_method, id) FROM stdin;
\.


--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.mfa_challenges (id, factor_id, created_at, verified_at, ip_address, otp_code) FROM stdin;
\.


--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.mfa_factors (id, user_id, friendly_name, factor_type, status, created_at, updated_at, secret, phone, last_challenged_at) FROM stdin;
\.


--
-- Data for Name: one_time_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.one_time_tokens (id, user_id, token_type, token_hash, relates_to, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.refresh_tokens (instance_id, id, token, user_id, revoked, created_at, updated_at, parent, session_id) FROM stdin;
\.


--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.saml_providers (id, sso_provider_id, entity_id, metadata_xml, metadata_url, attribute_mapping, created_at, updated_at, name_id_format) FROM stdin;
\.


--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.saml_relay_states (id, sso_provider_id, request_id, for_email, redirect_to, created_at, updated_at, flow_state_id) FROM stdin;
\.


--
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.schema_migrations (version) FROM stdin;
20171026211738
20171026211808
20171026211834
20180103212743
20180108183307
20180119214651
20180125194653
00
20210710035447
20210722035447
20210730183235
20210909172000
20210927181326
20211122151130
20211124214934
20211202183645
20220114185221
20220114185340
20220224000811
20220323170000
20220429102000
20220531120530
20220614074223
20220811173540
20221003041349
20221003041400
20221011041400
20221020193600
20221021073300
20221021082433
20221027105023
20221114143122
20221114143410
20221125140132
20221208132122
20221215195500
20221215195800
20221215195900
20230116124310
20230116124412
20230131181311
20230322519590
20230402418590
20230411005111
20230508135423
20230523124323
20230818113222
20230914180801
20231027141322
20231114161723
20231117164230
20240115144230
20240214120130
20240306115329
20240314092811
20240427152123
20240612123726
20240729123726
20240802193726
\.


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.sessions (id, user_id, created_at, updated_at, factor_id, aal, not_after, refreshed_at, user_agent, ip, tag) FROM stdin;
\.


--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.sso_domains (id, sso_provider_id, domain, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.sso_providers (id, resource_id, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, invited_at, confirmation_token, confirmation_sent_at, recovery_token, recovery_sent_at, email_change_token_new, email_change, email_change_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, is_super_admin, created_at, updated_at, phone, phone_confirmed_at, phone_change, phone_change_token, phone_change_sent_at, email_change_token_current, email_change_confirm_status, banned_until, reauthentication_token, reauthentication_sent_at, is_sso_user, deleted_at, is_anonymous) FROM stdin;
\.


--
-- Data for Name: key; Type: TABLE DATA; Schema: pgsodium; Owner: supabase_admin
--

COPY pgsodium.key (id, status, created, expires, key_type, key_id, key_context, name, associated_data, raw_key, raw_key_nonce, parent_key, comment, user_data) FROM stdin;
\.


--
-- Data for Name: _teachertotimetable; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._teachertotimetable (a, b) FROM stdin;
\.


--
-- Data for Name: academic_year; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.academic_year (id, school_id, template_id, ref_year, metadata, created_at, updated_at, deleted_at, user_created) FROM stdin;
043bd4c9-bb48-40f0-a54b-a7854b76c41f	637ad0fc-a224-46ba-9602-9bbd1d97e40f	5b28fb2e-4f29-4fb1-99d5-79ee13390303	2024	\N	2024-10-11 17:47:12.4155+00	\N	\N	\N
e93e5e8b-2bed-4e1d-b42e-c89195d0f136	d5a0d549-b57a-429b-8485-ff81c878932e	5b28fb2e-4f29-4fb1-99d5-79ee13390303	2024	\N	2024-10-11 17:47:12.4155+00	\N	\N	\N
\.


--
-- Data for Name: academic_year_template; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.academic_year_template (id, ref_year, name, stages, metadata, created_at, updated_at, deleted_at, user_created) FROM stdin;
5b28fb2e-4f29-4fb1-99d5-79ee13390303	2024	Modelo Padrão Quatro Etapas	[{"endDate": "2024-04-30", "startDate": "2024-02-01", "stageNumber": 1, "teachingDays": 62}, {"endDate": "2024-07-15", "startDate": "2024-05-01", "stageNumber": 2, "teachingDays": 52}, {"endDate": "2024-09-30", "startDate": "2024-07-16", "stageNumber": 3, "teachingDays": 55}, {"endDate": "2024-12-20", "startDate": "2024-10-01", "stageNumber": 4, "teachingDays": 58}]	\N	2024-10-11 17:47:12.4155+00	\N	\N	\N
\.


--
-- Data for Name: attendance; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.attendance (id, school_id, student_id, date, status, metadata, user_created, created_at, deleted_at, updated_at) FROM stdin;
\.


--
-- Data for Name: class_session; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.class_session (id, school_id, discipline_id, timetable_id, day_of_week, start_time, end_time, metadata, user_created, created_at, deleted_at, updated_at) FROM stdin;
2ea65929-85f6-4f79-8a22-a9bc09d55678	637ad0fc-a224-46ba-9602-9bbd1d97e40f	aa6ba17a-7b7c-4c8e-901b-73c3d8be3727	2c2f0490-c82e-4472-adae-9a195bf0584d	Segunda	08:00:00	09:00:00	\N	\N	2024-10-11 17:47:12.4155+00	\N	\N
c82de38f-334c-40e8-8d00-9f5ad100eac0	637ad0fc-a224-46ba-9602-9bbd1d97e40f	43a07de5-4ac2-4bbe-9780-23479b8276fc	2c2f0490-c82e-4472-adae-9a195bf0584d	Terça	09:00:00	10:00:00	\N	\N	2024-10-11 17:47:12.4155+00	\N	\N
75a01c27-7b5e-4bd7-b1ba-766142f3723e	637ad0fc-a224-46ba-9602-9bbd1d97e40f	aa6ba17a-7b7c-4c8e-901b-73c3d8be3727	9bf8aef2-3b2e-4dfa-a9e2-d7ec1596534a	Quarta	08:00:00	09:00:00	\N	\N	2024-10-11 17:47:12.4155+00	\N	\N
566b2d14-cab5-45ed-a9ab-fed150c143f9	637ad0fc-a224-46ba-9602-9bbd1d97e40f	43a07de5-4ac2-4bbe-9780-23479b8276fc	9bf8aef2-3b2e-4dfa-a9e2-d7ec1596534a	Quinta	09:00:00	10:00:00	\N	\N	2024-10-11 17:47:12.4155+00	\N	\N
3126a6d4-54bf-4e32-ab64-21d05751d4b5	d5a0d549-b57a-429b-8485-ff81c878932e	542d32ff-d5fd-4950-b379-a4fff279c74b	dee7e1e0-abae-4053-85f4-6be138064e46	Sexta	10:00:00	11:00:00	\N	\N	2024-10-11 17:47:12.4155+00	\N	\N
eb580000-607d-4299-9862-e2ba982ffb22	d5a0d549-b57a-429b-8485-ff81c878932e	220eeece-e55f-49d2-a422-55ed685d45b1	dee7e1e0-abae-4053-85f4-6be138064e46	Sábado	11:00:00	12:00:00	\N	\N	2024-10-11 17:47:12.4155+00	\N	\N
\.


--
-- Data for Name: classroom; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.classroom (id, school_id, series_id, institution_id, course_id, teacher_id, maxstudents, starttime, starttimeinterval, endtimeinterval, endtime, day_of_week, name, period, status, abbreviation, year, metadata, user_created, created_at, deleted_at, updated_at) FROM stdin;
65249faa-3312-4650-bf87-1ff23418034e	637ad0fc-a224-46ba-9602-9bbd1d97e40f	07507916-789d-415d-891a-f92a6a841c1e	fca0e415-db61-4821-98d7-98a81dd5b273	2de38176-3606-456d-b882-8d74a5716c50	ba85b5a3-5afe-47d9-afde-60db3ab440a9	30	08:00:00	08:10:00	11:50:00	12:00:00	Segunda	Turma A	Manhã	Ativo	\N	2024	{}	\N	2024-10-11 17:47:12.4155+00	\N	\N
c0f246ec-3503-4428-a19a-5499409a2404	637ad0fc-a224-46ba-9602-9bbd1d97e40f	5a1f3731-fdb6-45c7-963a-8cf679be04b2	fca0e415-db61-4821-98d7-98a81dd5b273	2de38176-3606-456d-b882-8d74a5716c50	ba85b5a3-5afe-47d9-afde-60db3ab440a9	30	08:00:00	08:10:00	11:50:00	12:00:00	Terça	Turma B	Manhã	Ativo	\N	2024	{}	\N	2024-10-11 17:47:12.4155+00	\N	\N
87ec6805-2da4-49f0-b04d-65060400c2dd	d5a0d549-b57a-429b-8485-ff81c878932e	5a1f3731-fdb6-45c7-963a-8cf679be04b2	fca0e415-db61-4821-98d7-98a81dd5b273	78d2bfb8-c0cc-459c-a1b4-714dc7c306f0	67f2e19e-a134-4938-826e-916bdcad5a1c	30	08:00:00	08:10:00	11:50:00	12:00:00	Quarta	Turma C	Tarde	Ativo	\N	2024	{}	\N	2024-10-11 17:47:12.4155+00	\N	\N
\.


--
-- Data for Name: course; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.course (id, school_id, name, status, metadata, user_created, created_at, deleted_at, updated_at) FROM stdin;
2de38176-3606-456d-b882-8d74a5716c50	637ad0fc-a224-46ba-9602-9bbd1d97e40f	Ensino Fundamental I	Ativo	\N	\N	2024-10-11 17:47:12.4155+00	\N	\N
78d2bfb8-c0cc-459c-a1b4-714dc7c306f0	d5a0d549-b57a-429b-8485-ff81c878932e	Ensino Médio	Ativo	\N	\N	2024-10-11 17:47:12.4155+00	\N	\N
\.


--
-- Data for Name: discipline; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.discipline (id, school_id, teacher_id, name, status, metadata, user_created, created_at, deleted_at, updated_at) FROM stdin;
aa6ba17a-7b7c-4c8e-901b-73c3d8be3727	637ad0fc-a224-46ba-9602-9bbd1d97e40f	ba85b5a3-5afe-47d9-afde-60db3ab440a9	Matemática	Ativo	\N	\N	2024-10-11 17:47:12.4155+00	\N	\N
43a07de5-4ac2-4bbe-9780-23479b8276fc	637ad0fc-a224-46ba-9602-9bbd1d97e40f	54aa3d80-c547-4b8d-908f-4017ab7c762d	Ciências	Ativo	\N	\N	2024-10-11 17:47:12.4155+00	\N	\N
542d32ff-d5fd-4950-b379-a4fff279c74b	d5a0d549-b57a-429b-8485-ff81c878932e	67f2e19e-a134-4938-826e-916bdcad5a1c	História	Ativo	\N	\N	2024-10-11 17:47:12.4155+00	\N	\N
220eeece-e55f-49d2-a422-55ed685d45b1	d5a0d549-b57a-429b-8485-ff81c878932e	9c91771d-a133-437f-958f-550aa938d91d	Geografia	Ativo	\N	\N	2024-10-11 17:47:12.4155+00	\N	\N
\.


--
-- Data for Name: document; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.document (id, file_name, mime_type, size, is_current_version, file_hash, upload_date, storage_path, version, compression_applied, metadata, is_deleted, created_at, updated_at, deleted_at, user_created) FROM stdin;
\.


--
-- Data for Name: enrollment; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.enrollment (id, school_id, student_id, institution_id, course_id, classroom_id, series_id, name, created_at, deleted_at, updated_at, date_enrollment, observations, status, situation, enrollmentcode) FROM stdin;
\.


--
-- Data for Name: grade; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.grade (id, school_id, student_id, discipline_id, value, date, metadata, user_created, created_at, deleted_at, updated_at) FROM stdin;
\.


--
-- Data for Name: holidays; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.holidays (id, name, holiday_date, description, weekday) FROM stdin;
fe4b6b1d-c3d9-46de-bd9b-eed339fa1341	Ano Novo	2024-01-01	Comemoração do início do novo ano	Monday   
658ad7cc-baa0-4042-bafa-351b5cdfaa27	Carnaval	2024-02-13	Dia de Carnaval	Tuesday  
6d777580-ca3e-431a-8543-a46fb9027b4e	Paixão de Cristo	2024-03-29	Sexta-feira Santa	Friday   
b9af0e79-7cfc-45ba-b23a-80226eb1174c	Tiradentes	2024-04-21	Comemoração em memória de Tiradentes	Sunday   
fee32f8e-bf00-4ec8-9241-7107e2c66a7b	Dia do Trabalhador	2024-05-01	Dia do Trabalho	Wednesday
d71bf96d-37a5-48f9-982e-0bd82f045036	Corpus Christi	2024-05-30	Dia de Corpus Christi	Thursday 
366b611f-a405-49e4-9482-beaf7d037383	Independência do Brasil	2024-09-07	Comemoração da Independência do Brasil	Saturday 
709a3203-efa7-4aa1-aa4a-262c6776ee99	Nossa Senhora Aparecida	2024-10-12	Dia de Nossa Senhora Aparecida, padroeira do Brasil	Saturday 
dde00180-b33e-4cf7-90fd-55d02f43b531	Finados	2024-11-02	Dia de Finados	Saturday 
811f9d16-aabc-4c6f-9e97-cd3f9e9279ba	Proclamação da República	2024-11-15	Comemoração da Proclamação da República do Brasil	Friday   
c873df31-024e-45f0-b83b-e7a54a077ac7	Natal	2024-12-25	Comemoração do Natal	Wednesday
\.


--
-- Data for Name: institution; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.institution (id, name, address, city, state, postalcode, phone, email, metadata, user_created, singleton, created_at, deleted_at, updated_at) FROM stdin;
fca0e415-db61-4821-98d7-98a81dd5b273	Instituição Educacional Alfa	Rua Principal, 123	Cidade Alfa	PE	12345-678 	(11) 1234-5678	alpha@eduprime.chat	\N	\N	1	2024-10-11 17:47:12.4155+00	\N	\N
\.


--
-- Data for Name: role; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.role (id, school_id, name) FROM stdin;
2137ba0e-eb65-4ef9-882a-51032ab1f1d3	637ad0fc-a224-46ba-9602-9bbd1d97e40f	Professor
bdb42af9-3ccf-431e-b1f3-af2440261cb4	637ad0fc-a224-46ba-9602-9bbd1d97e40f	Gestor
\.


--
-- Data for Name: role_permission; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.role_permission (school_id, role_id, "table", can_select, can_insert, can_update, can_delete) FROM stdin;
637ad0fc-a224-46ba-9602-9bbd1d97e40f	2137ba0e-eb65-4ef9-882a-51032ab1f1d3	student	t	f	f	f
637ad0fc-a224-46ba-9602-9bbd1d97e40f	2137ba0e-eb65-4ef9-882a-51032ab1f1d3	attendance	t	t	t	f
637ad0fc-a224-46ba-9602-9bbd1d97e40f	2137ba0e-eb65-4ef9-882a-51032ab1f1d3	grade	t	t	t	f
637ad0fc-a224-46ba-9602-9bbd1d97e40f	2137ba0e-eb65-4ef9-882a-51032ab1f1d3	classroom	t	f	f	f
637ad0fc-a224-46ba-9602-9bbd1d97e40f	2137ba0e-eb65-4ef9-882a-51032ab1f1d3	discipline	t	f	f	f
637ad0fc-a224-46ba-9602-9bbd1d97e40f	2137ba0e-eb65-4ef9-882a-51032ab1f1d3	class_session	t	f	f	f
637ad0fc-a224-46ba-9602-9bbd1d97e40f	bdb42af9-3ccf-431e-b1f3-af2440261cb4	student	t	t	t	t
637ad0fc-a224-46ba-9602-9bbd1d97e40f	bdb42af9-3ccf-431e-b1f3-af2440261cb4	teacher	t	t	t	t
637ad0fc-a224-46ba-9602-9bbd1d97e40f	bdb42af9-3ccf-431e-b1f3-af2440261cb4	classroom	t	t	t	t
637ad0fc-a224-46ba-9602-9bbd1d97e40f	bdb42af9-3ccf-431e-b1f3-af2440261cb4	discipline	t	t	t	t
637ad0fc-a224-46ba-9602-9bbd1d97e40f	bdb42af9-3ccf-431e-b1f3-af2440261cb4	course	t	t	t	t
637ad0fc-a224-46ba-9602-9bbd1d97e40f	bdb42af9-3ccf-431e-b1f3-af2440261cb4	series	t	t	t	t
637ad0fc-a224-46ba-9602-9bbd1d97e40f	bdb42af9-3ccf-431e-b1f3-af2440261cb4	timetable	t	t	t	t
637ad0fc-a224-46ba-9602-9bbd1d97e40f	bdb42af9-3ccf-431e-b1f3-af2440261cb4	class_session	t	t	t	t
637ad0fc-a224-46ba-9602-9bbd1d97e40f	bdb42af9-3ccf-431e-b1f3-af2440261cb4	attendance	t	t	t	t
637ad0fc-a224-46ba-9602-9bbd1d97e40f	bdb42af9-3ccf-431e-b1f3-af2440261cb4	grade	t	t	t	t
\.


--
-- Data for Name: school; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.school (id, name, address, city, state, postalcode, school_zone, phone, email, website, social_network, institution_id, active, abbreviation, logourl, created_at, deleted_at, updated_at, user_created) FROM stdin;
637ad0fc-a224-46ba-9602-9bbd1d97e40f	Escola Fundamental Alfa	Avenida Secundária, 456	Cidade Alfa	PE	12345-678 	Rural	(11) 8765-4321	contato@escolafundamentalalfa.edu.br	http://escolafundamentalalfa.edu.br	https://www.facebook.com/escolafundamentalalfa	fca0e415-db61-4821-98d7-98a81dd5b273	t	EFA	http://escolafundamentalalfa.edu.br/logo.png	2024-10-11 17:47:12.4155+00	\N	2024-10-11 17:47:12.4155+00	\N
d5a0d549-b57a-429b-8485-ff81c878932e	Colégio Beta	Rua Terciária, 789	Cidade Beta	RJ	98765-432 	Urbana	(21) 2345-6789	contato@colegiobeta.edu.br	http://colegiobeta.edu.br	https://www.instagram.com/colegiobeta	fca0e415-db61-4821-98d7-98a81dd5b273	t	CB	http://colegiobeta.edu.br/logo.png	2024-10-11 17:47:12.4155+00	\N	2024-10-11 17:47:12.4155+00	\N
\.


--
-- Data for Name: series; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.series (id, school_id, course_id, institution_id, timetable_id, name, course_stage, graduate, workload, school_days, metadata, user_created, created_at, deleted_at, updated_at) FROM stdin;
07507916-789d-415d-891a-f92a6a841c1e	637ad0fc-a224-46ba-9602-9bbd1d97e40f	2de38176-3606-456d-b882-8d74a5716c50	fca0e415-db61-4821-98d7-98a81dd5b273	\N	1º Ano	Etapa 1	Sim	40	Sexta	{}	\N	2024-10-11 17:47:12.4155+00	\N	\N
5a1f3731-fdb6-45c7-963a-8cf679be04b2	d5a0d549-b57a-429b-8485-ff81c878932e	78d2bfb8-c0cc-459c-a1b4-714dc7c306f0	fca0e415-db61-4821-98d7-98a81dd5b273	\N	2º Ano	Etapa 2	Sim	40	Segunda	{}	\N	2024-10-11 17:47:12.4155+00	\N	\N
\.


--
-- Data for Name: student; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.student (id, school_id, classroom_id, name, birthdate, gender, place_of_birth, postalcode, residence_zone, number_address, cpf, neighborhood, city, complement, father_name, father_email, father_cpf, father_phone, mother_name, mother_email, mother_cpf, mother_phone, rg_number, rg_state, rg_issue_date, rg_issuer, new_birth_cert_number, old_birth_cert_term, old_birth_cert_book, old_birth_cert_sheet, docstype, old_birth_cert_date_issue, old_birth_cert_state, responsibletype, series_id, email, phone, address, status, photo, metadata, user_created, created_at, deleted_at, updated_at) FROM stdin;
dedf8193-1855-4bb1-b37a-fb678577a93a	637ad0fc-a224-46ba-9602-9bbd1d97e40f	65249faa-3312-4650-bf87-1ff23418034e	Ana Silva	2005-03-10	Feminino	São Paulo	01000-000	Urbana	123	12345678901	Centro	São Paulo		Carlos Silva	carlos.silva@example.com	12345678900	(11) 91234-5678	Maria Silva	maria.silva@example.com	09876543210	(11) 98765-4321	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	Pai	07507916-789d-415d-891a-f92a6a841c1e	ana.silva@example.com	(11) 99876-5432	Rua Exemplo, 123	Ativo	\N	{}	\N	2024-10-11 17:47:12.4155+00	\N	2024-10-11 17:47:12.4155+00
0f77936e-8c8a-468d-aa62-b148c02f4f57	637ad0fc-a224-46ba-9602-9bbd1d97e40f	c0f246ec-3503-4428-a19a-5499409a2404	Bruno Souza	2004-07-22	Masculino	Rio de Janeiro	02000-000	Urbana	456	23456789012	Botafogo	Rio de Janeiro		Ricardo Souza	ricardo.souza@example.com	23456789001	(21) 91234-5678	Laura Souza	laura.souza@example.com	34567890123	(21) 98765-4321	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	Pai	5a1f3731-fdb6-45c7-963a-8cf679be04b2	bruno.souza@example.com	(21) 99876-5432	Avenida Exemplo, 456	Ativo	\N	{}	\N	2024-10-11 17:47:12.4155+00	\N	2024-10-11 17:47:12.4155+00
\.


--
-- Data for Name: teacher; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.teacher (id, school_id, name, birthdate, email, phone, address, qualifications, status, metadata, user_created, created_at, deleted_at, updated_at) FROM stdin;
ba85b5a3-5afe-47d9-afde-60db3ab440a9	637ad0fc-a224-46ba-9602-9bbd1d97e40f	Prof. João Pereira	1980-03-15	joao.pereira@example.com	1234567890	Rua das Flores, 123, Bairro Central	[{"end": "2017-12-15", "start": "2015-03-01", "course": "Mestrado em Educação Inovadora", "institution": "Universidade Nova Esperança"}, {"end": "2014-12-10", "start": "2012-01-10", "course": "Licenciatura em Matemática", "institution": "Faculdade de Ciências Exatas"}]	Ativo	\N	\N	2024-10-11 17:47:12.4155+00	\N	\N
54aa3d80-c547-4b8d-908f-4017ab7c762d	637ad0fc-a224-46ba-9602-9bbd1d97e40f	Profª. Maria Fernandes	1975-07-22	maria.fernandes@example.com	0987654321	Avenida dos Professores, 456, Bairro Novo	[{"end": "2004-06-15", "start": "2000-09-01", "course": "Doutorado em Literatura Brasileira", "institution": "Universidade dos Escritores"}, {"end": "1999-11-20", "start": "1995-02-20", "course": "Licenciatura em Letras", "institution": "Instituto Superior de Letras"}]	Ativo	\N	\N	2024-10-11 17:47:12.4155+00	\N	\N
67f2e19e-a134-4938-826e-916bdcad5a1c	d5a0d549-b57a-429b-8485-ff81c878932e	Prof. Paulo Santos	1990-11-30	paulo.santos@example.com	1122334455	Praça da Liberdade, 789, Centro	[{"end": "2022-09-03", "start": "2018-09-03", "course": "Licenciatura em História", "institution": "Universidade de História e Cultura"}, {"end": "2017-12-15", "start": "2015-01-05", "course": "Curso de Especialização em Ensino de Geografia", "institution": "Faculdade do Saber"}]	Ativo	\N	\N	2024-10-11 17:47:12.4155+00	\N	\N
9c91771d-a133-437f-958f-550aa938d91d	d5a0d549-b57a-429b-8485-ff81c878932e	Profª. Rita Oliveira	1982-05-12	rita.oliveira@example.com	5566778899	Estrada Velha, 1010, Bairro Antigo	[{"end": "2013-05-30", "start": "2010-08-01", "course": "Mestrado em Ciências Biológicas", "institution": "Instituto de Pesquisa Biológica"}, {"end": "2009-12-20", "start": "2007-03-20", "course": "Bacharelado em Biologia", "institution": "Universidade da Vida"}]	Ativo	\N	\N	2024-10-11 17:47:12.4155+00	\N	\N
\.


--
-- Data for Name: teacher_to_timetable; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.teacher_to_timetable (school_id, teacher_id, timetable_id) FROM stdin;
\.


--
-- Data for Name: timetable; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.timetable (id, school_id, classroom_id, discipline_id, name, metadata, user_created, created_at, deleted_at, updated_at) FROM stdin;
2c2f0490-c82e-4472-adae-9a195bf0584d	637ad0fc-a224-46ba-9602-9bbd1d97e40f	65249faa-3312-4650-bf87-1ff23418034e	\N	Horário da Turma A	\N	\N	2024-10-11 17:47:12.4155+00	\N	\N
9bf8aef2-3b2e-4dfa-a9e2-d7ec1596534a	637ad0fc-a224-46ba-9602-9bbd1d97e40f	c0f246ec-3503-4428-a19a-5499409a2404	\N	Horário da Turma B	\N	\N	2024-10-11 17:47:12.4155+00	\N	\N
dee7e1e0-abae-4053-85f4-6be138064e46	d5a0d549-b57a-429b-8485-ff81c878932e	87ec6805-2da4-49f0-b04d-65060400c2dd	\N	Horário da Turma C	\N	\N	2024-10-11 17:47:12.4155+00	\N	\N
\.


--
-- Data for Name: timetable_school; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.timetable_school (timetable_id, school_id, metadata, user_created, created_at, deleted_at, updated_at) FROM stdin;
2c2f0490-c82e-4472-adae-9a195bf0584d	637ad0fc-a224-46ba-9602-9bbd1d97e40f	\N	\N	2024-10-11 17:47:12.4155+00	\N	\N
9bf8aef2-3b2e-4dfa-a9e2-d7ec1596534a	637ad0fc-a224-46ba-9602-9bbd1d97e40f	\N	\N	2024-10-11 17:47:12.4155+00	\N	\N
dee7e1e0-abae-4053-85f4-6be138064e46	d5a0d549-b57a-429b-8485-ff81c878932e	\N	\N	2024-10-11 17:47:12.4155+00	\N	\N
\.


--
-- Data for Name: user_role; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_role (school_id, role_id, user_id) FROM stdin;
637ad0fc-a224-46ba-9602-9bbd1d97e40f	2137ba0e-eb65-4ef9-882a-51032ab1f1d3	2ff53f52-cdd9-4b04-80c4-02d146b653e7
637ad0fc-a224-46ba-9602-9bbd1d97e40f	bdb42af9-3ccf-431e-b1f3-af2440261cb4	905096b1-ad84-46c2-a309-29a0501470f7
\.


--
-- Data for Name: messages; Type: TABLE DATA; Schema: realtime; Owner: supabase_realtime_admin
--

COPY realtime.messages (id, topic, extension, inserted_at, updated_at) FROM stdin;
\.


--
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: realtime; Owner: supabase_admin
--

COPY realtime.schema_migrations (version, inserted_at) FROM stdin;
20211116024918	2024-10-11 17:08:46
20211116045059	2024-10-11 17:08:46
20211116050929	2024-10-11 17:08:46
20211116051442	2024-10-11 17:08:46
20211116212300	2024-10-11 17:08:46
20211116213355	2024-10-11 17:08:46
20211116213934	2024-10-11 17:08:46
20211116214523	2024-10-11 17:08:46
20211122062447	2024-10-11 17:08:46
20211124070109	2024-10-11 17:08:46
20211202204204	2024-10-11 17:08:46
20211202204605	2024-10-11 17:08:46
20211210212804	2024-10-11 17:08:46
20211228014915	2024-10-11 17:08:46
20220107221237	2024-10-11 17:08:46
20220228202821	2024-10-11 17:08:46
20220312004840	2024-10-11 17:08:46
20220603231003	2024-10-11 17:08:46
20220603232444	2024-10-11 17:08:46
20220615214548	2024-10-11 17:08:46
20220712093339	2024-10-11 17:08:46
20220908172859	2024-10-11 17:08:46
20220916233421	2024-10-11 17:08:46
20230119133233	2024-10-11 17:08:46
20230128025114	2024-10-11 17:08:46
20230128025212	2024-10-11 17:08:46
20230227211149	2024-10-11 17:08:46
20230228184745	2024-10-11 17:08:46
20230308225145	2024-10-11 17:08:46
20230328144023	2024-10-11 17:08:46
20231018144023	2024-10-11 17:08:46
20231204144023	2024-10-11 17:08:46
20231204144024	2024-10-11 17:08:46
20231204144025	2024-10-11 17:08:46
20240108234812	2024-10-11 17:08:46
20240109165339	2024-10-11 17:08:46
20240227174441	2024-10-11 17:08:46
20240311171622	2024-10-11 17:08:46
20240321100241	2024-10-11 17:08:46
20240401105812	2024-10-11 17:08:46
20240418121054	2024-10-11 17:08:46
20240523004032	2024-10-11 17:08:46
20240618124746	2024-10-11 17:08:46
20240801235015	2024-10-11 17:08:46
20240805133720	2024-10-11 17:08:46
\.


--
-- Data for Name: subscription; Type: TABLE DATA; Schema: realtime; Owner: supabase_admin
--

COPY realtime.subscription (id, subscription_id, entity, filters, claims, created_at) FROM stdin;
\.


--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.buckets (id, name, owner, created_at, updated_at, public, avif_autodetection, file_size_limit, allowed_mime_types, owner_id) FROM stdin;
\.


--
-- Data for Name: migrations; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.migrations (id, name, hash, executed_at) FROM stdin;
0	create-migrations-table	e18db593bcde2aca2a408c4d1100f6abba2195df	2024-10-11 17:08:47.681236
1	initialmigration	6ab16121fbaa08bbd11b712d05f358f9b555d777	2024-10-11 17:08:47.688349
2	storage-schema	5c7968fd083fcea04050c1b7f6253c9771b99011	2024-10-11 17:08:47.691904
3	pathtoken-column	2cb1b0004b817b29d5b0a971af16bafeede4b70d	2024-10-11 17:08:47.700098
4	add-migrations-rls	427c5b63fe1c5937495d9c635c263ee7a5905058	2024-10-11 17:08:47.722771
5	add-size-functions	79e081a1455b63666c1294a440f8ad4b1e6a7f84	2024-10-11 17:08:47.725533
6	change-column-name-in-get-size	f93f62afdf6613ee5e7e815b30d02dc990201044	2024-10-11 17:08:47.728875
7	add-rls-to-buckets	e7e7f86adbc51049f341dfe8d30256c1abca17aa	2024-10-11 17:08:47.732276
8	add-public-to-buckets	fd670db39ed65f9d08b01db09d6202503ca2bab3	2024-10-11 17:08:47.734912
9	fix-search-function	3a0af29f42e35a4d101c259ed955b67e1bee6825	2024-10-11 17:08:47.737729
10	search-files-search-function	68dc14822daad0ffac3746a502234f486182ef6e	2024-10-11 17:08:47.740961
11	add-trigger-to-auto-update-updated_at-column	7425bdb14366d1739fa8a18c83100636d74dcaa2	2024-10-11 17:08:47.745061
12	add-automatic-avif-detection-flag	8e92e1266eb29518b6a4c5313ab8f29dd0d08df9	2024-10-11 17:08:47.749512
13	add-bucket-custom-limits	cce962054138135cd9a8c4bcd531598684b25e7d	2024-10-11 17:08:47.752881
14	use-bytes-for-max-size	941c41b346f9802b411f06f30e972ad4744dad27	2024-10-11 17:08:47.755913
15	add-can-insert-object-function	934146bc38ead475f4ef4b555c524ee5d66799e5	2024-10-11 17:08:47.779771
16	add-version	76debf38d3fd07dcfc747ca49096457d95b1221b	2024-10-11 17:08:47.782908
17	drop-owner-foreign-key	f1cbb288f1b7a4c1eb8c38504b80ae2a0153d101	2024-10-11 17:08:47.785726
18	add_owner_id_column_deprecate_owner	e7a511b379110b08e2f214be852c35414749fe66	2024-10-11 17:08:47.788661
19	alter-default-value-objects-id	02e5e22a78626187e00d173dc45f58fa66a4f043	2024-10-11 17:08:47.791979
20	list-objects-with-delimiter	cd694ae708e51ba82bf012bba00caf4f3b6393b7	2024-10-11 17:08:47.794994
21	s3-multipart-uploads	8c804d4a566c40cd1e4cc5b3725a664a9303657f	2024-10-11 17:08:47.802981
22	s3-multipart-uploads-big-ints	9737dc258d2397953c9953d9b86920b8be0cdb73	2024-10-11 17:08:47.835534
23	optimize-search-function	9d7e604cddc4b56a5422dc68c9313f4a1b6f132c	2024-10-11 17:08:47.863706
24	operation-function	8312e37c2bf9e76bbe841aa5fda889206d2bf8aa	2024-10-11 17:08:47.866764
25	custom-metadata	67eb93b7e8d401cafcdc97f9ac779e71a79bfe03	2024-10-11 17:08:47.869458
\.


--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.objects (id, bucket_id, name, owner, created_at, updated_at, last_accessed_at, metadata, version, owner_id, user_metadata) FROM stdin;
\.


--
-- Data for Name: s3_multipart_uploads; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.s3_multipart_uploads (id, in_progress_size, upload_signature, bucket_id, key, version, owner_id, created_at, user_metadata) FROM stdin;
\.


--
-- Data for Name: s3_multipart_uploads_parts; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.s3_multipart_uploads_parts (id, upload_id, size, part_number, bucket_id, key, etag, owner_id, version, created_at) FROM stdin;
\.


--
-- Data for Name: hooks; Type: TABLE DATA; Schema: supabase_functions; Owner: supabase_functions_admin
--

COPY supabase_functions.hooks (id, hook_table_id, hook_name, created_at, request_id) FROM stdin;
\.


--
-- Data for Name: migrations; Type: TABLE DATA; Schema: supabase_functions; Owner: supabase_functions_admin
--

COPY supabase_functions.migrations (version, inserted_at) FROM stdin;
initial	2024-10-11 17:08:35.187763+00
20210809183423_update_grants	2024-10-11 17:08:35.187763+00
\.


--
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: supabase_migrations; Owner: postgres
--

COPY supabase_migrations.schema_migrations (version, statements, name) FROM stdin;
20240822191645	{"DEALLOCATE ALL","CREATE SCHEMA IF NOT EXISTS system","CREATE TYPE status AS ENUM (\n    'Ativo',\n    'Inativo',\n    'Graduado',\n    'Suspenso',\n    'Transferido'\n    )","CREATE TYPE situation_type AS ENUM (\n    'Pendente',\n    'Cursando',\n    'Aprovado',\n    'Aprovado pelo Conselho',\n    'Aprovado com Dependência',\n    'Reprovado',\n    'Transferido',\n    'Abandono',\n    'Falecido'\n    )","CREATE TYPE attendance_status AS ENUM (\n    'PRESENT',\n    'ABSENT',\n    'EXCUSED'\n    )","CREATE TYPE day_of_week AS ENUM (\n    'Segunda',\n    'Terça',\n    'Quarta',\n    'Quinta',\n    'Sexta',\n    'Sábado',\n    'Domingo'\n    )","CREATE TYPE period AS ENUM (\n    'Manhã',\n    'Tarde',\n    'Noite'\n    )","CREATE TYPE course_stage_type AS ENUM (\n    'Etapa 1',\n    'Etapa 2',\n    'Etapa 3',\n    'Etapa 4',\n    'Etapa 5',\n    'Etapa 6'\n)","CREATE TYPE gender_type AS ENUM (\n    'Masculino',\n    'Feminino'\n)","CREATE TYPE graduate_status AS ENUM (\n    'Sim',\n    'Não'\n)","CREATE TYPE marital_status_type AS ENUM (\n    'Solteiro',\n    'Casado',\n    'Divorciado',\n    'Viúvo',\n    'Separado',\n    'União Estável',\n    'Não Informado'\n)","CREATE TYPE responsibleType AS ENUM (\n    'Pai',\n    'Mãe',\n    'Ambos'\n)","CREATE TYPE residence_zone_type AS ENUM (\n    'Urbana',\n    'Rural'\n)","CREATE TABLE institution\n(\n    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n    name         VARCHAR(100)                               NOT NULL,\n    address      VARCHAR(255),\n    city         VARCHAR(100),\n    state        CHAR(2),\n    postalcode   CHAR(10),\n    phone        VARCHAR(15),\n    email        VARCHAR(255),\n    metadata     JSONB,\n    user_created UUID             DEFAULT auth.uid(),\n    singleton    INTEGER          DEFAULT 1                 NOT NULL UNIQUE,\n    created_at   TIMESTAMPTZ      DEFAULT CURRENT_TIMESTAMP NOT NULL,\n    deleted_at   TIMESTAMPTZ,\n    updated_at   TIMESTAMPTZ\n)","CREATE TABLE school (\n    id uuid PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),\n    name VARCHAR(100) NOT NULL,\n    address VARCHAR(255),\n    city VARCHAR(100),\n    state CHAR(2),\n    postalcode CHAR(10),\n    school_zone VARCHAR(10),\n    phone VARCHAR(15),\n    email VARCHAR(100),\n    website VARCHAR(255),\n    social_network VARCHAR(255),\n    institution_id uuid NOT NULL,\n    active boolean DEFAULT true NOT NULL,\n    abbreviation VARCHAR(255),\n    logourl VARCHAR(255),\n    created_at timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL,\n    deleted_at timestamptz,\n    updated_at timestamptz,\n    user_created UUID DEFAULT auth.uid()\n)","CREATE TABLE teacher\n(\n    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n    school_id    UUID                                       NOT NULL REFERENCES school (id) ON UPDATE CASCADE ON DELETE RESTRICT,\n    name         VARCHAR(100)                               NOT NULL,\n    birthdate DATE NOT NULL,\n    email        VARCHAR(255),\n    phone        VARCHAR(15),\n    address VARCHAR(255),\n    qualifications  jsonb,\n    status       status           DEFAULT 'Ativo',\n    metadata     JSONB,\n    user_created UUID             DEFAULT auth.uid(),\n    created_at   TIMESTAMPTZ      DEFAULT CURRENT_TIMESTAMP NOT NULL,\n    deleted_at   TIMESTAMPTZ,\n    updated_at   TIMESTAMPTZ\n)","CREATE TABLE discipline\n(\n    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n    school_id    UUID                                       NOT NULL REFERENCES school (id) ON UPDATE CASCADE ON DELETE RESTRICT,\n    teacher_id   UUID                                       NOT NULL REFERENCES teacher (id) ON UPDATE CASCADE ON DELETE RESTRICT,\n    name         VARCHAR(100)                               NOT NULL,\n    status       status           DEFAULT 'Ativo',\n    metadata     JSONB,\n    user_created UUID             DEFAULT auth.uid(),\n    created_at   TIMESTAMPTZ      DEFAULT CURRENT_TIMESTAMP NOT NULL,\n    deleted_at   TIMESTAMPTZ,\n    updated_at   TIMESTAMPTZ\n)","CREATE TABLE course\n(\n    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n    school_id    UUID                                       NOT NULL REFERENCES school (id) ON UPDATE CASCADE ON DELETE RESTRICT,\n    name         VARCHAR(100)                               NOT NULL,\n    status       status           DEFAULT 'Ativo',\n    metadata     JSONB,\n    user_created UUID             DEFAULT auth.uid(),\n    created_at   TIMESTAMPTZ      DEFAULT CURRENT_TIMESTAMP NOT NULL,\n    deleted_at   TIMESTAMPTZ,\n    updated_at   TIMESTAMPTZ\n)","CREATE TABLE classroom\n(\n    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n    school_id    UUID                                       NOT NULL REFERENCES school (id) ON UPDATE CASCADE ON DELETE RESTRICT,\n    series_id    UUID                                       NOT NULL,\n    institution_id    UUID                                       NOT NULL REFERENCES institution (id) ON UPDATE CASCADE ON DELETE RESTRICT,\n    course_id    UUID                                       NOT NULL REFERENCES course (id) ON UPDATE CASCADE ON DELETE RESTRICT,\n    teacher_id    UUID                                       NOT NULL REFERENCES teacher (id) ON UPDATE CASCADE ON DELETE RESTRICT,\n    maxStudents INTEGER NOT NULL,\n    startTime TIME NOT NULL,\n    startTimeInterval TIME NOT NULL,\n    endTimeInterval TIME NOT NULL,\n    endTime TIME NOT NULL,\n    day_of_week day_of_week NOT NULL,\n    name         VARCHAR(100)                               NOT NULL,\n    period       period           DEFAULT 'Manhã'         NOT NULL,\n    status       status           DEFAULT 'Ativo' NOT NULL,\n    abbreviation VARCHAR(100),\n    year INTEGER NOT NULL,\n    metadata     JSONB,\n    user_created UUID             DEFAULT auth.uid(),\n    created_at   TIMESTAMPTZ      DEFAULT CURRENT_TIMESTAMP NOT NULL,\n    deleted_at   TIMESTAMPTZ,\n    updated_at   TIMESTAMPTZ\n)","CREATE TABLE timetable\n(\n    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n    school_id     UUID                                       NOT NULL REFERENCES school (id) ON UPDATE CASCADE ON DELETE RESTRICT,\n    classroom_id  UUID                                       NOT NULL REFERENCES classroom (id) ON UPDATE CASCADE ON DELETE RESTRICT,\n    discipline_id UUID                                       REFERENCES discipline (id) ON UPDATE CASCADE ON DELETE SET NULL,\n    name          VARCHAR(100)                               NOT NULL,\n    metadata      JSONB,\n    user_created  UUID             DEFAULT auth.uid(),\n    created_at    TIMESTAMPTZ      DEFAULT CURRENT_TIMESTAMP NOT NULL,\n    deleted_at    TIMESTAMPTZ,\n    updated_at    TIMESTAMPTZ\n)","CREATE TABLE class_session\n(\n    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n    school_id     UUID                                       NOT NULL REFERENCES school (id) ON UPDATE CASCADE ON DELETE RESTRICT,\n    discipline_id UUID                                       NOT NULL REFERENCES discipline (id) ON UPDATE CASCADE ON DELETE RESTRICT,\n    timetable_id  UUID                                       NOT NULL REFERENCES timetable (id) ON UPDATE CASCADE ON DELETE RESTRICT,\n    day_of_week   day_of_week                                NOT NULL,\n    start_time    TIME                                       NOT NULL,\n    end_time      TIME                                       NOT NULL,\n    metadata      JSONB,\n    user_created  UUID             DEFAULT auth.uid(),\n    created_at    TIMESTAMPTZ      DEFAULT CURRENT_TIMESTAMP NOT NULL,\n    deleted_at    TIMESTAMPTZ,\n    updated_at    TIMESTAMPTZ\n\n)","CREATE TABLE series\n(\n    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n    school_id    UUID                                       NOT NULL REFERENCES school (id) ON UPDATE CASCADE ON DELETE RESTRICT,\n    course_id    UUID                                       NOT NULL REFERENCES course (id) ON UPDATE CASCADE ON DELETE RESTRICT,\n    institution_id UUID                                       REFERENCES institution (id) ON UPDATE CASCADE ON DELETE SET NULL,\n    timetable_id UUID                                       REFERENCES timetable (id) ON UPDATE CASCADE ON DELETE SET NULL,\n    name         VARCHAR(100)                               NOT NULL,\n    course_stage course_stage_type DEFAULT 'Etapa 1' NOT NULL,\n    graduate graduate_status DEFAULT 'Sim' NOT NULL,\n    workload VARCHAR(100) NOT NULL,\n    school_days VARCHAR(100) NOT NULL,\n    metadata     JSONB,\n    user_created UUID             DEFAULT auth.uid(),\n    created_at   TIMESTAMPTZ      DEFAULT CURRENT_TIMESTAMP NOT NULL,\n    deleted_at   TIMESTAMPTZ,\n    updated_at   TIMESTAMPTZ\n)","CREATE TABLE student\n(\n    id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n    school_id      UUID                                       NOT NULL REFERENCES school (id) ON UPDATE CASCADE ON DELETE RESTRICT,\n    classroom_id   UUID                                       NOT NULL REFERENCES classroom (id) ON UPDATE CASCADE ON DELETE RESTRICT,\n    name           VARCHAR(100)                               NOT NULL,\n    birthdate      DATE                                       NOT NULL,\n    gender         gender_type DEFAULT 'Masculino',\n    place_of_birth VARCHAR(100),\n    postalcode VARCHAR(100),\n    residence_zone residence_zone_type DEFAULT 'Urbana',\n    number_address VARCHAR(100),\n    cpf VARCHAR(100) NOT NULL,\n    neighborhood VARCHAR(100),\n    city VARCHAR(100),\n    complement VARCHAR(100),\n    father_name VARCHAR(100),\n    father_email VARCHAR(100),\n    father_cpf VARCHAR(100),\n    father_phone VARCHAR(100),\n    mother_name VARCHAR(100),\n    mother_email VARCHAR(100),\n    mother_cpf VARCHAR(100),\n    mother_phone VARCHAR(100),\n    rg_number VARCHAR(100),\n    rg_state CHAR(2),\n    rg_issue_date DATE,\n    rg_issuer VARCHAR (100),\n    new_birth_cert_number VARCHAR (100),\n    old_birth_cert_term VARCHAR (100),\n    old_birth_cert_book VARCHAR (100),\n    old_birth_cert_sheet VARCHAR (100),\n    docsType VARCHAR (100),\n    old_birth_cert_date_issue DATE,\n    old_birth_cert_state VARCHAR (100),\n    responsibleType responsibleType DEFAULT 'Pai',\n    series_id   UUID                                       NOT NULL REFERENCES series (id) ON UPDATE CASCADE ON DELETE RESTRICT,\n    email          VARCHAR(255),\n    phone          VARCHAR(15) NOT NULL,\n    address        VARCHAR(255),\n    status         status           DEFAULT 'Ativo',\n    photo          BYTEA,\n    metadata       JSONB,\n    user_created   UUID             DEFAULT auth.uid(),\n    created_at     TIMESTAMPTZ      DEFAULT CURRENT_TIMESTAMP NOT NULL,\n    deleted_at     TIMESTAMPTZ,\n    updated_at     TIMESTAMPTZ\n)","CREATE TABLE enrollment (\n    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n    school_id     UUID                                       NOT NULL REFERENCES school (id) ON UPDATE CASCADE ON DELETE RESTRICT,\n    student_id   UUID                                       NOT NULL REFERENCES student (id) ON UPDATE CASCADE ON DELETE RESTRICT,\n    institution_id     UUID                                       NOT NULL REFERENCES institution (id) ON UPDATE CASCADE ON DELETE RESTRICT,\n    course_id     UUID                                       NOT NULL REFERENCES course (id) ON UPDATE CASCADE ON DELETE RESTRICT,\n    classroom_id     UUID                                       NOT NULL REFERENCES classroom (id) ON UPDATE CASCADE ON DELETE RESTRICT,\n    series_id     UUID                                       NOT NULL REFERENCES series (id) ON UPDATE CASCADE ON DELETE RESTRICT,\n    name VARCHAR(100),\n    created_at     TIMESTAMPTZ      DEFAULT CURRENT_TIMESTAMP NOT NULL,\n    deleted_at     TIMESTAMPTZ,\n    updated_at     TIMESTAMPTZ,\n    date_enrollment DATE NOT NULL,\n    observations VARCHAR(200),\n    status         status           DEFAULT 'Ativo',\n    situation situation_type DEFAULT NULL,\n    enrollmentCode VARCHAR(100) UNIQUE\n)","CREATE TABLE attendance\n(\n    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n    school_id    UUID                                       NOT NULL REFERENCES school (id) ON UPDATE CASCADE ON DELETE RESTRICT,\n    student_id   UUID                                       NOT NULL REFERENCES student (id) ON UPDATE CASCADE ON DELETE RESTRICT,\n    date         TIMESTAMPTZ                                NOT NULL,\n    status       attendance_status                          NOT NULL,\n    metadata     JSONB,\n    user_created UUID             DEFAULT auth.uid(),\n    created_at   TIMESTAMPTZ      DEFAULT CURRENT_TIMESTAMP NOT NULL,\n    deleted_at   TIMESTAMPTZ,\n    updated_at   TIMESTAMPTZ\n)","CREATE TABLE grade\n(\n    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n    school_id     UUID                                       NOT NULL REFERENCES school (id) ON UPDATE CASCADE ON DELETE RESTRICT,\n    student_id    UUID                                       NOT NULL REFERENCES student (id) ON UPDATE CASCADE ON DELETE RESTRICT,\n    discipline_id UUID                                       NOT NULL REFERENCES discipline (id) ON UPDATE CASCADE ON DELETE RESTRICT,\n    value         double precision                           NOT NULL,\n    date          TIMESTAMPTZ                                NOT NULL,\n    metadata      JSONB,\n    user_created  UUID             DEFAULT auth.uid(),\n    created_at    TIMESTAMPTZ      DEFAULT CURRENT_TIMESTAMP NOT NULL,\n    deleted_at    TIMESTAMPTZ,\n    updated_at    TIMESTAMPTZ\n)","CREATE TABLE timetable_school\n(\n    timetable_id UUID                                  NOT NULL REFERENCES timetable (id) ON UPDATE CASCADE ON DELETE RESTRICT,\n    school_id    UUID                                  NOT NULL REFERENCES school (id) ON UPDATE CASCADE ON DELETE RESTRICT,\n    metadata     JSONB,\n    user_created UUID        DEFAULT auth.uid(),\n    created_at   TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,\n    deleted_at   TIMESTAMPTZ,\n    updated_at   TIMESTAMPTZ,\n    PRIMARY KEY (timetable_id, school_id)\n)","CREATE TABLE teacher_to_timetable\n(\n    school_id    UUID NOT NULL REFERENCES school (id) ON UPDATE CASCADE ON DELETE RESTRICT,\n    teacher_id   UUID NOT NULL REFERENCES teacher (id) ON UPDATE CASCADE ON DELETE CASCADE,\n    timetable_id UUID NOT NULL REFERENCES timetable (id) ON UPDATE CASCADE ON DELETE CASCADE,\n    PRIMARY KEY (school_id, teacher_id, timetable_id)\n)","CREATE TABLE role\n(\n    id        UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n    school_id UUID         NOT NULL REFERENCES school (id) ON UPDATE CASCADE ON DELETE RESTRICT,\n    name      varchar(100) NOT NULL\n)","CREATE TABLE holidays (\n    id UUID PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),\n    name VARCHAR(100) NOT NULL,\n    holiday_date DATE NOT NULL,\n    description VARCHAR(100),\n    weekday VARCHAR(10) -- Coluna para armazenar o dia da semana\n)","CREATE OR REPLACE FUNCTION set_weekday()\nRETURNS TRIGGER AS $$\nBEGIN\n    NEW.weekday := TO_CHAR(NEW.holiday_date, 'Day');\n    RETURN NEW;\nEND;\n$$ LANGUAGE plpgsql","CREATE TRIGGER trg_set_weekday\nBEFORE INSERT OR UPDATE ON holidays\nFOR EACH ROW\nEXECUTE FUNCTION set_weekday()","CREATE TABLE document (\n    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n    file_name VARCHAR(255) NOT NULL,\n    mime_type VARCHAR(255) NOT NULL,\n    size BIGINT NOT NULL,\n    is_current_version BOOLEAN DEFAULT TRUE,\n    file_hash TEXT UNIQUE,\n    upload_date timestamptz DEFAULT CURRENT_TIMESTAMP,\n    storage_path TEXT NOT NULL,\n    version INTEGER DEFAULT 1,\n    compression_applied BOOLEAN DEFAULT FALSE,\n    metadata JSONB,\n    is_deleted BOOLEAN DEFAULT FALSE,\n    created_at timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL,\n    updated_at timestamptz,\n    deleted_at timestamptz,\n    user_created UUID DEFAULT auth.uid()\n)","-- Política para permitir uploads por usuários anônimos no bucket 'ged'\nCREATE POLICY \\"allow_anon_insert\\"\nON storage.objects\nFOR INSERT\nTO anon\nWITH CHECK (\n  bucket_id = 'ged'\n)","-- Política para permitir leitura por usuários anônimos no bucket 'ged'\nCREATE POLICY \\"public_read_policy\\"\nON storage.objects\nFOR SELECT\nUSING (\n  bucket_id = 'ged'\n  AND auth.role() = 'anon'\n)","CREATE TABLE academic_year_template (\n    id uuid PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),\n    ref_year INTEGER NOT NULL, -- Ano de referência\n    name VARCHAR(100) NOT NULL UNIQUE, -- Nome do modelo de ano letivo\n    stages jsonb NOT NULL, -- JSONB para armazenar etapas do ano letivo\n    stage_count INTEGER GENERATED ALWAYS AS (jsonb_array_length(stages)) STORED, -- Número de etapas, calculado automaticamente\n    metadata jsonb, -- Metadados adicionais, se necessário\n    created_at timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL,\n    updated_at timestamptz,\n    deleted_at timestamptz,\n    user_created UUID DEFAULT auth.uid() -- Usuário que criou o registro\n)","CREATE TABLE academic_year (\n    id uuid PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),\n    school_id uuid NOT NULL, -- Chave estrangeira para a tabela school\n    template_id uuid NOT NULL, -- Chave estrangeira para a tabela academic_year_template\n    ref_year INTEGER NOT NULL, -- Ano de referência\n    metadata jsonb, -- Metadados adicionais, se necessário\n    created_at timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL,\n    updated_at timestamptz,\n    deleted_at timestamptz,\n    user_created UUID DEFAULT auth.uid() -- Usuário que criou o registro\n)","-- Melhorar campos\nCREATE TABLE _teachertotimetable (\n    a uuid NOT NULL,\n    b uuid NOT NULL\n)","CREATE TABLE role_permission\n(\n    school_id  UUID    NOT NULL REFERENCES school (id) ON UPDATE CASCADE ON DELETE RESTRICT,\n    role_id    UUID    NOT NULL REFERENCES role (id) ON UPDATE CASCADE ON DELETE RESTRICT,\n    \\"table\\"    varchar NOT NULL,\n    can_select boolean NOT NULL,\n    can_insert boolean NOT NULL,\n    can_update boolean NOT NULL,\n    can_delete boolean NOT NULL,\n    PRIMARY KEY (role_id, school_id, \\"table\\")\n)","CREATE TABLE user_role\n(\n    school_id UUID NOT NULL REFERENCES school (id) ON UPDATE CASCADE ON DELETE RESTRICT,\n    role_id   UUID NOT NULL REFERENCES role (id) ON UPDATE CASCADE ON DELETE RESTRICT,\n    user_id   UUID NOT NULL,\n    PRIMARY KEY (school_id, role_id, user_id)\n)","ALTER TABLE ONLY classroom\n    ADD CONSTRAINT classroom_seriesid_fkey FOREIGN KEY (series_id) REFERENCES series (id) ON UPDATE CASCADE ON DELETE RESTRICT","ALTER TABLE ONLY course\n    ADD CONSTRAINT course_schoolid_fkey FOREIGN KEY (school_id) REFERENCES school(id) ON UPDATE CASCADE ON DELETE RESTRICT","ALTER TABLE ONLY discipline\n    ADD CONSTRAINT discipline_teacherid_fkey FOREIGN KEY (teacher_id) REFERENCES teacher(id) ON UPDATE CASCADE ON DELETE RESTRICT","ALTER TABLE ONLY grade\n    ADD CONSTRAINT grade_disciplineid_fkey FOREIGN KEY (discipline_id) REFERENCES discipline(id) ON UPDATE CASCADE ON DELETE RESTRICT","ALTER TABLE ONLY grade\n    ADD CONSTRAINT grade_studentid_fkey FOREIGN KEY (student_id) REFERENCES student(id) ON UPDATE CASCADE ON DELETE RESTRICT","ALTER TABLE ONLY school\n    ADD CONSTRAINT school_institutionid_fkey FOREIGN KEY (institution_id) REFERENCES institution(id) ON UPDATE CASCADE ON DELETE RESTRICT","ALTER TABLE ONLY series\n    ADD CONSTRAINT series_courseid_fkey FOREIGN KEY (course_id) REFERENCES course(id) ON UPDATE CASCADE ON DELETE RESTRICT","ALTER TABLE ONLY series\n    ADD CONSTRAINT series_timetableid_fkey FOREIGN KEY (timetable_id) REFERENCES timetable(id) ON UPDATE CASCADE ON DELETE SET NULL","ALTER TABLE ONLY student\n    ADD CONSTRAINT student_classroomid_fkey FOREIGN KEY (classroom_id) REFERENCES classroom(id) ON UPDATE CASCADE ON DELETE RESTRICT","ALTER TABLE ONLY teacher\n    ADD CONSTRAINT teacher_schoolid_fkey FOREIGN KEY (school_id) REFERENCES school(id) ON UPDATE CASCADE ON DELETE RESTRICT","ALTER TABLE ONLY timetable_school\n    ADD CONSTRAINT timetableschool_schoolid_fkey FOREIGN KEY (school_id) REFERENCES school(id) ON UPDATE CASCADE ON DELETE RESTRICT","ALTER TABLE ONLY timetable_school\n    ADD CONSTRAINT timetableschool_timetableid_fkey FOREIGN KEY (timetable_id) REFERENCES timetable(id) ON UPDATE CASCADE ON DELETE RESTRICT","ALTER TABLE ONLY timetable\n    ADD CONSTRAINT timetable_classroomid_fkey FOREIGN KEY (classroom_id) REFERENCES classroom(id) ON UPDATE CASCADE ON DELETE RESTRICT","ALTER TABLE ONLY timetable\n    ADD CONSTRAINT timetable_disciplineid_fkey FOREIGN KEY (discipline_id) REFERENCES discipline(id) ON UPDATE CASCADE ON DELETE SET NULL","ALTER TABLE ONLY _teachertotimetable\n    ADD CONSTRAINT _teachertotimetable_a_fkey FOREIGN KEY (a) REFERENCES teacher(id) ON UPDATE CASCADE ON DELETE CASCADE","ALTER TABLE ONLY _teachertotimetable\n    ADD CONSTRAINT _teachertotimetable_b_fkey FOREIGN KEY (b) REFERENCES timetable(id) ON UPDATE CASCADE ON DELETE CASCADE","-- Completed on 2024-08-22 14:37:41\n\n-- ALTER TABLE \\"public\\".\\"attendance\\" ENABLE ROW LEVEL SECURITY;\n-- ALTER TABLE \\"public\\".\\"class_session\\" ENABLE ROW LEVEL SECURITY;\n-- ALTER TABLE \\"public\\".\\"classroom\\" ENABLE ROW LEVEL SECURITY;\n-- ALTER TABLE \\"public\\".\\"course\\" ENABLE ROW LEVEL SECURITY;\n-- ALTER TABLE \\"public\\".\\"discipline\\" ENABLE ROW LEVEL SECURITY;\n-- ALTER TABLE \\"public\\".\\"grade\\" ENABLE ROW LEVEL SECURITY;\n-- ALTER TABLE \\"public\\".\\"institution\\" ENABLE ROW LEVEL SECURITY; -- Excluded as requested\n-- ALTER TABLE \\"public\\".\\"school\\" ENABLE ROW LEVEL SECURITY;\n-- ALTER TABLE \\"public\\".\\"series\\" ENABLE ROW LEVEL SECURITY;\n-- ALTER TABLE \\"public\\".\\"student\\" ENABLE ROW LEVEL SECURITY;\n-- ALTER TABLE \\"public\\".\\"teacher\\" ENABLE ROW LEVEL SECURITY;\n-- ALTER TABLE \\"public\\".\\"timetable\\" ENABLE ROW LEVEL SECURITY;\n-- ALTER TABLE \\"public\\".\\"timetable_school\\" ENABLE ROW LEVEL SECURITY;\n\n\n--\n-- FUNCTION\n--\n CREATE OR REPLACE FUNCTION calculate_business_days(start_date DATE, end_date DATE)\nRETURNS INTEGER AS $$\nDECLARE\n    business_days INTEGER;\nBEGIN\n    -- Calcular dias úteis excluindo fins de semana e feriados\n    SELECT COUNT(*)\n    INTO business_days\n    FROM generate_series(start_date, end_date, INTERVAL '1 day') AS day\n    WHERE EXTRACT(ISODOW FROM day) < 6  -- Excluir sábados (6) e domingos (7)\n      AND day::DATE NOT IN (SELECT holiday_date FROM holidays); -- Excluir feriados\n\n    RETURN business_days;\nEND;\n$$ LANGUAGE plpgsql","-- Função para atualizar a coluna updated_at\nCREATE OR REPLACE FUNCTION update_updated_at_column()\n    RETURNS TRIGGER AS\n$$\nBEGIN\n    NEW.updated_at = NOW();\n    RETURN NEW;\nEND;\n$$ LANGUAGE plpgsql","-- Bloco PL/pgSQL para adicionar triggers a todas as tabelas com o campo updated_at\nDO $$\nDECLARE\n    tbl RECORD;\nBEGIN\n    FOR tbl IN\n        SELECT table_name\n        FROM information_schema.columns\n        WHERE column_name = 'updated_at' AND table_schema = 'public'\n    LOOP\n        EXECUTE format('\n            CREATE TRIGGER set_updated_at_%I\n            AFTER UPDATE ON %I\n            FOR EACH ROW\n            WHEN (OLD.* IS DISTINCT FROM NEW.*)\n            EXECUTE FUNCTION update_updated_at_column();',\n            tbl.table_name, tbl.table_name\n        );\n    END LOOP;\nEND;\n$$"}	initial_schema
20240828204710	{"CREATE ROLE student","CREATE ROLE teacher","CREATE ROLE adm","GRANT teacher TO postgres","GRANT student TO postgres","GRANT adm TO postgres","GRANT SELECT ON ALL TABLES IN SCHEMA public TO student","GRANT SELECT, INSERT, UPDATE ON ALL TABLES IN SCHEMA public TO teacher","GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO adm","CREATE OR REPLACE FUNCTION validate_role(role_name TEXT)\nRETURNS BOOLEAN AS $$\nBEGIN\n  RETURN role_name IN ('adm', 'teacher', 'student');\nEND;\n$$ LANGUAGE plpgsql"}	initial_roles
20240829205830	{"-- função para retornar header especifico\nCREATE OR REPLACE FUNCTION get_header(item text) RETURNS text\n    LANGUAGE sql\n    STABLE AS\n$$\nSELECT current_setting('request.headers', true)::jsonb ->> item;\n$$","-- Escola atual\nCREATE OR REPLACE FUNCTION current_school() RETURNS uuid AS\n$$\nSELECT get_header('xschoolid')::uuid;\n$$ LANGUAGE sql SECURITY DEFINER","-- Minhas Escolas\nCREATE OR REPLACE FUNCTION my_schools()\n    RETURNS SETOF uuid AS\n$$\nSELECT school_id\nFROM user_role\nWHERE user_id = auth.uid();\n$$ LANGUAGE sql SECURITY DEFINER","-- Permissões\n\nCREATE OR REPLACE FUNCTION can_select(p_table varchar) RETURNS boolean AS\n$$\nSELECT EXISTS (SELECT 1\n               FROM role_permission AS rp\n                        join user_role ur on ur.role_id = rp.role_id\n               WHERE ur.user_id = auth.uid()\n                 AND rp.school_id = ur.school_id\n                 AND rp.\\"table\\" = p_table\n                 AND rp.school_id = current_school()\n                 AND can_select = true);\n$$ LANGUAGE sql SECURITY DEFINER","CREATE OR REPLACE FUNCTION can_insert(p_table varchar) RETURNS boolean AS\n$$\nSELECT EXISTS (SELECT 1\n               FROM role_permission AS rp\n                        join user_role ur on ur.role_id = rp.role_id\n               WHERE ur.user_id = auth.uid()\n                 AND rp.school_id = ur.school_id\n                 AND rp.\\"table\\" = p_table\n                 AND rp.school_id = current_school()\n                 AND rp.can_insert = true);\n$$ LANGUAGE sql SECURITY DEFINER","CREATE OR REPLACE FUNCTION can_update(p_table varchar) RETURNS boolean AS\n$$\nSELECT EXISTS (SELECT 1\n               FROM role_permission AS rp\n                        join user_role ur on ur.role_id = rp.role_id\n               WHERE ur.user_id = auth.uid()\n                 AND rp.school_id = ur.school_id\n                 AND rp.\\"table\\" = p_table\n                 AND rp.school_id = current_school()\n                 AND can_update = true);\n$$ LANGUAGE sql SECURITY DEFINER","CREATE OR REPLACE FUNCTION can_delete(p_table varchar) RETURNS boolean AS\n$$\nSELECT EXISTS (SELECT 1\n               FROM role_permission AS rp\n                        join user_role ur on ur.role_id = rp.role_id\n               WHERE ur.user_id = auth.uid()\n                 AND rp.school_id = ur.school_id\n                 AND rp.\\"table\\" = p_table\n                 AND rp.school_id = current_school()\n                 AND can_delete = true);\n$$ LANGUAGE sql SECURITY DEFINER","-- -- SELECT policy\n-- CREATE POLICY course_select_policy ON course\n--     FOR SELECT USING (course.school_id = current_school() AND can_select('course'));\n--\n-- -- INSERT policy\n-- CREATE POLICY course_insert_policy ON course\n--     FOR INSERT WITH CHECK (course.school_id = current_school() AND can_insert('course'));\n--\n-- -- UPDATE policy\n-- CREATE POLICY course_update_policy ON course\n--     FOR UPDATE USING (course.school_id = current_school() AND can_update('course'))\n--     WITH CHECK (course.school_id = current_school() AND can_update('course'));\n--\n-- -- DELETE policy\n-- CREATE POLICY course_delete_policy ON course\n--     FOR DELETE USING (course.school_id = current_school() AND can_delete('course'));\n\nCREATE OR REPLACE FUNCTION setup_rls_policies(ignore_tables text[] DEFAULT '{}') RETURNS void AS\n$$\nDECLARE\n    table_record RECORD;\nBEGIN\n    FOR table_record IN\n        SELECT table_name\n        FROM information_schema.tables\n        WHERE table_schema = 'public'\n          AND table_type = 'BASE TABLE'\n          AND table_name NOT IN (SELECT unnest(ignore_tables))\n        LOOP\n            -- Check if the table has a school_id column\n            IF EXISTS (SELECT 1\n                       FROM information_schema.columns\n                       WHERE table_schema = 'public'\n                         AND table_name = table_record.table_name\n                         AND column_name = 'school_id') THEN\n                -- Enable RLS on the table\n                EXECUTE format('ALTER TABLE %I ENABLE ROW LEVEL SECURITY', table_record.table_name);\n\n                -- Create SELECT policy\n                EXECUTE format('\n                CREATE POLICY %I_select_policy ON %I\n                FOR SELECT\n                USING (\n                    %I.school_id = current_school()\n                    AND can_select(%L)\n                )', table_record.table_name, table_record.table_name, table_record.table_name, table_record.table_name);\n\n                -- Create INSERT policy\n                EXECUTE format('\n                CREATE POLICY %I_insert_policy ON %I\n                FOR INSERT\n                WITH CHECK (\n                    %I.school_id = current_school()\n                    AND can_insert(%L)\n                )', table_record.table_name, table_record.table_name, table_record.table_name, table_record.table_name);\n\n                -- Create UPDATE policy\n                EXECUTE format('\n                CREATE POLICY %I_update_policy ON %I\n                FOR UPDATE\n                USING (\n                    %I.school_id = current_school()\n                    AND can_update(%L)\n                )\n                WITH CHECK (\n                    %I.school_id = current_school()\n                    AND can_update(%L)\n                )', table_record.table_name, table_record.table_name, table_record.table_name, table_record.table_name,\n                               table_record.table_name, table_record.table_name);\n\n                -- Create DELETE policy\n                EXECUTE format('\n                CREATE POLICY %I_delete_policy ON %I\n                FOR DELETE\n                USING (\n                    %I.school_id = current_school()\n                    AND can_delete(%L)\n                )', table_record.table_name, table_record.table_name, table_record.table_name, table_record.table_name);\n\n                RAISE NOTICE 'Created policies for table: %', table_record.table_name;\n            ELSE\n                RAISE NOTICE 'Skipping table % (no school_id column)', table_record.table_name;\n            END IF;\n        END LOOP;\nEND;\n$$ LANGUAGE plpgsql","-- passar no parametro as tabelas para ignorar e não criar rls\nSELECT setup_rls_policies(ARRAY ['institution','school'])","-- SELECT policy\nCREATE POLICY school_select_policy\n    ON school\n    FOR SELECT\n    USING (school.id IN (SELECT my_schools()))","-- INSERT policy\nCREATE POLICY school_insert_policy ON school\n    FOR INSERT WITH CHECK (school.id = current_school() AND can_insert('school'))","-- UPDATE policy\nCREATE POLICY school_update_policy ON school\n    FOR UPDATE USING (school.id = current_school() AND can_update('school'))\n    WITH CHECK (school.id = current_school() AND can_update('school'))","-- DELETE policy\nCREATE POLICY school_delete_policy ON school\n    FOR DELETE USING (school.id = current_school() AND can_delete('school'))","-- Habilitando acesso publico à institution\ncreate policy \\"Enable read access for all users\\"\n    on \\"public\\".\\"institution\\"\n    as PERMISSIVE for SELECT to public using (true)"}	create_permissions
\.


--
-- Data for Name: secrets; Type: TABLE DATA; Schema: vault; Owner: supabase_admin
--

COPY vault.secrets (id, name, description, secret, key_id, nonce, created_at, updated_at) FROM stdin;
\.


--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval('auth.refresh_tokens_id_seq', 1, false);


--
-- Name: key_key_id_seq; Type: SEQUENCE SET; Schema: pgsodium; Owner: supabase_admin
--

SELECT pg_catalog.setval('pgsodium.key_key_id_seq', 1, false);


--
-- Name: messages_id_seq; Type: SEQUENCE SET; Schema: realtime; Owner: supabase_realtime_admin
--

SELECT pg_catalog.setval('realtime.messages_id_seq', 1, false);


--
-- Name: subscription_id_seq; Type: SEQUENCE SET; Schema: realtime; Owner: supabase_admin
--

SELECT pg_catalog.setval('realtime.subscription_id_seq', 1, false);


--
-- Name: hooks_id_seq; Type: SEQUENCE SET; Schema: supabase_functions; Owner: supabase_functions_admin
--

SELECT pg_catalog.setval('supabase_functions.hooks_id_seq', 1, false);


--
-- Name: extensions extensions_pkey; Type: CONSTRAINT; Schema: _realtime; Owner: supabase_admin
--

ALTER TABLE ONLY _realtime.extensions
    ADD CONSTRAINT extensions_pkey PRIMARY KEY (id);


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: _realtime; Owner: supabase_admin
--

ALTER TABLE ONLY _realtime.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- Name: tenants tenants_pkey; Type: CONSTRAINT; Schema: _realtime; Owner: supabase_admin
--

ALTER TABLE ONLY _realtime.tenants
    ADD CONSTRAINT tenants_pkey PRIMARY KEY (id);


--
-- Name: mfa_amr_claims amr_id_pk; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_amr_claims
    ADD CONSTRAINT amr_id_pk PRIMARY KEY (id);


--
-- Name: audit_log_entries audit_log_entries_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.audit_log_entries
    ADD CONSTRAINT audit_log_entries_pkey PRIMARY KEY (id);


--
-- Name: flow_state flow_state_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.flow_state
    ADD CONSTRAINT flow_state_pkey PRIMARY KEY (id);


--
-- Name: identities identities_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.identities
    ADD CONSTRAINT identities_pkey PRIMARY KEY (id);


--
-- Name: identities identities_provider_id_provider_unique; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.identities
    ADD CONSTRAINT identities_provider_id_provider_unique UNIQUE (provider_id, provider);


--
-- Name: instances instances_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.instances
    ADD CONSTRAINT instances_pkey PRIMARY KEY (id);


--
-- Name: mfa_amr_claims mfa_amr_claims_session_id_authentication_method_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_amr_claims
    ADD CONSTRAINT mfa_amr_claims_session_id_authentication_method_pkey UNIQUE (session_id, authentication_method);


--
-- Name: mfa_challenges mfa_challenges_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_challenges
    ADD CONSTRAINT mfa_challenges_pkey PRIMARY KEY (id);


--
-- Name: mfa_factors mfa_factors_last_challenged_at_key; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_factors
    ADD CONSTRAINT mfa_factors_last_challenged_at_key UNIQUE (last_challenged_at);


--
-- Name: mfa_factors mfa_factors_phone_key; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_factors
    ADD CONSTRAINT mfa_factors_phone_key UNIQUE (phone);


--
-- Name: mfa_factors mfa_factors_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_factors
    ADD CONSTRAINT mfa_factors_pkey PRIMARY KEY (id);


--
-- Name: one_time_tokens one_time_tokens_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.one_time_tokens
    ADD CONSTRAINT one_time_tokens_pkey PRIMARY KEY (id);


--
-- Name: refresh_tokens refresh_tokens_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.refresh_tokens
    ADD CONSTRAINT refresh_tokens_pkey PRIMARY KEY (id);


--
-- Name: refresh_tokens refresh_tokens_token_unique; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.refresh_tokens
    ADD CONSTRAINT refresh_tokens_token_unique UNIQUE (token);


--
-- Name: saml_providers saml_providers_entity_id_key; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_providers
    ADD CONSTRAINT saml_providers_entity_id_key UNIQUE (entity_id);


--
-- Name: saml_providers saml_providers_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_providers
    ADD CONSTRAINT saml_providers_pkey PRIMARY KEY (id);


--
-- Name: saml_relay_states saml_relay_states_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_relay_states
    ADD CONSTRAINT saml_relay_states_pkey PRIMARY KEY (id);


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: sso_domains sso_domains_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.sso_domains
    ADD CONSTRAINT sso_domains_pkey PRIMARY KEY (id);


--
-- Name: sso_providers sso_providers_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.sso_providers
    ADD CONSTRAINT sso_providers_pkey PRIMARY KEY (id);


--
-- Name: users users_phone_key; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.users
    ADD CONSTRAINT users_phone_key UNIQUE (phone);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: academic_year academic_year_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.academic_year
    ADD CONSTRAINT academic_year_pkey PRIMARY KEY (id);


--
-- Name: academic_year_template academic_year_template_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.academic_year_template
    ADD CONSTRAINT academic_year_template_name_key UNIQUE (name);


--
-- Name: academic_year_template academic_year_template_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.academic_year_template
    ADD CONSTRAINT academic_year_template_pkey PRIMARY KEY (id);


--
-- Name: attendance attendance_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.attendance
    ADD CONSTRAINT attendance_pkey PRIMARY KEY (id);


--
-- Name: class_session class_session_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.class_session
    ADD CONSTRAINT class_session_pkey PRIMARY KEY (id);


--
-- Name: classroom classroom_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.classroom
    ADD CONSTRAINT classroom_pkey PRIMARY KEY (id);


--
-- Name: course course_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.course
    ADD CONSTRAINT course_pkey PRIMARY KEY (id);


--
-- Name: discipline discipline_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.discipline
    ADD CONSTRAINT discipline_pkey PRIMARY KEY (id);


--
-- Name: document document_file_hash_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.document
    ADD CONSTRAINT document_file_hash_key UNIQUE (file_hash);


--
-- Name: document document_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.document
    ADD CONSTRAINT document_pkey PRIMARY KEY (id);


--
-- Name: enrollment enrollment_enrollmentcode_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.enrollment
    ADD CONSTRAINT enrollment_enrollmentcode_key UNIQUE (enrollmentcode);


--
-- Name: enrollment enrollment_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.enrollment
    ADD CONSTRAINT enrollment_pkey PRIMARY KEY (id);


--
-- Name: grade grade_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.grade
    ADD CONSTRAINT grade_pkey PRIMARY KEY (id);


--
-- Name: holidays holidays_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.holidays
    ADD CONSTRAINT holidays_pkey PRIMARY KEY (id);


--
-- Name: institution institution_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.institution
    ADD CONSTRAINT institution_pkey PRIMARY KEY (id);


--
-- Name: institution institution_singleton_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.institution
    ADD CONSTRAINT institution_singleton_key UNIQUE (singleton);


--
-- Name: role_permission role_permission_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role_permission
    ADD CONSTRAINT role_permission_pkey PRIMARY KEY (school_id, role_id, "table");


--
-- Name: role role_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role
    ADD CONSTRAINT role_pkey PRIMARY KEY (id);


--
-- Name: school school_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.school
    ADD CONSTRAINT school_pkey PRIMARY KEY (id);


--
-- Name: series series_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.series
    ADD CONSTRAINT series_pkey PRIMARY KEY (id);


--
-- Name: student student_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.student
    ADD CONSTRAINT student_pkey PRIMARY KEY (id);


--
-- Name: teacher teacher_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.teacher
    ADD CONSTRAINT teacher_pkey PRIMARY KEY (id);


--
-- Name: teacher_to_timetable teacher_to_timetable_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.teacher_to_timetable
    ADD CONSTRAINT teacher_to_timetable_pkey PRIMARY KEY (school_id, teacher_id, timetable_id);


--
-- Name: timetable timetable_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.timetable
    ADD CONSTRAINT timetable_pkey PRIMARY KEY (id);


--
-- Name: timetable_school timetable_school_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.timetable_school
    ADD CONSTRAINT timetable_school_pkey PRIMARY KEY (timetable_id, school_id);


--
-- Name: user_role user_role_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_role
    ADD CONSTRAINT user_role_pkey PRIMARY KEY (school_id, role_id, user_id);


--
-- Name: messages messages_pkey; Type: CONSTRAINT; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER TABLE ONLY realtime.messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (id);


--
-- Name: subscription pk_subscription; Type: CONSTRAINT; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.subscription
    ADD CONSTRAINT pk_subscription PRIMARY KEY (id);


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- Name: buckets buckets_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.buckets
    ADD CONSTRAINT buckets_pkey PRIMARY KEY (id);


--
-- Name: migrations migrations_name_key; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.migrations
    ADD CONSTRAINT migrations_name_key UNIQUE (name);


--
-- Name: migrations migrations_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.migrations
    ADD CONSTRAINT migrations_pkey PRIMARY KEY (id);


--
-- Name: objects objects_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.objects
    ADD CONSTRAINT objects_pkey PRIMARY KEY (id);


--
-- Name: s3_multipart_uploads_parts s3_multipart_uploads_parts_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.s3_multipart_uploads_parts
    ADD CONSTRAINT s3_multipart_uploads_parts_pkey PRIMARY KEY (id);


--
-- Name: s3_multipart_uploads s3_multipart_uploads_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.s3_multipart_uploads
    ADD CONSTRAINT s3_multipart_uploads_pkey PRIMARY KEY (id);


--
-- Name: hooks hooks_pkey; Type: CONSTRAINT; Schema: supabase_functions; Owner: supabase_functions_admin
--

ALTER TABLE ONLY supabase_functions.hooks
    ADD CONSTRAINT hooks_pkey PRIMARY KEY (id);


--
-- Name: migrations migrations_pkey; Type: CONSTRAINT; Schema: supabase_functions; Owner: supabase_functions_admin
--

ALTER TABLE ONLY supabase_functions.migrations
    ADD CONSTRAINT migrations_pkey PRIMARY KEY (version);


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: supabase_migrations; Owner: postgres
--

ALTER TABLE ONLY supabase_migrations.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- Name: extensions_tenant_external_id_index; Type: INDEX; Schema: _realtime; Owner: supabase_admin
--

CREATE INDEX extensions_tenant_external_id_index ON _realtime.extensions USING btree (tenant_external_id);


--
-- Name: extensions_tenant_external_id_type_index; Type: INDEX; Schema: _realtime; Owner: supabase_admin
--

CREATE UNIQUE INDEX extensions_tenant_external_id_type_index ON _realtime.extensions USING btree (tenant_external_id, type);


--
-- Name: tenants_external_id_index; Type: INDEX; Schema: _realtime; Owner: supabase_admin
--

CREATE UNIQUE INDEX tenants_external_id_index ON _realtime.tenants USING btree (external_id);


--
-- Name: audit_logs_instance_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX audit_logs_instance_id_idx ON auth.audit_log_entries USING btree (instance_id);


--
-- Name: confirmation_token_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX confirmation_token_idx ON auth.users USING btree (confirmation_token) WHERE ((confirmation_token)::text !~ '^[0-9 ]*$'::text);


--
-- Name: email_change_token_current_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX email_change_token_current_idx ON auth.users USING btree (email_change_token_current) WHERE ((email_change_token_current)::text !~ '^[0-9 ]*$'::text);


--
-- Name: email_change_token_new_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX email_change_token_new_idx ON auth.users USING btree (email_change_token_new) WHERE ((email_change_token_new)::text !~ '^[0-9 ]*$'::text);


--
-- Name: factor_id_created_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX factor_id_created_at_idx ON auth.mfa_factors USING btree (user_id, created_at);


--
-- Name: flow_state_created_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX flow_state_created_at_idx ON auth.flow_state USING btree (created_at DESC);


--
-- Name: identities_email_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX identities_email_idx ON auth.identities USING btree (email text_pattern_ops);


--
-- Name: INDEX identities_email_idx; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON INDEX auth.identities_email_idx IS 'Auth: Ensures indexed queries on the email column';


--
-- Name: identities_user_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX identities_user_id_idx ON auth.identities USING btree (user_id);


--
-- Name: idx_auth_code; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX idx_auth_code ON auth.flow_state USING btree (auth_code);


--
-- Name: idx_user_id_auth_method; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX idx_user_id_auth_method ON auth.flow_state USING btree (user_id, authentication_method);


--
-- Name: mfa_challenge_created_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX mfa_challenge_created_at_idx ON auth.mfa_challenges USING btree (created_at DESC);


--
-- Name: mfa_factors_user_friendly_name_unique; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX mfa_factors_user_friendly_name_unique ON auth.mfa_factors USING btree (friendly_name, user_id) WHERE (TRIM(BOTH FROM friendly_name) <> ''::text);


--
-- Name: mfa_factors_user_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX mfa_factors_user_id_idx ON auth.mfa_factors USING btree (user_id);


--
-- Name: one_time_tokens_relates_to_hash_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX one_time_tokens_relates_to_hash_idx ON auth.one_time_tokens USING hash (relates_to);


--
-- Name: one_time_tokens_token_hash_hash_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX one_time_tokens_token_hash_hash_idx ON auth.one_time_tokens USING hash (token_hash);


--
-- Name: one_time_tokens_user_id_token_type_key; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX one_time_tokens_user_id_token_type_key ON auth.one_time_tokens USING btree (user_id, token_type);


--
-- Name: reauthentication_token_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX reauthentication_token_idx ON auth.users USING btree (reauthentication_token) WHERE ((reauthentication_token)::text !~ '^[0-9 ]*$'::text);


--
-- Name: recovery_token_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX recovery_token_idx ON auth.users USING btree (recovery_token) WHERE ((recovery_token)::text !~ '^[0-9 ]*$'::text);


--
-- Name: refresh_tokens_instance_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX refresh_tokens_instance_id_idx ON auth.refresh_tokens USING btree (instance_id);


--
-- Name: refresh_tokens_instance_id_user_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX refresh_tokens_instance_id_user_id_idx ON auth.refresh_tokens USING btree (instance_id, user_id);


--
-- Name: refresh_tokens_parent_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX refresh_tokens_parent_idx ON auth.refresh_tokens USING btree (parent);


--
-- Name: refresh_tokens_session_id_revoked_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX refresh_tokens_session_id_revoked_idx ON auth.refresh_tokens USING btree (session_id, revoked);


--
-- Name: refresh_tokens_updated_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX refresh_tokens_updated_at_idx ON auth.refresh_tokens USING btree (updated_at DESC);


--
-- Name: saml_providers_sso_provider_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX saml_providers_sso_provider_id_idx ON auth.saml_providers USING btree (sso_provider_id);


--
-- Name: saml_relay_states_created_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX saml_relay_states_created_at_idx ON auth.saml_relay_states USING btree (created_at DESC);


--
-- Name: saml_relay_states_for_email_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX saml_relay_states_for_email_idx ON auth.saml_relay_states USING btree (for_email);


--
-- Name: saml_relay_states_sso_provider_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX saml_relay_states_sso_provider_id_idx ON auth.saml_relay_states USING btree (sso_provider_id);


--
-- Name: sessions_not_after_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX sessions_not_after_idx ON auth.sessions USING btree (not_after DESC);


--
-- Name: sessions_user_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX sessions_user_id_idx ON auth.sessions USING btree (user_id);


--
-- Name: sso_domains_domain_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX sso_domains_domain_idx ON auth.sso_domains USING btree (lower(domain));


--
-- Name: sso_domains_sso_provider_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX sso_domains_sso_provider_id_idx ON auth.sso_domains USING btree (sso_provider_id);


--
-- Name: sso_providers_resource_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX sso_providers_resource_id_idx ON auth.sso_providers USING btree (lower(resource_id));


--
-- Name: unique_verified_phone_factor; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX unique_verified_phone_factor ON auth.mfa_factors USING btree (user_id, phone);


--
-- Name: user_id_created_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX user_id_created_at_idx ON auth.sessions USING btree (user_id, created_at);


--
-- Name: users_email_partial_key; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX users_email_partial_key ON auth.users USING btree (email) WHERE (is_sso_user = false);


--
-- Name: INDEX users_email_partial_key; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON INDEX auth.users_email_partial_key IS 'Auth: A partial unique index that applies only when is_sso_user is false';


--
-- Name: users_instance_id_email_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX users_instance_id_email_idx ON auth.users USING btree (instance_id, lower((email)::text));


--
-- Name: users_instance_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX users_instance_id_idx ON auth.users USING btree (instance_id);


--
-- Name: users_is_anonymous_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX users_is_anonymous_idx ON auth.users USING btree (is_anonymous);


--
-- Name: ix_realtime_subscription_entity; Type: INDEX; Schema: realtime; Owner: supabase_admin
--

CREATE INDEX ix_realtime_subscription_entity ON realtime.subscription USING hash (entity);


--
-- Name: messages_topic_index; Type: INDEX; Schema: realtime; Owner: supabase_realtime_admin
--

CREATE INDEX messages_topic_index ON realtime.messages USING btree (topic);


--
-- Name: subscription_subscription_id_entity_filters_key; Type: INDEX; Schema: realtime; Owner: supabase_admin
--

CREATE UNIQUE INDEX subscription_subscription_id_entity_filters_key ON realtime.subscription USING btree (subscription_id, entity, filters);


--
-- Name: bname; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE UNIQUE INDEX bname ON storage.buckets USING btree (name);


--
-- Name: bucketid_objname; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE UNIQUE INDEX bucketid_objname ON storage.objects USING btree (bucket_id, name);


--
-- Name: idx_multipart_uploads_list; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE INDEX idx_multipart_uploads_list ON storage.s3_multipart_uploads USING btree (bucket_id, key, created_at);


--
-- Name: idx_objects_bucket_id_name; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE INDEX idx_objects_bucket_id_name ON storage.objects USING btree (bucket_id, name COLLATE "C");


--
-- Name: name_prefix_search; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE INDEX name_prefix_search ON storage.objects USING btree (name text_pattern_ops);


--
-- Name: supabase_functions_hooks_h_table_id_h_name_idx; Type: INDEX; Schema: supabase_functions; Owner: supabase_functions_admin
--

CREATE INDEX supabase_functions_hooks_h_table_id_h_name_idx ON supabase_functions.hooks USING btree (hook_table_id, hook_name);


--
-- Name: supabase_functions_hooks_request_id_idx; Type: INDEX; Schema: supabase_functions; Owner: supabase_functions_admin
--

CREATE INDEX supabase_functions_hooks_request_id_idx ON supabase_functions.hooks USING btree (request_id);


--
-- Name: academic_year set_updated_at_academic_year; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER set_updated_at_academic_year AFTER UPDATE ON public.academic_year FOR EACH ROW WHEN ((old.* IS DISTINCT FROM new.*)) EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: academic_year_template set_updated_at_academic_year_template; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER set_updated_at_academic_year_template AFTER UPDATE ON public.academic_year_template FOR EACH ROW WHEN ((old.* IS DISTINCT FROM new.*)) EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: attendance set_updated_at_attendance; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER set_updated_at_attendance AFTER UPDATE ON public.attendance FOR EACH ROW WHEN ((old.* IS DISTINCT FROM new.*)) EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: class_session set_updated_at_class_session; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER set_updated_at_class_session AFTER UPDATE ON public.class_session FOR EACH ROW WHEN ((old.* IS DISTINCT FROM new.*)) EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: classroom set_updated_at_classroom; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER set_updated_at_classroom AFTER UPDATE ON public.classroom FOR EACH ROW WHEN ((old.* IS DISTINCT FROM new.*)) EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: course set_updated_at_course; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER set_updated_at_course AFTER UPDATE ON public.course FOR EACH ROW WHEN ((old.* IS DISTINCT FROM new.*)) EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: discipline set_updated_at_discipline; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER set_updated_at_discipline AFTER UPDATE ON public.discipline FOR EACH ROW WHEN ((old.* IS DISTINCT FROM new.*)) EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: document set_updated_at_document; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER set_updated_at_document AFTER UPDATE ON public.document FOR EACH ROW WHEN ((old.* IS DISTINCT FROM new.*)) EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: enrollment set_updated_at_enrollment; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER set_updated_at_enrollment AFTER UPDATE ON public.enrollment FOR EACH ROW WHEN ((old.* IS DISTINCT FROM new.*)) EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: grade set_updated_at_grade; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER set_updated_at_grade AFTER UPDATE ON public.grade FOR EACH ROW WHEN ((old.* IS DISTINCT FROM new.*)) EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: institution set_updated_at_institution; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER set_updated_at_institution AFTER UPDATE ON public.institution FOR EACH ROW WHEN ((old.* IS DISTINCT FROM new.*)) EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: school set_updated_at_school; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER set_updated_at_school AFTER UPDATE ON public.school FOR EACH ROW WHEN ((old.* IS DISTINCT FROM new.*)) EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: series set_updated_at_series; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER set_updated_at_series AFTER UPDATE ON public.series FOR EACH ROW WHEN ((old.* IS DISTINCT FROM new.*)) EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: student set_updated_at_student; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER set_updated_at_student AFTER UPDATE ON public.student FOR EACH ROW WHEN ((old.* IS DISTINCT FROM new.*)) EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: teacher set_updated_at_teacher; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER set_updated_at_teacher AFTER UPDATE ON public.teacher FOR EACH ROW WHEN ((old.* IS DISTINCT FROM new.*)) EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: timetable set_updated_at_timetable; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER set_updated_at_timetable AFTER UPDATE ON public.timetable FOR EACH ROW WHEN ((old.* IS DISTINCT FROM new.*)) EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: timetable_school set_updated_at_timetable_school; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER set_updated_at_timetable_school AFTER UPDATE ON public.timetable_school FOR EACH ROW WHEN ((old.* IS DISTINCT FROM new.*)) EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: holidays trg_set_weekday; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER trg_set_weekday BEFORE INSERT OR UPDATE ON public.holidays FOR EACH ROW EXECUTE FUNCTION public.set_weekday();


--
-- Name: subscription tr_check_filters; Type: TRIGGER; Schema: realtime; Owner: supabase_admin
--

CREATE TRIGGER tr_check_filters BEFORE INSERT OR UPDATE ON realtime.subscription FOR EACH ROW EXECUTE FUNCTION realtime.subscription_check_filters();


--
-- Name: objects update_objects_updated_at; Type: TRIGGER; Schema: storage; Owner: supabase_storage_admin
--

CREATE TRIGGER update_objects_updated_at BEFORE UPDATE ON storage.objects FOR EACH ROW EXECUTE FUNCTION storage.update_updated_at_column();


--
-- Name: extensions extensions_tenant_external_id_fkey; Type: FK CONSTRAINT; Schema: _realtime; Owner: supabase_admin
--

ALTER TABLE ONLY _realtime.extensions
    ADD CONSTRAINT extensions_tenant_external_id_fkey FOREIGN KEY (tenant_external_id) REFERENCES _realtime.tenants(external_id) ON DELETE CASCADE;


--
-- Name: identities identities_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.identities
    ADD CONSTRAINT identities_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: mfa_amr_claims mfa_amr_claims_session_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_amr_claims
    ADD CONSTRAINT mfa_amr_claims_session_id_fkey FOREIGN KEY (session_id) REFERENCES auth.sessions(id) ON DELETE CASCADE;


--
-- Name: mfa_challenges mfa_challenges_auth_factor_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_challenges
    ADD CONSTRAINT mfa_challenges_auth_factor_id_fkey FOREIGN KEY (factor_id) REFERENCES auth.mfa_factors(id) ON DELETE CASCADE;


--
-- Name: mfa_factors mfa_factors_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_factors
    ADD CONSTRAINT mfa_factors_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: one_time_tokens one_time_tokens_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.one_time_tokens
    ADD CONSTRAINT one_time_tokens_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: refresh_tokens refresh_tokens_session_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.refresh_tokens
    ADD CONSTRAINT refresh_tokens_session_id_fkey FOREIGN KEY (session_id) REFERENCES auth.sessions(id) ON DELETE CASCADE;


--
-- Name: saml_providers saml_providers_sso_provider_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_providers
    ADD CONSTRAINT saml_providers_sso_provider_id_fkey FOREIGN KEY (sso_provider_id) REFERENCES auth.sso_providers(id) ON DELETE CASCADE;


--
-- Name: saml_relay_states saml_relay_states_flow_state_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_relay_states
    ADD CONSTRAINT saml_relay_states_flow_state_id_fkey FOREIGN KEY (flow_state_id) REFERENCES auth.flow_state(id) ON DELETE CASCADE;


--
-- Name: saml_relay_states saml_relay_states_sso_provider_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_relay_states
    ADD CONSTRAINT saml_relay_states_sso_provider_id_fkey FOREIGN KEY (sso_provider_id) REFERENCES auth.sso_providers(id) ON DELETE CASCADE;


--
-- Name: sessions sessions_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.sessions
    ADD CONSTRAINT sessions_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: sso_domains sso_domains_sso_provider_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.sso_domains
    ADD CONSTRAINT sso_domains_sso_provider_id_fkey FOREIGN KEY (sso_provider_id) REFERENCES auth.sso_providers(id) ON DELETE CASCADE;


--
-- Name: _teachertotimetable _teachertotimetable_a_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._teachertotimetable
    ADD CONSTRAINT _teachertotimetable_a_fkey FOREIGN KEY (a) REFERENCES public.teacher(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _teachertotimetable _teachertotimetable_b_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._teachertotimetable
    ADD CONSTRAINT _teachertotimetable_b_fkey FOREIGN KEY (b) REFERENCES public.timetable(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: attendance attendance_school_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.attendance
    ADD CONSTRAINT attendance_school_id_fkey FOREIGN KEY (school_id) REFERENCES public.school(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: attendance attendance_student_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.attendance
    ADD CONSTRAINT attendance_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.student(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: class_session class_session_discipline_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.class_session
    ADD CONSTRAINT class_session_discipline_id_fkey FOREIGN KEY (discipline_id) REFERENCES public.discipline(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: class_session class_session_school_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.class_session
    ADD CONSTRAINT class_session_school_id_fkey FOREIGN KEY (school_id) REFERENCES public.school(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: class_session class_session_timetable_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.class_session
    ADD CONSTRAINT class_session_timetable_id_fkey FOREIGN KEY (timetable_id) REFERENCES public.timetable(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: classroom classroom_course_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.classroom
    ADD CONSTRAINT classroom_course_id_fkey FOREIGN KEY (course_id) REFERENCES public.course(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: classroom classroom_institution_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.classroom
    ADD CONSTRAINT classroom_institution_id_fkey FOREIGN KEY (institution_id) REFERENCES public.institution(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: classroom classroom_school_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.classroom
    ADD CONSTRAINT classroom_school_id_fkey FOREIGN KEY (school_id) REFERENCES public.school(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: classroom classroom_seriesid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.classroom
    ADD CONSTRAINT classroom_seriesid_fkey FOREIGN KEY (series_id) REFERENCES public.series(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: classroom classroom_teacher_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.classroom
    ADD CONSTRAINT classroom_teacher_id_fkey FOREIGN KEY (teacher_id) REFERENCES public.teacher(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: course course_school_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.course
    ADD CONSTRAINT course_school_id_fkey FOREIGN KEY (school_id) REFERENCES public.school(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: course course_schoolid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.course
    ADD CONSTRAINT course_schoolid_fkey FOREIGN KEY (school_id) REFERENCES public.school(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: discipline discipline_school_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.discipline
    ADD CONSTRAINT discipline_school_id_fkey FOREIGN KEY (school_id) REFERENCES public.school(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: discipline discipline_teacher_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.discipline
    ADD CONSTRAINT discipline_teacher_id_fkey FOREIGN KEY (teacher_id) REFERENCES public.teacher(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: discipline discipline_teacherid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.discipline
    ADD CONSTRAINT discipline_teacherid_fkey FOREIGN KEY (teacher_id) REFERENCES public.teacher(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: enrollment enrollment_classroom_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.enrollment
    ADD CONSTRAINT enrollment_classroom_id_fkey FOREIGN KEY (classroom_id) REFERENCES public.classroom(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: enrollment enrollment_course_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.enrollment
    ADD CONSTRAINT enrollment_course_id_fkey FOREIGN KEY (course_id) REFERENCES public.course(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: enrollment enrollment_institution_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.enrollment
    ADD CONSTRAINT enrollment_institution_id_fkey FOREIGN KEY (institution_id) REFERENCES public.institution(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: enrollment enrollment_school_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.enrollment
    ADD CONSTRAINT enrollment_school_id_fkey FOREIGN KEY (school_id) REFERENCES public.school(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: enrollment enrollment_series_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.enrollment
    ADD CONSTRAINT enrollment_series_id_fkey FOREIGN KEY (series_id) REFERENCES public.series(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: enrollment enrollment_student_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.enrollment
    ADD CONSTRAINT enrollment_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.student(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: grade grade_discipline_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.grade
    ADD CONSTRAINT grade_discipline_id_fkey FOREIGN KEY (discipline_id) REFERENCES public.discipline(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: grade grade_disciplineid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.grade
    ADD CONSTRAINT grade_disciplineid_fkey FOREIGN KEY (discipline_id) REFERENCES public.discipline(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: grade grade_school_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.grade
    ADD CONSTRAINT grade_school_id_fkey FOREIGN KEY (school_id) REFERENCES public.school(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: grade grade_student_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.grade
    ADD CONSTRAINT grade_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.student(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: grade grade_studentid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.grade
    ADD CONSTRAINT grade_studentid_fkey FOREIGN KEY (student_id) REFERENCES public.student(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: role_permission role_permission_role_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role_permission
    ADD CONSTRAINT role_permission_role_id_fkey FOREIGN KEY (role_id) REFERENCES public.role(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: role_permission role_permission_school_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role_permission
    ADD CONSTRAINT role_permission_school_id_fkey FOREIGN KEY (school_id) REFERENCES public.school(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: role role_school_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role
    ADD CONSTRAINT role_school_id_fkey FOREIGN KEY (school_id) REFERENCES public.school(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: school school_institutionid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.school
    ADD CONSTRAINT school_institutionid_fkey FOREIGN KEY (institution_id) REFERENCES public.institution(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: series series_course_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.series
    ADD CONSTRAINT series_course_id_fkey FOREIGN KEY (course_id) REFERENCES public.course(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: series series_courseid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.series
    ADD CONSTRAINT series_courseid_fkey FOREIGN KEY (course_id) REFERENCES public.course(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: series series_institution_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.series
    ADD CONSTRAINT series_institution_id_fkey FOREIGN KEY (institution_id) REFERENCES public.institution(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: series series_school_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.series
    ADD CONSTRAINT series_school_id_fkey FOREIGN KEY (school_id) REFERENCES public.school(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: series series_timetable_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.series
    ADD CONSTRAINT series_timetable_id_fkey FOREIGN KEY (timetable_id) REFERENCES public.timetable(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: series series_timetableid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.series
    ADD CONSTRAINT series_timetableid_fkey FOREIGN KEY (timetable_id) REFERENCES public.timetable(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: student student_classroom_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.student
    ADD CONSTRAINT student_classroom_id_fkey FOREIGN KEY (classroom_id) REFERENCES public.classroom(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: student student_classroomid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.student
    ADD CONSTRAINT student_classroomid_fkey FOREIGN KEY (classroom_id) REFERENCES public.classroom(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: student student_school_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.student
    ADD CONSTRAINT student_school_id_fkey FOREIGN KEY (school_id) REFERENCES public.school(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: student student_series_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.student
    ADD CONSTRAINT student_series_id_fkey FOREIGN KEY (series_id) REFERENCES public.series(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: teacher teacher_school_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.teacher
    ADD CONSTRAINT teacher_school_id_fkey FOREIGN KEY (school_id) REFERENCES public.school(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: teacher teacher_schoolid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.teacher
    ADD CONSTRAINT teacher_schoolid_fkey FOREIGN KEY (school_id) REFERENCES public.school(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: teacher_to_timetable teacher_to_timetable_school_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.teacher_to_timetable
    ADD CONSTRAINT teacher_to_timetable_school_id_fkey FOREIGN KEY (school_id) REFERENCES public.school(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: teacher_to_timetable teacher_to_timetable_teacher_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.teacher_to_timetable
    ADD CONSTRAINT teacher_to_timetable_teacher_id_fkey FOREIGN KEY (teacher_id) REFERENCES public.teacher(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: teacher_to_timetable teacher_to_timetable_timetable_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.teacher_to_timetable
    ADD CONSTRAINT teacher_to_timetable_timetable_id_fkey FOREIGN KEY (timetable_id) REFERENCES public.timetable(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: timetable timetable_classroom_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.timetable
    ADD CONSTRAINT timetable_classroom_id_fkey FOREIGN KEY (classroom_id) REFERENCES public.classroom(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: timetable timetable_classroomid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.timetable
    ADD CONSTRAINT timetable_classroomid_fkey FOREIGN KEY (classroom_id) REFERENCES public.classroom(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: timetable timetable_discipline_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.timetable
    ADD CONSTRAINT timetable_discipline_id_fkey FOREIGN KEY (discipline_id) REFERENCES public.discipline(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: timetable timetable_disciplineid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.timetable
    ADD CONSTRAINT timetable_disciplineid_fkey FOREIGN KEY (discipline_id) REFERENCES public.discipline(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: timetable timetable_school_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.timetable
    ADD CONSTRAINT timetable_school_id_fkey FOREIGN KEY (school_id) REFERENCES public.school(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: timetable_school timetable_school_school_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.timetable_school
    ADD CONSTRAINT timetable_school_school_id_fkey FOREIGN KEY (school_id) REFERENCES public.school(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: timetable_school timetable_school_timetable_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.timetable_school
    ADD CONSTRAINT timetable_school_timetable_id_fkey FOREIGN KEY (timetable_id) REFERENCES public.timetable(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: timetable_school timetableschool_schoolid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.timetable_school
    ADD CONSTRAINT timetableschool_schoolid_fkey FOREIGN KEY (school_id) REFERENCES public.school(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: timetable_school timetableschool_timetableid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.timetable_school
    ADD CONSTRAINT timetableschool_timetableid_fkey FOREIGN KEY (timetable_id) REFERENCES public.timetable(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: user_role user_role_role_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_role
    ADD CONSTRAINT user_role_role_id_fkey FOREIGN KEY (role_id) REFERENCES public.role(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: user_role user_role_school_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_role
    ADD CONSTRAINT user_role_school_id_fkey FOREIGN KEY (school_id) REFERENCES public.school(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: objects objects_bucketId_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.objects
    ADD CONSTRAINT "objects_bucketId_fkey" FOREIGN KEY (bucket_id) REFERENCES storage.buckets(id);


--
-- Name: s3_multipart_uploads s3_multipart_uploads_bucket_id_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.s3_multipart_uploads
    ADD CONSTRAINT s3_multipart_uploads_bucket_id_fkey FOREIGN KEY (bucket_id) REFERENCES storage.buckets(id);


--
-- Name: s3_multipart_uploads_parts s3_multipart_uploads_parts_bucket_id_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.s3_multipart_uploads_parts
    ADD CONSTRAINT s3_multipart_uploads_parts_bucket_id_fkey FOREIGN KEY (bucket_id) REFERENCES storage.buckets(id);


--
-- Name: s3_multipart_uploads_parts s3_multipart_uploads_parts_upload_id_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.s3_multipart_uploads_parts
    ADD CONSTRAINT s3_multipart_uploads_parts_upload_id_fkey FOREIGN KEY (upload_id) REFERENCES storage.s3_multipart_uploads(id) ON DELETE CASCADE;


--
-- Name: audit_log_entries; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.audit_log_entries ENABLE ROW LEVEL SECURITY;

--
-- Name: flow_state; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.flow_state ENABLE ROW LEVEL SECURITY;

--
-- Name: identities; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.identities ENABLE ROW LEVEL SECURITY;

--
-- Name: instances; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.instances ENABLE ROW LEVEL SECURITY;

--
-- Name: mfa_amr_claims; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.mfa_amr_claims ENABLE ROW LEVEL SECURITY;

--
-- Name: mfa_challenges; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.mfa_challenges ENABLE ROW LEVEL SECURITY;

--
-- Name: mfa_factors; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.mfa_factors ENABLE ROW LEVEL SECURITY;

--
-- Name: one_time_tokens; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.one_time_tokens ENABLE ROW LEVEL SECURITY;

--
-- Name: refresh_tokens; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.refresh_tokens ENABLE ROW LEVEL SECURITY;

--
-- Name: saml_providers; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.saml_providers ENABLE ROW LEVEL SECURITY;

--
-- Name: saml_relay_states; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.saml_relay_states ENABLE ROW LEVEL SECURITY;

--
-- Name: schema_migrations; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.schema_migrations ENABLE ROW LEVEL SECURITY;

--
-- Name: sessions; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.sessions ENABLE ROW LEVEL SECURITY;

--
-- Name: sso_domains; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.sso_domains ENABLE ROW LEVEL SECURITY;

--
-- Name: sso_providers; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.sso_providers ENABLE ROW LEVEL SECURITY;

--
-- Name: users; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

--
-- Name: institution Enable read access for all users; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Enable read access for all users" ON public.institution FOR SELECT USING (true);


--
-- Name: academic_year academic_year_delete_policy; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY academic_year_delete_policy ON public.academic_year FOR DELETE USING (((school_id = public.current_school()) AND public.can_delete('academic_year'::character varying)));


--
-- Name: academic_year academic_year_insert_policy; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY academic_year_insert_policy ON public.academic_year FOR INSERT WITH CHECK (((school_id = public.current_school()) AND public.can_insert('academic_year'::character varying)));


--
-- Name: academic_year academic_year_select_policy; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY academic_year_select_policy ON public.academic_year FOR SELECT USING (((school_id = public.current_school()) AND public.can_select('academic_year'::character varying)));


--
-- Name: academic_year academic_year_update_policy; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY academic_year_update_policy ON public.academic_year FOR UPDATE USING (((school_id = public.current_school()) AND public.can_update('academic_year'::character varying))) WITH CHECK (((school_id = public.current_school()) AND public.can_update('academic_year'::character varying)));


--
-- Name: attendance attendance_delete_policy; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY attendance_delete_policy ON public.attendance FOR DELETE USING (((school_id = public.current_school()) AND public.can_delete('attendance'::character varying)));


--
-- Name: attendance attendance_insert_policy; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY attendance_insert_policy ON public.attendance FOR INSERT WITH CHECK (((school_id = public.current_school()) AND public.can_insert('attendance'::character varying)));


--
-- Name: attendance attendance_select_policy; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY attendance_select_policy ON public.attendance FOR SELECT USING (((school_id = public.current_school()) AND public.can_select('attendance'::character varying)));


--
-- Name: attendance attendance_update_policy; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY attendance_update_policy ON public.attendance FOR UPDATE USING (((school_id = public.current_school()) AND public.can_update('attendance'::character varying))) WITH CHECK (((school_id = public.current_school()) AND public.can_update('attendance'::character varying)));


--
-- Name: class_session class_session_delete_policy; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY class_session_delete_policy ON public.class_session FOR DELETE USING (((school_id = public.current_school()) AND public.can_delete('class_session'::character varying)));


--
-- Name: class_session class_session_insert_policy; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY class_session_insert_policy ON public.class_session FOR INSERT WITH CHECK (((school_id = public.current_school()) AND public.can_insert('class_session'::character varying)));


--
-- Name: class_session class_session_select_policy; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY class_session_select_policy ON public.class_session FOR SELECT USING (((school_id = public.current_school()) AND public.can_select('class_session'::character varying)));


--
-- Name: class_session class_session_update_policy; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY class_session_update_policy ON public.class_session FOR UPDATE USING (((school_id = public.current_school()) AND public.can_update('class_session'::character varying))) WITH CHECK (((school_id = public.current_school()) AND public.can_update('class_session'::character varying)));


--
-- Name: classroom classroom_delete_policy; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY classroom_delete_policy ON public.classroom FOR DELETE USING (((school_id = public.current_school()) AND public.can_delete('classroom'::character varying)));


--
-- Name: classroom classroom_insert_policy; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY classroom_insert_policy ON public.classroom FOR INSERT WITH CHECK (((school_id = public.current_school()) AND public.can_insert('classroom'::character varying)));


--
-- Name: classroom classroom_select_policy; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY classroom_select_policy ON public.classroom FOR SELECT USING (((school_id = public.current_school()) AND public.can_select('classroom'::character varying)));


--
-- Name: classroom classroom_update_policy; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY classroom_update_policy ON public.classroom FOR UPDATE USING (((school_id = public.current_school()) AND public.can_update('classroom'::character varying))) WITH CHECK (((school_id = public.current_school()) AND public.can_update('classroom'::character varying)));


--
-- Name: course course_delete_policy; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY course_delete_policy ON public.course FOR DELETE USING (((school_id = public.current_school()) AND public.can_delete('course'::character varying)));


--
-- Name: course course_insert_policy; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY course_insert_policy ON public.course FOR INSERT WITH CHECK (((school_id = public.current_school()) AND public.can_insert('course'::character varying)));


--
-- Name: course course_select_policy; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY course_select_policy ON public.course FOR SELECT USING (((school_id = public.current_school()) AND public.can_select('course'::character varying)));


--
-- Name: course course_update_policy; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY course_update_policy ON public.course FOR UPDATE USING (((school_id = public.current_school()) AND public.can_update('course'::character varying))) WITH CHECK (((school_id = public.current_school()) AND public.can_update('course'::character varying)));


--
-- Name: discipline discipline_delete_policy; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY discipline_delete_policy ON public.discipline FOR DELETE USING (((school_id = public.current_school()) AND public.can_delete('discipline'::character varying)));


--
-- Name: discipline discipline_insert_policy; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY discipline_insert_policy ON public.discipline FOR INSERT WITH CHECK (((school_id = public.current_school()) AND public.can_insert('discipline'::character varying)));


--
-- Name: discipline discipline_select_policy; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY discipline_select_policy ON public.discipline FOR SELECT USING (((school_id = public.current_school()) AND public.can_select('discipline'::character varying)));


--
-- Name: discipline discipline_update_policy; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY discipline_update_policy ON public.discipline FOR UPDATE USING (((school_id = public.current_school()) AND public.can_update('discipline'::character varying))) WITH CHECK (((school_id = public.current_school()) AND public.can_update('discipline'::character varying)));


--
-- Name: enrollment enrollment_delete_policy; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY enrollment_delete_policy ON public.enrollment FOR DELETE USING (((school_id = public.current_school()) AND public.can_delete('enrollment'::character varying)));


--
-- Name: enrollment enrollment_insert_policy; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY enrollment_insert_policy ON public.enrollment FOR INSERT WITH CHECK (((school_id = public.current_school()) AND public.can_insert('enrollment'::character varying)));


--
-- Name: enrollment enrollment_select_policy; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY enrollment_select_policy ON public.enrollment FOR SELECT USING (((school_id = public.current_school()) AND public.can_select('enrollment'::character varying)));


--
-- Name: enrollment enrollment_update_policy; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY enrollment_update_policy ON public.enrollment FOR UPDATE USING (((school_id = public.current_school()) AND public.can_update('enrollment'::character varying))) WITH CHECK (((school_id = public.current_school()) AND public.can_update('enrollment'::character varying)));


--
-- Name: grade grade_delete_policy; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY grade_delete_policy ON public.grade FOR DELETE USING (((school_id = public.current_school()) AND public.can_delete('grade'::character varying)));


--
-- Name: grade grade_insert_policy; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY grade_insert_policy ON public.grade FOR INSERT WITH CHECK (((school_id = public.current_school()) AND public.can_insert('grade'::character varying)));


--
-- Name: grade grade_select_policy; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY grade_select_policy ON public.grade FOR SELECT USING (((school_id = public.current_school()) AND public.can_select('grade'::character varying)));


--
-- Name: grade grade_update_policy; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY grade_update_policy ON public.grade FOR UPDATE USING (((school_id = public.current_school()) AND public.can_update('grade'::character varying))) WITH CHECK (((school_id = public.current_school()) AND public.can_update('grade'::character varying)));


--
-- Name: role role_delete_policy; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY role_delete_policy ON public.role FOR DELETE USING (((school_id = public.current_school()) AND public.can_delete('role'::character varying)));


--
-- Name: role role_insert_policy; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY role_insert_policy ON public.role FOR INSERT WITH CHECK (((school_id = public.current_school()) AND public.can_insert('role'::character varying)));


--
-- Name: role_permission role_permission_delete_policy; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY role_permission_delete_policy ON public.role_permission FOR DELETE USING (((school_id = public.current_school()) AND public.can_delete('role_permission'::character varying)));


--
-- Name: role_permission role_permission_insert_policy; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY role_permission_insert_policy ON public.role_permission FOR INSERT WITH CHECK (((school_id = public.current_school()) AND public.can_insert('role_permission'::character varying)));


--
-- Name: role_permission role_permission_select_policy; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY role_permission_select_policy ON public.role_permission FOR SELECT USING (((school_id = public.current_school()) AND public.can_select('role_permission'::character varying)));


--
-- Name: role_permission role_permission_update_policy; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY role_permission_update_policy ON public.role_permission FOR UPDATE USING (((school_id = public.current_school()) AND public.can_update('role_permission'::character varying))) WITH CHECK (((school_id = public.current_school()) AND public.can_update('role_permission'::character varying)));


--
-- Name: role role_select_policy; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY role_select_policy ON public.role FOR SELECT USING (((school_id = public.current_school()) AND public.can_select('role'::character varying)));


--
-- Name: role role_update_policy; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY role_update_policy ON public.role FOR UPDATE USING (((school_id = public.current_school()) AND public.can_update('role'::character varying))) WITH CHECK (((school_id = public.current_school()) AND public.can_update('role'::character varying)));


--
-- Name: school school_delete_policy; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY school_delete_policy ON public.school FOR DELETE USING (((id = public.current_school()) AND public.can_delete('school'::character varying)));


--
-- Name: school school_insert_policy; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY school_insert_policy ON public.school FOR INSERT WITH CHECK (((id = public.current_school()) AND public.can_insert('school'::character varying)));


--
-- Name: school school_select_policy; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY school_select_policy ON public.school FOR SELECT USING ((id IN ( SELECT public.my_schools() AS my_schools)));


--
-- Name: school school_update_policy; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY school_update_policy ON public.school FOR UPDATE USING (((id = public.current_school()) AND public.can_update('school'::character varying))) WITH CHECK (((id = public.current_school()) AND public.can_update('school'::character varying)));


--
-- Name: series series_delete_policy; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY series_delete_policy ON public.series FOR DELETE USING (((school_id = public.current_school()) AND public.can_delete('series'::character varying)));


--
-- Name: series series_insert_policy; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY series_insert_policy ON public.series FOR INSERT WITH CHECK (((school_id = public.current_school()) AND public.can_insert('series'::character varying)));


--
-- Name: series series_select_policy; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY series_select_policy ON public.series FOR SELECT USING (((school_id = public.current_school()) AND public.can_select('series'::character varying)));


--
-- Name: series series_update_policy; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY series_update_policy ON public.series FOR UPDATE USING (((school_id = public.current_school()) AND public.can_update('series'::character varying))) WITH CHECK (((school_id = public.current_school()) AND public.can_update('series'::character varying)));


--
-- Name: student student_delete_policy; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY student_delete_policy ON public.student FOR DELETE USING (((school_id = public.current_school()) AND public.can_delete('student'::character varying)));


--
-- Name: student student_insert_policy; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY student_insert_policy ON public.student FOR INSERT WITH CHECK (((school_id = public.current_school()) AND public.can_insert('student'::character varying)));


--
-- Name: student student_select_policy; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY student_select_policy ON public.student FOR SELECT USING (((school_id = public.current_school()) AND public.can_select('student'::character varying)));


--
-- Name: student student_update_policy; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY student_update_policy ON public.student FOR UPDATE USING (((school_id = public.current_school()) AND public.can_update('student'::character varying))) WITH CHECK (((school_id = public.current_school()) AND public.can_update('student'::character varying)));


--
-- Name: teacher teacher_delete_policy; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY teacher_delete_policy ON public.teacher FOR DELETE USING (((school_id = public.current_school()) AND public.can_delete('teacher'::character varying)));


--
-- Name: teacher teacher_insert_policy; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY teacher_insert_policy ON public.teacher FOR INSERT WITH CHECK (((school_id = public.current_school()) AND public.can_insert('teacher'::character varying)));


--
-- Name: teacher teacher_select_policy; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY teacher_select_policy ON public.teacher FOR SELECT USING (((school_id = public.current_school()) AND public.can_select('teacher'::character varying)));


--
-- Name: teacher_to_timetable teacher_to_timetable_delete_policy; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY teacher_to_timetable_delete_policy ON public.teacher_to_timetable FOR DELETE USING (((school_id = public.current_school()) AND public.can_delete('teacher_to_timetable'::character varying)));


--
-- Name: teacher_to_timetable teacher_to_timetable_insert_policy; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY teacher_to_timetable_insert_policy ON public.teacher_to_timetable FOR INSERT WITH CHECK (((school_id = public.current_school()) AND public.can_insert('teacher_to_timetable'::character varying)));


--
-- Name: teacher_to_timetable teacher_to_timetable_select_policy; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY teacher_to_timetable_select_policy ON public.teacher_to_timetable FOR SELECT USING (((school_id = public.current_school()) AND public.can_select('teacher_to_timetable'::character varying)));


--
-- Name: teacher_to_timetable teacher_to_timetable_update_policy; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY teacher_to_timetable_update_policy ON public.teacher_to_timetable FOR UPDATE USING (((school_id = public.current_school()) AND public.can_update('teacher_to_timetable'::character varying))) WITH CHECK (((school_id = public.current_school()) AND public.can_update('teacher_to_timetable'::character varying)));


--
-- Name: teacher teacher_update_policy; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY teacher_update_policy ON public.teacher FOR UPDATE USING (((school_id = public.current_school()) AND public.can_update('teacher'::character varying))) WITH CHECK (((school_id = public.current_school()) AND public.can_update('teacher'::character varying)));


--
-- Name: timetable timetable_delete_policy; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY timetable_delete_policy ON public.timetable FOR DELETE USING (((school_id = public.current_school()) AND public.can_delete('timetable'::character varying)));


--
-- Name: timetable timetable_insert_policy; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY timetable_insert_policy ON public.timetable FOR INSERT WITH CHECK (((school_id = public.current_school()) AND public.can_insert('timetable'::character varying)));


--
-- Name: timetable_school timetable_school_delete_policy; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY timetable_school_delete_policy ON public.timetable_school FOR DELETE USING (((school_id = public.current_school()) AND public.can_delete('timetable_school'::character varying)));


--
-- Name: timetable_school timetable_school_insert_policy; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY timetable_school_insert_policy ON public.timetable_school FOR INSERT WITH CHECK (((school_id = public.current_school()) AND public.can_insert('timetable_school'::character varying)));


--
-- Name: timetable_school timetable_school_select_policy; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY timetable_school_select_policy ON public.timetable_school FOR SELECT USING (((school_id = public.current_school()) AND public.can_select('timetable_school'::character varying)));


--
-- Name: timetable_school timetable_school_update_policy; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY timetable_school_update_policy ON public.timetable_school FOR UPDATE USING (((school_id = public.current_school()) AND public.can_update('timetable_school'::character varying))) WITH CHECK (((school_id = public.current_school()) AND public.can_update('timetable_school'::character varying)));


--
-- Name: timetable timetable_select_policy; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY timetable_select_policy ON public.timetable FOR SELECT USING (((school_id = public.current_school()) AND public.can_select('timetable'::character varying)));


--
-- Name: timetable timetable_update_policy; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY timetable_update_policy ON public.timetable FOR UPDATE USING (((school_id = public.current_school()) AND public.can_update('timetable'::character varying))) WITH CHECK (((school_id = public.current_school()) AND public.can_update('timetable'::character varying)));


--
-- Name: user_role user_role_delete_policy; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY user_role_delete_policy ON public.user_role FOR DELETE USING (((school_id = public.current_school()) AND public.can_delete('user_role'::character varying)));


--
-- Name: user_role user_role_insert_policy; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY user_role_insert_policy ON public.user_role FOR INSERT WITH CHECK (((school_id = public.current_school()) AND public.can_insert('user_role'::character varying)));


--
-- Name: user_role user_role_select_policy; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY user_role_select_policy ON public.user_role FOR SELECT USING (((school_id = public.current_school()) AND public.can_select('user_role'::character varying)));


--
-- Name: user_role user_role_update_policy; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY user_role_update_policy ON public.user_role FOR UPDATE USING (((school_id = public.current_school()) AND public.can_update('user_role'::character varying))) WITH CHECK (((school_id = public.current_school()) AND public.can_update('user_role'::character varying)));


--
-- Name: messages; Type: ROW SECURITY; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER TABLE realtime.messages ENABLE ROW LEVEL SECURITY;

--
-- Name: objects allow_anon_insert; Type: POLICY; Schema: storage; Owner: supabase_storage_admin
--

CREATE POLICY allow_anon_insert ON storage.objects FOR INSERT TO anon WITH CHECK ((bucket_id = 'ged'::text));


--
-- Name: buckets; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.buckets ENABLE ROW LEVEL SECURITY;

--
-- Name: migrations; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.migrations ENABLE ROW LEVEL SECURITY;

--
-- Name: objects; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

--
-- Name: objects public_read_policy; Type: POLICY; Schema: storage; Owner: supabase_storage_admin
--

CREATE POLICY public_read_policy ON storage.objects FOR SELECT USING (((bucket_id = 'ged'::text) AND (auth.role() = 'anon'::text)));


--
-- Name: s3_multipart_uploads; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.s3_multipart_uploads ENABLE ROW LEVEL SECURITY;

--
-- Name: s3_multipart_uploads_parts; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.s3_multipart_uploads_parts ENABLE ROW LEVEL SECURITY;

--
-- Name: supabase_realtime; Type: PUBLICATION; Schema: -; Owner: postgres
--

CREATE PUBLICATION supabase_realtime WITH (publish = 'insert, update, delete, truncate');


ALTER PUBLICATION supabase_realtime OWNER TO postgres;

--
-- Name: SCHEMA auth; Type: ACL; Schema: -; Owner: supabase_admin
--

GRANT USAGE ON SCHEMA auth TO anon;
GRANT USAGE ON SCHEMA auth TO authenticated;
GRANT USAGE ON SCHEMA auth TO service_role;
GRANT ALL ON SCHEMA auth TO supabase_auth_admin;
GRANT ALL ON SCHEMA auth TO dashboard_user;
GRANT ALL ON SCHEMA auth TO postgres;


--
-- Name: SCHEMA extensions; Type: ACL; Schema: -; Owner: postgres
--

GRANT USAGE ON SCHEMA extensions TO anon;
GRANT USAGE ON SCHEMA extensions TO authenticated;
GRANT USAGE ON SCHEMA extensions TO service_role;
GRANT ALL ON SCHEMA extensions TO dashboard_user;


--
-- Name: SCHEMA net; Type: ACL; Schema: -; Owner: supabase_admin
--

GRANT USAGE ON SCHEMA net TO supabase_functions_admin;
GRANT USAGE ON SCHEMA net TO anon;
GRANT USAGE ON SCHEMA net TO authenticated;
GRANT USAGE ON SCHEMA net TO service_role;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: pg_database_owner
--

GRANT USAGE ON SCHEMA public TO postgres;
GRANT USAGE ON SCHEMA public TO anon;
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT USAGE ON SCHEMA public TO service_role;


--
-- Name: SCHEMA realtime; Type: ACL; Schema: -; Owner: supabase_admin
--

GRANT USAGE ON SCHEMA realtime TO postgres;
GRANT USAGE ON SCHEMA realtime TO anon;
GRANT USAGE ON SCHEMA realtime TO authenticated;
GRANT USAGE ON SCHEMA realtime TO service_role;
GRANT ALL ON SCHEMA realtime TO supabase_realtime_admin;


--
-- Name: SCHEMA storage; Type: ACL; Schema: -; Owner: supabase_admin
--

GRANT ALL ON SCHEMA storage TO postgres;
GRANT USAGE ON SCHEMA storage TO anon;
GRANT USAGE ON SCHEMA storage TO authenticated;
GRANT USAGE ON SCHEMA storage TO service_role;
GRANT ALL ON SCHEMA storage TO supabase_storage_admin;
GRANT ALL ON SCHEMA storage TO dashboard_user;


--
-- Name: SCHEMA supabase_functions; Type: ACL; Schema: -; Owner: supabase_admin
--

GRANT USAGE ON SCHEMA supabase_functions TO postgres;
GRANT USAGE ON SCHEMA supabase_functions TO anon;
GRANT USAGE ON SCHEMA supabase_functions TO authenticated;
GRANT USAGE ON SCHEMA supabase_functions TO service_role;
GRANT ALL ON SCHEMA supabase_functions TO supabase_functions_admin;


--
-- Name: FUNCTION email(); Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON FUNCTION auth.email() TO dashboard_user;


--
-- Name: FUNCTION jwt(); Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON FUNCTION auth.jwt() TO postgres;
GRANT ALL ON FUNCTION auth.jwt() TO dashboard_user;


--
-- Name: FUNCTION role(); Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON FUNCTION auth.role() TO dashboard_user;


--
-- Name: FUNCTION uid(); Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON FUNCTION auth.uid() TO dashboard_user;


--
-- Name: FUNCTION algorithm_sign(signables text, secret text, algorithm text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.algorithm_sign(signables text, secret text, algorithm text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.algorithm_sign(signables text, secret text, algorithm text) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION armor(bytea); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.armor(bytea) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.armor(bytea) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION armor(bytea, text[], text[]); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.armor(bytea, text[], text[]) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.armor(bytea, text[], text[]) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION crypt(text, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.crypt(text, text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.crypt(text, text) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION dearmor(text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.dearmor(text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.dearmor(text) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION decrypt(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.decrypt(bytea, bytea, text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.decrypt(bytea, bytea, text) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION decrypt_iv(bytea, bytea, bytea, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.decrypt_iv(bytea, bytea, bytea, text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.decrypt_iv(bytea, bytea, bytea, text) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION digest(bytea, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.digest(bytea, text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.digest(bytea, text) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION digest(text, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.digest(text, text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.digest(text, text) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION encrypt(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.encrypt(bytea, bytea, text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.encrypt(bytea, bytea, text) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION encrypt_iv(bytea, bytea, bytea, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.encrypt_iv(bytea, bytea, bytea, text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.encrypt_iv(bytea, bytea, bytea, text) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION gen_random_bytes(integer); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.gen_random_bytes(integer) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.gen_random_bytes(integer) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION gen_random_uuid(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.gen_random_uuid() TO dashboard_user;
GRANT ALL ON FUNCTION extensions.gen_random_uuid() TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION gen_salt(text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.gen_salt(text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.gen_salt(text) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION gen_salt(text, integer); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.gen_salt(text, integer) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.gen_salt(text, integer) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION grant_pg_cron_access(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.grant_pg_cron_access() FROM postgres;
GRANT ALL ON FUNCTION extensions.grant_pg_cron_access() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.grant_pg_cron_access() TO dashboard_user;


--
-- Name: FUNCTION grant_pg_graphql_access(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.grant_pg_graphql_access() TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION grant_pg_net_access(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.grant_pg_net_access() FROM postgres;
GRANT ALL ON FUNCTION extensions.grant_pg_net_access() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.grant_pg_net_access() TO dashboard_user;


--
-- Name: FUNCTION hmac(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.hmac(bytea, bytea, text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.hmac(bytea, bytea, text) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION hmac(text, text, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.hmac(text, text, text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.hmac(text, text, text) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION pg_stat_statements(showtext boolean, OUT userid oid, OUT dbid oid, OUT toplevel boolean, OUT queryid bigint, OUT query text, OUT plans bigint, OUT total_plan_time double precision, OUT min_plan_time double precision, OUT max_plan_time double precision, OUT mean_plan_time double precision, OUT stddev_plan_time double precision, OUT calls bigint, OUT total_exec_time double precision, OUT min_exec_time double precision, OUT max_exec_time double precision, OUT mean_exec_time double precision, OUT stddev_exec_time double precision, OUT rows bigint, OUT shared_blks_hit bigint, OUT shared_blks_read bigint, OUT shared_blks_dirtied bigint, OUT shared_blks_written bigint, OUT local_blks_hit bigint, OUT local_blks_read bigint, OUT local_blks_dirtied bigint, OUT local_blks_written bigint, OUT temp_blks_read bigint, OUT temp_blks_written bigint, OUT blk_read_time double precision, OUT blk_write_time double precision, OUT temp_blk_read_time double precision, OUT temp_blk_write_time double precision, OUT wal_records bigint, OUT wal_fpi bigint, OUT wal_bytes numeric, OUT jit_functions bigint, OUT jit_generation_time double precision, OUT jit_inlining_count bigint, OUT jit_inlining_time double precision, OUT jit_optimization_count bigint, OUT jit_optimization_time double precision, OUT jit_emission_count bigint, OUT jit_emission_time double precision); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pg_stat_statements(showtext boolean, OUT userid oid, OUT dbid oid, OUT toplevel boolean, OUT queryid bigint, OUT query text, OUT plans bigint, OUT total_plan_time double precision, OUT min_plan_time double precision, OUT max_plan_time double precision, OUT mean_plan_time double precision, OUT stddev_plan_time double precision, OUT calls bigint, OUT total_exec_time double precision, OUT min_exec_time double precision, OUT max_exec_time double precision, OUT mean_exec_time double precision, OUT stddev_exec_time double precision, OUT rows bigint, OUT shared_blks_hit bigint, OUT shared_blks_read bigint, OUT shared_blks_dirtied bigint, OUT shared_blks_written bigint, OUT local_blks_hit bigint, OUT local_blks_read bigint, OUT local_blks_dirtied bigint, OUT local_blks_written bigint, OUT temp_blks_read bigint, OUT temp_blks_written bigint, OUT blk_read_time double precision, OUT blk_write_time double precision, OUT temp_blk_read_time double precision, OUT temp_blk_write_time double precision, OUT wal_records bigint, OUT wal_fpi bigint, OUT wal_bytes numeric, OUT jit_functions bigint, OUT jit_generation_time double precision, OUT jit_inlining_count bigint, OUT jit_inlining_time double precision, OUT jit_optimization_count bigint, OUT jit_optimization_time double precision, OUT jit_emission_count bigint, OUT jit_emission_time double precision) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION pg_stat_statements_info(OUT dealloc bigint, OUT stats_reset timestamp with time zone); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pg_stat_statements_info(OUT dealloc bigint, OUT stats_reset timestamp with time zone) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION pg_stat_statements_reset(userid oid, dbid oid, queryid bigint); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pg_stat_statements_reset(userid oid, dbid oid, queryid bigint) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION pgp_armor_headers(text, OUT key text, OUT value text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_armor_headers(text, OUT key text, OUT value text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.pgp_armor_headers(text, OUT key text, OUT value text) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION pgp_key_id(bytea); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_key_id(bytea) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.pgp_key_id(bytea) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION pgp_pub_decrypt(bytea, bytea); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION pgp_pub_decrypt(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION pgp_pub_decrypt(bytea, bytea, text, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text, text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text, text) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION pgp_pub_decrypt_bytea(bytea, bytea); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION pgp_pub_decrypt_bytea(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION pgp_pub_decrypt_bytea(bytea, bytea, text, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text, text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text, text) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION pgp_pub_encrypt(text, bytea); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION pgp_pub_encrypt(text, bytea, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea, text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea, text) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION pgp_pub_encrypt_bytea(bytea, bytea); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION pgp_pub_encrypt_bytea(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea, text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea, text) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION pgp_sym_decrypt(bytea, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION pgp_sym_decrypt(bytea, text, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text, text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text, text) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION pgp_sym_decrypt_bytea(bytea, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION pgp_sym_decrypt_bytea(bytea, text, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text, text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text, text) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION pgp_sym_encrypt(text, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION pgp_sym_encrypt(text, text, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text, text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text, text) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION pgp_sym_encrypt_bytea(bytea, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION pgp_sym_encrypt_bytea(bytea, text, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text, text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text, text) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION pgrst_ddl_watch(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgrst_ddl_watch() TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION pgrst_drop_watch(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgrst_drop_watch() TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION set_graphql_placeholder(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.set_graphql_placeholder() TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION sign(payload json, secret text, algorithm text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.sign(payload json, secret text, algorithm text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.sign(payload json, secret text, algorithm text) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION try_cast_double(inp text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.try_cast_double(inp text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.try_cast_double(inp text) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION url_decode(data text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.url_decode(data text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.url_decode(data text) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION url_encode(data bytea); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.url_encode(data bytea) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.url_encode(data bytea) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION uuid_generate_v1(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.uuid_generate_v1() TO dashboard_user;
GRANT ALL ON FUNCTION extensions.uuid_generate_v1() TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION uuid_generate_v1mc(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.uuid_generate_v1mc() TO dashboard_user;
GRANT ALL ON FUNCTION extensions.uuid_generate_v1mc() TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION uuid_generate_v3(namespace uuid, name text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.uuid_generate_v3(namespace uuid, name text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.uuid_generate_v3(namespace uuid, name text) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION uuid_generate_v4(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.uuid_generate_v4() TO dashboard_user;
GRANT ALL ON FUNCTION extensions.uuid_generate_v4() TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION uuid_generate_v5(namespace uuid, name text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.uuid_generate_v5(namespace uuid, name text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.uuid_generate_v5(namespace uuid, name text) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION uuid_nil(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.uuid_nil() TO dashboard_user;
GRANT ALL ON FUNCTION extensions.uuid_nil() TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION uuid_ns_dns(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.uuid_ns_dns() TO dashboard_user;
GRANT ALL ON FUNCTION extensions.uuid_ns_dns() TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION uuid_ns_oid(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.uuid_ns_oid() TO dashboard_user;
GRANT ALL ON FUNCTION extensions.uuid_ns_oid() TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION uuid_ns_url(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.uuid_ns_url() TO dashboard_user;
GRANT ALL ON FUNCTION extensions.uuid_ns_url() TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION uuid_ns_x500(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.uuid_ns_x500() TO dashboard_user;
GRANT ALL ON FUNCTION extensions.uuid_ns_x500() TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION verify(token text, secret text, algorithm text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.verify(token text, secret text, algorithm text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.verify(token text, secret text, algorithm text) TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION comment_directive(comment_ text); Type: ACL; Schema: graphql; Owner: supabase_admin
--

GRANT ALL ON FUNCTION graphql.comment_directive(comment_ text) TO postgres;
GRANT ALL ON FUNCTION graphql.comment_directive(comment_ text) TO anon;
GRANT ALL ON FUNCTION graphql.comment_directive(comment_ text) TO authenticated;
GRANT ALL ON FUNCTION graphql.comment_directive(comment_ text) TO service_role;


--
-- Name: FUNCTION exception(message text); Type: ACL; Schema: graphql; Owner: supabase_admin
--

GRANT ALL ON FUNCTION graphql.exception(message text) TO postgres;
GRANT ALL ON FUNCTION graphql.exception(message text) TO anon;
GRANT ALL ON FUNCTION graphql.exception(message text) TO authenticated;
GRANT ALL ON FUNCTION graphql.exception(message text) TO service_role;


--
-- Name: FUNCTION get_schema_version(); Type: ACL; Schema: graphql; Owner: supabase_admin
--

GRANT ALL ON FUNCTION graphql.get_schema_version() TO postgres;
GRANT ALL ON FUNCTION graphql.get_schema_version() TO anon;
GRANT ALL ON FUNCTION graphql.get_schema_version() TO authenticated;
GRANT ALL ON FUNCTION graphql.get_schema_version() TO service_role;


--
-- Name: FUNCTION increment_schema_version(); Type: ACL; Schema: graphql; Owner: supabase_admin
--

GRANT ALL ON FUNCTION graphql.increment_schema_version() TO postgres;
GRANT ALL ON FUNCTION graphql.increment_schema_version() TO anon;
GRANT ALL ON FUNCTION graphql.increment_schema_version() TO authenticated;
GRANT ALL ON FUNCTION graphql.increment_schema_version() TO service_role;


--
-- Name: FUNCTION graphql("operationName" text, query text, variables jsonb, extensions jsonb); Type: ACL; Schema: graphql_public; Owner: supabase_admin
--

GRANT ALL ON FUNCTION graphql_public.graphql("operationName" text, query text, variables jsonb, extensions jsonb) TO postgres;
GRANT ALL ON FUNCTION graphql_public.graphql("operationName" text, query text, variables jsonb, extensions jsonb) TO anon;
GRANT ALL ON FUNCTION graphql_public.graphql("operationName" text, query text, variables jsonb, extensions jsonb) TO authenticated;
GRANT ALL ON FUNCTION graphql_public.graphql("operationName" text, query text, variables jsonb, extensions jsonb) TO service_role;


--
-- Name: FUNCTION http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer); Type: ACL; Schema: net; Owner: supabase_admin
--

REVOKE ALL ON FUNCTION net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) FROM PUBLIC;
GRANT ALL ON FUNCTION net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) TO supabase_functions_admin;
GRANT ALL ON FUNCTION net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) TO postgres;
GRANT ALL ON FUNCTION net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) TO anon;
GRANT ALL ON FUNCTION net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) TO authenticated;
GRANT ALL ON FUNCTION net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) TO service_role;


--
-- Name: FUNCTION http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer); Type: ACL; Schema: net; Owner: supabase_admin
--

REVOKE ALL ON FUNCTION net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) FROM PUBLIC;
GRANT ALL ON FUNCTION net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) TO supabase_functions_admin;
GRANT ALL ON FUNCTION net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) TO postgres;
GRANT ALL ON FUNCTION net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) TO anon;
GRANT ALL ON FUNCTION net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) TO authenticated;
GRANT ALL ON FUNCTION net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) TO service_role;


--
-- Name: FUNCTION lo_export(oid, text); Type: ACL; Schema: pg_catalog; Owner: supabase_admin
--

REVOKE ALL ON FUNCTION pg_catalog.lo_export(oid, text) FROM postgres;
GRANT ALL ON FUNCTION pg_catalog.lo_export(oid, text) TO supabase_admin;


--
-- Name: FUNCTION lo_import(text); Type: ACL; Schema: pg_catalog; Owner: supabase_admin
--

REVOKE ALL ON FUNCTION pg_catalog.lo_import(text) FROM postgres;
GRANT ALL ON FUNCTION pg_catalog.lo_import(text) TO supabase_admin;


--
-- Name: FUNCTION lo_import(text, oid); Type: ACL; Schema: pg_catalog; Owner: supabase_admin
--

REVOKE ALL ON FUNCTION pg_catalog.lo_import(text, oid) FROM postgres;
GRANT ALL ON FUNCTION pg_catalog.lo_import(text, oid) TO supabase_admin;


--
-- Name: FUNCTION get_auth(p_usename text); Type: ACL; Schema: pgbouncer; Owner: postgres
--

REVOKE ALL ON FUNCTION pgbouncer.get_auth(p_usename text) FROM PUBLIC;
GRANT ALL ON FUNCTION pgbouncer.get_auth(p_usename text) TO pgbouncer;


--
-- Name: FUNCTION crypto_aead_det_decrypt(message bytea, additional bytea, key_uuid uuid, nonce bytea); Type: ACL; Schema: pgsodium; Owner: pgsodium_keymaker
--

GRANT ALL ON FUNCTION pgsodium.crypto_aead_det_decrypt(message bytea, additional bytea, key_uuid uuid, nonce bytea) TO service_role;


--
-- Name: FUNCTION crypto_aead_det_encrypt(message bytea, additional bytea, key_uuid uuid, nonce bytea); Type: ACL; Schema: pgsodium; Owner: pgsodium_keymaker
--

GRANT ALL ON FUNCTION pgsodium.crypto_aead_det_encrypt(message bytea, additional bytea, key_uuid uuid, nonce bytea) TO service_role;


--
-- Name: FUNCTION crypto_aead_det_keygen(); Type: ACL; Schema: pgsodium; Owner: supabase_admin
--

GRANT ALL ON FUNCTION pgsodium.crypto_aead_det_keygen() TO service_role;


--
-- Name: FUNCTION calculate_business_days(start_date date, end_date date); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.calculate_business_days(start_date date, end_date date) TO anon;
GRANT ALL ON FUNCTION public.calculate_business_days(start_date date, end_date date) TO authenticated;
GRANT ALL ON FUNCTION public.calculate_business_days(start_date date, end_date date) TO service_role;


--
-- Name: FUNCTION can_delete(p_table character varying); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.can_delete(p_table character varying) TO anon;
GRANT ALL ON FUNCTION public.can_delete(p_table character varying) TO authenticated;
GRANT ALL ON FUNCTION public.can_delete(p_table character varying) TO service_role;


--
-- Name: FUNCTION can_insert(p_table character varying); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.can_insert(p_table character varying) TO anon;
GRANT ALL ON FUNCTION public.can_insert(p_table character varying) TO authenticated;
GRANT ALL ON FUNCTION public.can_insert(p_table character varying) TO service_role;


--
-- Name: FUNCTION can_select(p_table character varying); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.can_select(p_table character varying) TO anon;
GRANT ALL ON FUNCTION public.can_select(p_table character varying) TO authenticated;
GRANT ALL ON FUNCTION public.can_select(p_table character varying) TO service_role;


--
-- Name: FUNCTION can_update(p_table character varying); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.can_update(p_table character varying) TO anon;
GRANT ALL ON FUNCTION public.can_update(p_table character varying) TO authenticated;
GRANT ALL ON FUNCTION public.can_update(p_table character varying) TO service_role;


--
-- Name: FUNCTION current_school(); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.current_school() TO anon;
GRANT ALL ON FUNCTION public.current_school() TO authenticated;
GRANT ALL ON FUNCTION public.current_school() TO service_role;


--
-- Name: FUNCTION get_header(item text); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.get_header(item text) TO anon;
GRANT ALL ON FUNCTION public.get_header(item text) TO authenticated;
GRANT ALL ON FUNCTION public.get_header(item text) TO service_role;


--
-- Name: FUNCTION my_schools(); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.my_schools() TO anon;
GRANT ALL ON FUNCTION public.my_schools() TO authenticated;
GRANT ALL ON FUNCTION public.my_schools() TO service_role;


--
-- Name: FUNCTION set_weekday(); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.set_weekday() TO anon;
GRANT ALL ON FUNCTION public.set_weekday() TO authenticated;
GRANT ALL ON FUNCTION public.set_weekday() TO service_role;


--
-- Name: FUNCTION setup_rls_policies(ignore_tables text[]); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.setup_rls_policies(ignore_tables text[]) TO anon;
GRANT ALL ON FUNCTION public.setup_rls_policies(ignore_tables text[]) TO authenticated;
GRANT ALL ON FUNCTION public.setup_rls_policies(ignore_tables text[]) TO service_role;


--
-- Name: FUNCTION update_updated_at_column(); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.update_updated_at_column() TO anon;
GRANT ALL ON FUNCTION public.update_updated_at_column() TO authenticated;
GRANT ALL ON FUNCTION public.update_updated_at_column() TO service_role;


--
-- Name: FUNCTION validate_role(role_name text); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.validate_role(role_name text) TO anon;
GRANT ALL ON FUNCTION public.validate_role(role_name text) TO authenticated;
GRANT ALL ON FUNCTION public.validate_role(role_name text) TO service_role;


--
-- Name: FUNCTION apply_rls(wal jsonb, max_record_bytes integer); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO postgres;
GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO anon;
GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO authenticated;
GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO service_role;
GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO supabase_realtime_admin;


--
-- Name: FUNCTION build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO postgres;
GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO anon;
GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO authenticated;
GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO service_role;
GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO supabase_realtime_admin;


--
-- Name: FUNCTION "cast"(val text, type_ regtype); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO postgres;
GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO dashboard_user;
GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO anon;
GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO authenticated;
GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO service_role;
GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO supabase_realtime_admin;


--
-- Name: FUNCTION check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO postgres;
GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO anon;
GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO authenticated;
GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO service_role;
GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO supabase_realtime_admin;


--
-- Name: FUNCTION is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO postgres;
GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO anon;
GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO authenticated;
GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO service_role;
GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO supabase_realtime_admin;


--
-- Name: FUNCTION list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO postgres;
GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO anon;
GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO authenticated;
GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO service_role;
GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO supabase_realtime_admin;


--
-- Name: FUNCTION quote_wal2json(entity regclass); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO postgres;
GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO anon;
GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO authenticated;
GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO service_role;
GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO supabase_realtime_admin;


--
-- Name: FUNCTION subscription_check_filters(); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO postgres;
GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO dashboard_user;
GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO anon;
GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO authenticated;
GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO service_role;
GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO supabase_realtime_admin;


--
-- Name: FUNCTION to_regrole(role_name text); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO postgres;
GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO anon;
GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO authenticated;
GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO service_role;
GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO supabase_realtime_admin;


--
-- Name: FUNCTION topic(); Type: ACL; Schema: realtime; Owner: supabase_realtime_admin
--

GRANT ALL ON FUNCTION realtime.topic() TO postgres;
GRANT ALL ON FUNCTION realtime.topic() TO dashboard_user;


--
-- Name: FUNCTION http_request(); Type: ACL; Schema: supabase_functions; Owner: supabase_functions_admin
--

REVOKE ALL ON FUNCTION supabase_functions.http_request() FROM PUBLIC;
GRANT ALL ON FUNCTION supabase_functions.http_request() TO postgres;
GRANT ALL ON FUNCTION supabase_functions.http_request() TO anon;
GRANT ALL ON FUNCTION supabase_functions.http_request() TO authenticated;
GRANT ALL ON FUNCTION supabase_functions.http_request() TO service_role;


--
-- Name: TABLE audit_log_entries; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.audit_log_entries TO dashboard_user;
GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.audit_log_entries TO postgres;
GRANT SELECT ON TABLE auth.audit_log_entries TO postgres WITH GRANT OPTION;


--
-- Name: TABLE flow_state; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.flow_state TO postgres;
GRANT SELECT ON TABLE auth.flow_state TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.flow_state TO dashboard_user;


--
-- Name: TABLE identities; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.identities TO postgres;
GRANT SELECT ON TABLE auth.identities TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.identities TO dashboard_user;


--
-- Name: TABLE instances; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.instances TO dashboard_user;
GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.instances TO postgres;
GRANT SELECT ON TABLE auth.instances TO postgres WITH GRANT OPTION;


--
-- Name: TABLE mfa_amr_claims; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.mfa_amr_claims TO postgres;
GRANT SELECT ON TABLE auth.mfa_amr_claims TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.mfa_amr_claims TO dashboard_user;


--
-- Name: TABLE mfa_challenges; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.mfa_challenges TO postgres;
GRANT SELECT ON TABLE auth.mfa_challenges TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.mfa_challenges TO dashboard_user;


--
-- Name: TABLE mfa_factors; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.mfa_factors TO postgres;
GRANT SELECT ON TABLE auth.mfa_factors TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.mfa_factors TO dashboard_user;


--
-- Name: TABLE one_time_tokens; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.one_time_tokens TO postgres;
GRANT SELECT ON TABLE auth.one_time_tokens TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.one_time_tokens TO dashboard_user;


--
-- Name: TABLE refresh_tokens; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.refresh_tokens TO dashboard_user;
GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.refresh_tokens TO postgres;
GRANT SELECT ON TABLE auth.refresh_tokens TO postgres WITH GRANT OPTION;


--
-- Name: SEQUENCE refresh_tokens_id_seq; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON SEQUENCE auth.refresh_tokens_id_seq TO dashboard_user;
GRANT ALL ON SEQUENCE auth.refresh_tokens_id_seq TO postgres;


--
-- Name: TABLE saml_providers; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.saml_providers TO postgres;
GRANT SELECT ON TABLE auth.saml_providers TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.saml_providers TO dashboard_user;


--
-- Name: TABLE saml_relay_states; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.saml_relay_states TO postgres;
GRANT SELECT ON TABLE auth.saml_relay_states TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.saml_relay_states TO dashboard_user;


--
-- Name: TABLE schema_migrations; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.schema_migrations TO dashboard_user;
GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.schema_migrations TO postgres;
GRANT SELECT ON TABLE auth.schema_migrations TO postgres WITH GRANT OPTION;


--
-- Name: TABLE sessions; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.sessions TO postgres;
GRANT SELECT ON TABLE auth.sessions TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.sessions TO dashboard_user;


--
-- Name: TABLE sso_domains; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.sso_domains TO postgres;
GRANT SELECT ON TABLE auth.sso_domains TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.sso_domains TO dashboard_user;


--
-- Name: TABLE sso_providers; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.sso_providers TO postgres;
GRANT SELECT ON TABLE auth.sso_providers TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.sso_providers TO dashboard_user;


--
-- Name: TABLE users; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.users TO dashboard_user;
GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.users TO postgres;
GRANT SELECT ON TABLE auth.users TO postgres WITH GRANT OPTION;


--
-- Name: TABLE pg_stat_statements; Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON TABLE extensions.pg_stat_statements TO postgres WITH GRANT OPTION;


--
-- Name: TABLE pg_stat_statements_info; Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON TABLE extensions.pg_stat_statements_info TO postgres WITH GRANT OPTION;


--
-- Name: SEQUENCE seq_schema_version; Type: ACL; Schema: graphql; Owner: supabase_admin
--

GRANT ALL ON SEQUENCE graphql.seq_schema_version TO postgres;
GRANT ALL ON SEQUENCE graphql.seq_schema_version TO anon;
GRANT ALL ON SEQUENCE graphql.seq_schema_version TO authenticated;
GRANT ALL ON SEQUENCE graphql.seq_schema_version TO service_role;


--
-- Name: TABLE decrypted_key; Type: ACL; Schema: pgsodium; Owner: supabase_admin
--

GRANT ALL ON TABLE pgsodium.decrypted_key TO pgsodium_keyholder;


--
-- Name: TABLE masking_rule; Type: ACL; Schema: pgsodium; Owner: supabase_admin
--

GRANT ALL ON TABLE pgsodium.masking_rule TO pgsodium_keyholder;


--
-- Name: TABLE mask_columns; Type: ACL; Schema: pgsodium; Owner: supabase_admin
--

GRANT ALL ON TABLE pgsodium.mask_columns TO pgsodium_keyholder;


--
-- Name: TABLE _teachertotimetable; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public._teachertotimetable TO anon;
GRANT ALL ON TABLE public._teachertotimetable TO authenticated;
GRANT ALL ON TABLE public._teachertotimetable TO service_role;
GRANT SELECT ON TABLE public._teachertotimetable TO student;
GRANT SELECT,INSERT,UPDATE ON TABLE public._teachertotimetable TO teacher;
GRANT ALL ON TABLE public._teachertotimetable TO adm;


--
-- Name: TABLE academic_year; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.academic_year TO anon;
GRANT ALL ON TABLE public.academic_year TO authenticated;
GRANT ALL ON TABLE public.academic_year TO service_role;
GRANT SELECT ON TABLE public.academic_year TO student;
GRANT SELECT,INSERT,UPDATE ON TABLE public.academic_year TO teacher;
GRANT ALL ON TABLE public.academic_year TO adm;


--
-- Name: TABLE academic_year_template; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.academic_year_template TO anon;
GRANT ALL ON TABLE public.academic_year_template TO authenticated;
GRANT ALL ON TABLE public.academic_year_template TO service_role;
GRANT SELECT ON TABLE public.academic_year_template TO student;
GRANT SELECT,INSERT,UPDATE ON TABLE public.academic_year_template TO teacher;
GRANT ALL ON TABLE public.academic_year_template TO adm;


--
-- Name: TABLE attendance; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.attendance TO anon;
GRANT ALL ON TABLE public.attendance TO authenticated;
GRANT ALL ON TABLE public.attendance TO service_role;
GRANT SELECT ON TABLE public.attendance TO student;
GRANT SELECT,INSERT,UPDATE ON TABLE public.attendance TO teacher;
GRANT ALL ON TABLE public.attendance TO adm;


--
-- Name: TABLE class_session; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.class_session TO anon;
GRANT ALL ON TABLE public.class_session TO authenticated;
GRANT ALL ON TABLE public.class_session TO service_role;
GRANT SELECT ON TABLE public.class_session TO student;
GRANT SELECT,INSERT,UPDATE ON TABLE public.class_session TO teacher;
GRANT ALL ON TABLE public.class_session TO adm;


--
-- Name: TABLE classroom; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.classroom TO anon;
GRANT ALL ON TABLE public.classroom TO authenticated;
GRANT ALL ON TABLE public.classroom TO service_role;
GRANT SELECT ON TABLE public.classroom TO student;
GRANT SELECT,INSERT,UPDATE ON TABLE public.classroom TO teacher;
GRANT ALL ON TABLE public.classroom TO adm;


--
-- Name: TABLE course; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.course TO anon;
GRANT ALL ON TABLE public.course TO authenticated;
GRANT ALL ON TABLE public.course TO service_role;
GRANT SELECT ON TABLE public.course TO student;
GRANT SELECT,INSERT,UPDATE ON TABLE public.course TO teacher;
GRANT ALL ON TABLE public.course TO adm;


--
-- Name: TABLE discipline; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.discipline TO anon;
GRANT ALL ON TABLE public.discipline TO authenticated;
GRANT ALL ON TABLE public.discipline TO service_role;
GRANT SELECT ON TABLE public.discipline TO student;
GRANT SELECT,INSERT,UPDATE ON TABLE public.discipline TO teacher;
GRANT ALL ON TABLE public.discipline TO adm;


--
-- Name: TABLE document; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.document TO anon;
GRANT ALL ON TABLE public.document TO authenticated;
GRANT ALL ON TABLE public.document TO service_role;
GRANT SELECT ON TABLE public.document TO student;
GRANT SELECT,INSERT,UPDATE ON TABLE public.document TO teacher;
GRANT ALL ON TABLE public.document TO adm;


--
-- Name: TABLE enrollment; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.enrollment TO anon;
GRANT ALL ON TABLE public.enrollment TO authenticated;
GRANT ALL ON TABLE public.enrollment TO service_role;
GRANT SELECT ON TABLE public.enrollment TO student;
GRANT SELECT,INSERT,UPDATE ON TABLE public.enrollment TO teacher;
GRANT ALL ON TABLE public.enrollment TO adm;


--
-- Name: TABLE grade; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.grade TO anon;
GRANT ALL ON TABLE public.grade TO authenticated;
GRANT ALL ON TABLE public.grade TO service_role;
GRANT SELECT ON TABLE public.grade TO student;
GRANT SELECT,INSERT,UPDATE ON TABLE public.grade TO teacher;
GRANT ALL ON TABLE public.grade TO adm;


--
-- Name: TABLE holidays; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.holidays TO anon;
GRANT ALL ON TABLE public.holidays TO authenticated;
GRANT ALL ON TABLE public.holidays TO service_role;
GRANT SELECT ON TABLE public.holidays TO student;
GRANT SELECT,INSERT,UPDATE ON TABLE public.holidays TO teacher;
GRANT ALL ON TABLE public.holidays TO adm;


--
-- Name: TABLE institution; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.institution TO anon;
GRANT ALL ON TABLE public.institution TO authenticated;
GRANT ALL ON TABLE public.institution TO service_role;
GRANT SELECT ON TABLE public.institution TO student;
GRANT SELECT,INSERT,UPDATE ON TABLE public.institution TO teacher;
GRANT ALL ON TABLE public.institution TO adm;


--
-- Name: TABLE role; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.role TO anon;
GRANT ALL ON TABLE public.role TO authenticated;
GRANT ALL ON TABLE public.role TO service_role;
GRANT SELECT ON TABLE public.role TO student;
GRANT SELECT,INSERT,UPDATE ON TABLE public.role TO teacher;
GRANT ALL ON TABLE public.role TO adm;


--
-- Name: TABLE role_permission; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.role_permission TO anon;
GRANT ALL ON TABLE public.role_permission TO authenticated;
GRANT ALL ON TABLE public.role_permission TO service_role;
GRANT SELECT ON TABLE public.role_permission TO student;
GRANT SELECT,INSERT,UPDATE ON TABLE public.role_permission TO teacher;
GRANT ALL ON TABLE public.role_permission TO adm;


--
-- Name: TABLE school; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.school TO anon;
GRANT ALL ON TABLE public.school TO authenticated;
GRANT ALL ON TABLE public.school TO service_role;
GRANT SELECT ON TABLE public.school TO student;
GRANT SELECT,INSERT,UPDATE ON TABLE public.school TO teacher;
GRANT ALL ON TABLE public.school TO adm;


--
-- Name: TABLE series; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.series TO anon;
GRANT ALL ON TABLE public.series TO authenticated;
GRANT ALL ON TABLE public.series TO service_role;
GRANT SELECT ON TABLE public.series TO student;
GRANT SELECT,INSERT,UPDATE ON TABLE public.series TO teacher;
GRANT ALL ON TABLE public.series TO adm;


--
-- Name: TABLE student; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.student TO anon;
GRANT ALL ON TABLE public.student TO authenticated;
GRANT ALL ON TABLE public.student TO service_role;
GRANT SELECT ON TABLE public.student TO student;
GRANT SELECT,INSERT,UPDATE ON TABLE public.student TO teacher;
GRANT ALL ON TABLE public.student TO adm;


--
-- Name: TABLE teacher; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.teacher TO anon;
GRANT ALL ON TABLE public.teacher TO authenticated;
GRANT ALL ON TABLE public.teacher TO service_role;
GRANT SELECT ON TABLE public.teacher TO student;
GRANT SELECT,INSERT,UPDATE ON TABLE public.teacher TO teacher;
GRANT ALL ON TABLE public.teacher TO adm;


--
-- Name: TABLE teacher_to_timetable; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.teacher_to_timetable TO anon;
GRANT ALL ON TABLE public.teacher_to_timetable TO authenticated;
GRANT ALL ON TABLE public.teacher_to_timetable TO service_role;
GRANT SELECT ON TABLE public.teacher_to_timetable TO student;
GRANT SELECT,INSERT,UPDATE ON TABLE public.teacher_to_timetable TO teacher;
GRANT ALL ON TABLE public.teacher_to_timetable TO adm;


--
-- Name: TABLE timetable; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.timetable TO anon;
GRANT ALL ON TABLE public.timetable TO authenticated;
GRANT ALL ON TABLE public.timetable TO service_role;
GRANT SELECT ON TABLE public.timetable TO student;
GRANT SELECT,INSERT,UPDATE ON TABLE public.timetable TO teacher;
GRANT ALL ON TABLE public.timetable TO adm;


--
-- Name: TABLE timetable_school; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.timetable_school TO anon;
GRANT ALL ON TABLE public.timetable_school TO authenticated;
GRANT ALL ON TABLE public.timetable_school TO service_role;
GRANT SELECT ON TABLE public.timetable_school TO student;
GRANT SELECT,INSERT,UPDATE ON TABLE public.timetable_school TO teacher;
GRANT ALL ON TABLE public.timetable_school TO adm;


--
-- Name: TABLE user_role; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.user_role TO anon;
GRANT ALL ON TABLE public.user_role TO authenticated;
GRANT ALL ON TABLE public.user_role TO service_role;
GRANT SELECT ON TABLE public.user_role TO student;
GRANT SELECT,INSERT,UPDATE ON TABLE public.user_role TO teacher;
GRANT ALL ON TABLE public.user_role TO adm;


--
-- Name: TABLE messages; Type: ACL; Schema: realtime; Owner: supabase_realtime_admin
--

GRANT ALL ON TABLE realtime.messages TO postgres;
GRANT ALL ON TABLE realtime.messages TO dashboard_user;
GRANT SELECT,INSERT,UPDATE ON TABLE realtime.messages TO anon;
GRANT SELECT,INSERT,UPDATE ON TABLE realtime.messages TO authenticated;
GRANT SELECT,INSERT,UPDATE ON TABLE realtime.messages TO service_role;


--
-- Name: SEQUENCE messages_id_seq; Type: ACL; Schema: realtime; Owner: supabase_realtime_admin
--

GRANT ALL ON SEQUENCE realtime.messages_id_seq TO postgres;
GRANT ALL ON SEQUENCE realtime.messages_id_seq TO dashboard_user;
GRANT USAGE ON SEQUENCE realtime.messages_id_seq TO anon;
GRANT USAGE ON SEQUENCE realtime.messages_id_seq TO authenticated;
GRANT USAGE ON SEQUENCE realtime.messages_id_seq TO service_role;


--
-- Name: TABLE schema_migrations; Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON TABLE realtime.schema_migrations TO postgres;
GRANT ALL ON TABLE realtime.schema_migrations TO dashboard_user;
GRANT SELECT ON TABLE realtime.schema_migrations TO anon;
GRANT SELECT ON TABLE realtime.schema_migrations TO authenticated;
GRANT SELECT ON TABLE realtime.schema_migrations TO service_role;
GRANT ALL ON TABLE realtime.schema_migrations TO supabase_realtime_admin;


--
-- Name: TABLE subscription; Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON TABLE realtime.subscription TO postgres;
GRANT ALL ON TABLE realtime.subscription TO dashboard_user;
GRANT SELECT ON TABLE realtime.subscription TO anon;
GRANT SELECT ON TABLE realtime.subscription TO authenticated;
GRANT SELECT ON TABLE realtime.subscription TO service_role;
GRANT ALL ON TABLE realtime.subscription TO supabase_realtime_admin;


--
-- Name: SEQUENCE subscription_id_seq; Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON SEQUENCE realtime.subscription_id_seq TO postgres;
GRANT ALL ON SEQUENCE realtime.subscription_id_seq TO dashboard_user;
GRANT USAGE ON SEQUENCE realtime.subscription_id_seq TO anon;
GRANT USAGE ON SEQUENCE realtime.subscription_id_seq TO authenticated;
GRANT USAGE ON SEQUENCE realtime.subscription_id_seq TO service_role;
GRANT ALL ON SEQUENCE realtime.subscription_id_seq TO supabase_realtime_admin;


--
-- Name: TABLE buckets; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON TABLE storage.buckets TO anon;
GRANT ALL ON TABLE storage.buckets TO authenticated;
GRANT ALL ON TABLE storage.buckets TO service_role;
GRANT ALL ON TABLE storage.buckets TO postgres;


--
-- Name: TABLE migrations; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON TABLE storage.migrations TO anon;
GRANT ALL ON TABLE storage.migrations TO authenticated;
GRANT ALL ON TABLE storage.migrations TO service_role;
GRANT ALL ON TABLE storage.migrations TO postgres;


--
-- Name: TABLE objects; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON TABLE storage.objects TO anon;
GRANT ALL ON TABLE storage.objects TO authenticated;
GRANT ALL ON TABLE storage.objects TO service_role;
GRANT ALL ON TABLE storage.objects TO postgres;


--
-- Name: TABLE s3_multipart_uploads; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON TABLE storage.s3_multipart_uploads TO service_role;
GRANT SELECT ON TABLE storage.s3_multipart_uploads TO authenticated;
GRANT SELECT ON TABLE storage.s3_multipart_uploads TO anon;


--
-- Name: TABLE s3_multipart_uploads_parts; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON TABLE storage.s3_multipart_uploads_parts TO service_role;
GRANT SELECT ON TABLE storage.s3_multipart_uploads_parts TO authenticated;
GRANT SELECT ON TABLE storage.s3_multipart_uploads_parts TO anon;


--
-- Name: TABLE hooks; Type: ACL; Schema: supabase_functions; Owner: supabase_functions_admin
--

GRANT ALL ON TABLE supabase_functions.hooks TO postgres;
GRANT ALL ON TABLE supabase_functions.hooks TO anon;
GRANT ALL ON TABLE supabase_functions.hooks TO authenticated;
GRANT ALL ON TABLE supabase_functions.hooks TO service_role;


--
-- Name: SEQUENCE hooks_id_seq; Type: ACL; Schema: supabase_functions; Owner: supabase_functions_admin
--

GRANT ALL ON SEQUENCE supabase_functions.hooks_id_seq TO postgres;
GRANT ALL ON SEQUENCE supabase_functions.hooks_id_seq TO anon;
GRANT ALL ON SEQUENCE supabase_functions.hooks_id_seq TO authenticated;
GRANT ALL ON SEQUENCE supabase_functions.hooks_id_seq TO service_role;


--
-- Name: TABLE migrations; Type: ACL; Schema: supabase_functions; Owner: supabase_functions_admin
--

GRANT ALL ON TABLE supabase_functions.migrations TO postgres;
GRANT ALL ON TABLE supabase_functions.migrations TO anon;
GRANT ALL ON TABLE supabase_functions.migrations TO authenticated;
GRANT ALL ON TABLE supabase_functions.migrations TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: auth; Owner: supabase_auth_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON SEQUENCES TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: auth; Owner: supabase_auth_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON FUNCTIONS TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: auth; Owner: supabase_auth_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON TABLES TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: extensions; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA extensions GRANT ALL ON SEQUENCES TO postgres WITH GRANT OPTION;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: extensions; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA extensions GRANT ALL ON FUNCTIONS TO postgres WITH GRANT OPTION;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: extensions; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA extensions GRANT ALL ON TABLES TO postgres WITH GRANT OPTION;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: graphql; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON SEQUENCES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: graphql; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON FUNCTIONS TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON FUNCTIONS TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON FUNCTIONS TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: graphql; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON TABLES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: graphql_public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON SEQUENCES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: graphql_public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON FUNCTIONS TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON FUNCTIONS TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON FUNCTIONS TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: graphql_public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON TABLES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: pgsodium; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA pgsodium GRANT ALL ON SEQUENCES TO pgsodium_keyholder;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: pgsodium; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA pgsodium GRANT ALL ON TABLES TO pgsodium_keyholder;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: pgsodium_masks; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA pgsodium_masks GRANT ALL ON SEQUENCES TO pgsodium_keyiduser;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: pgsodium_masks; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA pgsodium_masks GRANT ALL ON FUNCTIONS TO pgsodium_keyiduser;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: pgsodium_masks; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA pgsodium_masks GRANT ALL ON TABLES TO pgsodium_keyiduser;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON TABLES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: realtime; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON SEQUENCES TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: realtime; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON FUNCTIONS TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: realtime; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON TABLES TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: storage; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON SEQUENCES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: storage; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON FUNCTIONS TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON FUNCTIONS TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON FUNCTIONS TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: storage; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON TABLES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: supabase_functions; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA supabase_functions GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA supabase_functions GRANT ALL ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA supabase_functions GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA supabase_functions GRANT ALL ON SEQUENCES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: supabase_functions; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA supabase_functions GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA supabase_functions GRANT ALL ON FUNCTIONS TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA supabase_functions GRANT ALL ON FUNCTIONS TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA supabase_functions GRANT ALL ON FUNCTIONS TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: supabase_functions; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA supabase_functions GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA supabase_functions GRANT ALL ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA supabase_functions GRANT ALL ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA supabase_functions GRANT ALL ON TABLES TO service_role;


--
-- Name: issue_graphql_placeholder; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER issue_graphql_placeholder ON sql_drop
         WHEN TAG IN ('DROP EXTENSION')
   EXECUTE FUNCTION extensions.set_graphql_placeholder();


ALTER EVENT TRIGGER issue_graphql_placeholder OWNER TO supabase_admin;

--
-- Name: issue_pg_cron_access; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER issue_pg_cron_access ON ddl_command_end
         WHEN TAG IN ('CREATE EXTENSION')
   EXECUTE FUNCTION extensions.grant_pg_cron_access();


ALTER EVENT TRIGGER issue_pg_cron_access OWNER TO supabase_admin;

--
-- Name: issue_pg_graphql_access; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER issue_pg_graphql_access ON ddl_command_end
         WHEN TAG IN ('CREATE FUNCTION')
   EXECUTE FUNCTION extensions.grant_pg_graphql_access();


ALTER EVENT TRIGGER issue_pg_graphql_access OWNER TO supabase_admin;

--
-- Name: issue_pg_net_access; Type: EVENT TRIGGER; Schema: -; Owner: postgres
--

CREATE EVENT TRIGGER issue_pg_net_access ON ddl_command_end
         WHEN TAG IN ('CREATE EXTENSION')
   EXECUTE FUNCTION extensions.grant_pg_net_access();


ALTER EVENT TRIGGER issue_pg_net_access OWNER TO postgres;

--
-- Name: pgrst_ddl_watch; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER pgrst_ddl_watch ON ddl_command_end
   EXECUTE FUNCTION extensions.pgrst_ddl_watch();


ALTER EVENT TRIGGER pgrst_ddl_watch OWNER TO supabase_admin;

--
-- Name: pgrst_drop_watch; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER pgrst_drop_watch ON sql_drop
   EXECUTE FUNCTION extensions.pgrst_drop_watch();


ALTER EVENT TRIGGER pgrst_drop_watch OWNER TO supabase_admin;

--
-- PostgreSQL database dump complete
--

