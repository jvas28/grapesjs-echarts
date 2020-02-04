export default {
  label: "Custom Chart",
  category: 'Charts',
  content: {
    tagName: "div",
    style: {
      width: "300px",
      height: "300px"
    },
    type: "echarts-custom",
    script: function() {
      const init = () => {
        const el = this;
        const chart = echarts.init(this);
        try {
          const options = this.getAttribute("data-ecg-options");
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
    }
  }
};
