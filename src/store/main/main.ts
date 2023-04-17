import {
	getEntireDepartments,
	getEntireMenu,
	getEntireRoles
} from '@/service/main/main'

const useMainStore = defineStore('main', () => {
	const rolesList = ref<any[]>([])
	const departmentList = ref<any[]>([])
	const entireMenuList = ref<any[]>([])
	async function getUserRolesDataAction() {
		const {
			data: { list: roleRes }
		} = await getEntireRoles()
		const {
			data: { list: departmentRes }
		} = await getEntireDepartments()
		const { data: res } = await getEntireMenu()
		entireMenuList.value = res.list
		rolesList.value = roleRes
		departmentList.value = departmentRes
	}
	return {
		rolesList,
		departmentList,
		entireMenuList,
		getUserRolesDataAction
	}
})

export default useMainStore
