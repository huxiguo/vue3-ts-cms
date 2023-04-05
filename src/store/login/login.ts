import { accountLoginRequest } from '@/service/login/login'
import type { IAccount } from '@/types/login'
import { localCache } from '@/utils/cache'
import { defineStore } from 'pinia'
const LOGIN_TOKEN = 'token'
const useLoginStore = defineStore('login', () => {
	const token = ref(localCache.getCache(LOGIN_TOKEN) ?? '')
	const id = ref('')
	const name = ref('')
	async function loginAccountAction(account: IAccount) {
		const { data: res } = await accountLoginRequest(account)
		token.value = res.token
		id.value = res.id
		name.value = res.name
		// 本地缓存
		localCache.setCache(LOGIN_TOKEN, token.value)
	}
	return {
		token,
		id,
		name,
		loginAccountAction
	}
})
export default useLoginStore
