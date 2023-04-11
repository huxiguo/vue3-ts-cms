import { getEntireDepartments, getEntireRoles } from '@/service/main/main'

const useMainStore = defineStore('main', () => {
	const rolesList = ref<any[]>([])
	const departmentList = ref<any[]>([])
	async function getUserRolesDataAction() {
		const {
			data: { list: roleRes }
		} = await getEntireRoles()
		const {
			data: { list: departmentRes }
		} = await getEntireDepartments()
		rolesList.value = roleRes
		departmentList.value = departmentRes
	}
	return {
		rolesList,
		departmentList,
		getUserRolesDataAction
	}
})

export default useMainStore
