import components from "./components";
export default (editor, opts = {}) => {
  const domc = editor.DomComponents;
  Object.entries(components).map(([name, def]) => {
    domc.addType(name, def(editor));
  });
};
