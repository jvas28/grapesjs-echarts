import build from "./build";
import icon from "../icons/bar-chart.svg";
export default (editor) =>
  build(editor)({
    icon,
    label: "grapesjs-echarts.components.bars.name",
    type: "echarts-bars",
  });
