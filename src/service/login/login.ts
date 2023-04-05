import myRequest from '..'

export function accountLoginRequest(account: any) {
	return myRequest.post({
		url: '/login',
		data: account
	})
}
