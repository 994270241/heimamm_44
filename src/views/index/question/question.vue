<template>
  <div class="Question-content">
    <!-- 上部卡片 -->
    <el-card class="top-card">
      <!-- 行内表单 -->
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="学科">
          <el-select v-model="formInline.subject" placeholder="请选择学科">
            <el-option
              v-for="item in subjectList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="阶段">
          <el-select v-model="formInline.step" placeholder="请选择阶段">
            <el-option label="初级" value="1"></el-option>
            <el-option label="中级" value="2"></el-option>
            <el-option label="高级" value="3"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="企业">
          <el-select v-model="formInline.enterprise" placeholder="请选择企业">
            <el-option
              v-for="item in enterpriseList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="题型">
          <el-select v-model="formInline.type" placeholder="请选择题型">
            <el-option label="单选" value="1"></el-option>
            <el-option label="多选" value="2"></el-option>
            <el-option label="简答" value="3"></el-option>
          </el-select>
        </el-form-item>
        <br />
        <el-form-item label="难度">
          <el-select v-model="formInline.difficulty" placeholder="请选择难度">
            <el-option label="简单" value="1"></el-option>
            <el-option label="一般" value="2"></el-option>
            <el-option label="困难" value="3"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="作者">
          <el-input v-model="formInline.username"></el-input>
        </el-form-item>

        <el-form-item label="状态">
          <el-select v-model="formInline.status" placeholder="请选择状态">
            <el-option label="启用" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="日期">
          <el-date-picker v-model="formInline.create_time" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <br />
        <el-form-item label="标题">
          <el-input v-model="formInline.title" class="title-input"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="getData">搜索</el-button>
          <el-button @click="clear">清除</el-button>
          <el-button type="primary" icon="el-icon-plus" @click="AdddialogFormVisible = true">新增试题</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 身体卡片 -->
    <el-card class="main-card">
      <!-- 基础表格 -->
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column type="index" label="序号" id="xuhao"></el-table-column>
        <el-table-column prop="rid" label="题目">
          <template slot-scope="scope">
            <span v-html="scope.row.title"></span>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="学科·阶段">
          <template slot-scope="scope">
            {{scope.row.subject_name}}-
            {{ {1 : "初级" , 2 : '中级' , 3: '高级'}[scope.row.step] }}
          </template>
        </el-table-column>
        <el-table-column prop="short_name" label="题型">
          <template slot-scope="scope">{{ {1 : '单选', 2 : '多选', 3:'简答'}[scope.row.type] }}</template>
        </el-table-column>
        <el-table-column prop="enterprise_name" label="企业"></el-table-column>
        <el-table-column prop="username" label="创建者"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status === 1">启用</span>
            <span class="red" v-else>禁用</span>
          </template>
        </el-table-column>
        <el-table-column prop="reads" label="访问量"></el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="showEdit(scope.row)">编辑</el-button>
            <el-button
              type="text"
              v-power="['老师','学生']"
              @click="changeStatus(scope.row)"
            >{{scope.row.status === 1 ? "禁用" : "启用"}}</el-button>
            <el-button type="text" v-power="['老师','学生','管理员']" @click="remmove(scope.row)">删除</el-button>
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
    <!-- 新增框 -->
    <addDialog></addDialog>
    <!-- 编辑框 -->
    <editDialog ref="editDialog"></editDialog>
  </div>
</template>

<script>
// 企业列表接口
import { enterpriseList } from "../../../api/enterprise";
// 学科列表接口
import { subjectList } from "../../../api/subject";
// 题库列表接口
import {
  questionList,
  questionStatus,
  questionRemove
} from "../../../api/question.js";
// 导入新增框
import addDialog from "./components/addDialog.vue";
export default {
  name: "question",
  components: {
    addDialog
  },
  data() {
    return {
      formInline: {},
      tableData: [],
      // 定义企业数据
      enterpriseList: [],
      // 定义学科数据
      subjectList: [],
      // 是否开启新增框
      AdddialogFormVisible: false,
      // 页码
      page: 1,
      // 页容量
      limit: 2,
      // 页容量数组
      pageSizes: [3, 6, 9, 12],
      // 总条数
      total: 0
    };
  },
  created() {
    // 获取企业数据
    enterpriseList().then(res => {
      // window.console.log(res)
      this.enterpriseList = res.data.items;
    });
    // 获取学科数据
    subjectList().then(res => {
      //  window.console.log(res)
      this.subjectList = res.data.items;
    }),
      this.getData();
  },
  methods: {
    // 获取题库数据
    getData() {
      questionList({
        page: this.page,
        limit: this.limit,
        ...this.formInline
      }).then(res => {
        window.console.log("题库列表:", res);
        this.tableData = res.data.items;
        // 总条数
        this.total = res.data.pagination.total;
      });
    },
    // 页容量改变
    handleSizeChange(value) {
      this.limit = value;
      this.getData();
    },
    // 页码改变
    handleCurrentChange(value) {
      this.page = value;
      this.getData();
    },
    // 状态改变
    changeStatus(item) {
      questionStatus({
        id: item.id
      }).then(res => {
        if (res.code === 200) {
          this.$message.success("状体修改成功");
          this.getData();
        }
      });
    },
    // 数据删除
    remmove(item) {
      this.$confirm("你真的要把他删掉吗？o(╥﹏╥)o", "友情提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          questionRemove({
            id: item.id
          }).then(res => {
            if (res.code === 200) {
              this.$message.success("删除成功");
              if (this.tableData.length == 1) {
                // 一会刷新就没有数据了
                // 修改页码
                this.page--;
                // 三元表达式
                // 如果 this.page 小于1 那么就变为1 否则 是什么就是什么
                // this.page = this.page<1?1:this.page
                if (this.page < 1) {
                  this.page = 1;
                }
              }
              this.getData();
            }
          });
        })
        .catch(() => {});
    }
  }
};
</script>

<style lang="less">
.Question-content {
  width: 100%;
  .top-card {
    // width: 1191px;
    height: 227px;
    border-radius: 4px;
    .subject-bh {
      width: 100px;
      height: 39px;
    }
    .subject-name {
      width: 149px;
      height: 39px;
    }
    .el-input__inner {
      width: 150px;
    }
    .el-form-item__label {
      padding: 0 30px;
    }
    .title-input.el-input {
      .el-input__inner {
        width: 398px;
        padding-right: 0px;
      }
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