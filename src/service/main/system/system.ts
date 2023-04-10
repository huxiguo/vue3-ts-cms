import myRequest from '@/service'
import type { deleteUserRes } from '@/types/deleteUserByIdRes'

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
