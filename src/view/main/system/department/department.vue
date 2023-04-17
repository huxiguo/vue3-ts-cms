<template>
	<div class="department">
		<!-- 搜索 -->
		<pageSearch
			:search-config="searchConfig"
			@query-click="handlePageQueryClick"
			@reset-click="handlePageResetClick"
		/>
		<!-- 主体 -->
		<pageContent
			:content-config="contentConfig"
			ref="pageContentRef"
			@create-click="handlePageCreateClick"
			@edit-click="handlePageEditClick"
		>
			<template #createTime="scope">
				{{ formatUTC(scope.row.createAt) }}
			</template>
			<template #updateTime="scope">
				{{ formatUTC(scope.row.updateAt) }}
			</template>
		</pageContent>
		<!-- 弹框 -->
		<pageModel :model-config="modelConfigCpt" ref="pageModelRef" />
	</div>
</template>

<script setup lang="ts">
import { formatUTC } from '@/utils/format'
import pageSearch from '@/components/page-search/page-search.vue'
import pageContent from '@/components/page-content/page-content.vue'
import pageModel from '@/components/page-model/page-model.vue'
import searchConfig from './config/search.config'
import contentConfig from './config/contetnt.config'
import modelConfig from './config/model.config'
import useMainStore from '@/store/main/main'
import usePageModel from '@/hooks/usePageModel'
import usePageContent from '@/hooks/usePageContent'

// 添加option
const modelConfigCpt = computed<any>(() => {
	const mainStore = useMainStore()
	const list = mainStore.departmentList.map(item => {
		return { label: item.name, value: item.id }
	})
	modelConfig.formItem.forEach(item => {
		if (item.prop === 'parentId') {
			item.option!.push(...list)
		}
	})
	return modelConfig
})

const { pageContentRef, handlePageQueryClick, handlePageResetClick } =
	usePageContent()
const { pageModelRef, handlePageCreateClick, handlePageEditClick } =
	usePageModel()
</script>

<style lang="less" scoped></style>
