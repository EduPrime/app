import showToast from '@/utils/toast-alert'
import { defineStore } from 'pinia'

const apiUrl = import.meta.env.VITE_BACK3ND_URL

function isTokenExpired(token: string): boolean {
  try {
    const tokenPart = token.split('.')[1]
    const payload = JSON.parse(atob(tokenPart))
    return Date.now() >= payload.exp * 1000
  }
  catch (error) {
    console.error('Error decoding token:', error)
    return true
  }
}

async function setTokenStorage(token: string | null) {
  if (token) {
    localStorage.setItem('auth_token', token)
  }
  else {
    localStorage.removeItem('auth_token')
  }
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('auth_token') || null as string | null,
    user: null as any,
  }),

  actions: {
    async initializeAuthState() {
      if (this.token && !isTokenExpired(this.token)) {
        try {
          await this.fetchUserData()
        }
        catch (error) {
          console.error('Error fetching user data:', error)
          this.logout()
        }
      }
      else {
        this.logout()
      }
    },

    async login(email: string, password: string) {
      try {
        const response = await fetch(`${apiUrl}auth/login`, {
          method: 'POST',
          body: JSON.stringify({ email, password }),
          headers: {
            'Content-Type': 'application/json',
          },
        })
        if (!response.ok) {
          throw new Error(`Login failed! status: ${response.status}`)
        }

        const data = await response.json()
        if (!data.token) {
          throw new Error('Token is missing in the response')
        }
        await this.setToken(data.token)
        await this.fetchUserData()
        return this.user
      }
      catch (error) {
        console.error('Login failed:', error)
        throw error
      }
    },

    async register(email: string, password: string, cpf: string, name: string, phone: string) {
      try {
        const response = await fetch(`${apiUrl}auth/register`, {
          method: 'POST',
          body: JSON.stringify({ email, password, cpf, name, phone }),
          headers: {
            'Content-Type': 'application/json',
          },
        })
        if (!response.ok) {
          throw new Error(`Registration failed! status: ${response.status}`)
        }

        const data = await response.json()
        if (!data.token) {
          throw new Error('Token is missing in the response')
        }

        this.setToken(data.token)
        await this.fetchUserData()
        return this.user
      }
      catch (error) {
        console.error('Registration failed:', error)
        throw error
      }
    },

    async fetchUserData() {
      if (!this.token) {
        throw new Error('Token não encontrado')
      }

      try {
        const response = await fetch(`${apiUrl}me`, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        if (!response.ok) {
          throw new Error(`Failed to fetch user data: ${response.status}`)
        }
        this.user = await response.json()
      }
      catch (error) {
        console.error('Fetching user data failed:', error)
        throw error
      }
    },

    logout() {
      this.clearAuthData()
    },

    logoutWithToast() {
      this.logout()
      showToast('Sessão encerrada com sucesso!', 'top', 'success')
    },

    async setToken(token: string) {
      this.token = token
      await setTokenStorage(token)
    },

    async clearAuthData() {
      this.token = null
      this.user = null
      await setTokenStorage(null)
    },
  },
})
