import { LOGIN_TOKEN } from '@/global/constants'
import router from '@/router'
import {
	accountLoginRequest,
	getUserInfoById,
	getUserMenusByRoleId
} from '@/service/login/login'
import type { IAccount } from '@/types/login'
import { localCache } from '@/utils/cache'
import MapMenusToRoutes from '@/utils/mapMenusRoutes'
import { ElMessage } from 'element-plus'
import { defineStore } from 'pinia'
import useMainStore from '../main/main'

const useLoginStore = defineStore('login', () => {
	const token = ref<string>('')
	const userInfo = ref<any>({})
	const userMenus = ref<any>([])
	async function loginAccountAction(account: IAccount) {
		// 请求登录接口
		const res = await accountLoginRequest(account)
		if (res.msg === 'SUCCESS OK') {
			ElMessage({
				message: '登陆成功!',
				type: 'success'
			})
			const { data } = res
			token.value = data.token
			localCache.setCache(LOGIN_TOKEN, token.value)
			// 获取当前用户详细信息
			const getUserInfoByIdRes = await getUserInfoById(data.id)
			userInfo.value = getUserInfoByIdRes.data
			// 获取当前用户的menus
			const userMenusRes = await getUserMenusByRoleId(userInfo.value.role.id)
			userMenus.value = userMenusRes.data
			// 本地缓存

			localCache.setCache('userInfo', userInfo.value)
			localCache.setCache('userMenus', userMenus.value)

			// 请求role，department数据
			const mainStore = useMainStore()
			mainStore.getUserRolesDataAction()

			// 动态路由
			const routes = MapMenusToRoutes(userMenus.value)
			routes.forEach(item => router.addRoute('main', item))
			// 页面跳转
			router.push('/main')
		} else {
			ElMessage({
				message: res.msg,
				type: 'error'
			})
		}
	}
	function LoadLocalCache() {
		const LocalToken = localCache.getCache(LOGIN_TOKEN)
		const LocalUserInfo = localCache.getCache('userInfo')
		const LocalUserMenus = localCache.getCache('userMenus')
		if (LocalToken && LocalUserInfo && LocalUserMenus) {
			token.value = LocalToken
			userInfo.value = LocalUserInfo
			userMenus.value = LocalUserMenus
			// 请求role，department数据
			const mainStore = useMainStore()
			mainStore.getUserRolesDataAction()
			// 动态路由
			const routes = MapMenusToRoutes(userMenus.value)
			routes.forEach(item => router.addRoute('main', item))
		}
	}
	return {
		token,
		userInfo,
		userMenus,
		loginAccountAction,
		LoadLocalCache
	}
})
export default useLoginStore
