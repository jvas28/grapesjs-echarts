import icon from "../icons/custom-chart.svg";
export default (editor) => ({
  label: `${icon} ${editor.I18n.t("grapesjs-echarts.components.custom.name")}`,
  category: "Charts",
  content: {
    tagName: "div",
    style: {
      width: "300px",
      "min-height": "100px",
    },
    type: "echarts-custom",
    script: function() {
      const init = () => {
        try {
          const theme = this.getAttribute("data-ecg-theme");
          const options = JSON.parse(this.getAttribute("data-ecg-options"));
          const chart = echarts.init(this, theme);
          if (options) {
            chart.setOption(options);
          }
        } catch (e) {
          console.log(e);
        }
      };
      if (typeof echarts == "undefined") {
        var script = document.createElement("script");
        script.onload = init;
        script.src =
          "https://cdnjs.cloudflare.com/ajax/libs/echarts/4.6.0/echarts-en.min.js";
        document.body.appendChild(script);
      } else {
        init();
      }
    },
  },
});
