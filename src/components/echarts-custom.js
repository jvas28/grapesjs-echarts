export default function(editor) {
  return {
    extend: "default",
    model: {
      init() {
        this.on("change:attributes:data-ecg-options", this.handleOptionsChange);
        setTimeout(() => this.renderIfNeeded(), 100);
      },
      // The view may not have a DOM node yet when init() runs, and the
      // view's own onRender may fire before or after this timeout — both
      // paths call this, and whichever runs first performs the one and
      // only initial paint. Later edits go through handleOptionsChange
      // via the attribute-change listener above instead.
      renderIfNeeded() {
        if (this.chart || !this.view || !this.view.el) return;
        const opt = this.get("attributes")["data-ecg-options"];
        if (opt) {
          this.handleOptionsChange(this, opt);
        }
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
        setTimeout(() => model.renderIfNeeded(), 50);
      },
    },
  };
}
