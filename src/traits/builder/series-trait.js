import SeriesSelector from "../../vue/series-selector.vue";
export default (label) => ({
	// Expects as return a simple HTML string or an HTML element
	noLabel: true,
	createInput({ component }) {
		const editor = component.em.get("Editor");
		const { Vue } = editor;
		const vueInstance = new Vue({
			render: h =>
				h(SeriesSelector, {
					props: { editor, label, onChange:() => this.onChange() }
				})
		}).$mount();
		const [inputInstance] = vueInstance.$children;
		this.inputInstance = inputInstance;
		return vueInstance.$el;
	},
	// Update the component based element changes
	onEvent({ component }) {
		const series = this.inputInstance.series;
		component.addAttributes({"data-ecg-series": JSON.stringify(series)});
	},
	onUpdate({ component }) {
		const value = component.getAttributes()["data-ecg-series"] || null;
		if (value) {
			this.inputInstance.series = JSON.parse(value);
		}
	},
});
