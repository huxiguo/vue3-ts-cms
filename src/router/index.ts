import { LOGIN_TOKEN } from '@/global/constants'
import { localCache } from '@/utils/cache'
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
			component: () => import('@/view/main/main.vue'),
			children: [
				{
					path: '/main/analysis/dashboard',
					component: () =>
						import('@/view/main/analysis/dashboard/dashboard.vue')
				},
				{
					path: '/main/analysis/overview',
					component: () => import('@/view/main/analysis/overview/overview.vue')
				},
				{
					path: '/main/system/user',
					component: () => import('@/view/main/system/user/user.vue')
				},
				{
					path: '/main/system/role',
					component: () => import('@/view/main/system/role/role.vue')
				}
			]
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
