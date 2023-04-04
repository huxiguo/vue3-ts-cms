<template>
	<div>
		<el-form
			:rules="accountRules"
			:model="account"
			label-width="60px"
			ref="accountLoginFormRef"
			status-icon
		>
			<el-form-item label="账号" prop="name">
				<el-input v-model:model-value="account.name" />
			</el-form-item>
			<el-form-item label="密码" prop="password">
				<el-input
					type="password"
					show-password
					v-model:model-value="account.password"
				/>
			</el-form-item>
		</el-form>
	</div>
</template>

<script setup lang="ts">
import type { FormRules } from 'element-plus'

const account = reactive({
	name: '',
	password: ''
})
// 校验规则
const accountRules: FormRules = {
	name: [
		{ required: true, message: '请输入用户名~', trigger: 'blur' },
		{ min: 3, max: 15, message: '长度在 3 ~ 15', trigger: 'blur' }
	],
	password: [
		{ required: true, message: '必须输入密码', trigger: 'blur' },
		{
			pattern: /^[a-z0-9]{3,}$/,
			message: '必须是3位以上',
			trigger: 'blur'
		}
	]
}
</script>

<style scoped></style>
