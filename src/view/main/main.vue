<template>
	<div>
		main
		<el-button type="primary" size="default" @click="logout">
			退出登录
		</el-button>
	</div>
</template>

<script setup lang="ts">
import { LOGIN_TOKEN } from '@/global/constants'
import { localCache } from '@/utils/cache'
const router = useRouter()
const logout = () => {
	// 删除token
	localCache.removeCache(LOGIN_TOKEN)
	// 跳转login
	router.push('/login')
}
</script>

<style scoped></style>
