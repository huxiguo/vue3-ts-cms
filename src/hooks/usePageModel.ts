import type pageModel from '@/components/page-model/page-model.vue'

type EditCbType = (data: any) => void

export default function usePageModel(editCallback?: EditCbType) {
	// model 组件实例
	const pageModelRef = ref<InstanceType<typeof pageModel>>()
	// 页面创建按钮
	const handlePageCreateClick = () => {
		pageModelRef.value?.changeDialogData()
	}
	// 页面编辑按钮
	const handlePageEditClick = (rowData: any) => {
		pageModelRef.value?.changeDialogData(rowData, false)
		if (editCallback) editCallback(rowData)
	}
	return {
		pageModelRef,
		handlePageCreateClick,
		handlePageEditClick
	}
}
