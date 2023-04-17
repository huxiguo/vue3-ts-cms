import type pageContent from '@/components/page-content/page-content.vue'
export default function usePageContent() {
	// content 组件实例
	const pageContentRef = ref<InstanceType<typeof pageContent>>()

	// 页面点击查询按钮
	const handlePageQueryClick = (queryInfo: any) => {
		pageContentRef.value?.fetchPageData(queryInfo)
	}
	// 页面点击重置按钮
	const handlePageResetClick = () => {
		pageContentRef.value?.fetchPageData()
	}
	return {
		pageContentRef,
		handlePageQueryClick,
		handlePageResetClick
	}
}
