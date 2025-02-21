import type { User as UserLocal } from '@prisma/client'
import type { ClientOptions } from 'better-auth/types'
import router from '@/router'
import { useAuthStore } from '@/store/AuthStore'
import { getPostgrestURL } from '@/utils/getPostgrestURL'
import { betterAuth } from 'better-auth'
import { organizationClient } from 'better-auth/client/plugins'
import { createAuthClient } from 'better-auth/vue'
import { sendEmail } from '../utils/send-email'

const AUTH_API = import.meta.env.VITE_API_URL

/**
 * Authentication Service class for managing authentication requests.
 */
export class AuthService {
  public client: any
  public auth: any

  constructor() {
    this.auth = betterAuth({
      emailAndPassword: {
        enabled: true,
      },
      sendResetPassword: async ({ user, url, token }: { user: UserLocal, url: string, token: string }, request: any) => {
        await sendEmail({
          to: user.email || '',
          subject: 'Reset your password',
          text: `Click the link to reset your password: ${url}`,
        })
      },
    })

    this.client = createAuthClient<ClientOptions>({
      baseURL: AUTH_API,
      plugins: [
        organizationClient(),
      ],
    })
  }

  /**
   * Logs in a user with the provided credentials.
   * @param email User's email
   * @param password User's password
   * @returns A promise resolving to the user's session.
   */
  async login(email: string, password: string): Promise<UserLocal> {
    try {
      const { data } = await this.client.signIn.email({
        email,
        password,
      })
      if (!data) {
        throw new Error('Login failed: No data returned here')
      }
      // Get autorization token for PostgREST
      await this.postgrestToken()
      useAuthStore().login(data.user)
      return data.user as UserLocal
    }
    catch (error) {
      throw new Error(`Login failed: ${(error as Error).message}`)
    }
  }

  /**
   * Logs out the current user.
   * @returns A promise resolving when the user is logged out.
   */
  async logout(): Promise<void> {
    try {
      await this.client.signOut()
      useAuthStore().logout()
      router.push({ path: '/' })
    }
    catch (error) {
      throw new Error(`Logout failed: ${(error as Error).message}`)
    }
  }

  /**
   * Registers a new user.
   * @param email User's email
   * @param password User's password
   * @param name Full name.
   * @param image Profile picture.
   * @TODO FALTA INFORMAR A ORGANIZAÇÂO DO USUÁRIO
   * @returns A promise resolving to the created user.
   */
  async register(
    email: string,
    password: string,
    name: string,
    image?: string | null,
  ) {
    const response = await this.client.signUp.email({
      email,
      password,
      name,
      image: image ?? undefined,
    })
    const organizationId = useAuthStore().organization?.id
    this.addMemberToOrg(response.data.id, organizationId, 'member')
    if (response.data) {
      return response.data as UserLocal
    }
    else {
      console.error(`Registration failed: ${response.error.message}`)
      return response.error
    }
  }

  /**
   * Fetches the current authenticated user's data.
   * @returns A promise resolving to the user's session.
   */
  async getCurrentUser() {
    try {
      const session = await this.client.getSession()
      return session
    }
    catch (error) {
      throw new Error(`Failed to fetch user: ${(error as Error).message}`)
    }
  }

  /**
   * Retrieves the current session.
   * @returns A promise resolving to the current session.
   */
  async getSession() {
    try {
      const session = await this.client.getSession()
      return session
    }
    catch (error) {
      throw new Error(`Failed to retrieve session: ${(error as Error).message}`)
    }
  }

  /**
   * Sends a password reset email to the user.
   * @param email User's email
   * @returns A promise resolving when the email is sent.
   */
  async useSession() {
    try {
      const response = await this.client.useSession()
      return response
    }
    catch (error) {
      throw new Error(`Failed to use session: ${(error as Error).message}`)
    }
  }

  async forgetPassword(email: string) {
    try {
      await this.client.forgetPassword({ email })
    }
    catch (error) {
      throw new Error(`Password reset failed: ${(error as Error).message}`)
    }
  }

  async resetPassword(newPassword: string): Promise<void> {
    try {
      await this.client.resetPassword({ newPassword })
    }
    catch (error) {
      throw new Error(`Password reset failed: ${(error as Error).message}`)
    }
  }

  /**
   * Retrieves a list of organizations and their IDs.
   * @returns A promise resolving to an array of organizations with their details.
   */
  async listOrganizations(): Promise<{ id: string, name: string, logo: string, metadata: string, createdAt: Date, slug: string }[]> {
    try {
      const { data } = await this.client.organization.list()
      return data.map((org: any) => ({
        id: org.id,
        name: org.name,
        logo: org.logo,
        metadata: org.metadata,
        createdAt: new Date(org.createdAt),
        slug: org.slug,
      }))
    }
    catch (error) {
      throw new Error(`Failed to list organizations: ${(error as Error).message}`)
    }
  }

  /**
   * Sets the active organization by ID.
   * @param organizationId The ID of the organization to set as active.
   * @returns A promise resolving to the response of the set active request.
   */
  async setActiveOrganization(organizationId: string): Promise<void> {
    try {
      const { data } = await this.client.organization.setActive({
        organizationId,
      })
      useAuthStore().setOrganization(data)

      const user = await this.getLocalUser()
      if (user?.id)
        useAuthStore().loginLocalUser(user)

      return data
    }
    catch (error) {
      throw new Error(`Failed to set active organization: ${(error as Error).message}`)
    }
  }

  /**
   * Requests a remote token.
   * @returns A promise resolving to the token.
   */
  async postgrestToken(): Promise<string> {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL_TOKEN}/postgrest/token`, {
        method: 'POST',
        credentials: 'include',
      })

      if (!response.ok) {
        throw new Error(`Token request failed: ${response.statusText}`)
      }

      const data = await response.json()
      useAuthStore().setPostgrestToken(data.token)
      return data.token
    }
    catch (error) {
      throw new Error(`Token request failed: ${(error as Error).message}`)
    }
  }

  async getLocalUser(): Promise<UserLocal> {
    const token = useAuthStore().getPostgrestToken()
    if (!token) {
      throw new Error('No PostgREST token found')
    }
    const userId = useAuthStore().user?.id
    const postgresturl = getPostgrestURL()
    const url = `https://${postgresturl}/User?apiUserId=eq.${userId}`
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          mode: 'no-cors',
        },
      })
      const data = await response.json()
      return data[0] as UserLocal
    }
    catch (error) {
      throw new Error(`Failed to fetch user: ${(error as Error).message}`)
    }
  }

  async addMemberToOrg(userId: string, organizationId: string, role: string) {
    const response = await fetch(`${import.meta.env.VITE_BACK3ND_URL}/organization/add-member`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        organizationId,
        role,
      }),
    })
    return response
  }
}
