import build from "./build";
import icon from "../icons/funnel-chart.svg";
export default (editor) =>
  build(editor)({
    icon,
    label: "grapesjs-echarts.components.funnel.name",
    type: "echarts-funnel",
  });
