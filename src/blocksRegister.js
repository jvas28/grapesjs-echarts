import blocks from './blocksRegister';
export default (editor, opts = {}) => {
  const bm = editor.BlockManager;
  Object.entries(blocks).map(([name, def]) => {
    bm.add(name, def);
  });
  
}
