import type { IAccount } from '@/types/login'
import myRequest from '..'

export function accountLoginRequest(account: IAccount) {
	return myRequest.post({
		url: '/login',
		data: account
	})
}
