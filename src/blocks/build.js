import DEFAULT_ICON from "../icons/custom-chart.svg";
export default (editor) => {
  return function({
    icon = DEFAULT_ICON,
    label = "grapesjs-echarts.components.MY-COMPONENT.name",
    type = "my-echart",
    category = "Charts",
  }) {
    return {
      label: `${icon} ${editor.I18n.t(label)}`,
      category,
      content: {
        type,
        tagName: "div",
        style: {
          width: "300px",
          "min-height": "100px",
        },
        script: function() {
          if (!window.$grapesEcharts) {
            window.$grapesEcharts = {
              themes: [],
            };
          }
          const options = JSON.parse(this.getAttribute("data-ecg-options"));
          const theme = this.getAttribute("data-ecg-theme") || null;
          const init = () => {
            try {
              const instance = echarts.getInstanceByDom(this);
              if (instance) {
                echarts.dispose(instance);
              }
              const chart = echarts.init(this, theme);
              if (options) {
                chart.setOption(options);
              }
            } catch (e) {
              console.log(e);
            }
          };
          const themeCheck = () => {
            if (theme) {
              if (!window.$grapesEcharts.themes.includes(theme)) {
                const script = document.createElement("script");
                script.onload = init;
                window.$grapesEcharts.themes.push(theme);
                script.src = `https://unpkg.com/echarts@4.6.0/theme/${theme}.js`;
                document.body.appendChild(script);
              } else {
                init();
              }
            } else {
              init();
            }
          };
          if (typeof echarts === "undefined") {
            const script = document.createElement("script");
            script.onload = themeCheck;
            script.src =
              "https://cdnjs.cloudflare.com/ajax/libs/echarts/4.6.0/echarts-en.min.js";
            document.body.appendChild(script);
          } else {
            themeCheck();
          }
        },
      },
    };
  };
};
