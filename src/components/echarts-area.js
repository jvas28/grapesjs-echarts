import build from "./buildMultiseries";
export default build({
  name: "grapesjs-echarts.components.area.name",
  getOptions: (newSeries) => {
    const map = JSON.parse(newSeries);
    const [lead] = map;
    const categories = lead ? lead.values.map(({ category }) => category) : [];
    const legend = map.map(({ label }) => label);
    const series = map.map(({ values, color, label }) => ({
      type: "line",
      areaStyle: {},
      data: values.map(({ value }) => value),
      name: label,
      itemStyle: { color },
    }));

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
