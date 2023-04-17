<template>
	<div>
		<pageContent :content-config="contentConfig">
			<template #createTime="scope">
				{{ formatUTC(scope.row.createAt) }}
			</template>
			<template #updateTime="scope">
				{{ formatUTC(scope.row.updateAt) }}
			</template></pageContent
		>
	</div>
</template>

<script setup lang="ts">
import { formatUTC } from '@/utils/format'
import pageContent from '@/components/page-content/page-content.vue'

import contentConfig from './config/content.config'
</script>

<style lang="less" scoped></style>
