export default function(editor) {
	return {
		extend: "default",
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
