import { localCache } from '@/utils/cache'
import { BASE_URL, TIME_OUT } from './config'
import Request from './request'
import { LOGIN_TOKEN } from '@/global/constants'

const myRequest = new Request({
	baseURL: BASE_URL,
	timeout: TIME_OUT,
	interceptors: {
		requestSuccessFn: config => {
			const token = localCache.getCache(LOGIN_TOKEN)
			if (config.headers && token) {
				config.headers.Authorization = `Bearer ${token}`
			}
			return config
		}
	}
})
export const myRequest2 = new Request({
	baseURL: BASE_URL,
	timeout: TIME_OUT,
	interceptors: {
		requestSuccessFn(config) {
			// console.log('request2 请求成功拦截')
			return config
		},
		requestFailureFn(err) {
			// console.log('request2 请求失败拦截')
			return err
		},
		responseSuccessFn(res) {
			// console.log('request2 响应成功拦截')
			return res
		},
		responseFailureFn(err) {
			// console.log('request2 响应士宝拦截')
			return err
		}
	}
})
export default myRequest
