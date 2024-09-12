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
          status?: Database['public']['Enums']['attendance_status']
          student_id?: string
          updated_at?: string | null
          user_created?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'attendance_studentid_fkey'
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
          start_time?: string
          timetable_id?: string
          updated_at?: string | null
          user_created?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'classsession_disciplineid_fkey'
            columns: ['discipline_id']
            isOneToOne: false
            referencedRelation: 'discipline'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'classsession_timetableid_fkey'
            columns: ['timetable_id']
            isOneToOne: false
            referencedRelation: 'timetable'
            referencedColumns: ['id']
          },
        ]
      }
      classroom: {
        Row: {
          created_at: string
          deleted_at: string | null
          id: string
          metadata: Json | null
          name: string
          period: Database['public']['Enums']['period']
          series_id: string
          status: Database['public']['Enums']['status'] | null
          updated_at: string | null
          user_created: string | null
        }
        Insert: {
          created_at?: string
          deleted_at?: string | null
          id?: string
          metadata?: Json | null
          name: string
          period?: Database['public']['Enums']['period']
          series_id: string
          status?: Database['public']['Enums']['status'] | null
          updated_at?: string | null
          user_created?: string | null
        }
        Update: {
          created_at?: string
          deleted_at?: string | null
          id?: string
          metadata?: Json | null
          name?: string
          period?: Database['public']['Enums']['period']
          series_id?: string
          status?: Database['public']['Enums']['status'] | null
          updated_at?: string | null
          user_created?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'classroom_seriesid_fkey'
            columns: ['series_id']
            isOneToOne: false
            referencedRelation: 'series'
            referencedColumns: ['id']
          },
        ]
      }
      course: {
        Row: {
          created_at: string
          deleted_at: string | null
          id: string
          metadata: Json | null
          name: string
          school_id: string
          status: Database['public']['Enums']['status'] | null
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
          updated_at?: string | null
          user_created?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'course_schoolid_fkey'
            columns: ['school_id']
            isOneToOne: false
            referencedRelation: 'school'
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
          status?: Database['public']['Enums']['status'] | null
          teacher_id?: string
          updated_at?: string | null
          user_created?: string | null
        }
        Relationships: [
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
      grade: {
        Row: {
          created_at: string
          date: string
          deleted_at: string | null
          discipline_id: string
          id: string
          metadata: Json | null
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
          student_id?: string
          updated_at?: string | null
          user_created?: string | null
          value?: number
        }
        Relationships: [
          {
            foreignKeyName: 'grade_disciplineid_fkey'
            columns: ['discipline_id']
            isOneToOne: false
            referencedRelation: 'discipline'
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
      school: {
        Row: {
          abbreviation: string | null
          access: number | null
          acronym: string | null
          active: boolean
          address: string | null
          administrativedependency: number | null
          availablearea: string | null
          blockdiaryentriesforclosedacademicyears: boolean | null
          builtarea: string | null
          city: string | null
          created_at: string
          creationdecree: string | null
          deleted_at: string | null
          energymeter: number | null
          floortype: number | null
          hasexternalarea: boolean | null
          id: string
          institution_id: string
          latitude: string | null
          logourl: string | null
          longitude: string | null
          manager_id: string | null
          managerposition: string | null
          metadata: Json | null
          name: string
          numberoffloors: number | null
          operationalstatus: number | null
          operationlocation: string | null
          phone: string | null
          postalcode: string | null
          regulation: number | null
          sharedschoolinepcode: number | null
          state: string | null
          totalarea: string | null
          updated_at: string | null
          user_created: string | null
        }
        Insert: {
          abbreviation?: string | null
          access?: number | null
          acronym?: string | null
          active?: boolean
          address?: string | null
          administrativedependency?: number | null
          availablearea?: string | null
          blockdiaryentriesforclosedacademicyears?: boolean | null
          builtarea?: string | null
          city?: string | null
          created_at?: string
          creationdecree?: string | null
          deleted_at?: string | null
          energymeter?: number | null
          floortype?: number | null
          hasexternalarea?: boolean | null
          id?: string
          institution_id: string
          latitude?: string | null
          logourl?: string | null
          longitude?: string | null
          manager_id?: string | null
          managerposition?: string | null
          metadata?: Json | null
          name: string
          numberoffloors?: number | null
          operationalstatus?: number | null
          operationlocation?: string | null
          phone?: string | null
          postalcode?: string | null
          regulation?: number | null
          sharedschoolinepcode?: number | null
          state?: string | null
          totalarea?: string | null
          updated_at?: string | null
          user_created?: string | null
        }
        Update: {
          abbreviation?: string | null
          access?: number | null
          acronym?: string | null
          active?: boolean
          address?: string | null
          administrativedependency?: number | null
          availablearea?: string | null
          blockdiaryentriesforclosedacademicyears?: boolean | null
          builtarea?: string | null
          city?: string | null
          created_at?: string
          creationdecree?: string | null
          deleted_at?: string | null
          energymeter?: number | null
          floortype?: number | null
          hasexternalarea?: boolean | null
          id?: string
          institution_id?: string
          latitude?: string | null
          logourl?: string | null
          longitude?: string | null
          manager_id?: string | null
          managerposition?: string | null
          metadata?: Json | null
          name?: string
          numberoffloors?: number | null
          operationalstatus?: number | null
          operationlocation?: string | null
          phone?: string | null
          postalcode?: string | null
          regulation?: number | null
          sharedschoolinepcode?: number | null
          state?: string | null
          totalarea?: string | null
          updated_at?: string | null
          user_created?: string | null
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
          created_at: string
          deleted_at: string | null
          id: string
          metadata: Json | null
          name: string
          timetable_id: string | null
          updated_at: string | null
          user_created: string | null
        }
        Insert: {
          course_id: string
          created_at?: string
          deleted_at?: string | null
          id?: string
          metadata?: Json | null
          name: string
          timetable_id?: string | null
          updated_at?: string | null
          user_created?: string | null
        }
        Update: {
          course_id?: string
          created_at?: string
          deleted_at?: string | null
          id?: string
          metadata?: Json | null
          name?: string
          timetable_id?: string | null
          updated_at?: string | null
          user_created?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'series_courseid_fkey'
            columns: ['course_id']
            isOneToOne: false
            referencedRelation: 'course'
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
          classroom_id: string
          created_at: string
          deleted_at: string | null
          email: string | null
          gender: string | null
          guardian_name: string | null
          guardian_phone: string | null
          id: string
          metadata: Json | null
          name: string
          phone: string | null
          photo: string | null
          status: Database['public']['Enums']['status'] | null
          updated_at: string | null
          user_created: string | null
        }
        Insert: {
          address?: string | null
          birthdate: string
          classroom_id: string
          created_at?: string
          deleted_at?: string | null
          email?: string | null
          gender?: string | null
          guardian_name?: string | null
          guardian_phone?: string | null
          id?: string
          metadata?: Json | null
          name: string
          phone?: string | null
          photo?: string | null
          status?: Database['public']['Enums']['status'] | null
          updated_at?: string | null
          user_created?: string | null
        }
        Update: {
          address?: string | null
          birthdate?: string
          classroom_id?: string
          created_at?: string
          deleted_at?: string | null
          email?: string | null
          gender?: string | null
          guardian_name?: string | null
          guardian_phone?: string | null
          id?: string
          metadata?: Json | null
          name?: string
          phone?: string | null
          photo?: string | null
          status?: Database['public']['Enums']['status'] | null
          updated_at?: string | null
          user_created?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'student_classroomid_fkey'
            columns: ['classroom_id']
            isOneToOne: false
            referencedRelation: 'classroom'
            referencedColumns: ['id']
          },
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
          status?: Database['public']['Enums']['status'] | null
          updated_at?: string | null
          user_created?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'teacher_schoolid_fkey'
            columns: ['school_id']
            isOneToOne: false
            referencedRelation: 'school'
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
          updated_at?: string | null
          user_created?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'timetable_classroomid_fkey'
            columns: ['classroom_id']
            isOneToOne: false
            referencedRelation: 'classroom'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'timetable_disciplineid_fkey'
            columns: ['discipline_id']
            isOneToOne: false
            referencedRelation: 'discipline'
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
    }
    Enums: {
      attendance_status: 'PRESENT' | 'ABSENT' | 'EXCUSED'
      day_of_week:
        | 'MONDAY'
        | 'TUESDAY'
        | 'WEDNESDAY'
        | 'THURSDAY'
        | 'FRIDAY'
        | 'SATURDAY'
        | 'SUNDAY'
      period: 'MORNING' | 'AFTERNOON' | 'EVENING'
      status: 'ACTIVE' | 'INACTIVE' | 'GRADUATED' | 'SUSPENDED' | 'TRANSFERRED'
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
