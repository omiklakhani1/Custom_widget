var getScriptPromisify = (src) => {
    return new Promise(resolve => {
      $.getScript(src, resolve)
    })
  }
  
  (function () {
  
    //Chart Block in HTML
    const prepared = document.createElement('template')
    prepared.innerHTML = `
        <div id="root" style="width: 100%; height: 500px;">
        </div>

        
      `
    //Main JS Class holds methods to be called
    class SamplePrepared2 extends HTMLElement {
      constructor() {
  
        //call SAC DOM Super method to get shadow DOM information
        super()
  
        //Get shadow DOM informations
        this._shadowRoot = this.attachShadow({ mode: 'open' })
        this._shadowRoot.appendChild(prepared.content.cloneNode(true))
  
        //Set HTML block in shadow DOM of SAC
        this._root = this._shadowRoot.getElementById('root')
  
        //_props object is used to hold properties infosrmation
        this._props = {}
  
        //Call render() method to plot chart
        this.render()
      }
  
      //render() method to plot chart - resultSet1 holds data from SAC table/chart.
      async render(resultset) {
        await getScriptPromisify('https://cdn.amcharts.com/lib/5/index.js');
        await getScriptPromisify('https://cdn.amcharts.com/lib/5/xy.js');
        // await getScriptPromisify('https://cdn.amcharts.com/lib/5/radar.js');       
        await getScriptPromisify('https://cdn.amcharts.com/lib/5/themes/Animated.js');

    
{/* <div id="chartdiv"></div> */}
  
        // Themes begin
/**
 * ---------------------------------------
 * This demo was created using amCharts 5.
 * 
 * For more information visit:
 * https://www.amcharts.com/
 * 
 * Documentation is available at:
 * https://www.amcharts.com/docs/v5/
 * ---------------------------------------
 */

// Create root element
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
var root = am5.Root.new(this._root);


// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
root.setThemes([
  am5themes_Animated.new(root)
]);


// Create chart
// https://www.amcharts.com/docs/v5/charts/xy-chart/
var chart = root.container.children.push(am5xy.XYChart.new(root, {
  panX: true,
  panY: true,
  wheelX: "panX",
  wheelY: "zoomX",
  pinchZoomX:true
}));


// Add cursor
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
cursor.lineY.set("visible", false);


// Generate random data
// var date = new Date();
// date.setHours(0, 0, 0, 0);
// var value = 100;

// function generateData() {
//   value = Math.round((Math.random() * 10 - 5) + value);

//   if (value < 10) {
//     value = 10;
//   }

//   am5.time.add(date, "day", 1);
//   return { date: date.getTime(), value: value };
// }

// function generateDatas(count) {
//   var data = [];
//   for (var i = 0; i < count; ++i) {
//     data.push(generateData());
//   }
//   return data;
// }
          
          am4core.ready(function() {	var finaldata = [];
			for( var i = 0 ; i < resultset.length; i=i+1){
				finaldata.push({ date: resultset[i].date.id, value: resultset[i]["@MeasureDimension"].rawValue});
			}
// 			for( i = 1 ; i < resultset.length; i=i+1){
// 				finaldata.push({ date2: resultset[i].date.id, value2: resultset[i]["@MeasureDimension"].rawValue});
// 			}
                                    
                                    console.log(resultset);
		   	console.log("finaldata");
			console.log(finaldata);
			


// // Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
  baseInterval: { timeUnit: "day", count: 1 },
  renderer: am5xy.AxisRendererX.new(root, {}),
  tooltip: am5.Tooltip.new(root, {})
}));

var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
  renderer: am5xy.AxisRendererY.new(root, {})
}));

// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
var series = chart.series.push(am5xy.StepLineSeries.new(root, {
  name: "Series",
  xAxis: xAxis,
  yAxis: yAxis,
  valueYField: "value",
  valueXField: "date",
  noRisers: true,
  tooltip: am5.Tooltip.new(root, {
    labelText: "{valueY}"
  })
}));

series.strokes.template.setAll({
  strokeWidth: 3
});

series.fills.template.setAll({
  fillOpacity: 0.1,
  visible: true
});


// Add scrollbar
// https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
chart.set("scrollbarX", am5.Scrollbar.new(root, {
  orientation: "horizontal"
}));

var data = resultset(550);
series.data.setAll(data);

// Make stuff animate on load
// https://www.amcharts.com/docs/v5/concepts/animations/
series.appear(1000);
chart.appear(1000, 100);
  
      }
    }
    customElements.define('com-sap-sample-stepline', SamplePrepared2)
  })()
