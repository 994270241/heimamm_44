<template>
  <!-- 新增企业对话框 -->
  <el-dialog class="edit-dialog" title="新增学科" :visible.sync="$parent.editdialogFormVisible">
    <el-form :model="editform" :rules="rules" ref="editform">
      <el-form-item label="企业编号" :label-width="formLabelWidth" prop="eid">
        <el-input v-model="editform.eid" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="企业名称" :label-width="formLabelWidth" prop="name">
        <el-input v-model="editform.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="企业简称" :label-width="formLabelWidth" prop="short_name">
        <el-input v-model="editform.short_name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="企业简介" :label-width="formLabelWidth" prop="intro">
        <el-input v-model="editform.intro" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="企业备注" :label-width="formLabelWidth">
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
import { enterpriseEdit } from "../../../../api/enterprise.js";
export default {
  data() {
    return {
      // 企业表单
      editform: {
        // 编号
        eid: "",
        // 名字,
        name: "",
        // 简称
        short_name: "",
        // 简介
        intro: "",
        // 备注
        remark: ""
      },
      // 宽度:
      formLabelWidth: "85px",
      // 表单验证规则
      rules: {
        eid: [{ required: true, message: "企业编号不能为空", trigger: "blur" }],
        name: [
          { required: true, message: "企业名称不能为空", trigger: "blur" }
        ],
        short_name: [
          { required: true, message: "企业简称不能为空", trigger: "blur" }
        ],
        intro: [
          { required: true, message: "企业简介不能为空", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm() {
      this.$refs.editform.validate(valid => {
        if (valid) {
          // 对
          enterpriseEdit(this.editform).then(res => {
            window.console.log("新增企业:", res);
            if (res.code === 200) {
              this.$message.success("新增成功");
              this.$parent.editdialogFormVisible = false;
              this.$parent.getEnterpriseList();
            } else if (res.code === 201) {
              this.$message.error("企业编号已经存在了，请重新输入");
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