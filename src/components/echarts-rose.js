import build from "./buildSeries";
export default build({
  name: "grapesjs-echarts.components.rose.name",
  getOptions: (newSeries) => {
    const map = JSON.parse(newSeries);
    const series = [
      {
        type: "pie",
        radius: ["20%", "70%"],
        roseType: "area",
        itemStyle: { borderRadius: 4 },
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
        formatter: "{b}: {c} ({d}%)",
      },
      series,
    };
    return options;
  },
});
