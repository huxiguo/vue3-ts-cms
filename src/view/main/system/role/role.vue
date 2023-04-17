<template>
	<div class="role">
		<PageSearch
			:search-config="SearchConfig"
			@query-click="handlePageQueryClick"
			@reset-click="handlePageResetClick"
		/>
		<PageContent
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
		</PageContent>
		<PageModel
			:model-config="modelConfig"
			:other-info="otherInfo"
			ref="pageModelRef"
		>
			<template #menuList>
				<el-tree
					ref="treeRef"
					:data="entireMenuList"
					node-key="id"
					:props="{ children: 'children', label: 'name' }"
					:highlight-current="true"
					show-checkbox
					style="width: 100%"
					@check="handleElTreeClick"
				/>
			</template>
		</PageModel>
	</div>
</template>

<script setup lang="ts">
import { formatUTC } from '@/utils/format'
import useMainStore from '@/store/main/main'

import PageSearch from '@/components/page-search/page-search.vue'
import PageContent from '@/components/page-content/page-content.vue'
import PageModel from '@/components/page-model/page-model.vue'

import SearchConfig from './config/search.config'
import contentConfig from './config/contetnt.config'
import modelConfig from './config/model.config'

import usePageContent from '@/hooks/usePageContent'
import usePageModel from '@/hooks/usePageModel'
import type { ElTree } from 'element-plus'
import mapMenuListToId from '@/utils/mapMenuList'
const mainStore = useMainStore()
const { entireMenuList } = storeToRefs(mainStore)
const { pageContentRef, handlePageQueryClick, handlePageResetClick } =
	usePageContent()
const { pageModelRef, handlePageCreateClick, handlePageEditClick } =
	usePageModel(editCallback)

const otherInfo = ref({})
const handleElTreeClick = (data1: any, data2: any) => {
	const menuList = [...data2.checkedKeys, ...data2.halfCheckedKeys]
	otherInfo.value = { menuList }
}
const treeRef = ref<InstanceType<typeof ElTree>>()
function editCallback(rowData: any) {
	const menuIds = mapMenuListToId(rowData.menuList)
	nextTick(() => {
		treeRef.value?.setCheckedKeys(menuIds)
	})
}
</script>

<style lang="less" scoped></style>
