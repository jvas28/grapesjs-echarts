import listeners from "./listeners";
export default function(editor) {
  listeners.forEach(({ listenTo, action }) => {
    if (listenTo instanceof Array) {
      listenTo.forEach((event) => {
        editor.on(event, action);
      });
    } else {
      editor.on(listenTo, action);
    }
  });
}
