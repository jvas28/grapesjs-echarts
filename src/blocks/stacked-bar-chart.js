import build from "./build";
import icon from "../icons/stacked-bar-chart.svg";
export default (editor) =>
  build(editor)({
    icon,
    label: "grapesjs-echarts.components.stackedBar.name",
    type: "echarts-stacked-bar",
  });
