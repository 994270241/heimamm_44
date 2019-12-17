<template>
  <!-- 布局容器 -->
  <el-container class="index-container">
    <el-header class="my-header">
      <!-- 左边 -->
      <div class="left">
        <i class="el-icon-s-fold" @click="isCollapse = !isCollapse"></i>
        <img src="../../assets/矢量智能对象 拷贝 9.png" alt />
        <span>黑马面面</span>
      </div>
      <!-- 右边 -->
      <div class="right">
        <img class="user-icon" :src="avatar" alt />
        <span class="username">{{userinfo.username}},你好</span>
        <el-button class="tuichu" size="small">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <el-aside width="auto" class="my-aside">
        <!-- 导航菜单 -->
         <!-- <input type="button" value="切换" @click="isCollapse = !isCollapse"> -->
        <el-menu  :default-active="$route.path" class="el-menu-vertical-demo" :collapse="isCollapse" router>
          <!-- 数据概览 -->
          <el-menu-item index="/index/chart">
            <i class="el-icon-pie-chart"  ></i>
            <span slot="title">数据概览</span>
          </el-menu-item>
          <!-- 用户列表 -->
          <el-menu-item index="/index/user">
            <i class="el-icon-user"></i>
            <span slot="title">用户列表</span>
          </el-menu-item>
          <!-- 题库列表 -->
          <el-menu-item index="/index/question">
            <i class="el-icon-edit-outline"></i>
            <span slot="title">题库列表</span>
          </el-menu-item>
          <!-- 企业列表 -->
          <el-menu-item index="/index/enterprise">
            <i class="el-icon-office-building"></i>
            <span slot="title">企业列表</span>
          </el-menu-item>
          <!-- 学科列表 -->
          <el-menu-item index="/index/subject">
            <i class="el-icon-notebook-2"></i>
            <span slot="title">学科列表</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-main class="my-main">
            <!-- 嵌套路由出口 -->
            <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
//获取token
import {getToken,removeToken} from "../../utils/token.js"
// 获取userinfo
import {userinfo} from "../../api/user.js"
export default {
  name: "index",
  data() {
    return {
      // 是否折叠
      isCollapse:false,
      // 用户信息
      userinfo : '',
      // 用户头像
      avatar : '',

    };
  },
  beforeCreate() {
    // 不存在
    if(!getToken()) {
      // 提示用户
      this.$message.error('主人,没经过奈绪酱同意!不准偷偷登录哦!╥﹏╥...')
      this.$router.push("/login")
    }
    
  },
  created() {
    userinfo().then(res => {
      window.console.log("用户信息:",res);
      if(res.data.code === 200) {
        this.userinfo = res.data.data
        this.avatar = `${process.env.VUE_APP_BASEURL}/${res.data.data.avatar}`
      }else if (res.data.code === 206){
        // 提示用户
        this.$message.warning('主人,不准偷偷摸摸来房间哦')
        // 干掉token
        removeToken()
        // 返回登录页
        this.$router.push("/login")
      }
    })
  },
};
</script>

<style lang="less">
.index-container {
  height: 100%;
  .my-header {
    // background-color: skyblue;
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
    // background-color: purple;
    // 导航样式
    .el-menu-vertical-demo:not(.el-menu--collapse) {
      width: 200px;
      min-height: 400px;
    }
  }
  .my-main {
    // background-color: pink;
  }
}
</style>