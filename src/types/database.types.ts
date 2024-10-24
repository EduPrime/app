export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      _teachertotimetable: {
        Row: {
          a: string
          b: string
        }
        Insert: {
          a: string
          b: string
        }
        Update: {
          a?: string
          b?: string
        }
        Relationships: [
          {
            foreignKeyName: '_teachertotimetable_a_fkey'
            columns: ['a']
            isOneToOne: false
            referencedRelation: 'teacher'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: '_teachertotimetable_b_fkey'
            columns: ['b']
            isOneToOne: false
            referencedRelation: 'timetable'
            referencedColumns: ['id']
          },
        ]
      }
      academic_year: {
        Row: {
          created_at: string
          deleted_at: string | null
          id: string
          metadata: Json | null
          ref_year: number
          school_id: string
          template_id: string
          updated_at: string | null
          user_created: string | null
        }
        Insert: {
          created_at?: string
          deleted_at?: string | null
          id?: string
          metadata?: Json | null
          ref_year: number
          school_id: string
          template_id: string
          updated_at?: string | null
          user_created?: string | null
        }
        Update: {
          created_at?: string
          deleted_at?: string | null
          id?: string
          metadata?: Json | null
          ref_year?: number
          school_id?: string
          template_id?: string
          updated_at?: string | null
          user_created?: string | null
        }
        Relationships: []
      }
      academic_year_template: {
        Row: {
          created_at: string
          deleted_at: string | null
          id: string
          metadata: Json | null
          name: string
          ref_year: number
          stage_count: number | null
          stages: Json
          updated_at: string | null
          user_created: string | null
        }
        Insert: {
          created_at?: string
          deleted_at?: string | null
          id?: string
          metadata?: Json | null
          name: string
          ref_year: number
          stage_count?: number | null
          stages: Json
          updated_at?: string | null
          user_created?: string | null
        }
        Update: {
          created_at?: string
          deleted_at?: string | null
          id?: string
          metadata?: Json | null
          name?: string
          ref_year?: number
          stage_count?: number | null
          stages?: Json
          updated_at?: string | null
          user_created?: string | null
        }
        Relationships: []
      }
      attendance: {
        Row: {
          created_at: string
          date: string
          deleted_at: string | null
          id: string
          metadata: Json | null
          school_id: string
          status: Database['public']['Enums']['attendance_status']
          student_id: string
          updated_at: string | null
          user_created: string | null
        }
        Insert: {
          created_at?: string
          date: string
          deleted_at?: string | null
          id?: string
          metadata?: Json | null
          school_id: string
          status: Database['public']['Enums']['attendance_status']
          student_id: string
          updated_at?: string | null
          user_created?: string | null
        }
        Update: {
          created_at?: string
          date?: string
          deleted_at?: string | null
          id?: string
          metadata?: Json | null
          school_id?: string
          status?: Database['public']['Enums']['attendance_status']
          student_id?: string
          updated_at?: string | null
          user_created?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'attendance_school_id_fkey'
            columns: ['school_id']
            isOneToOne: false
            referencedRelation: 'school'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'attendance_student_id_fkey'
            columns: ['student_id']
            isOneToOne: false
            referencedRelation: 'student'
            referencedColumns: ['id']
          },
        ]
      }
      class_session: {
        Row: {
          created_at: string
          day_of_week: Database['public']['Enums']['day_of_week']
          deleted_at: string | null
          discipline_id: string
          end_time: string
          id: string
          metadata: Json | null
          school_id: string
          start_time: string
          timetable_id: string
          updated_at: string | null
          user_created: string | null
        }
        Insert: {
          created_at?: string
          day_of_week: Database['public']['Enums']['day_of_week']
          deleted_at?: string | null
          discipline_id: string
          end_time: string
          id?: string
          metadata?: Json | null
          school_id: string
          start_time: string
          timetable_id: string
          updated_at?: string | null
          user_created?: string | null
        }
        Update: {
          created_at?: string
          day_of_week?: Database['public']['Enums']['day_of_week']
          deleted_at?: string | null
          discipline_id?: string
          end_time?: string
          id?: string
          metadata?: Json | null
          school_id?: string
          start_time?: string
          timetable_id?: string
          updated_at?: string | null
          user_created?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'class_session_discipline_id_fkey'
            columns: ['discipline_id']
            isOneToOne: false
            referencedRelation: 'discipline'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'class_session_school_id_fkey'
            columns: ['school_id']
            isOneToOne: false
            referencedRelation: 'school'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'class_session_timetable_id_fkey'
            columns: ['timetable_id']
            isOneToOne: false
            referencedRelation: 'timetable'
            referencedColumns: ['id']
          },
        ]
      }
      classroom: {
        Row: {
          abbreviation: string | null
          course_id: string
          created_at: string
          day_of_week: Database['public']['Enums']['day_of_week']
          deleted_at: string | null
          endTime: string
          endTimeInterval: string
          id: string
          institution_id: string
          maxStudents: number
          metadata: Json | null
          name: string
          period: Database['public']['Enums']['period']
          school_id: string
          series_id: string
          startTime: string
          startTimeInterval: string
          status: Database['public']['Enums']['status']
          teacher_id: string
          updated_at: string | null
          user_created: string | null
          year: number
        }
        Insert: {
          abbreviation?: string | null
          course_id: string
          created_at?: string
          day_of_week: Database['public']['Enums']['day_of_week']
          deleted_at?: string | null
          endTime: string
          endTimeInterval: string
          id?: string
          institution_id: string
          maxStudents: number
          metadata?: Json | null
          name: string
          period?: Database['public']['Enums']['period']
          school_id: string
          series_id: string
          startTime: string
          startTimeInterval: string
          status?: Database['public']['Enums']['status']
          teacher_id: string
          updated_at?: string | null
          user_created?: string | null
          year: number
        }
        Update: {
          abbreviation?: string | null
          course_id?: string
          created_at?: string
          day_of_week?: Database['public']['Enums']['day_of_week']
          deleted_at?: string | null
          endTime?: string
          endTimeInterval?: string
          id?: string
          institution_id?: string
          maxStudents?: number
          metadata?: Json | null
          name?: string
          period?: Database['public']['Enums']['period']
          school_id?: string
          series_id?: string
          startTime?: string
          startTimeInterval?: string
          status?: Database['public']['Enums']['status']
          teacher_id?: string
          updated_at?: string | null
          user_created?: string | null
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: 'classroom_course_id_fkey'
            columns: ['course_id']
            isOneToOne: false
            referencedRelation: 'course'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'classroom_institution_id_fkey'
            columns: ['institution_id']
            isOneToOne: false
            referencedRelation: 'institution'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'classroom_school_id_fkey'
            columns: ['school_id']
            isOneToOne: false
            referencedRelation: 'school'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'classroom_seriesid_fkey'
            columns: ['series_id']
            isOneToOne: false
            referencedRelation: 'series'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'classroom_teacher_id_fkey'
            columns: ['teacher_id']
            isOneToOne: false
            referencedRelation: 'teacher'
            referencedColumns: ['id']
          },
        ]
      }
      course: {
        Row: {
          created_at: string
          deleted_at: string | null
          id: string
          institution_id: string
          metadata: Json | null
          name: string
          course_stage: string
          workload: string
          teaching_type: string
          regime_type: string
          course_modality: string
          status: Database['public']['Enums']['status'] | null
          updated_at: string | null
          user_created: string | null
        }
        Insert: {
          created_at?: string
          deleted_at?: string | null
          id?: string
          institution_id: string
          metadata?: Json | null
          name: string
          course_stage: string
          workload: string
          teaching_type: string
          regime_type: string
          course_modality: string
          status?: Database['public']['Enums']['status'] | null
          updated_at?: string | null
          user_created?: string | null
        }
        Update: {
          created_at?: string
          deleted_at?: string | null
          id?: string
          institution_id?: string
          metadata?: Json | null
          name?: string
          course_stage?: string
          workload?: string
          teaching_type?: string
          regime_type?: string
          course_modality?: string
          status?: Database['public']['Enums']['status'] | null
          updated_at?: string | null
          user_created?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'course_institution_id_fkey'
            columns: ['institution_id']
            isOneToOne: false
            referencedRelation: 'institution'
            referencedColumns: ['id']
          },
        ]
      }
      discipline: {
        Row: {
          created_at: string
          deleted_at: string | null
          id: string
          metadata: Json | null
          name: string
          school_id: string
          status: Database['public']['Enums']['status'] | null
          teacher_id: string
          updated_at: string | null
          user_created: string | null
        }
        Insert: {
          created_at?: string
          deleted_at?: string | null
          id?: string
          metadata?: Json | null
          name: string
          school_id: string
          status?: Database['public']['Enums']['status'] | null
          teacher_id: string
          updated_at?: string | null
          user_created?: string | null
        }
        Update: {
          created_at?: string
          deleted_at?: string | null
          id?: string
          metadata?: Json | null
          name?: string
          school_id?: string
          status?: Database['public']['Enums']['status'] | null
          teacher_id?: string
          updated_at?: string | null
          user_created?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'discipline_school_id_fkey'
            columns: ['school_id']
            isOneToOne: false
            referencedRelation: 'school'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'discipline_teacher_id_fkey'
            columns: ['teacher_id']
            isOneToOne: false
            referencedRelation: 'teacher'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'discipline_teacherid_fkey'
            columns: ['teacher_id']
            isOneToOne: false
            referencedRelation: 'teacher'
            referencedColumns: ['id']
          },
        ]
      }
      document: {
        Row: {
          compression_applied: boolean | null
          created_at: string
          deleted_at: string | null
          file_hash: string | null
          file_name: string
          id: string
          is_current_version: boolean | null
          is_deleted: boolean | null
          metadata: Json | null
          mime_type: string
          size: number
          storage_path: string
          updated_at: string | null
          upload_date: string | null
          user_created: string | null
          version: number | null
        }
        Insert: {
          compression_applied?: boolean | null
          created_at?: string
          deleted_at?: string | null
          file_hash?: string | null
          file_name: string
          id?: string
          is_current_version?: boolean | null
          is_deleted?: boolean | null
          metadata?: Json | null
          mime_type: string
          size: number
          storage_path: string
          updated_at?: string | null
          upload_date?: string | null
          user_created?: string | null
          version?: number | null
        }
        Update: {
          compression_applied?: boolean | null
          created_at?: string
          deleted_at?: string | null
          file_hash?: string | null
          file_name?: string
          id?: string
          is_current_version?: boolean | null
          is_deleted?: boolean | null
          metadata?: Json | null
          mime_type?: string
          size?: number
          storage_path?: string
          updated_at?: string | null
          upload_date?: string | null
          user_created?: string | null
          version?: number | null
        }
        Relationships: []
      }
      enrollment: {
        Row: {
          classroom_id: string
          course_id: string
          created_at: string
          date_enrollment: string
          deleted_at: string | null
          enrollmentCode: string | null
          id: string
          institution_id: string
          name: string | null
          observations: string | null
          school_id: string
          series_id: string
          situation: Database['public']['Enums']['situation_type'] | null
          status: Database['public']['Enums']['status'] | null
          student_id: string
          updated_at: string | null
        }
        Insert: {
          classroom_id: string
          course_id: string
          created_at?: string
          date_enrollment: string
          deleted_at?: string | null
          enrollmentCode?: string | null
          id?: string
          institution_id: string
          name?: string | null
          observations?: string | null
          school_id: string
          series_id: string
          situation?: Database['public']['Enums']['situation_type'] | null
          status?: Database['public']['Enums']['status'] | null
          student_id: string
          updated_at?: string | null
        }
        Update: {
          classroom_id?: string
          course_id?: string
          created_at?: string
          date_enrollment?: string
          deleted_at?: string | null
          enrollmentCode?: string | null
          id?: string
          institution_id?: string
          name?: string | null
          observations?: string | null
          school_id?: string
          series_id?: string
          situation?: Database['public']['Enums']['situation_type'] | null
          status?: Database['public']['Enums']['status'] | null
          student_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'enrollment_classroom_id_fkey'
            columns: ['classroom_id']
            isOneToOne: false
            referencedRelation: 'classroom'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'enrollment_course_id_fkey'
            columns: ['course_id']
            isOneToOne: false
            referencedRelation: 'course'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'enrollment_institution_id_fkey'
            columns: ['institution_id']
            isOneToOne: false
            referencedRelation: 'institution'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'enrollment_school_id_fkey'
            columns: ['school_id']
            isOneToOne: false
            referencedRelation: 'school'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'enrollment_series_id_fkey'
            columns: ['series_id']
            isOneToOne: false
            referencedRelation: 'series'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'enrollment_student_id_fkey'
            columns: ['student_id']
            isOneToOne: false
            referencedRelation: 'student'
            referencedColumns: ['id']
          },
        ]
      }
      grade: {
        Row: {
          created_at: string
          date: string
          deleted_at: string | null
          discipline_id: string
          id: string
          metadata: Json | null
          school_id: string
          student_id: string
          updated_at: string | null
          user_created: string | null
          value: number
        }
        Insert: {
          created_at?: string
          date: string
          deleted_at?: string | null
          discipline_id: string
          id?: string
          metadata?: Json | null
          school_id: string
          student_id: string
          updated_at?: string | null
          user_created?: string | null
          value: number
        }
        Update: {
          created_at?: string
          date?: string
          deleted_at?: string | null
          discipline_id?: string
          id?: string
          metadata?: Json | null
          school_id?: string
          student_id?: string
          updated_at?: string | null
          user_created?: string | null
          value?: number
        }
        Relationships: [
          {
            foreignKeyName: 'grade_discipline_id_fkey'
            columns: ['discipline_id']
            isOneToOne: false
            referencedRelation: 'discipline'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'grade_disciplineid_fkey'
            columns: ['discipline_id']
            isOneToOne: false
            referencedRelation: 'discipline'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'grade_school_id_fkey'
            columns: ['school_id']
            isOneToOne: false
            referencedRelation: 'school'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'grade_student_id_fkey'
            columns: ['student_id']
            isOneToOne: false
            referencedRelation: 'student'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'grade_studentid_fkey'
            columns: ['student_id']
            isOneToOne: false
            referencedRelation: 'student'
            referencedColumns: ['id']
          },
        ]
      }
      holidays: {
        Row: {
          description: string | null
          holiday_date: string
          id: string
          name: string
          weekday: string | null
        }
        Insert: {
          description?: string | null
          holiday_date: string
          id?: string
          name: string
          weekday?: string | null
        }
        Update: {
          description?: string | null
          holiday_date?: string
          id?: string
          name?: string
          weekday?: string | null
        }
        Relationships: []
      }
      institution: {
        Row: {
          address: string | null
          city: string | null
          created_at: string
          deleted_at: string | null
          email: string | null
          id: string
          metadata: Json | null
          name: string
          phone: string | null
          postalcode: string | null
          singleton: number
          state: string | null
          updated_at: string | null
          user_created: string | null
        }
        Insert: {
          address?: string | null
          city?: string | null
          created_at?: string
          deleted_at?: string | null
          email?: string | null
          id?: string
          metadata?: Json | null
          name: string
          phone?: string | null
          postalcode?: string | null
          singleton?: number
          state?: string | null
          updated_at?: string | null
          user_created?: string | null
        }
        Update: {
          address?: string | null
          city?: string | null
          created_at?: string
          deleted_at?: string | null
          email?: string | null
          id?: string
          metadata?: Json | null
          name?: string
          phone?: string | null
          postalcode?: string | null
          singleton?: number
          state?: string | null
          updated_at?: string | null
          user_created?: string | null
        }
        Relationships: []
      }
      role: {
        Row: {
          id: string
          name: string
          school_id: string
        }
        Insert: {
          id?: string
          name: string
          school_id: string
        }
        Update: {
          id?: string
          name?: string
          school_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'role_school_id_fkey'
            columns: ['school_id']
            isOneToOne: false
            referencedRelation: 'school'
            referencedColumns: ['id']
          },
        ]
      }
      role_permission: {
        Row: {
          can_delete: boolean
          can_insert: boolean
          can_select: boolean
          can_update: boolean
          role_id: string
          school_id: string
          table: string
        }
        Insert: {
          can_delete: boolean
          can_insert: boolean
          can_select: boolean
          can_update: boolean
          role_id: string
          school_id: string
          table: string
        }
        Update: {
          can_delete?: boolean
          can_insert?: boolean
          can_select?: boolean
          can_update?: boolean
          role_id?: string
          school_id?: string
          table?: string
        }
        Relationships: [
          {
            foreignKeyName: 'role_permission_role_id_fkey'
            columns: ['role_id']
            isOneToOne: false
            referencedRelation: 'role'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'role_permission_school_id_fkey'
            columns: ['school_id']
            isOneToOne: false
            referencedRelation: 'school'
            referencedColumns: ['id']
          },
        ]
      }
      school: {
        Row: {
          abbreviation: string | null
          active: boolean
          address: string | null
          city: string | null
          created_at: string
          deleted_at: string | null
          email: string | null
          id: string
          institution_id: string
          logourl: string | null
          name: string
          phone: string | null
          postalcode: string | null
          school_zone: string | null
          social_network: string | null
          state: string | null
          updated_at: string | null
          user_created: string | null
          website: string | null
        }
        Insert: {
          abbreviation?: string | null
          active?: boolean
          address?: string | null
          city?: string | null
          created_at?: string
          deleted_at?: string | null
          email?: string | null
          id?: string
          institution_id: string
          logourl?: string | null
          name: string
          phone?: string | null
          postalcode?: string | null
          school_zone?: string | null
          social_network?: string | null
          state?: string | null
          updated_at?: string | null
          user_created?: string | null
          website?: string | null
        }
        Update: {
          abbreviation?: string | null
          active?: boolean
          address?: string | null
          city?: string | null
          created_at?: string
          deleted_at?: string | null
          email?: string | null
          id?: string
          institution_id?: string
          logourl?: string | null
          name?: string
          phone?: string | null
          postalcode?: string | null
          school_zone?: string | null
          social_network?: string | null
          state?: string | null
          updated_at?: string | null
          user_created?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'school_institutionid_fkey'
            columns: ['institution_id']
            isOneToOne: false
            referencedRelation: 'institution'
            referencedColumns: ['id']
          },
        ]
      }
      series: {
        Row: {
          course_id: string
          course_stage: Database['public']['Enums']['course_stage_type']
          created_at: string
          deleted_at: string | null
          graduate: Database['public']['Enums']['graduate_status']
          id: string
          institution_id: string | null
          metadata: Json | null
          name: string
          school_days: string
          timetable_id: string | null
          updated_at: string | null
          user_created: string | null
          workload: string
        }
        Insert: {
          course_id: string
          course_stage?: Database['public']['Enums']['course_stage_type']
          created_at?: string
          deleted_at?: string | null
          graduate?: Database['public']['Enums']['graduate_status']
          id?: string
          institution_id?: string | null
          metadata?: Json | null
          name: string
          school_days: string
          timetable_id?: string | null
          updated_at?: string | null
          user_created?: string | null
          workload: string
        }
        Update: {
          course_id?: string
          course_stage?: Database['public']['Enums']['course_stage_type']
          created_at?: string
          deleted_at?: string | null
          graduate?: Database['public']['Enums']['graduate_status']
          id?: string
          institution_id?: string | null
          metadata?: Json | null
          name?: string
          school_days?: string
          timetable_id?: string | null
          updated_at?: string | null
          user_created?: string | null
          workload?: string
        }
        Relationships: [
          {
            foreignKeyName: 'series_course_id_fkey'
            columns: ['course_id']
            isOneToOne: false
            referencedRelation: 'course'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'series_courseid_fkey'
            columns: ['course_id']
            isOneToOne: false
            referencedRelation: 'course'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'series_institution_id_fkey'
            columns: ['institution_id']
            isOneToOne: false
            referencedRelation: 'institution'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'series_timetable_id_fkey'
            columns: ['timetable_id']
            isOneToOne: false
            referencedRelation: 'timetable'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'series_timetableid_fkey'
            columns: ['timetable_id']
            isOneToOne: false
            referencedRelation: 'timetable'
            referencedColumns: ['id']
          },
        ]
      }
      student: {
        Row: {
          address: string | null
          birthdate: string
          city: string | null
          complement: string | null
          cpf: string
          created_at: string
          deleted_at: string | null
          docsType: string | null
          email: string | null
          father_cpf: string | null
          father_email: string | null
          father_name: string | null
          father_phone: string | null
          gender: Database['public']['Enums']['gender_type'] | null
          id: string
          metadata: Json | null
          mother_cpf: string | null
          mother_email: string | null
          mother_name: string | null
          mother_phone: string | null
          name: string
          neighborhood: string | null
          new_birth_cert_number: string | null
          number_address: string | null
          old_birth_cert_book: string | null
          old_birth_cert_date_issue: string | null
          old_birth_cert_sheet: string | null
          old_birth_cert_state: string | null
          old_birth_cert_term: string | null
          phone: string
          photo: string | null
          place_of_birth: string | null
          postalcode: string | null
          residence_zone:
            | Database['public']['Enums']['residence_zone_type']
            | null
          responsibleType: Database['public']['Enums']['responsibletype'] | null
          rg_issue_date: string | null
          rg_issuer: string | null
          rg_number: string | null
          rg_state: string | null
          status: Database['public']['Enums']['status'] | null
          race: Database['public']['Enums']['race_type'] | null
          deficiency: Database['public']['Enums']['deficiency_type'] | null
          deficiency_description: string | null
          updated_at: string | null
          user_created: string | null
        }
        Insert: {
          address?: string | null
          birthdate: string
          city?: string | null
          complement?: string | null
          cpf: string
          created_at?: string
          deleted_at?: string | null
          docsType?: string | null
          email?: string | null
          father_cpf?: string | null
          father_email?: string | null
          father_name?: string | null
          father_phone?: string | null
          gender?: Database['public']['Enums']['gender_type'] | null
          id?: string
          metadata?: Json | null
          mother_cpf?: string | null
          mother_email?: string | null
          mother_name?: string | null
          mother_phone?: string | null
          name: string
          neighborhood?: string | null
          new_birth_cert_number?: string | null
          number_address?: string | null
          old_birth_cert_book?: string | null
          old_birth_cert_date_issue?: string | null
          old_birth_cert_sheet?: string | null
          old_birth_cert_state?: string | null
          old_birth_cert_term?: string | null
          phone: string
          photo?: string | null
          place_of_birth?: string | null
          postalcode?: string | null
          residence_zone?:
            | Database['public']['Enums']['residence_zone_type']
            | null
          responsibleType?:
            | Database['public']['Enums']['responsibletype']
            | null
          rg_issue_date?: string | null
          rg_issuer?: string | null
          rg_number?: string | null
          rg_state?: string | null
          status?: Database['public']['Enums']['status'] | null
          race: Database['public']['Enums']['race_type'] | null
          deficiency: Database['public']['Enums']['deficiency_type'] | null
          deficiency_description: string | null
          updated_at?: string | null
          user_created?: string | null
        }
        Update: {
          address?: string | null
          birthdate?: string
          city?: string | null
          complement?: string | null
          cpf?: string
          created_at?: string
          deleted_at?: string | null
          docsType?: string | null
          email?: string | null
          father_cpf?: string | null
          father_email?: string | null
          father_name?: string | null
          father_phone?: string | null
          gender?: Database['public']['Enums']['gender_type'] | null
          id?: string
          metadata?: Json | null
          mother_cpf?: string | null
          mother_email?: string | null
          mother_name?: string | null
          mother_phone?: string | null
          name?: string
          neighborhood?: string | null
          new_birth_cert_number?: string | null
          number_address?: string | null
          old_birth_cert_book?: string | null
          old_birth_cert_date_issue?: string | null
          old_birth_cert_sheet?: string | null
          old_birth_cert_state?: string | null
          old_birth_cert_term?: string | null
          phone?: string
          photo?: string | null
          place_of_birth?: string | null
          postalcode?: string | null
          residence_zone?:
            | Database['public']['Enums']['residence_zone_type']
            | null
          responsibleType?:
            | Database['public']['Enums']['responsibletype']
            | null
          rg_issue_date?: string | null
          rg_issuer?: string | null
          rg_number?: string | null
          rg_state?: string | null
          status?: Database['public']['Enums']['status'] | null
          race: Database['public']['Enums']['race_type'] | null
          deficiency: Database['public']['Enums']['deficiency_type'] | null
          deficiency_description: string | null
          updated_at?: string | null
          user_created?: string | null
        }
        Relationships: [
        ]
      }
      teacher: {
        Row: {
          address: string | null
          birthdate: string
          created_at: string
          deleted_at: string | null
          email: string | null
          id: string
          metadata: Json | null
          name: string
          phone: string | null
          qualifications: Json | null
          school_id: string
          showDetails: boolean
          status: Database['public']['Enums']['status'] | null
          updated_at: string | null
          user_created: string | null
        }
        Insert: {
          address?: string | null
          birthdate: string
          created_at?: string
          deleted_at?: string | null
          email?: string | null
          id?: string
          metadata?: Json | null
          name: string
          phone?: string | null
          qualifications?: Json | null
          school_id: string
          showDetails: boolean
          status?: Database['public']['Enums']['status'] | null
          updated_at?: string | null
          user_created?: string | null
        }
        Update: {
          address?: string | null
          birthdate?: string
          created_at?: string
          deleted_at?: string | null
          email?: string | null
          id?: string
          metadata?: Json | null
          name?: string
          phone?: string | null
          qualifications?: Json | null
          school_id?: string
          showDetails?: boolean
          status?: Database['public']['Enums']['status'] | null
          updated_at?: string | null
          user_created?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'teacher_school_id_fkey'
            columns: ['school_id']
            isOneToOne: false
            referencedRelation: 'school'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'teacher_schoolid_fkey'
            columns: ['school_id']
            isOneToOne: false
            referencedRelation: 'school'
            referencedColumns: ['id']
          },
        ]
      }
      teacher_to_timetable: {
        Row: {
          school_id: string
          teacher_id: string
          timetable_id: string
        }
        Insert: {
          school_id: string
          teacher_id: string
          timetable_id: string
        }
        Update: {
          school_id?: string
          teacher_id?: string
          timetable_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'teacher_to_timetable_school_id_fkey'
            columns: ['school_id']
            isOneToOne: false
            referencedRelation: 'school'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'teacher_to_timetable_teacher_id_fkey'
            columns: ['teacher_id']
            isOneToOne: false
            referencedRelation: 'teacher'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'teacher_to_timetable_timetable_id_fkey'
            columns: ['timetable_id']
            isOneToOne: false
            referencedRelation: 'timetable'
            referencedColumns: ['id']
          },
        ]
      }
      timetable: {
        Row: {
          classroom_id: string
          created_at: string
          deleted_at: string | null
          discipline_id: string | null
          id: string
          metadata: Json | null
          name: string
          school_id: string
          updated_at: string | null
          user_created: string | null
        }
        Insert: {
          classroom_id: string
          created_at?: string
          deleted_at?: string | null
          discipline_id?: string | null
          id?: string
          metadata?: Json | null
          name: string
          school_id: string
          updated_at?: string | null
          user_created?: string | null
        }
        Update: {
          classroom_id?: string
          created_at?: string
          deleted_at?: string | null
          discipline_id?: string | null
          id?: string
          metadata?: Json | null
          name?: string
          school_id?: string
          updated_at?: string | null
          user_created?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'timetable_classroom_id_fkey'
            columns: ['classroom_id']
            isOneToOne: false
            referencedRelation: 'classroom'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'timetable_classroomid_fkey'
            columns: ['classroom_id']
            isOneToOne: false
            referencedRelation: 'classroom'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'timetable_discipline_id_fkey'
            columns: ['discipline_id']
            isOneToOne: false
            referencedRelation: 'discipline'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'timetable_disciplineid_fkey'
            columns: ['discipline_id']
            isOneToOne: false
            referencedRelation: 'discipline'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'timetable_school_id_fkey'
            columns: ['school_id']
            isOneToOne: false
            referencedRelation: 'school'
            referencedColumns: ['id']
          },
        ]
      }
      timetable_school: {
        Row: {
          created_at: string
          deleted_at: string | null
          metadata: Json | null
          school_id: string
          timetable_id: string
          updated_at: string | null
          user_created: string | null
        }
        Insert: {
          created_at?: string
          deleted_at?: string | null
          metadata?: Json | null
          school_id: string
          timetable_id: string
          updated_at?: string | null
          user_created?: string | null
        }
        Update: {
          created_at?: string
          deleted_at?: string | null
          metadata?: Json | null
          school_id?: string
          timetable_id?: string
          updated_at?: string | null
          user_created?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'timetable_school_school_id_fkey'
            columns: ['school_id']
            isOneToOne: false
            referencedRelation: 'school'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'timetable_school_timetable_id_fkey'
            columns: ['timetable_id']
            isOneToOne: false
            referencedRelation: 'timetable'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'timetableschool_schoolid_fkey'
            columns: ['school_id']
            isOneToOne: false
            referencedRelation: 'school'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'timetableschool_timetableid_fkey'
            columns: ['timetable_id']
            isOneToOne: false
            referencedRelation: 'timetable'
            referencedColumns: ['id']
          },
        ]
      }
      user_role: {
        Row: {
          role_id: string
          school_id: string
          user_id: string
        }
        Insert: {
          role_id: string
          school_id: string
          user_id: string
        }
        Update: {
          role_id?: string
          school_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'user_role_role_id_fkey'
            columns: ['role_id']
            isOneToOne: false
            referencedRelation: 'role'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'user_role_school_id_fkey'
            columns: ['school_id']
            isOneToOne: false
            referencedRelation: 'school'
            referencedColumns: ['id']
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      calculate_business_days: {
        Args: {
          start_date: string
          end_date: string
        }
        Returns: number
      }
      can_delete: {
        Args: {
          p_table: string
        }
        Returns: boolean
      }
      can_insert: {
        Args: {
          p_table: string
        }
        Returns: boolean
      }
      can_select: {
        Args: {
          p_table: string
        }
        Returns: boolean
      }
      can_update: {
        Args: {
          p_table: string
        }
        Returns: boolean
      }
      current_school: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_header: {
        Args: {
          item: string
        }
        Returns: string
      }
      my_schools: {
        Args: Record<PropertyKey, never>
        Returns: string[]
      }
      setup_rls_policies: {
        Args: {
          ignore_tables?: string[]
        }
        Returns: undefined
      }
      validate_role: {
        Args: {
          role_name: string
        }
        Returns: boolean
      }
    }
    Enums: {
      attendance_status: 'PRESENT' | 'ABSENT' | 'EXCUSED'
      course_stage_type:
        | 'Etapa 1'
        | 'Etapa 2'
        | 'Etapa 3'
        | 'Etapa 4'
        | 'Etapa 5'
        | 'Etapa 6'
      day_of_week:
        | 'Segunda'
        | 'Terça'
        | 'Quarta'
        | 'Quinta'
        | 'Sexta'
        | 'Sábado'
        | 'Domingo'
      gender_type: 'Masculino' | 'Feminino'
      graduate_status: 'Sim' | 'Não'
      marital_status_type:
        | 'Solteiro'
        | 'Casado'
        | 'Divorciado'
        | 'Viúvo'
        | 'Separado'
        | 'União Estável'
        | 'Não Informado'
      period: 'Manhã' | 'Tarde' | 'Noite'
      residence_zone_type: 'Urbana' | 'Rural'
      responsibletype: 'Pai' | 'Mãe' | 'Ambos'
      race_type: 'Branca' | 'Preta' | 'Parda' | 'Amarela' | 'Indígena' | 'Não declarada'
      deficiency_type: 'Visual' | 'Auditiva' | 'Física' | 'Intelectual' | 'Mental' | 'Múltiplia' | 'Outros' | 'Não possui'
      situation_type:
        | 'Pendente'
        | 'Cursando'
        | 'Aprovado'
        | 'Aprovado pelo Conselho'
        | 'Aprovado com Dependência'
        | 'Reprovado'
        | 'Transferido'
        | 'Abandono'
        | 'Falecido'
      status: 'Ativo' | 'Inativo' | 'Graduado' | 'Suspenso' | 'Transferido'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, 'public'>]

export type Tables<
  PublicTableNameOrOptions extends
  | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
  | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
    Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
      ? R
      : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] &
    PublicSchema['Views'])
    ? (PublicSchema['Tables'] &
      PublicSchema['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
        ? R
        : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
  | keyof PublicSchema['Tables']
  | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
    Insert: infer I
  }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
  | keyof PublicSchema['Tables']
  | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
    Update: infer U
  }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
      Update: infer U
    }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
  | keyof PublicSchema['Enums']
  | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
    ? PublicSchema['Enums'][PublicEnumNameOrOptions]
    : never
