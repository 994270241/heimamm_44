<template>
  <!-- 新增对话框 -->
  <el-dialog class="add-dialog" title="新增学科" :visible.sync="$parent.AdddialogFormVisible">
    <el-form :model="addform" :rules="rules" ref="addform">
      <el-form-item label="学科编号" :label-width="formLabelWidth" prop="rid">
        <el-input v-model="addform.rid" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="学科名称" :label-width="formLabelWidth" prop="name">
        <el-input v-model="addform.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="学科简称" :label-width="formLabelWidth">
        <el-input v-model="addform.short_name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="学科简介" :label-width="formLabelWidth">
        <el-input v-model="addform.intro" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="学科备注" :label-width="formLabelWidth">
        <el-input v-model="addform.remark" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="$parent.AdddialogFormVisible = false">取 消</el-button>
      <el-button type="primary">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>

export default {
  data() {
    return {
      // 新增表单:
      addform: {
        // 编号
        rid: "",
        // 名字,
        name: "",
        // 简称
        short_name: "",
        // 简介
        intro: "",
        // 备注
        remark: ""
      },
      // 表单验证规则
      rules: {
        rid: [{ required: true, message: "学科编号不能为空", trigger: "blur" }],
        name: [{ required: true, message: "学科名称不能为空", trigger: "blur" }]
      },
      // 宽度:
      formLabelWidth: "85px"
    };
  }
};
</script>

<style lang="less">
.add-dialog {
  .el-dialog {
    width: 602px;
    .el-dialog__header {
      background: linear-gradient(to right, #01c4fa, #1394fa);
      text-align: center;
      span {
        color: white;
      }
    }
    .el-dialog__footer {
      text-align: center;
    }
  }
}
</style>