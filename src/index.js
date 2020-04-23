import loadComponents from "./componentsRegister";
import loadBlocks from "./blocksRegister";
import loadTraits from "./traitsRegister";
import events from "./events";
import en from "./locale/en";
import es from "./locale/es";
import echarts from "echarts";
import Vue from "vue";

require("echarts/theme/dark");
require("echarts/theme/macarons");
require("echarts/theme/dark-blue");

export default (editor, { intl = {}, ...restOpts }) => {
  const { locale = "es", messages = { en } } = intl;
  const options = {
    ...{
      i18n: {
        locale,
      },
      // default options
    },
    ...restOpts,
  };
  // Load i18n files
  editor.I18n &&
    editor.I18n.addMessages({
      en,
      es,
      ...messages,
    }) &&
    editor.I18n.setLocale(locale);
  // attach events
  events(editor);
  editor.echarts = echarts;
  editor.Vue = Vue;
  // Add Traits
  loadTraits(editor, options);
  // Add components
  editor.registeredComponents = loadComponents(editor, options);
  // Add blocks
  loadBlocks(editor, options);
};
