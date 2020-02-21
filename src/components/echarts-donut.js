import build from "./build";

export default build({
	name: "Donut Chart",
	getOptions: (newSeries) => {
		const map = JSON.parse(newSeries);
		const series = [
			{
				type: "pie",
				radius: ["40%", "70%"],
				label: {
					normal: {
						show: false,
						position: "center"
					},
					emphasis: {
						show: true,
						textStyle: {
							fontSize: "14",
						}
					}
				},
				labelLine: {
					normal: {
						show: false
					}
				},
				data: map.map(({ value,color,label }) => ({value, name: label, itemStyle: { color }}))
			}
		];
		const options = {
			tooltip: {
				trigger: "item",
				formatter: "{b}: {c} ({d}%)"
			},
			series,
		};
		return options;
	}
});