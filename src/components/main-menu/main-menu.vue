<template>
	<div class="main-menu">
		<div class="logo">
			<img src="@/assets/img/logo.svg" alt="vite" />
			<h2 v-show="!isFold" class="title">SEEKHOO</h2>
		</div>
		<div class="menu">
			<el-menu
				:default-active="activePath"
				:collapse="isFold"
				active-text-color="#fff"
				text-color="#b7bdc3"
				background-color="#001529"
				router
			>
				<template v-for="item in userMenus" :key="item.id">
					<el-sub-menu :index="item.id + ''">
						<template #title>
							<el-icon>
								<component :is="item.icon.split('-icon-')[1]"></component>
							</el-icon>
							<span>{{ item.name }}</span>
						</template>
						<template v-for="subitem in item.children" :key="subitem.is">
							<el-menu-item
								:index="subitem.url"
								@click="handleMenuItemClick(subitem.url)"
							>
								{{ subitem.name }}
							</el-menu-item>
						</template>
					</el-sub-menu>
				</template>
			</el-menu>
		</div>
	</div>
</template>

<script setup lang="ts">
import useLoginStore from '@/store/login/login'
import { localCache } from '@/utils/cache'
const loginStore = useLoginStore()
const { userMenus } = storeToRefs(loginStore)
const activePath = ref(localCache.getCache('activePath') ?? '')
defineProps({
	isFold: {
		type: Boolean,
		default: false
	}
})
const handleMenuItemClick = (url: any) => {
	localCache.setCache('activePath', url)
}
</script>

<style lang="less" scoped>
.main-menu {
	height: 100%;
	background-color: #001529;
	.logo {
		display: flex;
		height: 28px;
		padding: 12px 10px 8px 10px;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		overflow: hidden;
		img {
			height: 100%;
			margin: 0 10px;
		}
		.title {
			font-size: 16px;
			font-weight: 700;
			color: #ffffff;
			white-space: nowrap;
		}
	}
	.el-menu {
		border-right: none;
		user-select: none;
	}
	.el-sub-menu {
		.el-menu-item {
			padding-left: 50px !important;
			background-color: #0c2135;
		}
	}
	.el-menu-item:hover {
		color: #fff;
	}
	.el-menu-item.is-active {
		background-color: #0a60bd;
	}
}
</style>
