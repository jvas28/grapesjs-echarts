function resizeComponent(editor, component) {
  if (!component || !component.view || !component.view.el) return;
  editor.registeredComponents.map((name) => {
    if (component.is(name)) {
      const instanceId = component.view.el.getAttribute("_echarts_instance_");
      if (instanceId) {
        const instance = editor.echarts.getInstanceById(instanceId);
        if (instance) {
          component.chart = instance;
        }
      }

      if (component.chart) {
        component.chart.resize();
      }
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
