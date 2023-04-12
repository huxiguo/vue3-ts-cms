import myRequest from '@/service'
import type { deletePage } from '@/types/deletePageByIdRes'
import type { deleteUserRes } from '@/types/deleteUserByIdRes'
import type { UserInfo } from '@/types/serviceCreateUser'

/** 用户请求 **/
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

/** 页面请求 **/
export function postPageListData(pageName: string, queryInfo: any) {
	return myRequest.post({
		url: `/${pageName}/list`,
		data: queryInfo
	})
}
export function deletePageById(pageName: string, id: number) {
	return myRequest.delete<deletePage>({
		url: `/${pageName}/${id}`
	})
}
export function createPageData(pageName: string, pageInfo: any) {
	return myRequest.post({
		url: `/${pageName}`,
		data: pageInfo
	})
}
export function editPageData(pageName: string, pageinfo: any, id: any) {
	return myRequest.patch({
		url: `/${pageName}/${id}`,
		data: pageinfo
	})
}
