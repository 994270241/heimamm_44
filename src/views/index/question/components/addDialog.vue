<template>
  <!-- 新增对话框 -->
  <el-dialog
    @opened="opened"
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
      <!-- 分割线 -->
      <el-divider></el-divider>
      <el-form-item label="试题标题" prop="title"></el-form-item>
      <div class="title-toolbar"></div>
      <div class="title-content"></div>
      <!-- 选项区域-单选 -->
      <el-form-item label="单选" prop="single_select_answer">
        <el-radio-group v-model="addform.single_select_answer">
          <!-- 选项A -->
          <div class="radio-box">
            <el-radio label="A">A</el-radio>
            <!-- 输入框 -->
            <el-input v-model="addform.select_options[0].text" placeholder></el-input>
            <!-- 上转组件 -->
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageAUrl" :src="imageAUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
          <!-- 选项B -->
          <div class="radio-box">
            <el-radio label="B">B</el-radio>
            <!-- 输入框 -->
            <el-input v-model="addform.select_options[1].text" placeholder></el-input>
            <!-- 上转组件 -->
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :show-file-list="false"
              :on-success="handleBvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageBUrl" :src="imageBUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
          <!-- 选项C -->
          <div class="radio-box">
            <el-radio label="C">C</el-radio>
            <!-- 输入框 -->
            <el-input v-model="addform.select_options[2].text" placeholder></el-input>
            <!-- 上转组件 -->
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :show-file-list="false"
              :on-success="handleCvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageCUrl" :src="imageCUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
          <!-- 选项D -->
          <div class="radio-box">
            <el-radio label="D">D</el-radio>
            <!-- 输入框 -->
            <el-input v-model="addform.select_options[3].text" placeholder></el-input>
            <!-- 上转组件 -->
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :show-file-list="false"
              :on-success="handleDvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageDUrl" :src="imageDUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
        </el-radio-group>
      </el-form-item>
      <!-- 分割线 -->
      <el-divider></el-divider>
      <!-- 视频上传区域 -->
      <el-form-item label="解析视频">
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleVideoSuccess"
          :before-upload="beforeVideoUpload"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传mp4文件，且不超过2000kb</div>
        </el-upload>
        <video  :src="VideoUrl" v-if="VideoUrl" class="preview-video"></video>
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
// 导入王编辑器
import wangeditor from "wangeditor";
export default {
  data() {
    return {
      // 级联选择器的数据
      options: regionData,
      // 级联选者器绑定的选项
      props: { expandTrigger: "hover", value: "label" },
      // 富文本编辑器 标题部分
      titleEditor: undefined,
      // 本地预览地址
      imageAUrl: "",
      imageBUrl: "",
      imageCUrl: "",
      imageDUrl: "",
      // 文件上传的地址
      uploadUrl: process.env.VUE_APP_BASEURL + "/question/upload",
      // 视频的临时地址
      VideoUrl : '',
      // 新增表单:
      addform: {
        select_options: [
          {
            label: "A",
            text: "狗不理",
            image: "upload/20191129/fd5f03a07d95e3948860240564b180e4.jpeg"
          },
          {
            label: "B",
            text: "猫不理",
            image: "upload/20191129/e93e7bb72accda7f3159cdabc4203991.jpeg"
          },
          {
            label: "C",
            text: "麻花",
            image: "upload/20191129/b7caf98be9d0aa6764b0112ba0dfa19e.jpeg"
          },
          {
            label: "D",
            text: "炸酱面",
            image: "upload/20191129/4067f19ab53a5e8388ad3459e23110f0.jpeg"
          }
        ]
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
    // 王编辑器
    opened() {
      if (this.titleEditor === undefined) {
        this.titleEditor = new wangeditor(".title-toolbar", "title-content");
        this.titleEditor.customConfig.onchange = html => {
          // html 即变化之后的内容
          // window.console.log(html);
          // 设置给标题
          this.addform.title = html;
        };

        this.titleEditor.create();
      }
    },
    // 上传组件的钩子
    handleAvatarSuccess(res, file) {
      this.imageAUrl = URL.createObjectURL(file.raw);
      // 设置给第一个选项的 图片地址
      this.addform.select_options[0].image = res.data.url;
    },
    // 上传组件的钩子
    handleBvatarSuccess(res, file) {
      this.imageBUrl = URL.createObjectURL(file.raw);
      // 设置给第一个选项的 图片地址
      this.addform.select_options[1].image = res.data.url;
    },
    // 上传组件的钩子
    handleCvatarSuccess(res, file) {
      this.imageCUrl = URL.createObjectURL(file.raw);
      // 设置给第一个选项的 图片地址
      this.addform.select_options[2].image = res.data.url;
    },
    // 上传组件的钩子
    handleDvatarSuccess(res, file) {
      this.imageDUrl = URL.createObjectURL(file.raw);
      // 设置给第一个选项的 图片地址
      this.addform.select_options[3].image = res.data.url;
    },

    // 视频上传组件的钩子
    handleVideoSuccess(res, file) {
      this.imageDUrl = URL.createObjectURL(file.raw);
      // 设置给第一个选项的 图片地址
      this.addform.video = res.data.url
    },
    beforeVideoUpload(file) {
      const isJPG = file.type === "video/mp4";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG或png 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
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
  .title-toolbar {
    border: 1px solid #c7c7c7;
    border-bottom: none;
  }
  .title-content {
    border: 1px solid #c7c7c7;
    height: 100px;
  }
  // 上传组件的样式
  .avatar-uploader {
    margin-left: 20px;
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
  // 表单宽度
  .el-form {
    width: 60%;
    margin: 0 auto;
  }
  .el-radio-group {
    width: 100%;
  }
  .radio-box {
    display: flex;
    align-items: center;
    margin-top: 45px;
    // 小间隙
    .el-checkbox {
      margin-right: 30px;
    }
  }
  .preview-video {
    width: 320px;
  }
}
</style>