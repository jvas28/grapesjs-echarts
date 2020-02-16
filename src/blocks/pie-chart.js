import icon from "../icons/pie-chart.svg";
export default {
	label: `${icon} Pie Chart`,
	category: "Charts",
	content: {
		tagName: "div",
		style: {
			width: "300px",
			"min-height": "100px"
		},
		type: "echarts-pie",
		script: function() {
			console.log("boom");
			if(!window.$grapesEcharts) {
				window.$grapesEcharts = {
					themes: [],
				};
			}
			const options = JSON.parse(this.getAttribute("data-ecg-options"));
			const theme = this.getAttribute("data-ecg-theme");
					
			const init = () => {
				try {
					const instance = echarts.getInstanceByDom(this);
					if(instance) {
						echarts.dispose(instance);
					}
					console.log(theme);
					const chart = echarts.init(this, theme);
					if (options) {
						chart.setOption(options);
					}
				} catch (e) {
					console.log(e);
				}
			};
			const themeCheck = () => {
				if(theme) {
					if(!window.$grapesEcharts.themes.includes(theme)){
						const script = document.createElement("script");
						script.onload = init;
						window.$grapesEcharts.themes.push(theme);
						script.src =`https://unpkg.com/echarts@4.6.0/theme/${theme}.js`;
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
				script.src ="https://cdnjs.cloudflare.com/ajax/libs/echarts/4.6.0/echarts-en.min.js";
				document.body.appendChild(script);
			} else {
				init();
			}
		}
	}
};
  