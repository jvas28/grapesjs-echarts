import icon from "../icons/bar-chart.svg";
export default {
	label: `${icon} Bars Chart`,
	category: "Charts",
	content: {
		tagName: "div",
		style: {
			width: "300px",
			"min-height": "100px"
		},
		type: "echarts-bars",
		script: function() {
			const init = () => {
				try {
					const options = JSON.parse(this.getAttribute("data-ecg-options"));
					const theme = this.getAttribute("data-ecg-theme");
					const chart = echarts.init(this, theme);
					if (options) {
						chart.setOption(options);
					}
				} catch (e) {
					console.log(e);
				}
			};
			if (typeof echarts === "undefined") {
				var script = document.createElement("script");
				script.onload = init;
				script.src = "https://cdnjs.cloudflare.com/ajax/libs/echarts/4.6.0/echarts-en.min.js";
				document.body.appendChild(script);
			} else {
				init();
			}
		}
	}
};
  