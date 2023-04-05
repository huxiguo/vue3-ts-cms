<template>
	<Suspense>
		<div>logiin</div>
	</Suspense>
</template>

<script setup lang="ts">
import myRequest from '@/service'
const { data: res } = await myRequest.post({
	url: '/login',
	data: {
		name: 'coderwhy',
		password: '123456'
	}
})
console.log('res', res)
</script>

<style scoped></style>
