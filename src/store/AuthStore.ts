import type { User as UserLocal } from '@prisma/client'
import { useLocalStorage } from '@vueuse/core'
import { defineStore, skipHydrate } from 'pinia'
import { computed } from 'vue'


export const useAuthStore = defineStore('auth', () => {
    const user = useLocalStorage<string | null>('auth/user', null)
    const postgrestToken = useLocalStorage<string | null>('auth/postgrestToken', null)
    const organization = useLocalStorage<string | null>('auth/organization', null)
    const userLocal = useLocalStorage<string | null>('userLocal', null)
    const teacherId = useLocalStorage<string | null>('teacherId', null)
    const schoolId = useLocalStorage<string | null>('schoolId', null)
    const courseName = useLocalStorage<string | null>('courseName', null)

    const isAuthenticated = computed(() => {
        if (!user.value)
            return false
        try {
            JSON.parse(user.value)
            return true
        }
        catch {
            return false
        }
    })

    const parsedUser = computed(() => {
        if (!user.value)
            return null
        try {
            return JSON.parse(user.value)
        }
        catch (e) {
            console.error('Failed to parse user data from localStorage', e)
            return null
        }
    })

    const parsedOrganization = computed(() => {
        if (!organization.value)
            return null
        try {
            return JSON.parse(organization.value)
        }
        catch (e) {
            console.error('Failed to parse organization data from localStorage', e)
            return null
        }
    })

    // Methods
    function login(userData: UserLocal) {
        console.log('Logging in user:', userData)
        user.value = JSON.stringify(userData)
    }

    function loginLocalUser(userData: UserLocal) {
        console.log('Logging in local user:', userData)
        userLocal.value = JSON.stringify(userData)
    }
    function logout() {
        user.value = null
        organization.value = null
        postgrestToken.value = null
        userLocal.value = null
    }

    async function setPostgrestToken(token: string) {
        postgrestToken.value = token
    }

    function getPostgrestToken(): string | null {
        return postgrestToken.value
    }

    function setOrganization(org: Record<string, any>) {
        organization.value = JSON.stringify(org)
    }

    function setTeacherId(teacherid: string) {
        teacherId.value = teacherid
    }
    function setSchoolId(schoolid: string) {
        schoolId.value = schoolid
    }
    function setCourseName(coursename: string) {
        courseName.value = coursename
    }

    return {
        // Exposing parsed/computed values
        user: skipHydrate(parsedUser),
        organization: skipHydrate(parsedOrganization),
        userLocal: skipHydrate(userLocal),
        isAuthenticated,

        // Exposing methods
        setPostgrestToken,
        getPostgrestToken,
        setOrganization,
        setTeacherId,
        setSchoolId,
        setCourseName,
        login,
        loginLocalUser,
        logout,
    }
})
