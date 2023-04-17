export default function mapMenuListToId(menuList: any[]) {
	const ids: number[] = []
	function recursGetId(menus: any[]) {
		for (const item of menus) {
			if (item.children) {
				recursGetId(item.children)
			} else {
				ids.push(item.id)
			}
		}
	}
	recursGetId(menuList)
	return ids
}
