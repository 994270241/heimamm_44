<template>
  <!-- 用户新增对话框 -->
  <el-dialog title="新增用户" :visible.sync="$parent.dialogTableVisible" class="user-dialog">
    <el-form :model="userform" :rules="rules" ref="userform">
      <el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
        <el-input v-model="userform.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
        <el-input v-model="userform.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="电话" :label-width="formLabelWidth" prop="phone">
        <el-input v-model="userform.phone" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="角色" :label-width="formLabelWidth" prop="role_id">
        <el-select v-model="userform.role_id" placeholder="请选择角色">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="状态" :label-width="formLabelWidth">
        <el-select v-model="userform.status" placeholder="请选择状态">
          <el-option label="开启" value="1"></el-option>
          <el-option label="禁用" value="0"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="用户备注" :label-width="formLabelWidth">
        <el-input v-model="userform.remark" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="$parent.dialogTableVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitForm">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { userAdd } from "../../../../api/user.js";
export default {
  name: "userDialog",
  data() {
    // 自定义校验规则的函数
    // 手机号
    var checkphone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("手机不能为空"));
      } else {
        // 利用判断手机号码格式
        const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
        // 判断是否符合
        if (reg.test(value) == true) {
          callback();
        } else {
          // 不满足 手机号码的格式
          callback(new Error("手机号码输入错误"));
        }
      }
    };
    // 邮箱
    var checkEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("邮箱不能为空"));
      } else {
        // 利用判断手机号码格式
        const reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
        // 判断是否符合
        if (reg.test(value) == true) {
          callback();
        } else {
          // 不满足 手机号码的格式
          callback(new Error("邮箱格式输入错误"));
        }
      }
    };
    return {
      // 宽度
      formLabelWidth: "80px",
      // 用户表单
      userform: {
        // 用户名
        username: "",
        // 邮箱
        email: "",
        // 电话
        phone: "",
        // 角色
        role_id: "",
        // 状态
        status: "",
        // 用户备注
        remark: ""
      },
      // 表单验证规则：
      rules: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" }
        ],
        email: [
          {
            required: true,
            message: "邮箱名称不能为空",
            validator: checkEmail,
            trigger: "blur"
          }
        ],
        phone: [
          {
            required: true,
            message: "手机号不能为空",
            validator: checkphone,
            trigger: "blur"
          }
        ],
        role_id: [{ required: true, message: "角色不能为空", trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm() {
      this.$refs.userform.validate(valid => {
        if (valid) {
          // 对
          userAdd(this.userform).then(res => {
            window.console.log("新增用户:", res);
            if (res.data.code === 200) {
              this.$message.success("新增成功");
              this.$parent.dialogTableVisible = false;
              // this.$parent.getUserList()
            } else if (res.data.code === 201) {
              this.$message.error("主人，用户名已存在，请重新输入");
            }
          });
        } else {
          // 错
          this.$message.error("主人，输入的格式有误，请检查一下哟！");
          return false;
        }
      });
    }
  }
};
</script>
    
<style lang="less">
.user-dialog {
  .el-dialog {
    width: 477px;
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