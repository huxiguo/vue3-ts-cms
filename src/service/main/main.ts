import myRequest from '..'

export function getEntireRoles() {
	return myRequest.post({
		url: '/role/list'
	})
}
export function getEntireDepartments() {
	return myRequest.post({
		url: '/department/list'
	})
}
