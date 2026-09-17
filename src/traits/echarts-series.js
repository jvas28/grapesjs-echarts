import SeriesSelector from "../vue/series-selector.vue";

export default ({ showRange = false } = {}) => ({
  // Expects as return a simple HTML string or an HTML element
  noLabel: true,
  createInput({ component }) {
    const editor = component.em.get("Editor");
    const intl = editor.I18n;
    const { Vue } = editor;
    const vueInstance = new Vue({
      render: (h) =>
        h(SeriesSelector, {
          props: {
            editor,
            t: (key) => intl.t(key),
            showRange,
            onChange: () => this.onEvent({ component }),
          },
        }),
    }).$mount();
    const [inputInstance] = vueInstance.$children;
    this.inputInstance = inputInstance;
    return vueInstance.$el;
  },
  // Update the component based element changes
  onEvent({ component }) {
    const { series, theme, min, max } = this.inputInstance;
    const attrs = {
      "data-ecg-series": JSON.stringify(series),
      "data-ecg-theme": theme,
    };
    if (showRange) {
      attrs["data-ecg-min"] = min;
      attrs["data-ecg-max"] = max;
    }
    component.addAttributes(attrs);
    component.view.render();
  },
  onUpdate({ component }) {
    const attributes = component.getAttributes();
    const series = attributes["data-ecg-series"] || null;
    const theme = attributes["data-ecg-theme"] || "";
    const min = attributes["data-ecg-min"];
    const max = attributes["data-ecg-max"];

    if (series) {
      this.inputInstance.hydrate({
        series: JSON.parse(series),
        theme,
        min: min === undefined ? null : Number(min),
        max: max === undefined ? null : Number(max),
      });
    }
  },
});
