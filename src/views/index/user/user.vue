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
            <el-option label="管理员" value="2"></el-option>
            <el-option label="老师" value="3"></el-option>
            <el-option label="学生" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getUserList">搜索</el-button>
          <el-button @click="clear">清除</el-button>
          <el-button type="primary" icon="el-icon-plus" @click="dialogTableVisible = true">新增用户</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 主体卡片 -->
    <el-card class="box-card main-card">
      <!-- 表格 -->
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column label="序号" type="index"></el-table-column>
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column prop="phone" label="电话"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="role" label="角色"></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status === 1">启用</span>
            <span class="red" v-else>禁用</span>
          </template>
        </el-table-column>

        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="showEdit(scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="text"
              @click="changeStatus(scope.row)"
            >{{scope.row.status === 1 ? "禁用" : '启用'}}</el-button>
            <el-button size="mini" type="text" v-power="['老师','学生','管理员']" @click="remove(scope.row)">删除</el-button>
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
    <!-- 编辑框 -->
    <editDialog ref='editDialog'></editDialog>
  </div>
</template>

<script>
// 导入用户新增框
import userDialog from "./components/userDialog.vue";
// 导入用户编辑
import editDialog from "./components/editDialog.vue"
import { userList, userStatus,userRemove } from "../../../api/userManager.js";
export default {
  name: "user",
  // 注册组件：
  components: {
    userDialog,editDialog
  },
  data() {
    return {
      formInline: {
        username: "",
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
      dialogTableVisible: false,
       // 是否显示 编辑框
      editFormVisible:false,
    };
  },
  methods: {
    // 用户列表数据：
    getUserList() {
      userList({
        page: this.page,
        limit: this.limit,
        ...this.formInline
      }).then(res => {
        window.console.log("用户列表:", res);
        if (res.code === 200) {
          this.tableData = res.data.items;
          this.page = +res.data.pagination.page;
          this.total = res.data.pagination.total;
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
      // window.console.log(val);
      this.page = val;
      this.getUserList();
    },
    // 改变状态
    changeStatus(item) {
      userStatus({
        id: item.id
      }).then(res => {
        if (res.code === 200) {
          this.$message.success("状态修改成功");
          this.getUserList();
        }
      });
    },
    // 清除
    clear(){
      this.formInline = {},
      this.getUserList()
    },
    // 删除
    remove(item){
       this.$confirm("你要删除嘛？", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 替换为用户的删除接口
          userRemove({ id: item.id }).then(res => {
            // window.console.log(res)
            if(res.code===200){
              this.$message.success("删除成功")
              this.getUserList()
            }
          });
        })
        .catch(() => {});

    },
    showEdit(item) {
      this.editFormVisible = true;
      
      this.$refs.editDialog.editForm = JSON.parse(JSON.stringify(item))
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