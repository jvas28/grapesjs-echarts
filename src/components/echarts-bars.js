export default function(editor) {
	return {
		isComponent: el => {
			try {
				const settings = el.getAttribute("data-ecg-settings");
				return !!settings;
			} catch (e) {
				return false;
			}
		},
		model: {
			init() {
				this.on("change:attributes:data-ecg-series", this.handleSeriesChange);
				this.on("change:attributes:data-ecg-theme", this.handleThemeChange);
			},
			handleThemeChange(component, newTheme) {
				const series = component.get("attributes")["data-ecg-series"] || [];
				const options  = this.getOptions(series);
				this.renderChart(options, newTheme);
			},
			handleSeriesChange(component, newSeries) {
				const theme = component.get("attributes")["data-ecg-theme"] || "macarons";
				const options  = this.getOptions(newSeries);
				this.renderChart(options, theme);
			},
			getOptions(newSeries) {
				const map = JSON.parse(newSeries);
				const series = [
					{
						type: "bar",
						data: map.map(({ value,color,label }) => ({value, name: label, itemStyle: { color }}))
					}
				];

				const xAxis = [{
					data: map.map(({ label }) => label)
				}];
				const options = {
					series,
					xAxis,
					yAxis: [
						{
							type: "value"
						}
					]
				};
							
				return options;
			},
			renderChart(options, theme) {
				if (options) {
					if(this.chart) {
						editor.echarts.dispose(this.chart);
					}
					const chart = editor.echarts.init(this.view.el, theme, {
						renderer: "canvas"
					});
					chart.setOption(options);
					this.addAttributes({"data-ecg-options" :JSON.stringify(options)});
					this.chart = chart;
				}
			},
			defaults: {
				// Default props
				name: "Pie Chart",
				resizable: true,
				traits: [
					{
						type: "pie-trait"
					}
				]
			}
		},
		view: {}
	};
}
			