import myRequest from '@/service'
import type { deleteUserRes } from '@/types/deleteUserByIdRes'
import type { UserInfo } from '@/types/serviceCreateUser'

export function postUserListData(queryInfo: any) {
	return myRequest.post({
		url: '/users/list',
		data: queryInfo
	})
}

export function deleteUserById(id: number) {
	return myRequest.delete<deleteUserRes>({
		url: `/users/${id}`
	})
}
export function createUser(userinfo: UserInfo) {
	return myRequest.post({
		url: '/users',
		data: userinfo
	})
}
export function editUser(userinfo: any, id: any) {
	return myRequest.patch({
		url: `/users/${id}`,
		data: userinfo
	})
}
