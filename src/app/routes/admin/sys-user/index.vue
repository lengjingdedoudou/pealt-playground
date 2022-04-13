<template>
	<div class="home-container">
		<a-card class="box-card">
			<a-row :gutter="20">
				<!-- 部门数据 -->
				<a-col :md="4" :xs="24">
					<a-input placeholder="请输入部门名称"></a-input>
					<a-tree v-if="deptOptions?.length" :defaultExpandAll="true" :treeData="deptOptions" @select="handleNodeClick"></a-tree>
				</a-col>
				<!-- 用户数据 -->
				<a-col :md="20" :xs="24">
					<a-form ref="queryForm" :model="queryParams" layout="inline" :label-col="{ style: { width: '68px' } }">
						<a-form-item label="用户名称" name="username">
							<a-input
								v-model:value="queryParams.username"
								placeholder="请输入用户名称"
								:allowClear="true"
								size="middle"
								style="width: 160px"
								@keyup.enter="handleQuery"
							></a-input>
						</a-form-item>
						<a-form-item label="手机号码" name="phone">
							<a-input
								v-model="queryParams.phone"
								placeholder="请输入手机号码"
								:allowClear="true"
								size="middle"
								style="width: 160px"
								@key.enter="handleQuery"
							></a-input>
						</a-form-item>
						<a-form-item label="状态" name="status">
							<a-select
								v-model:value="queryParams.status"
								placeholder="用户状态"
								:allowClear="true"
								size="middle"
								style="width: 160px"
							>
								<a-select-option v-for="dict in statusOptions" :key="dict.value" :label="dict.label" :value="dict.value">
									{{ dict.label }}
								</a-select-option>
							</a-select>
						</a-form-item>
						<a-form-item>
							<a-button type="primary" @click="handleQuery">搜索</a-button>
							<a-button @click="resetQuery">重置</a-button>
						</a-form-item>
					</a-form>
					<a-table :columns="columns" :loading="loading" :dataSource="userList">
						<template #bodyCell="{ column, record }">
							<template v-if="column.key === 'status'">
								<a-switch v-model:value="record.status"></a-switch>
							</template>
						</template>
					</a-table>
				</a-col>
			</a-row>
		</a-card>
	</div>
</template>

<script lang="ts">
	export default {
		name: 'SysUserManager'
	};
</script>
<script setup lang="ts">
	import { ref, onMounted, reactive } from 'vue';
	import { Key } from 'ant-design-vue/es/vc-tree/interface';

	import { TreeNode } from '@/app/shared/types/admin';
	import { listUser } from '../../../core/api/admin/sys-user';
	import { QueryUserParams } from '../../../core/api/types/user';
	import { User, StatusOptions } from '../../../shared/types/admin';
	import { treeSelect } from '../../../core/api/admin/sys-dept';
	import { DictType } from '../../../core/api/types/user';
	import { getDicts } from '../../../core/api/admin/dict/data';

	// 遮罩层
	const loading = ref(false);
	// 总条数
	const total = ref(0);
	// 用户表格数据
	const userList = ref<User[]>([]);
	// 部门树选项
	const deptOptions = ref<TreeNode[]>();
	// 日期范围 todo
	const dateRange = ref([]);
	// 状态数据字典
	const statusOptions = ref<StatusOptions[]>([]);
	// 查询参数
	let queryParams = reactive<QueryUserParams>({
		pageIndex: 1,
		pageSize: 10,
		username: undefined,
		phone: undefined,
		status: undefined,
		depId: undefined
	});

	const columns = ref([
		{ title: '编号', dataIndex: 'userId' },
		{ title: '登录名', dataIndex: 'username' },
		{ title: '昵称', dataIndex: 'nickName' },
		{ title: '部门', dataIndex: ['dept', 'deptName'] },
		{ title: '手机号', dataIndex: 'phone' },
		{ title: '状态', key: 'status' }
	]);
	function getTreeSelect() {
		treeSelect().subscribe(data => {
			deptOptions.value = data;
		});
	}
	function handleNodeClick(selectedKeys: Key[]) {
		console.log(selectedKeys);
	}
	function getList() {
		loading.value = true;
		listUser(queryParams).subscribe(({ list, count }) => {
			userList.value = list;
			total.value = count;
			loading.value = false;
		});
	}
	function handleQuery() {
		// todo page参数待确定
		queryParams.page = 1;
		getList();
	}

	function resetQuery() {
		dateRange.value = [];
		queryParams.depId = '';
		// const { resetFields } = useForm(queryParams);
		// resetFields();
		// handleQuery();
	}
	onMounted(() => {
		getList();
		getTreeSelect();
		getDicts(DictType.SYS_NORMAL_DISABLE).subscribe(data => {
			statusOptions.value = data;
		});
	});
</script>
