import build from "./build";
import icon from "../icons/gauge-chart.svg";
export default (editor) =>
  build(editor)({
    icon,
    label: "grapesjs-echarts.components.gauge.name",
    type: "echarts-gauge",
  });
