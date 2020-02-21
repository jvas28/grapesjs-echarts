import loadComponents from "./componentsRegister";
import loadBlocks from "./blocksRegister";
import loadTraits from "./traitsRegister";
import en from "./locale/en";
import echarts from "echarts";
import Vue from "vue";

require("echarts/theme/dark");
require("echarts/theme/macarons");
require("echarts/theme/dark-blue");

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
	const resizeComponent = (component) => {
		registeredComponents.map((name)=>{
			if(component.is(name)) {
				const w = editor.Canvas.getWindow();
				const instanceId = component.view.el.getAttribute("_echarts_instance_");
				if(instanceId) {
					const instance = w.echarts.getInstanceById(instanceId);
					if(instance) {
						component.chart = instance;
					}
				}	
				
				if(component.chart) {
					component.chart.resize();
				}
				
			}
		});
		
	};
	editor.on("component:styleUpdate:width", resizeComponent);
	editor.on("component:styleUpdate:height", resizeComponent);
	// Load i18n files
	editor.I18n && editor.I18n.addMessages({
		en,
		...options.i18n,
	});

};