export function mapPathToBreadcrumbs(path: string, userMenus: any[]) {
	const breadcrumbs: any[] = []
	for (const menu of userMenus) {
		for (const submenu of menu.children) {
			if (submenu.url === path) {
				breadcrumbs.push({ name: menu.name })
				breadcrumbs.push({ name: submenu.name, path: submenu.url })
			}
		}
	}
	return breadcrumbs
}
