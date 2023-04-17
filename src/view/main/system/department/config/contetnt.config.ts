const contentConfig = {
	pageName: 'department',
	header: {
		title: '部门列表',
		btnText: '新建部门'
	},
	propsList: [
		{ type: 'selection', width: '50px' },
		{ type: 'index', label: '#', width: '50px' },
		{ type: 'narmal', label: '部门名称', prop: 'name', width: '150px' },
		{ type: 'narmal', label: '部门领导', prop: 'leader', width: '150px' },
		{ type: 'narmal', label: '上级部门', prop: 'parentId', width: '150px' },
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
