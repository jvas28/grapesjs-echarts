import build from "./build";
import icon from "../icons/pie-chart.svg";
export default (editor) =>
  build(editor)({
    icon,
    label: "grapesjs-echarts.components.pie.name",
    category: "Charts",
    type: "echarts-pie",
  });
