<template>
  <!-- 新增企业对话框 -->
  <el-dialog class="add-dialog" title="新增学科" :visible.sync="$parent.AdddialogFormVisible">
    <el-form :model="addform" :rules="rules" ref="addform">
      <el-form-item label="企业编号" :label-width="formLabelWidth" prop="eid">
        <el-input v-model="addform.eid" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="企业名称" :label-width="formLabelWidth" prop="name">
        <el-input v-model="addform.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="企业简称" :label-width="formLabelWidth" prop="short_name">
        <el-input v-model="addform.short_name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="企业简介" :label-width="formLabelWidth" prop="intro">
        <el-input v-model="addform.intro" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="企业备注" :label-width="formLabelWidth">
        <el-input v-model="addform.remark" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="$parent.AdddialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitForm">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { enterpriseAdd } from "../../../../api/enterprise.js";
export default {
  data() {
    return {
      // 企业表单
      addform: {
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
      this.$refs.addform.validate(valid => {
        if (valid) {
          // 对
          enterpriseAdd(this.addform).then(res => {
            window.console.log("新增企业:", res);
            if (res.code === 200) {
              this.$message.success("新增成功");
              this.$parent.AdddialogFormVisible = false;
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