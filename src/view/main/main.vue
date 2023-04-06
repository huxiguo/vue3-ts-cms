<template>
	<div class="main">
		<el-container class="main-content">
			<el-aside width="210px">
				<main-menu />
			</el-aside>
			<el-container>
				<el-header height="50px">
					<main-headere />
				</el-header>
				<el-main>Main</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
.main {
	height: 100%;
	.main-content {
		height: 100%;
		.el-aside {
			background-color: red;
		}
		.el-header {
			background-color: goldenrod;
		}
		.el-main {
			background-color: blueviolet;
		}
	}
}
</style>
