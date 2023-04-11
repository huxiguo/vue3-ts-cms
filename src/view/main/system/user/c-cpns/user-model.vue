<template>
	<div class="user-model">
		<el-dialog
			v-model="dialogVisible"
			:title="isCreateUser ? '新建用户' : '编辑用户'"
			width="30%"
			center
			:close-on-click-modal="false"
		>
			<el-form
				label-width="80px"
				label-position="left"
				size="large"
				:model="dialogFormData"
				ref="dialogFormRef"
				:rules="dialogFormRule"
			>
				<el-form-item label="用户名" prop="name">
					<el-input
						placeholder="请输入用户名"
						clearable
						v-model:model-value="dialogFormData.name"
					/>
				</el-form-item>
				<el-form-item label="真实姓名" prop="realname">
					<el-input
						placeholder="请输入真实姓名"
						clearable
						v-model:model-value="dialogFormData.realname"
					/>
				</el-form-item>
				<el-form-item v-if="isCreateUser" label="密码" prop="password">
					<el-input
						placeholder="请输入密码"
						clearable
						show-password
						v-model:model-value="dialogFormData.password"
					/>
				</el-form-item>
				<el-form-item label="电话号码" prop="cellphone">
					<el-input
						placeholder="请输入电话号码"
						clearable
						v-model:model-value="dialogFormData.cellphone"
					/>
				</el-form-item>
				<el-form-item label="选择角色" prop="roleId">
					<el-select
						placeholder="请输入角色"
						clearable
						style="width: 100%"
						v-model:model-value="dialogFormData.roleId"
					>
						<template v-for="item in rolesList" :key="item.id">
							<el-option :label="item.name" :value="item.id" />
						</template>
					</el-select>
				</el-form-item>
				<el-form-item label="选择部门" prop="departmentId">
					<el-select
						placeholder="请输入部门"
						clearable
						style="width: 100%"
						v-model:model-value="dialogFormData.departmentId"
					>
						<template v-for="item in departmentList" :key="item.id">
							<el-option :label="item.name" :value="item.id" />
						</template>
					</el-select>
				</el-form-item>
			</el-form>
			<template #footer>
				<div>
					<el-button @click="handleCancleClick">取消</el-button>
					<el-button type="primary" @click="handleConfirmClick">
						确认
					</el-button>
				</div>
			</template>
		</el-dialog>
	</div>
</template>

<script setup lang="ts">
import useMainStore from '@/store/main/main'
import useSystemStore from '@/store/main/system/system'
import { ElMessage, type FormInstance } from 'element-plus'

const systemStore = useSystemStore()
const mainStore = useMainStore()
const { rolesList, departmentList } = storeToRefs(mainStore)

// 是否弹出dialog
const dialogVisible = ref(false)
// 是否是新建用户,还可以是编辑用户
const isCreateUser = ref(true)
// 表单数据
const dialogFormData = reactive<any>({
	name: '',
	realname: '',
	password: '',
	cellphone: '',
	roleId: '',
	departmentId: ''
})
// 传入的行数据
const editRowData = ref()
// 表单校验规则
const dialogFormRule = {
	name: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
	realname: [{ required: true, message: '请输入真实用户名', trigger: 'blur' }],
	password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
	roleId: [{ required: true, message: '请选择角色', trigger: 'blur' }],
	departmentId: [{ required: true, message: '请选择部门', trigger: 'blur' }]
}
// 表单Ref
const dialogFormRef = ref<FormInstance>()

// 取消创建用户
const handleCancleClick = () => {
	// 关闭弹窗
	dialogVisible.value = false
	// 重置表单
	dialogFormRef.value?.resetFields()
}

// 确定创建用户
const handleConfirmClick = () => {
	dialogFormRef.value?.validate(async valid => {
		// 验证成功
		if (valid) {
			// 新建用户
			if (isCreateUser.value) {
				systemStore.createUserAction(dialogFormData)
				// 关闭model
				dialogVisible.value = false
				// 重置表单
				dialogFormRef.value?.resetFields()
			} else {
				// 编辑用户
				const res = await systemStore.editUserAction(
					dialogFormData,
					editRowData.value.id
				)
				ElMessage({
					message: res.msg,
					type: res.code ? 'success' : 'error'
				})

				// 关闭model
				dialogVisible.value = false
				// 重置表单
				dialogFormRef.value?.resetFields()
			}
		}
	})
}
// 修改dialogVisible
const changeDialogData = (rowData?: any, isNew = true) => {
	dialogVisible.value = true
	isCreateUser.value = isNew
	// 回显dialog表单数据
	if (!isNew && rowData) {
		editRowData.value = rowData
		for (const key in dialogFormData) {
			dialogFormData[key] = rowData[key]
		}
	} else {
		for (const key in dialogFormData) {
			dialogFormData[key] = ''
		}
		editRowData.value = null
	}
}

defineExpose({ changeDialogData })
</script>

<style lang="less" scoped></style>
