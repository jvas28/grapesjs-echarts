import build from "./buildSeries";
export default build({
  name: "grapesjs-echarts.components.hbar.name",
  getOptions: (newSeries) => {
    const map = JSON.parse(newSeries);
    const series = [
      {
        type: "bar",
        data: map.map(({ value, color, label }) => ({
          value,
          name: label,
          itemStyle: { color },
        })),
      },
    ];

    const yAxis = [
      {
        type: "category",
        data: map.map(({ label }) => label),
      },
    ];
    const options = {
      series,
      yAxis,
      xAxis: [
        {
          type: "value",
        },
      ],
    };

    return options;
  },
});
