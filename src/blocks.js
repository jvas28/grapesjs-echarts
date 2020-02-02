export default (editor, opts = {}) => {
  const bm = editor.BlockManager;

  bm.add('Bars', {
    label: 'Bars',
    content: {
      tagName: 'div',
      style: {
        width:"300px",
        height:"300px",
      },
      type: 'echart-custom',
      script: function(){
        const init = () => {
          const el = this
          const chart = echarts.init(this);
          chart.setOption({"color":["#3398DB"],"tooltip":{"trigger":"axis","axisPointer":{"type":"shadow"}},"grid":{"left":"3%","right":"4%","bottom":"3%","containLabel":true},"xAxis":[{"type":"category","data":["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],"axisTick":{"alignWithLabel":true}}],"yAxis":[{"type":"value"}],"series":[{"name":"直接访问","type":"bar","barWidth":"60%","data":[10,52,200,334,390,330,220]}]})
        }
        if (typeof echarts == 'undefined') {
          var script = document.createElement('script');
          script.onload = init;
          script.src = 'https://cdnjs.cloudflare.com/ajax/libs/echarts/4.6.0/echarts-en.min.js';
          document.body.appendChild(script);
        } else {
          init();
        }
      }
    }
    
  });
}
