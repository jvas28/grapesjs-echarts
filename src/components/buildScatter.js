import loadTheme from "../utils/loadTheme";

const DEFAULT_GET_OPTIONS = function(newSeries) {
  const map = JSON.parse(newSeries);
  const options = {
    tooltip: { trigger: "item" },
    legend: { data: map.map(({ label }) => label) },
    xAxis: {},
    yAxis: {},
    series: map.map(({ points, color, label }) => ({
      type: "scatter",
      name: label,
      itemStyle: { color },
      data: points.map(({ x, y }) => [x, y]),
    })),
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
          setTimeout(() => this.renderIfNeeded(), 100);
        },
        // See buildSeries.js for why this is guarded: the view's onRender
        // also calls it, and only the first of the two should actually
        // paint. Ongoing updates go through the attribute-change handlers
        // below instead, which always re-render unconditionally.
        renderIfNeeded() {
          if (this.chart || !this.view || !this.view.el) return;
          const series = this.get("attributes")["data-ecg-series"] || "[]";
          const options = this.getOptions(series);
          const theme = this.get("attributes")["data-ecg-theme"] || null;
          this.renderChart(options, theme);
        },
        handleThemeChange(component, newTheme) {
          const series = component.get("attributes")["data-ecg-series"] || "[]";
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
            loadTheme(editor.echarts, theme, () => {
              if (this.chart) {
                editor.echarts.dispose(this.chart);
              }
              const chart = editor.echarts.init(this.view.el, theme, {
                renderer: "canvas",
              });
              chart.setOption(options);
              // Deferred: see buildSeries.js — writing data-ecg-options
              // back synchronously here re-enters the model's attribute
              // diffing while it's still dispatching the change that
              // triggered this render, causing it to double-fire.
              setTimeout(() => {
                this.addAttributes({ "data-ecg-options": JSON.stringify(options) });
              }, 0);
              this.chart = chart;
            });
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
                label: "Series I",
                color: null,
                points: [
                  { id: new Date().getTime(), x: 10, y: 20 },
                  { id: new Date().getTime() + 1, x: 30, y: 50 },
                  { id: new Date().getTime() + 2, x: 50, y: 30 },
                ],
              },
            ]),
            "data-ecg-theme": "",
          },
          traits: [
            {
              type: "echarts-scatter-trait",
            },
          ],
        },
      },
      view: {
        onRender({ model }) {
          setTimeout(() => model.renderIfNeeded(), 50);
        },
      },
    };
  };
};
