import loadComponents from './componentsRegister';
import loadBlocks from './blocksRegister';
import en from './locale/en';
import echarts from 'echarts';
export default (editor, opts = {}) => {
  const options = { ...{
    i18n: {},
    // default options
  },  ...opts };
  editor.echarts = echarts;
  // Add components
  loadComponents(editor, options);
  // Add blocks
  loadBlocks(editor, options);
  // Load i18n files
  
  editor.I18n && editor.I18n.addMessages({
      en,
      ...options.i18n,
  });

};