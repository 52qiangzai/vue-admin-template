<template>
  <div class="app-container">
    <el-card class="box-card" v-loading="isLoading" style="z-index: -1111">
      <div id="main"></div>
    </el-card>
  </div>
</template>

<script>
import { reqReports } from "@/api/other";
import * as echarts from "echarts/core";
import {
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
} from "echarts/components";
import { LineChart } from "echarts/charts";
import { UniversalTransition } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";
echarts.use([
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  LineChart,
  CanvasRenderer,
  UniversalTransition,
]);
export default {
  name: "ReportList",
  data() {
    return {
      isLoading: true,
      option: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#E9EEF3",
            },
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
      },
    };
  },
  mounted() {
    this.getReports();
  },
  methods: {
    // 获取图表
    async getReports() {
      let { meta, data } = await reqReports();
      if (meta.status === 200) {
        let chartDom = document.getElementById("main");
        let myChart = echarts.init(chartDom);
        for (const key in data) {
          if (Object.hasOwnProperty.call(data, key)) {
            this.option[key] = data[key];
          }
        }
        this.option && myChart.setOption(this.option);
        this.isLoading = false;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
#main {
  width: 100%;
  height: 50vh;
}
</style>
