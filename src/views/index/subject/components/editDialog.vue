<template>
  <!-- 新增对话框 -->
  <el-dialog class="edit-dialog" title="编辑学科" :visible.sync="$parent.editdialogFormVisible">
    <el-form :model="editform" :rules="editFormrules" ref="editform">
      <el-form-item label="学科编号" :label-width="formLabelWidth" prop="rid">
        <el-input v-model="editform.rid" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="学科名称" :label-width="formLabelWidth" prop="name">
        <el-input v-model="editform.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="学科简称" :label-width="formLabelWidth">
        <el-input v-model="editform.short_name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="学科简介" :label-width="formLabelWidth">
        <el-input v-model="editform.intro" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="学科备注" :label-width="formLabelWidth">
        <el-input v-model="editform.remark" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="$parent.editdialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitForm">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { subjectEdit } from "../../../../api/subject.js";
export default {
  data() {
    return {
      // 新增表单:
      editform: {},
      // 表单验证规则
      editFormrules: {
        rid: [{ required: true, message: "学科编号不能为空", trigger: "blur" }],
        name: [{ required: true, message: "学科名称不能为空", trigger: "blur" }]
      },
      // 宽度:
      formLabelWidth: "85px"
    };
  },
  methods: {
    //   新增学科
    submitForm() {
      this.$refs.editform.validate(valid => {
        if (valid) {
          // 对
          subjectEdit(this.editform).then(res => {
            window.console.log("编辑学科:", res);
            if (res.code === 200) {
              this.$message.success("编辑成功");
              this.$parent.editdialogFormVisible = false;
              this.$parent.getSubjectList();
            } else if (res.code === 201) {
              this.$message.error("学科编号已经存在了，请重新输入");
            }
          });
        } else {
          // 错
          this.$message.error("主人! 数据不太对,请认真检查一喔");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="less">
.edit-dialog {
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