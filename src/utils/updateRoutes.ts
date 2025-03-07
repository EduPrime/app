import { createRouter, createWebHistory } from "@ionic/vue-router"
import { useAuthStore } from "@/store/AuthStore"
import { AuthService } from "@/services/AuthService"

export function updateRoutes(routes: any) {
    const authStore = useAuthStore()
    const router = createRouter({
        history: createWebHistory(import.meta.env.BASE_URL),
        routes: routes.filter((route: any) => {

            // Se a rota não exige um role, ela deve ser mantida
            if (route.meta.requiredRole.length === 0) {
                return true
            }

            if (route.meta.requiredRole.includes('public')) {
                return true
            }

            // Sempre permitir a página de login
            if (route.path === '/login') {
                return true
            }

            // Se o usuário não estiver autenticado, bloquear
            if (!authStore.userLocal) {
                return false
            }
            // Verificar se o role do usuário está na lista de roles permitidas
            return route.meta.requiredRole.includes(JSON.parse(authStore.userLocal).role)
        }) as unknown as any,
    })

    router.beforeEach(async (to, from, next) => {
        try {
            const authService = new AuthService()
            await authService.getSession()
            if (!authStore.isAuthenticated) {
                // Evitar redirecionamento infinito
                if (to.path !== '/login') {
                    next('/login')
                }
                next()
            } else {
                // Usuário autenticado, permitir navegação

                if (to.path === '/login') {
                    // Se já autenticado, redirecionar da rota de login para home ou outra página
                    next('')
                }
                next()
            }
        } catch {
            console.log('Failed to get session')
            if (to.path !== "/login") {
                next("/login");
            }
            next();
        }
    })
    return router
}

export function resetRouter(router: any, routes: any) {
    const newRouter = updateRoutes(routes); // Criar uma nova instância do roteador

    // Removendo todas as rotas antigas para evitar conflitos
    router.getRoutes().forEach((route: any) => {
        router.removeRoute(route);
    });

    router = newRouter; // Atualiza a variável global do router
}