const contentConfig = {
	pageName: 'menu',
	header: {
		title: '菜单列表',
		brnText: '新建菜单'
	},
	propsList: [
		{ label: '菜单名称', prop: 'name', width: '140px' },
		{ label: '级别', prop: 'type', width: '50px' },
		{ label: '菜单url', prop: 'url', width: '150px' },
		{ label: '菜单icon', prop: 'icon', width: '120px' },
		{ label: '排序', prop: 'sort', width: '60px' },
		{ label: '权限', prop: 'permission', width: '120px' },
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
	],
	childrenTree: {
		rowKey: 'id'
	}
}
export default contentConfig
