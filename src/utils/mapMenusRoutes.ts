import type { RouteRecordRaw } from 'vue-router'
function LoadLocalRoutes() {
	const localRoutes: RouteRecordRaw[] = []
	const files: Record<string, any> = import.meta.glob('@/router/main/**/*.ts', {
		eager: true
	})
	for (const key in files) {
		const module = files[key]
		localRoutes.push(module.default)
	}
	return localRoutes
}
export let firstMenu: any = null
export default function MapMenusToRoutes(userMenus: any[]) {
	const localRoutes = LoadLocalRoutes()
	// 匹配用户权限路由动态添加路由
	const routes: RouteRecordRaw[] = []
	for (const menu of userMenus) {
		for (const submenu of menu.children) {
			const route = localRoutes.find(item => item.path === submenu.url)
			if (route) routes.push(route)
			if (!firstMenu && route) firstMenu = submenu
		}
	}
	return routes
}
