<template>
	<div class="user-search">
		<el-form
			label-width="80px"
			size="large"
			:model="searchForm"
			ref="searchFormRef"
		>
			<el-row :gutter="20">
				<el-col :span="8">
					<el-form-item label="部门名称" prop="name">
						<el-input
							placeholder="请输入查询的部门名称"
							v-model:model-value="searchForm.name"
						/>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="部门领导" prop="leader">
						<el-input
							placeholder="请输入查询的部门领导"
							v-model:model-value="searchForm.leader"
						/>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="创建时间" prop="createAt">
						<el-date-picker
							v-model:model-value="searchForm.createAt"
							type="daterange"
							range-separator="-"
							start-placeholder="开始时间"
							end-placeholder="结束时间"
						/>
					</el-form-item>
				</el-col>
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
const emit = defineEmits(['queryClick', 'resetClick'])
const searchFormRef = ref<InstanceType<typeof ElForm>>()
const searchForm = reactive({
	name: '',
	leader: '',
	createAt: ''
})
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
