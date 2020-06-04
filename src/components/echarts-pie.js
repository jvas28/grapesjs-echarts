import build from "./buildSeries";

export default build({
  name: "grapesjs-echarts.components.pie.name",
  getOptions: (newSeries) => {
    const map = JSON.parse(newSeries);
    const series = [
      {
        type: "pie",
        data: map.map(({ value, color, label }) => ({
          value,
          name: label,
          itemStyle: { color },
        })),
      },
    ];
    const options = {
      series,
    };
    return options;
  },
});
