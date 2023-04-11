<template>
	<div>
		<el-breadcrumb separator-icon="ArrowRight">
			<template v-for="item in breadcrumbs" :key="item.name">
				<el-breadcrumb-item :to="item.path">{{ item.name }}</el-breadcrumb-item>
			</template>
		</el-breadcrumb>
	</div>
</template>

<script setup lang="ts">
import useLoginStore from '@/store/login/login'
import { mapPathToBreadcrumbs } from '@/utils/mapPathToBreadcrumbs'

const loginStore = useLoginStore()
const route = useRoute()
const breadcrumbs = computed(() =>
	mapPathToBreadcrumbs(route.path, loginStore.userMenus)
)
</script>

<style lang="less" scoped></style>
