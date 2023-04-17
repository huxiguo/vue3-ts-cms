<template>
	<div class="user-model">
		<el-dialog
			v-model="dialogVisible"
			:title="
				isCreate ? modelConfig.header.newTitle : modelConfig.header.editTitle
			"
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
			>
				<template v-for="item in modelConfig.formItem" :key="item.prop">
					<el-form-item :label="item.label" :prop="item.prop">
						<template v-if="item.type === 'input'">
							<el-input
								v-model="dialogFormData[item.prop]"
								:placeholder="item.placeholder"
							/>
						</template>
						<template v-if="item.type === 'select'">
							<el-select
								v-model:model-value="dialogFormData[item.prop]"
								:placeholder="item.placeholder"
								style="width: 100%"
							>
								<template v-for="option in item.option" :key="option.value">
									<el-option
										:label="option.label"
										:value="option.value"
									></el-option>
								</template>
							</el-select>
						</template>
						<template v-if="item.type === 'custom'">
							<slot :name="item.slotName"> </slot>
						</template>
					</el-form-item>
				</template>
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
import useSystemStore from '@/store/main/system/system'
import { ElMessage, type FormInstance } from 'element-plus'

const systemStore = useSystemStore()

interface PropsType {
	modelConfig: {
		pageName: string
		header: {
			newTitle: string
			editTitle: string
		}
		formItem: any[]
	}
	otherInfo?: any
}
const props = defineProps<PropsType>()

// 是否弹出dialog
const dialogVisible = ref(false)
// 是否是新建,还可以是编辑
const isCreate = ref(true)
// 表单数据
const initData: any = {}
for (const item of props.modelConfig.formItem) {
	initData[item.prop] = ''
}
const dialogFormData = reactive<any>(initData)
// 传入的行数据
const editRowData = ref()
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
		let infoData = dialogFormData
		if (props.otherInfo) {
			infoData = { ...infoData, ...props.otherInfo }
		}
		// 验证成功
		if (valid) {
			// 新建用户
			if (isCreate.value) {
				const res = await systemStore.createPageDataAction(
					props.modelConfig.pageName,
					infoData
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
					props.modelConfig.pageName,
					infoData,
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
