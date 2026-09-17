import build from "./build";
import icon from "../icons/area-chart.svg";
export default (editor) =>
  build(editor)({
    icon,
    label: "grapesjs-echarts.components.area.name",
    type: "echarts-area",
  });
