import {
	createPageData,
	createUser,
	deletePageById,
	deleteUserById,
	editPageData,
	editUser,
	postPageListData,
	postUserListData
} from '@/service/main/system/system'
import type { UserInfo } from '@/types/serviceCreateUser'
import type { userList } from '@/types/userList'

const useSystemStore = defineStore('system', () => {
	const useList = ref<userList[]>([])
	const totalCount = ref(0)
	const pageList = ref<any[]>([])
	const pageTotalCount = ref(0)
	async function postUserList(queryInfo: any) {
		const { data: res } = await postUserListData(queryInfo)
		useList.value = res.list
		totalCount.value = res.totalCount
	}
	async function deleteUserByIdAction(id: number) {
		const res = await deleteUserById(id)
		return res
	}
	async function createUserAction(userinfo: UserInfo) {
		await createUser(userinfo)
		postUserList({ size: 5, offset: 0 })
	}
	async function editUserAction(userinfo: any, id: any) {
		const res = await editUser(userinfo, id)
		postUserList({ size: 10, offset: 0 })
		return res
	}
	// 封装页面通用请求
	// 请求页面数据
	async function postPageListAction(pageName: string, queryInfo: any) {
		const pageListRes = await postPageListData(pageName, queryInfo)
		const { list, totalCount } = pageListRes.data
		pageList.value = list
		pageTotalCount.value = totalCount
	}
	// 删除
	async function deletePageByIdAction(pageName: string, id: number) {
		const deletePageByIdRes = await deletePageById(pageName, id)
		return deletePageByIdRes
	}
	// 编辑
	async function editPageByIdAction(
		pageName: string,
		pageInfo: any,
		id: number
	) {
		const editPageDataRes = await editPageData(pageName, pageInfo, id)
		postPageListAction(pageName, { offset: 0, size: 5 })
		return editPageDataRes
	}
	// 创建
	async function createPageDataAction(pageName: string, pageInfo: any) {
		const createPageDataRes = await createPageData(pageName, pageInfo)
		postPageListAction(pageName, { offset: 0, size: 5 })
		return createPageDataRes
	}
	return {
		useList,
		totalCount,
		pageList,
		pageTotalCount,
		postUserList,
		deleteUserByIdAction,
		createUserAction,
		editUserAction,
		// 封装
		postPageListAction,
		deletePageByIdAction,
		createPageDataAction,
		editPageByIdAction
	}
})
export default useSystemStore
