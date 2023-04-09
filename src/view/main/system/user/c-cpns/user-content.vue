<template>
	<div class="user-content">
		<div class="header">
			<h3 class="title">用户列表</h3>
			<el-button type="primary">新建用户</el-button>
		</div>
		<div class="table"></div>
		<div class="pagination">分页</div>
	</div>
</template>

<script setup lang="ts">
import useSystemStore from '@/store/main/system/system'

const systemStore = useSystemStore()
const { useList, totalCount } = storeToRefs(systemStore)
systemStore.postUserList()
</script>

<style lang="less" scoped>
.user-content {
	margin-top: 20px;
	padding: 20px;
	background-color: #fff;
	.header {
		display: flex;
		justify-content: space-between;
		align-items: end;
		margin-bottom: 10px;
		.title {
			font-size: 20px;
		}
	}
}
</style>
