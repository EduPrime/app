CREATE ROLE student;
CREATE ROLE teacher;
CREATE ROLE adm;

GRANT teacher TO postgres;
GRANT student TO postgres;
GRANT adm TO postgres;

GRANT SELECT ON ALL TABLES IN SCHEMA public TO student;
GRANT SELECT, INSERT, UPDATE ON ALL TABLES IN SCHEMA public TO teacher;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO adm;

CREATE OR REPLACE FUNCTION validate_role(role_name TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN role_name IN ('adm', 'teacher', 'student');
END;
$$ LANGUAGE plpgsql;
