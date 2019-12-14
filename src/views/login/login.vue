<template>
  <div class="login-box">
    <!-- 表单盒子 -->
    <div class="from-box">
      <!-- 标题 -->
      <div class="title-box">
        <img src="../../assets/login-logo.png" alt />
        <span class="title">黑马面面</span>
        <i></i>
        <span class="sub-title">用户登录</span>
      </div>
      <!-- 饿了么表单布局 -->
      <el-form ref="form" :model="form" :rules="rules">
        <!-- 手机号 -->
        <el-form-item prop="phone">
          <el-input placeholder="请输入手机号" v-model="form.phone" prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            placeholder="请输入密码"
            v-model="form.password"
            prefix-icon="el-icon-lock"
            show-password
          ></el-input>
        </el-form-item>
        <!-- 验证码 -->
        <el-form-item prop="YZM">
          <el-row>
            <el-col :span="18">
              <el-input placeholder="请输入验证码" v-model="form.YZM" prefix-icon="el-icon-key"></el-input>
            </el-col>
            <el-col :span="6">
              <img src="../../assets/YZM.png" alt class="YZM" />
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item>
          <el-checkbox-group v-model="form.checked">
            <el-checkbox name="type">
              我已阅读并同意
              <el-link type="primary">用户协议</el-link>和
              <el-link type="primary">隐私条款</el-link>
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <!-- 按钮 -->
        <el-form-item>
          <el-button type="primary" class="login-btn" @click="submitForm">登录</el-button>
          <el-button class="register-btn">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 右边图片 -->
    <img class="login-src" src="../../assets/login_banner_ele.png" alt />
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    // 自定义校验规则的函数
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

    return {
      // 表单数据
      form: {
        // 手机
        phone: "",
        // 密码
        password: "",
        // 验证码
        YZM: "",
        // 勾选
        checked: false
      },
      // 验证规则
      rules: {
        // 手机号
        phone: [{ required: true, validator: checkphone, trigger: "blur" }],
        // 密码
        password: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur"
          },
          {
            min: 6,
            max: 18,
            message: "密码长度为 6 到 18",
            trigger: "change"
          }
        ],
        // 验证码
        YZM: [
          {
            required: true,
            message: "验证码不能为空",
            trigger: "blur"
          },
          {
            min: 4,
            max: 4,
            message: "验证码长度为4",
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    submitForm() {
      if (this.form.checked === false) {
        // 没勾
        this.$message.warning("没有勾,先勾一下呗");
      } else {
        this.$refs.form.validate(valid => {
          if (valid) {
            // 验证成功
            this.$message.success("恭喜你,成功了");
          } else {
            // 验证失败
            this.$message.error("很遗憾,内容没有写对!");

            return false;
          }
        });
      }
    }
  }
};
</script>

<style lang="less">
.login-box {
  // 开启弹性布局
  display: flex;
  // 上下居中
  align-items: center;
  // 左右居中
  justify-content: space-around;
  // 渐变
  background: linear-gradient(
    225deg,
    rgba(20, 147, 250, 1),
    rgba(1, 198, 250, 1)
  );
  height: 100%;

  .from-box {
    width: 478px;
    height: 550px;
    background-color: #f5f5f5;

    padding: 44px;
    .title-box {
      display: flex;
      align-items: center;
      img {
        width: 22px;
        height: 17px;
        margin-right: 16px;
      }
      .title {
        font-size: 24px;
      }
      .sub-title {
        font-size: 22px;
      }
      i {
        display: block;
        width: 1px;
        height: 28px;
        background: rgba(199, 199, 199, 1);
        margin-right: 12px;
        margin-left: 14px;
      }
    }
    .el-form {
      margin-top: 27px;
      // 两个按钮
      .el-button {
        width: 100%;
        margin: 0;
      }
      .register-btn {
        margin-top: 26px;
      }
      // 验证码图片
      .YZM {
        width: 100%;
        height: 42px;
      }
      .el-checkbox {
        display: flex;
        align-items: center;
        .el-checkbox__label {
          display: flex;
          align-items: center;
        }
      }
    }
  }
}
</style>