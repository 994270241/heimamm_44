<template>
  <div class="enterprise-content">
    <!-- 上部卡片 -->
    <el-card class="top-card">
      <!-- 行内表单 -->
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="企业编号">
          <el-input v-model="formInline.eid" class="enterprise-bh"></el-input>
        </el-form-item>
        <el-form-item label="企业名称">
          <el-input v-model="formInline.name" class="enterprise-name"></el-input>
        </el-form-item>
        <el-form-item label="创建者">
          <el-input v-model="formInline.username" class="enterprise-bh"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="formInline.status" placeholder="请选择状态">
            <el-option label="启用" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getEnterpriseList">搜索</el-button>
          <el-button @click="clear">清除</el-button>
          <el-button type="primary" icon="el-icon-plus" @click="AdddialogFormVisible = true">新增企业</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 身体卡片 -->
    <el-card class="main-card">
      <!-- 基础表格 -->
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="eid" label="企业编号"></el-table-column>
        <el-table-column prop="name" label="企业名称"></el-table-column>
        <!-- <el-table-column prop="short_name" label="简称"></el-table-column> -->
        <el-table-column prop="username" label="创建者"></el-table-column>
        <el-table-column prop="create_time" label="创建日期"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status === 1">启用</span>
            <span class="red" v-else>禁用</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="showEdit(scope.row)">编辑</el-button>
            <el-button
              type="text"
              @click="changeStatus(scope.row)"
            >{{scope.row.status === 1 ? "启用" : "禁用"}}</el-button>
            <el-button type="text" @click="remmove(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="+page"
        :page-sizes="pageSizes"
        :page-size="limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>

    <!-- 企业新增框 -->
    <addDialog></addDialog>
    <!-- 企业编辑框 -->
    <editDialog ref="editDialog"></editDialog>
  </div>
</template>

<script>
// 导入组件 编辑框
import addDialog from "./components/addDialog.vue";
import editDialog from "./components/editDialog.vue";
import {
  enterpriseList,
  enterpriseStatus,
  enterpriseRemove
} from "../../../api/enterprise.js";

export default {
  name: "enterprise",
  // 注册组件
  components: {
    addDialog,
    editDialog
  },
  data() {
    return {
      // 表单数据
      formInline: {
        // 学科编号
        eid: "",
        // 学科名称
        name: "",
        //创建者
        username: "",
        // 状态
        status: ""
      },
      // 表格数据
      tableData: [],
      // 新增企业框是否弹出:
      AdddialogFormVisible: false,
      // 编辑企业框是否弹出:
      editdialogFormVisible: false,
      // 页数据
      // 页码:
      page: 1,
      // 每一页多少条
      limit: 6,
      // 页容量选项数组
      pageSizes: [2, 4, 6, 8],
      // 总条数
      total: 0
    };
  },

  methods: {
    // 修改状态
    changeStatus(items) {
      enterpriseStatus({
        id: items.id
      }).then(res => {
        window.console.log("状态:", res);
        if (res.code === 200) {
          this.$message.success("主人,状态修改成功");
          this.getEnterpriseList();
        }
      });
    },
    // 清除数据
    clear() {
      for (var key in this.formInline) {
        this.formInline[key] = "";
        this.getEnterpriseList();
      }
    },
    // 删除数据
    remmove(items) {
      this.$confirm("你真的要删除这条数据吗?", "友情提示", {
        confirmButtonText: "确认",
        cancelButtonText: "删除",
        type: "warning"
      })
        .then(() => {
          // 调用移除接口
          enterpriseRemove({
            id: items.id
          }).then(res => {
            window.console.log("删除接口:", res);
            if (res.code === 200) {
              this.$message.error("删除成功");
              this.getEnterpriseList();
            }
          });
        })
        .catch(() => {});
    },
    // 获取企业数据
    getEnterpriseList() {
      enterpriseList({
        page: this.page,
        limit: this.limit,
        ...this.formInline
      }).then(res => {
        window.console.log("企业列表", res);
        // 保存数据到表格
        this.tableData = res.data.items;
        // 当前页码数
        this.page = res.data.pagination.page;
        // 保存总条数
        this.total = res.data.pagination.total;
      });
    },
    // 改变页容量
    handleSizeChange(size) {
      // 保存页容量
      this.limit = size;
      // 重新获取数据
      this.getEnterpriseList();
    },
    // 改变当前页码
    handleCurrentChange(page) {
      // 保存当前页吗
      this.page = page;
      // 重新获取数据
      this.getEnterpriseList();
    },
    // 打开编辑框
    showEdit(items){
      this.editdialogFormVisible = true

      this.$refs.editDialog.editform = JSON.parse(JSON.stringify(items))
    }
  },

  created() {
    this.getEnterpriseList();
  }
};
</script>

<style lang="less">
.enterprise-content {
  width: 100%;
  .top-card {
    // width: 1191px;
    height: 103px;
    border-radius: 4px;
    .enterprise-bh {
      width: 100px;
      height: 39px;
    }
    .enterprise-name {
      width: 149px;
      height: 39px;
    }
  }
  .main-card {
    // height: 283px;
    height: 100%;
    margin-top: 20px;
    border-radius: 4px;

    // 高亮的span
    span.red {
      color: #ff4b4b;
    }

    .el-pagination {
      text-align: center;
      margin-top: 30px;
    }
  }
}
</style>