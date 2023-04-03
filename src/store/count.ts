import { defineStore } from 'pinia'
import { ref } from 'vue'
const useCountStore = defineStore('counter', () => {
	const num = ref(100)
	return {
		num
	}
})
export default useCountStore
