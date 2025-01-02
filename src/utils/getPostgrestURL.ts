import { useAuthStore } from '@/store/AuthStore'

export function getPostgrestURL() {
    const rawMetadata = useAuthStore().organization?.metadata
    const postgrestUrl = rawMetadata ? JSON.parse(rawMetadata).postgrest : null
    return postgrestUrl
}