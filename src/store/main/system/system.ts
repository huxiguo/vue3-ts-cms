import { deleteUserById, postUserListData } from '@/service/main/system/system'
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
	return {
		useList,
		totalCount,
		postUserList,
		deleteUserByIdAction
	}
})
export default useSystemStore
