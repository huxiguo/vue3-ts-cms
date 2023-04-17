const modelConfig = {
	pageName: 'role',
	header: {
		newTitle: '新建角色',
		editTitle: '编辑角色'
	},
	formItem: [
		{
			type: 'input',
			label: '角色名称',
			prop: 'name',
			placeholder: '请输入角色名称'
		},
		{
			type: 'input',
			label: '权限介绍',
			prop: 'intro',
			placeholder: '请输入权限介绍'
		},
		{
			type: 'custom',
			slotName: 'menuList'
		}
	]
}
export default modelConfig
