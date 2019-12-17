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
              <img @click="getYZM" :src="YZMUrl" alt class="YZM" />
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
          <el-button class="register-btn" @click="dialogFormVisible = true">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 右边图片 -->
    <img class="login-src" src="../../assets/login_banner_ele.png" alt />
    <!-- 用户注册对话框 -->
    <el-dialog title="用户注册" :visible.sync="dialogFormVisible">
      <el-form ref="regForm" :model="regForm" :rules="regRules">
        <!-- 头像 -->
        <el-form-item label="头像" :label-width="formLabelWidth">
          <!-- 头像上传 -->
          <el-form-item prop="avatar">
            <el-upload
              name="image"
              class="avatar-uploader"
              :action="uploads"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-form-item>
        <!-- 昵称-->
        <el-form-item label="昵称" :label-width="formLabelWidth" prop="username">
          <el-input v-model="regForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 邮箱 -->
        <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
          <el-input v-model="regForm.email" autocomplete="off"  ></el-input>
        </el-form-item>
        <!-- 手机 -->
        <el-form-item label="手机" :label-width="formLabelWidth" prop="phone">
          <el-input v-model="regForm.phone" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
          <el-input v-model="regForm.password" autocomplete="off" show-password></el-input>
        </el-form-item>
        <!-- 图形码 -->
        <el-form-item label="图形码" :label-width="formLabelWidth" prop="regYZM">
          <el-row>
            <el-col :span="16">
              <el-input v-model="regForm.regYZM" autocomplete="off"></el-input>
            </el-col>
            <el-col :span="7" :offset="1">
              <!-- 图片 -->
              <img :src="regCapatchUrl" @click="getregCapatchUrl" alt class="register-YZM" />
            </el-col>
          </el-row>
        </el-form-item>
        <!-- 验证码 -->
        <el-form-item label="验证码 " :label-width="formLabelWidth" prop="rcode">
          <el-row>
            <el-col :span="16">
              <el-input v-model="regForm.rcode" autocomplete="off"></el-input>
            </el-col>
            <el-col :span="7" :offset="1">
              <el-button
                @click="getMessageCode"
                :disabled="time != 0"
              >{{ time == 0? "获取用户验证码" : `还有${time}s继续获取`}}</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitRegForm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 导入登录接口
import { login, sendsms, register } from "../../api/login.js";
// 导入axios
// import axios from "axios";

// 导入并使用 token函数
import {setToken} from "../../utils/token.js"

export default {
  name: "login",
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
      // 注册表单数据:
      regForm: {
        // 头像:
        avatar: "",
        // 昵称:
        username: "",
        // 邮箱:
        email: "",
        // 手机号码:
        phone: "",
        // 密码:
        password: "",
        // 图形验证码
        regYZM: "",
        // 短信验证:
        rcode: ""
      },
      // 表单验证规则
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
      },
      // 注册表单验证规则
      regRules: {
        // 用户名:
        username: [
          {
            required: true,
            message: "用户名不能为空",
            trigger: "blur"
          },
          {
            min: 2,
            max: 18,
            message: "用户名长度为 2 到 18",
            trigger: "change"
          }
        ],
        // 手机号:
        phone: [{ required: true, validator: checkphone, trigger: "blur" }],
        // 邮箱:
        email: [
          {
            required: true,
            message: "邮箱不能为空",
            trigger: "blur",
            validator: checkEmail
          }
        ],
        // 头像:
        // avatr: [
        //   {
        //     required: true,
        //     message: "头像不能为空",
        //     trigger: "blur",

        //   },
        // ],

        // 密码:
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
        // 验证码:
        rcode: [
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
        ],
        // 图形码:
        regYZM: [
          {
            required: true,
            message: "图形码不能为空",
            trigger: "blur"
          },
          {
            min: 4,
            max: 4,
            message: "图形码长度为4",
            trigger: "change"
          }
        ]
      },

      // 验证码URL:
      YZMUrl: process.env.VUE_APP_BASEURL + "/captcha?type=login",
      // 是否弹出对话框
      dialogFormVisible: false,
      //  宽度
      formLabelWidth: "65px",
      //  上传地址
      imageUrl: "",
      //  注册码
      regCapatchUrl: process.env.VUE_APP_BASEURL + "/captcha?type=sendsms",
      // 倒计时
      time: 0,
      // 图片上传地址
      uploads: `${process.env.VUE_APP_BASEURL}/uploads`
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
            // 用户登录请求
            // axios({
            //   url: process.env.VUE_APP_BASEURL + "/login",
            //   method: "post",
            //   // 设置跨域请求可以携带cookie
            //   withCredentials: true,
            //   data: {
            //     phone: this.form.phone,
            //     password: this.form.password,
            //     code: this.form.YZM
            //   }
            // })

            login({
              phone: this.form.phone,
              password: this.form.password,
              code: this.form.YZM
            }).then(res => {
              //成功回调
              window.console.log(res);
              if (res.data.code === 202) {
                this.$message.error(res.data.message);
              } else if (res.data.code === 200) {
                this.$message.success("主人!欢迎回来(づ￣ 3￣)づ");
                // 这种不建议用 key可能会写错
                // localStorage.setItem("token", res.data.data.token);
                setToken(res.data.data.token)
                this.$router.push("/index");
              }
            });
          } else {
            // 验证失败
            this.$message.error("很遗憾,内容没有写对!");

            return false;
          }
        });
      }
    },
    // 获取验证码:
    getYZM() {
      // 时间戳
      this.YZMUrl =
        process.env.VUE_APP_BASEURL + "/captcha?type=login&" + Date.now();
    },
    // 用户头像上传
    handleAvatarSuccess(res, file) {
      // 保存头像地址:
      this.regForm.avatar = res.data.file_path;
      // 生成本地的临时地址
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // 获取注册验证码
    getregCapatchUrl() {
      this.regCapatchUrl = `${
        process.env.VUE_APP_BASEURL
      }/captcha?type=sendsms&${Date.now()}`;
    },
    // 获取用户验证码
    getMessageCode() {
      // 手机号码判断
      // 正则
      const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
      if (!reg.test(this.regForm.phone)) {
        return this.$message.error("兄弟,手机号码格式不太对喔!");
      }
      // 手机号图片验证码:
      if (this.regForm.regYZM == "" || this.regForm.regYZM.length != 4) {
        return this.$message.error("验证码错误,老哥,你是机器人吗?");
      }
      this.time = 60;

      const id = setInterval(() => {
        this.time--;
        if (this.time == 0) {
          clearInterval(id);
        }
      }, 100);

      //获取短信验证码
      // axios({
      //   url: process.env.VUE_APP_BASEURL + "/sendsms",
      //   method: "post",
      //   // 携带跨域
      //   withCredentials: true,
      //   data: {
      //     code: this.regForm.regYZM,
      //     phone: this.regForm.phone
      //   }
      // });

      sendsms({
        code: this.regForm.regYZM,
        phone: this.regForm.phone
      }).then(res => {
        //成功回调
        // window.console.log(res);
        if (res.data.code == 200) {
          this.$message.success(`你的短信验证码${res.data.data.captcha}`);
        }
      });
    },
    // 注册请求:
    submitRegForm() {
      this.$refs.regForm.validate(valid => {
        if (valid) {
          // axios({
          //   url: process.env.VUE_APP_BASEURL + "/register",
          //   method: "post",
          //   data: {
          //     username: this.regForm.username,
          //     phone: this.regForm.phone,
          //     email: this.regForm.email,
          //     avatar: this.regForm.avatar,
          //     password: this.regForm.password,
          //     rcode: this.regForm.rcode
          //   }
          // })
          register({
            username: this.regForm.username,
            phone: this.regForm.phone,
            email: this.regForm.email,
            avatar: this.regForm.avatar,
            password: this.regForm.password,
            rcode: this.regForm.rcode
          }).then(res => {
            //成功回调
            window.console.log(res);
            if (res.data.code == 200) {
              this.$message.success("恭喜你,注册成功,么么哒");
              this.dialogFormVisible = false;
            } else {
              this.$message.error("注册失败,请重新注册");
            }
          });
        } else {
          this.$message.error("很遗憾,内容没有写对");
          return false;
        }
      });
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
  // 用户注册
  .el-dialog {
    width: 603px;
    height: 786px;
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(78, 78, 78, 1);
    .el-dialog__header {
      text-align: center;
      width: 600px;
      height: 53px;
      // line-height: 53px;
      background: linear-gradient(to right, #01c4fa, #1294fa);
      .el-dialog__title {
        font-size: 18px;
        padding-bottom: 20px;
        color: white;
      }
    }
    // 头像上传
    .avatar-uploader {
      text-align: center;
    }
    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409eff;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
    .dialog-footer {
      text-align: center;
    }
    .register-YZM {
      width: 100%;
      height: 42px;
    }
  }
}
</style>