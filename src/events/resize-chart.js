function resizeComponent(editor, component) {
  if (!component) return;
  editor.registeredComponents.map((name) => {
    // The component model keeps a direct reference to its own chart
    // instance (set in renderChart); that's used here instead of the
    // `_echarts_instance_` DOM attribute echarts sets on init, because
    // grapesjs's view fully rebuilds DOM attributes from the component
    // model on every render (see ComponentView.updateAttributes), which
    // wipes any attribute set directly on the DOM outside that model.
    if (component.is(name) && component.chart) {
      component.chart.resize();
    }
  });
}

export default {
  listenTo: [
    "styleManager:change:width",
    "styleManager:change:height",
    "component:resize",
    "component:resize:move",
  ],
  action(...args) {
    const editor = this.get("Editor");
    const [payload] = args;
    const component =
      (payload && payload.component) || editor.getSelected();
    resizeComponent(editor, component);
  },
};
