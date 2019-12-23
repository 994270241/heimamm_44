<template>
  <div class="Question-content">
    <!-- 上部卡片 -->
    <el-card class="top-card">
      <!-- 行内表单 -->
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="学科">
          <el-select v-model="formInline.subject" placeholder="请选择学科">
            <el-option v-for="item in subjectList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            
          </el-select>
        </el-form-item>

        <el-form-item label="阶段">
          <el-select v-model="formInline.step" placeholder="请选择阶段">
            <el-option label="启用" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="企业">
          <el-select v-model="formInline.enterprise" placeholder="请选择企业">
            <el-option v-for="item in enterpriseList" :key="item.id" :label="item.name" :value="item.id"></el-option>
           
          </el-select>
        </el-form-item>

        <el-form-item label="题型">
          <el-select v-model="formInline.type" placeholder="请选择题型">
            <el-option label="启用" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>
        <br>
        <el-form-item label="难度">
          <el-select v-model="formInline.difficulty" placeholder="请选择难度">
            <el-option label="启用" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
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
          <el-select v-model="formInline.create_date" placeholder="请选择日期">
            <el-option label="启用" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>
        <br>
          <el-form-item label="标题" >
          <el-input v-model="formInline.title" class='title-input'></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="getQuestionList">搜索</el-button>
          <el-button @click="clear">清除</el-button>
          <el-button type="primary" icon="el-icon-plus" @click="AdddialogFormVisible = true">新增试题</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 身体卡片 -->
    <el-card class="main-card">
      <!-- 基础表格 -->
      <el-table :data="tableData" style="width: 100%" border >
        <el-table-column type="index" label="序号" id="xuhao"></el-table-column>
        <el-table-column prop="rid" label="题目"></el-table-column>
        <el-table-column prop="name" label="学科·阶段"></el-table-column>
        <el-table-column prop="short_name" label="题型"></el-table-column>
        <el-table-column prop="username" label="企业"></el-table-column>
        <el-table-column prop="username" label="创建者"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status === 1">启用</span>
            <span class="red" v-else>禁用</span>
          </template>
        </el-table-column>
        <el-table-column prop="username" label="访问量"></el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text"  @click="showEdit(scope.row)">编辑</el-button>
            <el-button
              type="text"
              v-power="['老师','学生']"
              @click="changeStatus(scope.row)"
            >{{scope.row.status === 1 ? "启用" : "禁用"}}</el-button>
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
import {enterpriseList} from "../../../api/enterprise"
// 学科列表接口
import {subjectList} from "../../../api/subject"
// 导入新增框
import addDialog from "./components/addDialog.vue"
export default {
    name :'question',
    components : {
      addDialog
    },
    data() {
      return {
        formInline : {},
        tableData : [],
        // 定义企业数据
        enterpriseList : [],
        // 定义学科数据
        subjectList : [],
        // 是否开启新增框
        AdddialogFormVisible : false,
      }
    },
    created() {
      // 获取企业数据
      enterpriseList().then(res => {
        window.console.log(res)
        this.enterpriseList = res.data.items
      })
      // 获取学科数据
      subjectList().then(res => {
         window.console.log(res)
         this.subjectList = res.data.items

      })
    },
}
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
    .el-input__inner{
      width: 150px;
    }
    .el-form-item__label{
      padding: 0 30px;
    }
    .title-input.el-input{
      .el-input__inner{
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