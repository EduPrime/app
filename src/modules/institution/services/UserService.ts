// src/services/UserService.ts
import BaseService from '@/services/BaseService'
import { supabase } from '@/supabaseClient' // Make sure this is where your supabase client is initialized

class UserService extends BaseService<'role' | 'role_permission' | 'user_role'> {
  constructor() {
    super('role')
  }

  /**
   *
   * @param email New User Email
   * @param password Password
   * @param role User Role Id
   * @param school_id SchoolId
   * @returns
   */
  async createAuthUser(email: string, password: string, role: string, school_id: string) {
    const { data: user, error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      console.error('Error creating user:', error.message)
      return
    }

    const { data: roleAssignData, error: roleAssignError } = await supabase
      .from('user_role')
      .insert([{ user_id: user.user?.id, role_id: role, school_id }])

    if (roleAssignError) {
      console.error('Error assigning role:', roleAssignError.message)
    }
    else {
      return { user, roleAssignData }
    }
  }

  // Get all users from Supabase Auth
  async getUsers() {
    const { data: users, error } = await supabase.auth.admin.listUsers()
    if (error)
      throw error
    return users
  }

  // Get user roles
  async getUserRoles(userId: string) {
    const { data, error } = await this.client
      .from('user_role')
      .select('role_id')
      .eq('user_id', userId)
    if (error)
      throw error
    return data
  }

  async getAllRoles() {
    const { data, error } = await this.client
      .from('role')
      .select('role_id')
    if (error)
      throw error
    return data
  }

  // Get permissions for a specific role
  async getRolePermissions(roleId: string) {
    const { data, error } = await this.client
      .from('role_permission')
      .select('*')
      .eq('role_id', roleId)
    if (error)
      throw error
    return data
  }

  // Assign role to user
  async assignRole(userId: string, roleId: string, schoolId: string) {
    const { data, error } = await this.client
      .from('user_role')
      .insert({ user_id: userId, role_id: roleId, school_id: schoolId })
    if (error)
      throw error
    return data
  }

  // Update role permissions
  async updateRolePermissions(roleId: string, permissions: any) {
    const { data, error } = await this.client
      .from('role_permission')
      .update(permissions)
      .eq('role_id', roleId)
    if (error)
      throw error
    return data
  }

  async getAllUserRolesForSchool(schoolId: string) {
    const { data, error } = await this.client
      .from('role')
      .select('id, name, school_id')
      .eq('school_id', schoolId)
    if (error)
      throw error
    return { data }
  }
}

export default new UserService()
