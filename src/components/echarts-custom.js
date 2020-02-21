export default function(editor) {
	return {
		extend: "default",
		model: {
			init() {
				this.on("change:attributes:data-ecg-options", this.handleOptionsChange);
			},
			handleOptionsChange(a, opt) {
				const options = JSON.parse(opt);
				if (options) {
					const chart = editor.echarts.init(this.view.el, null, {
						renderer: "canvas"
					});
					chart.setOption(options);
				}
			},
			defaults: {
				// Default props
				name: "Custom Chart",
				resizable: true,
				traits: [
					{
						type: "text",
						label: "Options",
						name: "data-ecg-options"
					}
				]
			}
		},
		view: {}
	};
}
