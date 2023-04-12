<template>
	<div class="department">
		<!-- 搜索 -->
		<pageSearch
			@query-click="handlePageQueryClick"
			@reset-click="handlePageResetClick"
		/>
		<!-- 主体 -->
		<pageContent
			ref="pageContentRef"
			@create-click="handlePageCreateClick"
			@edit-click="handlePageEditClick"
		/>
		<!-- 弹框 -->
		<pageModel ref="pageModelRef" />
	</div>
</template>

<script setup lang="ts">
import pageSearch from './c-cpns/page-search.vue'
import pageContent from './c-cpns/page-content.vue'
import pageModel from './c-cpns/page-model.vue'

// content 组件实例
const pageContentRef = ref<InstanceType<typeof pageContent>>()
// model 组件实例
const pageModelRef = ref<InstanceType<typeof pageModel>>()
// 页面点击查询按钮
const handlePageQueryClick = (queryInfo: any) => {
	pageContentRef.value?.fetchPageData(queryInfo)
}
// 页面点击重置按钮
const handlePageResetClick = () => {
	pageContentRef.value?.fetchPageData()
}
// 页面创建按钮
const handlePageCreateClick = () => {
	pageModelRef.value?.changeDialogData()
}
// 页面编辑按钮
const handlePageEditClick = (rowData: any) => {
	pageModelRef.value?.changeDialogData(rowData, false)
}
</script>

<style lang="less" scoped></style>
