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
    </div>
    <!-- 右边图片 -->
    <img class="login-src" src="../../assets/login_banner_ele.png" alt />
  </div>
</template>

<script>
export default {
  name: "login"
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
  }
}
</style>