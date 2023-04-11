import type { IAccount } from '@/types/login'
import myRequest from '..'

export function accountLoginRequest(account: IAccount) {
	return myRequest.post({
		url: '/login',
		data: account
	})
}
export function getUserInfoById(id: number) {
	return myRequest.get({
		url: `/users/${id}`
	})
}
export function getUserMenusByRoleId(id: number) {
	return myRequest.get({
		url: `/role/${id}/menu`
	})
}
