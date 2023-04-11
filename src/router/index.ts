import { LOGIN_TOKEN } from '@/global/constants'
import { localCache } from '@/utils/cache'
import { firstMenu } from '@/utils/mapMenusRoutes'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/',
			redirect: '/main'
		},
		{
			path: '/login',
			component: () => import('@/view/login/login.vue')
		},
		{
			path: '/main',
			name: 'main',
			component: () => import('@/view/main/main.vue')
		},
		{
			path: '/:pathMatch(.*)',
			component: () => import('@/view/not-found/Not-Found.vue')
		}
	]
})

// 导航守卫
router.beforeEach(to => {
	const token = localCache.getCache(LOGIN_TOKEN)
	if (to.path.startsWith('/main') && !token) {
		return '/login'
	}
	if (to.path === '/main') {
		localCache.setCache('activePath', firstMenu.url)
		return firstMenu.url
	}
})
export default router
