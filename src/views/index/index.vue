<template>
  <!-- 布局容器 -->
  <el-container class="index-container">
    <el-header class="my-header">
      <!-- 左边 -->
      <div class="left">
        <i class="el-icon-s-fold"></i>
        <img src="../../assets/矢量智能对象 拷贝 9.png" alt />
        <span>黑马面面</span>
      </div>
      <!-- 右边 -->
      <div class="right">
        <img class="user-icon" src="../../assets/nx.jpg" alt />
        <span class="username">友利奈绪,你好</span>
        <el-button class="tuichu" size="small">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px" class="my-aside">Aside</el-aside>
      <el-container>
        <el-main class="my-main">Main</el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
export default {};
</script>

<style lang="less">
.index-container {
  height: 100%;
  .my-header {
    background-color: skyblue;
    display: flex;
    // align-items: center;
    justify-content: space-between;
    // 左边
    .left {
      display: flex;
      align-items: center;
      i {
        // width: 24px;
        // height: 2px;
        font-size: 24px;
      }
      img {
        width: 33px;
        height: 28px;
        margin-left: 22px;
        margin-right: 11px;
      }
      span {
        font-size: 22px;
        color: #49a1ff;
      }
    }
    .right {
      display: flex;
      align-items: center;
      img {
        width: 43px;
        height: 43px;
        border-radius: 50%;
        margin-right: 9px;
      }
      .username {
        font-size: 14px;
        margin-right: 38px;
      }
    }
  }
  .my-aside {
    background-color: purple;
  }
  .my-main {
    background-color: pink;
  }
}
</style>