console.log(import.meta.env)
let BASE_URL = ''
if (import.meta.env.PROD) {
	// 生产环境
	BASE_URL = 'http://cms.yunog.cn'
} else {
	// 开发环境
	BASE_URL = 'http://cms.seekhoo.cn:8880'
}
export const TIME_OUT = 8000
export { BASE_URL }
