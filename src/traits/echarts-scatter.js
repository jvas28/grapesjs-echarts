import ScatterSelector from "../vue/scatter-selector.vue";

export default {
  noLabel: true,
  createInput({ component }) {
    const editor = component.em.get("Editor");
    const intl = editor.I18n;
    const { Vue } = editor;
    const vueInstance = new Vue({
      render: (h) =>
        h(ScatterSelector, {
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
  onEvent({ component }) {
    const { series, theme } = this.inputInstance;
    component.addAttributes({
      "data-ecg-series": JSON.stringify(series),
      "data-ecg-theme": theme,
    });
  },
  onUpdate({ component }) {
    const attrs = component.getAttributes();
    const series = attrs["data-ecg-series"] || null;
    const theme = attrs["data-ecg-theme"] || "";

    if (series) {
      this.inputInstance.hydrate({ series: JSON.parse(series), theme });
    }
  },
};
