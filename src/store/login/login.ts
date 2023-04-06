import { LOGIN_TOKEN } from '@/global/constants'
import router from '@/router'
import { accountLoginRequest } from '@/service/login/login'
import type { IAccount } from '@/types/login'
import { localCache } from '@/utils/cache'
import { ElMessage } from 'element-plus'
import { defineStore } from 'pinia'
const useLoginStore = defineStore('login', () => {
	const token = ref(localCache.getCache(LOGIN_TOKEN) ?? '')
	const id = ref('')
	const name = ref('')
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
			id.value = data.id
			name.value = data.name
			// 本地缓存
			localCache.setCache(LOGIN_TOKEN, token.value)
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
		id,
		name,
		loginAccountAction
	}
})
export default useLoginStore
