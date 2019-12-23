<template>
  <!-- 新增对话框 -->
  <el-dialog
    class="add-dialog"
    fullscreen
    title="新增题库"
    :visible.sync="$parent.AdddialogFormVisible"
  >
    <el-form :model="addform" :rules="rules" ref="addform">
      <el-form-item label="学科" :label-width="formLabelWidth" prop="subject">
        <el-select v-model="addform.subject" placeholder="请选择学科">
          <el-option
            v-for="item in $parent.subjectList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="阶段" :label-width="formLabelWidth" prop="step">
        <el-select v-model="addform.step" placeholder="请选择阶段">
          <el-option label="初级" :value="1"></el-option>
          <el-option label="中级" :value="2"></el-option>
          <el-option label="高级" :value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="企业" :label-width="formLabelWidth" prop="enterprise">
        <el-select v-model="addform.enterprise" placeholder="请选择企业">
          <el-option
            v-for="item in $parent.enterpriseList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="城市" :label-width="formLabelWidth" prop="city">
        <!-- 将value值 设置为 label的选项 -->
        <!-- <el-cascader :props="props" v-model="addForm.city" :options="options"></el-cascader> -->
        <el-cascader v-model="addform.city" :options="options" :props="props"></el-cascader>
      </el-form-item>

      <el-form-item label="题型" :label-width="formLabelWidth">
        <el-radio-group v-model="addform.type">
          <el-radio :label="1">单选</el-radio>
          <el-radio :label="2">多选</el-radio>
          <el-radio :label="3">简答</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="难度" :label-width="formLabelWidth">
        <el-radio-group v-model="addform.difficulty">
          <el-radio :label="1">简单</el-radio>
          <el-radio :label="2">一般</el-radio>
          <el-radio :label="3">困难</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="$parent.AdddialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitForm">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { subjectAdd } from "../../../../api/subject.js";
// 导入城市插件
import { regionData } from "element-china-area-data";
export default {
  data() {
    return {
      // 级联选择器的数据
      options: regionData,
      // 级联选者器绑定的选项
      props: { expandTrigger: 'hover', value: 'label'},
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
        remark: "",
        city: ""
      },
      // 表单验证规则
      rules: {
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
      this.$refs.addform.validate(valid => {
        if (valid) {
          // 对
          subjectAdd(this.addform).then(res => {
            window.console.log("新增学科:", res);
            if (res.code === 200) {
              this.$message.success("新增成功");
              this.$parent.AdddialogFormVisible = false;
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