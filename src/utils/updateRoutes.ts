import { useAuthStore } from '@/store/AuthStore'

export function updateRoutes(router: any) {
    const routes = router.getRoutes()
    const authStore = useAuthStore()

    // Filtrar as rotas com base na role do usuário
    const filteredRoutes = routes.filter((route: { meta: { requiredRole: any } }) => {
        const requiredRoles = Array.isArray(route.meta?.requiredRole) ? route.meta.requiredRole : []

        if (requiredRoles.length === 0 || requiredRoles.includes('public')) {
            return true
        }
        if (!authStore.userLocal) {
            return false
        }
        return requiredRoles.includes(JSON.parse(authStore.userLocal).role)
    })

    // Remover todas as rotas atuais
    router.getRoutes().forEach((route: { name: any }) => {
        if (route.name) {
            router.removeRoute(route.name)
        }
    })

    // Adicionar as novas rotas
    filteredRoutes.forEach((route: any) => {
        router.addRoute(route as any)
    })
}