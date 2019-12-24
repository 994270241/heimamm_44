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
    <div class="main-card" ref="mainCard"></div>
  </div>
</template>

<script>
// 导入echarts
import echarts from "echarts";
// 导入接口
import { dataTitle,dataStatistics } from "../../../api/chart.js";
export default {
  name: "chart",
  data() {
    return {
      headData: {}
    };
  },
  created() {
    dataTitle({}).then(res => {
      window.console.log("数据列表,", res);
      this.headData = res.data;
    });
  },
  mounted() {
   dataStatistics().then(res => {
        window.console.log(res)
        // window.console.log(res);
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(this.$refs.mainCard);

      // 标题的 名字数字
      const legendData = [];
      res.data.forEach(v=>{
        legendData.push(v.name)
      })
      // 指定图表的配置项和数据
      var option = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          x: "right",
          data: legendData
        },
        series: [
          {
            color: ["#f76137", "#f9b358", "#409eff"],
            name: "访问来源",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: "center"
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "30",
                  fontWeight: "bold"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            // 使用服务器返回的数据替换即可
            data: res.data
          }
        ]
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
   })
  },
};
</script>

<style lang="less">
.chart-container {
  .head-card {
    height: 149px;
    .el-card__body {
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
          &.green {
            border-color: #74d691;
            color: #74d691;
          }
        }
        p {
          font-size: 16px;
          text-align: 16px;
        }
      }
    }
  }
  .main-card {
    margin-top: 13px;
    height: 571px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 5px 0px rgba(63, 63, 63, 0.35);
    border-radius: 4px;
  }
}
</style>