import traits from "./traits";
export default (editor, opts = {}) => {
  const tm = editor.TraitManager;
  Object.entries(traits).map(([name, def]) => {
    tm.addType(name, def);
  });
};
