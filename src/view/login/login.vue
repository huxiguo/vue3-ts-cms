<template>
	<div class="login">
		<loginPanel />
	</div>
</template>
<script setup lang="ts">
import loginPanel from './components/login-panel.vue'
</script>

<style scoped lang="less">
.login {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;
	background-image: url('@/assets/img/login-bg.svg');
}
</style>
