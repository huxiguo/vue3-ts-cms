<template>
	<div class="user-content">
		<div class="header">
			<h3 class="title">用户列表</h3>
			<el-button type="primary" @click="handleCreateUserClick"
				>新建用户</el-button
			>
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
					<template #default="scope">
						{{ formatUTC(scope.row.createAt) }}
					</template>
				</el-table-column>
				<el-table-column align="center" prop="updateAt" label="更新时间">
					<template #default="scope">
						{{ formatUTC(scope.row.updateAt) }}
					</template>
				</el-table-column>
				<el-table-column align="center" label="操作" width="150px">
					<template #default="scope">
						<el-button
							text
							type="primary"
							size="small"
							icon="Edit"
							@click="handelEditClick(scope.row)"
						>
							编辑
						</el-button>
						<el-button
							text
							type="danger"
							size="small"
							icon="Delete"
							@click="handleDeleteClick(scope.row.id)"
						>
							删除
						</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<div class="pagination">
			<el-pagination
				v-model:current-page="currentPage"
				v-model:page-size="pageSize"
				:page-sizes="[5, 7, 9, 15]"
				background
				layout="total, sizes, prev, pager, next, jumper"
				:total="totalCount"
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import useSystemStore from '@/store/main/system/system'
import { formatUTC } from '@/utils/format'
import { ElMessage } from 'element-plus'

const emit = defineEmits(['createUserClick', 'editUserClick'])

const systemStore = useSystemStore()
const { useList, totalCount } = storeToRefs(systemStore)
// 新建用户
const handleCreateUserClick = () => {
	emit('createUserClick')
}
// 删除用户按钮
const handleDeleteClick = async (id: number) => {
	const res = await systemStore.deleteUserByIdAction(id)
	ElMessage({
		message: res.msg,
		type: res.code ? 'success' : 'error'
	})
	fetchListData()
}
// 编辑用户按钮
const handelEditClick = (rowData: any) => {
	emit('editUserClick', rowData)
}
// 分页
const currentPage = ref(1)
const pageSize = ref(5)
fetchListData()
// 每页大小改变触发
const handleSizeChange = () => {
	fetchListData()
}
// 页码改变触发
const handleCurrentChange = () => {
	fetchListData()
}
// 请求分页数据
function fetchListData(searchForm: any = {}) {
	// 每页大小
	const size = pageSize.value
	// 页码
	const offset = (currentPage.value - 1) * size
	const info = { size, offset }
	systemStore.postUserList({ ...info, ...searchForm })
}
// 暴露函数
defineExpose({ fetchListData })
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
	.pagination {
		margin-top: 10px;
	}
}
</style>
