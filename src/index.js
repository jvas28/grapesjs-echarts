import loadComponents from "./componentsRegister";
import loadBlocks from "./blocksRegister";
import loadTraits from "./traitsRegister";
import events from "./events";
import en from "./locale/en";
import es from "./locale/es";
import echarts from "echarts";
import Vue from "vue";
import merge from "lodash/merge";
require("echarts/theme/dark");
require("echarts/theme/macarons");
require("echarts/theme/dark-blue");

export default (editor, { intl = {}, ...restOpts }) => {
  const { locale = "en", messages = { en } } = intl;
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
  let optLocales = {};
  Object.entries(messages).map(([lang, def]) => {
    optLocales[lang] = {};
    optLocales[lang]["grapesjs-echarts"] = def;
  });
  const locales = merge({ en, es }, optLocales);
  editor.I18n &&
    editor.I18n.addMessages(locales) &&
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
