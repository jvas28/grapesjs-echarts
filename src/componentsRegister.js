import components from "./components";
export default (editor) => {
  const domc = editor.DomComponents;
  const registered = [];
  Object.entries(components).map(([name, def]) => {
    domc.addType(name, def(editor));
    registered.push(name);
  });
  return registered;
};
