<template>
	<div class="login-panel">
		<h1 class="title">后台管理系统</h1>
		<div class="tabs">tabs</div>
		<div class="controls">
			<el-checkbox v-model="isKeepPwd" label="记住密码" size="large" />
			<el-link type="primary">忘记密码</el-link>
		</div>
		<div class="login-btn">aaa</div>
	</div>
</template>

<script setup lang="ts">
const isKeepPwd = ref(false)
</script>

<style scoped lang="less">
.login-panel {
	width: 330px;
	margin-bottom: 150px;

	.title {
		font-size: 25px;
		text-align: center;
		margin-bottom: 15px;
	}

	.icon {
		display: flex;
		align-items: center;
		justify-content: center;

		.text {
			margin-left: 5px;
		}
	}

	.control-account {
		margin-top: 12px;
		display: flex;

		justify-content: space-between;
	}

	.login-btn {
		margin-top: 10px;
		width: 100%;
	}
}
</style>
