<template>
  <div class="chart-container">
    <el-card class="head-card">
      <ul>
        <li>
          <i class="blue">{{headData.increment_questions}}</i>
          <p>今日新增用户</p>
        </li>
        <li>
          <i class="blue">{{headData.total_users}}</i>
          <p>总用户量</p>
        </li>
        <li>
          <i class="red">{{ headData.increment_questions}}</i>
          <p>新增试题</p>
        </li>
        <li>
          <i class="red">{{headData.total_questions}}</i>
          <p>总试题量</p>
        </li>
        <li>
          <i class="green">{{headData.total_done_questions}}</i>
          <p>总刷题量</p>
        </li>
        <li>
          <i class="green">{{headData.personal_questions}}</i>
          <p>人均刷题量</p>
        </li>
      </ul>
    </el-card>
  </div>
</template>

<script>
import {dataTitle} from "../../../api/chart.js"
export default {
  name: "chart",
  data() {
    return {
      headData : {

      }
    }
  },
  created() {
    dataTitle({

    }).then(res => {
      window.console.log('数据列表,',res)
      this.headData = res.data
    })
  },
};
</script>

<style lang="less">
.chart-container {
  .head-card {
    height: 149px;
    .el-card__body{
      padding-top: 10px;
    }
    ul {
      display: flex;
      align-items: center;
      list-style: none;
      justify-content: space-around;
      text-align: center;
      li {
        i {
          display: block;
          width: 99px;
          height: 99px;
          border-radius: 50%;
          border: 2px solid #000;
          line-height: 99px;
          font-style: normal;
          margin-bottom: 11px;
          &.blue {
            border-color: #0488fa;
            color: #0488fa;
          }
          &.red {
            border-color: #f76238;
            color: #f76238;
          }
          &.green{
            border-color: #74d691;
            color: #74d691
          }
        }
        p {
          font-size: 16px;
          text-align: 16px;
        }
      }
    }
  }
}
</style>