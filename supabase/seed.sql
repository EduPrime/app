SET session_replication_role = replica;

--
-- PostgreSQL database dump
--

-- Dumped from database version 15.6
-- Dumped by pg_dump version 15.7 (Ubuntu 15.7-1.pgdg20.04+1)

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
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."audit_log_entries" ("instance_id", "id", "payload", "created_at", "ip_address") VALUES
	('00000000-0000-0000-0000-000000000000', 'e2e245d5-41b1-45a5-9a5c-2f53c08700a4', '{"action":"user_confirmation_requested","actor_id":"46d54882-eed8-448f-bf3f-847125971e9e","actor_username":"balkishandhaker97@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2024-08-29 16:11:25.473979+00', ''),
	('00000000-0000-0000-0000-000000000000', 'dcdff013-2d13-4dbc-b3a2-49cf29efcc0e', '{"action":"user_signedup","actor_id":"46d54882-eed8-448f-bf3f-847125971e9e","actor_username":"balkishandhaker97@gmail.com","actor_via_sso":false,"log_type":"team"}', '2024-08-29 16:15:32.849899+00', ''),
	('00000000-0000-0000-0000-000000000000', '2fd35b6c-a791-4fe7-b87e-66f3baf079ea', '{"action":"login","actor_id":"46d54882-eed8-448f-bf3f-847125971e9e","actor_username":"balkishandhaker97@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-08-29 16:15:51.561441+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f219859a-f9c5-44fc-b121-1af352c7bc93', '{"action":"token_refreshed","actor_id":"46d54882-eed8-448f-bf3f-847125971e9e","actor_username":"balkishandhaker97@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-08-29 17:20:07.860488+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a8f86752-d05c-480d-849e-3140b2233c12', '{"action":"token_revoked","actor_id":"46d54882-eed8-448f-bf3f-847125971e9e","actor_username":"balkishandhaker97@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-08-29 17:20:07.861651+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a67d47eb-99ec-4c72-a7db-846e8f57a920', '{"action":"token_refreshed","actor_id":"46d54882-eed8-448f-bf3f-847125971e9e","actor_username":"balkishandhaker97@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-08-29 17:42:02.078984+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ed5babc1-2c9c-4e3f-a368-c3738dcb3817', '{"action":"token_refreshed","actor_id":"46d54882-eed8-448f-bf3f-847125971e9e","actor_username":"balkishandhaker97@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-08-31 04:29:13.129453+00', ''),
	('00000000-0000-0000-0000-000000000000', '792ee38b-4fe9-4bd2-ba8b-0434b72a0af1', '{"action":"token_revoked","actor_id":"46d54882-eed8-448f-bf3f-847125971e9e","actor_username":"balkishandhaker97@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-08-31 04:29:13.132321+00', '');


--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."users" ("instance_id", "id", "aud", "role", "email", "encrypted_password", "email_confirmed_at", "invited_at", "confirmation_token", "confirmation_sent_at", "recovery_token", "recovery_sent_at", "email_change_token_new", "email_change", "email_change_sent_at", "last_sign_in_at", "raw_app_meta_data", "raw_user_meta_data", "is_super_admin", "created_at", "updated_at", "phone", "phone_confirmed_at", "phone_change", "phone_change_token", "phone_change_sent_at", "email_change_token_current", "email_change_confirm_status", "banned_until", "reauthentication_token", "reauthentication_sent_at", "is_sso_user", "deleted_at", "is_anonymous") VALUES
	('00000000-0000-0000-0000-000000000000', '46d54882-eed8-448f-bf3f-847125971e9e', 'authenticated', 'authenticated', 'balkishandhaker97@gmail.com', '$2a$10$lZ3rzFwDtH.QcNd14M3dtO9U5XwpY2d2cL/gpqrWgZs2NjRa.5rim', '2024-08-29 16:15:32.850867+00', NULL, '', '2024-08-29 16:11:25.481577+00', '', NULL, '', '', NULL, '2024-08-29 16:15:51.562223+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "46d54882-eed8-448f-bf3f-847125971e9e", "email": "balkishandhaker97@gmail.com", "email_verified": false, "phone_verified": false}', NULL, '2024-08-29 16:11:25.45387+00', '2024-08-31 04:29:13.136487+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false);


--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."identities" ("provider_id", "user_id", "identity_data", "provider", "last_sign_in_at", "created_at", "updated_at", "id") VALUES
	('46d54882-eed8-448f-bf3f-847125971e9e', '46d54882-eed8-448f-bf3f-847125971e9e', '{"sub": "46d54882-eed8-448f-bf3f-847125971e9e", "email": "balkishandhaker97@gmail.com", "email_verified": false, "phone_verified": false}', 'email', '2024-08-29 16:11:25.46903+00', '2024-08-29 16:11:25.469087+00', '2024-08-29 16:11:25.469087+00', 'cb27109c-18af-45e3-b02f-677f0ba0bb39');


--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."sessions" ("id", "user_id", "created_at", "updated_at", "factor_id", "aal", "not_after", "refreshed_at", "user_agent", "ip", "tag") VALUES
	('f9c9b89d-e836-4c30-82dc-76f87c50f267', '46d54882-eed8-448f-bf3f-847125971e9e', '2024-08-29 16:15:32.855635+00', '2024-08-29 16:15:32.855635+00', NULL, 'aal1', NULL, NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36', '59.91.130.249', NULL),
	('860c7851-7819-452e-b31b-20a8da3b3744', '46d54882-eed8-448f-bf3f-847125971e9e', '2024-08-29 16:15:51.562314+00', '2024-08-31 04:29:13.142266+00', NULL, 'aal1', NULL, '2024-08-31 04:29:13.141847', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36', '59.184.163.75', NULL);


--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."mfa_amr_claims" ("session_id", "created_at", "updated_at", "authentication_method", "id") VALUES
	('f9c9b89d-e836-4c30-82dc-76f87c50f267', '2024-08-29 16:15:32.869161+00', '2024-08-29 16:15:32.869161+00', 'otp', 'eb86e39b-4d91-413e-9350-1783020e345d'),
	('860c7851-7819-452e-b31b-20a8da3b3744', '2024-08-29 16:15:51.564567+00', '2024-08-29 16:15:51.564567+00', 'password', '0a1f9002-bdb2-4d00-a38c-38798251606f');


--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: one_time_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."refresh_tokens" ("instance_id", "id", "token", "user_id", "revoked", "created_at", "updated_at", "parent", "session_id") VALUES
	('00000000-0000-0000-0000-000000000000', 1, 'KEmJneumepkcB-w6DA7NEA', '46d54882-eed8-448f-bf3f-847125971e9e', false, '2024-08-29 16:15:32.860266+00', '2024-08-29 16:15:32.860266+00', NULL, 'f9c9b89d-e836-4c30-82dc-76f87c50f267'),
	('00000000-0000-0000-0000-000000000000', 2, 'cEqUoATkHjyncxmkQ7vkog', '46d54882-eed8-448f-bf3f-847125971e9e', true, '2024-08-29 16:15:51.563213+00', '2024-08-29 17:20:07.862463+00', NULL, '860c7851-7819-452e-b31b-20a8da3b3744'),
	('00000000-0000-0000-0000-000000000000', 3, 'oD_vJqEtX4rexuiKBRutvg', '46d54882-eed8-448f-bf3f-847125971e9e', true, '2024-08-29 17:20:07.86374+00', '2024-08-31 04:29:13.132968+00', 'cEqUoATkHjyncxmkQ7vkog', '860c7851-7819-452e-b31b-20a8da3b3744'),
	('00000000-0000-0000-0000-000000000000', 4, 'QL7z_psKrjtFJlrG4gokoA', '46d54882-eed8-448f-bf3f-847125971e9e', false, '2024-08-31 04:29:13.135271+00', '2024-08-31 04:29:13.135271+00', 'oD_vJqEtX4rexuiKBRutvg', '860c7851-7819-452e-b31b-20a8da3b3744');


--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: key; Type: TABLE DATA; Schema: pgsodium; Owner: supabase_admin
--



--
-- Data for Name: institution; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."institution" ("id", "name", "address", "city", "state", "postalcode", "phone", "email", "metadata", "user_created", "singleton", "created_at", "deleted_at", "updated_at") VALUES
	('fca0e415-db61-4821-98d7-98a81dd5b273', 'Instituição Educacional Alfa', 'Rua Principal, 123', 'Cidade Alfa', 'PE', '12345-678 ', '(11) 1234-5678', 'alpha@eduprime.chat', NULL, NULL, 1, '2024-10-11 17:47:12.4155+00', NULL, NULL);


--
-- Data for Name: school; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."school" ("id", "name", "address", "city", "state", "postalcode", "school_zone", "phone", "email", "website", "social_network", "institution_id", "active", "abbreviation", "logourl", "created_at", "deleted_at", "updated_at", "user_created") VALUES
	('d5a0d549-b57a-429b-8485-ff81c878932e', 'Colégio Beta', 'Rua Terciária, 789', 'Cidade Beta', 'RJ', '98765-432 ', 'Urbana', '(21) 2345-6789', 'contato@colegiobeta.edu.br', 'http://colegiobeta.edu.br', 'https://www.instagram.com/colegiobeta', 'fca0e415-db61-4821-98d7-98a81dd5b273', true, 'CB', 'http://colegiobeta.edu.br/logo.png', '2024-10-11 17:47:12.4155+00', NULL, '2024-10-11 17:47:12.4155+00', NULL),
	('4ad08e54-ca7d-46a3-891d-7eedd4c118d2', 'Escola Laranja', 'Rua Laranja', 'Laranja', 'LA', '56280-000 ', 'Urbana', '(87) 99999-9999', NULL, NULL, NULL, 'fca0e415-db61-4821-98d7-98a81dd5b273', true, 'ESCLARANJA', NULL, '2024-10-15 12:02:02.420412+00', NULL, NULL, NULL),
	('508701a6-cc45-44c3-bdb7-6ec5dc903771', 'Escola Linux', 'Linux', 'Linux', 'LX', '56280-000 ', 'Urbana', '(87) 77777-7777', NULL, NULL, NULL, 'fca0e415-db61-4821-98d7-98a81dd5b273', true, 'Linux', NULL, '2024-10-21 18:10:26.910987+00', NULL, NULL, NULL),
	('df9c3dba-af99-4140-af2f-dff84ba0cdc2', 'Escola Windows', 'Windows', 'Windows', 'WD', '56280-000 ', 'Rural', '(87) 77777-7777', NULL, NULL, NULL, 'fca0e415-db61-4821-98d7-98a81dd5b273', true, 'ESCWIN', NULL, '2024-10-21 18:11:46.893618+00', NULL, NULL, NULL),
	('9cbc29e9-e89f-4a39-83e4-a3333af2026b', 'Escola Chrome', 'CHROME', 'CHROME', 'CH', '56280-000 ', 'Urbana', '(87) 88888-8888', NULL, NULL, NULL, 'fca0e415-db61-4821-98d7-98a81dd5b273', true, 'ESCCHROME', NULL, '2024-10-21 18:15:49.906039+00', NULL, NULL, NULL),
	('637ad0fc-a224-46ba-9602-9bbd1d97e40f', 'Escola Fundamental Alfa', 'Avenida Secundária, 456', 'Cidade Alfa', 'PE', '12345-678 ', 'Rural', '(11) 87654-3213', 'contato@escolafundamentalalfa.edu.br', 'http://escolafundamentalalfa.edu.br', 'https://www.facebook.com/escolafundamentalalfa', 'fca0e415-db61-4821-98d7-98a81dd5b273', true, 'EFA', 'http://escolafundamentalalfa.edu.br/logo.png', '2024-10-11 17:47:12.4155+00', NULL, '2024-10-11 17:47:12.4155+00', NULL),
	('7b5e9f4a-c5e3-4bb1-84cc-2b6c59de84de', 'Escola Teste', '12', '31', 'ew', '55465-465 ', 'Rural', '(87) 77777-7777', NULL, NULL, NULL, 'fca0e415-db61-4821-98d7-98a81dd5b273', true, 'ESCT', NULL, '2024-10-23 14:11:09.80047+00', NULL, NULL, NULL),
	('064259bf-c53c-419f-b2ee-7a6e149df763', 'Escola Jabuticaba ', 'Rua Jabuticaba', 'Jabuticaba', 'JA', '56280-000 ', 'Urbana', '(87) 99999-9999', 'jabuticaba@hotmail.com', 'https://jabuticaba.com', NULL, 'fca0e415-db61-4821-98d7-98a81dd5b273', true, 'JBT', NULL, '2024-10-15 12:00:59.978441+00', NULL, NULL, NULL),
	('c7a2b2b6-ef67-4c11-b816-cb874eb240ed', 'dsadasdsadas', 'sda', 'ds', 'as', '43434-343 ', 'Rural', '(87) 77777-7777', NULL, NULL, NULL, 'fca0e415-db61-4821-98d7-98a81dd5b273', true, 'sadas', NULL, '2024-10-28 19:04:39.758432+00', '2024-10-28 19:13:14.533+00', NULL, NULL),
	('8f3422c1-540a-4fc7-8076-feef95ea2f6b', 'Danontttttttttttttttttttt', 'dsa', 'das', 'ds', '43434-343 ', 'Rural', '(43) 33333-3333', NULL, NULL, NULL, 'fca0e415-db61-4821-98d7-98a81dd5b273', true, 'dsadas', NULL, '2024-10-28 19:12:12.208226+00', NULL, NULL, NULL);


--
-- Data for Name: course; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."course" ("id", "name", "status", "metadata", "user_created", "created_at", "deleted_at", "updated_at", "teaching_type", "regime_type", "course_modality", "workload", "institution_id", "course_stage", "description", "school_id") VALUES
	('f42f58d1-fcf7-4e68-a5a0-f6ce60f3395a', 'teste', 'Ativo', NULL, NULL, '2024-10-15 17:53:09.050994+00', NULL, NULL, 'Complementar', 'Presencial', 'Ensino Regular', '12', 'fca0e415-db61-4821-98d7-98a81dd5b273', '12', 'Descrição teste', NULL),
	('15c45807-00a1-4b14-8728-a465ac1129c6', 'teste2', 'Ativo', NULL, NULL, '2024-10-15 19:45:57.796846+00', NULL, NULL, 'Complementar', 'EAD', 'Educação Profissional', '4', 'fca0e415-db61-4821-98d7-98a81dd5b273', '4', NULL, NULL),
	('2de38176-3606-456d-b882-8d74a5716c50', 'Ensino Fundamental I', 'Ativo', NULL, NULL, '2024-10-11 17:47:12.4155+00', NULL, NULL, 'Complementar', 'Presencial', 'Ensino Regular', '12', 'fca0e415-db61-4821-98d7-98a81dd5b273', '12', '1º ao 5º ano, foco em Português, Matemática, Ciências, História e Geografia.', '637ad0fc-a224-46ba-9602-9bbd1d97e40f'),
	('62ed76dc-b0a0-4667-b9da-f6fae31688a9', 'Educação Infantil', 'Ativo', NULL, NULL, '2024-10-15 14:02:41.323791+00', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Foco no desenvolvimento cognitivo, social, emocional e motor.
', '637ad0fc-a224-46ba-9602-9bbd1d97e40f'),
	('78d2bfb8-c0cc-459c-a1b4-714dc7c306f0', 'Ensino Fundamental II', 'Ativo', NULL, NULL, '2024-10-11 17:47:12.4155+00', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '6º ao 9º ano, foco em aprofundamento nas ciências, línguas e matemática.', '637ad0fc-a224-46ba-9602-9bbd1d97e40f');


--
-- Data for Name: teacher; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."teacher" ("id", "school_id", "name", "birthdate", "email", "phone", "address", "qualifications", "status", "metadata", "user_created", "created_at", "deleted_at", "updated_at", "showDetails") VALUES
	('ba85b5a3-5afe-47d9-afde-60db3ab440a9', '637ad0fc-a224-46ba-9602-9bbd1d97e40f', 'Prof. João Pereira', '1980-03-15', 'joao.pereira@example.com', '1234567890', 'Rua das Flores, 123, Bairro Central', '[{"end": "2017-12-15", "start": "2015-03-01", "course": "Mestrado em Educação Inovadora", "institution": "Universidade Nova Esperança"}, {"end": "2014-12-10", "start": "2012-01-10", "course": "Licenciatura em Matemática", "institution": "Faculdade de Ciências Exatas"}]', 'Ativo', NULL, NULL, '2024-10-11 17:47:12.4155+00', NULL, NULL, NULL),
	('54aa3d80-c547-4b8d-908f-4017ab7c762d', '637ad0fc-a224-46ba-9602-9bbd1d97e40f', 'Profª. Maria Fernandes', '1975-07-22', 'maria.fernandes@example.com', '0987654321', 'Avenida dos Professores, 456, Bairro Novo', '[{"end": "2004-06-15", "start": "2000-09-01", "course": "Doutorado em Literatura Brasileira", "institution": "Universidade dos Escritores"}, {"end": "1999-11-20", "start": "1995-02-20", "course": "Licenciatura em Letras", "institution": "Instituto Superior de Letras"}]', 'Ativo', NULL, NULL, '2024-10-11 17:47:12.4155+00', NULL, NULL, NULL),
	('67f2e19e-a134-4938-826e-916bdcad5a1c', 'd5a0d549-b57a-429b-8485-ff81c878932e', 'Prof. Paulo Santos', '1990-11-30', 'paulo.santos@example.com', '1122334455', 'Praça da Liberdade, 789, Centro', '[{"end": "2022-09-03", "start": "2018-09-03", "course": "Licenciatura em História", "institution": "Universidade de História e Cultura"}, {"end": "2017-12-15", "start": "2015-01-05", "course": "Curso de Especialização em Ensino de Geografia", "institution": "Faculdade do Saber"}]', 'Ativo', NULL, NULL, '2024-10-11 17:47:12.4155+00', NULL, NULL, NULL),
	('9c91771d-a133-437f-958f-550aa938d91d', 'd5a0d549-b57a-429b-8485-ff81c878932e', 'Profª. Rita Oliveira', '1982-05-12', 'rita.oliveira@example.com', '5566778899', 'Estrada Velha, 1010, Bairro Antigo', '[{"end": "2013-05-30", "start": "2010-08-01", "course": "Mestrado em Ciências Biológicas", "institution": "Instituto de Pesquisa Biológica"}, {"end": "2009-12-20", "start": "2007-03-20", "course": "Bacharelado em Biologia", "institution": "Universidade da Vida"}]', 'Ativo', NULL, NULL, '2024-10-11 17:47:12.4155+00', NULL, NULL, NULL),
	('2cadee1c-2e66-42cf-84f1-747a3b138cb4', '637ad0fc-a224-46ba-9602-9bbd1d97e40f', 'Juranildo Tiririca', '1999-01-01', 'juranildo@juranildo.com', '(87) 77777-7777', NULL, '[]', 'Ativo', NULL, NULL, '2024-10-22 11:53:46.565428+00', NULL, NULL, NULL);


--
-- Data for Name: classroom; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."classroom" ("id", "school_id", "series_id", "institution_id", "course_id", "teacher_id", "maxStudents", "startTime", "startTimeInterval", "endTimeInterval", "endTime", "day_of_week", "name", "period", "status", "abbreviation", "year", "metadata", "user_created", "created_at", "deleted_at", "updated_at") VALUES
	('87ec6805-2da4-49f0-b04d-65060400c2dd', 'd5a0d549-b57a-429b-8485-ff81c878932e', '5a1f3731-fdb6-45c7-963a-8cf679be04b2', 'fca0e415-db61-4821-98d7-98a81dd5b273', '78d2bfb8-c0cc-459c-a1b4-714dc7c306f0', '67f2e19e-a134-4938-826e-916bdcad5a1c', 30, '08:00:00', '08:10:00', '11:50:00', '12:00:00', 'Quarta', 'Turma C', 'Tarde', 'Ativo', NULL, 2024, '{}', NULL, '2024-10-11 17:47:12.4155+00', NULL, NULL),
	('65249faa-3312-4650-bf87-1ff23418034e', '637ad0fc-a224-46ba-9602-9bbd1d97e40f', '07507916-789d-415d-891a-f92a6a841c1e', 'fca0e415-db61-4821-98d7-98a81dd5b273', '2de38176-3606-456d-b882-8d74a5716c50', 'ba85b5a3-5afe-47d9-afde-60db3ab440a9', 55, '08:00:00', '08:10:00', '11:50:00', '12:00:00', 'Segunda', 'Turma A', 'Manhã', 'Ativo', NULL, 2024, '{}', NULL, '2024-10-11 17:47:12.4155+00', NULL, NULL),
	('83c6a600-6bbe-4132-b458-0f094a040a37', '637ad0fc-a224-46ba-9602-9bbd1d97e40f', '07507916-789d-415d-891a-f92a6a841c1e', 'fca0e415-db61-4821-98d7-98a81dd5b273', '2de38176-3606-456d-b882-8d74a5716c50', '2cadee1c-2e66-42cf-84f1-747a3b138cb4', 43, NULL, NULL, NULL, NULL, NULL, 'Turma G', 'Manhã', 'Ativo', 'TMG', 2024, NULL, NULL, '2024-10-23 14:28:21.095745+00', NULL, NULL),
	('ccf423d9-ef57-4e25-b512-aacf8d9ff9b0', '637ad0fc-a224-46ba-9602-9bbd1d97e40f', '07507916-789d-415d-891a-f92a6a841c1e', 'fca0e415-db61-4821-98d7-98a81dd5b273', '2de38176-3606-456d-b882-8d74a5716c50', '9c91771d-a133-437f-958f-550aa938d91d', 43, NULL, NULL, NULL, NULL, NULL, 'Turma T', 'Manhã', 'Suspenso', NULL, 2024, NULL, NULL, '2024-10-24 18:15:53.383485+00', NULL, NULL),
	('c0f246ec-3503-4428-a19a-5499409a2404', '637ad0fc-a224-46ba-9602-9bbd1d97e40f', '07507916-789d-415d-891a-f92a6a841c1e', 'fca0e415-db61-4821-98d7-98a81dd5b273', '2de38176-3606-456d-b882-8d74a5716c50', 'ba85b5a3-5afe-47d9-afde-60db3ab440a9', 30, '08:00:00', '08:10:00', '11:50:00', '12:00:00', 'Terça', 'Turma B', 'Manhã', 'Ativo', NULL, 2024, '{}', NULL, '2024-10-11 17:47:12.4155+00', NULL, NULL);


--
-- Data for Name: discipline; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."discipline" ("id", "name", "status", "metadata", "user_created", "created_at", "deleted_at", "updated_at", "workload") VALUES
	('220eeece-e55f-49d2-a422-55ed685d45b1', 'Geografia', 'Ativo', NULL, NULL, '2024-10-11 17:47:12.4155+00', NULL, NULL, 80),
	('43a07de5-4ac2-4bbe-9780-23479b8276fc', 'Ciências', 'Ativo', NULL, NULL, '2024-10-11 17:47:12.4155+00', NULL, NULL, 80),
	('aa6ba17a-7b7c-4c8e-901b-73c3d8be3727', 'Matemática', 'Ativo', NULL, NULL, '2024-10-11 17:47:12.4155+00', NULL, NULL, 120),
	('542d32ff-d5fd-4950-b379-a4fff279c74b', 'História', 'Ativo', NULL, NULL, '2024-10-11 17:47:12.4155+00', NULL, NULL, 80);


--
-- Data for Name: timetable; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."timetable" ("id", "school_id", "classroom_id", "discipline_id", "name", "metadata", "user_created", "created_at", "deleted_at", "updated_at") VALUES
	('2c2f0490-c82e-4472-adae-9a195bf0584d', '637ad0fc-a224-46ba-9602-9bbd1d97e40f', '65249faa-3312-4650-bf87-1ff23418034e', NULL, 'Horário da Turma A', NULL, NULL, '2024-10-11 17:47:12.4155+00', NULL, NULL),
	('9bf8aef2-3b2e-4dfa-a9e2-d7ec1596534a', '637ad0fc-a224-46ba-9602-9bbd1d97e40f', 'c0f246ec-3503-4428-a19a-5499409a2404', NULL, 'Horário da Turma B', NULL, NULL, '2024-10-11 17:47:12.4155+00', NULL, NULL),
	('dee7e1e0-abae-4053-85f4-6be138064e46', 'd5a0d549-b57a-429b-8485-ff81c878932e', '87ec6805-2da4-49f0-b04d-65060400c2dd', NULL, 'Horário da Turma C', NULL, NULL, '2024-10-11 17:47:12.4155+00', NULL, NULL);


--
-- Data for Name: _teachertotimetable; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: academic_year; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."academic_year" ("id", "school_id", "template_id", "ref_year", "metadata", "created_at", "updated_at", "deleted_at", "user_created") VALUES
	('043bd4c9-bb48-40f0-a54b-a7854b76c41f', '637ad0fc-a224-46ba-9602-9bbd1d97e40f', '5b28fb2e-4f29-4fb1-99d5-79ee13390303', 2024, NULL, '2024-10-11 17:47:12.4155+00', NULL, NULL, NULL),
	('e93e5e8b-2bed-4e1d-b42e-c89195d0f136', 'd5a0d549-b57a-429b-8485-ff81c878932e', '5b28fb2e-4f29-4fb1-99d5-79ee13390303', 2024, NULL, '2024-10-11 17:47:12.4155+00', NULL, NULL, NULL);


--
-- Data for Name: academic_year_template; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."academic_year_template" ("id", "ref_year", "name", "stages", "metadata", "created_at", "updated_at", "deleted_at", "user_created") VALUES
	('5b28fb2e-4f29-4fb1-99d5-79ee13390303', 2024, 'Modelo Padrão Quatro Etapas', '[{"endDate": "2024-04-30", "startDate": "2024-02-01", "stageNumber": 1, "teachingDays": 62}, {"endDate": "2024-07-15", "startDate": "2024-05-01", "stageNumber": 2, "teachingDays": 52}, {"endDate": "2024-09-30", "startDate": "2024-07-16", "stageNumber": 3, "teachingDays": 55}, {"endDate": "2024-12-20", "startDate": "2024-10-01", "stageNumber": 4, "teachingDays": 58}]', NULL, '2024-10-11 17:47:12.4155+00', NULL, NULL, NULL);


--
-- Data for Name: student; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."student" ("id", "name", "birthdate", "gender", "place_of_birth", "postalcode", "residence_zone", "number_address", "cpf", "neighborhood", "city", "complement", "father_name", "father_email", "father_cpf", "father_phone", "mother_name", "mother_email", "mother_cpf", "mother_phone", "rg_number", "rg_state", "rg_issue_date", "rg_issuer", "birth_certificate", "docsType", "responsibleType", "email", "phone", "address", "status", "photo", "metadata", "user_created", "created_at", "deleted_at", "updated_at", "ethnicity", "deficiency", "deficiency_description", "city_state") VALUES
	('aff8bb4d-7f36-4c69-a7dd-8453e81fe5d5', 'bla bla', '2024-10-24', NULL, NULL, NULL, NULL, NULL, '99999999991', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '1212121212', NULL, 'Ativo', NULL, NULL, NULL, '2024-10-25 18:05:55.328309+00', NULL, NULL, NULL, NULL, NULL, NULL),
	('45c8a651-7ade-4a3d-a8c7-ca6c955153d6', 'aaaaa', '1111-11-25', NULL, NULL, NULL, 'Urbana', NULL, '11111111111', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '1111111111', NULL, 'Ativo', NULL, NULL, NULL, '2024-10-25 18:45:17.810798+00', NULL, NULL, NULL, NULL, NULL, NULL),
	('7f5ef80a-f1aa-43d4-ad9a-02c234c13ee9', 'sdasdasd', '1111-11-11', NULL, NULL, NULL, NULL, NULL, '11111111112', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '1111111111', NULL, 'Ativo', NULL, NULL, NULL, '2024-10-25 18:56:23.791455+00', NULL, NULL, NULL, NULL, NULL, NULL),
	('0f77936e-8c8a-468d-aa62-b148c02f4f57', 'Bruno Souza', '2004-07-22', 'Masculino', 'Rio de Janeiro', '02000-000', 'Urbana', '456', '967.994.450-67', 'Botafogo', 'Rio de Janeiro', '', 'Ricardo Souza', 'ricardo.souza@example.com', '967.994.450-67', '(21) 91234-5678', 'Laura Souza', 'laura.souza@example.com', '967.994.450-67', '(21) 98765-4321', NULL, NULL, NULL, NULL, NULL, 'CPF', 'Ambos', 'bruno.souza@example.com', '(21) 99876-5432', 'Avenida Exemplo, 456', 'Ativo', NULL, '{}', NULL, '2024-10-11 17:47:12.4155+00', NULL, '2024-10-11 17:47:12.4155+00', 'Não declarada', 'Não possui', NULL, NULL),
	('b4db4d3c-50dd-41f5-9cae-c8260313aa25', 'Tiago Oliver Julio Rodrigues', '1999-01-23', 'Masculino', 'Araripina', '56280-000', 'Urbana', NULL, '691.539.878-37', NULL, NULL, NULL, 'Cauê Noah Martin Rodrigues', NULL, '691.539.878-37', '(87) 77777-7777', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'CPF', 'Pai', NULL, '(87) 77777-7777', NULL, 'Ativo', NULL, NULL, NULL, '2024-10-14 18:34:23.426118+00', NULL, NULL, 'Amarela', 'Não possui', NULL, NULL),
	('e336bca8-deb1-4047-9f7c-c325e5077416', 'Junior Silva', '1999-01-01', 'Masculino', 'Araripina', '56280-000', 'Urbana', NULL, '600.793.250-84', NULL, NULL, NULL, 'dw', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'CPF', 'Pai', NULL, '(87) 77777-7777', NULL, 'Ativo', NULL, NULL, NULL, '2024-10-17 13:01:14.178465+00', NULL, NULL, 'Amarela', 'Mental', NULL, NULL),
	('7ad7bc1e-031a-4a54-9333-7713b7202717', 'Fulano de tal', '1991-01-01', 'Masculino', NULL, NULL, 'Urbana', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Pai', NULL, '8791919191', NULL, 'Ativo', NULL, NULL, NULL, '2024-10-23 18:03:32.810227+00', NULL, NULL, NULL, NULL, NULL, NULL),
	('07bf71ea-b7ed-4ab0-a085-aa750d55f2ab', 'Fulano de tal', '1991-01-01', 'Masculino', NULL, NULL, 'Urbana', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Pai', NULL, '8791919191', NULL, 'Ativo', NULL, NULL, NULL, '2024-10-23 18:03:50.623995+00', NULL, NULL, NULL, NULL, NULL, NULL),
	('440a4c5b-a6f5-4d4b-b0d9-a5b14cf81389', 'Fernando', '1999-01-01', 'Feminino', 'dasda', '34342-423', 'Urbana', NULL, '960.730.500-03', NULL, NULL, NULL, 'Pai', 'pai@pai.com', '960.730.500-03', '(43) 33333-3333', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '55555555558888888888888888888888', 'Certidão de Nascimento (Novo Formato)', 'Pai', NULL, '(87) 77777-7777', NULL, 'Ativo', NULL, NULL, NULL, '2024-10-24 18:12:42.936105+00', NULL, NULL, 'Amarela', 'Múltipla', NULL, NULL),
	('bdb6d23a-f5dc-4f95-aa28-81b5a1479cdf', 'bla bla', '2024-10-24', NULL, NULL, NULL, NULL, NULL, '99999999999', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '1212121212', NULL, 'Ativo', NULL, NULL, NULL, '2024-10-25 16:06:56.465005+00', NULL, NULL, NULL, NULL, NULL, NULL),
	('dedf8193-1855-4bb1-b37a-fb678577a93a', 'Ana Silva', '2005-03-10', 'Feminino', 'São Paulo', '01000-000', 'Urbana', '123', '', 'Centro', 'São Paulo', '', 'Carlos Silva', 'carlos.silva@example.com', '967.994.450-67', '(11) 91234-5678', 'Maria Silva', 'maria.silva@example.com', '967.994.450-67', '(11) 98765-4321', NULL, NULL, NULL, NULL, NULL, 'CPF', 'Ambos', 'ana.silva@example.com', '(11) 99876-5432', 'Rua Exemplo, 123', 'Ativo', NULL, '{}', NULL, '2024-10-11 17:47:12.4155+00', NULL, '2024-10-11 17:47:12.4155+00', 'Não declarada', 'Não possui', 'preto', NULL),
	('094b6c79-1fa3-4034-acfc-445637b0157b', 'asdasdasd', '1111-11-11', NULL, NULL, NULL, NULL, NULL, '2121212112111', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '121212121212', NULL, 'Ativo', NULL, NULL, NULL, '2024-10-26 11:29:39.894588+00', NULL, NULL, NULL, NULL, NULL, NULL),
	('bea81e46-5546-4ab5-81d1-b1e80a554232', 'asdasdasd', '1111-11-11', NULL, NULL, NULL, NULL, NULL, '222211112222', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '111112121212', NULL, 'Ativo', NULL, NULL, NULL, '2024-10-26 11:31:21.4149+00', NULL, NULL, NULL, NULL, NULL, NULL),
	('74f9b030-e02d-47a6-87b9-b3fff5ad939f', 'asdsdasdas', '1212-12-12', NULL, NULL, NULL, NULL, NULL, '21212121', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '122112211212', NULL, 'Ativo', NULL, NULL, NULL, '2024-10-26 11:35:51.881155+00', NULL, NULL, NULL, NULL, NULL, NULL),
	('3a16286a-46f8-46d3-9dd6-57f5f6dd5daf', '11asdad', '12312-03-12', NULL, NULL, NULL, NULL, NULL, '123123123123', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '123123123123', NULL, 'Ativo', NULL, NULL, NULL, '2024-10-26 11:38:39.882586+00', NULL, NULL, NULL, NULL, NULL, NULL),
	('4b607fa7-7639-477a-9565-dd3f49daef49', 'asdasdasd', '2121-12-12', NULL, NULL, NULL, NULL, NULL, '121221211222', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '11212121212', NULL, 'Ativo', NULL, NULL, NULL, '2024-10-26 11:49:28.847041+00', NULL, NULL, NULL, NULL, NULL, NULL);


--
-- Data for Name: attendance; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: class_session; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."class_session" ("id", "school_id", "discipline_id", "timetable_id", "day_of_week", "start_time", "end_time", "metadata", "user_created", "created_at", "deleted_at", "updated_at") VALUES
	('2ea65929-85f6-4f79-8a22-a9bc09d55678', '637ad0fc-a224-46ba-9602-9bbd1d97e40f', 'aa6ba17a-7b7c-4c8e-901b-73c3d8be3727', '2c2f0490-c82e-4472-adae-9a195bf0584d', 'Segunda', '08:00:00', '09:00:00', NULL, NULL, '2024-10-11 17:47:12.4155+00', NULL, NULL),
	('c82de38f-334c-40e8-8d00-9f5ad100eac0', '637ad0fc-a224-46ba-9602-9bbd1d97e40f', '43a07de5-4ac2-4bbe-9780-23479b8276fc', '2c2f0490-c82e-4472-adae-9a195bf0584d', 'Terça', '09:00:00', '10:00:00', NULL, NULL, '2024-10-11 17:47:12.4155+00', NULL, NULL),
	('75a01c27-7b5e-4bd7-b1ba-766142f3723e', '637ad0fc-a224-46ba-9602-9bbd1d97e40f', 'aa6ba17a-7b7c-4c8e-901b-73c3d8be3727', '9bf8aef2-3b2e-4dfa-a9e2-d7ec1596534a', 'Quarta', '08:00:00', '09:00:00', NULL, NULL, '2024-10-11 17:47:12.4155+00', NULL, NULL),
	('566b2d14-cab5-45ed-a9ab-fed150c143f9', '637ad0fc-a224-46ba-9602-9bbd1d97e40f', '43a07de5-4ac2-4bbe-9780-23479b8276fc', '9bf8aef2-3b2e-4dfa-a9e2-d7ec1596534a', 'Quinta', '09:00:00', '10:00:00', NULL, NULL, '2024-10-11 17:47:12.4155+00', NULL, NULL),
	('3126a6d4-54bf-4e32-ab64-21d05751d4b5', 'd5a0d549-b57a-429b-8485-ff81c878932e', '542d32ff-d5fd-4950-b379-a4fff279c74b', 'dee7e1e0-abae-4053-85f4-6be138064e46', 'Sexta', '10:00:00', '11:00:00', NULL, NULL, '2024-10-11 17:47:12.4155+00', NULL, NULL),
	('eb580000-607d-4299-9862-e2ba982ffb22', 'd5a0d549-b57a-429b-8485-ff81c878932e', '220eeece-e55f-49d2-a422-55ed685d45b1', 'dee7e1e0-abae-4053-85f4-6be138064e46', 'Sábado', '11:00:00', '12:00:00', NULL, NULL, '2024-10-11 17:47:12.4155+00', NULL, NULL);


--
-- Data for Name: series; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."series" ("id", "course_id", "institution_id", "timetable_id", "name", "course_stage", "graduate", "workload", "school_days", "metadata", "user_created", "created_at", "deleted_at", "updated_at", "school_id") VALUES
	('07507916-789d-415d-891a-f92a6a841c1e', '2de38176-3606-456d-b882-8d74a5716c50', 'fca0e415-db61-4821-98d7-98a81dd5b273', NULL, '1º Ano', 'Etapa 1', 'Sim', '40', '12', '{}', NULL, '2024-10-11 17:47:12.4155+00', NULL, NULL, NULL),
	('1f00e4f3-9abf-4ba2-ad02-2eeb67cb228e', '2de38176-3606-456d-b882-8d74a5716c50', 'fca0e415-db61-4821-98d7-98a81dd5b273', NULL, '3º Ano', 'Etapa 4', 'Sim', '12', '12', NULL, NULL, '2024-10-17 13:34:19.278836+00', NULL, NULL, NULL),
	('5a1f3731-fdb6-45c7-963a-8cf679be04b2', '2de38176-3606-456d-b882-8d74a5716c50', 'fca0e415-db61-4821-98d7-98a81dd5b273', NULL, '2º Ano', 'Etapa 2', 'Sim', '40', '2', '{}', NULL, '2024-10-11 17:47:12.4155+00', NULL, NULL, NULL),
	('b4503511-6f8b-4d0b-bd9c-37d541f53da9', '2de38176-3606-456d-b882-8d74a5716c50', 'fca0e415-db61-4821-98d7-98a81dd5b273', NULL, '5º Ano', 'Etapa 3', 'Não', '16', '16', NULL, NULL, '2024-10-17 13:36:37.342114+00', NULL, NULL, NULL),
	('333c5ebc-aa52-4fbc-8f76-0f7a69d9fd38', '2de38176-3606-456d-b882-8d74a5716c50', 'fca0e415-db61-4821-98d7-98a81dd5b273', NULL, '4º Ano', 'Etapa 4', 'Não', '16', '16', NULL, NULL, '2024-10-17 18:18:19.606583+00', NULL, NULL, NULL),
	('5251bbed-2ec1-47c4-bd68-f696426ef354', '78d2bfb8-c0cc-459c-a1b4-714dc7c306f0', 'fca0e415-db61-4821-98d7-98a81dd5b273', NULL, '6º Ano', 'Etapa 6', 'Não', '16', '16', NULL, NULL, '2024-10-17 18:21:41.293239+00', NULL, NULL, NULL),
	('61699612-ed6e-4a49-8277-ce9f70c754d7', '78d2bfb8-c0cc-459c-a1b4-714dc7c306f0', 'fca0e415-db61-4821-98d7-98a81dd5b273', NULL, '7º Ano', 'Etapa 6', 'Não', '16', '16', NULL, NULL, '2024-10-17 18:28:06.814352+00', NULL, NULL, NULL),
	('90b24e13-9c05-4c88-829b-a5a0f905ff0b', '78d2bfb8-c0cc-459c-a1b4-714dc7c306f0', 'fca0e415-db61-4821-98d7-98a81dd5b273', NULL, '8º Ano', 'Etapa 6', 'Não', '16', '16', NULL, NULL, '2024-10-17 18:29:03.417989+00', NULL, NULL, NULL),
	('5271b83b-9967-4b2e-8568-fe4ea579f27f', '78d2bfb8-c0cc-459c-a1b4-714dc7c306f0', 'fca0e415-db61-4821-98d7-98a81dd5b273', NULL, '9º Ano', 'Etapa 6', 'Não', '16', '16', NULL, NULL, '2024-10-17 18:30:37.738834+00', NULL, NULL, NULL),
	('c637ddc6-7f9a-4f71-ae02-13e79be5d98b', '62ed76dc-b0a0-4667-b9da-f6fae31688a9', 'fca0e415-db61-4821-98d7-98a81dd5b273', NULL, '32ª Série', 'Etapa 4', 'Sim', '23', '43', NULL, NULL, '2024-10-25 13:33:06.874247+00', NULL, NULL, NULL);


--
-- Data for Name: course_series_discipline; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."course_series_discipline" ("id", "created_at", "course_id", "series_id", "discipline_id", "workload", "deleted_at") VALUES
	('698b9282-d0b5-4e16-8846-01d5bcf3a393', '2024-10-23 13:08:50.754554+00', '2de38176-3606-456d-b882-8d74a5716c50', '07507916-789d-415d-891a-f92a6a841c1e', '220eeece-e55f-49d2-a422-55ed685d45b1', NULL, NULL);


--
-- Data for Name: document; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."document" ("id", "file_name", "mime_type", "size", "is_current_version", "file_hash", "upload_date", "storage_path", "version", "compression_applied", "metadata", "is_deleted", "created_at", "updated_at", "deleted_at", "user_created") VALUES
	('d20451d3-35ca-4fd5-9ee7-1fec706f1cc2', 'entre-em-contato-com-a-natureza-atraves-de-imagens-1101297.jpg', 'image/jpeg', 272000, true, NULL, '2024-10-14 13:27:08.841+00', 'https://hokeopsqpxnvfhczdhzc.supabase.co/storage/v1/object/public/ged/uploads/entre-em-contato-com-a-natureza-atraves-de-imagens-1101297.jpg', 1, false, NULL, false, '2024-10-14 13:27:08.959538+00', NULL, NULL, NULL);


--
-- Data for Name: pre_enrollment; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."pre_enrollment" ("id", "school_id", "student_id", "course_id", "series_id", "created_at", "deleted_at", "updated_at", "date_enrollment", "observations", "status", "situation", "pre_enrollment_code") VALUES
	('1bed82cd-5b96-42b9-8166-0899afbc26b4', '637ad0fc-a224-46ba-9602-9bbd1d97e40f', '45c8a651-7ade-4a3d-a8c7-ca6c955153d6', '2de38176-3606-456d-b882-8d74a5716c50', '5251bbed-2ec1-47c4-bd68-f696426ef354', '2024-10-26 11:28:19.188175+00', NULL, NULL, '2024-10-25', NULL, 'Ativo', NULL, NULL);


--
-- Data for Name: enrollment; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."enrollment" ("id", "school_id", "student_id", "course_id", "classroom_id", "series_id", "name", "created_at", "deleted_at", "updated_at", "date_enrollment", "observations", "status", "situation", "enrollmentCode", "institution_id", "pre_enrollment_id") VALUES
	('a441be36-9b82-4d33-9deb-5f3498b19ff7', '637ad0fc-a224-46ba-9602-9bbd1d97e40f', '0f77936e-8c8a-468d-aa62-b148c02f4f57', '2de38176-3606-456d-b882-8d74a5716c50', '65249faa-3312-4650-bf87-1ff23418034e', '07507916-789d-415d-891a-f92a6a841c1e', 'Bruno Souza', '2024-10-14 18:27:31.966171+00', NULL, NULL, '2025-01-01', NULL, 'Ativo', 'Cursando', 'MAT-NVK434-2024', NULL, NULL),
	('ddd9e72e-21e8-4d7c-b891-56b852a156e3', '637ad0fc-a224-46ba-9602-9bbd1d97e40f', 'b4db4d3c-50dd-41f5-9cae-c8260313aa25', '2de38176-3606-456d-b882-8d74a5716c50', '65249faa-3312-4650-bf87-1ff23418034e', '07507916-789d-415d-891a-f92a6a841c1e', 'Tiago Oliver Julio Rodrigues', '2024-10-14 18:37:32.452047+00', NULL, NULL, '2025-01-01', NULL, 'Ativo', 'Cursando', 'MAT-VYT021-2024', NULL, NULL),
	('bc69b22b-32dd-44a5-9259-3e5c2f75877e', '637ad0fc-a224-46ba-9602-9bbd1d97e40f', 'dedf8193-1855-4bb1-b37a-fb678577a93a', '2de38176-3606-456d-b882-8d74a5716c50', '65249faa-3312-4650-bf87-1ff23418034e', '07507916-789d-415d-891a-f92a6a841c1e', 'Ana Silva', '2024-10-14 17:41:23.454085+00', NULL, NULL, '2025-01-01', NULL, 'Ativo', 'Pendente', 'MAT-KON749-2024', NULL, NULL);


--
-- Data for Name: grade; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: holidays; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."holidays" ("id", "name", "holiday_date", "description", "weekday") VALUES
	('fe4b6b1d-c3d9-46de-bd9b-eed339fa1341', 'Ano Novo', '2024-01-01', 'Comemoração do início do novo ano', 'Monday   '),
	('658ad7cc-baa0-4042-bafa-351b5cdfaa27', 'Carnaval', '2024-02-13', 'Dia de Carnaval', 'Tuesday  '),
	('6d777580-ca3e-431a-8543-a46fb9027b4e', 'Paixão de Cristo', '2024-03-29', 'Sexta-feira Santa', 'Friday   '),
	('b9af0e79-7cfc-45ba-b23a-80226eb1174c', 'Tiradentes', '2024-04-21', 'Comemoração em memória de Tiradentes', 'Sunday   '),
	('fee32f8e-bf00-4ec8-9241-7107e2c66a7b', 'Dia do Trabalhador', '2024-05-01', 'Dia do Trabalho', 'Wednesday'),
	('d71bf96d-37a5-48f9-982e-0bd82f045036', 'Corpus Christi', '2024-05-30', 'Dia de Corpus Christi', 'Thursday '),
	('366b611f-a405-49e4-9482-beaf7d037383', 'Independência do Brasil', '2024-09-07', 'Comemoração da Independência do Brasil', 'Saturday '),
	('709a3203-efa7-4aa1-aa4a-262c6776ee99', 'Nossa Senhora Aparecida', '2024-10-12', 'Dia de Nossa Senhora Aparecida, padroeira do Brasil', 'Saturday '),
	('dde00180-b33e-4cf7-90fd-55d02f43b531', 'Finados', '2024-11-02', 'Dia de Finados', 'Saturday '),
	('811f9d16-aabc-4c6f-9e97-cd3f9e9279ba', 'Proclamação da República', '2024-11-15', 'Comemoração da Proclamação da República do Brasil', 'Friday   '),
	('c873df31-024e-45f0-b83b-e7a54a077ac7', 'Natal', '2024-12-25', 'Comemoração do Natal', 'Wednesday');


--
-- Data for Name: institution_settings; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."institution_settings" ("id", "created_at", "institution_id", "date_opening", "date_closing", "school_days", "date_start", "date_end") VALUES
	(1, '2024-10-25 12:19:54.735574+00', 'fca0e415-db61-4821-98d7-98a81dd5b273', '2024-10-21', '2025-01-17', 200, '2025-02-03', '2025-12-19');


--
-- Data for Name: role; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."role" ("id", "school_id", "name") VALUES
	('2137ba0e-eb65-4ef9-882a-51032ab1f1d3', '637ad0fc-a224-46ba-9602-9bbd1d97e40f', 'Professor'),
	('bdb42af9-3ccf-431e-b1f3-af2440261cb4', '637ad0fc-a224-46ba-9602-9bbd1d97e40f', 'Gestor');


--
-- Data for Name: role_permission; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."role_permission" ("school_id", "role_id", "table", "can_select", "can_insert", "can_update", "can_delete") VALUES
	('637ad0fc-a224-46ba-9602-9bbd1d97e40f', '2137ba0e-eb65-4ef9-882a-51032ab1f1d3', 'student', true, false, false, false),
	('637ad0fc-a224-46ba-9602-9bbd1d97e40f', '2137ba0e-eb65-4ef9-882a-51032ab1f1d3', 'attendance', true, true, true, false),
	('637ad0fc-a224-46ba-9602-9bbd1d97e40f', '2137ba0e-eb65-4ef9-882a-51032ab1f1d3', 'grade', true, true, true, false),
	('637ad0fc-a224-46ba-9602-9bbd1d97e40f', '2137ba0e-eb65-4ef9-882a-51032ab1f1d3', 'classroom', true, false, false, false),
	('637ad0fc-a224-46ba-9602-9bbd1d97e40f', '2137ba0e-eb65-4ef9-882a-51032ab1f1d3', 'discipline', true, false, false, false),
	('637ad0fc-a224-46ba-9602-9bbd1d97e40f', '2137ba0e-eb65-4ef9-882a-51032ab1f1d3', 'class_session', true, false, false, false),
	('637ad0fc-a224-46ba-9602-9bbd1d97e40f', 'bdb42af9-3ccf-431e-b1f3-af2440261cb4', 'student', true, true, true, true),
	('637ad0fc-a224-46ba-9602-9bbd1d97e40f', 'bdb42af9-3ccf-431e-b1f3-af2440261cb4', 'teacher', true, true, true, true),
	('637ad0fc-a224-46ba-9602-9bbd1d97e40f', 'bdb42af9-3ccf-431e-b1f3-af2440261cb4', 'classroom', true, true, true, true),
	('637ad0fc-a224-46ba-9602-9bbd1d97e40f', 'bdb42af9-3ccf-431e-b1f3-af2440261cb4', 'discipline', true, true, true, true),
	('637ad0fc-a224-46ba-9602-9bbd1d97e40f', 'bdb42af9-3ccf-431e-b1f3-af2440261cb4', 'course', true, true, true, true),
	('637ad0fc-a224-46ba-9602-9bbd1d97e40f', 'bdb42af9-3ccf-431e-b1f3-af2440261cb4', 'series', true, true, true, true),
	('637ad0fc-a224-46ba-9602-9bbd1d97e40f', 'bdb42af9-3ccf-431e-b1f3-af2440261cb4', 'timetable', true, true, true, true),
	('637ad0fc-a224-46ba-9602-9bbd1d97e40f', 'bdb42af9-3ccf-431e-b1f3-af2440261cb4', 'class_session', true, true, true, true),
	('637ad0fc-a224-46ba-9602-9bbd1d97e40f', 'bdb42af9-3ccf-431e-b1f3-af2440261cb4', 'attendance', true, true, true, true),
	('637ad0fc-a224-46ba-9602-9bbd1d97e40f', 'bdb42af9-3ccf-431e-b1f3-af2440261cb4', 'grade', true, true, true, true);


--
-- Data for Name: school_course; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."school_course" ("id", "created_at", "school_id", "course_id") VALUES
	('f202ed1c-cecb-4710-9261-7dd72d0db19e', '2024-10-15 19:28:47.212561+00', '637ad0fc-a224-46ba-9602-9bbd1d97e40f', '78d2bfb8-c0cc-459c-a1b4-714dc7c306f0'),
	('f32c8a4a-9e33-4556-95da-4dc8403411e0', '2024-10-15 19:28:29.950013+00', '637ad0fc-a224-46ba-9602-9bbd1d97e40f', '2de38176-3606-456d-b882-8d74a5716c50');


--
-- Data for Name: school_settings; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."school_settings" ("id", "created_at", "date_opening", "date_closing", "school_days", "date_start", "date_end", "institution_id", "school_id", "deleted_at") VALUES
	('09b57ff4-fa21-4d64-8c9e-6272e102f58e', '2024-10-15 19:06:13.265219+00', '2024-10-01', '2025-01-15', 200, '2025-02-03', '2025-12-12', 'fca0e415-db61-4821-98d7-98a81dd5b273', 'd5a0d549-b57a-429b-8485-ff81c878932e', NULL),
	('fea3fa65-35a2-43d0-8195-bf997a4e1db2', '2024-10-28 19:12:12.515136+00', '1111-11-11', '1111-11-11', 34, '1111-11-11', '1111-11-11', 'fca0e415-db61-4821-98d7-98a81dd5b273', '8f3422c1-540a-4fc7-8076-feef95ea2f6b', NULL);


--
-- Data for Name: teacher_to_timetable; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: timetable_school; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."timetable_school" ("timetable_id", "school_id", "metadata", "user_created", "created_at", "deleted_at", "updated_at") VALUES
	('2c2f0490-c82e-4472-adae-9a195bf0584d', '637ad0fc-a224-46ba-9602-9bbd1d97e40f', NULL, NULL, '2024-10-11 17:47:12.4155+00', NULL, NULL),
	('9bf8aef2-3b2e-4dfa-a9e2-d7ec1596534a', '637ad0fc-a224-46ba-9602-9bbd1d97e40f', NULL, NULL, '2024-10-11 17:47:12.4155+00', NULL, NULL),
	('dee7e1e0-abae-4053-85f4-6be138064e46', 'd5a0d549-b57a-429b-8485-ff81c878932e', NULL, NULL, '2024-10-11 17:47:12.4155+00', NULL, NULL);


--
-- Data for Name: user_role; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."user_role" ("school_id", "role_id", "user_id") VALUES
	('637ad0fc-a224-46ba-9602-9bbd1d97e40f', '2137ba0e-eb65-4ef9-882a-51032ab1f1d3', '2ff53f52-cdd9-4b04-80c4-02d146b653e7'),
	('637ad0fc-a224-46ba-9602-9bbd1d97e40f', 'bdb42af9-3ccf-431e-b1f3-af2440261cb4', '905096b1-ad84-46c2-a309-29a0501470f7');


--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

INSERT INTO "storage"."buckets" ("id", "name", "owner", "created_at", "updated_at", "public", "avif_autodetection", "file_size_limit", "allowed_mime_types", "owner_id") VALUES
	('ged', 'ged', NULL, '2024-08-29 13:14:37.342594+00', '2024-08-29 13:14:37.342594+00', false, false, NULL, NULL, NULL);


--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

INSERT INTO "storage"."objects" ("id", "bucket_id", "name", "owner", "created_at", "updated_at", "last_accessed_at", "metadata", "version", "owner_id", "user_metadata") VALUES
	('0d977813-981c-445e-bb5a-c384e14f53a7', 'ged', 'uploads/OIG4.3gBzBDU1bxPrpcM6_tF1.jpg', '46d54882-eed8-448f-bf3f-847125971e9e', '2024-08-29 16:34:19.275506+00', '2024-08-29 16:34:19.275506+00', '2024-08-29 16:34:19.275506+00', '{"eTag": "\"a18d5238e945daaad5cee1bbfb8df0a2\"", "size": 158933, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2024-08-29T16:34:20.000Z", "contentLength": 158933, "httpStatusCode": 200}', '9505ecd5-68e7-449c-b684-e0d59905d604', '46d54882-eed8-448f-bf3f-847125971e9e', '{}'),
	('39396334-808e-4570-842e-5e4d1cc0c4b7', 'ged', 'uploads/OIG3.QquozjNxARwGetZptD12.jpg', '46d54882-eed8-448f-bf3f-847125971e9e', '2024-08-29 17:43:18.751126+00', '2024-08-29 17:43:18.751126+00', '2024-08-29 17:43:18.751126+00', '{"eTag": "\"f45d08edbf9af3fb4ef60e269e2f6824\"", "size": 183994, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2024-08-29T17:43:19.000Z", "contentLength": 183994, "httpStatusCode": 200}', 'af7dccf3-ae24-40ab-960e-4e829c6a03b6', '46d54882-eed8-448f-bf3f-847125971e9e', '{}'),
	('f53c1665-b1a6-4b9d-9ecf-dab9150c9883', 'ged', 'uploads/entre-em-contato-com-a-natureza-atraves-de-imagens-1101297.jpg', NULL, '2024-10-14 13:27:08.321406+00', '2024-10-14 13:27:08.321406+00', '2024-10-14 13:27:08.321406+00', '{"eTag": "\"c0cce4c47ad9b552364c1a7829aeb179-1\"", "size": 272000, "mimetype": "image/jpeg", "cacheControl": "no-cache", "lastModified": "2024-10-14T13:27:08.000Z", "contentLength": 272000, "httpStatusCode": 200}', '57c34159-066a-4041-b877-1360af1d7e3d', NULL, NULL);


--
-- Data for Name: s3_multipart_uploads; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads_parts; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: hooks; Type: TABLE DATA; Schema: supabase_functions; Owner: postgres
--



--
-- Data for Name: secrets; Type: TABLE DATA; Schema: vault; Owner: supabase_admin
--



--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval('"auth"."refresh_tokens_id_seq"', 1, false);


--
-- Name: key_key_id_seq; Type: SEQUENCE SET; Schema: pgsodium; Owner: supabase_admin
--

SELECT pg_catalog.setval('"pgsodium"."key_key_id_seq"', 1, false);


--
-- Name: institution_settings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."institution_settings_id_seq"', 1, true);


--
-- Name: hooks_id_seq; Type: SEQUENCE SET; Schema: supabase_functions; Owner: postgres
--

SELECT pg_catalog.setval('"supabase_functions"."hooks_id_seq"', 1, false);


--
-- PostgreSQL database dump complete
--

RESET ALL;
