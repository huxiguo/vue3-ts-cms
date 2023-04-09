<template>
	<div class="user">
		<!-- 搜索 -->
		<userSearch />
		<!-- content -->
		<userContent />
	</div>
</template>

<script setup lang="ts">
import userSearch from './c-cpns/user-search.vue'
import userContent from './c-cpns/user-content.vue'
</script>

<style lang="less" scoped>
.user {
	border-radius: 20px;
	overflow: hidden;
}
</style>
