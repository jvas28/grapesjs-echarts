export default {
	listenTo: ["component:styleUpdate:width","component:styleUpdate:height"],
	action(component){
		console.log(this);
		const editor = this.get("Editor");
		editor.registeredComponents.map((name)=>{
			if(component.is(name)) {
				const w = editor.Canvas.getWindow();
				const instanceId = component.view.el.getAttribute("_echarts_instance_");
				if(instanceId) {
					const instance = w.echarts.getInstanceById(instanceId);
					if(instance) {
						component.chart = instance;
					}
				}	
            
				if(component.chart) {
					component.chart.resize();
				}
            
			}
		});
	}
};