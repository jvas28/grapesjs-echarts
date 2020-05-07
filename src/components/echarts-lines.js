import build from "./buildMultiseries";
export default build({
  name: "grapesjs-echarts.components.lines.name",
  getOptions: (newSeries) => {
    const map = JSON.parse(newSeries);
    const series = [
      {
        type: "line",
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
