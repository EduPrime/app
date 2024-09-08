// store/user.js
import { defineStore } from 'pinia'
import { supabase } from '../supabaseClient'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: getUserFromSessionStorage(),
  }),
  actions: {
    async fetchUser() {
      const { data: { user } } = await supabase.auth.getSession()
      this.setUser(user)
    },
    setUser(user) {
      this.user = user
      sessionStorage.setItem('user', JSON.stringify(user))
    },
    clearUser() {
      this.user = null
      sessionStorage.removeItem('user')
    },
  },
})

function getUserFromSessionStorage() {
  const userString = sessionStorage.getItem('user')
  try {
    return userString ? JSON.parse(userString) : null
  }
  catch (error) {
    console.error('Erro ao fazer parse do usuário no sessionStorage:', error)
    sessionStorage.removeItem('user')
    return null
  }
}
