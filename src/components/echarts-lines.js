import build from "./buildMultiseries";
export default build({
  name: "grapesjs-echarts.components.lines.name",
  getOptions: (newSeries) => {
    const map = JSON.parse(newSeries);
    const [lead] = map;
    const categories = lead.values.map(({ category }) => category);
    const legend = lead.values.map(({ label }) => label);
    const series = map.map(({ values, color, label }) => ({
      type: "line",
      data: values.map(({ value }) => value),
      name: label,
      itemStyle: { color },
    }));
    [
      {
        type: "line",
        data: map.map(({ value, color, label }) => ({
          value,
          name: label,
          itemStyle: { color },
        })),
      },
    ];

    const xAxis = {
      type: "category",
      boundaryGap: false,
      data: categories,
    };
    const options = {
      series,
      legend: {
        data: legend,
      },
      grid: {
        left: "5%",
        right: "5%",
        bottom: "5%",
        containLabel: true,
      },
      xAxis,
      tooltip: {
        trigger: "axis",
      },
      yAxis: [
        {
          type: "value",
        },
      ],
    };

    return options;
  },
});
