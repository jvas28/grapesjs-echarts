import SeriesSelector from "../vue/series-selector.vue";
export default {
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
    const { series, theme } = this.inputInstance;
    component.addAttributes({
      "data-ecg-series": JSON.stringify(series),
      "data-ecg-theme": theme,
    });
    component.view.render();
  },
  onUpdate({ component }) {
    const series = component.getAttributes()["data-ecg-series"] || null;
    const theme = component.getAttributes()["data-ecg-theme"] || null;

    if (series) {
      this.inputInstance.series = JSON.parse(series);
      this.inputInstance.theme = theme;
    }
  },
};
