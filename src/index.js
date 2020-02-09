import loadComponents from "./componentsRegister";
import loadBlocks from "./blocksRegister";
import loadTraits from "./traitsRegister";
import en from "./locale/en";
import echarts from "echarts";
import Vue from "vue";
export default (editor, opts = {}) => {
	const options = { ...{
		i18n: {},
		// default options
	},  ...opts };
	editor.echarts = echarts;
	editor.Vue = Vue;
	// Add Traits
	loadTraits(editor, options);
	// Add components
	const registeredComponents = loadComponents(editor, options);
	// Add blocks
	loadBlocks(editor, options);
	editor.on("component:styleUpdate:width", (component) => {
		registeredComponents.map((name)=>{
			if(component.is(name)) {
				if(component.chart) {
					component.chart.resize();
				}
				
			}
		});
		
	});
	// Load i18n files
	editor.I18n && editor.I18n.addMessages({
		en,
		...options.i18n,
	});

};