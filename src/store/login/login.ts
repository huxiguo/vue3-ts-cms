import { accountLoginRequest } from '@/service/login/login'
import type { IAccount } from '@/types/login'
import { defineStore } from 'pinia'
const useLoginStore = defineStore('login', () => {
	const token = ref(localStorage.getItem('token') ?? '')
	const id = ref('')
	const name = ref('')
	async function loginAccountAction(account: IAccount) {
		const { data: res } = await accountLoginRequest(account)
		token.value = res.token
		id.value = res.id
		name.value = res.name
		// 本地缓存
		localStorage.setItem('token', token.value)
	}
	return {
		token,
		id,
		name,
		loginAccountAction
	}
})
export default useLoginStore
