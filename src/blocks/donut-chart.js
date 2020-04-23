import build from "./build";
import icon from "../icons/donut-chart.svg";
export default (editor) =>
  build(editor)({
    icon,
    label: "grapesjs-echarts.components.donut.name",
    category: "Charts",
    type: "echarts-donut",
  });
