import { createPinia } from 'pinia'
import useLoginStore from './login/login'
import type { App } from 'vue'

const pinia = createPinia()

function registerStore(app: App) {
	app.use(pinia)
	const loginStore = useLoginStore()
	loginStore.LoadLocalCache()
}
export default registerStore
