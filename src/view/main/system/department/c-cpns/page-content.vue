<template>
	<div class="user-content">
		<div class="header">
			<h3 class="title">部门列表</h3>
			<el-button type="primary" @click="handleCreateUserClick"
				>新建部门</el-button
			>
		</div>
		<div class="table">
			<el-table border :data="pageList" stripe style="width: 100%">
				<el-table-column type="selection" />
				<el-table-column type="index" label="#" />
				<el-table-column
					align="center"
					prop="name"
					label="部门名称"
					width="120px"
				/>
				<el-table-column
					align="center"
					prop="leader"
					label="部门领导"
					width="120px"
				/>
				<el-table-column
					align="center"
					prop="parentId"
					label="上级部门"
					width="120px"
				/>
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
				:total="pageTotalCount"
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

const emit = defineEmits(['createClick', 'editClick'])

const systemStore = useSystemStore()
const { pageList, pageTotalCount } = storeToRefs(systemStore)
// 新建
const handleCreateUserClick = () => {
	emit('createClick')
}
// 删除按钮
const handleDeleteClick = async (id: number) => {
	const res = await systemStore.deletePageByIdAction('department', id)
	ElMessage({
		message: res.msg,
		type: res.code ? 'success' : 'error'
	})
	fetchPageData()
}
// 编辑按钮
const handelEditClick = (rowData: any) => {
	emit('editClick', rowData)
}
// 分页
const currentPage = ref(1)
const pageSize = ref(5)
fetchPageData()
// 每页大小改变触发
const handleSizeChange = () => {
	fetchPageData()
}
// 页码改变触发
const handleCurrentChange = () => {
	fetchPageData()
}
// 请求分页数据
function fetchPageData(searchForm: any = {}) {
	// 每页大小
	const size = pageSize.value
	// 页码
	const offset = (currentPage.value - 1) * size
	const info = { size, offset }
	const queryInfo = { ...info, ...searchForm }
	// 请求页面数据
	systemStore.postPageListAction('department', queryInfo)
}
// 暴露函数
defineExpose({ fetchPageData })
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
