import build from "./buildSeries";

const GAP = 100;

export default build({
  name: "grapesjs-echarts.components.gauge.name",
  traitType: "echarts-gauge-trait",
  defaultSeries: [
    { id: 1, label: "Progress", value: 72, color: "#5470c6" },
  ],
  getOptions: (newSeries, { min, max } = {}) => {
    const map = JSON.parse(newSeries);
    const count = map.length || 1;
    const series = map.map(({ value, color, label }, index) => ({
      type: "gauge",
      center: [`${((index + 1) / (count + 1)) * GAP}%`, "55%"],
      radius: `${Math.min(90 / count, 60)}%`,
      min: min === null || min === undefined ? 0 : min,
      max: max === null || max === undefined ? 100 : max,
      progress: { show: true, width: 10 },
      axisLine: { lineStyle: { width: 10 } },
      pointer: { show: false },
      axisTick: { show: false },
      splitLine: { show: false },
      axisLabel: { show: false },
      itemStyle: { color },
      title: { fontSize: 12 },
      detail: { valueAnimation: true, fontSize: 16, offsetCenter: [0, "70%"] },
      data: [{ value, name: label }],
    }));
    return { series };
  },
});
