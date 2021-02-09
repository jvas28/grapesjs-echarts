const DEFAULT_GET_OPTIONS = function(newSeries) {
  const map = JSON.parse(newSeries);
  const series = [
    {
      type: "pie",
      radius: ["40%", "70%"],
      label: {
        normal: {
          show: false,
          position: "center",
        },
        emphasis: {
          show: true,
          textStyle: {
            fontSize: "14",
          },
        },
      },
      labelLine: {
        normal: {
          show: false,
        },
      },
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
};
export default ({
  getOptions = DEFAULT_GET_OPTIONS,
  name = "grapesjs-echarts.components.MY_COMPONENT.name",
}) => {
  return function(editor) {
    return {
      extend: "default",
      model: {
        init() {
          this.on("change:attributes:data-ecg-series", this.handleSeriesChange);
          this.on("change:attributes:data-ecg-theme", this.handleThemeChange);
          setTimeout(() => {
            const series = this.get("attributes")["data-ecg-series"] || "[]";
            const options = this.getOptions(series);
            const theme = this.get("attributes")["data-ecg-theme"] || null;
            console.log(series, theme);
            this.renderChart(options, theme);
          }, 100);
        },
        handleThemeChange(component, newTheme) {
          const series = component.get("attributes")["data-ecg-series"] || [];
          const options = this.getOptions(series);
          this.renderChart(options, newTheme);
        },
        handleSeriesChange(component, newSeries) {
          const theme = component.get("attributes")["data-ecg-theme"] || null;
          const options = this.getOptions(newSeries);
          this.renderChart(options, theme);
        },
        getOptions,
        renderChart(options, theme) {
          if (options) {
            if (this.chart) {
              editor.echarts.dispose(this.chart);
            }
            const chart = editor.echarts.init(this.view.el, theme, {
              renderer: "canvas",
            });
            chart.setOption(options);
            this.addAttributes({ "data-ecg-options": JSON.stringify(options) });
            this.chart = chart;
          }
        },
        defaults: {
          // Default props
          name: editor.I18n.t(name),
          resizable: true,
          traits: [
            {
              type: "echarts-series-trait",
            },
          ],
        },
      },
      view: {
        onRender({ model }) {
          setTimeout(() => {
            const series = model.get("attributes")["data-ecg-series"] || "[]";
            const options = model.getOptions(series);
            const theme = model.get("attributes")["data-ecg-theme"] || null;
            model.renderChart(options, theme);
          }, 50);
        },
      },
    };
  };
};
