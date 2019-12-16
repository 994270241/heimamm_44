<template>
<!-- 布局容器 -->
  <el-container class="index-container">
  <el-header class="my-header">Header</el-header>
  <el-container>
    <el-aside width="200px" class="my-aside">Aside</el-aside>
    <el-container>
      <el-main class="my-main">Main</el-main>
      
    </el-container>
  </el-container>
</el-container>
</template>

<script>
export default {

}
</script>

<style lang="less">
    .index-container{
        height: 100%;
        .my-header{
            background-color: skyblue;
        }
        .my-aside {
            background-color: purple;
        }
        .my-main{
            background-color: pink
        }
    }
</style>