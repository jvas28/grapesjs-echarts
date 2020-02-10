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
			},
			handleSeriesChange(a, s) {
				const map = JSON.parse(s);
				const series = [
					{
						type: "bar",
						data: map.map(({ value,color }) => ({value, itemStyle: { color }}))
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
				if (options) {
					const chart = editor.echarts.init(this.view.el, null, {
						renderer: "canvas"
					});
					chart.setOption(options);
					this.addAttributes({"data-ecg-options" :JSON.stringify(options)});
					this.chart = chart;
				}
			},
			defaults: {
				// Default props
				name: "Bar Chart",
				resizable: true,
				traits: [
					"id",
					"title",
					{
						type: "series-trait"
					}
				]
			}
		},
		view: {}
	};
}
