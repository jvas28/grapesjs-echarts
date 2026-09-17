import loadTheme from "../utils/loadTheme";

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

function readRange(component) {
  const attrs = component.get("attributes");
  const min = attrs["data-ecg-min"];
  const max = attrs["data-ecg-max"];
  return {
    min: min === undefined || min === "" ? null : Number(min),
    max: max === undefined || max === "" ? null : Number(max),
  };
}

const DEFAULT_SERIES = [
  { id: 1, label: "Category 1", value: 100, color: "#5470c6" },
  { id: 2, label: "Category 2", value: 80, color: "#91cc75" },
  { id: 3, label: "Category 3", value: 60, color: "#fac858" },
];

export default ({
  getOptions = DEFAULT_GET_OPTIONS,
  name = "grapesjs-echarts.components.MY_COMPONENT.name",
  traitType = "echarts-series-trait",
  defaultSeries = DEFAULT_SERIES,
}) => {
  return function(editor) {
    return {
      extend: "default",
      model: {
        init() {
          this.on("change:attributes:data-ecg-series", this.handleSeriesChange);
          this.on("change:attributes:data-ecg-theme", this.handleThemeChange);
          this.on("change:attributes:data-ecg-min", this.handleRangeChange);
          this.on("change:attributes:data-ecg-max", this.handleRangeChange);
          setTimeout(() => this.renderIfNeeded(), 100);
        },
        // The view may not have a DOM node yet when init() runs, and the
        // view's own onRender may fire before or after this timeout — both
        // paths call this, and whichever runs first performs the one and
        // only initial paint. Subsequent updates go exclusively through the
        // attribute-change handlers below, never through this guarded path,
        // so a single edit doesn't cause redundant re-renders.
        renderIfNeeded() {
          if (this.chart || !this.view || !this.view.el) return;
          const series = this.get("attributes")["data-ecg-series"] || "[]";
          const options = this.getOptions(series, readRange(this));
          const theme = this.get("attributes")["data-ecg-theme"] || null;
          this.renderChart(options, theme);
        },
        handleThemeChange(component, newTheme) {
          const series = component.get("attributes")["data-ecg-series"] || "[]";
          const options = this.getOptions(series, readRange(component));
          this.renderChart(options, newTheme);
        },
        handleSeriesChange(component, newSeries) {
          const theme = component.get("attributes")["data-ecg-theme"] || null;
          const options = this.getOptions(newSeries, readRange(component));
          this.renderChart(options, theme);
        },
        handleRangeChange(component) {
          const theme = component.get("attributes")["data-ecg-theme"] || null;
          const series = component.get("attributes")["data-ecg-series"] || "[]";
          const options = this.getOptions(series, readRange(component));
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
              // Deferred: renderChart can run synchronously inside the
              // change:attributes:* handlers above, which themselves run
              // inside the dispatch of an earlier addAttributes() call.
              // Writing data-ecg-options back with addAttributes() in
              // that same call stack re-enters the model's attribute
              // diffing (attrUpdated) mid-dispatch and makes it re-fire
              // change:attributes:* a second time — pushing this to a
              // new tick avoids that.
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
            "data-ecg-series": JSON.stringify(defaultSeries),
            "data-ecg-theme": "",
          },
          traits: [
            {
              type: traitType,
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
