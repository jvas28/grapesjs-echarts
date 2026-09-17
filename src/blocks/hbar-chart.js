import build from "./build";
import icon from "../icons/hbar-chart.svg";
export default (editor) =>
  build(editor)({
    icon,
    label: "grapesjs-echarts.components.hbar.name",
    type: "echarts-hbar",
  });
