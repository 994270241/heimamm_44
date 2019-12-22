<template>
  <div class="user-content">
    <!-- 顶部卡片 -->
    <el-card class="box-card top-card">
      <!-- 行内表单 -->
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="用户名称">
          <el-input v-model="formInline.username" placeholder="审批人"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱">
          <el-input v-model="formInline.email" placeholder="审批人"></el-input>
        </el-form-item>

        <el-form-item label="角色">
          <el-select v-model="formInline.role_id">
            <el-option label="启用" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">搜索</el-button>
          <el-button>清除</el-button>
          <el-button type="primary" icon="el-icon-plus" @click="dialogTableVisible = true">新增用户</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 主体卡片 -->
    <el-card class="box-card main-card">
      <!-- 表格 -->
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column prop="date" label="序号" type="index"></el-table-column>
        <el-table-column prop="user_name" label="用户名"></el-table-column>
        <el-table-column prop="phone" label="电话"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="role_id" label="角色"></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status === 1">启用</span>
            <span class="red" v-else>禁用</span>
          </template>
        </el-table-column>

        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="text" @click="handleEdit(scope.$index, scope.row)">禁用</el-button>
            <el-button size="mini" type="text" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="pageSizes"
        :page-size="limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
    <!-- 用户新增对话框 -->
    <userDialog></userDialog>
  </div>
</template>

<script>
import userDialog from "./components/userDialog.vue"
import { userList } from "../../../api/user.js";
export default {
  name: "user",
  // 注册组件：
  components:{
    userDialog
  },
  data() {
    return {
      formInline: {
        user_name: "",
        email: "",
        role_id: ""
      },
      tableData: [],
      // 页数据
      pageSizes: [2, 4, 6, 8],
      // 默认页码
      page: 1,
      // 页容量
      total: 0,
      // 每一页多少条
      limit: 2,
      // 用户对话框
      dialogTableVisible: false
    };
  },
  methods: {
    // 用户列表数据：
    getUserList() {
      userList({
        // page: this.page,
        // limit: this.limit,
        // ...this.formInline
      }).then(res => {
        window.console.log("用户列表:", res);
        if (res.data.code === 200) {
          this.tableData = res.data.data.items;
          this.page = +res.data.data.pagination.page;
          this.total = res.data.data.pagination.total;
        }
      });
    },
    // 页条数
    handleSizeChange(val) {
      this.limit = val;
      this.getUserList();
    },
    // 当前页码
    handleCurrentChange(val) {
      window.console.log(val);
      this.page = val;
      this.getUserList();
    }
  },
  created() {
    this.getUserList();
  }
};
</script>

<style lang="less">
.user-content {
  .top-card {
    height: 103px;
  }
  .main-card {
    height: 100%;
    margin-top: 20px;
    text-align: center;
    .el-pagination {
      // text-align: center;
    }
    span.red {
      color: crimson;
    }
  }
}
</style>