import build from "./build";
import icon from "../icons/rose-chart.svg";
export default (editor) =>
  build(editor)({
    icon,
    label: "grapesjs-echarts.components.rose.name",
    type: "echarts-rose",
  });
