import build from "./buildSeries";
export default build({
  name: "grapesjs-echarts.components.funnel.name",
  getOptions: (newSeries) => {
    const map = JSON.parse(newSeries);
    const series = [
      {
        type: "funnel",
        left: "10%",
        top: 20,
        bottom: 20,
        width: "80%",
        sort: "descending",
        data: map.map(({ value, color, label }) => ({
          value,
          name: label,
          itemStyle: { color },
        })),
      },
    ];
    const options = {
      tooltip: {
        trigger: "item",
        formatter: "{b}: {c}",
      },
      series,
    };
    return options;
  },
});
