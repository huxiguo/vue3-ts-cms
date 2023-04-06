<template>
	<div class="main">
		<el-container class="main-content">
			<el-aside width="210px">
				<MainMenu />
			</el-aside>
			<el-container>
				<el-header height="50px">
					<MainHeader />
				</el-header>
				<el-main>Main</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script setup lang="ts">
import MainMenu from '@/components/main-menu/main-menu.vue'
import MainHeader from '@/components/main-header/main-header.vue'
</script>

<style scoped lang="less">
.main {
	width: 100%;
	height: 100%;
	.main-content {
		height: 100%;
		.el-aside {
			overflow-x: hidden;
			overflow-y: auto;
			line-height: 200px;
			text-align: left;
			cursor: pointer;
			background-color: #001529;
			transition: width 0.3s linear;
			scrollbar-width: none;
			&::-webkit-scrollbar {
				display: none;
			}
		}
		.el-main {
			background-color: #f0f2f5;
		}
	}
}
</style>
