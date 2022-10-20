var getScriptPromisify = (src) => {
    return new Promise(resolve => {
      $.getScript(src, resolve)
    })
  }
  
  (function () {
  
    //Chart Block in HTML
    const prepared = document.createElement('template')
    prepared.innerHTML = `
        <div id="root" style="width: 100%; height: 500px; max-width: 100%;">
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
      async render() {
        await getScriptPromisify('https://cdn.amcharts.com/lib/5/index.js');
        await getScriptPromisify('https://cdn.amcharts.com/lib/5/xy.js');
        // await getScriptPromisify('https://cdn.amcharts.com/lib/5/radar.js');       
        await getScriptPromisify('https://cdn.amcharts.com/lib/5/themes/Animated.js');

    
{/* <div id="chartdiv"></div> */}
  
        // Themes begin
       
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
var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
  behavior: "none"
}));
cursor.lineY.set("visible", false);


// Generate random data
var date = new Date();
date.setHours(0, 0, 0, 0);
var value = 100;

function generateData() {
  value = Math.round((Math.random() * 15 - 5) + value);
  am5.time.add(date, "day", 1);
  return {
    date: date.getTime(),
    value: value
  };
}

function generateDatas(count) {
  var data = [];
  for (var i = 0; i < count; ++i) {
    data.push(generateData());
  }
  return data;
}


// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
  maxDeviation: 0.2,
  baseInterval: {
    timeUnit: "day",
    count: 1
  },
  renderer: am5xy.AxisRendererX.new(root, {}),
  tooltip: am5.Tooltip.new(root, {})
}));

var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
  renderer: am5xy.AxisRendererY.new(root, {})
}));


// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
var series = chart.series.push(am5xy.LineSeries.new(root, {
  name: "Series",
  xAxis: xAxis,
  yAxis: yAxis,
  valueYField: "value",
  valueXField: "date",
  tooltip: am5.Tooltip.new(root, {
    labelText: "{valueY}"
  })
}));


// Add scrollbar
// https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
chart.set("scrollbarX", am5.Scrollbar.new(root, {
  orientation: "horizontal"
}));


// Set data
var data = generateDatas(1200);
series.data.setAll(data);


// Make stuff animate on load
// https://www.amcharts.com/docs/v5/concepts/animations/
series.appear(1000);
chart.appear(1000, 100);

      }
    }
    customElements.define('com-sap-sample-linegraph-prepared', SamplePrepared2)
  })()
