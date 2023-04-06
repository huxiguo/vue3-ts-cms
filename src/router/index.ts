import { LOGIN_TOKEN } from '@/global/constants'
import { localCache } from '@/utils/cache'
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
	history: createWebHashHistory(),
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
	if (to.path === '/main' && !token) {
		return '/login'
	}
})
export default router
