<template>
	<div class="user">
		<!-- 搜索 -->
		<userSearch
			@query-click="handleSearchClick"
			@reset-click="handleResetClick"
		/>
		<!-- content -->
		<userContent
			ref="userContentRef"
			@create-click="handleContentCreateUserClick"
			@edit-click="handleContentEditUserClick"
		/>
		<userModel ref="userModelRef" />
	</div>
</template>

<script setup lang="ts">
import userSearch from './c-cpns/user-search.vue'
import userContent from './c-cpns/user-content.vue'
import userModel from './c-cpns/user-model.vue'
// content 组件
const userContentRef = ref<InstanceType<typeof userContent>>()

// content 组件创建用户按钮事件
const handleContentCreateUserClick = () => {
	userModelRef.value?.changeDialogData()
}
// content 组件编辑用户按钮
const handleContentEditUserClick = (rowData: any) => {
	userModelRef.value?.changeDialogData(rowData, false)
}
// search 组件查询按钮事件
const handleSearchClick = (searchForm: any) => {
	userContentRef.value?.fetchListData(searchForm)
}

// search 组件重置按钮事件
const handleResetClick = () => {
	userContentRef.value?.fetchListData()
}

// Model 组件
const userModelRef = ref<InstanceType<typeof userModel>>()
</script>

<style lang="less" scoped>
.user {
	border-radius: 20px;
	overflow: hidden;
}
</style>
