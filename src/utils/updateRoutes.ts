import { useAuthStore } from '@/store/AuthStore'

export async function updateRoutes(router: any, role: string) {
    const routes = router.getRoutes()
    // const authStore = useAuthStore()

    // console.log('updateRoutes', routes)
    // Filtrar as rotas com base na role do usuário
    const filteredRoutes = routes.filter((route: { meta: { requiredRole: any } }) => {
        const requiredRoles = Array.isArray(route.meta?.requiredRole) ? route.meta.requiredRole : []
        console.log('updateRoutes requiredRoles', requiredRoles)
        if (requiredRoles.length === 0 || requiredRoles.includes('public')) {
            return true
        }
        if (!role) {
            return false
        }
        return requiredRoles.includes(role)
    })

    // Remover todas as rotas atuais
    router.getRoutes().forEach((route: { name: any }) => {
        router.removeRoute(route.name)
    })

    // Adicionar as novas rotas
    filteredRoutes.forEach((route: any) => {
        router.addRoute(route as any)
    })
}