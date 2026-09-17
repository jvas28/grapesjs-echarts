export default function(editor) {
  return {
    extend: "default",
    model: {
      init() {
        this.on("change:attributes:data-ecg-options", this.handleOptionsChange);
        setTimeout(() => {
          const opt = this.get("attributes")["data-ecg-options"];
          if (opt) {
            this.handleOptionsChange(this, opt);
          }
        }, 100);
      },
      handleOptionsChange(a, opt) {
        const options = JSON.parse(opt);
        if (options) {
          if (this.chart) {
            editor.echarts.dispose(this.chart);
          }
          const chart = editor.echarts.init(this.view.el, null, {
            renderer: "canvas",
          });
          chart.setOption(options);
          this.chart = chart;
        }
      },
      defaults: {
        // Default props
        name: editor.I18n.t("grapesjs-echarts.components.custom.name"),
        resizable: true,
        traits: [
          {
            type: "text",
            label: "Options",
            name: "data-ecg-options",
          },
        ],
      },
    },
    view: {
      onRender({ model }) {
        setTimeout(() => {
          const opt = model.get("attributes")["data-ecg-options"];
          if (opt) {
            model.handleOptionsChange(model, opt);
          }
        }, 50);
      },
    },
  };
}
