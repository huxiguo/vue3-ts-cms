import { LOGIN_TOKEN } from '@/global/constants'
import router from '@/router'
import {
	accountLoginRequest,
	getUserInfoById,
	getUserMenusByRoleId
} from '@/service/login/login'
import type { IAccount } from '@/types/login'
import { localCache } from '@/utils/cache'
import { ElMessage } from 'element-plus'
import { defineStore } from 'pinia'
const useLoginStore = defineStore('login', () => {
	const token = ref<string>(localCache.getCache(LOGIN_TOKEN) ?? '')
	const userInfo = ref<any>(localCache.getCache('userInfo') ?? {})
	const userMenus = ref<any>(localCache.getCache('userMenus') ?? [])
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
			console.log('userInfo.value', userInfo.value)
			// 获取当前用户的menus
			const userMenusRes = await getUserMenusByRoleId(userInfo.value.role.id)
			userMenus.value = userMenusRes.data
			// 本地缓存

			localCache.setCache('userInfo', userInfo.value)
			localCache.setCache('userMenus', userMenus.value)
			// 页面跳转
			router.push('/main')
		} else {
			ElMessage({
				message: res.msg,
				type: 'error'
			})
		}
	}
	return {
		token,
		userInfo,
		userMenus,
		loginAccountAction
	}
})
export default useLoginStore
