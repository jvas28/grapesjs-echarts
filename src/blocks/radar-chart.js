import build from "./build";
import icon from "../icons/radar-chart.svg";
export default (editor) =>
  build(editor)({
    icon,
    label: "grapesjs-echarts.components.radar.name",
    type: "echarts-radar",
  });
