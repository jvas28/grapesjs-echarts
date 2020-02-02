export default (editor, opts = {}) => {
  const domc = editor.DomComponents;

  domc.addType('echart-custom', {
    isComponent: (el) => {
        try {
          const settings = el.getAttribute('data-ecg-settings');
          return !!settings;
        } catch (e) {
          return false;
        }
        
    },
    model: {
      init() {
        this.on('change:attributes:data-ecg-options', this.handleOptionsChange);
      },
      handleOptionsChange(a,opt,c) {
        const options = JSON.parse(opt);
        if(options) {
          const chart = editor.echarts.init(this.view.el,null, {renderer: 'canvas'});
          console.log(options);
          chart.setOption(options);
          // this.echarts.init(this.)
        }
      },
      defaults: {
        // Default props
        name: 'Custom Chart',
        traits: [
          'id',
          'title',
          {
            type:'text',
            label:'Options',
            name:'data-ecg-options'
          }
        ]
      },
    },
    view: {
      // onRender({ el, editor }) {
      //   const options = JSON.parse(el.getAttribute('data-ecg-options'));
      //   editor.echarts.init(el, options);
      // },
    },
  });
};
