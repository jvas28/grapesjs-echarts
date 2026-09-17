import build from "./buildMultiseries";
export default build({
  name: "grapesjs-echarts.components.radar.name",
  getOptions: (newSeries) => {
    const map = JSON.parse(newSeries);
    const [lead] = map;
    const categories = lead ? lead.values.map(({ category }) => category) : [];
    // Auto-scale each axis to the largest value seen for that category so
    // users don't have to configure a max per indicator by hand.
    const indicator = categories.map((axisName, index) => {
      const highest = Math.max(
        1,
        ...map.map((serie) => Number((serie.values[index] || {}).value) || 0)
      );
      return { name: axisName, max: Math.ceil(highest * 1.2) };
    });
    const series = [
      {
        type: "radar",
        data: map.map(({ values, color, label }) => ({
          name: label,
          value: values.map(({ value }) => value),
          itemStyle: { color },
          areaStyle: { opacity: 0.15 },
        })),
      },
    ];
    const options = {
      legend: {
        data: map.map(({ label }) => label),
      },
      tooltip: {},
      radar: {
        indicator,
      },
      series,
    };
    return options;
  },
});
