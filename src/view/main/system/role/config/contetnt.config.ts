const contentConfig = {
	pageName: 'role',
	header: {
		title: '角色列表',
		btnText: '新建角色'
	},
	propsList: [
		{ type: 'selection', width: '50px' },
		{ type: 'index', label: '#', width: '50px' },
		{ type: 'narmal', label: '角色名称', prop: 'name', width: '150px' },
		{ type: 'narmal', label: '权限介绍', prop: 'intro', width: '150px' },
		// 自定义
		// 时间
		{
			type: 'custom',
			label: '创建时间',
			prop: 'createAt',
			soltName: 'createTime'
		},
		{
			type: 'custom',
			label: '更新时间',
			prop: 'updateAt',
			soltName: 'updateTime'
		},
		{
			type: 'handle',
			label: '操作',
			width: '150px'
		}
	]
}
export default contentConfig
