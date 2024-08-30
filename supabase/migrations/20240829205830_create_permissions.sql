-- função para retornar header especifico
CREATE OR REPLACE FUNCTION get_header(item text) RETURNS text
    LANGUAGE sql
    STABLE AS
$$
SELECT current_setting('request.headers', true)::jsonb ->> item;
$$;

-- Verifica se usuario tem acesso à escola
CREATE OR REPLACE FUNCTION has_school_access() RETURNS boolean AS
$$
SELECT EXISTS (SELECT 1
               FROM user_school
               WHERE user_id = auth.uid()
                 AND school_id = get_header('xschoolid')::uuid);
$$ LANGUAGE sql SECURITY DEFINER;

-- Verifica se usuario tem role x na escola
CREATE OR REPLACE FUNCTION has_school_role(required_role text) RETURNS boolean AS
$$
SELECT EXISTS (SELECT 1
               FROM user_school
               WHERE user_id = auth.uid()
                 AND school_id = get_header('xschoolid')::uuid
                 AND required_role = ANY (roles));
$$ LANGUAGE sql SECURITY DEFINER;


CREATE POLICY school_isolation_policy ON course
    USING (
    course.school_id = get_header('xschoolid')::uuid
        AND has_school_access()
    )
    WITH CHECK (
    course.school_id = get_header('xschoolid')::uuid
        AND has_school_access()
    );


create policy "Enable read access for all users"
    on "public"."institution"
    as PERMISSIVE for SELECT to public using (true);