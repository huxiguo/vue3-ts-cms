<template>
	<div class="user-content">
		<div class="header">
			<h3 class="title">用户列表</h3>
			<el-button type="primary">新建用户</el-button>
		</div>
		<div class="table">
			<el-table border :data="useList" stripe style="width: 100%">
				<el-table-column type="selection" />
				<el-table-column type="index" label="#" />
				<el-table-column
					align="center"
					prop="name"
					label="用户名"
					width="120px"
				/>
				<el-table-column
					align="center"
					prop="realname"
					label="真实姓名"
					width="120px"
				/>
				<el-table-column
					align="center"
					prop="cellphone"
					label="手机号码"
					width="150px"
				/>
				<el-table-column align="center" prop="enable" label="状态" width="80px">
					<template #default="scope">
						<el-switch
							v-model:model-value="scope.row.enable"
							active-color="#13ce66"
							inactive-color="#ff4949"
							:active-value="1"
							:inactive-value="0"
						/>
					</template>
				</el-table-column>
				<el-table-column align="center" prop="createAt" label="创建时间">
				</el-table-column>
				<el-table-column align="center" prop="updateAt" label="更新时间" />
				<el-table-column align="center" label="操作" width="150px">
					<el-button text type="primary" size="small" icon="Edit">
						编辑
					</el-button>
					<el-button text type="danger" size="small" icon="Delete">
						删除
					</el-button>
				</el-table-column>
			</el-table>
		</div>
		<div class="pagination">分页</div>
	</div>
</template>

<script setup lang="ts">
import useSystemStore from '@/store/main/system/system'
// import { formatUTC } from '@/utils/format'

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
	.table {
		:deep(.el-table__cell) {
			padding: 12px 0;
		}
		.el-button {
			margin-left: 0;
			padding: 5px 8px;
		}
	}
}
</style>
