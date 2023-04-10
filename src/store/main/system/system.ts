import { postUserListData } from '@/service/main/system/system'
import type { userList } from '@/types/userList'

const useSystemStore = defineStore('system', () => {
	const useList = ref<userList[]>([])
	const totalCount = ref(0)
	async function postUserList() {
		const { data: res } = await postUserListData()
		useList.value = res.list
		totalCount.value = res.totalCount
	}
	return {
		useList,
		totalCount,
		postUserList
	}
})
export default useSystemStore
