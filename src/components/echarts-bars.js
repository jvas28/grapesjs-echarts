export default function(editor) {
  return {
    isComponent: el => {
      try {
        const settings = el.getAttribute("data-ecg-settings");
        return !!settings;
      } catch (e) {
        return false;
      }
    },
    model: {
      init() {
        this.on("change:attributes:data-ecg-series", this.handleSeriesChange);
      },
      handleSeriesChange(a, s, c) {
        const map = JSON.parse(s);
        const series = [
          {
            type: "bar",
            data: map.map(({ value }) => value)
          }
        ];
        const xAxis = [{
          data: map.map(({ label }) => label)
        }];
        const options = {
          series,
          xAxis,
          yAxis: [
            {
              type: "value"
            }
          ]
        };
        if (options) {
          const chart = editor.echarts.init(this.view.el, null, {
            renderer: "canvas"
          });
          chart.setOption(options);
        }
      },
      defaults: {
        // Default props
        name: "Bar Chart",
        traits: [
          "id",
          "title",
          {
            type: "series-trait"
          }
        ]
      }
    },
    view: {}
  };
}
