<template>
	<div>
		<el-form
			ref="accountLoginFormRef"
			:rules="accountRules"
			:model="account"
			label-width="60px"
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
import useLoginStore from '@/store/login/login'
import type { IAccount } from '@/types/login'
import { localCache } from '@/utils/cache'
import type { ElForm, FormRules } from 'element-plus'

const account = reactive<IAccount>({
	name: localCache.getCache('name') ?? '',
	password: localCache.getCache('password') ?? ''
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
const accountLoginFormRef = ref<InstanceType<typeof ElForm>>()

const loginStore = useLoginStore()
// 登录
const loginAction = (isKeepPwd: boolean) => {
	accountLoginFormRef.value?.validate(async (valid: boolean) => {
		if (valid) {
			// 请求登录
			const { name, password } = account
			loginStore.loginAccountAction({ name, password }).then(() => {
				if (isKeepPwd) {
					// 记住密码
					localCache.setCache('name', name)
					localCache.setCache('password', password)
				} else {
					localCache.removeCache('name')
					localCache.removeCache('password')
				}
			})
		} else {
			ElMessage({
				message: '请输入正确的账号和密码',
				type: 'error'
			})
		}
	})
}
// 暴露子组件里面属性
defineExpose({
	loginAction
})
</script>

<style scoped></style>
