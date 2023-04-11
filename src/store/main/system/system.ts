import {
	createUser,
	deleteUserById,
	editUser,
	postUserListData
} from '@/service/main/system/system'
import type { UserInfo } from '@/types/serviceCreateUser'
import type { userList } from '@/types/userList'

const useSystemStore = defineStore('system', () => {
	const useList = ref<userList[]>([])
	const totalCount = ref(0)
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
		postUserList({ size: 10, offset: 0 })
	}
	async function editUserAction(userinfo: any, id: any) {
		const res = await editUser(userinfo, id)
		postUserList({ size: 10, offset: 0 })
		return res
	}
	return {
		useList,
		totalCount,
		postUserList,
		deleteUserByIdAction,
		createUserAction,
		editUserAction
	}
})
export default useSystemStore
