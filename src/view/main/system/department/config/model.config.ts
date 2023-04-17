const modelConfig = {
	pageName: 'department',
	header: {
		newTitle: '新建部门',
		editTitle: '编辑部门'
	},
	formItem: [
		{
			type: 'input',
			label: '部门名称',
			prop: 'name',
			placeholder: '请输入部门名称'
		},
		{
			type: 'input',
			label: '部门领导',
			prop: 'leader',
			placeholder: '请输入部门领导'
		},
		{
			type: 'select',
			label: '上级部门',
			prop: 'parentId',
			placeholder: '请选择上级部门',
			option: [] as any
		}
	]
}
export default modelConfig
