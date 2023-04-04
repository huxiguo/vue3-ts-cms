<template>
	<div class="login-panel">
		<h1 class="title">后台管理系统</h1>
		<div class="tabs">
			<el-tabs type="border-card" stretch v-model:model-value="activeName">
				<el-tab-pane name="account">
					<template #label>
						<div class="label">
							<el-icon><User /></el-icon>
							<span class="text">账号登录</span>
						</div>
					</template>
					<panelAccount />
				</el-tab-pane>
				<el-tab-pane label="手机登录" name="phone">
					<template #label>
						<div class="label">
							<el-icon><Iphone /></el-icon>
							<span class="text">手机登录</span>
						</div>
					</template>
					<panelPhone />
				</el-tab-pane>
			</el-tabs>
		</div>
		<div class="controls">
			<el-checkbox v-model="isKeepPwd" label="记住密码" size="large" />
			<el-link type="primary">忘记密码</el-link>
		</div>
		<el-button
			class="login-btn"
			type="primary"
			size="large"
			@click="handleLoginBtnClick"
		>
			立即登录
		</el-button>
	</div>
</template>

<script setup lang="ts">
import panelAccount from './panel-account.vue'
import panelPhone from './panel-phone.vue'
const isKeepPwd = ref(false)
const activeName = ref('account')
const handleLoginBtnClick = () => {
	if (activeName.value === 'phone') {
		console.log('phone is active')
	} else {
		console.log('account is active')
	}
}
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

	.label {
		display: flex;
		align-items: center;
		justify-content: center;

		.text {
			margin-left: 5px;
		}
	}

	.controls {
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
