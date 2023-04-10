<template>
	<div class="user">
		<!-- 搜索 -->
		<userSearch
			@query-click="handleSearchClick"
			@reset-click="handleResetClick"
		/>
		<!-- content -->
		<userContent ref="userContentRef" />
	</div>
</template>

<script setup lang="ts">
import userSearch from './c-cpns/user-search.vue'
import userContent from './c-cpns/user-content.vue'
const userContentRef = ref<InstanceType<typeof userContent>>()
const handleSearchClick = (searchForm: any) => {
	userContentRef.value?.fetchListData(searchForm)
}
const handleResetClick = () => {
	userContentRef.value?.fetchListData()
}
</script>

<style lang="less" scoped>
.user {
	border-radius: 20px;
	overflow: hidden;
}
</style>
