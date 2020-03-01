import loadComponents from "./componentsRegister";
import loadBlocks from "./blocksRegister";
import loadTraits from "./traitsRegister";
import events from "./events";
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
	editor.registeredComponents = loadComponents(editor, options);
	// Add blocks
	loadBlocks(editor, options);
	// attach events
	events(editor);
	
	// Load i18n files
	editor.I18n && editor.I18n.addMessages({
		en,
		...options.i18n,
	});

};