-- função para retornar header especifico
CREATE OR REPLACE FUNCTION get_header(item text) RETURNS text
    LANGUAGE sql
    STABLE AS
$$
SELECT current_setting('request.headers', true)::jsonb ->> item;
$$;

-- Escola atual
CREATE OR REPLACE FUNCTION current_school() RETURNS uuid AS
$$
SELECT get_header('xschoolid')::uuid;
$$ LANGUAGE sql SECURITY DEFINER;

-- Minhas Escolas
CREATE OR REPLACE FUNCTION my_schools()
    RETURNS SETOF uuid AS
$$
SELECT school_id
FROM user_role
WHERE user_id = auth.uid();
$$ LANGUAGE sql SECURITY DEFINER;


-- Permissões

CREATE OR REPLACE FUNCTION can_select(p_table varchar) RETURNS boolean AS
$$
SELECT EXISTS (SELECT 1
               FROM role_permission AS rp
                        join user_role ur on ur.role_id = rp.role_id
               WHERE ur.user_id = auth.uid()
                 AND rp.school_id = ur.school_id
                 AND rp."table" = p_table
                 AND rp.school_id = current_school()
                 AND can_select = true);
$$ LANGUAGE sql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION can_insert(p_table varchar) RETURNS boolean AS
$$
SELECT EXISTS (SELECT 1
               FROM role_permission AS rp
                        join user_role ur on ur.role_id = rp.role_id
               WHERE ur.user_id = auth.uid()
                 AND rp.school_id = ur.school_id
                 AND rp."table" = p_table
                 AND rp.school_id = current_school()
                 AND rp.can_insert = true);
$$ LANGUAGE sql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION can_update(p_table varchar) RETURNS boolean AS
$$
SELECT EXISTS (SELECT 1
               FROM role_permission AS rp
                        join user_role ur on ur.role_id = rp.role_id
               WHERE ur.user_id = auth.uid()
                 AND rp.school_id = ur.school_id
                 AND rp."table" = p_table
                 AND rp.school_id = current_school()
                 AND can_update = true);
$$ LANGUAGE sql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION can_delete(p_table varchar) RETURNS boolean AS
$$
SELECT EXISTS (SELECT 1
               FROM role_permission AS rp
                        join user_role ur on ur.role_id = rp.role_id
               WHERE ur.user_id = auth.uid()
                 AND rp.school_id = ur.school_id
                 AND rp."table" = p_table
                 AND rp.school_id = current_school()
                 AND can_delete = true);
$$ LANGUAGE sql SECURITY DEFINER;


-- -- SELECT policy
-- CREATE POLICY course_select_policy ON course
--     FOR SELECT USING (course.school_id = current_school() AND can_select('course'));
--
-- -- INSERT policy
-- CREATE POLICY course_insert_policy ON course
--     FOR INSERT WITH CHECK (course.school_id = current_school() AND can_insert('course'));
--
-- -- UPDATE policy
-- CREATE POLICY course_update_policy ON course
--     FOR UPDATE USING (course.school_id = current_school() AND can_update('course'))
--     WITH CHECK (course.school_id = current_school() AND can_update('course'));
--
-- -- DELETE policy
-- CREATE POLICY course_delete_policy ON course
--     FOR DELETE USING (course.school_id = current_school() AND can_delete('course'));

CREATE OR REPLACE FUNCTION setup_rls_policies(ignore_tables text[] DEFAULT '{}') RETURNS void AS
$$
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
$$ LANGUAGE plpgsql;

-- passar no parametro as tabelas para ignorar e não criar rls
SELECT setup_rls_policies(ARRAY ['institution','school']);


-- SELECT policy
CREATE POLICY school_select_policy
    ON school
    FOR SELECT
    USING (school.id IN (SELECT my_schools()));

-- INSERT policy
CREATE POLICY school_insert_policy ON school
    FOR INSERT WITH CHECK (school.id = current_school() AND can_insert('school'));

-- UPDATE policy
CREATE POLICY school_update_policy ON school
    FOR UPDATE USING (school.id = current_school() AND can_update('school'))
    WITH CHECK (school.id = current_school() AND can_update('school'));

-- DELETE policy
CREATE POLICY school_delete_policy ON school
    FOR DELETE USING (school.id = current_school() AND can_delete('school'));

-- Habilitando acesso publico à institution
create policy "Enable read access for all users"
    on "public"."institution"
    as PERMISSIVE for SELECT to public using (true);