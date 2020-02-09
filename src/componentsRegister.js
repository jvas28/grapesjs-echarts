import components from "./components";
export default (editor) => {
	const domc = editor.DomComponents;
	Object.entries(components).map(([name, def]) => {
		domc.addType(name, def(editor));
	});
};
