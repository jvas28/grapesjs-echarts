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
        this.on("change:attributes:data-ecg-options", this.handleOptionsChange);
      },
      handleOptionsChange(a, opt, c) {
        const options = JSON.parse(opt);
        if (options) {
          const chart = editor.echarts.init(this.view.el, null, {
            renderer: "canvas"
          });
          chart.setOption(options);
        }
      },
      defaults: {
        // Default props
        name: "Custom Chart",
        traits: [
          "id",
          "title",
          {
            type: "text",
            label: "Options",
            name: "data-ecg-options"
          }
        ]
      }
    },
    view: {}
  };
}
