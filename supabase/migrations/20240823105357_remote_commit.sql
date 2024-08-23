drop trigger if exists "set_updated_at_attendance" on "public"."attendance";

drop trigger if exists "set_updated_at_class_session" on "public"."class_session";

drop trigger if exists "set_updated_at_classroom" on "public"."classroom";

drop trigger if exists "set_updated_at_course" on "public"."course";

drop trigger if exists "set_updated_at_discipline" on "public"."discipline";

drop trigger if exists "set_updated_at_grade" on "public"."grade";

drop trigger if exists "set_updated_at_institution" on "public"."institution";

drop trigger if exists "set_updated_at_school" on "public"."school";

drop trigger if exists "set_updated_at_series" on "public"."series";

drop trigger if exists "set_updated_at_student" on "public"."student";

drop trigger if exists "set_updated_at_teacher" on "public"."teacher";

drop trigger if exists "set_updated_at_timetable" on "public"."timetable";

drop trigger if exists "set_updated_at_timetable_school" on "public"."timetable_school";

revoke delete on table "public"."_teachertotimetable" from "anon";

revoke insert on table "public"."_teachertotimetable" from "anon";

revoke references on table "public"."_teachertotimetable" from "anon";

revoke select on table "public"."_teachertotimetable" from "anon";

revoke trigger on table "public"."_teachertotimetable" from "anon";

revoke truncate on table "public"."_teachertotimetable" from "anon";

revoke update on table "public"."_teachertotimetable" from "anon";

revoke delete on table "public"."_teachertotimetable" from "authenticated";

revoke insert on table "public"."_teachertotimetable" from "authenticated";

revoke references on table "public"."_teachertotimetable" from "authenticated";

revoke select on table "public"."_teachertotimetable" from "authenticated";

revoke trigger on table "public"."_teachertotimetable" from "authenticated";

revoke truncate on table "public"."_teachertotimetable" from "authenticated";

revoke update on table "public"."_teachertotimetable" from "authenticated";

revoke delete on table "public"."_teachertotimetable" from "service_role";

revoke insert on table "public"."_teachertotimetable" from "service_role";

revoke references on table "public"."_teachertotimetable" from "service_role";

revoke select on table "public"."_teachertotimetable" from "service_role";

revoke trigger on table "public"."_teachertotimetable" from "service_role";

revoke truncate on table "public"."_teachertotimetable" from "service_role";

revoke update on table "public"."_teachertotimetable" from "service_role";

revoke delete on table "public"."attendance" from "anon";

revoke insert on table "public"."attendance" from "anon";

revoke references on table "public"."attendance" from "anon";

revoke select on table "public"."attendance" from "anon";

revoke trigger on table "public"."attendance" from "anon";

revoke truncate on table "public"."attendance" from "anon";

revoke update on table "public"."attendance" from "anon";

revoke delete on table "public"."attendance" from "authenticated";

revoke insert on table "public"."attendance" from "authenticated";

revoke references on table "public"."attendance" from "authenticated";

revoke select on table "public"."attendance" from "authenticated";

revoke trigger on table "public"."attendance" from "authenticated";

revoke truncate on table "public"."attendance" from "authenticated";

revoke update on table "public"."attendance" from "authenticated";

revoke delete on table "public"."attendance" from "service_role";

revoke insert on table "public"."attendance" from "service_role";

revoke references on table "public"."attendance" from "service_role";

revoke select on table "public"."attendance" from "service_role";

revoke trigger on table "public"."attendance" from "service_role";

revoke truncate on table "public"."attendance" from "service_role";

revoke update on table "public"."attendance" from "service_role";

revoke delete on table "public"."class_session" from "anon";

revoke insert on table "public"."class_session" from "anon";

revoke references on table "public"."class_session" from "anon";

revoke select on table "public"."class_session" from "anon";

revoke trigger on table "public"."class_session" from "anon";

revoke truncate on table "public"."class_session" from "anon";

revoke update on table "public"."class_session" from "anon";

revoke delete on table "public"."class_session" from "authenticated";

revoke insert on table "public"."class_session" from "authenticated";

revoke references on table "public"."class_session" from "authenticated";

revoke select on table "public"."class_session" from "authenticated";

revoke trigger on table "public"."class_session" from "authenticated";

revoke truncate on table "public"."class_session" from "authenticated";

revoke update on table "public"."class_session" from "authenticated";

revoke delete on table "public"."class_session" from "service_role";

revoke insert on table "public"."class_session" from "service_role";

revoke references on table "public"."class_session" from "service_role";

revoke select on table "public"."class_session" from "service_role";

revoke trigger on table "public"."class_session" from "service_role";

revoke truncate on table "public"."class_session" from "service_role";

revoke update on table "public"."class_session" from "service_role";

revoke delete on table "public"."classroom" from "anon";

revoke insert on table "public"."classroom" from "anon";

revoke references on table "public"."classroom" from "anon";

revoke select on table "public"."classroom" from "anon";

revoke trigger on table "public"."classroom" from "anon";

revoke truncate on table "public"."classroom" from "anon";

revoke update on table "public"."classroom" from "anon";

revoke delete on table "public"."classroom" from "authenticated";

revoke insert on table "public"."classroom" from "authenticated";

revoke references on table "public"."classroom" from "authenticated";

revoke select on table "public"."classroom" from "authenticated";

revoke trigger on table "public"."classroom" from "authenticated";

revoke truncate on table "public"."classroom" from "authenticated";

revoke update on table "public"."classroom" from "authenticated";

revoke delete on table "public"."classroom" from "service_role";

revoke insert on table "public"."classroom" from "service_role";

revoke references on table "public"."classroom" from "service_role";

revoke select on table "public"."classroom" from "service_role";

revoke trigger on table "public"."classroom" from "service_role";

revoke truncate on table "public"."classroom" from "service_role";

revoke update on table "public"."classroom" from "service_role";

revoke delete on table "public"."course" from "anon";

revoke insert on table "public"."course" from "anon";

revoke references on table "public"."course" from "anon";

revoke select on table "public"."course" from "anon";

revoke trigger on table "public"."course" from "anon";

revoke truncate on table "public"."course" from "anon";

revoke update on table "public"."course" from "anon";

revoke delete on table "public"."course" from "authenticated";

revoke insert on table "public"."course" from "authenticated";

revoke references on table "public"."course" from "authenticated";

revoke select on table "public"."course" from "authenticated";

revoke trigger on table "public"."course" from "authenticated";

revoke truncate on table "public"."course" from "authenticated";

revoke update on table "public"."course" from "authenticated";

revoke delete on table "public"."course" from "service_role";

revoke insert on table "public"."course" from "service_role";

revoke references on table "public"."course" from "service_role";

revoke select on table "public"."course" from "service_role";

revoke trigger on table "public"."course" from "service_role";

revoke truncate on table "public"."course" from "service_role";

revoke update on table "public"."course" from "service_role";

revoke delete on table "public"."discipline" from "anon";

revoke insert on table "public"."discipline" from "anon";

revoke references on table "public"."discipline" from "anon";

revoke select on table "public"."discipline" from "anon";

revoke trigger on table "public"."discipline" from "anon";

revoke truncate on table "public"."discipline" from "anon";

revoke update on table "public"."discipline" from "anon";

revoke delete on table "public"."discipline" from "authenticated";

revoke insert on table "public"."discipline" from "authenticated";

revoke references on table "public"."discipline" from "authenticated";

revoke select on table "public"."discipline" from "authenticated";

revoke trigger on table "public"."discipline" from "authenticated";

revoke truncate on table "public"."discipline" from "authenticated";

revoke update on table "public"."discipline" from "authenticated";

revoke delete on table "public"."discipline" from "service_role";

revoke insert on table "public"."discipline" from "service_role";

revoke references on table "public"."discipline" from "service_role";

revoke select on table "public"."discipline" from "service_role";

revoke trigger on table "public"."discipline" from "service_role";

revoke truncate on table "public"."discipline" from "service_role";

revoke update on table "public"."discipline" from "service_role";

revoke delete on table "public"."grade" from "anon";

revoke insert on table "public"."grade" from "anon";

revoke references on table "public"."grade" from "anon";

revoke select on table "public"."grade" from "anon";

revoke trigger on table "public"."grade" from "anon";

revoke truncate on table "public"."grade" from "anon";

revoke update on table "public"."grade" from "anon";

revoke delete on table "public"."grade" from "authenticated";

revoke insert on table "public"."grade" from "authenticated";

revoke references on table "public"."grade" from "authenticated";

revoke select on table "public"."grade" from "authenticated";

revoke trigger on table "public"."grade" from "authenticated";

revoke truncate on table "public"."grade" from "authenticated";

revoke update on table "public"."grade" from "authenticated";

revoke delete on table "public"."grade" from "service_role";

revoke insert on table "public"."grade" from "service_role";

revoke references on table "public"."grade" from "service_role";

revoke select on table "public"."grade" from "service_role";

revoke trigger on table "public"."grade" from "service_role";

revoke truncate on table "public"."grade" from "service_role";

revoke update on table "public"."grade" from "service_role";

revoke delete on table "public"."institution" from "anon";

revoke insert on table "public"."institution" from "anon";

revoke references on table "public"."institution" from "anon";

revoke select on table "public"."institution" from "anon";

revoke trigger on table "public"."institution" from "anon";

revoke truncate on table "public"."institution" from "anon";

revoke update on table "public"."institution" from "anon";

revoke delete on table "public"."institution" from "authenticated";

revoke insert on table "public"."institution" from "authenticated";

revoke references on table "public"."institution" from "authenticated";

revoke select on table "public"."institution" from "authenticated";

revoke trigger on table "public"."institution" from "authenticated";

revoke truncate on table "public"."institution" from "authenticated";

revoke update on table "public"."institution" from "authenticated";

revoke delete on table "public"."institution" from "service_role";

revoke insert on table "public"."institution" from "service_role";

revoke references on table "public"."institution" from "service_role";

revoke select on table "public"."institution" from "service_role";

revoke trigger on table "public"."institution" from "service_role";

revoke truncate on table "public"."institution" from "service_role";

revoke update on table "public"."institution" from "service_role";

revoke delete on table "public"."school" from "anon";

revoke insert on table "public"."school" from "anon";

revoke references on table "public"."school" from "anon";

revoke select on table "public"."school" from "anon";

revoke trigger on table "public"."school" from "anon";

revoke truncate on table "public"."school" from "anon";

revoke update on table "public"."school" from "anon";

revoke delete on table "public"."school" from "authenticated";

revoke insert on table "public"."school" from "authenticated";

revoke references on table "public"."school" from "authenticated";

revoke select on table "public"."school" from "authenticated";

revoke trigger on table "public"."school" from "authenticated";

revoke truncate on table "public"."school" from "authenticated";

revoke update on table "public"."school" from "authenticated";

revoke delete on table "public"."school" from "service_role";

revoke insert on table "public"."school" from "service_role";

revoke references on table "public"."school" from "service_role";

revoke select on table "public"."school" from "service_role";

revoke trigger on table "public"."school" from "service_role";

revoke truncate on table "public"."school" from "service_role";

revoke update on table "public"."school" from "service_role";

revoke delete on table "public"."series" from "anon";

revoke insert on table "public"."series" from "anon";

revoke references on table "public"."series" from "anon";

revoke select on table "public"."series" from "anon";

revoke trigger on table "public"."series" from "anon";

revoke truncate on table "public"."series" from "anon";

revoke update on table "public"."series" from "anon";

revoke delete on table "public"."series" from "authenticated";

revoke insert on table "public"."series" from "authenticated";

revoke references on table "public"."series" from "authenticated";

revoke select on table "public"."series" from "authenticated";

revoke trigger on table "public"."series" from "authenticated";

revoke truncate on table "public"."series" from "authenticated";

revoke update on table "public"."series" from "authenticated";

revoke delete on table "public"."series" from "service_role";

revoke insert on table "public"."series" from "service_role";

revoke references on table "public"."series" from "service_role";

revoke select on table "public"."series" from "service_role";

revoke trigger on table "public"."series" from "service_role";

revoke truncate on table "public"."series" from "service_role";

revoke update on table "public"."series" from "service_role";

revoke delete on table "public"."student" from "anon";

revoke insert on table "public"."student" from "anon";

revoke references on table "public"."student" from "anon";

revoke select on table "public"."student" from "anon";

revoke trigger on table "public"."student" from "anon";

revoke truncate on table "public"."student" from "anon";

revoke update on table "public"."student" from "anon";

revoke delete on table "public"."student" from "authenticated";

revoke insert on table "public"."student" from "authenticated";

revoke references on table "public"."student" from "authenticated";

revoke select on table "public"."student" from "authenticated";

revoke trigger on table "public"."student" from "authenticated";

revoke truncate on table "public"."student" from "authenticated";

revoke update on table "public"."student" from "authenticated";

revoke delete on table "public"."student" from "service_role";

revoke insert on table "public"."student" from "service_role";

revoke references on table "public"."student" from "service_role";

revoke select on table "public"."student" from "service_role";

revoke trigger on table "public"."student" from "service_role";

revoke truncate on table "public"."student" from "service_role";

revoke update on table "public"."student" from "service_role";

revoke delete on table "public"."teacher" from "anon";

revoke insert on table "public"."teacher" from "anon";

revoke references on table "public"."teacher" from "anon";

revoke select on table "public"."teacher" from "anon";

revoke trigger on table "public"."teacher" from "anon";

revoke truncate on table "public"."teacher" from "anon";

revoke update on table "public"."teacher" from "anon";

revoke delete on table "public"."teacher" from "authenticated";

revoke insert on table "public"."teacher" from "authenticated";

revoke references on table "public"."teacher" from "authenticated";

revoke select on table "public"."teacher" from "authenticated";

revoke trigger on table "public"."teacher" from "authenticated";

revoke truncate on table "public"."teacher" from "authenticated";

revoke update on table "public"."teacher" from "authenticated";

revoke delete on table "public"."teacher" from "service_role";

revoke insert on table "public"."teacher" from "service_role";

revoke references on table "public"."teacher" from "service_role";

revoke select on table "public"."teacher" from "service_role";

revoke trigger on table "public"."teacher" from "service_role";

revoke truncate on table "public"."teacher" from "service_role";

revoke update on table "public"."teacher" from "service_role";

revoke delete on table "public"."timetable" from "anon";

revoke insert on table "public"."timetable" from "anon";

revoke references on table "public"."timetable" from "anon";

revoke select on table "public"."timetable" from "anon";

revoke trigger on table "public"."timetable" from "anon";

revoke truncate on table "public"."timetable" from "anon";

revoke update on table "public"."timetable" from "anon";

revoke delete on table "public"."timetable" from "authenticated";

revoke insert on table "public"."timetable" from "authenticated";

revoke references on table "public"."timetable" from "authenticated";

revoke select on table "public"."timetable" from "authenticated";

revoke trigger on table "public"."timetable" from "authenticated";

revoke truncate on table "public"."timetable" from "authenticated";

revoke update on table "public"."timetable" from "authenticated";

revoke delete on table "public"."timetable" from "service_role";

revoke insert on table "public"."timetable" from "service_role";

revoke references on table "public"."timetable" from "service_role";

revoke select on table "public"."timetable" from "service_role";

revoke trigger on table "public"."timetable" from "service_role";

revoke truncate on table "public"."timetable" from "service_role";

revoke update on table "public"."timetable" from "service_role";

revoke delete on table "public"."timetable_school" from "anon";

revoke insert on table "public"."timetable_school" from "anon";

revoke references on table "public"."timetable_school" from "anon";

revoke select on table "public"."timetable_school" from "anon";

revoke trigger on table "public"."timetable_school" from "anon";

revoke truncate on table "public"."timetable_school" from "anon";

revoke update on table "public"."timetable_school" from "anon";

revoke delete on table "public"."timetable_school" from "authenticated";

revoke insert on table "public"."timetable_school" from "authenticated";

revoke references on table "public"."timetable_school" from "authenticated";

revoke select on table "public"."timetable_school" from "authenticated";

revoke trigger on table "public"."timetable_school" from "authenticated";

revoke truncate on table "public"."timetable_school" from "authenticated";

revoke update on table "public"."timetable_school" from "authenticated";

revoke delete on table "public"."timetable_school" from "service_role";

revoke insert on table "public"."timetable_school" from "service_role";

revoke references on table "public"."timetable_school" from "service_role";

revoke select on table "public"."timetable_school" from "service_role";

revoke trigger on table "public"."timetable_school" from "service_role";

revoke truncate on table "public"."timetable_school" from "service_role";

revoke update on table "public"."timetable_school" from "service_role";

alter table "public"."_teachertotimetable" drop constraint "_teachertotimetable_a_fkey";

alter table "public"."_teachertotimetable" drop constraint "_teachertotimetable_b_fkey";

alter table "public"."attendance" drop constraint "attendance_studentid_fkey";

alter table "public"."class_session" drop constraint "classsession_disciplineid_fkey";

alter table "public"."class_session" drop constraint "classsession_timetableid_fkey";

alter table "public"."classroom" drop constraint "classroom_seriesid_fkey";

alter table "public"."course" drop constraint "course_schoolid_fkey";

alter table "public"."discipline" drop constraint "discipline_teacherid_fkey";

alter table "public"."grade" drop constraint "grade_disciplineid_fkey";

alter table "public"."grade" drop constraint "grade_studentid_fkey";

alter table "public"."school" drop constraint "school_institutionid_fkey";

alter table "public"."series" drop constraint "series_courseid_fkey";

alter table "public"."series" drop constraint "series_timetableid_fkey";

alter table "public"."student" drop constraint "student_classroomid_fkey";

alter table "public"."teacher" drop constraint "teacher_schoolid_fkey";

alter table "public"."timetable" drop constraint "timetable_classroomid_fkey";

alter table "public"."timetable" drop constraint "timetable_disciplineid_fkey";

alter table "public"."timetable_school" drop constraint "timetableschool_schoolid_fkey";

alter table "public"."timetable_school" drop constraint "timetableschool_timetableid_fkey";

drop function if exists "public"."update_updated_at_column"();

alter table "public"."attendance" drop constraint "attendance_pkey";

alter table "public"."class_session" drop constraint "class_session_pkey";

alter table "public"."classroom" drop constraint "classroom_pkey";

alter table "public"."course" drop constraint "course_pkey";

alter table "public"."discipline" drop constraint "discipline_pkey";

alter table "public"."grade" drop constraint "grade_pkey";

alter table "public"."institution" drop constraint "institution_pkey";

alter table "public"."school" drop constraint "school_pkey";

alter table "public"."series" drop constraint "series_pkey";

alter table "public"."student" drop constraint "student_pkey";

alter table "public"."teacher" drop constraint "teacher_pkey";

alter table "public"."timetable" drop constraint "timetable_pkey";

alter table "public"."timetable_school" drop constraint "timetableschool_pkey";

drop index if exists "public"."_teachertotimetable_ab_unique";

drop index if exists "public"."_teachertotimetable_b_index";

drop index if exists "public"."attendance_pkey";

drop index if exists "public"."class_session_pkey";

drop index if exists "public"."classroom_pkey";

drop index if exists "public"."course_pkey";

drop index if exists "public"."discipline_pkey";

drop index if exists "public"."grade_pkey";

drop index if exists "public"."institution_pkey";

drop index if exists "public"."institution_singleton_key";

drop index if exists "public"."school_pkey";

drop index if exists "public"."series_pkey";

drop index if exists "public"."student_pkey";

drop index if exists "public"."teacher_pkey";

drop index if exists "public"."timetable_pkey";

drop index if exists "public"."timetableschool_pkey";

drop table "public"."_teachertotimetable";

drop table "public"."attendance";

drop table "public"."class_session";

drop table "public"."classroom";

drop table "public"."course";

drop table "public"."discipline";

drop table "public"."grade";

drop table "public"."institution";

drop table "public"."school";

drop table "public"."series";

drop table "public"."student";

drop table "public"."teacher";

drop table "public"."timetable";

drop table "public"."timetable_school";

drop type "public"."attendance_status";

drop type "public"."day_of_week";

drop type "public"."period";

drop type "public"."status";


