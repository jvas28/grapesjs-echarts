import echartsSeries from "./echarts-series";
import echartsMultiseries from "./echarts-multiseries";
import echartsScatter from "./echarts-scatter";

export default {
  "echarts-series-trait": echartsSeries(),
  "echarts-gauge-trait": echartsSeries({ showRange: true }),
  "echarts-multiseries-trait": echartsMultiseries,
  "echarts-scatter-trait": echartsScatter,
};
