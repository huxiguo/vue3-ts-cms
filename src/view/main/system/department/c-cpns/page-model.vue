<template>
	<div class="user-model">
		<el-dialog
			v-model="dialogVisible"
			:title="isCreate ? '新建用户' : '编辑用户'"
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
				<el-form-item label="部门名称" prop="name">
					<el-input
						placeholder="请输入部门名称"
						clearable
						v-model:model-value="dialogFormData.name"
					/>
				</el-form-item>
				<el-form-item label="部门领导" prop="leader">
					<el-input
						placeholder="请输入部门领导"
						clearable
						v-model:model-value="dialogFormData.leader"
					/>
				</el-form-item>
				<el-form-item label="选择部门" prop="parentId">
					<el-select
						placeholder="请输入部门"
						clearable
						style="width: 100%"
						v-model:model-value="dialogFormData.parentId"
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
const { departmentList } = storeToRefs(mainStore)

// 是否弹出dialog
const dialogVisible = ref(false)
// 是否是新建,还可以是编辑
const isCreate = ref(true)
// 表单数据
const dialogFormData = reactive<any>({
	name: '',
	leader: '',
	parentId: ''
})
// 传入的行数据
const editRowData = ref()
// 表单校验规则
const dialogFormRule = {
	name: [{ required: true, message: '请输入部门名称', trigger: 'blur' }],
	leader: [{ required: true, message: '请输入部门领导', trigger: 'blur' }],
	parentId: [{ required: true, message: '请选择部门', trigger: 'blur' }]
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
			if (isCreate.value) {
				const res = await systemStore.createPageDataAction(
					'department',
					dialogFormData
				)
				// 关闭model
				dialogVisible.value = false
				// 重置表单
				dialogFormRef.value?.resetFields()
				ElMessage({
					message: res.msg,
					type: res.code ? 'success' : 'error'
				})
			} else {
				// 编辑用户
				const res = await systemStore.editPageByIdAction(
					'department',
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
	isCreate.value = isNew
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
