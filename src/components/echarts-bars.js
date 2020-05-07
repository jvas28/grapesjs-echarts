import build from "./buildSeries";
export default build({
  name: "grapesjs-echarts.components.bars.name",
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

    const xAxis = [
      {
        data: map.map(({ label }) => label),
      },
    ];
    const options = {
      series,
      xAxis,
      yAxis: [
        {
          type: "value",
        },
      ],
    };

    return options;
  },
});
