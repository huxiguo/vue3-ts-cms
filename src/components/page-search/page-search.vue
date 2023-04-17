<template>
	<div class="user-search">
		<el-form
			label-width="80px"
			size="large"
			:model="searchForm"
			ref="searchFormRef"
		>
			<el-row :gutter="20">
				<template v-for="item in searchConfig.formItem" :key="item.prop">
					<el-col :span="8">
						<el-form-item :label="item.label" :prop="item.prop">
							<template v-if="item.type === 'input'">
								<el-input
									v-model="searchForm[item.prop]"
									:placeholder="item.placeholder"
								></el-input>
							</template>
							<template v-if="item.type === 'date-picker'">
								<el-date-picker
									v-model:model-value="searchForm[item.prop]"
									type="daterange"
									range-separator="-"
									start-placeholder="开始时间"
									end-placeholder="结束时间"
								/>
							</template>
						</el-form-item>
					</el-col>
				</template>
			</el-row>
		</el-form>
		<div class="btn">
			<el-button icon="Refresh" size="large" @click="handleResetClick"
				>重置</el-button
			>
			<el-button
				type="primary"
				icon="Search"
				size="large"
				@click="handleSearchClick"
				>查询</el-button
			>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { ElForm } from 'element-plus'
interface PropsType {
	searchConfig: {
		formItem: any[]
	}
}

const props = defineProps<PropsType>()

const emit = defineEmits(['queryClick', 'resetClick'])
const searchFormRef = ref<InstanceType<typeof ElForm>>()

// 配置表单数据
const initForm: any = {}
for (const item of props.searchConfig.formItem) {
	initForm[item.prop] = ''
}
const searchForm = reactive(initForm)
// 重置按钮
const handleResetClick = () => {
	searchFormRef.value?.resetFields()
	emit('resetClick')
}
const handleSearchClick = () => {
	emit('queryClick', searchForm)
}
</script>

<style lang="less" scoped>
.user-search {
	background-color: #fff;
	padding: 20px;
	.el-form-item {
		padding: 20px 30px;
		margin-bottom: 0;
	}
	.btn {
		text-align: right;
		padding: 0 50px 10px 0;
		.el-button {
			height: 36px;
		}
	}
}
</style>
