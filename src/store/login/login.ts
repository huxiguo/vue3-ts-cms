import { accountLoginRequest } from '@/service/login/login'
import { defineStore } from 'pinia'
const useLoginStore = defineStore('login', () => {
	const token = ''
	const id = ''
	const name = ''
	const loginAccountAction = async (account: any) => {
		const data = await accountLoginRequest(account)
	}
	return {
		token,
		id,
		name,
		loginAccountAction
	}
})
export default useLoginStore
