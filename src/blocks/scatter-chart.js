import build from "./build";
import icon from "../icons/scatter-chart.svg";
export default (editor) =>
  build(editor)({
    icon,
    label: "grapesjs-echarts.components.scatter.name",
    type: "echarts-scatter",
  });
