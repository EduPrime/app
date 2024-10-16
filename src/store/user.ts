import type { User } from '@supabase/supabase-js'
import { defineStore } from 'pinia'
import { supabase } from '../supabaseClient'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: getUserFromLocalStorage() as User | null, // User is either null or a valid User object
  }),
  actions: {
    async fetchUser() {
      const { data: { session } } = await supabase.auth.getSession()
      this.setUser(session?.user as User) // Set user from Supabase session
    },
    setUser(user: User | null) {
      this.user = user // Correctly update the user state here
    },
    async logout() {
      const { error } = await supabase.auth.signOut()
      if (error) {
        console.error('Error during logout:', error.message)
        return
      }
      this.clearUser()
    },
    clearUser() {
      this.user = null
    },
  },
})

function getUserFromLocalStorage() {
  const userString = localStorage.getItem('user')
  try {
    return userString ? JSON.parse(userString) : null // Parse user from localStorage
  }
  catch (error) {
    console.error('Error parsing user from localStorage:', error)
    localStorage.removeItem('user') // Clear invalid data
    return null
  }
}
