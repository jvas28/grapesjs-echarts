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
          attributes: {
            "data-ecg-series": JSON.stringify([
              {
                id: new Date().getTime(),
                name: "Category I",
                values: [
                  {
                    id: new Date().getTime(),
                    category: "Category 1",
                    value: 100,
                  },
                ],
                label: "Item I",
                color: null,
              },
            ]),
            "data-ecg-theme": "",
          },
          traits: [
            {
              type: "echarts-multiseries-trait",
            },
          ],
        },
      },
      view: {},
    };
  };
};
