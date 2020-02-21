import build from "./build";

export default build({
	name: "Pie Chart",
	getOptions: (newSeries) => {
		const map = JSON.parse(newSeries);
		const series = [
			{
				type: "pie",
				data: map.map(({ value,color,label }) => ({value, name: label, itemStyle: { color }}))
			}
		];
		const options = {
			series,
		};
		return options;
	}
});